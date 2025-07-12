import Elysia, { t } from 'elysia'
import { User, UserInputCreate, UserInputUpdate } from '@/schemas/User'

const UserSelect = t.Omit(User, ['password'])
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
