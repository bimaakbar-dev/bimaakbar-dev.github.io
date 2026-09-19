import { defineHastPlugin } from "satteri";

export const hastAbbr = defineHastPlugin({
  name: "stradocs-abbr",

  element: {
    filter: ["abbr"],
    visit(node) {
      if (node.tagName !== "abbr") return node;

      const title = node.properties?.title;
      if (typeof title !== "string" || !title.trim()) return node;

      const tooltipId = `abbr-${Math.random().toString(36).slice(2, 9)}`;

      return {
        type: "element",
        tagName: "span",
        properties: { className: ["abbr"] },
        children: [
          {
            type: "element",
            tagName: "abbr",
            properties: {
              "aria-label": title,
              "aria-describedby": tooltipId,
            },
            children: node.children ?? [],
          },
          {
            type: "element",
            tagName: "span",
            properties: {
              className: ["abbr-tooltip"],
              role: "tooltip",
              id: tooltipId,
            },
            children: [{ type: "text", value: title }],
          },
        ],
      };
    },
  },
});