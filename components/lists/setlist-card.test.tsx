import { SetlistCard } from "@/components/lists/setlist-card";
import { APP_ROUTES } from "@/lib/constants/routes.constants";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

describe("SetlistCard", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("navigates when clicking a song row", () => {
    render(
      <SetlistCard
        setlist={{ id: "a", name: "Culto", songs: ["gratidao"] }}
        onDelete={vi.fn()}
        onMoveSong={vi.fn()}
        onRemoveSong={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("link", { name: "Abrir musica gratidao" }));

    expect(push).toHaveBeenCalledWith(APP_ROUTES.song("gratidao"));
  });

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
    expect(push).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Remover" }));
    expect(onRemoveSong).toHaveBeenCalledWith("a", "gratidao");
    expect(push).not.toHaveBeenCalled();
  });

  it("renders a direct link for each song in the list", () => {
    render(
      <SetlistCard
        setlist={{ id: "a", name: "Culto", songs: ["gratidao"] }}
        onDelete={vi.fn()}
        onMoveSong={vi.fn()}
        onRemoveSong={vi.fn()}
      />,
    );

    expect(screen.getByRole("link", { name: "Acessar musica gratidao" })).toHaveAttribute(
      "href",
      APP_ROUTES.song("gratidao"),
    );
  });
});
