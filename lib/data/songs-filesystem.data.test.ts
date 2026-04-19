import { describe, expect, it } from "vitest";

import { normalizeSongContent } from "@/lib/data/songs-filesystem.data";

describe("normalizeSongContent", () => {
  it("removes a wrapping pre tag from song content", () => {
    const content = "<pre>\nLinha 1\nLinha 2\n</pre>\n";

    expect(normalizeSongContent(content)).toBe("Linha 1\nLinha 2");
  });

  it("keeps plain content unchanged except trailing whitespace", () => {
    const content = "Linha 1\nLinha 2\n\n";

    expect(normalizeSongContent(content)).toBe("Linha 1\nLinha 2");
  });
});
