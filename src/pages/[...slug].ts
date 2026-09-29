// src/pages/[...slug].ts
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const all = await getCollection("docs", ({ data }) => !data.draft) as any[];
  
  return all
    .filter((d) => !d.id.includes("404"))
    .map((d) => {
      const urlSlug = d.id.replace(/\.(md|mdx)$/, "") + ".md";
      return {
        params: { slug: urlSlug },
        props: { entry: d },
      };
    });
}

function buildYaml(data: Record<string, any>, indent = ""): string {
  let yaml = "";
  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null || typeof value === "function") continue;
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        yaml += `${indent}${key}: []\n`;
      } else {
        yaml += `${indent}${key}:\n`;
        value.forEach((item) => {
          yaml += `${indent}  - ${typeof item === "object" ? JSON.stringify(item) : item}\n`;
        });
      }
    } else if (typeof value === "object") {
      if (value.src && typeof value.src === 'string') {
        yaml += `${indent}${key}: "${value.src}"\n`;
        continue;
      }
      
      if (Object.keys(value).length === 0) {
        yaml += `${indent}${key}: {}\n`;
      } else {
        yaml += `${indent}${key}:\n`;
        yaml += buildYaml(value, indent + "  ");
      }
    } else if (typeof value === "string") {
      const needsQuotes = /[:\n]/.test(value) || value === "";
      const safeValue = needsQuotes ? `"${value.replace(/"/g, '\\"')}"` : value;
      yaml += `${indent}${key}: ${safeValue}\n`;
    } else {
      yaml += `${indent}${key}: ${value}\n`;
    }
  }
  return yaml;
}

export async function GET({ props }: any) {
  const { entry } = props;
  
  const frontmatterYaml = buildYaml(entry.data);
  const frontmatterBlock = `---\n${frontmatterYaml}---`;
  const title = entry.data.title || "c0desk1";
  const markdownContent = `${frontmatterBlock}\n\n# ${title}\n\n${entry.body ?? ""}`;

  return new Response(markdownContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}