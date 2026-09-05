// src/pages/id/rss.xml.js
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const allEntries = await getCollection("docs", ({ data }) => !data.draft);

  const blogEntries = allEntries.filter((entry) =>
    entry.id.startsWith("id/blog/"),
  );

  const sortedPosts = blogEntries
    .filter((entry) => entry.data.pubDate)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: "Blog Stargazers",
    description: "Postingan terbaru dari blog Stargazers",
    site: context.site,
    items: sortedPosts.map((post) => {
      const slug = post.id.replace(/^id\/blog\//, "");
      return {
        title: post.data.title,
        description: post.data.description || "",
        pubDate: post.data.pubDate,
        link: `/id/blog/${slug}`,
      };
    }),
    customData: `<language>id</language>`,
  });
}
