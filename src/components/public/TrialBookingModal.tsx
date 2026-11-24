"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useGym } from "@/context/GymContext";
import { CheckCircle2, QrCode, Sparkles, ArrowRight } from "lucide-react";

const trialSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(7, "Phone number required"),
  goal: z.string().min(1, "Please select training goal"),
  planName: z.string().optional(),
});

type TrialFormData = z.infer<typeof trialSchema>;

interface TrialBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanName?: string;
}

export const TrialBookingModal: React.FC<TrialBookingModalProps> = ({
  isOpen,
  onClose,
  defaultPlanName = "7-Day Free VIP Trial",
}) => {
  const { plans, addMember, setActiveMemberId } = useGym();
  const [bookedMember, setBookedMember] = useState<{ id: string; name: string; pass: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrialFormData>({
    resolver: zodResolver(trialSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      goal: "Muscle Hypertrophy & Strength",
      planName: defaultPlanName,
    },
  });

  const onSubmit = (data: TrialFormData) => {
    const matchedPlan = plans.find((p) => p.name === defaultPlanName) || plans[0];
    const today = new Date();
    const expiry = new Date(today);
    expiry.setDate(expiry.getDate() + 7);

    const newMem = addMember({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      gender: "Other",
      dateOfBirth: "1998-05-12",
      emergencyContact: {
        name: "Self",
        phone: data.phone,
        relation: "Personal",
      },
      planId: matchedPlan.id,
      planName: defaultPlanName || matchedPlan.name,
      planDuration: matchedPlan.duration,
      startDate: today.toISOString().split("T")[0],
      expiryDate: expiry.toISOString().split("T")[0],
      status: "active",
      notes: `Registered via Public Website Free Trial Form (${data.goal})`,
    });

    setActiveMemberId(newMem.id);
    setBookedMember({ id: newMem.id, name: newMem.fullName, pass: newMem.qrCodeDisplay });

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#CCFF00", "#ffffff", "#000000"],
      });
    } catch {}
  };

  const handleModalClose = () => {
    setBookedMember(null);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={bookedMember ? "Trial Pass Activated!" : "Claim Your 7-Day Free VIP Pass"}
      description={
        bookedMember
          ? "Your biometric turnstile pass is live. You can enter Black Square Gym immediately."
          : `Full gym floor, recovery saunas, and masterclasses included (${defaultPlanName}).`
      }
      maxWidth="md"
    >
      {bookedMember ? (
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 bg-lime-500/20 text-lime-400 rounded-2xl mx-auto flex items-center justify-center border border-lime-500/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-white">
              Welcome, {bookedMember.name}!
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Your trial pass code is{" "}
              <strong className="text-lime-400 font-mono text-sm">
                {bookedMember.pass}
              </strong>
            </p>
          </div>

          <div className="p-4 bg-dark-950 rounded-xl border border-dark-700 text-xs text-zinc-300 text-left space-y-1.5">
            <div className="flex items-center gap-2 text-lime-400 font-bold">
              <QrCode className="w-4 h-4" />
              <span>Instant Turnstile Entry Enabled</span>
            </div>
            <p className="text-[11px] text-zinc-400">
              Open your Member Portal to view your live QR code pass anytime on your smartphone.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Link href="/member">
              <Button variant="lime" size="md" className="w-full">
                <span>Open My Member Portal</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <Button variant="outline" size="sm" onClick={handleModalClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Full Name *</label>
            <input
              {...register("fullName")}
              placeholder="e.g. Jason Thorne"
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
            />
            {errors.fullName && (
              <p className="text-rose-400 mt-1 text-[11px]">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">Email Address *</label>
              <input
                {...register("email")}
                type="email"
                placeholder="athlete@domain.com"
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
              />
              {errors.email && (
                <p className="text-rose-400 mt-1 text-[11px]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">Phone (WhatsApp Pass) *</label>
              <input
                {...register("phone")}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
              />
              {errors.phone && (
                <p className="text-rose-400 mt-1 text-[11px]">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Primary Fitness Goal</label>
            <select
              {...register("goal")}
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
            >
              <option value="Muscle Hypertrophy & Strength">Muscle Hypertrophy & Strength</option>
              <option value="Olympic Powerlifting (1RM)">Olympic Powerlifting (1RM)</option>
              <option value="Fat Loss & HIIT Conditioning">Fat Loss & HIIT Conditioning</option>
              <option value="Boxing & Combat Striking">Boxing & Combat Striking</option>
              <option value="Bio-Recovery & Mobility">Bio-Recovery & Mobility</option>
            </select>
          </div>

          <div className="p-3 bg-dark-950 rounded-xl border border-dark-700 text-[11px] text-zinc-400">
            Selected Tier: <strong className="text-lime-400">{defaultPlanName}</strong>. Includes 1 free trainer assessment and digital pass generation.
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-dark-700">
            <Button type="button" variant="outline" size="sm" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button type="submit" variant="lime" size="sm" isLoading={isSubmitting}>
              Activate Free 7-Day Pass
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
