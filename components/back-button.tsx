'use client'

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { Button } from "./ui/button";


export function BackButton(props: Omit<ComponentProps<typeof Button>, 'onClick'>) {
  const navigate = useRouter();

  function handleBack() {
    const referrer = document.referrer;
    const isInternalNavigation = referrer && new URL(referrer).origin === window.location.origin;

    if (isInternalNavigation) {
      navigate.back();
      return
    }

    navigate.push('/');
  }

  return (
    <Button onClick={handleBack} variant="outline" size="sm" {...props}>
      Voltar
    </Button>
  )
};
