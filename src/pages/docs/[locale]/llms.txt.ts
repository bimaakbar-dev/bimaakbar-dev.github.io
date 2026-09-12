// src/pages/[locale]/llms.txt.ts
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];
  const locales = new Set<string>();
  for (const d of all) {
    const [first, second] = (d.id as string).split("/");
    if (first.length === 2 && second === "docs") locales.add(first);
  }
  return [...locales].map((locale) => ({ params: { locale } }));
}

export async function GET({ params }: any) {
  const locale = params.locale as string;
  return new Response(null, {
    status: 308,
    headers: { Location: `/${locale}/docs/llms.txt` },
  });
}