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

  const task = await prisma.task.update({
    where: { id },
    data: {
      title: body.title,
      dueDate: body.dueDate !== undefined ? (body.dueDate ? new Date(body.dueDate) : null) : undefined,
      priority: body.priority,
      done: body.done,
      clientId: body.clientId,
    },
    include: {
      client: { select: { id: true, name: true, company: true } },
    },
  });

  return NextResponse.json(task);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const demoError = await checkDemoRestriction();
  if (demoError) return demoError;

  const { id } = await params;
  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
