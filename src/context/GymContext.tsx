"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Member,
  MembershipPlan,
  AttendanceRecord,
  PaymentRecord,
  WorkoutPlan,
  DietPlan,
  NotificationTemplate,
  NotificationLog,
  GymStats,
} from "@/types";
import { initialMembers } from "@/data/mockMembers";
import { initialPlans } from "@/data/mockPlans";
import { initialAttendanceRecords } from "@/data/mockAttendance";
import { initialPaymentRecords } from "@/data/mockPayments";
import { initialWorkoutPlans, initialDietPlans } from "@/data/mockFitness";
import { initialNotificationTemplates, initialNotificationLogs } from "@/data/mockNotifications";
import { generateMemberQRToken } from "@/lib/utils";

interface GymContextType {
  // Data
  members: Member[];
  plans: MembershipPlan[];
  attendance: AttendanceRecord[];
  payments: PaymentRecord[];
  workoutPlans: WorkoutPlan[];
  dietPlans: DietPlan[];
  notificationTemplates: NotificationTemplate[];
  notificationLogs: NotificationLog[];
  stats: GymStats;
  
  // Member portal active demo member
  activeMemberId: string;
  setActiveMemberId: (id: string) => void;
  activeMember: Member | undefined;

  // Actions
  addMember: (memberData: Omit<Member, "id" | "qrCodeToken" | "qrCodeDisplay" | "totalCheckIns" | "registeredAt">) => Member;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  renewMember: (memberId: string, durationMonths: number, planName: string, amount: number) => void;
  assignFitnessPlans: (memberId: string, workoutPlanId?: string, dietPlanId?: string) => void;

  // Plans
  updatePlan: (id: string, updates: Partial<MembershipPlan>) => void;

  // Attendance
  recordAttendance: (memberId: string, method?: "QR Scan" | "Manual" | "Front Desk Card") => { success: boolean; message: string; record?: AttendanceRecord };

  // Payments
  recordPayment: (payment: Omit<PaymentRecord, "id" | "invoiceNumber">) => PaymentRecord;
  markPaymentPaid: (paymentId: string) => void;

  // Notifications
  sendWhatsAppNotification: (memberId: string, type: "expiry_reminder" | "payment_reminder" | "welcome" | "renewal_offer", customNote?: string) => string;

