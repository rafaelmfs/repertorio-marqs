"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IconArrowDown, IconArrowUp, IconTrash } from "@/components/ui/icons";
import type { Setlist } from "@/lib/types/song.types";

type SetlistCardProps = {
  setlist: Setlist;
  onDelete: (id: string) => void;
  onMoveSong: (id: string, from: number, to: number) => void;
  onRemoveSong: (id: string, slug: string) => void;
};

export function SetlistCard({
  setlist,
  onDelete,
  onMoveSong,
  onRemoveSong,
}: SetlistCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <CardTitle>{setlist.name}</CardTitle>
          <CardDescription>{setlist.songs.length} musica(s)</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onDelete(setlist.id)}>
          <IconTrash className="h-3.5 w-3.5" />
          Excluir
        </Button>
      </div>

      <ul className="space-y-2">
        {setlist.songs.map((slug, index) => (
          <li
            key={`${setlist.id}-${slug}`}
            className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
          >
            <span className="text-sm text-slate-700">{slug}</span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveSong(setlist.id, index, index - 1)}
              >
                <IconArrowUp className="h-3.5 w-3.5" />
                Subir
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveSong(setlist.id, index, index + 1)}
              >
                <IconArrowDown className="h-3.5 w-3.5" />
                Descer
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveSong(setlist.id, slug)}
              >
                <IconTrash className="h-3.5 w-3.5" />
                Remover
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
