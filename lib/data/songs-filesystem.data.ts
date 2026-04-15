import "server-only";

import type { Song, SongFrontmatter, SongListItem } from "@/lib/types/song.types";
import matter from "gray-matter";
import { promises as fs } from "node:fs";
import path from "node:path";

const SONGS_DIRECTORY = path.join(process.cwd(), "songs");

async function readSongFile(filePath: string): Promise<Song> {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data as Partial<SongFrontmatter>;

  if (!data.slug || !data.title) {
    throw new Error(`Song file is missing required frontmatter: ${filePath}`);
  }

  return {
    slug: data.slug,
    title: data.title,
    artist: data.artist,
    content: parsed.content.trimEnd(),
  };
}

export async function readAllSongsFromFilesystem(): Promise<SongListItem[]> {
  const files = await fs.readdir(SONGS_DIRECTORY);

  const songs = await Promise.all(
    files
      .filter((fileName) => fileName.endsWith(".md"))
      .map(async (fileName) => {
        const filePath = path.join(SONGS_DIRECTORY, fileName);
        const song = await readSongFile(filePath);

        return {
          slug: song.slug,
          title: song.title,
          artist: song.artist,
        };
      }),
  );

  return songs.sort((a, b) => a.title.localeCompare(b.title));
}

export async function readSongBySlugFromFilesystem(slug: string): Promise<Song> {
  const files = await fs.readdir(SONGS_DIRECTORY);

  const matchedFile = files.find((fileName) => fileName.endsWith(".md"));
  if (!matchedFile) {
    throw new Error("No songs found in /songs directory");
  }

  for (const fileName of files) {
    if (!fileName.endsWith(".md")) {
      continue;
    }

    const filePath = path.join(SONGS_DIRECTORY, fileName);
    const song = await readSongFile(filePath);

    if (song.slug === slug) {
      return song;
    }
  }

  throw new Error(`Song not found: ${slug}`);
}
