"use client";

import React, { useState } from "react";
import { useGym } from "@/context/GymContext";
import { PaymentRecord, Member } from "@/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PaymentRecordModal } from "@/components/dashboard/PaymentRecordModal";
import { WhatsAppMessageModal } from "@/components/dashboard/WhatsAppMessageModal";
import {
  CreditCard,
  DollarSign,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Printer,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export default function PaymentsPage() {
  const { payments, members, markPaymentPaid, stats } = useGym();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [viewingReceipt, setViewingReceipt] = useState<PaymentRecord | null>(null);
  const [memberForWhatsApp, setMemberForWhatsApp] = useState<Member | null>(null);

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.planName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPaid = payments
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter((p) => p.status === "pending" || p.status === "overdue")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleMarkPaid = (id: string, memberName: string) => {
    markPaymentPaid(id);
    alert(`Payment invoice for ${memberName} marked as PAID.`);
  };

  const handleWhatsAppReminder = (payment: PaymentRecord) => {
    const member = members.find((m) => m.id === payment.memberId);
    if (member) {
      setMemberForWhatsApp(member);
    } else {
      alert("Member contact not found.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-lime-400" />
            Payment Management & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Simulated billing ledger, membership renewal tracking, and overdue invoice settlement.
          </p>
        </div>

        <Button
          variant="lime"
          size="sm"
          onClick={() => setIsRecordModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4 text-black" />}
        >
          Record Payment / Invoice
        </Button>
      </div>

      {/* Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Settled Receipts</span>
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {formatCurrency(totalPaid)}
          </p>
          <span className="text-[10px] text-lime-400 font-medium">
            {payments.filter((p) => p.status === "paid").length} cleared transactions
          </span>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Pending Receivables</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            {formatCurrency(totalPending)}
          </p>
          <span className="text-[10px] text-zinc-400">
            {payments.filter((p) => p.status === "pending" || p.status === "overdue").length} unpaid dues
          </span>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Current Month Projection</span>
            <TrendingUp className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {formatCurrency(stats.monthlyRevenue)}
          </p>
          <span className="text-[10px] text-lime-400 font-medium">+14.2% over target</span>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Gateway Integration</span>
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
          </div>
          <p className="text-sm font-bold text-zinc-200 mt-2">
            Stripe & POS Ready
          </p>
          <span className="text-[10px] text-zinc-500">Service layer mock active</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by invoice #, athlete name, or plan..."
            className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-dark-950 p-1 rounded-lg border border-dark-700 text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              All ({payments.length})
            </button>
            <button
              onClick={() => setStatusFilter("paid")}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "paid"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Paid ({payments.filter((p) => p.status === "paid").length})
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "pending"
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pending ({payments.filter((p) => p.status === "pending").length})
            </button>
            <button
              onClick={() => setStatusFilter("overdue")}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-all ${
                statusFilter === "overdue"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Overdue ({payments.filter((p) => p.status === "overdue").length})
            </button>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Invoice ID</th>
                <th className="py-3 px-4 font-semibold">Athlete</th>
                <th className="py-3 px-4 font-semibold">Membership Plan</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
                <th className="py-3 px-4 font-semibold">Method</th>
                <th className="py-3 px-4 font-semibold">Due / Paid Date</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-zinc-500">
                    No transactions match the search criteria.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-dark-850/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-zinc-200">
                      {p.invoiceNumber}
                    </td>

                    <td className="py-3 px-4 font-bold text-white">
                      {p.memberName}
                    </td>

                    <td className="py-3 px-4 text-zinc-300">
                      {p.planName}
                    </td>

                    <td className="py-3 px-4 font-mono font-extrabold text-lime-400 text-sm">
                      {formatCurrency(p.amount)}
                    </td>

                    <td className="py-3 px-4 text-zinc-400">
                      <span className="px-2 py-0.5 rounded bg-dark-950 border border-dark-700 text-[10px]">
                        {p.paymentMethod}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-300">
                      {p.status === "paid" ? formatDate(p.paymentDate) : `Due: ${formatDate(p.dueDate)}`}
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          p.status === "paid"
                            ? "lime"
                            : p.status === "pending"
                            ? "warning"
                            : "danger"
                        }
                        size="sm"
                        dot
                      >
                        {p.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingReceipt(p)}
                          className="p-1.5 text-zinc-400 hover:text-white bg-dark-950 hover:bg-dark-800 rounded-lg border border-dark-700 transition-colors"
                          title="View Digital Receipt"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {p.status !== "paid" ? (
                          <>
                            <button
                              onClick={() => handleMarkPaid(p.id, p.memberName)}
                              className="px-2 py-1 rounded bg-lime-500 hover:bg-lime-400 text-black text-[10px] font-bold shadow-sm transition-colors"
                              title="Mark Paid"
                            >
                              Settle
                            </button>
                            <button
                              onClick={() => handleWhatsAppReminder(p)}
                              className="p-1.5 text-zinc-400 hover:text-emerald-400 bg-dark-950 hover:bg-dark-800 rounded-lg border border-dark-700 transition-colors"
                              title="Send WhatsApp Due Alert"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-zinc-500 font-mono pr-1">
                            Cleared
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {viewingReceipt && (
        <Modal
          isOpen={Boolean(viewingReceipt)}
          onClose={() => setViewingReceipt(null)}
          title="Digital Billing Receipt"
          description="Official payment receipt & ledger invoice for member records."
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-dark-950 border border-dark-700 rounded-xl p-5 space-y-4 font-mono">
              {/* Header */}
              <div className="text-center pb-3 border-b border-dark-700">
                <div className="w-8 h-8 bg-lime-500 rounded mx-auto flex items-center justify-center font-black text-black text-sm mb-1">
                  ■
                </div>
                <h4 className="text-white font-extrabold tracking-widest uppercase">
                  BLACK SQUARE GYM
                </h4>
                <p className="text-[10px] text-zinc-400">
                  Performance & Athletic Conditioning Club
                </p>
                <p className="text-[10px] text-zinc-400">
                  Invoice #: {viewingReceipt.invoiceNumber}
                </p>
              </div>

              {/* Transaction details */}
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Athlete:</span>
                  <span className="text-white font-bold">{viewingReceipt.memberName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Item:</span>
                  <span className="text-white">{viewingReceipt.planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Payment Date:</span>
                  <span className="text-white">
                    {viewingReceipt.paymentDate ? formatDate(viewingReceipt.paymentDate) : "Pending"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Method:</span>
                  <span className="text-white">{viewingReceipt.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Status:</span>
                  <span
                    className={
                      viewingReceipt.status === "paid" ? "text-lime-400 font-bold" : "text-amber-400 font-bold"
                    }
                  >
                    {viewingReceipt.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-dark-700 flex justify-between items-baseline">
                <span className="text-zinc-400 text-xs">TOTAL AMOUNT:</span>
                <span className="text-xl font-extrabold text-lime-400">
                  {formatCurrency(viewingReceipt.amount)}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-dark-700">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingReceipt(null)}
              >
                Close
              </Button>
              <Button
                variant="lime"
                size="sm"
                onClick={() => {
                  alert(`[Demo System] Receipt ${viewingReceipt.invoiceNumber} sent to thermal receipt printer.`);
                }}
                leftIcon={<Printer className="w-3.5 h-3.5" />}
              >
                Print Receipt
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Record Modal */}
      <PaymentRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />

      {/* WhatsApp Due Reminder Modal */}
      <WhatsAppMessageModal
        isOpen={Boolean(memberForWhatsApp)}
        onClose={() => setMemberForWhatsApp(null)}
        member={memberForWhatsApp}
        initialType="payment_reminder"
      />
    </div>
  );
}
