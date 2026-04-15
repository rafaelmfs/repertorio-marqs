import { cn } from "@/lib/utils/cn";
import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

function BaseIcon({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </BaseIcon>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m5 12 4 4 10-10" />
    </BaseIcon>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </BaseIcon>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 19 0-14" />
      <path d="m5 12 7-7 7 7" />
    </BaseIcon>
  );
}

export function IconArrowDown(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 5 0 14" />
      <path d="m19 12-7 7-7-7" />
    </BaseIcon>
  );
}

export function IconStar(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9L12 3z" />
    </BaseIcon>
  );
}

export function IconMusic(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path d="M19 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path d="M9 18V6l10-2v12" />
    </BaseIcon>
  );
}

export function IconList(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </BaseIcon>
  );
}

export function IconExternal(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M14 5h5v5" />
      <path d="M10 14 19 5" />
      <path d="M19 14v5H5V5h5" />
    </BaseIcon>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m8 6 10 6-10 6V6Z" />
    </BaseIcon>
  );
}

export function IconPause(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 6v12" />
      <path d="M15 6v12" />
    </BaseIcon>
  );
}
