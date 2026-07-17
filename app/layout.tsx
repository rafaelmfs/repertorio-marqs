import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
    <html lang="pt-BR" className="h-full antialiased">
      <body className="text-slate-900">
        {children}
        <Script id="legacy-global-this" strategy="beforeInteractive">
          {"window.globalThis||(window.globalThis=window);"}
        </Script>
      </body>
    </html>
  );
}
