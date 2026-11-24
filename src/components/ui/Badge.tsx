import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "lime" | "danger" | "warning" | "info" | "outline" | "neutral";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "md",
  className,
  dot = false,
}) => {
  const variantStyles = {
    lime: "bg-lime-500/10 text-lime-400 border border-lime-500/30",
    danger: "bg-rose-500/10 text-rose-400 border border-rose-500/30",
    warning: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
    info: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
    outline: "bg-transparent text-zinc-300 border border-zinc-700",
    neutral: "bg-zinc-800 text-zinc-300 border border-zinc-700/60",
  };

  const dotColors = {
    lime: "bg-lime-400 animate-pulse",
    danger: "bg-rose-400",
    warning: "bg-amber-400",
    info: "bg-cyan-400",
    outline: "bg-zinc-400",
    neutral: "bg-zinc-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full uppercase tracking-wider",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </span>
  );
};
