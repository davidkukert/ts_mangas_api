import Elysia, { t } from 'elysia'
import { TagInputCreate, TagInputUpdate, TagPlain } from '@/schemas/Tag'

export const TagModel = new Elysia({
	name: 'TagModel',
}).model({
	'tag.create': TagInputCreate,
	'tag.update': TagInputUpdate,
	'tag.show': t.Object({
		data: TagPlain,
	}),
	'tag.list': t.Object({
		data: t.Array(TagPlain),
	}),
})
