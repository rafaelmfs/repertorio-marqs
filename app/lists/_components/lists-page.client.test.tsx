import { ListsPageClient } from "@/app/lists/_components/lists-page.client";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUseSongSearch = vi.fn();
const mockUseFavorites = vi.fn();
const mockUseSetlists = vi.fn();
const mockUseToast = vi.fn();

vi.mock("@/lib/hooks/use-song-search", () => ({
  useSongSearch: (...args: unknown[]) => mockUseSongSearch(...args),
}));

vi.mock("@/lib/hooks/use-favorites", () => ({
  useFavorites: () => mockUseFavorites(),
}));

vi.mock("@/lib/hooks/use-setlists", () => ({
  useSetlists: () => mockUseSetlists(),
}));

vi.mock("@/lib/hooks/use-toast", () => ({
  useToast: () => mockUseToast(),
}));

vi.mock("@/components/lists/setlist-card", () => ({
  SetlistCard: () => <div data-testid="setlist-card" />,
}));

vi.mock("@/components/songs/song-card", () => ({
  SongCard: () => <div data-testid="song-card" />,
}));

describe("ListsPageClient", () => {
  it("clears search input when clear button is clicked", () => {
    const setQuery = vi.fn();

    mockUseSongSearch.mockReturnValue({
      query: "gloria",
      setQuery,
      filteredSongs: [],
    });
    mockUseFavorites.mockReturnValue({
      isSlugFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
    });
    mockUseSetlists.mockReturnValue({
      orderedSetlists: [],
      createNewSetlist: vi.fn(),
      deleteSetlist: vi.fn(),
      addSong: vi.fn(),
      moveSong: vi.fn(),
      removeSong: vi.fn(),
    });
    mockUseToast.mockReturnValue({
      toasts: [],
      pushToast: vi.fn(),
      removeToast: vi.fn(),
    });

    render(<ListsPageClient songs={[]} />);

    fireEvent.click(screen.getByRole("button", { name: "Limpar busca" }));

    expect(setQuery).toHaveBeenCalledWith("");
  });

  it("hides clear button when query is empty", () => {
    mockUseSongSearch.mockReturnValue({
      query: "",
      setQuery: vi.fn(),
      filteredSongs: [],
    });
    mockUseFavorites.mockReturnValue({
      isSlugFavorite: vi.fn().mockReturnValue(false),
      toggleFavorite: vi.fn(),
    });
    mockUseSetlists.mockReturnValue({
      orderedSetlists: [],
      createNewSetlist: vi.fn(),
      deleteSetlist: vi.fn(),
      addSong: vi.fn(),
      moveSong: vi.fn(),
      removeSong: vi.fn(),
    });
    mockUseToast.mockReturnValue({
      toasts: [],
      pushToast: vi.fn(),
      removeToast: vi.fn(),
    });

    render(<ListsPageClient songs={[]} />);

    expect(screen.queryByRole("button", { name: "Limpar busca" })).not.toBeInTheDocument();
  });
});
