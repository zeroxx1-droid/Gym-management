"use client";

import React from "react";
import { useGym } from "@/context/GymContext";
import { formatCurrency } from "@/lib/utils";
import { Check, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PricingPlansProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan }) => {
  const { plans } = useGym();

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-950 relative">
      <div className="absolute inset-0 bg-radial-lime opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest">
            Transparent Athletic Memberships
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            CHOOSE YOUR <span className="text-lime-400">MEMBERSHIP</span> LEVEL
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            No initiation hidden fees. No maintenance charges. Instant digital QR pass issued to your smartphone upon enrollment.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative bg-dark-900 border rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? "border-lime-500/80 shadow-[0_0_35px_rgba(204,255,0,0.2)] md:-translate-y-3 bg-gradient-to-b from-dark-850 to-dark-900 ring-2 ring-lime-500/50"
                    : "border-dark-700/80 hover:border-zinc-500 shadow-card"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-lime-500 text-black text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-neon flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Most Popular Tier
                    </span>
                  </div>
                )}

                <div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="my-6 pb-6 border-b border-dark-800 flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tight">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-xs text-zinc-400 font-semibold uppercase">
                      / {plan.duration}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-xs text-zinc-500 line-through font-mono ml-auto">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                      All Included Amenities:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <Check className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-dark-800">
                  <Button
                    variant={isPopular ? "lime" : "outline"}
                    size="lg"
                    onClick={() => onSelectPlan(plan.name)}
                    className="w-full text-xs font-bold"
                  >
                    Select {plan.name}
                  </Button>
                  <p className="text-[10px] text-zinc-500 text-center mt-2.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-lime-400" />
                    Instant Biometric QR Activation
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
