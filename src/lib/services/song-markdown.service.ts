import { breakCifraLines } from "../utils/cifra-line-break";
type SongMarkdownInput = {
  title: string;
  artist?: string;
  slug?: string;
  content: string;
};

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

export function convertHtmlToMarkdown(value: string): string {
  if (!/<\/?[a-z][\s\S]*>/i.test(value)) {
    return value;
  }

  const plainText = value
    .replace(/\r\n/g, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|ul|ol|li|h[1-6]|tr|table|pre)>/gi, "\n")
    .replace(/<(p|div|section|article|ul|ol|li|h[1-6]|tr|table|pre)[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00A0/g, " ");

  return decodeHtmlEntities(plainText).trim();
}

export function createSongSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function buildSongMarkdown({
  title,
  artist,
  slug,
  content,
}: SongMarkdownInput): string {
  const normalizedTitle = title.trim();
  const normalizedArtist = artist?.trim() ?? "";
  const normalizedSlug = (slug?.trim() || createSongSlug(normalizedTitle)).trim();
  let normalizedContent = convertHtmlToMarkdown(content).trim();
  normalizedContent = breakCifraLines(normalizedContent, 48);

  const frontmatterLines = [
    "---",
    `slug: ${normalizedSlug}`,
    `title: ${normalizedTitle}`,
    ...(normalizedArtist ? [`artist: ${normalizedArtist}`] : []),
    "---",
  ];

  return `${frontmatterLines.join("\n")}\n\n${normalizedContent}\n`;
}
