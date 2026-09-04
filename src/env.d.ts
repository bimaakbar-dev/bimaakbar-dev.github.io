// src/env.d.ts
/// <reference types="astro/client" />

import type { StarlightRouteData } from '@astrojs/starlight';

declare module 'astro' {
  interface Locals {
    starlightRoute: StarlightRouteData & {
      isBlog?: boolean;
      isBlogIndex?: boolean;
      blogLocale?: string;
      blogPrefix?: string;
      blogBasePath?: string;
      rssUrl?: string;
    };
  }
}