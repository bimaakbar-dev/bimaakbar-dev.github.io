import { defineHastPlugin } from "satteri";

export const hastAbbr = defineHastPlugin({
  name: "satteri-abbr",

  element: {
    filter: ["abbr"],
    visit(node) {
      const title = node.properties?.title;
      if (typeof title !== "string" || !title.trim()) return;

      // Return node baru → Sätteri ganti node yang dikunjungi dengan ini
      return {
        type: "element",
        tagName: "span",
        properties: { className: ["abbr"] },
        children: [
          {
            type: "element",
            tagName: "abbr",
            properties: { title },
            children: node.children ?? [],
          },
          {
            type: "element",
            tagName: "span",
            properties: { className: ["abbr-tooltip"], role: "tooltip" },
            children: [{ type: "text", value: title }],
          },
        ],
      };
    },
  },
});