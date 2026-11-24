"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const FacilitiesSection: React.FC = () => {
  const facilities = [
    {
      title: "Calibrated Iron & Competition Racks",
      description: "Custom Eleiko combo benches, calibrated barbell plates, Rogue mono-lifts, and dumbbell tiers up to 150 lbs.",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800",
      specs: "20+ Racks • Eleiko Calibrated Steel",
    },
    {
      title: "40-Yard Sprint Turf & Combat Arena",
      description: "Shock-absorbing synthetic turf strip for Prowler sled pulls, farmer carries, plyometrics, and boxing heavy bag cage.",
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=800",
      specs: "Heavy Bag Cage • Tank Sleds",
    },
    {
      title: "Bio-Recovery: Finnish Sauna & Cold Plunge",
      description: "Dedicated wet recovery spa featuring 195°F traditional dry heat Finnish sauna and 38°F filtered ice water plunge baths.",
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800",
      specs: "38°F Cryo Plunge • Cedar Sauna",
    },
    {
      title: "Black Fuel & Organic Smoothie Bar",
      description: "Cold-pressed juices, pure whey isolate shakes, pre-workout energy elixirs, and chef-curated high protein meal prep.",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=800",
      specs: "Organic Macros • Nitrogen Cold Brew",
    },
  ];

  return (
    <section id="facilities" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 border-b border-dark-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            World-Class Infrastructure
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            THE BLACK SQUARE <span className="text-lime-400">SANCTUARY</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every machine, barbell, and recovery bath was chosen without compromise for lifters who take their craft seriously.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-dark-950 border border-dark-700/80 rounded-3xl overflow-hidden shadow-card group hover:border-lime-500/50 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-lime-400 border border-lime-500/30 font-mono text-xs font-bold">
                    {fac.specs}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-lime-400 transition-colors">
                  {fac.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {fac.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
