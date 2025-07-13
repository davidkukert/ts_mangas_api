import Elysia, { t } from 'elysia'
import { MangaInputCreate, MangaInputUpdate, MangaPlain } from '@/schemas/Manga'

export const MangaModel = new Elysia({
	name: 'MangaModel',
}).model({
	'manga.create': MangaInputCreate,
	'manga.update': MangaInputUpdate,
	'manga.show': t.Object({
		data: MangaPlain,
	}),
	'manga.list': t.Object({
		data: t.Array(MangaPlain),
	}),
})