  // System
  resetToDefaultData: () => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

const STORAGE_KEY = "black_square_gym_state_v1";

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [plans, setPlans] = useState<MembershipPlan[]>(initialPlans);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPaymentRecords);
  const [workoutPlans] = useState<WorkoutPlan[]>(initialWorkoutPlans);
  const [dietPlans] = useState<DietPlan[]>(initialDietPlans);
  const [notificationTemplates] = useState<NotificationTemplate[]>(initialNotificationTemplates);
  const [notificationLogs, setNotificationLogs] = useState<NotificationLog[]>(initialNotificationLogs);
  const [activeMemberId, setActiveMemberId] = useState<string>("mem-001");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.members) setMembers(parsed.members);
        if (parsed.plans) setPlans(parsed.plans);
        if (parsed.attendance) setAttendance(parsed.attendance);
        if (parsed.payments) setPayments(parsed.payments);
        if (parsed.notificationLogs) setNotificationLogs(parsed.notificationLogs);
        if (parsed.activeMemberId) setActiveMemberId(parsed.activeMemberId);
      }
    } catch (e) {
      console.warn("Could not load gym data from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          members,
          plans,
          attendance,
          payments,
          notificationLogs,
          activeMemberId,
        })
      );
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  }, [members, plans, attendance, payments, notificationLogs, activeMemberId, isLoaded]);

  // Derived stats
  const activeCount = members.filter((m) => m.status === "active").length;
  const expiredCount = members.filter((m) => m.status === "expired").length;
  const pendingCount = members.filter((m) => m.status === "pending").length;
  
  // Today's attendance calculation (today is Nov 23, 2026 in mock)
  const todayStr = "2026-11-23";
  const todayAttendanceCount = attendance.filter((a) => a.checkInTime.startsWith(todayStr)).length;

  const pendingPaymentsList = payments.filter((p) => p.status === "pending" || p.status === "overdue");
  const pendingPaymentsCount = pendingPaymentsList.length;
  const pendingPaymentsTotal = pendingPaymentsList.reduce((sum, p) => sum + p.amount, 0);

  const monthlyRevenue = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const stats: GymStats = {
    totalMembers: members.length,
    activeMembers: activeCount,
    expiredMembers: expiredCount,
    pendingMembers: pendingCount,
    todayAttendance: todayAttendanceCount,
    pendingPaymentsCount,
    pendingPaymentsTotal,
    monthlyRevenue: 19450, // Realistic aggregated monthly revenue
    annualRevenue: 154200,
  };

  const activeMember = members.find((m) => m.id === activeMemberId) || members[0];

  // Actions
  const addMember = (
    data: Omit<Member, "id" | "qrCodeToken" | "qrCodeDisplay" | "totalCheckIns" | "registeredAt">
  ): Member => {
    const nextNumber = members.length + 1;
    const newId = `mem-${String(nextNumber).padStart(3, "0")}`;
    const qrToken = generateMemberQRToken(newId, data.email);
    const newMember: Member = {
      ...data,
      id: newId,
      qrCodeToken: qrToken,
      qrCodeDisplay: `BSG-${String(nextNumber).padStart(4, "0")}`,
      totalCheckIns: 0,
      registeredAt: new Date().toISOString().split("T")[0],
    };

    setMembers((prev) => [newMember, ...prev]);

    // Also create initial payment record if needed
    const planObj = plans.find((p) => p.id === data.planId) || plans[0];
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: newId,
      memberName: data.fullName,
      planName: data.planName,
      amount: planObj.price,
      paymentDate: data.status === "active" ? new Date().toISOString().split("T")[0] : "",
      dueDate: new Date().toISOString().split("T")[0],
      paymentMethod: "Credit Card",
      status: data.status === "active" ? "paid" : "pending",
    };
    setPayments((prev) => [newPayment, ...prev]);

    return newMember;
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const renewMember = (
    memberId: string,
    durationMonths: number,
    planName: string,
    amount: number
  ) => {
    const today = new Date();
    const expiry = new Date(today);
    expiry.setMonth(expiry.getMonth() + durationMonths);

    const expiryDateStr = expiry.toISOString().split("T")[0];
    const startDateStr = today.toISOString().split("T")[0];

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          return {
            ...m,
            status: "active",
            planName,
            startDate: startDateStr,
            expiryDate: expiryDateStr,
            notes: (m.notes ? m.notes + " | " : "") + `Renewed ${planName} on ${startDateStr}`,
          };
        }
        return m;
      })
    );

    // Add paid renewal invoice
    const newInvoice: PaymentRecord = {
      id: `pay-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId,
      memberName: members.find((m) => m.id === memberId)?.fullName || "Member",
      planName: `${planName} (Renewal)`,
      amount,
      paymentDate: startDateStr,
      dueDate: startDateStr,
      paymentMethod: "Credit Card",
      status: "paid",
    };
    setPayments((prev) => [newInvoice, ...prev]);
  };

  const assignFitnessPlans = (memberId: string, workoutPlanId?: string, dietPlanId?: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          return {
            ...m,
            ...(workoutPlanId ? { assignedWorkoutPlanId: workoutPlanId } : {}),
            ...(dietPlanId ? { assignedDietPlanId: dietPlanId } : {}),
          };
        }
        return m;
      })
    );
  };

  const updatePlan = (id: string, updates: Partial<MembershipPlan>) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const recordAttendance = (
    memberId: string,
    method: "QR Scan" | "Manual" | "Front Desk Card" = "QR Scan"
  ): { success: boolean; message: string; record?: AttendanceRecord } => {
    const member = members.find((m) => m.id === memberId);
    if (!member) {
      return { success: false, message: "Member record not found in system." };
    }

    const isExpired = member.status === "expired";
    const nowIso = new Date().toISOString();

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now().toString().slice(-4)}`,
      memberId: member.id,
      memberName: member.fullName,
      memberAvatar: member.avatarUrl,
      memberPlan: member.planName,
      checkInTime: nowIso,
      method,
      status: isExpired ? "Expired Warning" : "Valid",
      notes: isExpired ? "Access flagged: Membership expired" : undefined,
    };

    setAttendance((prev) => [newRecord, ...prev]);

    // Update member's checkin count and lastCheckIn
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? {
              ...m,
              totalCheckIns: (m.totalCheckIns || 0) + 1,
              lastCheckIn: nowIso,
            }
          : m
      )
    );

    return {
      success: true,
      message: isExpired
        ? `Checked in with WARNING: ${member.fullName}'s membership has expired!`
        : `Check-in Verified: Welcome ${member.fullName}!`,
      record: newRecord,
    };
  };

  const recordPayment = (
    payment: Omit<PaymentRecord, "id" | "invoiceNumber">
  ): PaymentRecord => {
    const newRecord: PaymentRecord = {
      ...payment,
      id: `pay-${Date.now().toString().slice(-4)}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    setPayments((prev) => [newRecord, ...prev]);
    return newRecord;
  };

  const markPaymentPaid = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status: "paid",
              paymentDate: new Date().toISOString().split("T")[0],
            }
          : p
      )
    );
  };

  const sendWhatsAppNotification = (
    memberId: string,
    type: "expiry_reminder" | "payment_reminder" | "welcome" | "renewal_offer",
    customNote?: string
  ): string => {
    const member = members.find((m) => m.id === memberId);
    if (!member) return "#";

    const template = notificationTemplates.find((t) => t.type === type) || notificationTemplates[0];
    let msg = template.messageTemplate
      .replace(/{{name}}/g, member.fullName)
      .replace(/{{plan}}/g, member.planName)
      .replace(/{{expiry_date}}/g, member.expiryDate)
      .replace(/{{member_id}}/g, member.qrCodeDisplay)
      .replace(/{{amount}}/g, "49")
      .replace(/{{invoice}}/g, "INV-2026-DUE");

    if (customNote) {
      msg += `\n\n*Note from Desk:* ${customNote}`;
    }

    // Sanitize phone number (strip spaces, brackets, hyphens)
    const rawPhone = member.phone.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;

    const newLog: NotificationLog = {
      id: `log-${Date.now().toString().slice(-4)}`,
      memberId: member.id,
      memberName: member.fullName,
      memberPhone: member.phone,
      type,
      message: msg,
      sentAt: new Date().toISOString(),
      status: "delivered",
      linkUrl: waUrl,
    };

    setNotificationLogs((prev) => [newLog, ...prev]);
    return waUrl;
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setMembers(initialMembers);
    setPlans(initialPlans);
    setAttendance(initialAttendanceRecords);
    setPayments(initialPaymentRecords);
    setNotificationLogs(initialNotificationLogs);
    setActiveMemberId("mem-001");
  };

  return (
    <GymContext.Provider
      value={{
        members,
        plans,
        attendance,
        payments,
        workoutPlans,
        dietPlans,
        notificationTemplates,
        notificationLogs,
        stats,
        activeMemberId,
        setActiveMemberId,
        activeMember,
        addMember,
        updateMember,
        deleteMember,
        renewMember,
        assignFitnessPlans,
        updatePlan,
        recordAttendance,
        recordPayment,
        markPaymentPaid,
        sendWhatsAppNotification,
        resetToDefaultData,
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error("useGym must be used within a GymProvider");
  }
  return context;
};
