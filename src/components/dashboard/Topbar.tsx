"use client";

import React from "react";
import {
  Menu,
  QrCode,
  UserPlus,
  Bell,
  Search,
  Activity,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface TopbarProps {
  onToggleSidebar?: () => void;
  onOpenRegisterModal?: () => void;
  onOpenScannerModal?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  onToggleSidebar,
  onOpenRegisterModal,
  onOpenScannerModal,
}) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-dark-950/80 backdrop-blur-md border-b border-dark-700/80 px-4 sm:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-dark-800 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-dark-900 border border-dark-700/60 rounded-lg text-xs text-zinc-400">
          <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
          <span className="font-medium text-zinc-300">Turnstile Hub:</span>
          <span className="text-lime-400 font-mono">ONLINE (4 Active Lanes)</span>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {onOpenScannerModal ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={onOpenScannerModal}
            leftIcon={<QrCode className="w-3.5 h-3.5 text-lime-400" />}
            className="hidden sm:inline-flex"
          >
            <span>Scan QR</span>
          </Button>
        ) : (
          <Link href="/admin/attendance">
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<QrCode className="w-3.5 h-3.5 text-lime-400" />}
              className="hidden sm:inline-flex"
            >
              <span>Scan QR</span>
            </Button>
          </Link>
        )}

        {onOpenRegisterModal ? (
          <Button
            size="sm"
            variant="lime"
            onClick={onOpenRegisterModal}
            leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          >
            <span className="hidden xs:inline">Add Member</span>
            <span className="xs:hidden">Add</span>
          </Button>
        ) : (
          <Link href="/admin/members">
            <Button
              size="sm"
              variant="lime"
              leftIcon={<UserPlus className="w-3.5 h-3.5" />}
            >
              <span className="hidden xs:inline">Add Member</span>
              <span className="xs:hidden">Add</span>
            </Button>
          </Link>
        )}

        <div className="h-6 w-px bg-dark-700 mx-1 hidden sm:block" />

        {/* Admin profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-lg bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-lime-400 font-bold text-xs">
            BS
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold text-white leading-tight">
              Front Desk Admin
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};
