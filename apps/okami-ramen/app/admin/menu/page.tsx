import { prisma } from "@/lib/prisma";
import { MenuAdminClient } from "@/components/admin/MenuAdminClient";

export default async function AdminMenuPage() {
  const [items, categories] = await Promise.all([
    prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { order: "asc" } }),
  ]);

  return <MenuAdminClient initialItems={items} categories={categories} />;
}
