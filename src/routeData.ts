// src/routeData.ts
import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware(async (context) => {
  const { entry, locale } = context.locals.starlightRoute;
  const pathname = context.url.pathname;
  const safeLocale = locale || "root";
  const base = safeLocale === "root" ? "" : `/${safeLocale}`;

  const docsBasePath = `${base}/docs`;
  const isDocsIndex = pathname === docsBasePath || pathname === `${docsBasePath}/`;
  const isDocs = pathname.startsWith(`${docsBasePath}/`) || isDocsIndex;

  const blogPrefix = safeLocale === "root" ? "blog/" : `${safeLocale}/blog/`;
  const blogBasePath = `${base}/blog`;
  const isBlogPost = entry?.id?.startsWith(blogPrefix) ?? false;
  const isBlogIndex = pathname === blogBasePath || pathname === `${blogBasePath}/`;

  let mdUrl = "";
  if (entry?.id) {
    if (entry.id.startsWith("docs/")) {
      mdUrl = `/docs/${entry.id.replace(/^docs\//, "")}.md`;
    } else if (entry.id.includes("/docs/")) {
      const [loc, , ...rest] = entry.id.split("/");
      mdUrl = `/${loc}/docs/${rest.join("/")}.md`;
    }
  }
  
  const llmsUrl = `${base}/docs/llms.txt`;

  const isCustomMenu = entry?.data?.template === "splash";

  const route = context.locals.starlightRoute;
  route.docsBasePath = docsBasePath;
  route.isDocs = isDocs;
  route.isDocsIndex = isDocsIndex;
  route.isBlog = isBlogPost || isBlogIndex;
  route.isBlogPost = isBlogPost;
  route.isBlogIndex = isBlogIndex;
  route.blogLocale = safeLocale;
  route.blogPrefix = blogPrefix;
  route.blogBasePath = blogBasePath;
  route.rssUrl = `${base}/rss.xml`;
  route.isCustomMenu = isCustomMenu;
  route.mdUrl = mdUrl;
  route.llmsUrl = llmsUrl;
  route.safeLocale = safeLocale;
});