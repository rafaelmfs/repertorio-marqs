import { cn } from "@/lib/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

type ButtonVariant = "solid" | "outline" | "ghost";
type ButtonSize = "xs" | "sm" | "md";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const baseClassName =
  "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variantClassName: Record<ButtonVariant, string> = {
  solid:
    "bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-slate-500 ring-offset-white dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-400 dark:ring-offset-[#0f1f36]",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400 ring-offset-white dark:border-slate-600 dark:bg-[#12243d] dark:text-slate-100 dark:hover:bg-[#19304f] dark:focus-visible:ring-blue-400 dark:ring-offset-[#0f1f36]",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 ring-offset-white dark:text-slate-200 dark:hover:bg-slate-700/60 dark:focus-visible:ring-blue-400 dark:ring-offset-[#0f1f36]",
};

const sizeClassName: Record<ButtonSize, string> = {
  xs: "h-6 px-2 text-xs",
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export function Button({
  asChild = false,
  className,
  variant = "solid",
  size = "md",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(
        baseClassName,
        variantClassName[variant],
        sizeClassName[size],
        className,
      )}
      {...props}
    />
  );
}
