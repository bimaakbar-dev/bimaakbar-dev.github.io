//src/schemas/i18n/blogI18nSchema.ts

import { z } from 'astro/zod';

export const blogI18nSchema = () =>
	z.object({
		"blog.PostAuthor": z.string().optional(),
		"plugin.readingTime": z.string().optional(),
		"plugin.readingWords": z.string().optional(),
		"blog.relatedPostLabel": z.string().optional(),
		"blog.PopularPostLabel": z.string().optional(),
	})
.partial();