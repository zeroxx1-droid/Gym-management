import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  neonBorder?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, glowOnHover = false, neonBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-dark-900 border border-dark-700/80 rounded-xl p-5 transition-all duration-200",
          glowOnHover && "hover:border-lime-500/50 hover:shadow-[0_0_20px_rgba(204,255,0,0.12)]",
          neonBorder && "border-lime-500/40 shadow-[0_0_15px_rgba(204,255,0,0.1)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
