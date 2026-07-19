export function toggleFavoriteSlug(
  favorites: string[],
  slug: string,
): string[] {
  return favorites.includes(slug)
    ? favorites.filter((item) => item !== slug)
    : [...favorites, slug];
}

export function isFavorite(favorites: string[], slug: string): boolean {
  return favorites.includes(slug);
}
