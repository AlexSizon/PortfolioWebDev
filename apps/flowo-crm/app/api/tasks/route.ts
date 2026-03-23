import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const priority = searchParams.get("priority");
  const clientId = searchParams.get("clientId");
  const sort = searchParams.get("sort") ?? "dueDate";

  const tasks = await prisma.task.findMany({
    where: {
      ...(priority ? { priority } : {}),
      ...(clientId ? { clientId } : {}),
    },
    include: {
      client: { select: { id: true, name: true, company: true } },
    },
    orderBy:
      sort === "dueDate"
        ? { dueDate: "asc" }
        : { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const { title, dueDate, priority, clientId, dealId } = body;

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority ?? "Medium",
      clientId: clientId ?? null,
      dealId: dealId ?? null,
    },
    include: {
      client: { select: { id: true, name: true, company: true } },
    },
  });

  return NextResponse.json(task, { status: 201 });
}
