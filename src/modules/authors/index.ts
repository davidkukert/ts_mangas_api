import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { AuthorModel } from './model'

export const authors = new Elysia({
	name: 'Module.Authors',
	prefix: '/authors',
})
	.use(setup)
	.use(prismaErrors({ name: 'Author' }))
	.use(AuthorModel)
	.use(AuthService)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.author.findMany()
			return { data }
		},
		{ response: 'author.list', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.author.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ response: 'author.show', publicRoute: true },
	)
	.guard({ privateRoute: true })
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.author.create({ data: body })

			set.status = 201
			return { data }
		},
		{
			body: 'author.create',
			response: { 201: 'author.show' },
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'create', 'Author')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.author.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'author.update',
			response: 'author.show',
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'update', 'Author')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.author.delete({ where: { id } })
			return { success: true }
		},
		{
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'delete', 'Author')
			},
		},
	)
