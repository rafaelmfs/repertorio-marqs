import { useFavorites } from "@/lib/hooks/use-favorites";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("useFavorites", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("toggles favorite slugs", () => {
    const { result } = renderHook(() =>
      useFavorites({ storageKey: "test:favorites" }),
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
