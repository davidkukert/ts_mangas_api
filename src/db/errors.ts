import Elysia from 'elysia'
import { httpErrorDecorator } from 'elysia-http-error'
import type { Prisma } from './prisma/client'
import { PrismaClientKnownRequestError } from './prisma/internal/prismaNamespace'

export type PrismaErrorsConfig = {
	name?: Prisma.ModelName
	custonErrorMessages?: Record<string, string>
}

export const prismaErrors = <T extends PrismaErrorsConfig>(config: {
	name?: string
	customErrors: T
}) =>
	new Elysia({ name: config.name ?? 'Error.Prisma', seed: config })
		.use(httpErrorDecorator)
		.error({
			PrismaClientKnownRequestError,
			ECONNREFUSED: PrismaClientKnownRequestError,
			P2002: PrismaClientKnownRequestError,
			P2003: PrismaClientKnownRequestError,
			P2004: PrismaClientKnownRequestError,
			P2005: PrismaClientKnownRequestError,
			P2006: PrismaClientKnownRequestError,
			P2011: PrismaClientKnownRequestError,
			P2025: PrismaClientKnownRequestError,
			P2026: PrismaClientKnownRequestError,
		})
		.macro({
			prismaErrors(messages: Record<string, string>) {
				return {
					error: ({ code, error, set }) => {
						switch (code) {
							case 'P2002':
								set.status = 409
								return {
									message:
										messages.P2002 ??
										config.customErrors?.custonErrorMessages?.P2002 ??
										`${error.meta?.modelName ?? config.customErrors.name ?? ''} already exists`,
								}

							case 'P2003':
								set.status = 404
								return {
									message:
										messages.P2003 ??
										config.customErrors?.custonErrorMessages?.P2003 ??
										`${error.meta?.modelName ?? config.customErrors.name ?? ''} not found`,
								}

							case 'P2025':
								set.status = 404
								return {
									message:
										messages.P2025 ??
										config.customErrors?.custonErrorMessages?.P2025 ??
										`${error.meta?.modelName ?? config.customErrors.name ?? ''} not found`,
								}

							case 'ECONNREFUSED':
								set.status = 503
								return { message: 'Database connection refused' }
						}
					},
				}
			},
		})
