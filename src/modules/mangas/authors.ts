import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { MangaModel } from './model'

export const mangaAuthors = new Elysia({
	prefix: '/:id/authors',
})
	.use(setup)
	.use(
		prismaErrors({
			name: 'Error.Prisma.MangaAuthor',
			customErrors: {
				name: 'MangaAuthor',
				custonErrorMessages: {
					P2002: 'Author already exists in this manga',
					P2003: 'Author or Manga not found',
					P2025: 'Author not found in this manga',
				},
			},
		}),
	)
	.use(MangaModel)
	.use(AuthService)
	.guard({ prismaErrors: {} })
	.put(
		'/:authorId',
		async ({ db, query: { role }, params: { id, authorId } }) => {
			await db.mangaAuthor.create({
				data: {
					mangaId: id,
					authorId,
					role,
				},
			})

			return { message: 'Author added to manga' }
		},
		{
			query: 'manga.author.add',
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'add_author', 'Manga')
			},
		},
	)
	.delete(
		'/:authorId',
		async ({ db, params: { id, authorId } }) => {
			await db.mangaAuthor.delete({
				where: {
					mangaId_authorId: {
						mangaId: id,
						authorId,
					},
				},
			})
			return { message: 'Author removed from manga' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'remove_author', 'Manga')
			},
		},
	)
