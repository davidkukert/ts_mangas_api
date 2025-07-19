import Elysia, { t } from 'elysia'
import { UserInputCreate, UserInputUpdate, UserPlain } from '@/schemas/User'

const UserSelect = t.Omit(UserPlain, ['password'])
const UserShow = t.Object({
	data: UserSelect,
})
const UserList = t.Object({
	data: t.Array(UserSelect),
})

export const UserModel = new Elysia({ name: 'Model.Users' }).model({
	'user.create': UserInputCreate,
	'user.update': UserInputUpdate,
	'user.show': UserShow,
	'user.list': UserList,
})
