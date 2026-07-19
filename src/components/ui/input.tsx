import { cn } from "@/lib/utils/cn";
import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-[#4a4d52] dark:bg-[#15181c] dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-[#565a61] dark:focus-visible:ring-blue-400",
        className,
      )}
      {...props}
    />
  );
}
