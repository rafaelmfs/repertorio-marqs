"use client";

import { SetlistCard } from "@/components/lists/setlist-card";
import { SongCard } from "@/components/songs/song-card";
import { Button } from "@/components/ui/button";
import { IconList, IconPlus } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ToastStack } from "@/components/ui/toast";
import { useFavorites } from "@/lib/hooks/use-favorites";
import { useSetlists } from "@/lib/hooks/use-setlists";
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

  function handleAddSongToSetlist(slug: string, setlistId: string) {
    addSong(setlistId, slug);
    const setlistName = orderedSetlists.find((setlist) => setlist.id === setlistId)?.name;
    pushToast(`Musica adicionada em \"${setlistName ?? "lista"}\"`);
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

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-slate-900">
          <IconList className="h-5 w-5" />
          Listas
        </h1>
        <p className="text-sm text-slate-600">
          Crie listas de culto ou ensaio e adicione musicas com um clique.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Nome da lista"
            value={newListName}
            onChange={(event) => setNewListName(event.target.value)}
          />
          <Button onClick={handleCreateSetlist}>
            <IconPlus className="h-3.5 w-3.5" />
            Criar lista
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {songs.map((song) => (
          <SongCard
            key={song.slug}
            song={song}
            isFavorite={isSlugFavorite(song.slug)}
            onToggleFavorite={toggleFavorite}
            onAddToList={handleAddSongToSetlist}
            setlistOptions={setlistOptions}
          />
        ))}
      </div>

      <div className="space-y-3">
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

      <ToastStack toasts={toasts} onDismiss={removeToast} />
    </section>
  );
}
