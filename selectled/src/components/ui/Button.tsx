"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-[#FF3B30] text-white hover:bg-[#FF1A0E] shadow-lg shadow-red-900/30 hover:shadow-red-900/50",
  secondary:
    "bg-[#1C1C1E] text-[#F5F5F7] border border-[#2C2C2E] hover:bg-[#2C2C2E] hover:border-[rgba(255,255,255,0.14)]",
  outline:
    "bg-transparent text-[#F5F5F7] border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.35)]",
  ghost:
    "bg-transparent text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[rgba(255,255,255,0.06)]",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1FAD54] shadow-lg shadow-green-900/30",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-8 px-3 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold",
          "transition-all duration-200 cursor-pointer select-none",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-2 focus-visible:outline-[#FF3B30] focus-visible:outline-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
