// src/pages/search-index.json.ts
import { getCollection } from "astro:content";

export async function GET() {
  const docs = await getCollection("docs", ({ data }) => !data.draft);
  
  const searchData = docs.map((doc) => {
    let cleanSlug = doc.id.replace(/\.(md|mdx)$/, "");
    if (cleanSlug === "index") cleanSlug = "";
    else if (cleanSlug.endsWith("/index")) cleanSlug = cleanSlug.replace(/\/index$/, "");
    
    return {
      id: doc.id,
      title: doc.data.title || "Untitled",
      description: doc.data.description || "",
      slug: `/${cleanSlug}`,
      body: doc.body || "",
    };
  });

  return new Response(JSON.stringify(searchData), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}