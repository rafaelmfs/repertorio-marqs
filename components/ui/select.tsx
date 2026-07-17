import { cn } from "@/lib/utils/cn";
import * as React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 transition-colors hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-600 dark:bg-[#0b1a2f] dark:text-slate-100 dark:hover:border-slate-500 dark:focus-visible:ring-blue-400",
        className,
      )}
      {...props}
    />
  );
}
