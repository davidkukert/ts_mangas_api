import Elysia, { t } from 'elysia'
import { Tag, TagInputCreate, TagInputUpdate } from '@/schemas/Tag'

export const TagModel = new Elysia({
	name: 'TagModel',
}).model({
	'tag.create': TagInputCreate,
	'tag.update': TagInputUpdate,
	'tag.show': t.Object({
		data: Tag,
	}),
	'tag.list': t.Object({
		data: t.Array(Tag),
	}),
})
