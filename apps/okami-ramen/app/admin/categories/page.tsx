import { prisma } from "@/lib/prisma";
import { CategoriesAdminClient } from "@/components/admin/CategoriesAdminClient";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });

  return (
    <CategoriesAdminClient
      initialCategories={categories.map((category) => ({
        id: category.id,
        name: category.name,
        order: category.order,
        itemCount: category._count.items,
      }))}
    />
  );
}
