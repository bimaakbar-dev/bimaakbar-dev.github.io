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
      const cleanSlug = p.id
        .replace(/^(docs\/)?blog\//, "")
        .replace(/\.(md|mdx)$/, "");
      const link = `/blog/${cleanSlug}/`;

      const cover = p.data.cover?.image;
      let imageUrl: string | undefined;

      if (cover) {
        const rawSrc = typeof cover === "string" ? cover : cover.src;

        if (rawSrc) {
          imageUrl = rawSrc.startsWith("http")
            ? rawSrc
            : new URL(rawSrc, context.site).href;
        }
      }

      return {
        title: p.data.title,
        description: p.data.description,
        pubDate: new Date(p.data.pubDate),
        link,
        enclosure: imageUrl
          ? { url: imageUrl, length: 0, type: "image/jpeg" }
          : undefined,
      };
    }),
    customData: `<language>id</language>`,
  });
}