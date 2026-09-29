// src/pages/llms.txt.ts
import { getCollection } from "astro:content";

export async function GET({ site }: any) {
  const baseUrl = site?.toString().replace(/\/$/, "") || "";
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];

  const locales = new Set<string>();
  for (const d of all) {
    const parts = (d.id as string).split("/");
    if (parts.length > 1 && parts[0].length === 2 && parts[1] === "docs") {
      locales.add(parts[0]);
    }
  }

  let body = `# LLMS Index - c0desk1\n\n`;
  body += `> Indeks dokumentasi untuk LLM\n\n`;
  body += `llms.txt yang tersedia untuk setiap bahasa:\n\n`;
  body += `- [root](${baseUrl}/docs/llms.txt)\n`;
  
  for (const loc of [...locales].sort()) {
    body += `- [${loc}](${baseUrl}/${loc}/docs/llms.txt)\n`;
  }

  return new Response(body, {
    headers: { 
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    },
  });
}