export function normalizeForSearch(value: string): string {
  return value.trim().toLowerCase();
}

export function includesNormalized(value: string, query: string): boolean {
  return normalizeForSearch(value).includes(normalizeForSearch(query));
}
