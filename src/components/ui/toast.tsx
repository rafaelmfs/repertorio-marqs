
import { IconCheck } from "@/components/ui/icons";
import type { ToastItem } from "@/lib/hooks/use-toast";
import { cn } from "@/lib/utils/cn";

type ToastStackProps = {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
};

export function ToastStack({ toasts, onDismiss }: ToastStackProps) {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[92vw] max-w-[360px] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/95 px-3 py-2 text-sm text-emerald-800 shadow-lg backdrop-blur dark:border-[#426056] dark:bg-[#182522]/95 dark:text-emerald-200",
            "animate-[toastIn_220ms_ease-out]",
          )}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
              <IconCheck className="h-3.5 w-3.5" />
            </span>
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            className="cursor-pointer rounded px-1.5 py-0.5 text-xs text-emerald-700 hover:bg-emerald-100 dark:text-emerald-300 dark:hover:bg-emerald-900"
            onClick={() => onDismiss(toast.id)}
          >
            Fechar
          </button>
        </div>
      ))}
    </div>
  );
}
