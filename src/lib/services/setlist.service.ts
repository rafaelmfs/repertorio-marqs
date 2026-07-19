import type { Setlist, SetlistsState } from "@/lib/types/song.types";

function createSetlistId(seed: string): string {
  return `${seed}-${Date.now()}`;
}

export function createSetlist(
  state: SetlistsState,
  name: string,
  seed: string = "setlist",
): SetlistsState {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return state;
  }

  const id = createSetlistId(seed);
  return {
    ...state,
    [id]: {
      id,
      name: trimmedName,
      songs: [],
    },
  };
}

export function removeSetlist(
  state: SetlistsState,
  setlistId: string,
): SetlistsState {
  const nextState = { ...state };
  delete nextState[setlistId];
  return nextState;
}

export function addSongToSetlist(
  setlist: Setlist,
  songSlug: string,
): Setlist {
  if (setlist.songs.includes(songSlug)) {
    return setlist;
  }

  return {
    ...setlist,
    songs: [...setlist.songs, songSlug],
  };
}

export function removeSongFromSetlist(
  setlist: Setlist,
  songSlug: string,
): Setlist {
  return {
    ...setlist,
    songs: setlist.songs.filter((slug) => slug !== songSlug),
  };
}

export function reorderSetlistSongs(
  setlist: Setlist,
  fromIndex: number,
  toIndex: number,
): Setlist {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= setlist.songs.length ||
    toIndex >= setlist.songs.length
  ) {
    return setlist;
  }

  const songs = [...setlist.songs];
  const [moved] = songs.splice(fromIndex, 1);
  songs.splice(toIndex, 0, moved);

  return {
    ...setlist,
    songs,
  };
}
