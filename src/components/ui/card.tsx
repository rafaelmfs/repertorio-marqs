import { cn } from "@/lib/utils/cn";
import * as React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-all duration-200 ease-out hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] dark:border-[#44474c] dark:bg-[#191c20] dark:shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:hover:border-[#565a61] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: DivProps) {
  return (
    <h2 className={cn("text-base font-semibold text-slate-900 dark:text-slate-100", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: DivProps) {
  return <p className={cn("text-sm text-slate-600 dark:text-slate-300", className)} {...props} />;
}
