import { NotificationTemplate, NotificationLog } from "@/types";

export const initialNotificationTemplates: NotificationTemplate[] = [
  {
    id: "tpl-expiry",
    type: "expiry_reminder",
    title: "Membership Expiry Alert",
    description: "Sent to members 3 days before their plan ends or when expired.",
    messageTemplate: "⚡ *Black Square Gym Alert* ⚡\n\nHey {{name}}!\n\nYour *{{plan}}* membership expires on *{{expiry_date}}*.\n\nDon't lose your workout momentum! Renew today with code *BLACKSTRENGTH* to secure uninterrupted access, locker booking, and bio-recovery perks.\n\nRenew online: https://blacksquaregym.com/member?renew=true\n\nStay relentless,\nBlack Square Gym Team 🖤",
  },
  {
    id: "tpl-payment",
    type: "payment_reminder",
    title: "Pending Payment Reminder",
    description: "Gentle reminder for pending or overdue membership dues.",
    messageTemplate: "⚡ *Black Square Gym - Account Update* ⚡\n\nHi {{name}},\n\nThis is a friendly reminder that invoice *{{invoice}}* for *${{amount}}* is currently pending.\n\nPlease clear the due amount via front desk or online portal to ensure uninterrupted turnstile access:\n👉 https://blacksquaregym.com/member/invoices\n\nNeed assistance? Reply directly to this WhatsApp number.",
  },
  {
    id: "tpl-welcome",
    type: "welcome",
    title: "New Member Onboarding",
    description: "Welcomes newly registered athletes with their digital pass & pass instructions.",
    messageTemplate: "⚡ *Welcome to Black Square Gym!* ⚡\n\nWelcome to the brotherhood of high performance, {{name}}!\n\nYour membership ID is *{{member_id}}*.\nYou can access your digital QR gym pass anytime on your Member Portal:\n👉 https://blacksquaregym.com/member\n\nShow your QR code at the turnstile scanner for instant check-in. See you on the gym floor!",
  },
  {
    id: "tpl-renewal",
    type: "renewal_offer",
    title: "Special VIP Renewal Offer",
    description: "Exclusive promotion for members renewing into an Annual plan.",
    messageTemplate: "🔥 *Exclusive VIP Upgrade Offer* 🔥\n\nHey {{name}},\n\nUpgrade your current membership to our *Elite Black Annual* plan this week and receive:\n✅ 2 Free Personal Training Sessions\n✅ Free Unlimited Bio-Recovery Sauna & Ice Plunge\n✅ Free BSG Performance Apparel Kit\n\nClaim now at the front desk or reply *UPGRADE* to lock in the discount!",
  },
];

export const initialNotificationLogs: NotificationLog[] = [
  {
    id: "log-1",
    memberId: "mem-003",
    memberName: "David Chen",
    memberPhone: "+1 (555) 345-9876",
    type: "expiry_reminder",
    message: "Membership Expiry Alert sent for Standard Monthly plan.",
    sentAt: "2026-11-20T10:00:00",
    status: "delivered",
    linkUrl: "https://wa.me/15553459876",
  },
  {
    id: "log-2",
    memberId: "mem-007",
    memberName: "Jordan K. Wright",
    memberPhone: "+1 (555) 432-1098",
    type: "welcome",
    message: "Welcome onboarding message with digital QR pass link.",
    sentAt: "2026-11-22T14:30:00",
    status: "delivered",
    linkUrl: "https://wa.me/15554321098",
  },
  {
    id: "log-3",
    memberId: "mem-005",
    memberName: "Tyler 'Jax' Miller",
    memberPhone: "+1 (555) 789-0123",
    type: "payment_reminder",
    message: "Overdue payment notice for invoice INV-2026-1219 ($49).",
    sentAt: "2026-11-21T11:15:00",
    status: "delivered",
    linkUrl: "https://wa.me/15557890123",
  },
];
