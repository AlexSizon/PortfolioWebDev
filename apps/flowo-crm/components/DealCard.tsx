"use client";

import { cn, formatCurrency } from "@/lib/utils";
import { GripVertical } from "lucide-react";

type Priority = "High" | "Medium" | "Low";

interface DealCardProps {
  id: string;
  title: string;
  clientName: string;
  value: number;
  priority: Priority;
  isDragging?: boolean;
}

const PRIORITY_STYLES: Record<Priority, string> = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function DealCard({
  title,
  clientName,
  value,
  priority,
  isDragging,
}: DealCardProps) {
  return (
    <div
      className={cn(
        "glass-card p-3.5 cursor-grab active:cursor-grabbing select-none transition-all duration-150",
        isDragging && "opacity-60 scale-105 shadow-2xl shadow-flowo-violet/20"
      )}
    >
      <div className="flex items-start gap-2">
        <GripVertical
          size={14}
          className="text-slate-600 mt-0.5 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-100 truncate leading-snug">
            {title}
          </p>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{clientName}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-semibold text-white">
              {formatCurrency(value)}
            </span>
            <span
              className={cn(
                "text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
                PRIORITY_STYLES[priority]
              )}
            >
              {priority}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
