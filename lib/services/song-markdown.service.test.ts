import {
  buildSongMarkdown,
  convertHtmlToMarkdown,
  createSongSlug,
} from "@/lib/services/song-markdown.service";
import { describe, expect, it } from "vitest";

describe("song markdown service", () => {
  it("creates slug from title", () => {
    expect(createSongSlug("  Luz do Mundo  ")).toBe("luz-do-mundo");
    expect(createSongSlug("Santo pra Sempre!")).toBe("santo-pra-sempre");
  });

  it("builds markdown with optional artist", () => {
    expect(
      buildSongMarkdown({
        title: "Escape",
        artist: "Ministerio X",
        content: "A B C",
      }),
    ).toBe("---\nslug: escape\ntitle: Escape\nartist: Ministerio X\n---\n\nA B C\n");
  });

  it("builds markdown without artist", () => {
    expect(
      buildSongMarkdown({
        title: "Fidelidade",
        content: "Dm C Bb",
      }),
    ).toBe("---\nslug: fidelidade\ntitle: Fidelidade\n---\n\nDm C Bb\n");
  });

  it("converts html tags to plain text while keeping line breaks", () => {
    const html =
      "<h2>Escape</h2><p><strong>Intro:</strong><br/>D G/D D G/D</p><ul><li>Linha 1</li><li>Linha 2</li></ul>";

    const converted = convertHtmlToMarkdown(html);

    expect(converted).toContain("Escape");
    expect(converted).toContain("Intro:");
    expect(converted).toContain("D G/D D G/D");
    expect(converted).toContain("Linha 1");
    expect(converted).toContain("Linha 2");
    expect(converted).not.toContain("**");
    expect(converted).not.toContain("##");
    expect(converted).not.toContain("<strong>");
  });

  it("buildSongMarkdown strips raw html from output", () => {
    const output = buildSongMarkdown({
      title: "Escape",
      content: "<p>Texto <strong>forte</strong></p>",
    });

    expect(output).not.toContain("<p>");
    expect(output).not.toContain("<strong>");
    expect(output).toContain("Texto forte");
    expect(output).not.toContain("**forte**");
  });
});
