"use client";

import React from "react";
import { Dumbbell, Flame, Zap, Shield, HeartPulse, Award, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ProgramsSectionProps {
  onSelectProgram?: (name: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onSelectProgram }) => {
  const programs = [
    {
      title: "Hypertrophy & Physique Protocol",
      description: "Advanced biomechanical lifting engineered to stimulate maximum muscle fiber recruitment and mechanical tension.",
      intensity: "High Volume",
      focus: "Muscle Mass & Density",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800",
      badge: "Flagship",
    },
    {
      title: "Calibrated Powerlifting & Strength",
      description: "IPF-spec Eleiko combo racks, calibrated steel plates, and targeted technique coaching across Squat, Bench, and Deadlift.",
      intensity: "Max Load",
      focus: "Absolute Strength (1RM)",
      icon: Award,
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800",
      badge: "Competition Ready",
    },
    {
      title: "Tactical Conditioning & Turf",
      description: "High-cadence sled pushes, kettlebell intervals, assault bikes, and battle ropes for superhuman aerobic capacity.",
      intensity: "Extreme HIIT",
      focus: "Speed & Metabolic Engine",
      icon: Flame,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=800",
      badge: "Fat Shred",
    },
    {
      title: "Combat Striking & Boxing Lab",
      description: "Heavy bag drill stations, defensive footwork, and authentic pugilistic conditioning coached by professional strikers.",
      intensity: "High Agility",
      focus: "Hand Speed & Core Rotational Power",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=800",
      badge: "Combat Zone",
    },
    {
      title: "Sub-Zero Cryo & Infrared Recovery",
      description: "Contrast therapy chambers, infrared Finnish saunas, and 38°F plunge tubs to flush lactic acid and accelerate CNS recovery.",
      intensity: "Restorative",
      focus: "Hormonal Reset & Tissue Repair",
      icon: HeartPulse,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
      badge: "Bio-Recovery",
    },
    {
      title: "1-on-1 Master Performance Coaching",
      description: "Personalized biomechanical assessments, periodic blood-marker consults, and customized progressive overload programming.",
      intensity: "Customized",
      focus: "Rapid Targeted Milestones",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
      badge: "VIP Coaching",
    },
  ];

  return (
    <section id="programs" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-900 border-y border-dark-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            Specialized Training Disciplines
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            ENGINEERED FOR <span className="text-lime-400">UNCOMPROMISING</span> ATHLETES
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every square foot and training protocol at Black Square Gym is calibrated to transform mental fortitude into undeniable athletic performance.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-dark-950 border border-dark-700/80 rounded-2xl overflow-hidden shadow-card hover:border-lime-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Banner with subtle zoom */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent" />
                <div className="absolute top-3 right-3">
                  <Badge variant="lime" size="sm">
                    {item.badge}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <item.icon className="w-4 h-4 text-lime-400" />
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">
                      {item.focus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-dark-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-400">
                    Intensity: <strong className="text-white">{item.intensity}</strong>
                  </span>
                  <a
                    href="#pricing"
                    className="text-lime-400 hover:text-lime-300 font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Enroll</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
