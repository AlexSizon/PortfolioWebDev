import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, checkDemoRestriction } from "@/lib/api-helpers";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      deals: { orderBy: { createdAt: "desc" } },
      tasks: { orderBy: { createdAt: "desc" } },
      activities: { orderBy: { createdAt: "desc" }, take: 50 },
    },
  });

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();

  const client = await prisma.client.update({
    where: { id },
    data: {
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      tags: body.tags ? JSON.stringify(body.tags) : undefined,
      notes: body.notes,
    },
  });

  return NextResponse.json(client);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const demoError = await checkDemoRestriction();
  if (demoError) return demoError;

  const { id } = await params;

  await prisma.client.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
