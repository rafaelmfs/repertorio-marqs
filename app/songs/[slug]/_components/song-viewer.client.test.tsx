import { SongViewer } from "@/app/songs/[slug]/_components/song-viewer.client";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useAutoScrollMock = vi.fn();
const setSpeedMock = vi.fn();

vi.mock("@/components/songs/song-markdown-content", () => ({
  SongMarkdownContent: ({ content }: { content: string }) => (
    <div data-testid="song-markdown-content">{content}</div>
  ),
}));

vi.mock("@/lib/hooks/use-auto-scroll", () => ({
  useAutoScroll: (options: unknown) => useAutoScrollMock(options),
}));

vi.mock("@/lib/hooks/use-persistent-state", () => ({
  usePersistentState: () => [20, setSpeedMock],
}));

describe("SongViewer", () => {
  beforeEach(() => {
    useAutoScrollMock.mockClear();
    setSpeedMock.mockClear();
  });

  it("toggles auto-scroll state from controls", () => {
    render(<SongViewer content="Linha 1" />);

    expect(screen.getByTestId("song-markdown-content")).toHaveTextContent("Linha 1");
    expect(screen.getByRole("button", { name: "Iniciar" })).toBeInTheDocument();
    expect(useAutoScrollMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: false, speed: 20 }),
    );

    fireEvent.click(screen.getByRole("button", { name: "Iniciar" }));

    expect(screen.getByRole("button", { name: "Pausar" })).toBeInTheDocument();
    expect(useAutoScrollMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ active: true, speed: 20 }),
    );
  });

  it("compacts controls while auto-scroll is active on every screen", () => {
    render(<SongViewer content="Linha 1" />);

    fireEvent.click(screen.getByRole("button", { name: "Iniciar" }));

    expect(screen.getByRole("button", { name: "Pausar" })).not.toHaveClass("hidden");
    expect(screen.getByRole("button", { name: "Topo" })).toHaveClass("hidden");
    expect(screen.getByText("20px/s")).toHaveClass("hidden");
    expect(screen.getByRole("button", { name: "Rapida" }).parentElement).toHaveClass("hidden");

    fireEvent.click(screen.getByRole("button", { name: "Pausar" }));

    expect(screen.getByRole("button", { name: "Topo" })).not.toHaveClass("hidden");
    expect(screen.getByText("20px/s")).not.toHaveClass("hidden");
    expect(screen.getByRole("button", { name: "Rapida" }).parentElement).not.toHaveClass("hidden");
  });

  it("updates speed through preset and range controls", () => {
    render(<SongViewer content="Linha 1" />);

    fireEvent.click(screen.getByRole("button", { name: "Rapida" }));
    expect(setSpeedMock).toHaveBeenCalledWith(40);

    fireEvent.change(screen.getByLabelText("Velocidade da rolagem"), {
      target: { value: "999" },
    });
    expect(setSpeedMock).toHaveBeenCalledWith(220);
  });
});
