import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repertorio de Cifras",
  description: "Aplicacao pessoal para organizar cifras em Markdown",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Repertorio",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.globalThis||(window.globalThis=window);var t=null;try{t=localStorage.getItem('repertorio:theme')}catch(e){}if(!t){var m=document.cookie.match(/(?:^|; )repertorio_theme=([^;]*)/);t=m?decodeURIComponent(m[1]):null}var d=t==='dark'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);",
          }}
        />
      </head>
      <body className="text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
