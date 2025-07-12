import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { UserModel } from './model'

export const users = new Elysia({ name: 'Module.Users', prefix: '/users' })
	.use(setup)
	.use(prismaErrors({ name: 'User' }))
	.use(UserModel)
	.use(AuthService)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.user.findMany()
			return { data }
		},
		{ response: { 200: 'user.list' }, publicRoute: true },
	)
	.post(
		'/',
		async ({ db, body, set }) => {
			const { password, username } = body
			const data = await db.user.create({
				data: {
					password: Bun.password.hashSync(password),
					username,
				},
			})

			set.status = 201
			return { data }
		},
		{
			response: { 201: 'user.show' },
			body: 'user.create',
			publicRoute: true,
		},
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.user.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{
			response: { 200: 'user.show' },
			publicRoute: true,
		},
	)
	.put(
		'/:id',
		async ({ db, body, params: { id } }) => {
			const { password, username } = body
			const data = await db.user.update({
				where: { id },
				data: {
					password: password && Bun.password.hashSync(password),
					username,
				},
			})
			return { data }
		},
		{
			response: { 200: 'user.show' },
			body: 'user.update',
			privateRoute: true,
			async beforeHandle({
				db,
				params: { id },
				auth: { authorization, currentUser },
			}) {
				const user = await db.user.findUniqueOrThrow({ where: { id } })
				authorization(currentUser, 'update', {
					__typename: 'User',
					id: user.id,
					role: user.role,
				})
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.user.delete({ where: { id } })
			return { message: 'User deleted successfully' }
		},
		{
			privateRoute: true,
			async beforeHandle({
				db,
				params: { id },
				auth: { authorization, currentUser },
			}) {
				const user = await db.user.findUniqueOrThrow({ where: { id } })
				authorization(currentUser, 'delete', {
					__typename: 'User',
					id: user.id,
					role: user.role,
				})
			},
		},
	)
