//src/schemas/i18n/searchI18nSchema.ts

import { z } from 'astro/zod';

export const searchI18nSchema = () =>
    z.object({
        "search.clear_search": z.string().optional(),
        "search.load_more": z.string().optional(),
        "search.input_label": z.string().optional(),
        "search.filters_label": z.string().optional(),
        "search.zero_results": z.string().optional(),

        "search.many_results": z.string().optional(),
        "search.one_result": z.string().optional(),
        "search.alt_search": z.string().optional(),
        "search.search_suggestion": z.string().optional(),
        "search.searching": z.string().optional(),
    })
.partial();