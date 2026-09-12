/**
 * =============================================================================
 * Stradocs LLMS - Internal Port of starlight-llms-txt (MIT)
 * Original: delucis/starlight-llms-txt - https://github.com/delucis/starlight-llms-txt
 * License: MIT
 * =============================================================================
 */
import type { AstroIntegration } from "astro";
import { getCollection } from "astro:content";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

export default function llms(opts: { projectName?: string; description?: string; site?: string } = {}): AstroIntegration {
  return {
    name: "stradocs-llms",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = dir instanceof URL ? dir.pathname : dir as string;
        const docs = await getCollection("docs");
        const site = opts.site || "https://stradocs.dev";

        // per-page .md untuk CopyDropdown
        for (const entry of docs) {
          const id = entry.id; // guides/getting-started (CLEAN)
          const md = `# ${entry.data.title}\n\n${entry.body || ""}\n`;
          const outPath = path.join(outDir, id + ".md");
          await mkdir(path.dirname(outPath), { recursive: true });
          await writeFile(outPath, md);
        }

        // llms.txt
        let llmsTxt = `# ${opts.projectName || "Stradocs"}\n\n> ${opts.description || ""}\n\n## Docs\n`;
        for (const e of docs) {
          llmsTxt += `- [${e.data.title}](${site}/${e.id}.md): ${e.data.description || ""}\n`;
        }
        await writeFile(path.join(outDir, "llms.txt"), llmsTxt);

        // llms-full.txt
        let full = llmsTxt + "\n---\n\n";
        for (const e of docs) {
          full += `# ${e.data.title}\nURL: ${site}/${e.id}\n\n${e.body?.slice(0, 8000)}\n\n---\n\n`;
        }
        await writeFile(path.join(outDir, "llms-full.txt"), full);
        logger.info(`Generated ${docs.length} .md + llms.txt`);
      },
    },
  };
}