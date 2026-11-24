"use client";

import React, { useState } from "react";
import { useGym } from "@/context/GymContext";
import { NotificationType, Member } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  MessageSquare,
  Send,
  ExternalLink,
  Settings,
  CheckCircle2,
  Clock,
  Sparkles,
  Shield,
  Smartphone,
  Copy,
  Check,
} from "lucide-react";

export default function NotificationsPage() {
  const {
    notificationTemplates,
    notificationLogs,
    members,
    sendWhatsAppNotification,
  } = useGym();

  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || "");
  const [selectedType, setSelectedType] = useState<NotificationType>("expiry_reminder");
  const [customNote, setCustomNote] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [lastDispatchedUrl, setLastDispatchedUrl] = useState<string | null>(null);

  const selectedMember = members.find((m) => m.id === selectedMemberId) || members[0];
  const selectedTemplate =
    notificationTemplates.find((t) => t.type === selectedType) || notificationTemplates[0];

  const previewMessage = selectedTemplate.messageTemplate
    .replace(/{{name}}/g, selectedMember.fullName)
    .replace(/{{plan}}/g, selectedMember.planName)
    .replace(/{{expiry_date}}/g, selectedMember.expiryDate)
    .replace(/{{member_id}}/g, selectedMember.qrCodeDisplay)
    .replace(/{{amount}}/g, "49")
    .replace(/{{invoice}}/g, "INV-2026-089") +
    (customNote ? `\n\n*Note from Desk:* ${customNote}` : "");

  const handleDispatch = () => {
    const url = sendWhatsAppNotification(selectedMember.id, selectedType, customNote);
    setLastDispatchedUrl(url);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-lime-400" />
            WhatsApp Notification Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Automate athlete lifecycle messaging, turnstile alerts, and click-to-chat WhatsApp communication.
          </p>
        </div>

        <Badge variant="lime" size="md">
          WhatsApp Cloud API Ready
        </Badge>
      </div>

      {/* Campaign Dispatcher & Live Bubble Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dispatch Form (7 cols) */}
        <div className="lg:col-span-7 bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-dark-700">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-lime-400" />
              Direct Campaign Dispatcher
            </h3>
            <span className="text-xs text-zinc-400">Clickable Demo Links</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Select Recipient Athlete *
              </label>
              <select
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} ({m.phone} • {m.status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Campaign Message Type *
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as NotificationType)}
                className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
              >
                <option value="expiry_reminder">Membership Expiry Alert</option>
                <option value="payment_reminder">Pending Payment Reminder</option>
                <option value="welcome">Welcome Onboarding & Pass</option>
                <option value="renewal_offer">VIP Renewal & Upgrade Offer</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block text-zinc-300 font-medium mb-1">
              Custom Desk Note (Appended to message)
            </label>
            <input
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Stop by the desk for your free electrolyte drink pack"
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
            />
          </div>

          {/* Action trigger */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-dark-800">
            <div className="text-[11px] text-zinc-400">
              Target Phone: <strong className="text-white font-mono">{selectedMember.phone}</strong>
            </div>

            <Button
              variant="lime"
              size="sm"
              onClick={handleDispatch}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Launch WhatsApp Demo (wa.me)
            </Button>
          </div>
        </div>

        {/* Live Chat Bubble Preview (5 cols) */}
        <div className="lg:col-span-5 bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-dark-700">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Live WhatsApp Screen
              </h3>
              <span className="text-[10px] text-zinc-400 font-mono">
                {selectedMember.phone}
              </span>
            </div>

            <div className="my-4 bg-[#0b141a] p-4 rounded-xl border border-zinc-800 shadow-inner">
              <div className="bg-[#005c4b] text-white p-3.5 rounded-xl rounded-tr-none text-xs leading-relaxed whitespace-pre-wrap shadow-md border border-[#005c4b]/50">
                {previewMessage}
                <div className="text-[10px] text-zinc-300/80 text-right mt-2 flex items-center justify-end gap-1 font-mono">
                  <span>
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span>✓✓</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-zinc-400 flex items-center justify-between pt-2 border-t border-dark-800">
            <span>Dynamic tags resolved</span>
            <button
              onClick={() => handleCopy(previewMessage, "preview")}
              className="text-lime-400 hover:text-lime-300 flex items-center gap-1 font-medium"
            >
              {copiedId === "preview" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedId === "preview" ? "Copied" : "Copy Text"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backend Cloud API Placeholder Card */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
        <div className="flex items-center justify-between pb-3 border-b border-dark-700 mb-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-lime-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Meta WhatsApp Business Cloud API — Configuration Specs
            </h3>
          </div>
          <Badge variant="neutral" size="sm">
            Future Backend Integration
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-dark-950 p-3 rounded-lg border border-dark-700">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
              WHATSAPP_PHONE_NUMBER_ID
            </span>
            <span className="text-white font-mono text-xs block mt-1">
              108392819283741
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Meta verified phone node</span>
          </div>

          <div className="bg-dark-950 p-3 rounded-lg border border-dark-700">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
              WEBHOOK_VERIFY_TOKEN
            </span>
            <span className="text-white font-mono text-xs block mt-1">
              bsg_live_turnstile_secure_2026
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Incoming replies listener</span>
          </div>

          <div className="bg-dark-950 p-3 rounded-lg border border-dark-700">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">
              SYSTEM_USER_PERMANENT_TOKEN
            </span>
            <span className="text-lime-400 font-mono text-xs block mt-1">
              EAAG...[ENCRYPTED_SECRET]
            </span>
            <span className="text-[10px] text-zinc-500 mt-1 block">Express microservice bearer</span>
          </div>
        </div>
      </div>

      {/* Notification Logs Table */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-dark-700/80">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            WhatsApp Transmission Ledger
          </h3>
          <p className="text-xs text-zinc-400">
            Historical record of dispatched alerts, verification reminders, and delivery statuses.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Recipient</th>
                <th className="py-3 px-4 font-semibold">Phone #</th>
                <th className="py-3 px-4 font-semibold">Campaign Type</th>
                <th className="py-3 px-4 font-semibold">Message Summary</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {notificationLogs.map((log) => (
                <tr key={log.id} className="hover:bg-dark-850/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-white">
                    {log.memberName}
                  </td>

                  <td className="py-3 px-4 font-mono text-zinc-300">
                    {log.memberPhone}
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant="lime" size="sm">
                      {log.type.replace("_", " ")}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-zinc-300 max-w-xs truncate">
                    {log.message}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                    {new Date(log.sentAt).toLocaleString()}
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {log.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <a
                      href={log.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-lime-400 hover:text-lime-300 text-[11px] font-semibold"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
