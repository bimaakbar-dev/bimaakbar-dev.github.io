// src/lib/plugins/satteri/table.ts
import type { Element } from "hast";
import { defineHastPlugin } from "satteri";

export const hastTable = defineHastPlugin({
  name: "satteri-table",
  element: {
    filter: ["table"],
    visit(node: Element, ctx) {
      ctx.replaceNode(node, {
        type: "element",
        tagName: "div",
        properties: { className: ["table-wrapper"] },
        children: [node],
      });
    },
  },
});
