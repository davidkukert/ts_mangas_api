import { PrismaPg } from '@prisma/adapter-pg'
import Elysia from 'elysia'
import { envVars } from '@/env'
import { PrismaClient } from './prisma/client'

const adapter = new PrismaPg({
	connectionString: envVars.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter })

export const prismaDecorator = new Elysia({
	name: 'Decorator.Prisma',
}).decorate({
	db: prisma,
})
