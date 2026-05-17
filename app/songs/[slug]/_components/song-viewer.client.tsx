"use client";

import { SongMarkdownContent } from "@/components/songs/song-markdown-content";
import { Button } from "@/components/ui/button";
import { IconArrowDown, IconArrowUp, IconPause, IconPlay } from "@/components/ui/icons";
import { useAutoScroll } from "@/lib/hooks/use-auto-scroll";
import { usePersistentState } from "@/lib/hooks/use-persistent-state";
import {
  AUTO_SCROLL_PRESETS,
  AUTO_SCROLL_SPEED,
  clampAutoScrollSpeed,
} from "@/lib/services/auto-scroll.service";
import { useMemo, useRef, useState } from "react";

type SongViewerProps = {
  content: string;
};

export function SongViewer({ content }: SongViewerProps) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const songContainerRef = useRef<HTMLDivElement | null>(null);
  const [speed, setSpeed] = usePersistentState<number>(
    "repertorio:auto-scroll-speed",
    AUTO_SCROLL_SPEED.default,
  );

  const clampedSpeed = clampAutoScrollSpeed(speed);

  useAutoScroll({
    active: isAutoScrolling,
    speed: clampedSpeed,
    targetRef: songContainerRef,
    onEnd: () => setIsAutoScrolling(false),
  });

  const speedLabel = useMemo(() => `${clampedSpeed}px/s`, [clampedSpeed]);

  function setSpeedSafe(value: number) {
    setSpeed(clampAutoScrollSpeed(value));
  }

  function handleBackToTop() {
    songContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setIsAutoScrolling(false);
  }

  return (
    <div>
      <div
        ref={songContainerRef}
        className="song-scrollbar max-h-[calc(100vh-11rem)] overflow-y-auto rounded-lg sm:rounded-xl border border-slate-100 bg-slate-50/40 py-2 px-4 sm:py-4 sm:px-8"
      >
        <div className="pb-40 sm:pb-44 text-sm">
          <SongMarkdownContent content={content} />
        </div>
      </div>

      <div className="fixed bottom-4 md:bottom-2 left-1/2 z-40 w-[min(85vw,720px)] -translate-x-1/2 rounded-lg sm:rounded-xl border border-slate-200 bg-zinc-100/90 p-2 sm:p-3 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col gap-1 sm:gap-2 px-2 py-3">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Button
              type="button"
              variant={isAutoScrolling ? "solid" : "outline"}
              size="md"
              className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3"
              onClick={() => setIsAutoScrolling((current) => !current)}
            >
              {isAutoScrolling ? (
                <>
                  <IconPause className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="sm:inline">Pausar</span>
                </>
              ) : (
                <>
                  <IconPlay className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  <span className="sm:inline">Iniciar</span>
                </>
              )}
            </Button>
            <Button type="button" variant="ghost" size="sm" className="text-xs sm:text-sm h-7 sm:h-8 px-2 sm:px-3" onClick={handleBackToTop}>
              <IconArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span className="sm:inline">Topo</span>
            </Button>
            <span className="ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
              {speedLabel}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            {AUTO_SCROLL_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                type="button"
                variant={clampedSpeed === preset.value ? "solid" : "ghost"}
                size="sm"
                className="text-xs h-7 sm:h-8 px-2 sm:px-3"
                onClick={() => setSpeedSafe(preset.value)}
              >
                {preset.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <IconArrowUp className="h-3.5 w-3.5 text-slate-500" />
            <input
              type="range"
              min={AUTO_SCROLL_SPEED.min}
              max={AUTO_SCROLL_SPEED.max}
              step={AUTO_SCROLL_SPEED.step}
              value={clampedSpeed}
              onChange={(event) => {
                setSpeedSafe(Number(event.target.value));
              }}
              className="h-2 w-full cursor-pointer accent-slate-800"
              aria-label="Velocidade da rolagem"
            />
            <IconArrowDown className="h-3.5 w-3.5 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
