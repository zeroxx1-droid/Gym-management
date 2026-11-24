import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string | Date): string {
  if (!dateString) return "N/A";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(dateString: string | Date): string {
  if (!dateString) return "N/A";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatTime(dateString: string | Date): string {
  if (!dateString) return "N/A";
  const date = typeof dateString === "string" ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function calculateDaysLeft(expiryDateStr: string): number {
  const expiry = new Date(expiryDateStr).getTime();
  const now = new Date().getTime();
  const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function generateMemberQRToken(memberId: string, email: string): string {
  return JSON.stringify({
    gym: "BlackSquareGym",
    memberId,
    verified: true,
    issuedAt: new Date().toISOString().split("T")[0],
    code: `BSG-${memberId.replace(/[^0-9]/g, "").padStart(4, "0")}`,
  });
}
