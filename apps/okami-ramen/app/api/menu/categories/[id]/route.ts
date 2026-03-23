import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitMenuUpdated } from "@/lib/menu-events";
import { requireSession } from "@/lib/api-auth";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const authResult = await requireSession();
  if (authResult.response) return authResult.response;

  const { id } = await params;
  const body = await request.json();

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: body.name,
      ...(body.order !== undefined ? { order: Number(body.order) } : {}),
    },
    include: {
      _count: { select: { items: true } },
    },
  });

  emitMenuUpdated();
  return NextResponse.json({
    id: category.id,
    name: category.name,
    order: category.order,
    itemCount: category._count.items,
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  const authResult = await requireSession();
  if (authResult.response) return authResult.response;

  const { id } = await params;
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: { select: { items: true } },
    },
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  if (category._count.items > 0) {
    return NextResponse.json({ error: "Remove dishes from this category before deleting it" }, { status: 409 });
  }

  await prisma.category.delete({ where: { id } });
  emitMenuUpdated();
  return NextResponse.json({ success: true });
}
