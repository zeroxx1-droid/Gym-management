import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  variant?: "lime" | "default" | "warning" | "danger";
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  variant = "default",
  className,
}) => {
  const iconVariants = {
    lime: "bg-lime-500/15 text-lime-400 border-lime-500/30",
    default: "bg-dark-800 text-zinc-300 border-dark-700",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  return (
    <div
      className={cn(
        "bg-dark-900 border border-dark-700/80 rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:border-lime-500/40 hover:shadow-[0_0_20px_rgba(204,255,0,0.08)] group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {value}
          </h3>
        </div>

        <div
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105",
            iconVariants[variant]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || change) && (
        <div className="mt-3 pt-3 border-t border-dark-800/80 flex items-center justify-between text-xs">
          {change && (
            <span
              className={cn(
                "inline-flex items-center gap-1 font-semibold text-[11px]",
                isPositive ? "text-lime-400" : "text-rose-400"
              )}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {change}
            </span>
          )}
          {subtitle && <span className="text-zinc-500 text-[11px] truncate">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};
