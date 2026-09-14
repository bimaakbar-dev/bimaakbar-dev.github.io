// satteri-plugin-mermaid.js
import { defineMdastPlugin } from "satteri";

/**
 * @param {string | number | boolean} str
 */
function encodeAttr(str) {
  return encodeURIComponent(str);
}

/**
 * @param {string | number | boolean} source
 */
function buildPlaceholderHtml(source) {
  const encoded = encodeAttr(source);
  return `<figure class="mermaid" data-mermaid-source="${encoded}"><div class="mermaid-canvas" aria-label="Memuat diagram…" role="img"></div></figure>`;
}

const CLIENT_SCRIPT = `
<script type="module" data-satteri-mermaid>
(async () => {
  if (window.__satteriMermaid) return;
  window.__satteriMermaid = true;

  const { default: mermaid } = await import(
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
  );

  const css = (v, fallback) =>
    getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback;

  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    themeVariables: {
      darkMode:             true,
      background:           css("--mermaid-bg",           "#0f0f0f"),
      primaryColor:         css("--mermaid-node-bg",      "#1a1a1a"),
      primaryBorderColor:   css("--mermaid-node-border",  "#b8922a"),
      primaryTextColor:     css("--mermaid-text",         "#e8e0d0"),
      secondaryColor:       css("--mermaid-node-bg-2",    "#141414"),
      secondaryBorderColor: css("--mermaid-node-border-2","#5a4a2a"),
      secondaryTextColor:   css("--mermaid-text-2",       "#a89880"),
      tertiaryColor:        css("--mermaid-node-bg-3",    "#111111"),
      tertiaryBorderColor:  css("--mermaid-node-border-3","#3a3028"),
      tertiaryTextColor:    css("--mermaid-text-3",       "#7a6e60"),
      lineColor:            css("--mermaid-line",         "#b8922a"),
      edgeLabelBackground:  css("--mermaid-node-bg",      "#1a1a1a"),
      clusterBkg:           css("--mermaid-node-bg-2",    "#141414"),
      clusterBorder:        css("--mermaid-node-border-2","#5a4a2a"),
      noteBkgColor:         css("--mermaid-note-bg",      "#1f1a10"),
      noteBorderColor:      css("--mermaid-node-border",  "#b8922a"),
      noteTextColor:        css("--mermaid-text",         "#e8e0d0"),
      actorBkg:             css("--mermaid-node-bg",      "#1a1a1a"),
      actorBorder:          css("--mermaid-node-border",  "#b8922a"),
      actorTextColor:       css("--mermaid-text",         "#e8e0d0"),
      signalColor:          css("--mermaid-line",         "#b8922a"),
      signalTextColor:      css("--mermaid-text",         "#e8e0d0"),
      fontFamily:           css("--mermaid-font",         "ui-monospace, monospace"),
      fontSize:             css("--mermaid-font-size",    "14px"),
    },
  });

  const figures = document.querySelectorAll("[data-mermaid-source]");

  for (const fig of figures) {
    const canvas = fig.querySelector(".mermaid-canvas");
    if (!canvas) continue;

    const source = decodeURIComponent(fig.dataset.mermaidSource);
    const id = "mermaid-" + Math.random().toString(36).slice(2, 9);

    try {
      const { svg } = await mermaid.render(id, source);
      canvas.innerHTML = svg;
      canvas.removeAttribute("aria-label");
      canvas.removeAttribute("role");
    } catch (err) {
      canvas.innerHTML = \`<p class="mermaid-error">⚠ \${err.message ?? "Gagal render diagram"}</p>\`;
      console.error("[satteri-mermaid]", err);
    }
  }
})();
</script>
`.trim();

/**
 * @type {import("satteri").MdastPluginDefinition}
 */
export const mermaidPlugin = defineMdastPlugin({
  name: "mermaid",

  code(node) {
    if (node.lang !== "mermaid") return;

    const placeholder = buildPlaceholderHtml(node.value);

    return { raw: placeholder, mdxExpressions: false };
  },

  after(root, ctx) {
    const hasMermaid = ctx.source.includes("```mermaid");
    if (!hasMermaid) return;

    ctx.appendChild(root, {
      type: "html",
      value: CLIENT_SCRIPT,
    });
  },
});


