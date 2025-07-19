import Elysia from 'elysia'
import { prismaErrors } from '@/db/errors'
import { setup } from '@/setup'
import { AuthService } from '../auth/service'
import { MangaModel } from './model'

export const mangaTags = new Elysia({
	prefix: '/:id/tags',
})
	.use(setup)
	.use(
		prismaErrors({
			name: 'Error.Prisma.MangaTag',
			customErrors: {
				name: 'Manga',
				custonErrorMessages: {
					P2002: 'Tag already exists in this manga',
					P2003: 'Tag or Manga not found',
					P2025: 'Tag not found in this manga',
				},
			},
		}),
	)
	.use(MangaModel)
	.use(AuthService)
	.put(
		'/:tagId',
		async ({ db, params: { id, tagId } }) => {
			await db.manga.update({
				where: { id, tags: { none: { id: tagId } } },
				data: {
					tags: {
						connect: { id: tagId },
					},
				},
			})

			return { message: 'Tag added to manga' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'add_tag', 'Manga')
			},
			prismaErrors: {
				P2003: 'Tag or Manga not found',
				P2025: 'Tag or Manga not found',
			},
		},
	)
	.delete(
		'/:tagId',
		async ({ db, params: { id, tagId } }) => {
			await db.manga.update({
				where: { id, tags: { some: { id: tagId } } },
				data: {
					tags: {
						disconnect: { id: tagId },
					},
				},
			})

			return { message: 'Tag removed from manga' }
		},
		{
			privateRoute: true,
			beforeHandle: async ({ auth: { authorization, currentUser } }) => {
				return authorization(currentUser, 'remove_tag', 'Manga')
			},
			prismaErrors: {},
		},
	)
