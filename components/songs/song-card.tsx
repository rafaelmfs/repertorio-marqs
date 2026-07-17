"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IconMusic, IconPlus } from "@/components/ui/icons";
import { Select } from "@/components/ui/select";
import type { SongListItem } from "@/lib/types/song.types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SongSetlistOption = {
  id: string;
  name: string;
};

type SongCardProps = {
  song: SongListItem;
  onAddToList?: (slug: string, setlistId: string) => void;
  setlistOptions?: SongSetlistOption[];
};

export function SongCard({
  song,
  onAddToList,
  setlistOptions = [],
}: SongCardProps) {
  const router = useRouter();
  const [selectedSetlistId, setSelectedSetlistId] = useState<string>("");
  const songHref = `/songs/${song.slug}`;

  useEffect(() => {
    if (setlistOptions.length === 0) {
      setSelectedSetlistId("");
      return;
    }

    setSelectedSetlistId((current) => {
      if (current && setlistOptions.some((option) => option.id === current)) {
        return current;
      }

      return setlistOptions[0].id;
    });
  }, [setlistOptions]);

  const canAddToList = Boolean(
    onAddToList && selectedSetlistId && setlistOptions.length > 0,
  );

  return (
    <Card
      className="space-y-3 cursor-pointer"
      role="link"
      tabIndex={0}
      aria-label={`Abrir musica ${song.title}`}
      onClick={() => router.push(songHref)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          router.push(songHref);
        }
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle>{song.title}</CardTitle>
          <CardDescription>{song.artist ?? "Artista nao informado"}</CardDescription>
        </div>
      </div>

      <div className="flex flex-col gap-2">

        {onAddToList ? (
          <div className="flex flex-1 items-center gap-2" onClick={(event) => event.stopPropagation()}>
            <Select
              aria-label={`Escolher lista para ${song.title}`}
              className="h-8 min-w-44 flex-1"
              value={selectedSetlistId}
              onChange={(event) => setSelectedSetlistId(event.target.value)}
              disabled={setlistOptions.length === 0}
            >
              {setlistOptions.length === 0 ? (
                <option value="">Sem listas criadas</option>
              ) : (
                setlistOptions.map((setlist) => (
                  <option key={setlist.id} value={setlist.id}>
                    {setlist.name}
                  </option>
                ))
              )}
            </Select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (!canAddToList) {
                  return;
                }

                onAddToList(song.slug, selectedSetlistId);
              }}
              disabled={!canAddToList}
            >
              <IconPlus className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Adicionar</span>
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
        <IconMusic className="h-3.5 w-3.5" />
        <span>Arquivo local em Markdown</span>
      </div>
    </Card>
  );
}
