export const APP_ROUTES = Object.freeze({
  home: "/",
  lists: "/lists",
  manifest: "/manifest.webmanifest",
  song: (slug: string) => `/songs/${slug}` as const,
});
