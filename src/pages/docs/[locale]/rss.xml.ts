// src/pages/[locale]/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getBlogPosts, getRssT } from "~/utils/rss";

export async function getStaticPaths() {
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];
  const locales = new Set<string>();
  for (const d of all) {
    const [locale, folder] = (d.id as string).split("/");
    if (locale.length === 2 && folder === "blog") locales.add(locale);
  }
  return [...locales].map((locale) => ({ params: { locale } }));
}

export async function GET(context: any) {
  const { locale } = context.params;
  const t = await getRssT(locale);
  const posts = await getBlogPosts(locale);

  const filtered = posts
    .filter((p: any) => !p.data.draft && p.data.pubDate)
    .sort((a: any, b: any) => +new Date(b.data.pubDate) - +new Date(a.data.pubDate))
    .slice(0, 50);

  return rss({
    title: `${t.title} Blog`,
    description: `${t.desc} ${t.title}`,
    site: context.site,
    items: filtered.map((p: any) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: new Date(p.data.pubDate),
      link: `/${locale}/blog/${p.id.replace(`${locale}/blog/`, "")}/`,
    })),
    customData: `<language>${locale}</language>`,
  });
}