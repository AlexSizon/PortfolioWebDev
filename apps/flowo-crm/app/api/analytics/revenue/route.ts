import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-helpers";

export async function GET(_req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  // Last 3 months of Won deal values
  const now = new Date();
  const months = [];

  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

    const deals = await prisma.deal.findMany({
      where: {
        stage: "Won",
        createdAt: { gte: start, lte: end },
      },
    });

    const total = deals.reduce((sum, d) => sum + d.value, 0);
    months.push({
      month: start.toLocaleString("en-US", { month: "short" }),
      revenue: Math.round(total),
    });
  }

  return NextResponse.json(months);
}
