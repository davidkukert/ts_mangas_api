import Elysia from 'elysia'
import { httpErrorDecorator } from 'elysia-http-error'
import type { Prisma } from './prisma'
import { PrismaClientKnownRequestError } from './prisma/runtime/client'

export type PrismaErrorsConfig = {
	name?: Prisma.ModelName
	custonErrorMessages?: Record<string, string>
}

export const prismaErrors = (config: PrismaErrorsConfig = {}) =>
	new Elysia({ name: 'Error.Prisma' })
		.use(httpErrorDecorator)
		.error({
			PrismaClientKnownRequestError,
			P2002: PrismaClientKnownRequestError,
			P2003: PrismaClientKnownRequestError,
			P2004: PrismaClientKnownRequestError,
			P2005: PrismaClientKnownRequestError,
			P2006: PrismaClientKnownRequestError,
			P2011: PrismaClientKnownRequestError,
			P2025: PrismaClientKnownRequestError,
			P2026: PrismaClientKnownRequestError,
		})
		.onError({ as: 'scoped' }, ({ code, error, set }) => {
			switch (code) {
				case 'P2002':
					set.status = 409
					return {
						message: `${error.meta?.modelName ?? config.name ?? ''} already exists`,
					}
				case 'P2003':
					set.status = 404
					return {
						message: `${error.meta?.modelName ?? config.name ?? ''} not found`,
					}
				case 'P2025':
					set.status = 404
					return {
						message: `${error.meta?.modelName ?? config.name ?? ''} not found`,
					}
				default:
					return {
						code,
						error,
					}
			}
		})
