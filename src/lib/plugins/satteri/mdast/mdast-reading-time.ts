import { getReadingTime } from "~/utils/readingTime";
import { defineMdastPlugin } from "satteri";

export const mdastReadingTime = defineMdastPlugin({
  name: "mdast-reading-time",
  after(root, ctx) {
    const textOnPage = ctx.textContent(root);
    const rt = getReadingTime(textOnPage);

    if (ctx.data.astro) {
      ctx.data.astro.frontmatter.minutesRead = rt.text;
      ctx.data.astro.frontmatter.readingTime = { minutes: rt.minutes, words: rt.words };
    }
    
    (ctx.data as any).minutesRead = rt.text;
    (ctx.data as any).readingTime = { minutes: rt.minutes, words: rt.words };
  },
});