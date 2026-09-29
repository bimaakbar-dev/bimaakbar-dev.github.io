import { z } from 'astro/zod';

export const componentsI18nSchema = () =>
	z.object({
		"component.preview": z.string().optional(),
        "component.scrollToTop": z.string().optional(),
		"discord.title": z.string().optional(),
		"discord.action": z.string().optional()
	})
.partial();
