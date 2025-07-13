import {
	AbilityBuilder,
	type CreateAbility,
	createMongoAbility,
	type MongoAbility,
} from '@casl/ability'
import z from 'zod'
import type { User } from '@/db/prisma'
import { permissions } from './permissions'
import type { Role } from './roles'
import { allSubject } from './subjects/all'
import { authorSubject } from './subjects/author'
import { mangaSubject } from './subjects/manga'
import { userSubject } from './subjects/user'

const appAbilitiesSchema = z.union([
	userSubject,
	allSubject,
	mangaSubject,
	authorSubject,
])

export type AppAbilities = z.infer<typeof appAbilitiesSchema>
export type AppAbility = MongoAbility<AppAbilities>
export type UserAbility =
	| User
	| {
			id?: string
			role: Role
	  }

export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: UserAbility) {
	const builder = new AbilityBuilder(createAppAbility)
	const userPermissions = permissions[user.role] ?? permissions.guest
	if (typeof userPermissions !== 'function') {
		throw new Error(`Invalid permissions for role: ${user.role}`)
	}
	userPermissions(user, builder)
	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	ability.can = ability.can.bind(ability)
	ability.cannot = ability.cannot.bind(ability)

	return ability
}
