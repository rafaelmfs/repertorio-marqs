import { MobileTopNav } from "@/app/songs/[slug]/_components/mobile-top-nav.client";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockUsePersistentState = vi.fn();

vi.mock("@/components/layout/top-nav", () => ({
  TopNav: () => <div data-testid="top-nav" />,
}));

vi.mock("@/lib/hooks/use-persistent-state", () => ({
  usePersistentState: (...args: unknown[]) => mockUsePersistentState(...args),
}));

describe("MobileTopNav", () => {
  it("renders sticky centered toggle with visible state classes", () => {
    const setIsVisibleOnMobile = vi.fn();
    mockUsePersistentState.mockReturnValue([true, setIsVisibleOnMobile]);

    const { container } = render(<MobileTopNav />);

    const stickyContainer = container.querySelector(".absolute");
    expect(stickyContainer).toBeInTheDocument();
    expect(stickyContainer).toHaveClass("left-1/2");
    expect(stickyContainer).toHaveClass("-translate-x-1/2");
    expect(stickyContainer).toHaveClass("top-16");

    fireEvent.click(screen.getByRole("button", { name: "Ocultar barra de navegacao" }));
    expect(setIsVisibleOnMobile).toHaveBeenCalled();
  });

  it("applies collapsed top class when nav is hidden", () => {
    const setIsVisibleOnMobile = vi.fn();
    mockUsePersistentState.mockReturnValue([false, setIsVisibleOnMobile]);

    const { container } = render(<MobileTopNav />);

    const stickyContainer = container.querySelector(".absolute");
    expect(stickyContainer).toHaveClass("top-0");
    expect(screen.getByRole("button", { name: "Exibir barra de navegacao" })).toBeInTheDocument();
  });
});
