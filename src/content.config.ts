import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ 
		loader: docsLoader(), 
		schema: docsSchema({
    		extend: ({ image }) => z.object({
				pubDate: z.coerce.date().optional(),
				heroImage: z.optional(image()),
				author: z.object({
					name: z.string().optional(),
					avatar: z.optional(image()),
				}).optional(),
				tags: z.array(z.string()).optional(),
			}),
		})
	}),
	i18n: defineCollection({ 
		loader: i18nLoader(), 
		schema: i18nSchema({
			extend: z.object({
				'component.preview': z.string().optional(),
				'blog.PostAuthor': z.string().optional(),
				'blog.relatedPostLabel': z.string().optional(),
				'blog.PopularPostLabel': z.string().optional(),
				'rss.RssFeedLabel': z.string().optional(),
				'rss.RssFeedTitle': z.string().optional(),
				'rss.RssFeedDesc': z.string().optional(),
			}),
		}) 
	})
};
