"use client";

import React from "react";
import Link from "next/link";
import { useGym } from "@/context/GymContext";
import { Shield, User, ExternalLink, LogOut, QrCode } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { members, activeMemberId, setActiveMemberId, activeMember } = useGym();

  return (
    <div className="min-h-screen bg-dark-950 text-zinc-100 flex flex-col">
      {/* Member Navbar */}
      <header className="sticky top-0 z-40 h-16 bg-dark-900/90 backdrop-blur-md border-b border-dark-700/80 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center font-black text-black text-base shadow-neon group-hover:scale-105 transition-transform">
              ■
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-sm tracking-wider uppercase">
                BLACK<span className="text-lime-400">SQUARE</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                Athlete Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Member selector for live demo testing */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-dark-950 px-3 py-1.5 rounded-lg border border-dark-700 text-xs">
            <span className="text-zinc-400">Simulate Member:</span>
            <select
              value={activeMemberId}
              onChange={(e) => setActiveMemberId(e.target.value)}
              className="bg-transparent text-lime-400 font-semibold focus:outline-none cursor-pointer text-xs"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id} className="bg-dark-900 text-white">
                  {m.fullName} ({m.planName} • {m.status})
                </option>
              ))}
            </select>
          </div>

          <Link href="/admin">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Shield className="w-3.5 h-3.5 text-lime-400" />}
            >
              <span className="hidden sm:inline">Admin Dashboard</span>
              <span className="sm:hidden">Admin</span>
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
              className="hidden sm:inline-flex"
            >
              Public Site
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-dark-800 text-center text-xs text-zinc-500">
        <p>© 2026 Black Square Gym. High Performance & Biometric Athletic Portal.</p>
      </footer>
    </div>
  );
}
