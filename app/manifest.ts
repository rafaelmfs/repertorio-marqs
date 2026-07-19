import { APP_ROUTES } from "@/lib/constants/routes.constants";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Repertorio de Cifras",
    short_name: "Repertorio",
    description: "Repertorio pessoal de cifras em Markdown",
    start_url: APP_ROUTES.home,
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
