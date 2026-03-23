"use client";

import { useState, useEffect, useDeferredValue } from "react";
import { useQuery } from "@tanstack/react-query";
import ClientCard from "@/components/ClientCard";
import AddClientModal from "@/components/AddClientModal";
import { Search, Plus, Filter } from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  tags: string;
}

const TAGS_POOL = [
  "VIP",
  "Agency",
  "E-commerce",
  "Startup",
  "Enterprise",
  "Referral",
  "Recurring",
  "Design",
  "Development",
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [extraClients, setExtraClients] = useState<Client[]>([]);
  const deferredSearch = useDeferredValue(search);

  const { data: clients = [], isLoading } = useQuery<Client[]>({
    queryKey: ["clients", deferredSearch, tagFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (deferredSearch) params.set("search", deferredSearch);
      if (tagFilter) params.set("tag", tagFilter);
      const res = await fetch(`/api/clients?${params.toString()}`);
      return res.json();
    },
  });

  // Merge newly created clients that might not have refreshed yet
  const allClients = [...extraClients.filter((e) => !clients.find((c) => c.id === e.id)), ...clients];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {isLoading ? "Loading..." : `${clients.length} client${clients.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-flowo-violet hover:bg-flowo-violet-light transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company, email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition text-sm"
          />
        </div>

        <div className="relative">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="pl-9 pr-4 py-2.5 rounded-xl bg-flowo-void-2 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition appearance-none cursor-pointer min-w-[160px]"
          >
            <option value="">All Tags</option>
            {TAGS_POOL.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Client grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card h-36 animate-pulse" />
          ))}
        </div>
      ) : allClients.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-slate-400">
            {search || tagFilter
              ? "No clients match your filters"
              : "No clients yet — add your first one!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddClientModal
          onClose={() => setShowAddModal(false)}
          onCreated={(c) => setExtraClients((prev) => [c as Client, ...prev])}
        />
      )}
    </div>
  );
}
