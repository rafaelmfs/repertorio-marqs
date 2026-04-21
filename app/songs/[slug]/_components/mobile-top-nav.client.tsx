"use client";

import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { usePersistentState } from "@/lib/hooks/use-persistent-state";

export function MobileTopNav() {
  const [isVisibleOnMobile, setIsVisibleOnMobile] = usePersistentState<boolean>(
    "repertorio:mobile-top-nav-visible",
    true,
  );

  return (
    <>
      <div className={isVisibleOnMobile ? "block" : "hidden md:block"}>
        <TopNav />
      </div>

      <div
        className={
          isVisibleOnMobile
            ? "fixed right-3 top-18 z-30 md:hidden"
            : "fixed right-3 top-3 z-30 md:hidden"
        }
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur"
          onClick={() => setIsVisibleOnMobile((current) => !current)}
          aria-pressed={isVisibleOnMobile}
          aria-label={isVisibleOnMobile ? "Ocultar barra de navegacao" : "Exibir barra de navegacao"}
        >
          {isVisibleOnMobile ? "Ocultar menu" : "Mostrar menu"}
        </Button>
      </div>
    </>
  );
}
