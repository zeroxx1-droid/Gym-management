"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  QrCode,
  CreditCard,
  Dumbbell,
  MessageSquare,
  BarChart3,
  Layers,
  ExternalLink,
  RotateCcw,
  UserCheck,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGym } from "@/context/GymContext";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const { resetToDefaultData, stats } = useGym();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    {
      name: "Members",
      href: "/admin/members",
      icon: Users,
      badge: stats.totalMembers,
    },
    {
      name: "QR Attendance",
      href: "/admin/attendance",
      icon: QrCode,
      badge: stats.todayAttendance ? `${stats.todayAttendance} today` : undefined,
    },
    { name: "Membership Plans", href: "/admin/memberships", icon: Layers },
    {
      name: "Payments & Invoices",
      href: "/admin/payments",
      icon: CreditCard,
      badge: stats.pendingPaymentsCount ? `${stats.pendingPaymentsCount} due` : undefined,
      badgeVariant: "warning",
    },
    { name: "Workout & Diets", href: "/admin/fitness", icon: Dumbbell },
    { name: "WhatsApp Alerts", href: "/admin/notifications", icon: MessageSquare },
    { name: "Revenue Reports", href: "/admin/reports", icon: BarChart3 },
  ];

  const handleReset = () => {
    if (confirm("Reset all gym demo data back to default records?")) {
      resetToDefaultData();
      alert("Demo data reset successfully.");
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-64 bg-dark-950 border-r border-dark-700/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-dark-700/80">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center font-black text-black text-lg shadow-neon group-hover:scale-105 transition-transform">
              ■
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-sm tracking-widest uppercase">
                BLACK<span className="text-lime-400">SQUARE</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                Admin OS 2.0
              </span>
            </div>
          </Link>

          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden text-zinc-400 hover:text-white p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider uppercase text-zinc-300">
            Management Modules
          </div>

          {navigation.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all group",
                  isActive
                    ? "bg-lime-500/10 text-lime-400 border border-lime-500/30 shadow-[0_0_15px_rgba(204,255,0,0.1)] font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-dark-800/80"
                )}
              >
                <div className="flex items-center gap-3 truncate">
                  <item.icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive
                        ? "text-lime-400"
                        : "text-zinc-400 group-hover:text-zinc-200"
                    )}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0",
                      isActive
                        ? "bg-lime-500 text-black"
                        : item.badgeVariant === "warning"
                        ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                        : "bg-dark-800 text-zinc-300 border border-zinc-700"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Portals & Switchers */}
        <div className="p-3 border-t border-dark-700/80 space-y-1.5 bg-dark-900/60">
          <div className="px-2 text-[10px] font-semibold tracking-wider uppercase text-zinc-300 mb-1">
            Experience Switcher
          </div>

          <Link
            href="/member"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-dark-800 hover:bg-dark-700 hover:text-white transition-colors border border-dark-700"
          >
            <div className="flex items-center gap-2">
              <UserCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>Member Portal</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </Link>

          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 bg-dark-800 hover:bg-dark-700 hover:text-white transition-colors border border-dark-700"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Public Website</span>
            </div>
            <ExternalLink className="w-3 h-3 text-zinc-400" />
          </Link>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-medium text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors mt-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </aside>
    </>
  );
};
