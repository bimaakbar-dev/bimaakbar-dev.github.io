// src/routeData.ts
import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
  const { entry, locale } = context.locals.starlightRoute;

  const pathname = context.url.pathname;

  const safeLocale = locale || 'root';
  const base = safeLocale === 'root' ? '' : `/${safeLocale}`;
  const blogPrefix = safeLocale === 'root' ? 'blog/' : `${safeLocale}/blog/`;
  const blogBasePath = `${base}/blog`;

  const isBlogPost = entry?.id?.startsWith(blogPrefix) ?? false;
  const isBlogIndex = pathname === blogBasePath || pathname === `${blogBasePath}/`;

  const route = context.locals.starlightRoute as any;
  
  route.isBlog = isBlogPost || isBlogIndex;
  route.isBlogPost = isBlogPost;
  route.isBlogIndex = isBlogIndex;
  route.blogLocale = safeLocale;
  route.blogPrefix = blogPrefix;
  route.blogBasePath = blogBasePath;
  route.rssUrl = `${base}/rss.xml`;
});