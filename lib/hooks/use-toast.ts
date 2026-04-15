"use client";

import { useCallback, useMemo, useState } from "react";

export type ToastItem = {
  id: string;
  message: string;
};

type UseToastResult = {
  toasts: ToastItem[];
  pushToast: (message: string) => void;
  removeToast: (id: string) => void;
};

export function useToast(timeoutMs: number = 2400): UseToastResult {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const nextToast = { id, message };

      setToasts((current) => [...current, nextToast]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, timeoutMs);
    },
    [timeoutMs],
  );

  return useMemo(
    () => ({
      toasts,
      pushToast,
      removeToast,
    }),
    [toasts, pushToast, removeToast],
  );
}
