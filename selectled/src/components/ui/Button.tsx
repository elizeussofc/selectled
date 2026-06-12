"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#FF0000] text-white hover:bg-[#CC0000] shadow-lg shadow-[rgba(255,0,0,0.25)] hover:shadow-[rgba(255,0,0,0.4)] active:scale-[0.97]",
  secondary:
    "bg-[#1C1C1E] text-[#F5F5F7] border border-[#2C2C2E] hover:bg-[#242424] hover:border-[#3A3A3C]",
  outline:
    "bg-transparent text-[#F5F5F7] border border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.3)]",
  ghost:
    "bg-transparent text-[#A1A1A6] hover:text-[#F5F5F7] hover:bg-[rgba(255,255,255,0.06)]",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1EBF5A] shadow-lg shadow-[rgba(37,211,102,0.2)] active:scale-[0.97]",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3.5 text-xs gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-[15px] gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-xl",
        "transition-all duration-200 cursor-pointer select-none",
        "disabled:opacity-40 disabled:pointer-events-none",
        "focus-visible:outline-2 focus-visible:outline-[#FF0000] focus-visible:outline-offset-2",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
