import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  afterEach(() => {
    document.documentElement.classList.remove("dark");
    window.localStorage.removeItem("repertorio:theme");
  });

  it("ativa e persiste o tema escuro", () => {
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Ativar tema escuro" }));

    expect(document.documentElement).toHaveClass("dark");
    expect(window.localStorage.getItem("repertorio:theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Ativar tema claro" })).toBeInTheDocument();
  });

  it("volta para o tema claro", () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Ativar tema claro" }));

    expect(document.documentElement).not.toHaveClass("dark");
    expect(window.localStorage.getItem("repertorio:theme")).toBe("light");
  });
});
