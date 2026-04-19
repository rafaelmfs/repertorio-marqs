"use client";

import { filterSongsByQuery } from "@/lib/services/song-search.service";
import type { SongListItem } from "@/lib/types/song.types";
import { useMemo, useState } from "react";

import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";

const SEARCH_DEBOUNCE_MS = 300;

export function useSongSearch(songs: SongListItem[]) {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  const filteredSongs = useMemo(
    () => filterSongsByQuery(songs, debouncedQuery),
    [songs, debouncedQuery],
  );

  return {
    query,
    setQuery,
    filteredSongs,
  };
}
