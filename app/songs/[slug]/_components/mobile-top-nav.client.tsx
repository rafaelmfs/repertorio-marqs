"use client";

import { TopNav } from "@/components/layout/top-nav";
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
          "sticky z-30 rounded-b-lg flex w-16 left-1/2 -translate-x-1/2 justify-center md:hidden border border-slate-200/90",
          isVisibleOnMobile
            ? "top-16  bg-white/80 backdrop-blur"
            : "top-0 bg-white/80 backdrop-blur",
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
      </div>
    </>
  );
}
