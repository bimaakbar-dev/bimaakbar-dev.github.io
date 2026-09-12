// src/pages/[locale]/docs/[...slug]/index.md.ts -> buat ID dll
// serve: /id/docs/getting-started.md
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];
  return all
    .filter((d) => {
      const [first, second] = d.id.split("/");
      return first.length === 2 && second === "docs";
    })
    .filter((d) => !d.id.endsWith("/404"))
    .map((d) => {
      const [locale, , ...rest] = d.id.split("/");
      return {
        params: { locale, slug: rest.join("/") },
        props: { entry: d },
      };
    });
}

export async function GET({ props }: any) {
  return new Response(props.entry.body ?? "", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}