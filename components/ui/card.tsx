import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "ivory" | "subtle" | "elevated" | "accent";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-sand-300 shadow-subtle",
      ivory: "bg-ivory-50 border border-sand-200 shadow-subtle",
      subtle: "bg-sand-100/70 border border-sand-200/80 shadow-none",
      elevated: "bg-white border border-sand-200 shadow-card hover:shadow-elevated transition-all duration-300",
      accent: "bg-white border-l-4 border-l-bronze-600 border-y border-r border-sand-300 shadow-subtle",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-2xl overflow-hidden text-charcoal-900 transition-all duration-300", variantStyles[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-7 pb-3 space-y-1.5", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "font-headline text-2xl font-medium tracking-tight text-charcoal-900 leading-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("font-sans text-sm text-taupe-600 leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-7 pt-0 font-sans", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-7 pt-0 flex items-center border-t border-sand-200/80 mt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
