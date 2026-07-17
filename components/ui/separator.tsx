"use client";

import { cn } from "@/lib/utils/cn";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root>;

export function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-slate-200 dark:bg-slate-700",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}
