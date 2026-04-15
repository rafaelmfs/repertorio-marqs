import { SongCard } from "@/components/songs/song-card";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("SongCard", () => {
  it("renders content and triggers favorite callback", () => {
    const onToggleFavorite = vi.fn();

    render(
      <SongCard
        song={{ slug: "gratidao", title: "Gratidao", artist: "Projeto Sola" }}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    expect(screen.getByText("Gratidao")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Favoritar" }));
    expect(onToggleFavorite).toHaveBeenCalledWith("gratidao");
  });

  it("allows choosing target list before adding", () => {
    const onToggleFavorite = vi.fn();
    const onAddToList = vi.fn();

    render(
      <SongCard
        song={{ slug: "gratidao", title: "Gratidao", artist: "Projeto Sola" }}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
        onAddToList={onAddToList}
        setlistOptions={[
          { id: "ensaio", name: "Ensaio" },
          { id: "culto", name: "Culto" },
        ]}
      />,
    );

    fireEvent.change(screen.getByLabelText("Escolher lista para Gratidao"), {
      target: { value: "culto" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar" }));

    expect(onAddToList).toHaveBeenCalledWith("gratidao", "culto");
  });
});
