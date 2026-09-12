// src/pages/[locale]/docs/llms.txt.ts
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

export async function GET({ params, site }: any) {
  const baseUrl = site?.toString().replace(/\/$/, "") || "";
  const locale = params.locale as string;

  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];

  const pages = all
    .filter((d: any) => {
      const id = d.id as string;
      return id.startsWith(`${locale}/docs/`) && !id.includes("404") && !id.includes("/blog/");
    })
    .sort((a: any, b: any) => a.id.localeCompare(b.id));

  let txt = `# Stradocs - Docs (${locale})\n`;
  txt += `# Total: ${pages.length} pages\n\n`;

  for (const p of pages) {
    const clean = (p.id as string).replace(`${locale}/docs/`, "");
    const title = (p.data.title || clean).replace(/\n/g, " ").trim();
    const desc = (p.data.description || "").replace(/\n/g, " ").trim();
    txt += `- [${title}](${baseUrl}/${locale}/docs/${clean}/)${desc ? `: ${desc}` : ""}\n`;
  }

  return new Response(txt, {
    headers: { 
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    },
  });
}