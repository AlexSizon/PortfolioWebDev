"use client";

import { useMemo, useState, useTransition } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AdminCategory, AdminMenuItem } from "@/components/admin/types";

type SortField = "name" | "category" | "price" | "available";

type DishFormState = {
  name: string;
  description: string;
  ingredients: string;
  price: string;
  categoryId: string;
  imageUrl: string;
  available: boolean;
};

const emptyForm = (categoryId?: string): DishFormState => ({
  name: "",
  description: "",
  ingredients: "",
  price: "",
  categoryId: categoryId ?? "",
  imageUrl: "",
  available: true,
});

function getFormFromItem(item: AdminMenuItem): DishFormState {
  return {
    name: item.name,
    description: item.description,
    ingredients: item.ingredients,
    price: String(item.price),
    categoryId: item.categoryId,
    imageUrl: item.imageUrl ?? "",
    available: item.available,
  };
}

export function MenuAdminClient({
  initialItems,
  categories,
}: {
  initialItems: AdminMenuItem[];
  categories: AdminCategory[];
}) {
  const [items, setItems] = useState(initialItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMenuItem | null>(null);
  const [formState, setFormState] = useState<DishFormState>(emptyForm(categories[0]?.id));
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isPending, startTransition] = useTransition();

  const sortedItems = useMemo(() => {
    const next = [...items];
    next.sort((left, right) => {
      const factor = sortDirection === "asc" ? 1 : -1;
      switch (sortField) {
        case "price":
          return (left.price - right.price) * factor;
        case "available":
          return (Number(left.available) - Number(right.available)) * factor;
        case "category":
          return left.category.name.localeCompare(right.category.name) * factor;
        case "name":
        default:
          return left.name.localeCompare(right.name) * factor;
      }
    });
    return next;
  }, [items, sortDirection, sortField]);

  function openCreateDialog() {
    setEditingItem(null);
    setFormState(emptyForm(categories[0]?.id));
    setError(null);
    setIsDialogOpen(true);
  }

  function openEditDialog(item: AdminMenuItem) {
    setEditingItem(item);
    setFormState(getFormFromItem(item));
    setError(null);
    setIsDialogOpen(true);
  }

  function updateForm<K extends keyof DishFormState>(key: K, value: DishFormState[K]) {
    setFormState((current) => ({ ...current, [key]: value }));
  }

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  }

  async function handleSave() {
    setError(null);
    const payload = {
      name: formState.name.trim(),
      description: formState.description.trim(),
      ingredients: formState.ingredients.trim(),
      price: Number(formState.price),
      categoryId: formState.categoryId,
      imageUrl: formState.imageUrl.trim() || null,
      available: formState.available,
    };

    if (!payload.name || !payload.description || !payload.categoryId || Number.isNaN(payload.price)) {
      setError("Fill in all fields before saving.");
      return;
    }

    startTransition(async () => {
      const previousItems = items;
      if (editingItem) {
        const nextCategory = categories.find((category) => category.id === payload.categoryId);
        if (nextCategory) {
          setItems((current) =>
            current.map((item) =>
              item.id === editingItem.id
                ? {
                    ...item,
                    ...payload,
                    categoryId: nextCategory.id,
                    category: nextCategory,
                  }
                : item
            )
          );
        }
      }

      const response = await fetch(
        editingItem ? `/api/menu/items/${editingItem.id}` : "/api/menu/items",
        {
          method: editingItem ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        if (editingItem) {
          setItems(previousItems);
        }
        setError(data?.error ?? "Unable to save dish.");
        return;
      }

      const savedItem = (await response.json()) as AdminMenuItem;
      setItems((current) => {
        if (editingItem) {
          return current.map((item) => (item.id === savedItem.id ? savedItem : item));
        }
        return [savedItem, ...current];
      });
      setIsDialogOpen(false);
      setEditingItem(null);
    });
  }

  async function handleToggleAvailability(itemId: string, nextValue: boolean) {
    const previous = items;
    setItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, available: nextValue } : item
      )
    );

    const response = await fetch(`/api/menu/items/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: nextValue }),
    });

    if (!response.ok) {
      setItems(previous);
      setError("Unable to update availability.");
      return;
    }

    const updated = (await response.json()) as AdminMenuItem;
    setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
  }

  async function handleDelete(itemId: string) {
    const previous = items;
    setItems((current) => current.filter((item) => item.id !== itemId));

    const response = await fetch(`/api/menu/items/${itemId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setItems(previous);
      setError("Unable to delete dish.");
    }
  }

  return (
    <section className="rounded-2xl border border-[#3d2218] bg-[#1a0a00] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#ff4b00]">Menu Items</p>
          <h2 className="mt-2 text-2xl font-semibold text-[#f5e6d3]">All dishes</h2>
          <p className="mt-1 text-sm text-[#f5e6d3]/55">Manage pricing, availability, and dish details from one table.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4" />
              Add Dish
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? "Edit Dish" : "Add Dish"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="dish-name">Name</Label>
                <Input id="dish-name" value={formState.name} onChange={(event) => updateForm("name", event.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dish-description">Description</Label>
                <textarea
                  id="dish-description"
                  value={formState.description}
                  onChange={(event) => updateForm("description", event.target.value)}
                  className="min-h-24 rounded-md border border-[#3d2218] bg-[#1a0a00] px-3 py-2 text-sm text-[#f5e6d3] focus:outline-none focus:ring-2 focus:ring-[#ff4b00]/50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dish-ingredients">Ingredients</Label>
                <textarea
                  id="dish-ingredients"
                  value={formState.ingredients}
                  onChange={(event) => updateForm("ingredients", event.target.value)}
                  placeholder="One ingredient per line"
                  className="min-h-24 rounded-md border border-[#3d2218] bg-[#1a0a00] px-3 py-2 text-sm text-[#f5e6d3] focus:outline-none focus:ring-2 focus:ring-[#ff4b00]/50"
                />
                <p className="text-xs text-[#f5e6d3]/55">Used in the public dish detail modal. One ingredient per line works best.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="dish-price">Price</Label>
                  <Input id="dish-price" type="number" step="0.01" value={formState.price} onChange={(event) => updateForm("price", event.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select value={formState.categoryId} onValueChange={(value) => updateForm("categoryId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dish-image">Image URL</Label>
                <Input id="dish-image" value={formState.imageUrl} onChange={(event) => updateForm("imageUrl", event.target.value)} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#3d2218] bg-[#0d0500] px-3 py-3">
                <div>
                  <p className="text-sm font-medium text-[#f5e6d3]">Available on menu</p>
                  <p className="text-xs text-[#f5e6d3]/55">Turn this off to mark the dish as sold out.</p>
                </div>
                <Switch checked={formState.available} onCheckedChange={(checked) => updateForm("available", checked)} />
              </div>
              {error ? <p className="rounded-md border border-red-800/50 bg-red-950/30 px-3 py-2 text-sm text-red-200">{error}</p> : null}
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={isPending}>{isPending ? "Saving..." : editingItem ? "Save changes" : "Create dish"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error ? <div className="mb-4 rounded-lg border border-red-800/50 bg-red-950/30 px-3 py-2 text-sm text-red-200">{error}</div> : null}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <button type="button" onClick={() => toggleSort("name")} className="hover:text-[#f5e6d3]">Name</button>
            </TableHead>
            <TableHead>
              <button type="button" onClick={() => toggleSort("category")} className="hover:text-[#f5e6d3]">Category</button>
            </TableHead>
            <TableHead>
              <button type="button" onClick={() => toggleSort("price")} className="hover:text-[#f5e6d3]">Price</button>
            </TableHead>
            <TableHead>
              <button type="button" onClick={() => toggleSort("available")} className="hover:text-[#f5e6d3]">Available</button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="mt-1 text-xs text-[#f5e6d3]/55 line-clamp-2">{item.description}</p>
                </div>
              </TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Switch checked={item.available} onCheckedChange={(checked) => void handleToggleAvailability(item.id, checked)} />
                  <span className="text-xs text-[#f5e6d3]/60">{item.available ? "Available" : "Sold out"}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(item)}>
                    <Edit3 className="h-4 w-4" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete {item.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This removes the dish from the admin table and the public menu immediately.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => void handleDelete(item.id)}>Delete dish</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
