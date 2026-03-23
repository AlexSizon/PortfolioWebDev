"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useKanbanStore, type Deal, type Stage } from "@/lib/store";
import KanbanColumn from "@/components/KanbanColumn";
import DealCard from "@/components/DealCard";
import AddDealModal from "@/components/AddDealModal";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const STAGES: Stage[] = [
  "Leads",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
  "Lost",
];

interface Client {
  id: string;
  name: string;
  company: string;
}

export default function PipelinePage() {
  const { deals, setDeals, moveDeal } = useKanbanStore();
  const [clients, setClients] = useState<Client[]>([]);
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    async function loadData() {
      const [dealsRes, clientsRes] = await Promise.all([
        fetch("/api/deals"),
        fetch("/api/clients"),
      ]);
      const [dealsData, clientsData] = await Promise.all([
        dealsRes.json(),
        clientsRes.json(),
      ]);

      const dealsWithClientName = dealsData.map((d: Deal & { client?: Client }) => ({
        ...d,
        clientName: d.client?.name ?? "Unknown",
      }));
      setDeals(dealsWithClientName);
      setClients(clientsData);
      setLoading(false);
    }
    loadData();
  }, [setDeals]);

  function handleDragStart(event: DragStartEvent) {
    const deal = deals.find((d) => d.id === event.active.id);
    setActiveDeal(deal ?? null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDeal(null);

    if (!over) return;

    const dealId = active.id as string;
    const newStage = over.id as Stage;

    const deal = deals.find((d) => d.id === dealId);
    if (!deal || deal.stage === newStage || !STAGES.includes(newStage)) return;

    // Optimistic update
    moveDeal(dealId, newStage);

    // Persist to API
    const res = await fetch(`/api/deals/${dealId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage: newStage }),
    });

    if (!res.ok) {
      // Revert on failure
      moveDeal(dealId, deal.stage);
      toast.error("Failed to update deal stage");
    }
  }

  const dealsByStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = deals.filter((d) => d.stage === stage);
      return acc;
    },
    {} as Record<Stage, Deal[]>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Pipeline</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {deals.length} deals · drag to move between stages
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-flowo-violet hover:bg-flowo-violet-light transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Deal
        </button>
      </div>

      {loading ? (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {STAGES.map((s) => (
            <div
              key={s}
              className="min-w-[240px] w-[240px] h-64 glass-card animate-pulse"
            />
          ))}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-3 overflow-x-auto pb-4">
            {STAGES.map((stage) => (
              <KanbanColumn
                key={stage}
                stage={stage}
                deals={dealsByStage[stage]}
              />
            ))}
          </div>

          <DragOverlay>
            {activeDeal && (
              <DealCard
                id={activeDeal.id}
                title={activeDeal.title}
                clientName={activeDeal.clientName ?? "Unknown"}
                value={activeDeal.value}
                priority={activeDeal.priority}
                isDragging
              />
            )}
          </DragOverlay>
        </DndContext>
      )}

      {showAddModal && (
        <AddDealModal
          clients={clients}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
