import { z } from 'astro/zod';

export const actionI18nSchema = () =>
	z.object({
		"action.CopyPage": z.string().optional(),
        "action.CopyMarkdown": z.string().optional(),
        "action.ViewMarkdown": z.string().optional(),
        "action.AgentSetup": z.string().optional(),
	})
.partial();