import type { Song, SongListItem } from "@/lib/types/song.types";

const markdownFiles = import.meta.glob("../songs/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function normalizeSongContent(content: string) {
  const trimmed = content.trim();
  const pre = trimmed.match(/^<pre>\s*([\s\S]*?)\s*<\/pre>$/i);
  return (pre?.[1] ?? content).trimEnd();
}

export const songs: Song[] = Object.values(markdownFiles)
  .map((raw) => {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) throw new Error("Arquivo de musica sem frontmatter");
    const data = Object.fromEntries(match[1].split(/\r?\n/).map((line) => {
      const separator = line.indexOf(":");
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }));
    if (!data.slug || !data.title) throw new Error("Musica sem slug ou titulo");
    return {
      slug: data.slug,
      title: data.title,
      artist: data.artist || undefined,
      content: normalizeSongContent(match[2]),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

export const songList: SongListItem[] = songs.map(({ slug, title, artist }) => ({ slug, title, artist }));
export function getSong(slug: string) { return songs.find((song) => song.slug === slug); }
