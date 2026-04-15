"use client";

import { filterSongsByQuery } from "@/lib/services/song-search.service";
import type { SongListItem } from "@/lib/types/song.types";
import { useMemo, useState } from "react";

export function useSongSearch(songs: SongListItem[]) {
  const [query, setQuery] = useState("");

  const filteredSongs = useMemo(
    () => filterSongsByQuery(songs, query),
    [songs, query],
  );

  return {
    query,
    setQuery,
    filteredSongs,
  };
}
