import Elysia from 'elysia'
import { envVars } from '@/env'
import { setup } from '@/setup'

new Elysia({
	aot: true,
	normalize: 'typebox',
})
	.use(setup)
	.listen({ port: envVars.PORT, hostname: '0.0.0.0' }, ({ url }) => {
		console.log(`API is running at ${url}`)
	})
