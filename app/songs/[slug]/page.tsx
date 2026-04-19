import { SongViewer } from "@/app/songs/[slug]/_components/song-viewer.client";
import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_ROUTES } from "@/lib/types/song.types";
import { getSongDetailViewModel } from "@/lib/viewmodels/songs.view-model";
import Link from "next/link";
import { notFound } from "next/navigation";

type SongPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SongPage({ params }: SongPageProps) {
  const { slug } = await params;

  const song = await getSongDetailViewModel(slug).catch(() => null);

  if (!song) {
    notFound();
  }

  return (
    <>
      <TopNav />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{song.title}</h1>
            <p className="text-sm text-slate-600">{song.artist ?? "Artista nao informado"}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link href={APP_ROUTES.home}>Voltar</Link>
          </Button>
        </div>

        <Card className="p-0">
          <SongViewer content={song.content} />
        </Card>
      </main>
    </>
  );
}
