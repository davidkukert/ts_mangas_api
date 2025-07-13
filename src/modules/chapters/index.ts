import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { ChapterModel } from './model'

export const chapters = new Elysia({
	name: 'Module.Chapters',
	prefix: '/chapters',
})
	.use(setup)
	.use(prismaErrors({ name: 'Chapter' }))
	.use(ChapterModel)
	.use(AuthService)
	.get(
		'/',
		async ({ db }) => {
			const data = await db.chapter.findMany()
			return { data }
		},
		{ response: 'chapter.list', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.chapter.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ response: 'chapter.show', publicRoute: true },
	)
	.guard({ privateRoute: true })
	.post(
		'/',
		async ({ body, db, set }) => {
			await db.manga.findFirstOrThrow({ where: { id: body.manga.connect.id } })

			const data = await db.chapter.create({ data: body })

			set.status = 201
			return { data }
		},
		{
			body: 'chapter.create',
			response: { 201: 'chapter.show' },
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'create', 'Chapter')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.chapter.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'chapter.update',
			response: 'chapter.show',
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'update', 'Chapter')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.chapter.delete({ where: { id } })
			return { success: true }
		},
		{
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'delete', 'Chapter')
			},
		},
	)
