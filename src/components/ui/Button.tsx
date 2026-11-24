import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "lime" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "lime",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-semibold transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-dark-950 disabled:opacity-50 disabled:pointer-events-none rounded-lg active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-4 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-bold tracking-wide",
    };

    const variantStyles = {
      lime: "bg-lime-500 hover:bg-lime-400 text-black shadow-neon hover:shadow-neon-lg font-bold border border-lime-400",
      secondary: "bg-dark-800 hover:bg-dark-700 text-zinc-100 border border-zinc-700/80 shadow-sm",
      outline: "bg-transparent hover:bg-zinc-800 text-zinc-200 border border-zinc-700 hover:border-zinc-500",
      danger: "bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40",
      ghost: "bg-transparent hover:bg-zinc-800/60 text-zinc-300 hover:text-white",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-1" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
