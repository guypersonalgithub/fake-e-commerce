import { cn } from "@/utils/cn";
import type { ComponentProps } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Label } from "./Label";

export const Input = ({
  className,
  type,
  error,
  label,
  id,
  ...props
}: ComponentProps<"input"> & { label?: string; error?: string }) => {
  return (
    <div>
      <div className="space-y-2">
        {label ? <Label htmlFor={id}>{label}</Label> : null}
        <input
          id={id}
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
          {...props}
        />
      </div>
      <ErrorMessage error={error} />
    </div>
  );
};

