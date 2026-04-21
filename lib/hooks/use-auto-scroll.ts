"use client";

import { pxPerFrame } from "@/lib/services/auto-scroll.service";
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

type UseAutoScrollOptions = {
  active: boolean;
  speed: number;
  targetRef: RefObject<HTMLElement | null>;
  onEnd?: () => void;
};

export function useAutoScroll({
  active,
  speed,
  targetRef,
  onEnd,
}: UseAutoScrollOptions) {
  const frameRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const virtualYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = null;
      lastTsRef.current = null;
      virtualYRef.current = null;
      return;
    }

    const getTarget = () => targetRef.current;

    const maxY = () => {
      const target = getTarget();
      if (!target) {
        return 0;
      }

      return Math.max(0, target.scrollHeight - target.clientHeight);
    };

    const tick = (ts: number) => {
      if (lastTsRef.current === null) {
        lastTsRef.current = ts;
      }

      const deltaMs = ts - lastTsRef.current;
      lastTsRef.current = ts;

      const target = getTarget();
      if (!target) {
        virtualYRef.current = null;
        onEnd?.();
        return;
      }

      const maxScrollY = maxY();

      if (virtualYRef.current === null) {
        virtualYRef.current = target.scrollTop;
      }

      const nextY = Math.min(
        virtualYRef.current + pxPerFrame(speed, deltaMs),
        maxScrollY,
      );

      virtualYRef.current = nextY;
      target.scrollTop = nextY;

      if (nextY >= maxScrollY) {
        virtualYRef.current = null;
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
      virtualYRef.current = null;
    };
  }, [active, speed, targetRef, onEnd]);
}
