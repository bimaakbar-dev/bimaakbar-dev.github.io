//src/schemas/i18n/index.ts
import { z } from 'astro/zod';

import { actionI18nSchema } from "./actionI18nSchema";
import { blogI18nSchema } from "./blogI18nSchema";
import { componentsI18nSchema } from "./componentsI18nSchema";
import { navigationI18nSchema } from "./navigationI18nSchema";
import { rssI18nSchema } from "./rssI18nSchema";

export const customI18nSchema = z.object({
  ...actionI18nSchema().shape,
  ...blogI18nSchema().shape,
  ...componentsI18nSchema().shape,
  ...navigationI18nSchema().shape,
  ...rssI18nSchema().shape,
}).partial();

export { actionI18nSchema, blogI18nSchema, componentsI18nSchema, navigationI18nSchema, rssI18nSchema };