import { defineHastPlugin } from "satteri";

export const satteriAbbr = defineHastPlugin({
  name: "satteri-abbr",

  element: {
    filter: ["abbr"],
    visit(node) {
      const title = node.properties?.title;
      if (typeof title !== "string" || !title.trim()) return;

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
              // title DIBUANG → native tooltip tidak muncul
              "aria-label": title,          // a11y tetap dapat deskripsi
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