export type MembershipDuration = "Monthly" | "Quarterly" | "Annual";
export type MemberStatus = "active" | "expired" | "pending";
export type PaymentStatus = "paid" | "pending" | "overdue";
export type AttendanceMethod = "QR Scan" | "Manual" | "Front Desk Card";

export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  emergencyContact: EmergencyContact;
  planId: string;
  planName: string;
  planDuration: MembershipDuration;
  startDate: string;
  expiryDate: string;
  status: MemberStatus;
  qrCodeToken: string;
  qrCodeDisplay: string;
  assignedWorkoutPlanId?: string;
  assignedDietPlanId?: string;
  totalCheckIns: number;
  lastCheckIn?: string;
  notes?: string;
  registeredAt: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  slug: string;
  duration: MembershipDuration;
  durationMonths: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  description: string;
  features: string[];
  activeMembersCount: number;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberAvatar: string;
  memberPlan: string;
  checkInTime: string;
  method: AttendanceMethod;
  status: "Valid" | "Expired Warning" | "Guest";
  notes?: string;
}

export interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  planName: string;
  amount: number;
  paymentDate: string;
  dueDate: string;
  paymentMethod: "Credit Card" | "Debit Card" | "Cash" | "Bank Transfer" | "Stripe Demo";
  status: PaymentStatus;
  notes?: string;
}

export interface ExerciseItem {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
}

export interface DaySchedule {
  day: string;
  focus: string;
  exercises: ExerciseItem[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  goal: "Hypertrophy" | "Strength" | "Fat Loss" | "Athletic Conditioning" | "Endurance";
  level: "Beginner" | "Intermediate" | "Advanced";
  durationWeeks: number;
  description: string;
  daysPerWeek: number;
  schedule: DaySchedule[];
}

export interface MealItem {
  time: string;
  mealName: string;
  foods: string[];
  calories: number;
  protein: number;
}

export interface DietPlan {
  id: string;
  title: string;
  targetGoal: string;
  caloriesTarget: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  waterLiters: number;
  description: string;
  meals: MealItem[];
}

export type NotificationType = "expiry_reminder" | "payment_reminder" | "welcome" | "renewal_offer";

export interface NotificationTemplate {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  messageTemplate: string;
}

export interface NotificationLog {
  id: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  type: NotificationType;
  message: string;
  sentAt: string;
  status: "sent" | "simulated" | "delivered";
  linkUrl: string;
}

export interface GymStats {
  totalMembers: number;
  activeMembers: number;
  expiredMembers: number;
  pendingMembers: number;
  todayAttendance: number;
  pendingPaymentsCount: number;
  pendingPaymentsTotal: number;
  monthlyRevenue: number;
  annualRevenue: number;
}
