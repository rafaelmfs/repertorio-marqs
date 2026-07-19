import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
} from "@tanstack/react-router";
import { MobileTopNav } from "@/components/layout/mobile-top-nav";
import { BackButton } from "@/components/back-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Card } from "@/components/ui/card";
import { SongViewer } from "@/components/songs/song-viewer";
import { SongsPage } from "@/pages/songs-page";
import { ListsPage } from "@/pages/lists-page";
import { getSong } from "@/data/songs";

function RootLayout() { return <Outlet />; }
const rootRoute = createRootRoute({ component: RootLayout, notFoundComponent: () => <main className="mx-auto max-w-5xl p-8">Musica nao encontrada.</main> });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <><MobileTopNav /><main className="mx-auto w-full max-w-5xl px-4 py-8"><SongsPage /></main></>,
});

const listsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lists",
  component: () => <><MobileTopNav /><main className="mx-auto w-full max-w-5xl px-4 py-8"><ListsPage /></main></>,
});

const songRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/songs/$slug",
  loader: ({ params }) => getSong(params.slug) ?? notFound(),
  component: SongPage,
});

function SongPage() {
  const song = songRoute.useLoaderData();
  return <main className="mx-auto w-full max-w-5xl px-4 py-8">
    <div className="mb-4 flex items-center justify-between gap-2">
      <div className="min-w-0 flex-1"><h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{song.title}</h1><p className="text-sm text-slate-600 dark:text-slate-300">{song.artist ?? "Artista nao informado"}</p></div>
      <div className="flex shrink-0 items-center gap-2"><ThemeToggle /><BackButton /></div>
    </div>
    <Card className="p-0"><SongViewer content={song.content} /></Card>
  </main>;
}

const routeTree = rootRoute.addChildren([indexRoute, listsRoute, songRoute]);
export const router = createRouter({ routeTree });
