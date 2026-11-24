"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Member, NotificationType } from "@/types";
import { useGym } from "@/context/GymContext";
import { MessageSquare, ExternalLink, Send, CheckCircle2 } from "lucide-react";

interface WhatsAppMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
  initialType?: NotificationType;
}

export const WhatsAppMessageModal: React.FC<WhatsAppMessageModalProps> = ({
  isOpen,
  onClose,
  member,
  initialType = "expiry_reminder",
}) => {
  const { notificationTemplates, sendWhatsAppNotification } = useGym();
  const [selectedType, setSelectedType] = useState<NotificationType>(initialType);
  const [customNote, setCustomNote] = useState<string>("");
  const [wasSent, setWasSent] = useState(false);

  if (!member) return null;

  const currentTemplate =
    notificationTemplates.find((t) => t.type === selectedType) || notificationTemplates[0];

  const formattedPreview = currentTemplate.messageTemplate
    .replace(/{{name}}/g, member.fullName)
    .replace(/{{plan}}/g, member.planName)
    .replace(/{{expiry_date}}/g, member.expiryDate)
    .replace(/{{member_id}}/g, member.qrCodeDisplay)
    .replace(/{{amount}}/g, "49")
    .replace(/{{invoice}}/g, "INV-2026-DUE") +
    (customNote ? `\n\n*Note from Desk:* ${customNote}` : "");

  const handleSend = () => {
    const waUrl = sendWhatsAppNotification(member.id, selectedType, customNote);
    setWasSent(true);
    // Open in new tab
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
    setTimeout(() => {
      setWasSent(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch WhatsApp Notification"
      description={`Send instant templated communication to ${member.fullName} (${member.phone})`}
      maxWidth="lg"
    >
      <div className="space-y-4 text-xs">
        {/* Template Selector */}
        <div>
          <label className="block text-zinc-300 font-medium mb-1.5">
            Select Notification Campaign Template
          </label>
          <div className="grid grid-cols-2 gap-2">
            {notificationTemplates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setSelectedType(tpl.type)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedType === tpl.type
                    ? "bg-lime-500/15 border-lime-500 text-white font-medium"
                    : "bg-dark-950 border-dark-700 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="text-xs font-semibold text-white">{tpl.title}</div>
                <div className="text-[10px] text-zinc-400 truncate mt-0.5">{tpl.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Front Desk Note */}
        <div>
          <label className="block text-zinc-300 font-medium mb-1">
            Personal Desk Add-on Note (Optional)
          </label>
          <input
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="e.g. Free protein smoothie coupon waiting at front desk"
            className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
          />
        </div>

        {/* Live WhatsApp chat bubble preview */}
        <div>
          <label className="block text-zinc-400 font-medium mb-1 flex items-center justify-between">
            <span>WhatsApp Message Preview</span>
            <span className="text-[10px] text-lime-400 font-mono">Recipient: {member.phone}</span>
          </label>
          <div className="bg-[#0b141a] p-4 rounded-xl border border-zinc-800 space-y-2">
            <div className="bg-[#005c4b] text-white p-3.5 rounded-xl rounded-tr-none text-xs leading-relaxed whitespace-pre-wrap max-w-[95%] ml-auto shadow-md border border-[#005c4b]/50">
              {formattedPreview}
              <div className="text-[10px] text-zinc-300/80 text-right mt-1.5 flex items-center justify-end gap-1 font-mono">
                <span>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                <span>✓✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Meta Business API note */}
        <div className="bg-dark-950 p-2.5 rounded-lg border border-dark-700/80 text-[11px] text-zinc-400 flex items-center justify-between">
          <span>Meta WhatsApp Business Cloud API hook configured in service layer.</span>
          <span className="text-lime-400 font-medium">Clickable Direct Link</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-dark-700">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="button"
            variant="lime"
            size="sm"
            onClick={handleSend}
            leftIcon={wasSent ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
          >
            {wasSent ? "Dispatched!" : "Launch WhatsApp (wa.me)"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
