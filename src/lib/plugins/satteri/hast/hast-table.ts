// src/lib/plugins/satteri/table.ts
import { defineHastPlugin } from 'satteri';

export const hastTable = defineHastPlugin({
  name: 'stradocs-table',
  element: {
    filter: ['table'],
    visit(node, ctx) {
    	if (node.tagName !== "table") return node;
      ctx.replaceNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrapper'] },
        children: [node],
      });
    },
  },
});
