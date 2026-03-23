import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkDemoRestriction, requireAuth } from "@/lib/api-helpers";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();

  const deal = await prisma.deal.update({
    where: { id },
    data: {
      title: body.title,
      value: body.value !== undefined ? parseFloat(body.value) : undefined,
      stage: body.stage,
      priority: body.priority,
    },
    include: { client: { select: { id: true, name: true, company: true } } },
  });

  return NextResponse.json(deal);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const demoError = await checkDemoRestriction();
  if (demoError) return demoError;

  const { id } = await params;
  await prisma.deal.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
