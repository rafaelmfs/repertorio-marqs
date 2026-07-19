import { BackButton } from "@/components/back-button";
import { APP_ROUTES } from "@/lib/constants/routes.constants";
import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const back = vi.fn();
const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ back, push }),
}));

describe("BackButton", () => {
  afterEach(() => {
    back.mockClear();
    push.mockClear();
    vi.restoreAllMocks();
  });

  it("returns to the immediately previous page in browser history", () => {
    vi.spyOn(window.history, "length", "get").mockReturnValue(2);
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));

    expect(back).toHaveBeenCalledOnce();
    expect(push).not.toHaveBeenCalled();
  });

  it("opens the home page when the song was accessed directly", () => {
    vi.spyOn(window.history, "length", "get").mockReturnValue(1);
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button", { name: "Voltar" }));

    expect(push).toHaveBeenCalledWith(APP_ROUTES.home);
    expect(back).not.toHaveBeenCalled();
  });
});
