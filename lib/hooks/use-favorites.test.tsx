import { useFavorites } from "@/lib/hooks/use-favorites";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("useFavorites", () => {
  const storageKey = "test:favorites";

  beforeEach(() => {
    window.localStorage.removeItem(storageKey);
  });

  it("toggles favorite slugs", () => {
    const { result } = renderHook(() =>
      useFavorites({ storageKey }),
    );

    act(() => {
      result.current.toggleFavorite("song-a");
    });
    expect(result.current.favorites).toEqual(["song-a"]);
    expect(result.current.isSlugFavorite("song-a")).toBe(true);

    act(() => {
      result.current.toggleFavorite("song-a");
    });
    expect(result.current.favorites).toEqual([]);
  });
});
