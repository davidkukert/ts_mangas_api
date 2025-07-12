import z from 'zod'
import { $Enums } from '@/db/prisma'

export const role = z.union([
	z.enum($Enums.Role),
	z.literal('guest').default('guest'),
])

export type Role = z.infer<typeof role>
