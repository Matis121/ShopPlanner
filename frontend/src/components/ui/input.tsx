import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "normal" | "transparent";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "normal", ...props }, ref) => {
    const inputClassName = cn(
      "flex h-10 w-full rounded-md border border-input bg-white dark:bg-neutral-950 dark:border-neutral-800 px-3 py-2 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      {
        "border-none bg-transparent dark:bg-transparent focus-visible:bg-white focus-visible:dark:bg-neutral-950":
          variant === "transparent",
      },
      className
    );

    return (
      <input type={type} className={inputClassName} ref={ref} {...props} />
    );
  }
);
Input.displayName = "Input";

export { Input };
