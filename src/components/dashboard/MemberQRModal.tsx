"use client";

import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Member } from "@/types";
import { formatDate } from "@/lib/utils";
import { Download, Printer, ShieldCheck, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface MemberQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export const MemberQRModal: React.FC<MemberQRModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSimulatingPrint, setIsSimulatingPrint] = useState(false);

  if (!member) return null;

  const handlePrint = () => {
    setIsSimulatingPrint(true);
    setTimeout(() => {
      setIsSimulatingPrint(false);
      alert(`[Demo Pass System] Sending digital badge for ${member.fullName} (${member.qrCodeDisplay}) to thermal card printer.`);
    }, 800);
  };

  const handleCopyToken = () => {
    navigator.clipboard?.writeText(member.qrCodeToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Member Turnstile Pass"
      description="Official digital identity pass for optical QR turnstiles and bio-recovery entry."
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Pass Card */}
        <div
          id="member-pass-card"
          className="relative bg-gradient-to-b from-dark-850 via-dark-900 to-black border-2 border-lime-500/50 rounded-2xl p-5 shadow-[0_0_25px_rgba(204,255,0,0.15)] overflow-hidden"
        >
          {/* Neon accent glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-dark-700/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-lime-500 rounded flex items-center justify-center font-black text-black text-xs">
                ■
              </div>
              <span className="font-extrabold text-white text-xs tracking-widest uppercase">
                BLACK<span className="text-lime-400">SQUARE</span>
              </span>
            </div>

            <Badge
              variant={
                member.status === "active"
                  ? "lime"
                  : member.status === "expired"
                  ? "danger"
                  : "warning"
              }
              size="sm"
              dot
            >
              {member.status}
            </Badge>
          </div>

          {/* Member Info */}
          <div className="flex items-center gap-3.5 my-4">
            <img
              src={member.avatarUrl}
              alt={member.fullName}
              className="w-14 h-14 rounded-xl object-cover border-2 border-lime-400/40 shadow-md"
            />
            <div>
              <h4 className="text-base font-extrabold text-white tracking-tight leading-snug">
                {member.fullName}
              </h4>
              <p className="text-xs text-lime-400 font-medium">{member.planName}</p>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono mt-1">
                <span>ID: {member.qrCodeDisplay}</span>
                <span>•</span>
                <span>Valid: {formatDate(member.expiryDate)}</span>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center shadow-inner mx-auto max-w-[210px]">
            <QRCodeSVG
              value={member.qrCodeToken}
              size={175}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
            <span className="text-[10px] font-mono font-bold text-black tracking-widest mt-2 uppercase">
              {member.qrCodeDisplay}
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-700/80 flex items-center justify-between text-[10px] text-zinc-400">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
              <span>BSG Encrypted NFC/QR Token</span>
            </div>
            <span>Auto-renew: Enabled</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            isLoading={isSimulatingPrint}
            leftIcon={<Printer className="w-3.5 h-3.5 text-lime-400" />}
          >
            Print Card Pass
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyToken}
            leftIcon={
              copied ? (
                <Check className="w-3.5 h-3.5 text-lime-400" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )
            }
          >
            {copied ? "Token Copied!" : "Copy QR Data"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
