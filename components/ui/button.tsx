import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "olive" | "outline-light";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-600 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory-100 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-bronze-600 hover:bg-bronze-700 active:bg-bronze-800 text-white shadow-subtle hover:shadow-glow border border-bronze-500/20 font-medium",
      secondary:
        "bg-white/80 hover:bg-white active:bg-sand-100 text-charcoal-900 border border-sand-300 hover:border-charcoal-900 font-medium shadow-subtle",
      ghost:
        "bg-transparent hover:bg-sand-200/60 text-charcoal-800 hover:text-charcoal-950 font-medium",
      olive:
        "bg-olive-600 hover:bg-olive-700 active:bg-olive-800 text-white shadow-subtle hover:shadow-emerald-glow font-medium",
      "outline-light":
        "bg-white/90 hover:bg-white text-charcoal-900 border border-sand-300 shadow-subtle hover:border-stone-400 font-medium",
    };

    // More noticeable rounded corners (10px, 12px, 14px)
    const sizeStyles = {
      sm: "h-9 px-4 text-xs rounded-lg tracking-wide",
      md: "h-11 px-5 text-sm rounded-xl tracking-wide",
      lg: "h-13 px-7 text-base rounded-xl tracking-wide",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
