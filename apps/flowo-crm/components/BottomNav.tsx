"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Kanban, Users, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/pipeline", label: "Pipeline", icon: Kanban },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-flowo-void-2/90 backdrop-blur-md border-t border-white/10 px-2 pb-safe">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 py-3 px-4 rounded-xl transition-all",
              isActive ? "text-flowo-violet" : "text-slate-500"
            )}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
