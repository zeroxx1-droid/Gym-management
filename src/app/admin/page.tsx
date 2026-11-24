"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useGym } from "@/context/GymContext";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SimulationNotice } from "@/components/dashboard/SimulationNotice";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MemberQRModal } from "@/components/dashboard/MemberQRModal";
import { Member } from "@/types";
import { formatDate, formatCurrency } from "@/lib/utils";
import { monthlyRevenueData, membershipDistributionData } from "@/data/mockPayments";
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  DollarSign,
  TrendingUp,
  CreditCard,
  QrCode,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminOverviewPage() {
  const { stats, members, attendance, payments } = useGym();
  const [selectedMemberForQR, setSelectedMemberForQR] = useState<Member | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Recent 5 members
  const recentMembers = members.slice(0, 5);

  // Recent 5 attendance check-ins
  const recentAttendance = attendance.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Simulation Notice Banner */}
      <SimulationNotice />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Real-time biometric turnstile monitoring, revenue intelligence, and membership metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/attendance">
            <Button
              size="sm"
              variant="lime"
              leftIcon={<QrCode className="w-3.5 h-3.5 text-black" />}
            >
              Scan Member QR
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <MetricCard
          title="Total Members"
          value={stats.totalMembers}
          subtitle="Registered athletes"
          change="+18% YoY"
          isPositive={true}
          icon={Users}
          variant="default"
        />

        <MetricCard
          title="Active Pass"
          value={stats.activeMembers}
          subtitle="In good standing"
          change="92% active rate"
          isPositive={true}
          icon={UserCheck}
          variant="lime"
        />

        <MetricCard
          title="Expired"
          value={stats.expiredMembers}
          subtitle="Renewal pending"
          change="Alerts queued"
          isPositive={false}
          icon={UserX}
          variant="danger"
        />

        <MetricCard
          title="Today's Check-ins"
          value={stats.todayAttendance}
          subtitle="Live turnstiles"
          change="Peak: 6-7 PM"
          isPositive={true}
          icon={Clock}
          variant="lime"
        />

        <MetricCard
          title="Pending Due"
          value={formatCurrency(stats.pendingPaymentsTotal)}
          subtitle={`${stats.pendingPaymentsCount} unpaid invoices`}
          change="Requires action"
          isPositive={false}
          icon={CreditCard}
          variant="warning"
        />

        <MetricCard
          title="Nov Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          subtitle="Target: $17.5k"
          change="+14.2% MoM"
          isPositive={true}
          icon={DollarSign}
          variant="lime"
        />
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Revenue Trend (2 cols) */}
        <div className="lg:col-span-2 bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-lime-400" />
                Monthly Revenue Performance (2026)
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Financial trajectory tracking actual revenue versus budgeted targets.
              </p>
            </div>
            <Link
              href="/admin/reports"
              className="text-xs text-lime-400 hover:text-lime-300 font-medium flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-64 sm:h-72 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#CCFF00" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222533" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={11} tickLine={false} />
                  <YAxis
                    stroke="#71717a"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `$${val / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d0e12",
                      border: "1px solid #222533",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#CCFF00"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGlow)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-zinc-500">
                Loading analytics visualization...
              </div>
            )}
          </div>
        </div>

        {/* Membership Distribution Donut Chart (1 col) */}
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
              Active Plan Distribution
            </h3>
            <p className="text-xs text-zinc-400">
              Breakdown across Standard, Pro, and VIP Black tiers.
            </p>
          </div>

          <div className="h-56 w-full my-auto">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {membershipDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d0e12",
                      border: "1px solid #222533",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-dark-800 text-xs">
            {membershipDistributionData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-zinc-300">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px]">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white text-[11px]">{item.count} members</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feeds: Recent Members & Recent Check-ins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registrations */}
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-lime-400" />
                Recent Member Registrations
              </h3>
              <p className="text-xs text-zinc-400">Newly onboarded athletes and status</p>
            </div>
            <Link
              href="/admin/members"
              className="text-xs text-lime-400 hover:text-lime-300 font-medium flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-dark-800">
            {recentMembers.map((member) => (
              <div
                key={member.id}
                className="py-3 flex items-center justify-between gap-3 group hover:bg-dark-850/50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={member.avatarUrl}
                    alt={member.fullName}
                    className="w-10 h-10 rounded-lg object-cover border border-dark-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white group-hover:text-lime-400 transition-colors truncate">
                      {member.fullName}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {member.planName} • ID: {member.qrCodeDisplay}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
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

                  <button
                    onClick={() => setSelectedMemberForQR(member)}
                    className="p-1.5 text-zinc-400 hover:text-lime-400 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                    title="View QR Turnstile Pass"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Attendance Activity */}
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-lime-400" />
                Live Attendance Turnstile Feed
              </h3>
              <p className="text-xs text-zinc-400">Optical sensor and manual check-ins</p>
            </div>
            <Link
              href="/admin/attendance"
              className="text-xs text-lime-400 hover:text-lime-300 font-medium flex items-center gap-1"
            >
              <span>Scan Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-dark-800">
            {recentAttendance.map((record) => (
              <div
                key={record.id}
                className="py-3 flex items-center justify-between gap-3 group hover:bg-dark-850/50 -mx-2 px-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center shrink-0">
                    <QrCode className="w-4 h-4 text-lime-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {record.memberName}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {record.memberPlan} • Via {record.method}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <Badge
                    variant={record.status === "Valid" ? "lime" : "warning"}
                    size="sm"
                  >
                    {record.status}
                  </Badge>
                  <p className="text-[10px] text-zinc-500 font-mono mt-1">
                    {new Date(record.checkInTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member QR Modal */}
      <MemberQRModal
        isOpen={Boolean(selectedMemberForQR)}
        onClose={() => setSelectedMemberForQR(null)}
        member={selectedMemberForQR}
      />
    </div>
  );
}
