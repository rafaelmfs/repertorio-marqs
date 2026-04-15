"use client";

import { pxPerFrame } from "@/lib/services/auto-scroll.service";
import { useEffect, useRef } from "react";

type UseAutoScrollOptions = {
  active: boolean;
  speed: number;
  onEnd?: () => void;
};

export function useAutoScroll({ active, speed, onEnd }: UseAutoScrollOptions) {
  const frameRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastTsRef.current = null;
      return;
    }

    const maxY = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const tick = (ts: number) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = ts;
      }

      const deltaMs = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const nextY = Math.min(window.scrollY + pxPerFrame(speed, deltaMs), maxY());
      window.scrollTo({ top: nextY });

      if (nextY >= maxY()) {
        onEnd?.();
        return;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastTsRef.current = null;
    };
  }, [active, speed, onEnd]);
}
