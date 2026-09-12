import { z } from 'astro/zod';

export const navigationI18nSchema = () =>
	z.object({
		"nav.blog": z.string().optional(),
		"nav.docs": z.string().optional(),
        "nav.home": z.string().optional(),
	})
.partial();