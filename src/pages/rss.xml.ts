// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getBlogPosts, getRssT } from "~/utils/rss";

export async function GET(context: any) {
  const t = await getRssT("id");
  const posts = await getBlogPosts();
  const topPosts = posts.slice(0, 50);

  return rss({
    title: `${t.title} Blog`,
    description: `${t.desc} ${t.title}`,
    site: context.site,
    items: topPosts.map((p: any) => {
      const cleanSlug = p.id.replace(/^(docs\/)?blog\//, "").replace(/\.(md|mdx)$/, "");
      
      return {
        title: p.data.title,
        description: p.data.description,
        pubDate: new Date(p.data.pubDate),
        link: `/blog/${cleanSlug}/`,
      };
    }),
    customData: `<language>id</language>`,
  });
}