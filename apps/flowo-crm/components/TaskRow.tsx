"use client";

import { formatDate, cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: string;
  dueDate?: string | null;
  client?: { name: string } | null;
}

interface TaskRowProps {
  task: Task;
  onToggle: (id: string, done: boolean) => void;
}

const PRIORITY_STYLES: Record<string, string> = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function TaskRow({ task, onToggle }: TaskRowProps) {
  return (
    <div className="glass-card p-4 flex items-center gap-3 hover:border-flowo-violet/20 transition-all">
      <button
        onClick={() => onToggle(task.id, !task.done)}
        className={cn(
          "w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-all cursor-pointer",
          task.done
            ? "bg-emerald-500 border-emerald-500"
            : "border-white/20 hover:border-flowo-violet"
        )}
      >
        {task.done && <span className="text-white text-xs">✓</span>}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium",
            task.done ? "line-through text-slate-500" : "text-white"
          )}
        >
          {task.title}
        </p>
        {task.client?.name && (
          <p className="text-xs text-slate-500 mt-0.5">{task.client.name}</p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span
          className={cn(
            "text-[10px] font-medium px-1.5 py-0.5 rounded-full border",
            PRIORITY_STYLES[task.priority] ?? PRIORITY_STYLES.Medium
          )}
        >
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="text-xs text-slate-500 min-w-[72px] text-right">
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
}
