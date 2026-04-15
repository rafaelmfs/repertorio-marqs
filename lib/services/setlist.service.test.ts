import {
  addSongToSetlist,
  createSetlist,
  removeSetlist,
  removeSongFromSetlist,
  reorderSetlistSongs,
} from "@/lib/services/setlist.service";
import { describe, expect, it, vi } from "vitest";

describe("setlist service", () => {
  it("creates a setlist with deterministic id", () => {
    vi.spyOn(Date, "now").mockReturnValue(1234);

    const next = createSetlist({}, "Culto", "my");
    expect(next["my-1234"]?.name).toBe("Culto");

    vi.restoreAllMocks();
  });

  it("does not create setlist with empty name", () => {
    const next = createSetlist({}, "  ");
    expect(Object.keys(next)).toHaveLength(0);
  });

  it("removes a setlist", () => {
    const next = removeSetlist({ a: { id: "a", name: "A", songs: [] } }, "a");
    expect(next).toEqual({});
  });

  it("adds and removes songs", () => {
    const base = { id: "a", name: "A", songs: ["x"] };
    const withSong = addSongToSetlist(base, "y");
    expect(withSong.songs).toEqual(["x", "y"]);

    const withoutSong = removeSongFromSetlist(withSong, "x");
    expect(withoutSong.songs).toEqual(["y"]);
  });

  it("reorders songs", () => {
    const base = { id: "a", name: "A", songs: ["one", "two", "three"] };
    const next = reorderSetlistSongs(base, 0, 2);
    expect(next.songs).toEqual(["two", "three", "one"]);
  });
});
