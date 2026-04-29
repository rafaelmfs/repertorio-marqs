export function normalizeForSearch(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function includesNormalized(value: string, query: string): boolean {
  return normalizeForSearch(value).includes(normalizeForSearch(query));
}
