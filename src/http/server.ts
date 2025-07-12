import Elysia from 'elysia'
import { envVars } from '@/env'
import { users } from '@/modules/users'
import { setup } from '@/setup'

new Elysia({
	aot: true,
	normalize: 'typebox',
})
	.use(setup)
	.use(users)
	.listen({ port: envVars.PORT, hostname: '0.0.0.0' }, ({ url }) => {
		console.log(`API is running at ${url}`)
	})
