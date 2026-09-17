import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "olive" | "bronze" | "charcoal" | "outline";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default:
      "bg-sand-100 text-charcoal-800 border-sand-300",
    olive:
      "bg-olive-100 text-olive-700 border-olive-400/30",
    bronze:
      "bg-[#FAF0E6] text-bronze-800 border-bronze-400/30",
    charcoal:
      "bg-charcoal-900 text-white border-charcoal-950 shadow-subtle",
    outline:
      "bg-white/80 text-taupe-700 border-sand-300 backdrop-blur-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-sans font-medium tracking-wide rounded-full border select-none transition-all duration-200",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
