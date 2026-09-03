// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
   const allEntries = await getCollection('docs', ({ data }) => !data.draft);;
  
  const blogEntries = allEntries.filter(
    entry => entry.id.startsWith('blog/')
  );

  const sortedPosts = blogEntries
    .filter(entry => entry.data.pubDate)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  return rss({
    title: 'Stargazers Blog',
    description: 'Latest posts from Stargazers blog',
    site: context.site,
    items: sortedPosts.map((post) => {
      const slug = post.id.replace(/^blog\//, '');
      return {
        title: post.data.title,
        description: post.data.description || '',
        pubDate: post.data.pubDate,
        link: `/blog/${slug}`,
      };
    }),
    customData: `<language>en</language>`,
  });
};