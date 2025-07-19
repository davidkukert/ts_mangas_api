import Elysia from 'elysia'
import { setup } from '@/setup'
import { mangaAuthors } from './authors'
import { mangaRoutes } from './routes'
import { mangaTags } from './tags'

export const mangas = new Elysia({ name: 'Module.Mangas', prefix: '/mangas' })
	.use(setup)
	.use(mangaRoutes)
	.use(mangaAuthors)
	.use(mangaTags)
