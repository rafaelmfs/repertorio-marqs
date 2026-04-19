"use client";

import { SongCard } from "@/components/songs/song-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ToastStack } from "@/components/ui/toast";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { useSetlists } from "@/lib/hooks/use-setlists";
import { useSongSearch } from "@/lib/hooks/use-song-search";
import { useToast } from "@/lib/hooks/use-toast";
import type { SongListItem } from "@/lib/types/song.types";

type SongsPageClientProps = {
  songs: SongListItem[];
  total: number;
};

export function SongsPageClient({ songs, total }: SongsPageClientProps) {
  const { query, setQuery, filteredSongs } = useSongSearch(songs);
  const { isSlugFavorite, toggleFavorite } = useFavorites();
  const { orderedSetlists, addSong } = useSetlists();
  const { toasts, pushToast, removeToast } = useToast();

  const setlistOptions = orderedSetlists.map((setlist) => ({
    id: setlist.id,
    name: setlist.name,
  }));

  function handleAddSongToSetlist(slug: string, setlistId: string) {
    addSong(setlistId, slug);
    const setlistName = orderedSetlists.find((setlist) => setlist.id === setlistId)?.name;
    pushToast(`Musica adicionada em \"${setlistName ?? "lista"}\"`);
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
          Repertorio de Cifras
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Organize seu repertorio local com busca rapida, favoritos e listas.
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3 rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
        <label htmlFor="song-search" className="text-xs sm:text-sm font-medium text-slate-700">
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

      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
        {filteredSongs.map((song) => (
          <SongCard
            key={song.slug}
            song={song}
            isFavorite={isSlugFavorite(song.slug)}
            onToggleFavorite={toggleFavorite}
            onAddToList={orderedSetlists.length > 0 ? handleAddSongToSetlist : undefined}
            setlistOptions={setlistOptions}
          />
        ))}
      </div>

      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </section>
  );
}
