"use client";

import React, { useState } from "react";
import { Sparkles, Server, CheckCircle2, ChevronRight, X, ShieldAlert } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { API_CONFIG } from "@/services/apiConfig";

export const SimulationNotice: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      <div className="bg-dark-900/90 border border-dark-700/80 px-4 py-2.5 rounded-xl flex items-center justify-between text-xs text-zinc-300 backdrop-blur-md shadow-md mb-6">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="flex h-2 w-2 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
          </span>
          <span className="truncate">
            <strong className="text-lime-400 font-semibold">Demo System Active:</strong> Full local state persistence & simulated APIs. Ready for production backend hookup.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-[11px] font-bold text-lime-400 hover:text-lime-300 bg-lime-500/10 hover:bg-lime-500/20 px-2.5 py-1 rounded-md border border-lime-500/30 transition-all"
          >
            <span>Backend Spec</span>
            <ChevronRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-zinc-500 hover:text-zinc-300 p-0.5 rounded transition-colors"
            title="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Production Backend Integration Architecture"
        description="Specifications and connection readiness for Black Square Gym"
        maxWidth="xl"
      >
        <div className="space-y-4 text-sm text-zinc-300 mt-2">
          <div className="bg-dark-950 p-4 rounded-xl border border-dark-700">
            <div className="flex items-center gap-2 text-lime-400 font-bold mb-2">
              <Server className="w-4 h-4" />
              <span>Target Microservice Stack</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This frontend has been designed with an enterprise service abstraction layer (`src/services/`). All data handlers can be toggled to live Node.js/Express REST and WebSocket APIs by setting `NEXT_PUBLIC_USE_REAL_BACKEND=true`.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-dark-950/70 border border-dark-700 rounded-lg">
              <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                <span>JWT Authentication & RBAC</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Admin, Staff, and Member roles with bearer tokens and route guards.
              </p>
            </div>

            <div className="p-3 bg-dark-950/70 border border-dark-700 rounded-lg">
              <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                <span>MongoDB Schemas</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Normalized models for Members, Plans, Invoices, Check-ins, and Nutrition.
              </p>
            </div>

            <div className="p-3 bg-dark-950/70 border border-dark-700 rounded-lg">
              <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                <span>Hardware QR Scanner API</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Webhook and socket pipeline for optical turnstile barcode/QR validation.
              </p>
            </div>

            <div className="p-3 bg-dark-950/70 border border-dark-700 rounded-lg">
              <div className="flex items-center gap-2 text-white font-medium text-xs mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" />
                <span>WhatsApp Cloud API</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Meta Business API placeholders with instant click-to-chat fallback.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-lime-500 text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-lime-400 transition-colors"
            >
              Close Overview
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
