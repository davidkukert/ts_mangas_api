import Elysia from 'elysia'
import { envVars } from '@/env'
import { auth } from '@/modules/auth'
import { authors } from '@/modules/authors'
import { chapters } from '@/modules/chapters'
import { mangas } from '@/modules/mangas'
import { tags } from '@/modules/tags'
import { uploads } from '@/modules/uploads'
import { users } from '@/modules/users'
import { setup } from '@/setup'

new Elysia({
	aot: true,
	normalize: 'typebox',
})
	.use(setup)
	.use(users)
	.use(auth)
	.use(mangas)
	.use(authors)
	.use(tags)
	.use(chapters)
	.use(uploads)
	.listen({ port: envVars.PORT, hostname: '0.0.0.0' }, ({ url }) => {
		console.log(`API is running at ${url}`)
	})
