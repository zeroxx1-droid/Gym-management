"use client";

import React from "react";
import Link from "next/link";
import { Shield, User, ExternalLink, Globe, Share2, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-dark-800 text-zinc-400 text-xs py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center font-black text-black text-lg shadow-neon">
                ■
              </div>
              <span className="font-extrabold text-white text-base tracking-widest uppercase">
                BLACK<span className="text-lime-400">SQUARE</span>
              </span>
            </Link>
            <p className="text-zinc-400 leading-relaxed text-xs">
              The premier high performance iron temple and biometric strength ecosystem. Engineered for those who refuse mediocrity.
            </p>
            <div className="flex items-center gap-3 text-zinc-400 pt-2">
              <Globe className="w-4 h-4 hover:text-lime-400 cursor-pointer transition-colors" />
              <Share2 className="w-4 h-4 hover:text-lime-400 cursor-pointer transition-colors" />
              <MessageCircle className="w-4 h-4 hover:text-lime-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Disciplines
            </h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-lime-400 transition-colors">Hypertrophy & Physique</a></li>
              <li><a href="#programs" className="hover:text-lime-400 transition-colors">Olympic Powerlifting</a></li>
              <li><a href="#programs" className="hover:text-lime-400 transition-colors">Sprint Turf & Conditioning</a></li>
              <li><a href="#programs" className="hover:text-lime-400 transition-colors">Combat Striking & Boxing</a></li>
              <li><a href="#programs" className="hover:text-lime-400 transition-colors">Sub-Zero Bio-Recovery</a></li>
            </ul>
          </div>

          {/* Memberships */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Memberships
            </h4>
            <ul className="space-y-2">
              <li><a href="#pricing" className="hover:text-lime-400 transition-colors">Standard Monthly ($49)</a></li>
              <li><a href="#pricing" className="hover:text-lime-400 transition-colors">Pro Quarterly ($129)</a></li>
              <li><a href="#pricing" className="hover:text-lime-400 transition-colors">Elite Black VIP ($449)</a></li>
              <li><a href="#schedule" className="hover:text-lime-400 transition-colors">Class Timetable</a></li>
              <li><a href="#contact" className="hover:text-lime-400 transition-colors">Locker Bookings</a></li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider uppercase text-xs">
              Experience Portals
            </h4>
            <div className="space-y-2.5">
              <Link
                href="/member"
                className="flex items-center justify-between p-2.5 bg-dark-900 border border-dark-700/80 rounded-xl hover:border-lime-500/50 transition-colors group"
              >
                <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white">
                  <User className="w-3.5 h-3.5 text-lime-400" />
                  <span>Member QR Portal</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime-400" />
              </Link>

              <Link
                href="/admin"
                className="flex items-center justify-between p-2.5 bg-dark-900 border border-dark-700/80 rounded-xl hover:border-lime-500/50 transition-colors group"
              >
                <div className="flex items-center gap-2 text-zinc-300 group-hover:text-white">
                  <Shield className="w-3.5 h-3.5 text-lime-400" />
                  <span>Admin Dashboard</span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime-400" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 Black Square Gym Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400">Biometric Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
