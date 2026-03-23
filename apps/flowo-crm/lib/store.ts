"use client";

import { create } from "zustand";

export type Priority = "High" | "Medium" | "Low";
export type Stage =
  | "Leads"
  | "Qualified"
  | "Proposal"
  | "Negotiation"
  | "Won"
  | "Lost";

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: Stage;
  priority: Priority;
  clientId: string;
  clientName?: string;
  createdAt: string;
}

interface KanbanStore {
  deals: Deal[];
  setDeals: (deals: Deal[]) => void;
  moveDeal: (dealId: string, newStage: Stage) => void;
  addDeal: (deal: Deal) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  deals: [],
  setDeals: (deals) => set({ deals }),
  moveDeal: (dealId, newStage) =>
    set((state) => ({
      deals: state.deals.map((d) =>
        d.id === dealId ? { ...d, stage: newStage } : d
      ),
    })),
  addDeal: (deal) => set((state) => ({ deals: [deal, ...state.deals] })),
}));
