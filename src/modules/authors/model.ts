import Elysia, { t } from 'elysia'
import { Author, AuthorInputCreate, AuthorInputUpdate } from '@/schemas/Author'

export const AuthorModel = new Elysia({
	name: 'AuthorModel',
}).model({
	'author.create': AuthorInputCreate,
	'author.update': AuthorInputUpdate,
	'author.show': t.Object({
		data: Author,
	}),
	'author.list': t.Object({
		data: t.Array(Author),
	}),
})
