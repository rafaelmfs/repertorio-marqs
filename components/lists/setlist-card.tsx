"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IconArrowDown, IconArrowUp, IconExternal, IconTrash } from "@/components/ui/icons";
import type { Setlist } from "@/lib/types/song.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
            className="flex cursor-pointer justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 items-center dark:border-[#44474c] dark:bg-[#15181c]"
            role="link"
            tabIndex={0}
            aria-label={`Abrir musica ${slug}`}
            onClick={() => router.push(`/songs/${slug}`)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                router.push(`/songs/${slug}`);
              }
            }}
          >
            <span className="text-sm w-full text-slate-700 md:whitespace-nowrap dark:text-slate-200">{slug}</span>
            <div
              className="flex  items-center justify-between gap-1"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                <Button asChild variant="outline" size="sm" className="min-h-10">
                  <Link
                    href={`/songs/${slug}`}
                    aria-label={`Acessar musica ${slug}`}
                  >
                    <IconExternal className="h-3.5 w-3.5" />
                    <span className="hidden md:inline">Acessar</span>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onMoveSong(setlist.id, index, index - 1)}
                >
                  <IconArrowUp className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Subir</span>
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onMoveSong(setlist.id, index, index + 1)}
                >
                  <IconArrowDown className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Descer</span>
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onRemoveSong(setlist.id, slug)}
                >
                  <IconTrash className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Remover</span>
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
