"use client";

import React from "react";
import { Award, Dumbbell, Zap, HeartPulse, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export const TrainersSection: React.FC = () => {
  const coaches = [
    {
      name: "Viktor Vance",
      role: "Head Strength Coach & Master Trainer",
      specialty: "Powerlifting (840 lb Deadlift) & Periodization",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600",
      experience: "14+ Yrs Pro Athlete Coaching",
      badge: "Master Coach",
    },
    {
      name: "Elena Thorne",
      role: "Hypertrophy & Mobility Director",
      specialty: "IFBB Physique Champion & Biomechanics",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600",
      experience: "Former Olympic Track Finalist",
      badge: "Physique Specialist",
    },
    {
      name: "Marcus 'Blade' Cruz",
      role: "Combat Striking & Conditioning",
      specialty: "Pro Muay Thai & High-Intensity Conditioning",
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600",
      experience: "22-3 Combat Record",
      badge: "Striking Coach",
    },
    {
      name: "Maya Lin, RD",
      role: "Chief Sports Nutritionist",
      specialty: "Clinical Macronutrients & Hormonal Optimization",
      image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=600",
      experience: "MSc Exercise Physiology",
      badge: "Nutrition Director",
    },
  ];

  return (
    <section id="coaches" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-950">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            Elite Pedigree
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            COACHES WHO <span className="text-lime-400">PRACTICE</span> WHAT THEY PREACH
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Our coaching staff has mentored world champion powerlifters, Olympic sprinters, and everyday champions achieving lifetime milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coaches.map((coach, idx) => (
            <div
              key={idx}
              className="bg-dark-900 border border-dark-700/80 rounded-2xl overflow-hidden shadow-card group hover:border-lime-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale contrast-115 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge variant="lime" size="sm">
                    {coach.badge}
                  </Badge>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-lime-400 transition-colors">
                  {coach.name}
                </h3>
                <p className="text-xs font-semibold text-zinc-300">
                  {coach.role}
                </p>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {coach.specialty}
                </p>

                <div className="pt-3 border-t border-dark-800 flex items-center justify-between text-[10px] text-lime-400 font-mono">
                  <span>{coach.experience}</span>
                  <Share2 className="w-3.5 h-3.5 text-zinc-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
