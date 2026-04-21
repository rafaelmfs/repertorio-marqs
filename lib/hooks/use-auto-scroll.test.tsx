import { useAutoScroll } from "@/lib/hooks/use-auto-scroll";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useAutoScroll", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps scrolling at speeds below 10px/s", () => {
    const rafQueue: FrameRequestCallback[] = [];
    let frameId = 1;

    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      rafQueue.push(callback);
      return frameId++;
    });
    vi.stubGlobal("cancelAnimationFrame", () => undefined);

    const target = document.createElement("div");
    Object.defineProperty(target, "scrollHeight", { value: 1000, configurable: true });
    Object.defineProperty(target, "clientHeight", { value: 200, configurable: true });
    target.scrollTop = 0;

    const targetRef = { current: target };
    const onEnd = vi.fn();

    renderHook(() =>
      useAutoScroll({
        active: true,
        speed: 9,
        targetRef,
        onEnd,
      }),
    );

    act(() => {
      const firstCallback = rafQueue.shift();
      expect(firstCallback).toBeTypeOf("function");
      firstCallback?.(0);

      const secondCallback = rafQueue.shift();
      expect(secondCallback).toBeTypeOf("function");
      secondCallback?.(16);
    });

    expect(target.scrollTop).toBeGreaterThan(0);

    act(() => {
      for (let index = 2; index < 12; index += 1) {
        const callback = rafQueue.shift();
        expect(callback).toBeTypeOf("function");
        callback?.(index * 16);
      }
    });

    expect(target.scrollTop).toBeGreaterThan(0);
    expect(onEnd).not.toHaveBeenCalled();
  });
});
