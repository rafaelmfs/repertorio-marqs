export const AUTO_SCROLL_SPEED = {
  min: 1,
  max: 220,
  step: 1,
  default: 20,
} as const;

export const AUTO_SCROLL_PRESETS = [
  { label: "Lenta", value: 10 },
  { label: "Media", value: 20 },
  { label: "Rapida", value: 40 },
] as const;

export function clampAutoScrollSpeed(value: number): number {
  if (Number.isNaN(value)) {
    return AUTO_SCROLL_SPEED.default;
  }

  return Math.min(AUTO_SCROLL_SPEED.max, Math.max(AUTO_SCROLL_SPEED.min, value));
}

export function pxPerFrame(speedPxPerSecond: number, deltaMs: number): number {
  return (speedPxPerSecond * deltaMs) / 1000;
}
