import Elysia, { t } from 'elysia'
import {
	AuthorInputCreate,
	AuthorInputUpdate,
	AuthorPlain,
} from '@/schemas/Author'

export const AuthorModel = new Elysia({
	name: 'AuthorModel',
}).model({
	'author.create': AuthorInputCreate,
	'author.update': AuthorInputUpdate,
	'author.show': t.Object({
		data: AuthorPlain,
	}),
	'author.list': t.Object({
		data: t.Array(AuthorPlain),
	}),
})
