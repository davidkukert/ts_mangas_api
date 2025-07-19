import z from 'zod'
import { Role as RoleEnum } from '@/db/prisma/enums'

export const role = z.union([
	z.enum(RoleEnum),
	z.literal('guest').default('guest'),
])

export type Role = z.infer<typeof role>
