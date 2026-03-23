"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useKanbanStore, type Deal, type Stage } from "@/lib/store";

interface Client {
  id: string;
  name: string;
  company: string;
}

interface AddDealModalProps {
  clients: Client[];
  onClose: () => void;
}

const PRIORITIES = ["High", "Medium", "Low"] as const;
const STAGES = ["Leads", "Qualified", "Proposal", "Negotiation", "Won", "Lost"] as const;

export default function AddDealModal({ clients, onClose }: AddDealModalProps) {
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState(clients[0]?.id ?? "");
  const [value, setValue] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [stage] = useState<Stage>("Leads");
  const [loading, setLoading] = useState(false);
  const addDeal = useKanbanStore((s) => s.addDeal);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !clientId || !value) return;
    setLoading(true);

    const res = await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, clientId, value: parseFloat(value), priority, stage }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to create deal");
      return;
    }

    const deal = await res.json();
    const client = clients.find((c) => c.id === clientId);
    addDeal({
      ...deal,
      clientName: client?.name ?? "Unknown",
      createdAt: deal.createdAt,
    } as Deal);
    toast.success(`Deal "${title}" created`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <h2 className="text-lg font-semibold text-white mb-5">Add New Deal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Deal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition"
              placeholder="e.g. Website Redesign"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Client
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-flowo-void-2 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Value ($)
            </label>
            <input
              type="number"
              min="0"
              step="100"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition"
              placeholder="10000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Priority
            </label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    priority === p
                      ? "bg-flowo-violet text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-slate-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-flowo-violet hover:bg-flowo-violet-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Creating..." : "Create Deal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
