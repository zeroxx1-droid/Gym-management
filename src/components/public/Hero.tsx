"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Flame,
  ShieldCheck,
  Sparkles,
  QrCode,
  Play,
  CheckCircle2,
} from "lucide-react";

interface HeroProps {
  onOpenTrialModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrialModal }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-dark-950">
      {/* Background Graphic with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter grayscale contrast-125 scale-105 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/80 to-dark-950/60" />
      <div className="absolute inset-0 bg-radial-lime pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10 space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-bold uppercase tracking-widest shadow-neon">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Black Square Performance Sanctuary • 24/7 Biometric Access</span>
        </div>

        {/* High Voltage Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-[1.05]">
          FORGE UNBREAKABLE <br className="hidden sm:inline" />
          <span className="text-gradient-lime">STRENGTH & POWER</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
          The premier strength temple engineered with calibrated Eleiko iron, cold plunge bio-recovery saunas, Olympic turf, and seamless QR turnstile tracking.
        </p>

        {/* CTA Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button
            size="lg"
            variant="lime"
            onClick={onOpenTrialModal}
            rightIcon={<ArrowRight className="w-4 h-4 text-black" />}
          >
            Claim 7-Day Free Pass
          </Button>

          <a href="#pricing">
            <Button size="lg" variant="secondary">
              View Memberships
            </Button>
          </a>

          <Link href="/member">
            <Button
              size="lg"
              variant="outline"
              leftIcon={<QrCode className="w-4 h-4 text-lime-400" />}
            >
              Athlete QR Portal
            </Button>
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
            No Long-Term Lock-in
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
            Instant QR Turnstile Verification
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
            Bio-Recovery Saunas Included
          </span>
        </div>

        {/* Key Metrics Banner */}
        <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/80 rounded-2xl p-4 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">
              32,000
            </p>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
              Sq Ft Iron Floor
            </p>
          </div>

          <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/80 rounded-2xl p-4 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              24 / 7
            </p>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
              Biometric Access
            </p>
          </div>

          <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/80 rounded-2xl p-4 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-lime-400 font-mono">
              98.4%
            </p>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
              Goal Transformation
            </p>
          </div>

          <div className="bg-dark-900/80 backdrop-blur-md border border-dark-700/80 rounded-2xl p-4 text-center">
            <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              4.9 ★
            </p>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mt-1 font-semibold">
              500+ Athlete Reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
