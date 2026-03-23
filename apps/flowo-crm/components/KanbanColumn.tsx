"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DealCard from "./DealCard";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Deal } from "@/lib/store";

interface SortableDealCardProps {
  deal: Deal;
}

function SortableDealCard({ deal }: SortableDealCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: deal.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <DealCard
        id={deal.id}
        title={deal.title}
        clientName={deal.clientName ?? "Unknown"}
        value={deal.value}
        priority={deal.priority}
        isDragging={isDragging}
      />
    </div>
  );
}

interface KanbanColumnProps {
  stage: string;
  deals: Deal[];
  accentColor?: string;
}

const STAGE_COLORS: Record<string, string> = {
  Leads: "border-t-slate-400",
  Qualified: "border-t-blue-400",
  Proposal: "border-t-flowo-cyan",
  Negotiation: "border-t-amber-400",
  Won: "border-t-emerald-400",
  Lost: "border-t-red-400",
};

export default function KanbanColumn({ stage, deals }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const totalValue = deals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="flex flex-col min-w-[240px] w-[240px] shrink-0">
      {/* Column header */}
      <div
        className={cn(
          "glass-card p-3 mb-3 border-t-2",
          STAGE_COLORS[stage] ?? "border-t-slate-400"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            {stage}
          </span>
          <span className="text-xs font-medium text-slate-400 bg-white/5 px-1.5 py-0.5 rounded-full">
            {deals.length}
          </span>
        </div>
        <p className="text-sm font-bold text-white mt-1">
          {formatCurrency(totalValue)}
        </p>
      </div>

      {/* Cards container */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 min-h-[200px] space-y-2 rounded-xl p-2 transition-colors",
          isOver ? "bg-flowo-violet/10 ring-1 ring-flowo-violet/30" : "bg-white/2"
        )}
      >
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          {deals.map((deal) => (
            <SortableDealCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>

        {deals.length === 0 && (
          <div className="flex items-center justify-center h-24 text-xs text-slate-600">
            Drop deals here
          </div>
        )}
      </div>
    </div>
  );
}
