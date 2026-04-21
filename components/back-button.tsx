'use client'

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import { Button } from "./ui/button";


export function BackButton(props: Omit<ComponentProps<typeof Button>, 'onClick'>) {
  const navigate = useRouter();

  return (
    <Button onClick={() => navigate.back()} variant="outline" size="sm" {...props}>
      Voltar
    </Button>
  )
};
