export function isClient(): boolean {
  return typeof window !== "undefined";
}

export function readFromLocalStorage<T>(
  key: string,
  fallback: T,
): T {
  if (!isClient()) {
    return fallback;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
}

export function writeToLocalStorage<T>(key: string, value: T): void {
  if (!isClient()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
