import { z } from 'astro/zod';

export const componentsI18nSchema = () =>
	z.object({
		"component.preview": z.string().optional(),
        "component.scrollToTop": z.string().optional(),
	})
.partial();