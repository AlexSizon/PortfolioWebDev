import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-[#3d2218] bg-[#1a0a00] px-3 py-1 text-sm text-[#f5e6d3]",
          "placeholder:text-[#f5e6d3]/30 shadow-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4b00]/50 focus-visible:border-[#ff4b00]/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors duration-150",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
