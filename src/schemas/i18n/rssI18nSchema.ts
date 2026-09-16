import { z } from 'astro/zod';

export const rssI18nSchema = () =>
	z.object({
		"rss.title": z.string().optional(),
		"rss.RssFeedLabel": z.string().optional(),
        "rss.RssFeedTitle": z.string().optional(),
        "rss.RssFeedDesc": z.string().optional(),
	})
.partial();