// src/routeData.ts
import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

export const onRequest = defineRouteMiddleware(async (context) => {
  const { entry, locale, hasSidebar, toc } = context.locals.starlightRoute;
  const pathname = context.url.pathname;
  const safeLocale = locale || "root";
  const base = safeLocale === "root" ? "" : `/${safeLocale}`;

  const segments = pathname.split("/").filter(Boolean);
  const hasBlogSegment = segments.includes("blog");
  const hasDocsSegment = segments.includes("docs");

  const isBlog = hasBlogSegment && !hasDocsSegment;
  const isBlogIndex = isBlog && segments[segments.length - 1] === "blog";
  const isBlogPost = isBlog && !isBlogIndex;

  const isDocs = hasDocsSegment;
  const isDocsIndex = isDocs && segments[segments.length - 1] === "docs";

  const docsBasePath = `${base}/docs`;
  const blogBasePath = `${base}/blog`;
  const blogPrefix = safeLocale === "root" ? "blog/" : `${safeLocale}/blog/`;

  const LEGAL_SLUGS = ['privacy', 'terms', 'about', 'contact', 'license', 'disclaimer'];
  const firstSeg = segments[0] ?? '';
  const isLegalPage =
    !isDocs &&
    !isBlog &&
    (firstSeg === 'legal' || LEGAL_SLUGS.includes(firstSeg));

  const isCustomMenu = entry?.data?.template === "splash" || isBlogPost;

  const route = context.locals.starlightRoute;
  route.docsBasePath = docsBasePath;
  route.isDocs = isDocs;
  route.isDocsIndex = isDocsIndex;
  route.isBlog = isBlog;
  route.isBlogPost = isBlogPost;
  route.isBlogIndex = isBlogIndex;
  route.blogLocale = safeLocale;
  route.blogPrefix = blogPrefix;
  route.blogBasePath = blogBasePath;
  route.rssUrl = `${base}/rss.xml`;
  route.isLegalPage = isLegalPage;
  route.isCustomMenu = isCustomMenu;

  let mdUrl = "";
  if (entry?.id) {
    const cleanPath = entry.id.replace(/\.(md|mdx)$/, "");
    mdUrl = `/${cleanPath}.md`;
  }
  route.mdUrl = mdUrl;
  route.llmsUrl = `${base}/docs/llms.txt`;
  route.safeLocale = safeLocale;

  if (isBlogPost || isBlogIndex || isLegalPage) {
    route.hasSidebar = false;
    route.toc = undefined;
  }
});