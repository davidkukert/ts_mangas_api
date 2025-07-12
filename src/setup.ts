import Elysia from 'elysia'
import { httpError, httpErrorDecorator } from 'elysia-http-error'
import { prismaDecorator } from './db'

export const setup = new Elysia({ name: 'Setup.APP' })
	.use(prismaDecorator)
	.use(httpError())
	.use(httpErrorDecorator)
