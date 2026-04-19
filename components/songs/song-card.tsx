"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IconExternal, IconMusic, IconPlus, IconStar } from "@/components/ui/icons";
import { Select } from "@/components/ui/select";
import type { SongListItem } from "@/lib/types/song.types";
import Link from "next/link";
import { useEffect, useState } from "react";

type SongSetlistOption = {
  id: string;
  name: string;
};

type SongCardProps = {
  song: SongListItem;
  isFavorite: boolean;
  onToggleFavorite: (slug: string) => void;
  onAddToList?: (slug: string, setlistId: string) => void;
  setlistOptions?: SongSetlistOption[];
};

export function SongCard({
  song,
  isFavorite,
  onToggleFavorite,
  onAddToList,
  setlistOptions = [],
}: SongCardProps) {
  const [selectedSetlistId, setSelectedSetlistId] = useState<string>("");

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
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle>{song.title}</CardTitle>
          <CardDescription>{song.artist ?? "Artista nao informado"}</CardDescription>
        </div>
        {isFavorite ? <Badge>Favorita</Badge> : null}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/songs/${song.slug}`}>
              <IconExternal className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Abrir cifra</span>
            </Link>
          </Button>
          <Button
            variant={isFavorite ? "solid" : "ghost"}
            size="sm"
            onClick={() => onToggleFavorite(song.slug)}
          >
            <IconStar className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{isFavorite ? "Desfavoritar" : "Favoritar"}</span>
          </Button>
        </div>
        {onAddToList ? (
          <div className="flex flex-1 flex-wrap items-center gap-2">
            <Select
              aria-label={`Escolher lista para ${song.title}`}
              className="h-8 min-w-44 max-w-56"
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

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <IconMusic className="h-3.5 w-3.5" />
        <span>Arquivo local em Markdown</span>
      </div>
    </Card>
  );
}
