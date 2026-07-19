"use client";

import { SongCard } from "@/components/songs/song-card";
import { Badge } from "@/components/ui/badge";
import { IconClose, IconMusic, IconSearch } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ToastStack } from "@/components/ui/toast";
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
        <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          <IconMusic className="h-5 w-5 text-slate-500 sm:h-6 sm:w-6 dark:text-slate-400" />
          Repertorio de Cifras
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          Organize seu repertorio local com busca rapida, favoritos e listas.
        </p>
      </div>

      <div className="space-y-2 sm:space-y-3 rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-4 dark:border-[#44474c] dark:bg-[#191c20]">
        <label htmlFor="song-search" className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
          Buscar por titulo ou artista
        </label>
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <Input
            id="song-search"
            placeholder="Ex.: gratidao"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="pl-9 pr-10"
          />
          {query && (
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:hover:text-slate-100"
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
              title="Limpar busca"
            >
              <IconClose className="h-4 w-4" />
            </button>
          )}
        </div>
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
            onAddToList={orderedSetlists.length > 0 ? handleAddSongToSetlist : undefined}
            setlistOptions={setlistOptions}
          />
        ))}
      </div>

      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </section>
  );
}
