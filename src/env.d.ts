// src/env.d.ts

/// <reference types="astro/client" />
declare module 'starlight:route-data' {
  interface StarlightRouteData {
    isCustomMenu?: boolean;
    isDocs?: boolean;
    isDocsIndex?: boolean;
    isBlog?: boolean;
    isBlogPost?: boolean;
    isBlogIndex?: boolean;
    blogLocale?: string;
    blogPrefix?: string;
    blogBasePath?: string;
    docsBasePath?: string;
    rssUrl?: string;
    mdUrl?: string;
    llmsUrl?: string;
    safeLocale?: string;
  }
}

declare module 'astro' {
  interface Locals {
    starlightRoute: import('starlight:route-data').StarlightRouteData;
  }
}