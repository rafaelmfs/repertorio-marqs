"use client";

import { SetlistCard } from "@/components/lists/setlist-card";
import { SongCard } from "@/components/songs/song-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconClose, IconList, IconPlus } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ToastStack } from "@/components/ui/toast";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { useSetlists } from "@/lib/hooks/use-setlists";
import { useSongSearch } from "@/lib/hooks/use-song-search";
import { useToast } from "@/lib/hooks/use-toast";
import type { SongListItem } from "@/lib/types/song.types";
import { useState } from "react";

type ListsPageClientProps = {
  songs: SongListItem[];
};

export function ListsPageClient({ songs }: ListsPageClientProps) {
  const [newListName, setNewListName] = useState("");
  const { orderedSetlists, createNewSetlist, deleteSetlist, addSong, moveSong, removeSong } =
    useSetlists();
  const { query, setQuery, filteredSongs } = useSongSearch(songs);
  const { isSlugFavorite, toggleFavorite } = useFavorites();
  const { toasts, pushToast, removeToast } = useToast();

  const setlistOptions = orderedSetlists.map((setlist) => ({
    id: setlist.id,
    name: setlist.name,
  }));

  function handleCreateSetlist() {
    const name = newListName.trim();
    if (!name) {
      return;
    }

    createNewSetlist(name);
    pushToast(`Lista \"${name}\" criada com sucesso`);
    setNewListName("");
  }

  function handleDeleteSetlist(setlistId: string) {
    const setlistName = orderedSetlists.find((setlist) => setlist.id === setlistId)?.name;
    deleteSetlist(setlistId);
    pushToast(`Lista \"${setlistName ?? ""}\" removida`);
  }

  function handleRemoveSongFromSetlist(setlistId: string, slug: string) {
    removeSong(setlistId, slug);
    pushToast(`Musica \"${slug}\" removida da lista`);
  }

  function handleAddSongToSetlist(slug: string, setlistId: string) {
    addSong(setlistId, slug);
    const setlistName = orderedSetlists.find((setlist) => setlist.id === setlistId)?.name;
    pushToast(`Musica adicionada em \"${setlistName ?? "lista"}\"`);
  }

  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl font-semibold text-slate-900">
          <IconList className="h-5 w-5" />
          Listas
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Crie listas, reorganize a ordem das musicas e abra cada cifra direto por aqui.
        </p>
      </div>

      <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Nome da lista"
            value={newListName}
            onChange={(event) => setNewListName(event.target.value)}
          />
          <Button onClick={handleCreateSetlist}>
            <IconPlus className="h-3.5 w-3.5" />
            Lista
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-3 sm:mb-4 flex items-end justify-between gap-2 sm:gap-3">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">Listas criadas</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Reordene, abra a cifra ou remova musicas.
              </p>
            </div>
            <Badge>{orderedSetlists.length} listas</Badge>
          </div>

          <div className="song-scrollbar max-h-[65vh] space-y-3 overflow-y-auto pr-1">
            {orderedSetlists.map((setlist) => (
              <SetlistCard
                key={setlist.id}
                setlist={setlist}
                onDelete={handleDeleteSetlist}
                onMoveSong={moveSong}
                onRemoveSong={handleRemoveSongFromSetlist}
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
          <div className="mb-3 sm:mb-4 flex items-end justify-between gap-2 sm:gap-3">
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900">Musicas</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Busque uma musica e adicione na lista sem sair desta tela.
              </p>
            </div>
            <Badge className="whitespace-nowrap">{filteredSongs?.length} resultados</Badge>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="relative">
              <Input
                placeholder="Buscar musica por titulo ou artista"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="pr-10"
              />
              {query && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                  onClick={() => setQuery("")}
                  aria-label="Limpar busca"
                  title="Limpar busca"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="song-scrollbar max-h-[55vh] sm:max-h-[65vh] space-y-2 sm:space-y-3 overflow-y-auto pr-1">
              {filteredSongs.map((song) => (
                <SongCard
                  key={song.slug}
                  song={song}
                  onAddToList={orderedSetlists.length > 0 ? handleAddSongToSetlist : undefined}
                  setlistOptions={setlistOptions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </section>
  );
}
