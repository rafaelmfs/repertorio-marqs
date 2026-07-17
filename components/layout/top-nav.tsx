import { SongMarkdownComposer } from "@/components/layout/song-markdown-composer";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/lib/types/song.types";
import Link from "next/link";

export function TopNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-[#44474c] dark:bg-[#16191d]/95">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Link href={APP_ROUTES.home} className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          Repertorio
        </Link>
        <nav className="flex items-center gap-2">
          <div className="hidden md:block">
            <SongMarkdownComposer />
          </div>
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href={APP_ROUTES.home}>Musicas</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href={APP_ROUTES.lists}>Listas</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
