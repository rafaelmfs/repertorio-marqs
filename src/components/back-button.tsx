
import { IconArrowLeft } from "@/components/ui/icons";
import { APP_ROUTES } from "@/lib/constants/routes.constants";
import { useRouter } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { Button } from "./ui/button";

export function BackButton(props: Omit<ComponentProps<typeof Button>, "onClick">) {
  const router = useRouter();

  function handleBack() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    void router.navigate({ to: APP_ROUTES.home });
  }

  return (
    <Button onClick={handleBack} variant="outline" size="sm" {...props}>
      <IconArrowLeft className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
      Voltar
    </Button>
  );
}
