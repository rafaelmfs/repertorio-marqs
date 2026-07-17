"use client";

import { TopNav } from "@/components/layout/top-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { usePersistentState } from "@/lib/hooks/use-persistent-state";
import { ChevronsDown, ChevronsUp } from "lucide-react";

export function MobileTopNav() {
  const [isVisibleOnMobile, setIsVisibleOnMobile] = usePersistentState<boolean>(
    "repertorio:mobile-top-nav-visible",
    true,
  );

  return (
    <>
      <div className={isVisibleOnMobile ? "block" : "hidden  md:block transition"}>
        <TopNav />
      </div>

      <div
        className={[
          "absolute z-30 rounded-b-lg flex left-1/2 -translate-x-1/2 justify-center md:hidden border border-slate-200/90 dark:border-[#44474c]",
          isVisibleOnMobile ? "w-16" : "w-auto px-1",
          isVisibleOnMobile
            ? "top-16 bg-white/80 backdrop-blur dark:bg-[#16191d]/95"
            : "top-0 bg-white/80 backdrop-blur dark:bg-[#16191d]/95",
        ].join(" ")}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsVisibleOnMobile((current) => !current)}
          aria-pressed={isVisibleOnMobile}
          aria-label={isVisibleOnMobile ? "Ocultar barra de navegacao" : "Exibir barra de navegacao"}
        >
          {isVisibleOnMobile ? (
            <ChevronsUp className="h-4 w-4" />
          ) : (
            <ChevronsDown className="h-4 w-4" />
          )}
        </Button>
        {!isVisibleOnMobile ? <ThemeToggle /> : null}
      </div>
    </>
  );
}
