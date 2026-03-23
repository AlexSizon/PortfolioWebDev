import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-helpers";

export async function GET(_req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  // Last 3 months of new deal counts
  const now = new Date();
  const months = [];

  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

    const count = await prisma.deal.count({
      where: {
        createdAt: { gte: start, lte: end },
      },
    });

    months.push({
      month: start.toLocaleString("en-US", { month: "short" }),
      deals: count,
    });
  }

  return NextResponse.json(months);
}
