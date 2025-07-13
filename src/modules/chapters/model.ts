import Elysia, { t } from 'elysia'
import {
	ChapterInputCreate,
	ChapterInputUpdate,
	ChapterPlain,
} from '@/schemas/Chapter'

export const ChapterModel = new Elysia({
	name: 'ChapterModel',
}).model({
	'chapter.create': ChapterInputCreate,
	'chapter.update': ChapterInputUpdate,
	'chapter.show': t.Object({
		data: ChapterPlain,
	}),
	'chapter.list': t.Object({
		data: t.Array(ChapterPlain),
	}),
})
