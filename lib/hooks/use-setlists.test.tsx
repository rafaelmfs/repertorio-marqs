import { useSetlists } from "@/lib/hooks/use-setlists";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("useSetlists", () => {
  beforeEach(() => {
    vi.spyOn(Date, "now").mockReturnValue(10);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates setlist and manages songs", () => {
    const { result } = renderHook(() =>
      useSetlists({ storageKey: "test:setlists", idSeed: "list" }),
    );

    act(() => {
      result.current.createNewSetlist("Culto");
    });

    const setlistId = result.current.orderedSetlists[0]?.id;
    expect(setlistId).toBe("list-10");

    act(() => {
      result.current.addSong("list-10", "gratidao");
      result.current.addSong("list-10", "santo");
      result.current.moveSong("list-10", 1, 0);
      result.current.removeSong("list-10", "gratidao");
    });

    expect(result.current.setlists["list-10"]?.songs).toEqual(["santo"]);

    act(() => {
      result.current.deleteSetlist("list-10");
    });

    expect(result.current.orderedSetlists).toEqual([]);
  });
});
