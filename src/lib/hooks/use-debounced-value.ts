
import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_MS = 300;

export function useDebouncedValue<T>(
  value: T,
  delayMs: number = DEFAULT_DEBOUNCE_MS,
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [delayMs, value]);

  return debouncedValue;
}
