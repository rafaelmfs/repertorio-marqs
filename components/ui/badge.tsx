import { cn } from "@/lib/utils/cn";
import * as React from "react";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600 dark:bg-[#162b47] dark:text-slate-200",
        className,
      )}
      {...props}
    />
  );
}
