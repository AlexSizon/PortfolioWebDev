import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-helpers";

type RevenueDeal = {
  value: number;
};

export async function GET(_req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  // Last 3 months of Won deal values
  const now = new Date();
  const months: Array<{ month: string; revenue: number }> = [];

  for (let i = 2; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const start = new Date(d.getFullYear(), d.getMonth(), 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);

    const deals: RevenueDeal[] = await prisma.deal.findMany({
      select: {
        value: true,
      },
      where: {
        stage: "Won",
        createdAt: { gte: start, lte: end },
      },
    });

    const total = deals.reduce((sum, deal) => sum + deal.value, 0);
    months.push({
      month: start.toLocaleString("en-US", { month: "short" }),
      revenue: Math.round(total),
    });
  }

  return NextResponse.json(months);
}
