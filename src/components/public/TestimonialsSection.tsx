"use client";

import React from "react";
import { Star, Quote, TrendingUp } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Darius Vance",
      role: "Competitive Powerlifter",
      quote: "The Eleiko calibrated plates and competition racks are untouched by any commercial gym in this city. Added 65 lbs to my squat in 16 weeks.",
      metrics: "+65 lbs Squat • 8.5% Body Fat",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5,
    },
    {
      name: "Rachel Montgomery",
      role: "Corporate Executive & Hyrox Athlete",
      quote: "The contrast Finnish sauna and sub-zero cold plunge transformed my recovery. I can train 5 days a week at high intensity without joint soreness.",
      metrics: "Sub-65 min Hyrox • 24/7 Access",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      rating: 5,
    },
    {
      name: "Marcus Thorne",
      role: "Tech Founder",
      quote: "The biometric QR turnstile entry is frictionless. I swipe in at 5:30 AM before my team wakes up, follow my custom app workout, and leave charged.",
      metrics: "-28 lbs Fat Mass • Lean Muscle",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            Athlete Transformations
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            REAL RESULTS. <span className="text-lime-400">UNDENIABLE</span> PROOF.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Read what dedicated members experience inside the Black Square iron temple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-dark-900 border border-dark-700/80 rounded-2xl p-6 shadow-card hover:border-lime-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-lime-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-lime-400 text-lime-400" />
                  ))}
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-lime-500/10 border border-lime-500/20 text-lime-400 text-xs font-mono font-bold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{t.metrics}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-dark-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-xl object-cover border border-dark-700"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-[11px] text-zinc-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
