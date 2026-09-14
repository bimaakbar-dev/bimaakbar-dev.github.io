// src/pages/docs/llms.txt.ts
import { getCollection } from "astro:content";

export async function GET({ site }: any) {
  const baseUrl = site?.toString().replace(/\/$/, "") || "";
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];

  const pages = all
    .filter((d: any) => {
      const id = d.id as string;
      return id.startsWith("docs/") && !id.includes("404") && !id.startsWith("docs/blog/");
    })
    .sort((a: any, b: any) => a.id.localeCompare(b.id));

  let txt = `# Stradocs (English)\n`;
  txt += `# Total: ${pages.length} pages\n\n`;
  txt += `> Documentation for LLMs - use this to understand the site structure\n\n`;

  for (const p of pages) {
    let clean = (p.id as string)
      .replace(/^docs\//, "")
      .replace(/\.(md|mdx)$/, "");
      
    if (clean === "index") clean = "";
    else if (clean.endsWith("/index")) clean = clean.replace(/\/index$/, "");

    const title = (p.data.title || "Home").replace(/\n/g, " ").trim();
    const desc = (p.data.description || "").replace(/\n/g, " ").trim();

    const url = clean ? `${baseUrl}/docs/${clean}/` : `${baseUrl}/docs/`;

    txt += `- [${title}](${url})${desc ? `: ${desc}` : ""}\n`;
  }

  return new Response(txt, {
    headers: { 
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    },
  });
}