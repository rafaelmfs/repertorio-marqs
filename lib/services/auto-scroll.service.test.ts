import {
  AUTO_SCROLL_SPEED,
  clampAutoScrollSpeed,
  pxPerFrame,
} from "@/lib/services/auto-scroll.service";
import { describe, expect, it } from "vitest";

describe("auto-scroll service", () => {
  it("clamps values to allowed range", () => {
    expect(clampAutoScrollSpeed(5)).toBe(5);
    expect(clampAutoScrollSpeed(500)).toBe(AUTO_SCROLL_SPEED.max);
    expect(clampAutoScrollSpeed(90)).toBe(90);
  });

  it("uses default value when speed is invalid", () => {
    expect(clampAutoScrollSpeed(Number.NaN)).toBe(AUTO_SCROLL_SPEED.default);
  });

  it("converts px per second to frame delta", () => {
    expect(pxPerFrame(100, 500)).toBe(50);
    expect(pxPerFrame(120, 1000)).toBe(120);
  });
});
