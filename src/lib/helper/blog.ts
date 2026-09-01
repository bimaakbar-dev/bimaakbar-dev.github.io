import { getCollection } from 'astro:content';

export async function getPostsByLocale(lang: 'en' | 'id') {
  const all = await getCollection('blog', (p) => !p.data.draft);

  const filtered = all.filter((p) => {
    const isIdLocale = p.id.startsWith('id/');
    return lang === 'id' ? isIdLocale : !isIdLocale;
  });

  return filtered.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function slugFromId(id: string, lang: 'en' | 'id') {
  // en: "hello-world" -> "hello-world"
  // id: "id/hello-world" -> "hello-world"
  return lang === 'id' ? id.slice('id/'.length) : id;
}