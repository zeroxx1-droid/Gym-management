"use client";

import React, { useState, useEffect } from "react";
import { useGym } from "@/context/GymContext";
import { formatCurrency } from "@/lib/utils";
import { monthlyRevenueData, membershipDistributionData } from "@/data/mockPayments";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BarChart3,
  Calendar,
  Download,
  Printer,
  TrendingUp,
  DollarSign,
  CreditCard,
  Layers,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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

export default function ReportsPage() {
  const { stats, payments, plans } = useGym();
  const [timeRange, setTimeRange] = useState<string>("ytd");
  const [isExporting, setIsExporting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const paymentMethodData = [
    { name: "Credit Card (POS)", value: 72, color: "#CCFF00" },
    { name: "Debit Card", value: 16, color: "#A6D400" },
    { name: "Cash (Counter)", value: 8, color: "#3B82F6" },
    { name: "Bank Wire Transfer", value: 4, color: "#8B5CF6" },
  ];

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      // Simulate file download
      const csvContent = "data:text/csv;charset=utf-8," +
        "Month,Revenue,Target,NewMembers\n" +
        monthlyRevenueData.map((e) => `${e.month},${e.revenue},${e.target},${e.newMembers}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `BlackSquareGym_Financial_Report_${timeRange}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-lime-400" />
            Revenue Analytics & Financial Reports
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Aggregated earnings, membership sales distributions, and historical turnover data.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Time range picker */}
          <div className="flex items-center bg-dark-900 p-1 rounded-lg border border-dark-700 text-xs">
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                timeRange === "30d"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange("q4")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                timeRange === "q4"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Q4 2026
            </button>
            <button
              onClick={() => setTimeRange("ytd")}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                timeRange === "ytd"
                  ? "bg-lime-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              YTD 2026
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            isLoading={isExporting}
            leftIcon={<Download className="w-3.5 h-3.5 text-lime-400" />}
          >
            Export CSV
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex"
          >
            Print
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>2026 YTD Revenue</span>
            <DollarSign className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {formatCurrency(154200)}
          </p>
          <span className="text-[10px] text-lime-400 font-semibold">+18.4% above budget</span>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Monthly Avg. Turnover</span>
            <TrendingUp className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-white mt-1">
            {formatCurrency(14018)}
          </p>
          <span className="text-[10px] text-zinc-400">Past 11 months average</span>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Outstanding Invoices</span>
            <CreditCard className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 mt-1">
            {formatCurrency(stats.pendingPaymentsTotal)}
          </p>
          <span className="text-[10px] text-zinc-400">{stats.pendingPaymentsCount} pending settlements</span>
        </div>

        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-4">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Renewal Retention Rate</span>
            <Layers className="w-4 h-4 text-lime-400" />
          </div>
          <p className="text-2xl font-extrabold text-lime-400 mt-1">
            88.4%
          </p>
          <span className="text-[10px] text-lime-400 font-semibold">Top 5% industry benchmark</span>
        </div>
      </div>

      {/* Main Revenue Trajectory Chart */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-lime-400" />
              Monthly Revenue Performance vs. Targets (Jan – Nov 2026)
            </h3>
            <p className="text-xs text-zinc-400">
              Verified collections against quarterly business projections.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-3 h-3 rounded-sm bg-lime-500" />
              Actual Revenue
            </span>
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-3 h-0.5 bg-zinc-500" />
              Target Projected
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
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
                  formatter={(val: any, name: any) => [
                    `$${Number(val).toLocaleString()}`,
                    name === "revenue" ? "Actual Revenue" : "Target Projection",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#CCFF00"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueFill)"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#71717a"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Volume Contribution */}
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Membership Volume Breakdown
            </h3>
            <p className="text-xs text-zinc-400">
              Active subscriber split by membership package
            </p>
          </div>

          <div className="h-56 w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={membershipDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222533" vertical={false} />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} />
                  <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0d0e12",
                      border: "1px solid #222533",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`${val} active members`, "Subscribers"]}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {membershipDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-dark-900 border border-dark-700/80 rounded-xl p-5 shadow-card flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Payment Method Distribution
            </h3>
            <p className="text-xs text-zinc-400">
              Transaction share by tender type
            </p>
          </div>

          <div className="h-52 w-full my-auto">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {paymentMethodData.map((entry, index) => (
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
                    formatter={(val: any) => [`${val}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-dark-800 text-xs">
            {paymentMethodData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] truncate">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-white text-[11px]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Financial Ledger Table */}
      <div className="bg-dark-900 border border-dark-700/80 rounded-xl overflow-hidden shadow-card">
        <div className="p-4 border-b border-dark-700/80 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              2026 Monthly Fiscal Ledger
            </h3>
            <p className="text-xs text-zinc-400">
              Aggregated monthly turnover, target attainment, and member growth.
            </p>
          </div>
          <Badge variant="lime" size="sm">
            Audited Ledger
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-dark-950/80 text-zinc-400 uppercase tracking-wider text-[11px] border-b border-dark-700/80">
              <tr>
                <th className="py-3 px-4 font-semibold">Month</th>
                <th className="py-3 px-4 font-semibold">New Athletes</th>
                <th className="py-3 px-4 font-semibold">Monthly Target</th>
                <th className="py-3 px-4 font-semibold">Gross Revenue</th>
                <th className="py-3 px-4 font-semibold">Variance</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {monthlyRevenueData.map((row) => {
                const diff = row.revenue - row.target;
                const isOver = diff >= 0;
                return (
                  <tr key={row.month} className="hover:bg-dark-850/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">
                      {row.month} 2026
                    </td>

                    <td className="py-3 px-4 text-zinc-300 font-mono">
                      +{row.newMembers} athletes
                    </td>

                    <td className="py-3 px-4 text-zinc-400 font-mono">
                      {formatCurrency(row.target)}
                    </td>

                    <td className="py-3 px-4 font-mono font-extrabold text-lime-400 text-sm">
                      {formatCurrency(row.revenue)}
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <span className={isOver ? "text-lime-400 font-bold" : "text-rose-400 font-bold"}>
                        {isOver ? `+${formatCurrency(diff)}` : formatCurrency(diff)}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <Badge variant={isOver ? "lime" : "warning"} size="sm">
                        {isOver ? "Target Met" : "Under Target"}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
