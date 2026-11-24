import { API_CONFIG, getAuthHeaders } from "./apiConfig";
import { Member } from "@/types";

/**
 * Member Service
 * In demo mode, these work alongside GymContext.
 * In production mode, these invoke the Express / MongoDB endpoints.
 */
export const memberService = {
  async getAll(): Promise<Member[]> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS.LIST}`, {
        headers: getAuthHeaders(),
      });
      return res.json();
    }
    // Demo fallback handled by GymContext
    return [];
  },

  async getById(id: string): Promise<Member | null> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS.DETAIL(id)}`, {
        headers: getAuthHeaders(),
      });
      return res.json();
    }
    return null;
  },

  async create(data: Partial<Member>): Promise<Member | null> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS.CREATE}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return null;
  },

  async update(id: string, data: Partial<Member>): Promise<Member | null> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS.UPDATE(id)}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return res.json();
    }
    return null;
  },

  async renew(id: string, durationMonths: number, planName: string): Promise<boolean> {
    if (process.env.NEXT_PUBLIC_USE_REAL_BACKEND === "true") {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEMBERS.RENEW(id)}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ durationMonths, planName }),
      });
      return res.ok;
    }
    return true;
  },
};
