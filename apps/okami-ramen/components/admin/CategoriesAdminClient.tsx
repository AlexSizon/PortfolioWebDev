"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CategoryRow = {
  id: string;
  name: string;
  order: number;
  itemCount: number;
};

export function CategoriesAdminClient({ initialCategories }: { initialCategories: CategoryRow[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [newName, setNewName] = useState("");
  const [newOrder, setNewOrder] = useState(String(initialCategories.length + 1));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function addCategory() {
    setError(null);
    startTransition(async () => {
      const response = await fetch("/api/menu/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), order: Number(newOrder) }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Unable to create category.");
        return;
      }

      const category = (await response.json()) as CategoryRow;
      setCategories((current) => [...current, category].sort((a, b) => a.order - b.order));
      setNewName("");
      setNewOrder(String(categories.length + 2));
    });
  }

  async function saveRename(categoryId: string) {
    setError(null);
    const response = await fetch(`/api/menu/categories/${categoryId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName.trim() }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Unable to rename category.");
      return;
    }

    const updated = (await response.json()) as CategoryRow;
    setCategories((current) => current.map((category) => (category.id === updated.id ? updated : category)));
    setEditingId(null);
    setEditingName("");
  }

  async function deleteCategory(categoryId: string) {
    setError(null);
    const response = await fetch(`/api/menu/categories/${categoryId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Unable to delete category.");
      return;
    }

    setCategories((current) => current.filter((category) => category.id !== categoryId));
  }

  return (
    <section className="rounded-2xl border border-[#3d2218] bg-[#1a0a00] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-[#ff4b00]">Categories</p>
        <h2 className="mt-2 text-2xl font-semibold text-[#f5e6d3]">Category management</h2>
        <p className="mt-1 text-sm text-[#f5e6d3]/55">Add, rename, or remove menu sections for the public menu.</p>
      </div>

      <div className="mb-6 grid gap-4 rounded-xl border border-[#3d2218] bg-[#0d0500] p-4 md:grid-cols-[1fr_140px_auto] md:items-end">
        <div className="grid gap-2">
          <Label htmlFor="new-category-name">New category name</Label>
          <Input id="new-category-name" value={newName} onChange={(event) => setNewName(event.target.value)} placeholder="Seasonal Specials" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="new-category-order">Display order</Label>
          <Input id="new-category-order" type="number" value={newOrder} onChange={(event) => setNewOrder(event.target.value)} />
        </div>
        <Button onClick={() => void addCategory()} disabled={isPending}>Add category</Button>
      </div>

      {error ? <div className="mb-4 rounded-lg border border-red-800/50 bg-red-950/30 px-3 py-2 text-sm text-red-200">{error}</div> : null}

      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col gap-3 rounded-xl border border-[#3d2218] bg-[#0d0500] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              {editingId === category.id ? (
                <div className="flex gap-2">
                  <Input value={editingName} onChange={(event) => setEditingName(event.target.value)} />
                  <Button size="sm" onClick={() => void saveRename(category.id)}>Save</Button>
                </div>
              ) : (
                <>
                  <p className="font-medium text-[#f5e6d3]">{category.name}</p>
                  <p className="mt-1 text-xs text-[#f5e6d3]/55">Order {category.order} · {category.itemCount} items</p>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingId(category.id);
                  setEditingName(category.name);
                }}
              >
                <Pencil className="h-4 w-4" />
                Rename
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={category.itemCount > 0}>
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete {category.name}?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Empty categories can be removed immediately. Categories with dishes must be cleared first.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => void deleteCategory(category.id)}>Delete category</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
