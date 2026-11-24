/**
 * Centralized API configuration and Future Backend Integration Architecture
 * Ready for Node.js / Express.js / MongoDB / WhatsApp Cloud API / Stripe Gateway
 */

export const API_CONFIG = {
  // Base URLs
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  SOCKET_URL: process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000",
  
  // Future Production Backend Endpoints
  ENDPOINTS: {
    AUTH: {
      LOGIN: "/auth/login",
      REGISTER: "/auth/register",
      REFRESH: "/auth/refresh-token",
      ME: "/auth/me",
      LOGOUT: "/auth/logout",
    },
    MEMBERS: {
      LIST: "/members",
      DETAIL: (id: string) => `/members/${id}`,
      CREATE: "/members",
      UPDATE: (id: string) => `/members/${id}`,
      DELETE: (id: string) => `/members/${id}`,
      RENEW: (id: string) => `/members/${id}/renew`,
      ASSIGN_PLAN: (id: string) => `/members/${id}/assign-plan`,
    },
    ATTENDANCE: {
      SCAN_QR: "/attendance/scan",
      MANUAL_CHECKIN: "/attendance/manual",
      TODAY_LOGS: "/attendance/today",
      HISTORY: "/attendance/history",
      STATS: "/attendance/stats",
    },
    MEMBERSHIPS: {
      PLANS: "/plans",
      UPDATE_PLAN: (id: string) => `/plans/${id}`,
    },
    PAYMENTS: {
      LIST: "/payments",
      RECORD: "/payments/record",
      INVOICE: (id: string) => `/payments/invoice/${id}`,
      CREATE_INTENT: "/payments/stripe/create-intent",
      WEBHOOK: "/payments/stripe/webhook",
    },
    FITNESS: {
      WORKOUT_PLANS: "/fitness/workouts",
      DIET_PLANS: "/fitness/diets",
      ASSIGN: "/fitness/assign",
    },
    NOTIFICATIONS: {
      WHATSAPP_SEND: "/notifications/whatsapp/send",
      WHATSAPP_TEMPLATES: "/notifications/whatsapp/templates",
      LOGS: "/notifications/logs",
    },
    ANALYTICS: {
      OVERVIEW: "/analytics/overview",
      REVENUE_CHART: "/analytics/revenue",
      ATTENDANCE_PEAK: "/analytics/peak-hours",
    },
  },

  // JWT & Auth Token Config
  JWT: {
    STORAGE_KEY: "bsg_auth_token",
    REFRESH_KEY: "bsg_refresh_token",
    USER_KEY: "bsg_auth_user",
  },

  // Role-Based Access Control (RBAC) definition
  ROLES: {
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    STAFF: "STAFF",
    MEMBER: "MEMBER",
  } as const,

  // External Integration Placeholders
  INTEGRATIONS: {
    WHATSAPP_BUSINESS_ENABLED: false, // Set to true when WhatsApp Cloud API tokens are added
    STRIPE_ENABLED: false,           // Set to true when Stripe publishable key is added
    CAMERA_SCANNER_ENABLED: false,   // Set to true for live hardware/webcam stream
  },
};

/**
 * Returns authorization headers for future REST API calls
 */
export function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") {
    return { "Content-Type": "application/json" };
  }
  const token = localStorage.getItem(API_CONFIG.JWT.STORAGE_KEY);
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
