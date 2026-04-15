"use client";

import { SongCard } from "@/components/songs/song-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { useSongSearch } from "@/lib/hooks/use-song-search";
import type { SongListItem } from "@/lib/types/song.types";

type SongsPageClientProps = {
  songs: SongListItem[];
  total: number;
};

export function SongsPageClient({ songs, total }: SongsPageClientProps) {
  const { query, setQuery, filteredSongs } = useSongSearch(songs);
  const { isSlugFavorite, toggleFavorite } = useFavorites();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Repertorio de Cifras
        </h1>
        <p className="text-sm text-slate-600">
          Organize seu repertorio local com busca rapida, favoritos e listas.
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <label htmlFor="song-search" className="text-sm font-medium text-slate-700">
          Buscar por titulo ou artista
        </label>
        <Input
          id="song-search"
          placeholder="Ex.: gratidao"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <div className="flex gap-2">
          <Badge>{filteredSongs.length} encontradas</Badge>
          <Badge>{total} no total</Badge>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.slug}
            song={song}
            isFavorite={isSlugFavorite(song.slug)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
