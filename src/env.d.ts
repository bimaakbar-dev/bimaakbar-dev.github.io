// src/env.d.ts
/// <reference types="astro/client" />

import type { StarlightRouteData } from '@astrojs/starlight';

declare module 'astro' {
  interface Locals {
    starlightRoute: StarlightRouteData & {
      isCustomMenu?: boolean;
      isDocs?: boolean;
      isDocsIndex?: boolean;
      isBlog?: boolean;
      isBlogPost?: boolean;
      isBlogIndex?: boolean;
      blogLocale?: string;
      blogPrefix?: string;
      blogBasePath?: string;
      rssUrl?: string;
    };
  }
}

declare module '@astrojs/starlight' {
  export interface StarlightRouteData {
    entry: {
      data: {
        minutesRead?: string;
      };
    };
  }
}

declare module "virtual:starlight/user-config" {
  const Config: import("@astrojs/starlight/types").StarlightConfig & {
    credits?: boolean;
  };
  export default Config;
}