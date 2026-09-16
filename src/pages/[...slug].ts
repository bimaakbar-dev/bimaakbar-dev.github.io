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

// Fungsi pembantu untuk menyusun object entry.data kembali menjadi YAML
function buildYaml(data: Record<string, any>, indent = ""): string {
  let yaml = "";
  for (const [key, value] of Object.entries(data)) {
    // Abaikan field yang kosong atau berupa fungsi internal (seperti Astro image transform)
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
      // Tangani objek gambar dari Astro (biasanya memiliki properti 'src')
      if (value.src && typeof value.src === 'string') {
        yaml += `${indent}${key}: "${value.src}"\n`;
        continue;
      }
      
      // Cek apakah object kosong
      if (Object.keys(value).length === 0) {
        yaml += `${indent}${key}: {}\n`;
      } else {
        yaml += `${indent}${key}:\n`;
        yaml += buildYaml(value, indent + "  ");
      }
    } else if (typeof value === "string") {
      // Bungkus dengan tanda kutip jika teks mengandung titik dua (:) atau baris baru
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
  
  // 1. Ubah data Starlight asli Anda kembali ke format YAML
  const frontmatterYaml = buildYaml(entry.data);
  const frontmatterBlock = `---\n${frontmatterYaml}---`;

  // 2. Ambil title untuk diletakkan sebagai H1
  // (Gunakan fallback "Stradocs" jika title kosong)
  const title = entry.data.title || "Stradocs";

  // 3. Gabungkan semua: Frontmatter -> Judul -> Isi Body
  const markdownContent = `${frontmatterBlock}\n\n# ${title}\n\n${entry.body ?? ""}`;

  return new Response(markdownContent, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}