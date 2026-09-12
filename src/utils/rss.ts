// src/utils/rss.ts

import { getCollection } from "astro:content";

export async function getBlogPosts(locale?: string) {
  const all = await getCollection("docs" as any, ({ data }: any) => !data.draft) as any[];
  return all.filter((e: any) => {
    const id = e.id as string;
    if (locale) return id.startsWith(`${locale}/blog/`);
    const [first, second] = id.split("/");
    if (first.length === 2 && second === "blog") return false;
    return id.startsWith("blog/") || id.startsWith("docs/blog/");
  })
  .filter((e: any) => e.data.pubDate)
  .sort((a: any, b: any) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export async function getRssT(locale: string) {
  const i18n = await getCollection("i18n" as any) as any[];
  const entry = i18n.find((e) => e.id === locale) || i18n.find((e) => e.id === "en") || i18n[0];
  const data = entry?.data || {};
  return {
    title: data["rss.title"] || "Stradocs",
    desc: data["rss.RssFeedDesc"] || "Stay up-to-date with news from the",
  };
}