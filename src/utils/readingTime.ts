// src/lib/utils/readingTime.ts

export function stripMarkdown(content: string): string {
  if (!content?.trim()) return "";

  let text = content;

  text = text.replace(/^\s*---[\s\S]*?---\s*/, "");

  const lines = text.split("\n");
  text = lines
    .filter((line) => {
      const trimmed = line.trim();
      return (
        !trimmed.startsWith("import ") &&
        !trimmed.startsWith("export ") &&
        !trimmed.startsWith("// ") &&
        !trimmed.startsWith("/*") &&
        !trimmed.startsWith("*")
      );
    })
    .join("\n");

  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  text = text.replace(/\{[^}]*\}/g, "");

  text = text.replace(/<[^>]*>/g, " ");

  text = text.replace(/^#{1,6}\s+/gm, "");

  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");

  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  text = text.replace(/!\[[^\]]*\]\([^)]+\)/g, "");

  text = text.replace(/`([^`]+)`/g, "$1");

  text = text.replace(/```[\s\S]*?```/g, "");

  text = text.replace(/[#*`>_\-+~=|]/g, " ");

  text = text.replace(/\s+/g, " ").trim();

  return text;
}

export function countWords(text: string): number {
  if (!text?.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function getReadingTimeMinutes(
  content?: string,
  wordsPerMinute: number = 200,
): number {
  if (!content?.trim()) return 1;
  const cleanText = stripMarkdown(content);
  const wordCount = countWords(cleanText);
  if (wordCount === 0) return 1;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}