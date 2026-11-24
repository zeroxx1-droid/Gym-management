"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { ProgramsSection } from "@/components/public/ProgramsSection";
import { FacilitiesSection } from "@/components/public/FacilitiesSection";
import { TrainersSection } from "@/components/public/TrainersSection";
import { PricingPlans } from "@/components/public/PricingPlans";
import { ScheduleTimetable } from "@/components/public/ScheduleTimetable";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { ContactSection } from "@/components/public/ContactSection";
import { Footer } from "@/components/public/Footer";
import { TrialBookingModal } from "@/components/public/TrialBookingModal";

export default function PublicHomePage() {
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [selectedPlanForTrial, setSelectedPlanForTrial] = useState("7-Day Free VIP Trial");

  const handleOpenTrial = (planName?: string) => {
    setSelectedPlanForTrial(planName || "7-Day Free VIP Trial");
    setIsTrialOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-zinc-100 flex flex-col selection:bg-lime-500 selection:text-black">
      {/* Navigation */}
      <Navbar onOpenTrialModal={() => handleOpenTrial("7-Day Free VIP Trial")} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenTrialModal={() => handleOpenTrial("7-Day Free VIP Trial")} />
        <ProgramsSection onSelectProgram={(name) => handleOpenTrial(name)} />
        <FacilitiesSection />
        <TrainersSection />
        <PricingPlans onSelectPlan={(planName) => handleOpenTrial(planName)} />
        <ScheduleTimetable onBookClass={(className) => handleOpenTrial(className)} />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Free Trial / Plan Selection Modal */}
      <TrialBookingModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
        defaultPlanName={selectedPlanForTrial}
      />
    </div>
  );
}
