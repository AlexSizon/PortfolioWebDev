"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  company: string;
}

interface AddTaskModalProps {
  clients: Client[];
  onClose: () => void;
  onCreated: (task: unknown) => void;
}

const PRIORITIES = ["High", "Medium", "Low"] as const;

export default function AddTaskModal({
  clients,
  onClose,
  onCreated,
}: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setLoading(true);

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority, dueDate, clientId: clientId || null }),
    });

    setLoading(false);

    if (!res.ok) {
      toast.error("Failed to create task");
      return;
    }

    const task = await res.json();
    toast.success(`Task "${title}" created`);
    onCreated(task);
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

        <h2 className="text-lg font-semibold text-white mb-5">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition"
              placeholder="e.g. Follow up on proposal"
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-flowo-void-2 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Linked Client
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-flowo-void-2 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition"
            >
              <option value="">None</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.company}
                </option>
              ))}
            </select>
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
              {loading ? "Creating..." : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
