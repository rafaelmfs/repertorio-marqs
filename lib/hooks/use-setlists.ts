"use client";

import { usePersistentState } from "@/lib/hooks/use-persistent-state";
import {
  addSongToSetlist,
  createSetlist,
  removeSetlist,
  removeSongFromSetlist,
  reorderSetlistSongs,
} from "@/lib/services/setlist.service";
import { STORAGE_KEYS, type SetlistsState } from "@/lib/types/song.types";
import { useCallback, useMemo } from "react";

type UseSetlistsOptions = {
  storageKey?: string;
  initialValue?: SetlistsState;
  idSeed?: string;
};

export function useSetlists(options: UseSetlistsOptions = {}) {
  const storageKey = options.storageKey ?? STORAGE_KEYS.setlists;
  const initialValue = options.initialValue ?? {};
  const idSeed = options.idSeed ?? "setlist";

  const [setlists, setSetlists] = usePersistentState<SetlistsState>(
    storageKey,
    initialValue,
  );

  const orderedSetlists = useMemo(
    () => Object.values(setlists).sort((a, b) => a.name.localeCompare(b.name)),
    [setlists],
  );

  const createNewSetlist = useCallback(
    (name: string) => {
      setSetlists((current) => createSetlist(current, name, idSeed));
    },
    [idSeed, setSetlists],
  );

  const deleteSetlist = useCallback(
    (setlistId: string) => {
      setSetlists((current) => removeSetlist(current, setlistId));
    },
    [setSetlists],
  );

  const addSong = useCallback(
    (setlistId: string, slug: string) => {
      setSetlists((current) => {
        const setlist = current[setlistId];
        if (!setlist) {
          return current;
        }

        return {
          ...current,
          [setlistId]: addSongToSetlist(setlist, slug),
        };
      });
    },
    [setSetlists],
  );

  const removeSong = useCallback(
    (setlistId: string, slug: string) => {
      setSetlists((current) => {
        const setlist = current[setlistId];
        if (!setlist) {
          return current;
        }

        return {
          ...current,
          [setlistId]: removeSongFromSetlist(setlist, slug),
        };
      });
    },
    [setSetlists],
  );

  const moveSong = useCallback(
    (setlistId: string, fromIndex: number, toIndex: number) => {
      setSetlists((current) => {
        const setlist = current[setlistId];
        if (!setlist) {
          return current;
        }

        return {
          ...current,
          [setlistId]: reorderSetlistSongs(setlist, fromIndex, toIndex),
        };
      });
    },
    [setSetlists],
  );

  return {
    setlists,
    orderedSetlists,
    createNewSetlist,
    deleteSetlist,
    addSong,
    removeSong,
    moveSong,
  };
}
