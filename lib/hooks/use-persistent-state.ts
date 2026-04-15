"use client";

import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "@/lib/utils/local-storage.utils";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() =>
    readFromLocalStorage<T>(key, initialValue),
  );

  useEffect(() => {
    writeToLocalStorage(key, state);
  }, [key, state]);

  return [state, setState];
}
