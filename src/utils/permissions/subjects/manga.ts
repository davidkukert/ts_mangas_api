import { z } from 'zod'

export const mangaSubject = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('read'),
		z.literal('update'),
		z.literal('delete'),
		z.literal('upload_cover'),
		z.literal('delete_cover'),
		z.literal('manage'),
	]),
	z.union([z.literal('Manga')]),
])

export type MangaSubject = z.infer<typeof mangaSubject>
