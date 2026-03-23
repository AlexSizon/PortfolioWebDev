"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Filter } from "lucide-react";
import TaskRow from "@/components/TaskRow";
import AddTaskModal from "@/components/AddTaskModal";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: string;
  dueDate?: string | null;
  client?: { id: string; name: string; company: string } | null;
}

interface Client {
  id: string;
  name: string;
  company: string;
}

const PRIORITIES = ["", "High", "Medium", "Low"];

export default function TasksPage() {
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [extraTasks, setExtraTasks] = useState<Task[]>([]);

  const { data: tasks = [], isLoading, refetch } = useQuery<Task[]>({
    queryKey: ["tasks", priorityFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (priorityFilter) params.set("priority", priorityFilter);
      params.set("sort", "dueDate");
      const res = await fetch(`/api/tasks?${params.toString()}`);
      return res.json();
    },
  });

  const { data: clients = [] } = useQuery<Client[]>({
    queryKey: ["clients-for-tasks"],
    queryFn: async () => {
      const res = await fetch("/api/clients");
      return res.json();
    },
  });

  const allTasks = [
    ...extraTasks.filter((e) => !tasks.find((t) => t.id === e.id)),
    ...tasks,
  ];

  async function handleToggleTask(id: string, done: boolean) {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done }),
    });

    if (!res.ok) {
      toast.error("Failed to update task");
      return;
    }

    refetch();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {isLoading ? "Loading..." : `${tasks.length} task${tasks.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-flowo-violet hover:bg-flowo-violet-light transition-colors cursor-pointer"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="relative w-full sm:w-[180px]">
          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-flowo-void-2 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 transition appearance-none cursor-pointer"
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority || "All Priorities"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card h-20 animate-pulse" />
          ))
        ) : allTasks.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <p className="text-slate-400">No tasks found</p>
          </div>
        ) : (
          allTasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={handleToggleTask} />
          ))
        )}
      </div>

      {showAddModal && (
        <AddTaskModal
          clients={clients}
          onClose={() => setShowAddModal(false)}
          onCreated={(t) => setExtraTasks((prev) => [t as Task, ...prev])}
        />
      )}
    </div>
  );
}
