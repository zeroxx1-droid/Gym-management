"use client";

import React, { useState } from "react";
import { useGym } from "@/context/GymContext";
import { Member, MemberStatus } from "@/types";
import { formatDate, calculateDaysLeft } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MemberModal } from "@/components/dashboard/MemberModal";
import { MemberQRModal } from "@/components/dashboard/MemberQRModal";
import { WhatsAppMessageModal } from "@/components/dashboard/WhatsAppMessageModal";
import { Modal } from "@/components/ui/Modal";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  QrCode,
  MessageSquare,
  Edit2,
  Trash2,
  RefreshCw,
  Dumbbell,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  Eye,
  CheckCircle,
} from "lucide-react";

export default function MembersManagementPage() {
  const {
    members,
    plans,
    workoutPlans,
    dietPlans,
    deleteMember,
    renewMember,
    assignFitnessPlans,
  } = useGym();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [memberForQR, setMemberForQR] = useState<Member | null>(null);
  const [memberForWhatsApp, setMemberForWhatsApp] = useState<Member | null>(null);
  const [memberProfileDetail, setMemberProfileDetail] = useState<Member | null>(null);

  // Renewal quick modal
  const [renewModalMember, setRenewModalMember] = useState<Member | null>(null);
  const [renewPlanId, setRenewPlanId] = useState<string>(plans[0]?.id || "");

  // Fitness assign modal
  const [fitnessModalMember, setFitnessModalMember] = useState<Member | null>(null);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string>("");
  const [selectedDietId, setSelectedDietId] = useState<string>("");

  // Filtering
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.phone.includes(searchTerm) ||
      m.qrCodeDisplay.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : m.status === statusFilter;

    const matchesPlan =
      planFilter === "all" ? true : m.planId === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove member record for ${name}? This action cannot be undone.`)) {
      deleteMember(id);
    }
  };

  const handleOpenRenew = (member: Member) => {
    setRenewModalMember(member);
    setRenewPlanId(member.planId || plans[0]?.id || "");
  };

  const handleConfirmRenew = () => {
    if (!renewModalMember) return;
    const plan = plans.find((p) => p.id === renewPlanId) || plans[0];
    renewMember(renewModalMember.id, plan.durationMonths, plan.name, plan.price);
    setRenewModalMember(null);
  };

  const handleOpenFitness = (member: Member) => {
    setFitnessModalMember(member);
    setSelectedWorkoutId(member.assignedWorkoutPlanId || "");
    setSelectedDietId(member.assignedDietPlanId || "");
  };

  const handleSaveFitness = () => {
    if (!fitnessModalMember) return;
    assignFitnessPlans(
      fitnessModalMember.id,
      selectedWorkoutId || undefined,
      selectedDietId || undefined
    );
    setFitnessModalMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Users className="w-7 h-7 text-lime-400" />
            Athlete Directory & Profiles
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage registrations, track membership statuses, renew plans, and monitor attendance credentials.
          </p>
        </div>

        <Button
          variant="lime"
          size="sm"
          onClick={() => {
            setMemberToEdit(null);
            setIsRegisterOpen(true);
          }}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Register New Athlete
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, or token (e.g. BSG-0001)..."
            className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter pills */}
          <div className="flex items-center bg-dark-950 p-1 rounded-lg border border-dark-700 text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All ({members.length})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "active"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Active ({members.filter((m) => m.status === "active").length})
            </button>
            <button
              onClick={() => setStatusFilter("expired")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "expired"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Expired ({members.filter((m) => m.status === "expired").length})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "pending"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pending ({members.filter((m) => m.status === "pending").length})
            </button>
          </div>

          {/* Plan filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="bg-dark-950 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-lime-500"
          >
            <option value="all">All Membership Plans</option>
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Athlete</th>
                <th className="py-3 px-4 font-semibold">Plan & Term</th>
                <th className="py-3 px-4 font-semibold">Valid Dates</th>
                <th className="py-3 px-4 font-semibold">Pass ID / QR</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Check-ins</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500 text-xs">
                    No athletes matched the selected filters.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => {
                  const daysLeft = calculateDaysLeft(member.expiryDate);
                  return (
                    <tr
                      key={member.id}
                      className="hover:bg-dark-850/60 transition-colors group"
                    >
                      {/* Athlete info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatarUrl}
                            alt={member.fullName}
                            className="w-9 h-9 rounded-lg object-cover border border-dark-700 shrink-0"
                          />
                          <div className="min-w-0">
                            <button
                              onClick={() => setMemberProfileDetail(member)}
                              className="font-bold text-white hover:text-lime-400 transition-colors text-left truncate block"
                            >
                              {member.fullName}
                            </button>
                            <span className="text-[11px] text-zinc-400 block truncate">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Plan */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-zinc-200 block">
                          {member.planName}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {member.planDuration}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="text-zinc-300 block">
                          Exp: {formatDate(member.expiryDate)}
                        </span>
                        {member.status === "active" ? (
                          <span
                            className={`text-[10px] ${
                              daysLeft <= 5 ? "text-amber-400 font-bold" : "text-zinc-500"
                            }`}
                          >
                            {daysLeft > 0 ? `${daysLeft} days left` : "Expires today"}
                          </span>
                        ) : member.status === "expired" ? (
                          <span className="text-[10px] text-rose-400 font-bold">
                            Expired {Math.abs(daysLeft)}d ago
                          </span>
                        ) : (
                          <span className="text-[10px] text-amber-400 font-bold">
                            Pending start
                          </span>
                        )}
                      </td>

                      {/* QR Display */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => setMemberForQR(member)}
                          className="inline-flex items-center gap-1.5 px-2 py-1 bg-dark-950 hover:bg-dark-800 border border-dark-700 hover:border-lime-500/40 rounded-md font-mono text-[11px] text-lime-400 transition-colors"
                          title="Open Digital Pass QR"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>{member.qrCodeDisplay}</span>
                        </button>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            member.status === "active"
                              ? "lime"
                              : member.status === "expired"
                              ? "danger"
                              : "warning"
                          }
                          size="sm"
                          dot
                        >
                          {member.status}
                        </Badge>
                      </td>

                      {/* Check-ins */}
                      <td className="py-3.5 px-4 font-mono text-zinc-300">
                        <span className="font-bold text-white">
                          {member.totalCheckIns || 0}
                        </span>{" "}
                        <span className="text-zinc-500 text-[10px]">visits</span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setMemberProfileDetail(member)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setMemberForWhatsApp(member)}
                            className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-dark-800 rounded-lg transition-colors"
                            title="Send WhatsApp Alert"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenRenew(member)}
                            className="p-1.5 text-zinc-400 hover:text-lime-400 hover:bg-dark-800 rounded-lg transition-colors"
                            title="Renew Membership"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleOpenFitness(member)}
                            className="p-1.5 text-zinc-400 hover:text-cyan-400 hover:bg-dark-800 rounded-lg transition-colors"
                            title="Assign Workout / Diet"
                          >
                            <Dumbbell className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setMemberToEdit(member);
                              setIsRegisterOpen(true);
                            }}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
                            title="Edit Member"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(member.id, member.fullName)}
                            className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

      {/* Member Profile Drawer Modal */}
      {memberProfileDetail && (
        <Modal
          isOpen={Boolean(memberProfileDetail)}
          onClose={() => setMemberProfileDetail(null)}
          title="Athlete Dossier & Activity Profile"
          description={`Registered ID: ${memberProfileDetail.qrCodeDisplay} • Black Square Gym`}
          maxWidth="xl"
        >
          <div className="space-y-4 text-xs">
            {/* Profile banner */}
            <div className="flex items-center gap-4 bg-dark-950 p-4 rounded-xl border border-dark-700">
              <img
                src={memberProfileDetail.avatarUrl}
                alt={memberProfileDetail.fullName}
                className="w-16 h-16 rounded-xl object-cover border-2 border-lime-400 shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-white">
                    {memberProfileDetail.fullName}
                  </h3>
                  <Badge
                    variant={
                      memberProfileDetail.status === "active"
                        ? "lime"
                        : memberProfileDetail.status === "expired"
                        ? "danger"
                        : "warning"
                    }
                    dot
                  >
                    {memberProfileDetail.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-zinc-400 text-xs mt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-zinc-500" />
                    {memberProfileDetail.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-zinc-500" />
                    {memberProfileDetail.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-dark-950 p-3 rounded-lg border border-dark-700 text-center">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Current Plan
                </span>
                <span className="text-xs font-bold text-lime-400 mt-0.5 block truncate">
                  {memberProfileDetail.planName}
                </span>
              </div>
              <div className="bg-dark-950 p-3 rounded-lg border border-dark-700 text-center">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Valid Until
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  {formatDate(memberProfileDetail.expiryDate)}
                </span>
              </div>
              <div className="bg-dark-950 p-3 rounded-lg border border-dark-700 text-center">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Lifetime Visits
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block">
                  {memberProfileDetail.totalCheckIns || 0} Check-ins
                </span>
              </div>
            </div>

            {/* Emergency Contact & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-dark-950 p-3 rounded-lg border border-dark-700">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  Emergency Contact
                </span>
                <p className="font-bold text-white">
                  {memberProfileDetail.emergencyContact?.name || "Not listed"}
                </p>
                <p className="text-zinc-400 text-[11px]">
                  {memberProfileDetail.emergencyContact?.relation} •{" "}
                  {memberProfileDetail.emergencyContact?.phone}
                </p>
              </div>

              <div className="bg-dark-950 p-3 rounded-lg border border-dark-700">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                  Trainer Notes
                </span>
                <p className="text-zinc-300 text-[11px] italic">
                  {memberProfileDetail.notes || "No special notes recorded."}
                </p>
              </div>
            </div>

            {/* Assigned Plans */}
            <div className="bg-dark-950 p-3 rounded-lg border border-dark-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block">
                  Active Fitness Regimen
                </span>
                <p className="text-xs font-semibold text-white mt-0.5">
                  Workout:{" "}
                  <span className="text-lime-400">
                    {workoutPlans.find((w) => w.id === memberProfileDetail.assignedWorkoutPlanId)?.title || "Standard Gym Routine"}
                  </span>
                </p>
                <p className="text-xs font-semibold text-white">
                  Diet:{" "}
                  <span className="text-cyan-400">
                    {dietPlans.find((d) => d.id === memberProfileDetail.assignedDietPlanId)?.title || "Standard Balanced Nutrition"}
                  </span>
                </p>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  handleOpenFitness(memberProfileDetail);
                  setMemberProfileDetail(null);
                }}
              >
                Change Plans
              </Button>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-dark-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMemberForQR(memberProfileDetail);
                  setMemberProfileDetail(null);
                }}
                leftIcon={<QrCode className="w-3.5 h-3.5 text-lime-400" />}
              >
                View Pass
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    handleOpenRenew(memberProfileDetail);
                    setMemberProfileDetail(null);
                  }}
                  leftIcon={<RefreshCw className="w-3.5 h-3.5 text-lime-400" />}
                >
                  Renew Plan
                </Button>
                <Button
                  variant="lime"
                  size="sm"
                  onClick={() => {
                    setMemberForWhatsApp(memberProfileDetail);
                    setMemberProfileDetail(null);
                  }}
                  leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                >
                  WhatsApp Member
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Plan Renewal Modal */}
      {renewModalMember && (
        <Modal
          isOpen={Boolean(renewModalMember)}
          onClose={() => setRenewModalMember(null)}
          title={`Renew Membership for ${renewModalMember.fullName}`}
          description="Select renewal tier to extend membership dates and generate paid invoice."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Select Renewal Plan Tier
              </label>
              <select
                value={renewPlanId}
                onChange={(e) => setRenewPlanId(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ${p.price} / {p.duration} (+{p.durationMonths} Months)
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-dark-950 p-3 rounded-lg border border-dark-700">
              <span className="text-zinc-400 text-[11px] block">
                Renewal will extend membership by the plan duration from today, mark the account status as Active, and add a settled renewal transaction record.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-dark-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRenewModalMember(null)}
              >
                Cancel
              </Button>
              <Button variant="lime" size="sm" onClick={handleConfirmRenew}>
                Confirm & Activate Renewal
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Fitness Assign Modal */}
      {fitnessModalMember && (
        <Modal
          isOpen={Boolean(fitnessModalMember)}
          onClose={() => setFitnessModalMember(null)}
          title={`Assign Fitness Plans: ${fitnessModalMember.fullName}`}
          description="Assign personalized training regimens and meal schedules."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Workout Plan Regimen
              </label>
              <select
                value={selectedWorkoutId}
                onChange={(e) => setSelectedWorkoutId(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="">None / Custom Gym Floor</option>
                {workoutPlans.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.title} ({w.goal} • {w.daysPerWeek} days/wk)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Target Nutrition & Diet Schedule
              </label>
              <select
                value={selectedDietId}
                onChange={(e) => setSelectedDietId(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              >
                <option value="">None / Flexible Diet</option>
                {dietPlans.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title} ({d.caloriesTarget} kcal)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-dark-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFitnessModalMember(null)}
              >
                Cancel
              </Button>
              <Button variant="lime" size="sm" onClick={handleSaveFitness}>
                Save Assignments
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reusable Modals */}
      <MemberModal
        isOpen={isRegisterOpen}
        onClose={() => {
          setIsRegisterOpen(false);
          setMemberToEdit(null);
        }}
        memberToEdit={memberToEdit}
      />

      <MemberQRModal
        isOpen={Boolean(memberForQR)}
        onClose={() => setMemberForQR(null)}
        member={memberForQR}
      />

      <WhatsAppMessageModal
        isOpen={Boolean(memberForWhatsApp)}
        onClose={() => setMemberForWhatsApp(null)}
        member={memberForWhatsApp}
        initialType="expiry_reminder"
      />
    </div>
  );
}
