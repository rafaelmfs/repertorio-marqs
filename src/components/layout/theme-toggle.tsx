
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "repertorio:theme";
const THEME_EVENT = "repertorio:theme-change";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const nextIsDark = !document.documentElement.classList.contains("dark");
    const theme = nextIsDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", nextIsDark);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Old WebKit can reject localStorage, especially in private browsing.
    }

    document.cookie = `repertorio_theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
