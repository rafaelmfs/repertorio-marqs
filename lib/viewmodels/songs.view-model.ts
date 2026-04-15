import "server-only";

import { createFilesystemSongRepository } from "@/lib/repositories/song.repository";
import type { Song, SongListItem } from "@/lib/types/song.types";

type SongsPageViewModel = {
  songs: SongListItem[];
  total: number;
};

const songRepository = createFilesystemSongRepository();

export async function getSongsPageViewModel(): Promise<SongsPageViewModel> {
  const songs = await songRepository.getAllSongs();

  return {
    songs,
    total: songs.length,
  };
}

export async function getSongDetailViewModel(slug: string): Promise<Song> {
  return songRepository.getSongBySlug(slug);
}
