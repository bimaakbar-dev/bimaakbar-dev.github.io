import { z } from 'astro/zod';

export const navigationI18nSchema = () =>
	z.object({
		"nav.blog": z.string().optional(),
		"nav.docs": z.string().optional(),
        "nav.home": z.string().optional(),
		"nav.about": z.string().optional(),

		"footer.nav": z.string().optional(),
		"footer.legal": z.string().optional(),
        "footer.privacy": z.string().optional(),
		"footer.terms": z.string().optional(),
	})
.partial();