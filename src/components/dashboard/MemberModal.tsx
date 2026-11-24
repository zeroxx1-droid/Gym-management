"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Member, MembershipDuration, MemberStatus } from "@/types";
import { useGym } from "@/context/GymContext";

const memberSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone number is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().min(4, "Date of birth is required"),
  planId: z.string().min(1, "Please select a membership plan"),
  status: z.enum(["active", "expired", "pending"]),
  emergencyName: z.string().min(2, "Emergency contact name required"),
  emergencyPhone: z.string().min(7, "Emergency phone required"),
  emergencyRelation: z.string().min(2, "Relation required"),
  notes: z.string().optional(),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: Member | null;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  memberToEdit,
}) => {
  const { plans, addMember, updateMember } = useGym();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      gender: "Male",
      dateOfBirth: "1995-05-15",
      planId: plans[0]?.id || "plan-monthly",
      status: "active",
      emergencyName: "",
      emergencyPhone: "",
      emergencyRelation: "Family",
      notes: "",
    },
  });

  useEffect(() => {
    if (memberToEdit) {
      setValue("fullName", memberToEdit.fullName);
      setValue("email", memberToEdit.email);
      setValue("phone", memberToEdit.phone);
      setValue("gender", memberToEdit.gender);
      setValue("dateOfBirth", memberToEdit.dateOfBirth);
      setValue("planId", memberToEdit.planId);
      setValue("status", memberToEdit.status);
      setValue("emergencyName", memberToEdit.emergencyContact.name);
      setValue("emergencyPhone", memberToEdit.emergencyContact.phone);
      setValue("emergencyRelation", memberToEdit.emergencyContact.relation);
      setValue("notes", memberToEdit.notes || "");
    } else {
      reset({
        fullName: "",
        email: "",
        phone: "",
        gender: "Male",
        dateOfBirth: "1995-05-15",
        planId: plans[0]?.id || "plan-monthly",
        status: "active",
        emergencyName: "",
        emergencyPhone: "",
        emergencyRelation: "Family",
        notes: "",
      });
    }
  }, [memberToEdit, setValue, reset, plans]);

  const onSubmit = (data: MemberFormData) => {
    const selectedPlan = plans.find((p) => p.id === data.planId) || plans[0];

    const today = new Date();
    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + selectedPlan.durationMonths);

    if (memberToEdit) {
      updateMember(memberToEdit.id, {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planDuration: selectedPlan.duration as MembershipDuration,
        status: data.status as MemberStatus,
        emergencyContact: {
          name: data.emergencyName,
          phone: data.emergencyPhone,
          relation: data.emergencyRelation,
        },
        notes: data.notes,
      });
    } else {
      addMember({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        avatarUrl:
          data.gender === "Female"
            ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        emergencyContact: {
          name: data.emergencyName,
          phone: data.emergencyPhone,
          relation: data.emergencyRelation,
        },
        planId: selectedPlan.id,
        planName: selectedPlan.name,
        planDuration: selectedPlan.duration as MembershipDuration,
        startDate: today.toISOString().split("T")[0],
        expiryDate: expiry.toISOString().split("T")[0],
        status: data.status as MemberStatus,
        notes: data.notes,
      });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={memberToEdit ? "Edit Member Profile" : "Register New Athlete"}
      description="Add member information, plan assignment, and emergency contact details."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
        {/* Personal Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Full Name *
            </label>
            <input
              {...register("fullName")}
              placeholder="e.g. Alexander Stone"
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
            />
            {errors.fullName && (
              <p className="text-rose-400 mt-1 text-[11px]">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Email Address *
            </label>
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
            <label className="block text-zinc-300 font-medium mb-1">
              Phone Number (WhatsApp) *
            </label>
            <input
              {...register("phone")}
              placeholder="+1 (555) 000-0000"
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
            />
            {errors.phone && (
              <p className="text-rose-400 mt-1 text-[11px]">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">Gender</label>
              <select
                {...register("gender")}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-2.5 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">DOB</label>
              <input
                {...register("dateOfBirth")}
                type="date"
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-2 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Membership Plan & Status */}
        <div className="p-3 bg-dark-950/80 rounded-xl border border-dark-700 space-y-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-lime-400 block">
            Plan Assignment & Access Status
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Selected Plan *
              </label>
              <select
                {...register("planId")}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              >
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (${p.price} / {p.duration})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Account Status
              </label>
              <select
                {...register("status")}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              >
                <option value="active">Active (Turnstile Allowed)</option>
                <option value="pending">Pending Payment</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-3 bg-dark-950/80 rounded-xl border border-dark-700 space-y-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 block">
            Emergency Contact Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="block text-zinc-400 font-medium mb-1">Contact Name *</label>
              <input
                {...register("emergencyName")}
                placeholder="Name"
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              />
              {errors.emergencyName && (
                <p className="text-rose-400 mt-1 text-[10px]">{errors.emergencyName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Contact Phone *</label>
              <input
                {...register("emergencyPhone")}
                placeholder="Phone"
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              />
              {errors.emergencyPhone && (
                <p className="text-rose-400 mt-1 text-[10px]">{errors.emergencyPhone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 font-medium mb-1">Relationship</label>
              <input
                {...register("emergencyRelation")}
                placeholder="e.g. Spouse / Sibling"
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-zinc-400 font-medium mb-1">
            Coach / Front Desk Notes (Optional)
          </label>
          <textarea
            {...register("notes")}
            rows={2}
            placeholder="Special workout goals, medical considerations, locker preference..."
            className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-dark-700">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="lime" size="sm" isLoading={isSubmitting}>
            {memberToEdit ? "Update Athlete" : "Complete Registration"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
