import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { TagModel } from './model'

export const tags = new Elysia({
	name: 'Module.Tags',
	prefix: '/tags',
})
	.use(setup)
	.use(prismaErrors({ customErrors: { name: 'Tag' } }))
	.use(TagModel)
	.use(AuthService)
	.guard({ prismaErrors: {} })
	.get(
		'/',
		async ({ db }) => {
			const data = await db.tag.findMany()
			return { data }
		},
		{ response: 'tag.list', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.tag.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ response: 'tag.show', publicRoute: true },
	)
	.guard({ privateRoute: true })
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.tag.create({ data: body })

			set.status = 201
			return { data }
		},
		{
			body: 'tag.create',
			response: { 201: 'tag.show' },
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'create', 'Tag')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.tag.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'tag.update',
			response: 'tag.show',
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'update', 'Tag')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.tag.delete({ where: { id } })
			return { success: true }
		},
		{
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'delete', 'Tag')
			},
		},
	)
