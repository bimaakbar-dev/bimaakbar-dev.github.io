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
      const link = `/blog/${cleanSlug}/`;

      const cover = p.data.cover?.image;
      let imageUrl: string | undefined;

      if (cover) {
        if (typeof cover === "string") {
          imageUrl = cover.startsWith("http") ? cover : `${context.site}${cover}`;
        } else if (cover.src) {
          imageUrl = cover.src.startsWith("http")
            ? cover.src
            : `${context.site}${cover.src}`;
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