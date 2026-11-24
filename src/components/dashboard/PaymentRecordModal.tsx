"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useGym } from "@/context/GymContext";
import { CreditCard, DollarSign, CheckCircle2 } from "lucide-react";

interface PaymentRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMemberId?: string;
}

export const PaymentRecordModal: React.FC<PaymentRecordModalProps> = ({
  isOpen,
  onClose,
  defaultMemberId,
}) => {
  const { members, plans, recordPayment } = useGym();

  const [memberId, setMemberId] = useState<string>(defaultMemberId || members[0]?.id || "");
  const [amount, setAmount] = useState<number>(49);
  const [method, setMethod] = useState<"Credit Card" | "Debit Card" | "Cash" | "Bank Transfer">("Credit Card");
  const [status, setStatus] = useState<"paid" | "pending">("paid");
  const [notes, setNotes] = useState<string>("");

  const selectedMember = members.find((m) => m.id === memberId) || members[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    const todayStr = new Date().toISOString().split("T")[0];

    recordPayment({
      memberId: selectedMember.id,
      memberName: selectedMember.fullName,
      planName: selectedMember.planName,
      amount: Number(amount),
      paymentDate: status === "paid" ? todayStr : "",
      dueDate: todayStr,
      paymentMethod: method,
      status,
      notes: notes || undefined,
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Payment / Generate Invoice"
      description="Record front desk payment, counter transactions, or pending membership fee."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-zinc-300 font-medium mb-1">Select Member *</label>
          <select
            value={memberId}
            onChange={(e) => {
              setMemberId(e.target.value);
              const m = members.find((x) => x.id === e.target.value);
              const p = plans.find((x) => x.id === m?.planId);
              if (p) setAmount(p.price);
            }}
            className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.fullName} ({m.planName} • {m.status})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-zinc-300 font-medium mb-1">Amount ($ USD) *</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-zinc-500">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={1}
                required
                className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-7 pr-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as "Credit Card" | "Debit Card" | "Cash" | "Bank Transfer")}
              className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-lime-500 text-xs"
            >
              <option value="Credit Card">Credit Card (POS)</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash (Counter)</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-zinc-300 font-medium mb-1">Transaction Status</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setStatus("paid")}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                status === "paid"
                  ? "bg-lime-500/20 text-lime-400 border-lime-500"
                  : "bg-dark-950 text-zinc-400 border-dark-700 hover:text-white"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Paid (Settled)</span>
            </button>

            <button
              type="button"
              onClick={() => setStatus("pending")}
              className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                status === "pending"
                  ? "bg-amber-500/20 text-amber-400 border-amber-500"
                  : "bg-dark-950 text-zinc-400 border-dark-700 hover:text-white"
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Pending Invoice</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-zinc-400 font-medium mb-1">Transaction Notes</label>
          <input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Card transaction receipt ref #8892"
            className="w-full bg-dark-950 border border-dark-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-dark-700">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="lime" size="sm">
            Save Payment Record
          </Button>
        </div>
      </form>
    </Modal>
  );
};
