import { SongMarkdownContent } from "@/components/songs/song-markdown-content";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("SongMarkdownContent", () => {
  it("renders plain text content inside pre when markdown syntax is absent", () => {
    const { container } = render(<SongMarkdownContent content={"Linha 1\nLinha 2"} />);

    const pre = container.querySelector("pre");
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveTextContent(/Linha 1\s+Linha 2/);
  });

  it("renders markdown headings when markdown syntax is present", () => {
    render(<SongMarkdownContent content={"# Titulo\n\nTexto"} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Titulo",
      }),
    ).toBeInTheDocument();
  });
});
