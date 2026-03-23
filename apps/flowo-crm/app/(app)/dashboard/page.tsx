"use client";

import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Users, Kanban, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const RevenueChart = dynamic(() => import("@/components/RevenueChart"), {
  ssr: false,
  loading: () => <div className="h-[280px] glass-card animate-pulse" />,
});

const DealsTrendChart = dynamic(() => import("@/components/DealsTrendChart"), {
  ssr: false,
  loading: () => <div className="h-[280px] glass-card animate-pulse" />,
});

interface Client {
  id: string;
}

interface Deal {
  id: string;
  stage: string;
  value: number;
  createdAt: string;
}

interface RevenuePoint {
  month: string;
  revenue: number;
}

interface TrendPoint {
  month: string;
  deals: number;
}

function KpiCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
}) {
  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: accent }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Icon size={18} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["dashboard-clients"],
    queryFn: async () => {
      const res = await fetch("/api/clients");
      return res.json();
    },
  });

  const { data: deals = [] } = useQuery<Deal[]>({
    queryKey: ["dashboard-deals"],
    queryFn: async () => {
      const res = await fetch("/api/deals");
      return res.json();
    },
  });

  const { data: revenueData = [] } = useQuery<RevenuePoint[]>({
    queryKey: ["revenue-chart"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/revenue");
      return res.json();
    },
  });

  const { data: dealsTrend = [] } = useQuery<TrendPoint[]>({
    queryKey: ["deals-trend"],
    queryFn: async () => {
      const res = await fetch("/api/analytics/deals-trend");
      return res.json();
    },
  });

  const activeDeals = deals.filter(
    (d) => d.stage !== "Won" && d.stage !== "Lost"
  ).length;

  const currentMonth = new Date().toLocaleString("en-US", { month: "short" });
  const revenueThisMonth = revenueData.find((r) => r.month === currentMonth)?.revenue ?? 0;

  const wonDeals = deals.filter((d) => d.stage === "Won").length;
  const lostDeals = deals.filter((d) => d.stage === "Lost").length;
  const conversionRate = wonDeals + lostDeals > 0
    ? Math.round((wonDeals / (wonDeals + lostDeals)) * 100)
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-400 mt-0.5">
          Overview of your pipeline, clients, and revenue
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard
          label="Total Clients"
          value={String(clients.length)}
          icon={Users}
          accent="linear-gradient(90deg, #7c3aed, #06b6d4)"
        />
        <KpiCard
          label="Active Deals"
          value={String(activeDeals)}
          icon={Kanban}
          accent="linear-gradient(90deg, #06b6d4, #f472b6)"
        />
        <KpiCard
          label="Revenue This Month"
          value={formatCurrency(revenueThisMonth)}
          icon={DollarSign}
          accent="linear-gradient(90deg, #10b981, #06b6d4)"
        />
        <KpiCard
          label="Conversion Rate"
          value={`${conversionRate}%`}
          icon={TrendingUp}
          accent="linear-gradient(90deg, #f472b6, #7c3aed)"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Revenue</h2>
            <p className="text-sm text-slate-400">Won deals over the last 3 months</p>
          </div>
          <RevenueChart data={revenueData} />
        </div>

        <div className="glass-card p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Deal Trend</h2>
            <p className="text-sm text-slate-400">New deals created over the last 3 months</p>
          </div>
          <DealsTrendChart data={dealsTrend} />
        </div>
      </div>
    </div>
  );
}
