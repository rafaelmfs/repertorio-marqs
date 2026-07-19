import { SongCard } from "@/components/songs/song-card";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

describe("SongCard", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("navigates when clicking the card body", () => {
    const onToggleFavorite = vi.fn();

    render(
      <SongCard
        song={{ slug: "gratidao", title: "Gratidao", artist: "Projeto Sola" }}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Abrir musica Gratidao" }));

    expect(push).toHaveBeenCalledWith("/songs/gratidao");
  });

  it("renders content without triggering navigation", () => {
    render(
      <SongCard
        song={{ slug: "gratidao", title: "Gratidao", artist: "Projeto Sola" }}
      />,
    );

    expect(screen.getByText("Gratidao")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("renders a direct song link as a second navigation option", () => {
    render(
      <SongCard
        song={{ slug: "gratidao", title: "Gratidao", artist: "Projeto Sola" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Acessar musica Gratidao" })).toHaveAttribute(
      "href",
      "/songs/gratidao",
    );
  });

  it("allows choosing target list before adding without redirect", () => {
    const onToggleFavorite = vi.fn();
    const onAddToList = vi.fn();

    render(
      <SongCard
        song={{ slug: "gratidao", title: "Gratidao", artist: "Projeto Sola" }}
        onAddToList={onAddToList}
        setlistOptions={[
          { id: "ensaio", name: "Ensaio" },
          { id: "culto", name: "Culto" },
        ]}
      />,
    );

    fireEvent.click(screen.getByLabelText("Escolher lista para Gratidao"));
    fireEvent.change(screen.getByLabelText("Escolher lista para Gratidao"), {
      target: { value: "culto" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar" }));

    expect(onAddToList).toHaveBeenCalledWith("gratidao", "culto");
    expect(push).not.toHaveBeenCalled();
  });
});
