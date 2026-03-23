"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  imageUrl: string | null;
  available: boolean;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
  order: number;
  items: MenuItem[];
}

type SelectedDish = {
  item: MenuItem;
  categoryName: string;
};

function DishCardSkeleton() {
  return (
    <div className="rounded-xl border border-[#3d2218] bg-[#1a0a00] overflow-hidden animate-pulse">
      <div className="h-44 bg-[#2d1810]" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-[#2d1810] rounded w-3/4" />
        <div className="h-3 bg-[#2d1810] rounded w-full" />
        <div className="h-3 bg-[#2d1810] rounded w-5/6" />
        <div className="flex justify-between pt-2">
          <div className="h-5 bg-[#2d1810] rounded w-16" />
          <div className="h-5 bg-[#2d1810] rounded w-20" />
        </div>
      </div>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

function getIngredientsList(ingredients: string) {
  return ingredients
    .split(/\r?\n|,/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);
}

function DishImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(255,75,0,0.18),_transparent_55%),linear-gradient(180deg,#1a0a00_0%,#0d0500_100%)] px-8 text-center text-sm text-[#f5e6d3]/50 ${className ?? ""}`}>
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

function DishCard({
  item,
  index,
  onSelect,
}: {
  item: MenuItem;
  index: number;
  onSelect: () => void;
}) {
  const ingredients = getIngredientsList(item.ingredients);

  return (
    <motion.button
      type="button"
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onSelect}
      className={`group flex flex-col overflow-hidden rounded-xl border border-[#3d2218] bg-[#1a0a00] text-left
        transition-all duration-300 hover:border-[#ff4b00]/50 hover:shadow-[0_18px_50px_rgba(255,75,0,0.12)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4b00]/50 ${!item.available ? "opacity-75" : ""}`}
    >
      <div className="relative h-44 overflow-hidden">
        <DishImage
          src={item.imageUrl}
          alt={item.name}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0500]/85 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          {!item.available && (
            <div className="absolute inset-0 bg-[#0d0500]/60 flex items-center justify-center">
              <span className="bg-[#2d1810] text-[#f5e6d3]/70 text-xs font-medium px-3 py-1 rounded-full border border-[#3d2218]">
                Sold Out
              </span>
            </div>
          )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-[#f5e6d3] leading-tight">{item.name}</h3>
          <span className="text-[#ff4b00] font-bold tabular-nums shrink-0">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-[#f5e6d3]/60 text-sm leading-relaxed flex-1">{item.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ingredients.slice(0, 3).map((ingredient) => (
            <span
              key={ingredient}
              className="rounded-full border border-[#3d2218] bg-[#120700] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[#f5e6d3]/55"
            >
              {ingredient}
            </span>
          ))}
          {ingredients.length > 3 ? (
            <span className="rounded-full border border-[#3d2218] bg-[#120700] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[#ffb08a]">
              +{ingredients.length - 3} more
            </span>
          ) : null}
        </div>
        <div className="mt-3">
          {item.available ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-[#f5e6d3]/40">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f5e6d3]/30" />
              Sold Out
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#2d1810] pt-3 text-xs uppercase tracking-[0.22em] text-[#f5e6d3]/40">
          <span>Tap for details</span>
          <span className="text-[#ff4b00] transition-transform duration-300 group-hover:translate-x-1">View</span>
        </div>
      </div>
    </motion.button>
  );
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState<SelectedDish | null>(null);

  const fetchMenu = useCallback(async () => {
    const res = await fetch("/api/menu");
    if (res.ok) {
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // SSE subscription for real-time updates (task 5.4)
  useEffect(() => {
    let eventSource: EventSource | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    const connect = () => {
      eventSource = new EventSource("/api/menu/events");

      eventSource.onmessage = (e) => {
        if (e.data === "menu-updated") {
          fetchMenu();
        }
      };

      eventSource.onerror = () => {
        eventSource?.close();
        reconnectTimeout = setTimeout(connect, 1500);
      };
    };

    connect();

    return () => {
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      eventSource?.close();
    };
  }, [fetchMenu]);

  // Stagger index across all items for animation
  let globalIndex = 0;
  const selectedIngredients = selectedDish ? getIngredientsList(selectedDish.item.ingredients) : [];

  return (
    <div className="min-h-screen bg-[#0d0500]">
      {/* Header */}
      <header className="border-b border-[#2d1810] bg-[#0d0500]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#ff4b00] text-2xl font-bold" style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}>
              大神
            </span>
            <div>
              <p className="text-[#f5e6d3] font-semibold tracking-widest text-sm">OKAMI RAMEN</p>
              <p className="text-[#f5e6d3]/40 text-xs">Authentic Japanese Ramen</p>
            </div>
          </div>
          <a
            href="/login"
            className="text-xs text-[#f5e6d3]/40 hover:text-[#ff4b00] transition-colors"
          >
            Admin
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-[#2d1810] py-12 px-4 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold text-[#f5e6d3] mb-3"
          style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
        >
          Our Menu
        </h1>
        <p className="text-[#f5e6d3]/60 max-w-md mx-auto text-sm leading-relaxed">
          Crafted with 20-hour tonkotsu broth, fresh-cut noodles, and premium toppings. 
          Prices and availability update in real-time.
        </p>
      </section>

      {/* Menu sections */}
      <main className="mx-auto max-w-5xl px-4 py-10 space-y-14">
        {loading ? (
          // Loading skeletons
          <>
            {[1, 2, 3].map((n) => (
              <section key={n}>
                <div className="h-8 w-40 bg-[#2d1810] rounded animate-pulse mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <DishCardSkeleton key={i} />
                  ))}
                </div>
              </section>
            ))}
          </>
        ) : (
          categories?.map((category) => (
            <section key={category.id}>
              <h2
                className="text-2xl font-bold text-[#f5e6d3] mb-6 pb-3 border-b border-[#2d1810]"
                style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
              >
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item) => {
                  const idx = globalIndex++;
                  return (
                    <DishCard
                      key={item.id}
                      item={item}
                      index={idx}
                      onSelect={() => setSelectedDish({ item, categoryName: category.name })}
                    />
                  );
                })}
              </div>
            </section>
          ))
        )}
      </main>

      <Dialog open={selectedDish !== null} onOpenChange={(open) => !open && setSelectedDish(null)}>
        <DialogContent className="max-w-3xl overflow-hidden border-[#3d2218] bg-[#120700] p-0">
          {selectedDish ? (
            <div className="grid max-h-[85vh] overflow-y-auto md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-64 border-b border-[#2d1810] md:min-h-full md:border-b-0 md:border-r">
                <DishImage
                  src={selectedDish.item.imageUrl}
                  alt={selectedDish.item.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0500] via-[#0d0500]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#ffb08a]">{selectedDish.categoryName}</p>
                  <h3
                    className="mt-2 text-3xl font-bold text-[#f5e6d3]"
                    style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}
                  >
                    {selectedDish.item.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-7">
                <DialogHeader className="pr-8">
                  <DialogTitle className="text-2xl" style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}>
                    {selectedDish.item.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="text-2xl font-bold text-[#ff4b00]">${selectedDish.item.price.toFixed(2)}</span>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${
                      selectedDish.item.available
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                        : "border-[#3d2218] bg-[#1a0a00] text-[#f5e6d3]/60"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${selectedDish.item.available ? "bg-emerald-400" : "bg-[#f5e6d3]/35"}`}
                    />
                    {selectedDish.item.available ? "Available" : "Sold out"}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-[#f5e6d3]/68">{selectedDish.item.description}</p>

                <section className="mt-6">
                  <h4 className="text-xs uppercase tracking-[0.3em] text-[#ffb08a]">Ingredients</h4>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {selectedIngredients.length > 0 ? (
                      selectedIngredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="rounded-full border border-[#3d2218] bg-[#1a0a00] px-3 py-1.5 text-xs text-[#f5e6d3]/75"
                        >
                          {ingredient}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[#f5e6d3]/45">Ingredients have not been added for this dish yet.</span>
                    )}
                  </div>
                </section>

                <div className="mt-7 rounded-2xl border border-[#3d2218] bg-[#1a0a00] p-4 text-sm text-[#f5e6d3]/58">
                  Menu data stays live here too. If the admin updates this dish, the menu will refresh without a full page reload.
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t border-[#2d1810] py-6 px-4 text-center">
        <p className="text-[#f5e6d3]/30 text-xs">
          © {new Date().getFullYear()} Okami Ramen. Menu prices and availability updated live.
        </p>
      </footer>
    </div>
  );
}
