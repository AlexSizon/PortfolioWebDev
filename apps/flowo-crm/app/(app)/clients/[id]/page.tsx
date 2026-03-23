"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Mail,
  Phone,
  Building2,
  Trash2,
  ArrowLeft,
  Calendar,
  DollarSign,
  CheckSquare,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { formatCurrency, formatDate, cn } from "@/lib/utils";

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  priority: string;
  createdAt: string;
}

interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: string;
  dueDate?: string | null;
}

interface ActivityEntry {
  id: string;
  type: string;
  description: string;
  createdAt: string;
}

interface ClientDetail {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  tags: string;
  notes?: string | null;
  createdAt: string;
  deals: Deal[];
  tasks: Task[];
  activities: ActivityEntry[];
}

const STAGE_COLORS: Record<string, string> = {
  Leads: "text-slate-400",
  Qualified: "text-blue-400",
  Proposal: "text-flowo-cyan",
  Negotiation: "text-amber-400",
  Won: "text-emerald-400",
  Lost: "text-red-400",
};

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: clientId } = use(params);
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const { data: client, isLoading } = useQuery<ClientDetail>({
    queryKey: ["client", clientId],
    queryFn: async () => {
      const res = await fetch(`/api/clients/${clientId}`);
      if (!res.ok) throw new Error("Client not found");
      return res.json();
    },
    enabled: !!clientId,
  });

  async function handleDelete() {
    if (!confirm("Delete this client? This cannot be undone.")) return;
    setDeleting(true);

    const res = await fetch(`/api/clients/${clientId}`, { method: "DELETE" });

    if (res.status === 403) {
      const data = await res.json();
      toast.error(data.message ?? "Action not available in demo mode");
      setDeleting(false);
      return;
    }

    if (!res.ok) {
      toast.error("Failed to delete client");
      setDeleting(false);
      return;
    }

    toast.success("Client deleted");
    router.push("/clients");
  }

  if (isLoading || !client) {
    return (
      <div>
        <div className="h-8 w-48 glass-card animate-pulse mb-6 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card h-64 animate-pulse" />
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card h-48 animate-pulse" />
            <div className="glass-card h-48 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  let tags: string[] = [];
  try {
    tags = JSON.parse(client.tags) as string[];
  } catch {
    tags = [];
  }

  return (
    <div>
      {/* Back nav */}
      <Link
        href="/clients"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft size={15} />
        Back to Clients
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-flowo-violet to-flowo-cyan flex items-center justify-center shrink-0">
            <span className="text-xl font-bold text-white">
              {client.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{client.name}</h1>
            <p className="text-slate-400">{client.company}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Contact info */}
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Contact
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-flowo-violet shrink-0" />
                <a
                  href={`mailto:${client.email}`}
                  className="text-sm text-slate-200 hover:text-white truncate"
                >
                  {client.email}
                </a>
              </div>
              {client.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="text-flowo-cyan shrink-0" />
                  <span className="text-sm text-slate-200">{client.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Building2 size={14} className="text-flowo-pink shrink-0" />
                <span className="text-sm text-slate-200">{client.company}</span>
              </div>
            </div>

            {tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-0.5 rounded-full bg-flowo-violet/20 text-flowo-violet-light border border-flowo-violet/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {client.notes && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500 mb-1">Notes</p>
                <p className="text-sm text-slate-300">{client.notes}</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/5">
              <p className="text-xs text-slate-500">
                Added {formatDate(client.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Deals, tasks, activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Deals */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
              <DollarSign size={14} className="text-flowo-cyan" />
              Deals ({client.deals.length})
            </h2>
            {client.deals.length === 0 ? (
              <p className="text-sm text-slate-500">No deals yet</p>
            ) : (
              <div className="space-y-2">
                {client.deals.map((deal) => (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/3 hover:bg-white/5 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{deal.title}</p>
                      <p className={cn("text-xs mt-0.5", STAGE_COLORS[deal.stage] ?? "text-slate-400")}>
                        {deal.stage}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {formatCurrency(deal.value)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tasks */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
              <CheckSquare size={14} className="text-flowo-violet-light" />
              Tasks ({client.tasks.length})
            </h2>
            {client.tasks.length === 0 ? (
              <p className="text-sm text-slate-500">No tasks yet</p>
            ) : (
              <div className="space-y-2">
                {client.tasks.slice(0, 8).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/3"
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded border-2 shrink-0",
                        task.done
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-white/20"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm",
                          task.done ? "line-through text-slate-500" : "text-slate-200"
                        )}
                      >
                        {task.title}
                      </p>
                    </div>
                    {task.dueDate && (
                      <span className="text-xs text-slate-500 flex items-center gap-1 shrink-0">
                        <Calendar size={11} />
                        {formatDate(task.dueDate)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity */}
          <div className="glass-card p-5">
            <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide flex items-center gap-2">
              <Activity size={14} className="text-flowo-pink" />
              Activity
            </h2>
            {client.activities.length === 0 ? (
              <p className="text-sm text-slate-500">No activity yet</p>
            ) : (
              <div className="space-y-3">
                {client.activities.slice(0, 15).map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-flowo-violet mt-1.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
