"use client";

import Link from "next/link";
import { Mail, Phone, Building2 } from "lucide-react";

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  tags: string;
}

interface ClientCardProps {
  client: Client;
}

const TAG_COLORS = [
  "bg-flowo-violet/20 text-flowo-violet-light border-flowo-violet/30",
  "bg-flowo-cyan/20 text-flowo-cyan border-flowo-cyan/30",
  "bg-flowo-pink/20 text-flowo-pink border-flowo-pink/30",
  "bg-amber-500/20 text-amber-400 border-amber-500/30",
  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
];

function getTagColor(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) % TAG_COLORS.length;
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

export default function ClientCard({ client }: ClientCardProps) {
  let tags: string[] = [];
  try {
    tags = JSON.parse(client.tags) as string[];
  } catch {
    tags = [];
  }

  return (
    <Link href={`/clients/${client.id}`}>
      <div className="glass-card p-4 hover:border-flowo-violet/30 hover:bg-white/8 transition-all duration-150 cursor-pointer group">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white group-hover:text-flowo-violet-light transition-colors truncate">
              {client.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-slate-400 text-sm">
              <Building2 size={12} className="shrink-0" />
              <span className="truncate">{client.company}</span>
            </div>
          </div>
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-flowo-violet to-flowo-cyan flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-white">
              {client.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Mail size={11} className="shrink-0" />
            <span className="truncate">{client.email}</span>
          </div>
          {client.phone && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Phone size={11} className="shrink-0" />
              <span>{client.phone}</span>
            </div>
          )}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${getTagColor(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
