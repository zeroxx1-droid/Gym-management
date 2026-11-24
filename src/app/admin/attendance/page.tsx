"use client";

import React, { useState, useEffect } from "react";
import { useGym } from "@/context/GymContext";
import { AttendanceRecord, Member } from "@/types";
import { formatTime, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QRScannerModal } from "@/components/dashboard/QRScannerModal";
import { MemberQRModal } from "@/components/dashboard/MemberQRModal";
import { hourlyAttendanceDistribution } from "@/data/mockAttendance";
import {
  QrCode,
  Scan,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AttendancePage() {
  const { attendance, members, recordAttendance, stats } = useGym();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [selectedMemberForQR, setSelectedMemberForQR] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredAttendance = attendance.filter((item) => {
    const matchesSearch =
      item.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.memberPlan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true : item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const validCount = attendance.filter((a) => a.status === "Valid").length;
  const warningCount = attendance.filter((a) => a.status !== "Valid").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <QrCode className="w-7 h-7 text-lime-400" />
            QR Turnstile & Attendance Terminal
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Simulate optical QR validation, monitor peak gym hours, and review real-time check-in history.
          </p>
        </div>

        <Button
          variant="lime"
          size="sm"
          onClick={() => setIsScannerOpen(true)}
          leftIcon={<Scan className="w-4 h-4 text-black" />}
        >
          Launch Turnstile Scanner
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Today's Total Visits</span>
            <Clock className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {stats.todayAttendance} <span className="text-xs text-zinc-500 font-normal">athletes</span>
          </p>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Valid Pass Access</span>
            <CheckCircle2 className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-lime-400 mt-1">
            {validCount} <span className="text-xs text-zinc-500 font-normal">approved</span>
          </p>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Expired / Flagged</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            {warningCount} <span className="text-xs text-zinc-500 font-normal">alerts</span>
          </p>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Current Floor Rush</span>
            <Activity className="w-4 h-4 text-lime-400 animate-pulse" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            Peak <span className="text-xs text-lime-400 font-normal">(6 PM Surge)</span>
          </p>
        </div>
      </div>

      {/* Scanner Simulator Station & Peak Hour Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Scan Station Card (1 col) */}
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Scan className="w-4 h-4 text-lime-400" />
                Quick Check-in Station
              </h3>
              <Badge variant="lime" size="sm">
                Live Sensor
              </Badge>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Click any member below to test live turnstile optical scanning and check-in sound verification:
            </p>

            <div className="space-y-2">
              {members.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="p-2.5 bg-dark-950 border border-dark-700/80 rounded-lg flex items-center justify-between hover:border-lime-500/50 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={member.avatarUrl}
                      alt={member.fullName}
                      className="w-8 h-8 rounded-lg object-cover border border-dark-700"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate">{member.fullName}</p>
                      <p className="text-[10px] text-zinc-400 truncate font-mono">
                        {member.qrCodeDisplay} • {member.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setSelectedMemberForQR(member)}
                      className="p-1 text-zinc-400 hover:text-white"
                      title="View Pass"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        recordAttendance(member.id, "QR Scan");
                      }}
                      className="px-2 py-1 bg-lime-500 hover:bg-lime-400 text-black font-bold rounded text-[10px] shadow-sm transition-all"
                    >
                      Scan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dark-800">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsScannerOpen(true)}
              className="w-full text-xs"
            >
              Open Camera Simulator
            </Button>
          </div>
        </div>

        {/* Hourly Traffic Distribution (2 cols) */}
        <div className="lg:col-span-2 bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-400" />
                Hourly Facility Traffic Distribution
              </h3>
              <p className="text-xs text-zinc-400">
                Turnstile swipe frequency across 24-hour training windows.
              </p>
            </div>
            <span className="text-xs font-mono text-lime-400 bg-lime-500/10 px-2 py-1 rounded border border-lime-500/20">
              Peak: 82 Check-ins / Hr
            </span>
          </div>

          <div className="h-64 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyAttendanceDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222533" vertical={false} />
                  <XAxis dataKey="label" stroke="#71717a" fontSize={10} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d0e12",
                      border: "1px solid #222533",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`${val} athletes`, "Attendance"]}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {hourlyAttendanceDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.count >= 70 ? "#CCFF00" : entry.count >= 40 ? "#A6D400" : "#3B82F6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>
      </div>

      {/* Attendance Log Table */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-dark-700/80 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search check-in logs..."
              className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-9 pr-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-lime-500 text-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-dark-950 border border-dark-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-lime-500"
            >
              <option value="all">All Verification Statuses</option>
              <option value="Valid">Valid Approved</option>
              <option value="Expired Warning">Expired Warning</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Athlete</th>
                <th className="py-3 px-4 font-semibold">Membership Plan</th>
                <th className="py-3 px-4 font-semibold">Check-in Timestamp</th>
                <th className="py-3 px-4 font-semibold">Sensor / Method</th>
                <th className="py-3 px-4 font-semibold">Gate Status</th>
                <th className="py-3 px-4 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No check-in logs found matching search.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-dark-850/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={rec.memberAvatar}
                          alt={rec.memberName}
                          className="w-8 h-8 rounded-lg object-cover border border-dark-700"
                        />
                        <span className="font-bold text-white">{rec.memberName}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-zinc-300 font-medium">
                      {rec.memberPlan}
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-zinc-300">
                      {new Date(rec.checkInTime).toLocaleDateString()} at{" "}
                      {new Date(rec.checkInTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-dark-950 text-zinc-300 border border-dark-700 font-mono text-[10px]">
                        <QrCode className="w-3 h-3 text-lime-400" />
                        {rec.method}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={rec.status === "Valid" ? "lime" : "danger"}
                        size="sm"
                        dot
                      >
                        {rec.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-zinc-400 text-[11px] italic">
                      {rec.notes || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      <MemberQRModal
        isOpen={Boolean(selectedMemberForQR)}
        onClose={() => setSelectedMemberForQR(null)}
        member={selectedMemberForQR}
      />
    </div>
  );
}
