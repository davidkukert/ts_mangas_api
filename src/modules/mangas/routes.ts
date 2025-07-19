import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { MangaModel } from './model'

export const mangaRoutes = new Elysia({
	name: 'Router.Mangas',
})
	.use(setup)
	.use(prismaErrors({ customErrors: { name: 'Manga' } }))
	.use(MangaModel)
	.use(AuthService)
	.guard({ prismaErrors: {} })
	.get(
		'/',
		async ({ db }) => {
			const data = await db.manga.findMany()
			return { data }
		},
		{ response: 'manga.list', publicRoute: true },
	)
	.get(
		'/:id',
		async ({ db, params: { id } }) => {
			const data = await db.manga.findUniqueOrThrow({ where: { id } })
			return { data }
		},
		{ response: 'manga.show', publicRoute: true },
	)
	.guard({ privateRoute: true })
	.post(
		'/',
		async ({ body, db, set }) => {
			const data = await db.manga.create({ data: body })

			set.status = 201
			return { data }
		},
		{
			body: 'manga.create',
			response: { 201: 'manga.show' },
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'create', 'Manga')
			},
		},
	)
	.put(
		'/:id',
		async ({ body, db, params: { id } }) => {
			const data = await db.manga.update({ where: { id }, data: body })
			return { data }
		},
		{
			body: 'manga.update',
			response: 'manga.show',
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'update', 'Manga')
			},
		},
	)
	.delete(
		'/:id',
		async ({ db, params: { id } }) => {
			await db.manga.delete({ where: { id } })
			return { success: true }
		},
		{
			beforeHandle: ({ auth: { currentUser, authorization } }) => {
				authorization(currentUser, 'delete', 'Manga')
			},
		},
	)
