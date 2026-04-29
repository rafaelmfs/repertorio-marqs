import { filterSongsByQuery } from "@/lib/services/song-search.service";
import { describe, expect, it } from "vitest";

const songs = [
  { slug: "a", title: "Gratidao", artist: "Projeto Sola" },
  { slug: "b", title: "Santo", artist: "Casa Worship" },
  { slug: "c", title: "Esperanca" },
];

describe("filterSongsByQuery", () => {
  it("returns all songs for empty query", () => {
    expect(filterSongsByQuery(songs, " ")).toHaveLength(3);
  });

  it("matches by title", () => {
    expect(filterSongsByQuery(songs, "santo")).toEqual([songs[1]]);
  });

  it("matches by artist", () => {
    expect(filterSongsByQuery(songs, "projeto")).toEqual([songs[0]]);
  });

  it("matches accented title with unaccented query", () => {
    const accentedSongs = [
      { slug: "x", title: "Naamã", artist: "Ministério" },
    ];
    expect(filterSongsByQuery(accentedSongs, "naama")).toEqual([accentedSongs[0]]);
    expect(filterSongsByQuery(accentedSongs, "ministerio")).toEqual([accentedSongs[0]]);
  });
});
