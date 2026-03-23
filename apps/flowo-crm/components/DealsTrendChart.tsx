"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DealsTrendPoint {
  month: string;
  deals: number;
}

interface DealsTrendChartProps {
  data: DealsTrendPoint[];
}

export default function DealsTrendChart({ data }: DealsTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
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
        />
        <Tooltip
          contentStyle={{
            background: "#13131f",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
          }}
          labelStyle={{ color: "#cbd5e1" }}
        />
        <Line
          type="monotone"
          dataKey="deals"
          stroke="#f472b6"
          strokeWidth={3}
          dot={{ fill: "#f472b6", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
