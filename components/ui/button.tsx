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
    "bg-slate-900 text-white hover:bg-slate-700 focus-visible:ring-slate-500 ring-offset-white",
  outline:
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400 ring-offset-white",
  ghost:
    "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400 ring-offset-white",
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
