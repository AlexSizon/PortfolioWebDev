import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin/menu", label: "Menu Items" },
  { href: "/admin/categories", label: "Categories" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#0d0500] text-[#f5e6d3]">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-xl border border-[#3d2218] bg-[#1a0a00] p-5 h-fit lg:sticky lg:top-6">
            <div className="mb-6">
              <div className="text-[#ff4b00] text-xs uppercase tracking-[0.2em]">Okami Ramen</div>
              <h1 className="mt-1 text-xl font-semibold">Admin Panel</h1>
              <p className="mt-1 text-sm text-[#f5e6d3]/50">{session?.user?.email}</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm text-[#f5e6d3]/70 hover:bg-[#2d1810] hover:text-[#f5e6d3] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <form
              action={async () => {
                "use server";
                const { signOut } = await import("@/auth");
                await signOut({ redirectTo: "/login" });
              }}
              className="mt-6"
            >
              <Button type="submit" variant="secondary" className="w-full">
                Sign Out
              </Button>
            </form>
          </aside>

          <main className="space-y-4">
            {/* Persistent demo banner */}
            <div className="rounded-lg border border-[#ff4b00]/30 bg-[#ff4b00]/10 px-4 py-3 text-sm text-[#f5e6d3]/80">
              <p className="font-medium text-[#ff4b00]">Demo mode</p>
              <p className="mt-0.5">All changes reset nightly at 03:00 UTC</p>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
