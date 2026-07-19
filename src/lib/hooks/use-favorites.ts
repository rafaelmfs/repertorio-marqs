
import { usePersistentState } from "@/lib/hooks/use-persistent-state";
import { isFavorite, toggleFavoriteSlug } from "@/lib/services/favorites.service";
import { STORAGE_KEYS } from "@/lib/types/song.types";
import { useCallback } from "react";

type UseFavoritesOptions = {
  storageKey?: string;
  initialValue?: string[];
};

export function useFavorites(options: UseFavoritesOptions = {}) {
  const storageKey = options.storageKey ?? STORAGE_KEYS.favorites;
  const initialValue = options.initialValue ?? [];
  const [favorites, setFavorites] = usePersistentState<string[]>(
    storageKey,
    initialValue,
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      setFavorites((current) => toggleFavoriteSlug(current, slug));
    },
    [setFavorites],
  );

  const isSlugFavorite = useCallback(
    (slug: string) => isFavorite(favorites, slug),
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    isSlugFavorite,
  };
}
