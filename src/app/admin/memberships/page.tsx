"use client";

import React, { useState } from "react";
import { useGym } from "@/context/GymContext";
import { MembershipPlan, Member } from "@/types";
import { formatCurrency, formatDate, calculateDaysLeft } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { WhatsAppMessageModal } from "@/components/dashboard/WhatsAppMessageModal";
import {
  Layers,
  Edit2,
  Check,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  MessageSquare,
  Clock,
  ArrowRight,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function MembershipsPage() {
  const { plans, members, updatePlan, renewMember } = useGym();
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [planPrice, setPlanPrice] = useState<number>(0);
  const [planDesc, setPlanDesc] = useState<string>("");
  const [planFeatures, setPlanFeatures] = useState<string>("");

  const [memberForWhatsApp, setMemberForWhatsApp] = useState<Member | null>(null);
  const [bulkAlertSent, setBulkAlertSent] = useState(false);

  // Expired or expiring soon members
  const expiringMembers = members.filter((m) => {
    const days = calculateDaysLeft(m.expiryDate);
    return m.status === "expired" || (m.status === "active" && days <= 7);
  });

  const handleOpenEditPlan = (plan: MembershipPlan) => {
    setEditingPlan(plan);
    setPlanPrice(plan.price);
    setPlanDesc(plan.description);
    setPlanFeatures(plan.features.join("\n"));
  };

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    updatePlan(editingPlan.id, {
      price: Number(planPrice),
      description: planDesc,
      features: planFeatures
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    });

    setEditingPlan(null);
  };

  const handleBulkAlert = () => {
    setBulkAlertSent(true);
    setTimeout(() => {
      setBulkAlertSent(false);
      alert(`[Demo System] Queued WhatsApp expiry reminders to ${expiringMembers.length} athletes.`);
    }, 1000);
  };

  const handleQuickRenew = (member: Member) => {
    const plan = plans.find((p) => p.id === member.planId) || plans[0];
    renewMember(member.id, plan.durationMonths, plan.name, plan.price);
    alert(`Successfully renewed ${member.fullName} for ${plan.name} (+${plan.durationMonths} months).`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Layers className="w-7 h-7 text-lime-400" />
            Membership Plans & Expiry Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Configure tier pricing, manage recurring durations, and automate member renewal lifecycles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleBulkAlert}
            isLoading={bulkAlertSent}
            leftIcon={<MessageSquare className="w-3.5 h-3.5 text-lime-400" />}
          >
            <span>Notify Expiring Members ({expiringMembers.length})</span>
          </Button>
        </div>
      </div>

      {/* Membership Plans Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const membersOnPlan = members.filter((m) => m.planId === plan.id).length;

          return (
            <div
              key={plan.id}
              className={`relative bg-dark-900 border rounded-2xl p-6 shadow-card flex flex-col justify-between transition-all duration-300 hover:border-lime-500/50 ${
                plan.popular
                  ? "border-lime-500/70 shadow-[0_0_25px_rgba(204,255,0,0.15)] ring-1 ring-lime-500/40"
                  : "border-dark-700/80"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-neon">
                    Most Popular Tier
                  </span>
                </div>
              )}

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {plan.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleOpenEditPlan(plan)}
                    className="p-1.5 text-zinc-400 hover:text-lime-400 bg-dark-950 hover:bg-dark-800 rounded-lg border border-dark-700 transition-colors"
                    title="Edit Plan Price & Features"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Price Display */}
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    {formatCurrency(plan.price)}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    / {plan.duration.toLowerCase()}
                  </span>
                  {plan.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through ml-2 font-mono">
                      ${plan.originalPrice}
                    </span>
                  )}
                </div>

                {/* Active athletes count badge */}
                <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 bg-dark-950 rounded-lg border border-dark-700 text-xs text-zinc-300">
                  <span className="w-2 h-2 rounded-full bg-lime-400" />
                  <span className="font-bold text-white">{membersOnPlan}</span>
                  <span className="text-zinc-400">active subscribers</span>
                </div>

                {/* Feature Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-dark-800">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-2">
                    Included Amenities:
                  </span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-dark-800">
                <Button
                  variant={plan.popular ? "lime" : "outline"}
                  size="sm"
                  onClick={() => handleOpenEditPlan(plan)}
                  className="w-full text-xs"
                >
                  Edit Pricing & Perks
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expired & Expiring Soon Tracking Section */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
        <div className="p-5 border-b border-dark-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Renewal Pipeline & Expiry Watchlist
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Athletes whose memberships have lapsed or expire within 7 days.
            </p>
          </div>

          <Badge variant="warning" size="md">
            {expiringMembers.length} Athletes Pending Renewal
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Athlete</th>
                <th className="py-3 px-4 font-semibold">Current Plan</th>
                <th className="py-3 px-4 font-semibold">Expiry Date</th>
                <th className="py-3 px-4 font-semibold">Time Remaining</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {expiringMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    All athlete memberships are active and healthy.
                  </td>
                </tr>
              ) : (
                expiringMembers.map((member) => {
                  const daysLeft = calculateDaysLeft(member.expiryDate);
                  return (
                    <tr key={member.id} className="hover:bg-dark-850/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={member.avatarUrl}
                            alt={member.fullName}
                            className="w-8 h-8 rounded-lg object-cover border border-dark-700"
                          />
                          <div>
                            <span className="font-bold text-white block truncate">
                              {member.fullName}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-mono">
                              {member.phone}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-zinc-300 font-medium">
                        {member.planName}
                      </td>

                      <td className="py-3 px-4 font-mono text-[11px] text-zinc-300">
                        {formatDate(member.expiryDate)}
                      </td>

                      <td className="py-3 px-4 font-mono">
                        {daysLeft < 0 ? (
                          <span className="text-rose-400 font-bold">
                            Lapsed {Math.abs(daysLeft)} days ago
                          </span>
                        ) : daysLeft === 0 ? (
                          <span className="text-rose-400 font-bold">Expires today</span>
                        ) : (
                          <span className="text-amber-400 font-bold">
                            {daysLeft} days remaining
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <Badge
                          variant={member.status === "expired" ? "danger" : "warning"}
                          size="sm"
                          dot
                        >
                          {member.status}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setMemberForWhatsApp(member)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-medium transition-colors"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp Offer</span>
                          </button>

                          <button
                            onClick={() => handleQuickRenew(member)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-lime-500 hover:bg-lime-400 text-black text-[11px] font-bold shadow-sm transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Renew</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Edit Modal */}
      {editingPlan && (
        <Modal
          isOpen={Boolean(editingPlan)}
          onClose={() => setEditingPlan(null)}
          title={`Edit Membership Plan: ${editingPlan.name}`}
          description="Adjust monthly rates and amenities. Changes will update live across the dashboard and public pricing table."
          maxWidth="md"
        >
          <form onSubmit={handleSavePlan} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Plan Price ($ USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-zinc-500">$</span>
                <input
                  type="number"
                  value={planPrice}
                  onChange={(e) => setPlanPrice(Number(e.target.value))}
                  required
                  min={1}
                  className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-7 pr-3 py-2 text-white font-mono font-bold text-sm focus:outline-none focus:border-lime-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Plan Headline Description
              </label>
              <input
                value={planDesc}
                onChange={(e) => setPlanDesc(e.target.value)}
                required
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Perks & Amenities (One feature per line)
              </label>
              <textarea
                value={planFeatures}
                onChange={(e) => setPlanFeatures(e.target.value)}
                rows={5}
                required
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs leading-relaxed focus:outline-none focus:border-lime-500 font-sans"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-dark-700">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setEditingPlan(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="lime" size="sm">
                Save Plan Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* WhatsApp Modal */}
      <WhatsAppMessageModal
        isOpen={Boolean(memberForWhatsApp)}
        onClose={() => setMemberForWhatsApp(null)}
        member={memberForWhatsApp}
        initialType="renewal_offer"
      />
    </div>
  );
}
