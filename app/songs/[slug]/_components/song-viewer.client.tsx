"use client";

import { Button } from "@/components/ui/button";
import { IconArrowDown, IconArrowUp, IconPause, IconPlay } from "@/components/ui/icons";
import { useAutoScroll } from "@/lib/hooks/use-auto-scroll";
import { usePersistentState } from "@/lib/hooks/use-persistent-state";
import {
  AUTO_SCROLL_PRESETS,
  AUTO_SCROLL_SPEED,
  clampAutoScrollSpeed,
} from "@/lib/services/auto-scroll.service";
import { useMemo, useState } from "react";

type SongViewerProps = {
  content: string;
};

export function SongViewer({ content }: SongViewerProps) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [speed, setSpeed] = usePersistentState<number>(
    "repertorio:auto-scroll-speed",
    AUTO_SCROLL_SPEED.default,
  );

  const clampedSpeed = clampAutoScrollSpeed(speed);

  useAutoScroll({
    active: isAutoScrolling,
    speed: clampedSpeed,
    onEnd: () => setIsAutoScrolling(false),
  });

  const speedLabel = useMemo(() => `${clampedSpeed}px/s`, [clampedSpeed]);

  function setSpeedSafe(value: number) {
    setSpeed(clampAutoScrollSpeed(value));
  }

  function handleBackToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsAutoScrolling(false);
  }

  return (
    <div>
      <pre className="overflow-x-auto whitespace-pre pb-36 text-sm leading-7 text-slate-800">
        {content}
      </pre>

      <div className="fixed bottom-3 right-3 z-40 w-[min(92vw,420px)] rounded-xl border border-slate-200 bg-white/92 p-3 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={isAutoScrolling ? "solid" : "outline"}
              size="sm"
              onClick={() => setIsAutoScrolling((current) => !current)}
            >
              {isAutoScrolling ? (
                <>
                  <IconPause className="h-3.5 w-3.5" />
                  Pausar
                </>
              ) : (
                <>
                  <IconPlay className="h-3.5 w-3.5" />
                  Iniciar
                </>
              )}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleBackToTop}>
              <IconArrowUp className="h-3.5 w-3.5" />
              Topo
            </Button>
            <span className="ml-auto rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
              {speedLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {AUTO_SCROLL_PRESETS.map((preset) => (
              <Button
                key={preset.label}
                type="button"
                variant={clampedSpeed === preset.value ? "solid" : "ghost"}
                size="sm"
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
