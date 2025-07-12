import Elysia, { t } from 'elysia'
import { Manga, MangaInputCreate, MangaInputUpdate } from '@/schemas/Manga'

export const MangaModel = new Elysia({
	name: 'MangaModel',
}).model({
	'manga.create': MangaInputCreate,
	'manga.update': MangaInputUpdate,
	'manga.show': t.Object({
		data: Manga,
	}),
	'manga.list': t.Object({
		data: t.Array(Manga),
	}),
})
