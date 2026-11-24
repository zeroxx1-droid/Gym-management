import { API_CONFIG, getAuthHeaders } from "./apiConfig";
import { AttendanceRecord, PaymentRecord, MembershipPlan, NotificationLog } from "@/types";

export const attendanceService = {
  async scanQR(token: string): Promise<{ success: boolean; record?: AttendanceRecord; message: string }> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ATTENDANCE.SCAN_QR}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ token }),
      });
      return res.json();
    }
    return { success: true, message: "Demo mode scan handled by GymContext" };
  },

  async manualCheckIn(memberId: string): Promise<boolean> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ATTENDANCE.MANUAL_CHECKIN}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ memberId }),
      });
      return res.ok;
    }
    return true;
  },
};

export const paymentService = {
  async recordPayment(data: Partial<PaymentRecord>): Promise<PaymentRecord | null> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENTS.RECORD}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return null;
  },
};

export const planService = {
  async updatePlan(id: string, updates: Partial<MembershipPlan>): Promise<boolean> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERSHIPS.UPDATE_PLAN(id)}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      return res.ok;
    }
    return true;
  },
};

export const notificationService = {
  async sendWhatsApp(memberId: string, templateType: string): Promise<{ success: boolean; messageId?: string }> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.NOTIFICATIONS.WHATSAPP_SEND}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ memberId, templateType }),
      });
      return res.json();
    }
    return { success: true, messageId: "SIMULATED-WA-" + Date.now() };
  },
};
