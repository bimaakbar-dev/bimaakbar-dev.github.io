// src/pages/[locale]/llms.txt.ts
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];
  const locales = new Set<string>();
  for (const d of all) {
    const parts = (d.id as string).split("/");
    if (parts.length > 1 && parts[0].length === 2 && parts[1] === "docs") locales.add(parts[0]);
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