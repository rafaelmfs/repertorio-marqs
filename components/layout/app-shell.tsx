import Link from "next/link";
import { SongMarkdownComposer } from "@/components/layout/song-markdown-composer";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { IconList, IconMusic } from "@/components/ui/icons";
import { APP_ROUTES } from "@/lib/constants/routes.constants";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <Link href={APP_ROUTES.home} className="brand" aria-label="Ir para início">
          <span className="brand-mark">♫</span><span>repertório<span className="brand-dot">.</span></span>
        </Link>
        <p className="eyebrow side-label">Biblioteca</p>
        <nav className="side-nav" aria-label="Navegação principal">
          <Link href={APP_ROUTES.home} className="side-link"><IconMusic /> <span>Início</span></Link>
          <Link href={`${APP_ROUTES.home}#musicas`} className="side-link"><IconMusic /> <span>Músicas</span></Link>
          <Link href={APP_ROUTES.lists} className="side-link"><IconList /> <span>Minhas listas</span></Link>
        </nav>
        <div className="sidebar-bottom">
          <div className="sync-card"><span className="sync-icon">✓</span><div><strong>Biblioteca local</strong><p>Conteúdo sincronizado</p></div></div>
          <p className="made-with">Feito para tocar com menos atrito.</p>
        </div>
      </aside>
      <div className="app-main">
        <header className="app-topbar">
          <div className="breadcrumb">Biblioteca <span>/</span> Repertório</div>
          <div className="top-actions"><SongMarkdownComposer /><ThemeToggle /><span className="avatar">M</span></div>
        </header>
        {children}
      </div>
    </div>
  );
}
