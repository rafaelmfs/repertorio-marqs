import { cn } from "@/lib/utils/cn";
import * as React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-600 dark:bg-[#0b1a2f] dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-500 dark:focus-visible:ring-blue-400",
        className,
      )}
      {...props}
    />
  );
}
