// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getBlogPosts, getRssT } from "~/utils/rss";

export async function GET(context: any) {
  const t = await getRssT("en");
  const posts = await getBlogPosts();

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
      link: `/blog/${p.id.replace(/^(docs\/)?blog\//, "")}/`,
    })),
    customData: `<language>en</language>`,
  });
}