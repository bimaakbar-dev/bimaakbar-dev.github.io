// src/pages/docs/[...slug]/index.md.ts -> buat EN
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];
  return all
    .filter((d) => d.id.startsWith("docs/"))
    .map((d) => ({
      params: { slug: d.id.replace(/^docs\//, "") },
      props: { entry: d },
    }));
}

export async function GET({ props }: any) {
  return new Response(props.entry.body ?? "", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}