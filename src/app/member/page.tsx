"use client";

import React, { useState } from "react";
import { useGym } from "@/context/GymContext";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import { formatDate, formatCurrency, calculateDaysLeft } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  QrCode,
  ShieldCheck,
  Calendar,
  Clock,
  Dumbbell,
  Utensils,
  CreditCard,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  Download,
  Flame,
  Award,
} from "lucide-react";

export default function MemberDashboardPage() {
  const {
    activeMember,
    members,
    setActiveMemberId,
    plans,
    workoutPlans,
    dietPlans,
    attendance,
    payments,
    renewMember,
  } = useGym();

  const [isRenewing, setIsRenewing] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(activeMember?.planId || "plan-quarterly");

  if (!activeMember) {
    return (
      <div className="py-16 text-center text-zinc-400">
        Loading athlete profile...
      </div>
    );
  }

  const daysLeft = calculateDaysLeft(activeMember.expiryDate);
  const isExpired = activeMember.status === "expired" || daysLeft < 0;

  // Member's assigned workout & diet
  const assignedWorkout = workoutPlans.find((w) => w.id === activeMember.assignedWorkoutPlanId) || workoutPlans[0];
  const assignedDiet = dietPlans.find((d) => d.id === activeMember.assignedDietPlanId) || dietPlans[0];

  // Member's personal check-ins
  const memberAttendance = attendance.filter((a) => a.memberId === activeMember.id);

  // Member's invoices
  const memberPayments = payments.filter((p) => p.memberId === activeMember.id);

  const handleRenew = () => {
    setIsRenewing(true);
    const chosenPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

    setTimeout(() => {
      renewMember(activeMember.id, chosenPlan.durationMonths, chosenPlan.name, chosenPlan.price);
      setIsRenewing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#CCFF00", "#ffffff", "#000000"],
        });
      } catch {}
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Member Switcher */}
      <div className="md:hidden bg-dark-900 border border-dark-700/80 p-3 rounded-xl flex items-center justify-between text-xs">
        <span className="text-zinc-400">Viewing Member:</span>
        <select
          value={activeMember.id}
          onChange={(e) => setActiveMemberId(e.target.value)}
          className="bg-dark-950 text-lime-400 font-semibold px-2 py-1 rounded border border-dark-700 focus:outline-none"
        >
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.fullName} ({m.status})
            </option>
          ))}
        </select>
      </div>

      {/* Expired Warning Banner */}
      {isExpired && (
        <div className="bg-rose-500/15 border-2 border-rose-500/50 rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-extrabold text-white">
                Membership Expired — Turnstile Gate Locked
              </h3>
              <p className="text-xs text-rose-200/80 mt-1">
                Your {activeMember.planName} pass lapsed on {formatDate(activeMember.expiryDate)}. Renew today to immediately restore 24/7 gym access and bio-recovery bookings.
              </p>
            </div>
          </div>

          <Button
            variant="lime"
            size="md"
            onClick={handleRenew}
            isLoading={isRenewing}
            leftIcon={<RefreshCw className="w-4 h-4 text-black" />}
            className="shrink-0"
          >
            Instant 1-Click Renew
          </Button>
        </div>
      )}

      {/* Top Profile Summary Bar */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-2xl p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={activeMember.avatarUrl}
            alt={activeMember.fullName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-lime-400 shadow-neon"
          />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {activeMember.fullName}
              </h1>
              <Badge
                variant={activeMember.status === "active" ? "lime" : "danger"}
                size="sm"
                dot
              >
                {activeMember.status}
              </Badge>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Pass ID: <span className="font-mono text-lime-400 font-bold">{activeMember.qrCodeDisplay}</span> • Tier: <strong className="text-white">{activeMember.planName}</strong>
            </p>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="flex items-center gap-4 sm:gap-6 border-t md:border-t-0 md:border-l border-dark-700/80 pt-4 md:pt-0 md:pl-6 text-xs">
          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              Days Left
            </span>
            <span
              className={`text-xl font-extrabold font-mono ${
                daysLeft <= 5 ? "text-rose-400" : "text-lime-400"
              }`}
            >
              {daysLeft > 0 ? daysLeft : 0}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              Gym Check-ins
            </span>
            <span className="text-xl font-extrabold font-mono text-white">
              {activeMember.totalCheckIns || 0}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
              Valid Until
            </span>
            <span className="text-xs font-bold font-mono text-zinc-300 mt-1 block">
              {formatDate(activeMember.expiryDate)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Digital Pass (left) + Fitness Schedule (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Digital Pass Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative bg-gradient-to-b from-dark-850 via-dark-900 to-black border-2 border-lime-500/50 rounded-2xl p-6 shadow-neon overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-dark-700/80">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-lime-500 rounded flex items-center justify-center font-black text-black text-xs">
                  ■
                </div>
                <span className="font-extrabold text-white text-xs tracking-widest uppercase">
                  BLACK<span className="text-lime-400">SQUARE</span> PASS
                </span>
              </div>
              <Badge variant={isExpired ? "danger" : "lime"} size="sm" dot>
                {activeMember.status}
              </Badge>
            </div>

            <div className="my-5 text-center">
              <div className="bg-white p-4 rounded-2xl shadow-inner inline-block mx-auto border-4 border-lime-400/30">
                <QRCodeSVG
                  value={activeMember.qrCodeToken}
                  size={190}
                  level="H"
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>

              <p className="mt-3 font-mono font-black text-sm tracking-widest text-lime-400 uppercase">
                {activeMember.qrCodeDisplay}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                Scan at turnstile optical sensor for automatic entry
              </p>
            </div>

            <div className="pt-3 border-t border-dark-700/80 flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                <span>Verified Biometric Pass</span>
              </div>
              <span className="font-mono">Exp: {formatDate(activeMember.expiryDate)}</span>
            </div>
          </div>

          {/* Renewal CTA Card */}
          <div className="bg-dark-900 border border-dark-700/80 rounded-2xl p-5 shadow-card space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                Membership Renewal Tier
              </h3>
              <span className="text-[10px] text-zinc-400">Auto-instant activation</span>
            </div>

            <select
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
            >
              {plans.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — ${p.price} / {p.duration} (+{p.durationMonths} Months)
                </option>
              ))}
            </select>

            <Button
              variant="lime"
              size="sm"
              onClick={handleRenew}
              isLoading={isRenewing}
              className="w-full text-xs"
            >
              Renew Membership ({formatCurrency(plans.find((p) => p.id === selectedPlanId)?.price || 49)})
            </Button>
          </div>

          {/* Quick WhatsApp Support Link */}
          <div className="bg-dark-900 border border-dark-700/80 rounded-2xl p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-white">Front Desk Concierge</h4>
                <p className="text-[11px] text-zinc-400">Inquiries, locker bookings & towels</p>
              </div>
            </div>
            <a
              href="https://wa.me/15552345678?text=Hello%20Black%20Square%20Gym%20Desk!%20I%20need%20assistance%20with%20my%20membership."
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg text-xs transition-colors"
            >
              WhatsApp Desk
            </a>
          </div>
        </div>

        {/* Workout, Diet, and Logs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Assigned Daily Workout Schedule */}
          <div className="bg-dark-900 border border-dark-700/80 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dark-700">
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-lime-400" />
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Assigned Training: {assignedWorkout.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Goal: {assignedWorkout.goal} • {assignedWorkout.daysPerWeek} training days per week
                  </p>
                </div>
              </div>
              <Badge variant="lime" size="sm">
                Active Protocol
              </Badge>
            </div>

            <div className="space-y-3">
              {assignedWorkout.schedule.slice(0, 2).map((day, idx) => (
                <div key={idx} className="bg-dark-950 border border-dark-700 rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-white mb-2">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-lime-400" />
                      {day.day}
                    </span>
                    <span className="text-[11px] text-lime-400 font-mono">
                      {day.focus}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-dark-800">
                    {day.exercises.map((ex, i) => (
                      <div key={i} className="flex items-center justify-between text-zinc-300">
                        <span>{ex.name}</span>
                        <span className="font-mono text-lime-400 text-[11px]">
                          {ex.sets} × {ex.reps} ({ex.restSeconds}s rest)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Daily Nutrition Plan */}
          <div className="bg-dark-900 border border-dark-700/80 rounded-2xl p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dark-700">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    Assigned Nutrition: {assignedDiet.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Target: {assignedDiet.caloriesTarget} kcal • Hydration: {assignedDiet.waterLiters}L/day
                  </p>
                </div>
              </div>
              <Badge variant="info" size="sm">
                Target Macros
              </Badge>
            </div>

            {/* Macros pill bar */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="bg-dark-950 p-2.5 rounded-xl border border-dark-700">
                <span className="text-[10px] text-zinc-400 uppercase block">Daily Protein</span>
                <span className="font-bold text-lime-400 text-sm">{assignedDiet.proteinGrams}g</span>
              </div>
              <div className="bg-dark-950 p-2.5 rounded-xl border border-dark-700">
                <span className="text-[10px] text-zinc-400 uppercase block">Carbohydrates</span>
                <span className="font-bold text-amber-400 text-sm">{assignedDiet.carbsGrams}g</span>
              </div>
              <div className="bg-dark-950 p-2.5 rounded-xl border border-dark-700">
                <span className="text-[10px] text-zinc-400 uppercase block">Healthy Fats</span>
                <span className="font-bold text-rose-400 text-sm">{assignedDiet.fatsGrams}g</span>
              </div>
            </div>

            {/* Meal sample */}
            <div className="space-y-2">
              {assignedDiet.meals.slice(0, 3).map((meal, idx) => (
                <div key={idx} className="bg-dark-950 p-3 rounded-lg border border-dark-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-lime-400 font-mono font-bold">
                      {meal.time}
                    </span>
                    <h5 className="font-bold text-white mt-0.5">{meal.mealName}</h5>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{meal.foods.slice(0, 2).join(", ")}...</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-white">{meal.calories} kcal</span>
                    <span className="text-[10px] text-lime-400 block font-mono">{meal.protein}g P</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Check-in History */}
          <div className="bg-dark-900 border border-dark-700/80 rounded-2xl p-6 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-lime-400" />
              Personal Facility Check-in Log
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-dark-950 text-zinc-400 uppercase text-[10px] border-b border-dark-700">
                  <tr>
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3">Method</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800">
                  {memberAttendance.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-zinc-500 text-xs">
                        No check-in history logged yet today.
                      </td>
                    </tr>
                  ) : (
                    memberAttendance.map((rec) => (
                      <tr key={rec.id}>
                        <td className="py-2.5 px-3 font-mono text-zinc-300">
                          {new Date(rec.checkInTime).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-zinc-400">
                          {rec.method}
                        </td>
                        <td className="py-2.5 px-3">
                          <Badge variant={rec.status === "Valid" ? "lime" : "warning"} size="sm">
                            {rec.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
