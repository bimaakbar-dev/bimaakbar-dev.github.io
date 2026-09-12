import { defineMdastPlugin } from "satteri";

const OPEN_ABBR  = /^<abbr(\s+[^>]*)?>/i;
const CLOSE_ABBR = /^<\/abbr\s*>/i;
const TITLE_ATTR = /\btitle\s*=\s*(?:"([^"]*)"|'([^']*)')/i;

export const mdastAbbr = defineMdastPlugin({
  name: "stradocs-abbr",

  paragraph(node, ctx) {
    const children = node.children;
    if (!Array.isArray(children) || children.length < 3) return;

    let changed = false;
    const next = [];

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (child.type !== "html") {
        next.push(child);
        continue;
      }

      const openMatch = child.value.match(OPEN_ABBR);
      if (!openMatch) {
        next.push(child);
        continue;
      }

      // cari title di antara atribut
      const titleMatch = (openMatch[1] || "").match(TITLE_ATTR);
      const title = titleMatch ? (titleMatch[1] ?? titleMatch[2]) : null;

      const textNode  = children[i + 1];
      const closeNode = children[i + 2];

      if (
        !title ||
        textNode?.type  !== "text" ||
        closeNode?.type !== "html" ||
        !CLOSE_ABBR.test(closeNode.value)
      ) {
        next.push(child);
        continue;
      }

      const id = `abbr-${Math.random().toString(36).slice(2, 9)}`;

      next.push({
        type: "html",
        value:
          `<span class="abbr">` +
          `<abbr aria-label="${title}" aria-describedby="${id}">${textNode.value}</abbr>` +
          `<span class="abbr-tooltip" role="tooltip" id="${id}">${title}</span>` +
          `</span>`,
      });

      changed = true;
      i += 2; // lompati text + closing tag
    }

    if (changed) {
      ctx.setProperty(node, "children", next);
    }
  },
});