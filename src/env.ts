import z from 'zod'

const envSchema = z.object({
	DATABASE_URL: z.url().min(1, 'DATABASE_URL is required.'),
	PORT: z.coerce.number().default(3333),
	JWT_SECRET: z.string().min(1, 'JWT_SECRET is required.'),
})

export const envVars = envSchema.parse(process.env)
