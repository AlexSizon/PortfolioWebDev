"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface RevenueDataPoint {
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="month"
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
          fontSize={12}
        />
        <YAxis
          stroke="#64748b"
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickFormatter={(v) => `$${Math.round(v / 1000)}k`}
        />
        <Tooltip
          cursor={{ fill: "rgba(124,58,237,0.1)" }}
          contentStyle={{
            background: "#13131f",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
          }}
          labelStyle={{ color: "#cbd5e1" }}
          formatter={(value: number) => [formatCurrency(value), "Revenue"]}
        />
        <Bar
          dataKey="revenue"
          fill="url(#flowoRevenueGradient)"
          radius={[8, 8, 0, 0]}
        />
        <defs>
          <linearGradient id="flowoRevenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity={1} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
}
