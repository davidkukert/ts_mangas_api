import type { AbilityBuilder } from '@casl/ability'
import type { AppAbility, UserAbility } from '.'
import type { Role } from './roles'

type PermissionsByRole = (
	user: UserAbility,
	builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
	admin(_user, { can, cannot }) {
		can('manage', 'all')
		cannot(['update', 'delete'], 'User', {
			role: {
				$eq: 'admin',
			},
		})
	},
	reader(user, { can }) {
		can('read', 'all')
		can(['update', 'delete'], 'User', {
			id: {
				$eq: user.id,
			},
		})
	},
	guest(_, { can }) {
		can('read', 'all')
		can('create', 'User')
	},
}
