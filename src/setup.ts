import Elysia from 'elysia'
import { prismaDecorator } from './db'

export const setup = new Elysia({ name: 'Setup.APP' }).use(prismaDecorator)
