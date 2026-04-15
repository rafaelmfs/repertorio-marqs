import type { SongListItem } from "@/lib/types/song.types";
import { includesNormalized } from "@/lib/utils/string.utils";

export function filterSongsByQuery(
  songs: SongListItem[],
  query: string,
): SongListItem[] {
  if (!query.trim()) {
    return songs;
  }

  return songs.filter((song) => {
    const matchesTitle = includesNormalized(song.title, query);
    const matchesArtist = song.artist
      ? includesNormalized(song.artist, query)
      : false;

    return matchesTitle || matchesArtist;
  });
}
