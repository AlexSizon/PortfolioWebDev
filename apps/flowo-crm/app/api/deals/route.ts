import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const stage = searchParams.get("stage");
  const clientId = searchParams.get("clientId");

  const deals = await prisma.deal.findMany({
    where: {
      ...(stage ? { stage } : {}),
      ...(clientId ? { clientId } : {}),
    },
    include: { client: { select: { id: true, name: true, company: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(deals);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const { title, value, stage, priority, clientId } = body;

  if (!title || value === undefined || !clientId) {
    return NextResponse.json(
      { error: "title, value, and clientId are required" },
      { status: 400 }
    );
  }

  const deal = await prisma.deal.create({
    data: {
      title,
      value: parseFloat(value),
      stage: stage ?? "Leads",
      priority: priority ?? "Medium",
      clientId,
    },
    include: { client: { select: { id: true, name: true, company: true } } },
  });

  return NextResponse.json(deal, { status: 201 });
}
