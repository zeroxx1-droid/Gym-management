"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useGym } from "@/context/GymContext";
import {
  QrCode,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Volume2,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose }) => {
  const { members, recordAttendance } = useGym();
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || "");
  const [manualCode, setManualCode] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    memberName?: string;
    planName?: string;
    isExpired?: boolean;
    message: string;
    timestamp?: string;
  } | null>(null);

  // Play synthetic scanner beep via Web Audio API
  const playScanBeep = (isError = false) => {
    try {
      if (typeof window === "undefined") return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (isError) {
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.setValueAtTime(240, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // Audio might be blocked by browser policy without user gesture
    }
  };

  const handleSimulateScan = (memberIdToScan: string) => {
    const member = members.find((m) => m.id === memberIdToScan);
    if (!member) return;

    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      const res = recordAttendance(member.id, "QR Scan");
      const isExpired = member.status === "expired";

      playScanBeep(isExpired);

      setScanResult({
        success: res.success,
        memberName: member.fullName,
        planName: member.planName,
        isExpired,
        message: res.message,
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 700);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    const matched = members.find(
      (m) =>
        m.qrCodeDisplay.toLowerCase() === manualCode.trim().toLowerCase() ||
        m.id.toLowerCase() === manualCode.trim().toLowerCase() ||
        m.fullName.toLowerCase().includes(manualCode.trim().toLowerCase())
    );

    if (matched) {
      handleSimulateScan(matched.id);
      setManualCode("");
    } else {
      playScanBeep(true);
      setScanResult({
        success: false,
        message: `No active athlete found matching code "${manualCode}".`,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Turnstile QR Attendance Scanner"
      description="Optical barcode & QR validation terminal for front desk and gate turnstiles."
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Viewfinder simulation */}
        <div className="relative aspect-[16/10] bg-black rounded-xl overflow-hidden border-2 border-dark-700 flex flex-col items-center justify-center">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          {/* Scanner target frame */}
          <div className="relative w-48 h-48 border-2 border-lime-500/70 rounded-2xl flex items-center justify-center p-3 shadow-[0_0_20px_rgba(204,255,0,0.2)]">
            {/* Viewfinder corner brackets */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-lime-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-lime-400" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-lime-400" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-lime-400" />

            {/* Laser scanning line */}
            <div className="absolute inset-x-2 top-0 h-0.5 bg-lime-400 shadow-[0_0_12px_#CCFF00] animate-scan-line pointer-events-none" />

            <div className="text-center">
              <QrCode className="w-14 h-14 text-lime-400/40 mx-auto mb-2 animate-pulse" />
              <p className="text-[10px] font-mono tracking-wider uppercase text-lime-400">
                {isScanning ? "DECODING TOKEN..." : "ALIGN MEMBER PASS"}
              </p>
            </div>
          </div>

          {/* Terminal status bar */}
          <div className="absolute bottom-2 inset-x-3 bg-dark-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-dark-700 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5 text-lime-400">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-ping" />
              OPTICAL CAM 01: READY
            </span>
            <span>4K 60FPS SENSOR</span>
          </div>
        </div>

        {/* Scan Result Feedback Banner */}
        {scanResult && (
          <div
            className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
              scanResult.isExpired
                ? "bg-rose-500/10 border-rose-500/40 text-rose-300"
                : scanResult.success
                ? "bg-lime-500/10 border-lime-500/40 text-lime-300"
                : "bg-amber-500/10 border-amber-500/40 text-amber-300"
            }`}
          >
            {scanResult.isExpired ? (
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : scanResult.success ? (
              <CheckCircle2 className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}

            <div className="text-xs">
              <div className="font-bold flex items-center gap-2">
                <span>{scanResult.message}</span>
                {scanResult.timestamp && (
                  <span className="text-[10px] opacity-75 font-mono">
                    [{scanResult.timestamp}]
                  </span>
                )}
              </div>
              {scanResult.planName && (
                <p className="text-[11px] opacity-80 mt-0.5">
                  Plan: {scanResult.planName} • Recorded in live attendance ledger
                </p>
              )}
            </div>
          </div>
        )}

        {/* Quick Simulation Presets */}
        <div className="bg-dark-950 p-3.5 rounded-xl border border-dark-700 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
              1-Click Scan Simulator
            </span>
            <span className="text-[10px] text-zinc-400">Click to trigger scan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={() => handleSimulateScan("mem-001")}
              disabled={isScanning}
              className="p-2 bg-dark-900 hover:bg-dark-800 border border-dark-700 hover:border-lime-500/50 rounded-lg text-left transition-all text-xs"
            >
              <div className="font-semibold text-white">Marcus Vance</div>
              <div className="text-[10px] text-lime-400">Active • Elite Black Annual</div>
            </button>

            <button
              onClick={() => handleSimulateScan("mem-002")}
              disabled={isScanning}
              className="p-2 bg-dark-900 hover:bg-dark-800 border border-dark-700 hover:border-lime-500/50 rounded-lg text-left transition-all text-xs"
            >
              <div className="font-semibold text-white">Elena Rostova</div>
              <div className="text-[10px] text-lime-400">Active • Pro Quarterly</div>
            </button>

            <button
              onClick={() => handleSimulateScan("mem-003")}
              disabled={isScanning}
              className="p-2 bg-dark-900 hover:bg-dark-800 border border-dark-700 hover:border-rose-500/50 rounded-lg text-left transition-all text-xs"
            >
              <div className="font-semibold text-white">David Chen</div>
              <div className="text-[10px] text-rose-400 font-semibold">
                Expired • Standard Monthly
              </div>
            </button>

            <button
              onClick={() => handleSimulateScan("mem-006")}
              disabled={isScanning}
              className="p-2 bg-dark-900 hover:bg-dark-800 border border-dark-700 hover:border-lime-500/50 rounded-lg text-left transition-all text-xs"
            >
              <div className="font-semibold text-white">Sofia Ramirez</div>
              <div className="text-[10px] text-lime-400">Active • VIP Pass</div>
            </button>
          </div>
        </div>

        {/* Manual Code Input */}
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="Or enter pass code manually (e.g. BSG-0001)..."
            className="flex-1 bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
          />
          <Button type="submit" variant="lime" size="sm">
            Manual Verify
          </Button>
        </form>
      </div>
    </Modal>
  );
};
