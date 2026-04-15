import { SetlistCard } from "@/components/lists/setlist-card";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("SetlistCard", () => {
  it("triggers callbacks for song operations", () => {
    const onDelete = vi.fn();
    const onMoveSong = vi.fn();
    const onRemoveSong = vi.fn();

    render(
      <SetlistCard
        setlist={{ id: "a", name: "Culto", songs: ["gratidao"] }}
        onDelete={onDelete}
        onMoveSong={onMoveSong}
        onRemoveSong={onRemoveSong}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Excluir" }));
    expect(onDelete).toHaveBeenCalledWith("a");

    fireEvent.click(screen.getByRole("button", { name: "Subir" }));
    expect(onMoveSong).toHaveBeenCalledWith("a", 0, -1);

    fireEvent.click(screen.getByRole("button", { name: "Remover" }));
    expect(onRemoveSong).toHaveBeenCalledWith("a", "gratidao");
  });
});
