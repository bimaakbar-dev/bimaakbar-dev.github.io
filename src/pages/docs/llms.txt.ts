// src/pages/llms.txt.ts
import { getCollection } from "astro:content";

export async function GET({ site }: any) {
  const baseUrl = site?.toString().replace(/\/$/, "") || "";
  
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];

  const locales = new Set<string>();
  for (const d of all) {
    const [first, second] = (d.id as string).split("/");
    if (first.length === 2 && second === "docs") {
      locales.add(first);
    }
  }

  let body = `# LLMS Index - Stradocs\n\n`;
  body += `> Documentation index for LLMs\n\n`;
  body += `Available llms.txt per locale:\n\n`;
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