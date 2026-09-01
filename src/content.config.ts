import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      author: z.object({
        name: z.string(),
        avatar: z.string().url(),
      }).optional(),
    }),
});

export const collections = {
	docs: defineCollection({ 
	loader: docsLoader(), 
	schema: docsSchema({
    	extend: ({ image }) => z.object({
			pubDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.object({
				name: z.string(),
				avatar: z.string().url(),
			}).optional(),
		}),
	}),
	blog,
	i18n: defineCollection({ 
		loader: i18nLoader(), 
		schema: i18nSchema({
			extend: z.object({
				'component.preview': z.string().optional(),
				'component.blogPostAuthor': z.string().optional(),
			}),
		}) 
	}),
};