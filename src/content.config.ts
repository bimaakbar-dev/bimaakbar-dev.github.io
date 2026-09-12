// src/content.config.ts

import { defineCollection } from "astro:content";
import { z } from "astro/zod";

import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { customI18nSchema } from "./schemas/i18n";

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),

    schema: docsSchema({
      extend: ({ image }) =>
        z.object({
          pubDate: z.coerce.date().optional(),
          heroImage: z.optional(image()),
          author: z.array(
            z.object({
              name: z.string().optional(),
              avatar: z.optional(image()),
            })
          ).optional(),
          tags: z.array(z.string()).optional(),
          minutesRead: z.string().optional(),
          readingTime: z.object({
            minutes: z.number().optional(),
            words: z.number().optional(),
          }).optional(),
        }),
    }),
  }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: customI18nSchema,
    }),
  }),
};
