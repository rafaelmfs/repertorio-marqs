import "server-only";

import {
  readAllSongsFromFilesystem,
  readSongBySlugFromFilesystem,
} from "@/lib/data/songs-filesystem.data";
import type { Song, SongListItem } from "@/lib/types/song.types";

export type SongRepository = {
  getAllSongs: () => Promise<SongListItem[]>;
  getSongBySlug: (slug: string) => Promise<Song>;
};

export function createFilesystemSongRepository(): SongRepository {
  return {
    getAllSongs: readAllSongsFromFilesystem,
    getSongBySlug: readSongBySlugFromFilesystem,
  };
}
