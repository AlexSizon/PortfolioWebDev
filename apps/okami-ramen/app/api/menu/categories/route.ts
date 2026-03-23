import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitMenuUpdated } from "@/lib/menu-events";
import { requireSession } from "@/lib/api-auth";

export async function POST(request: Request) {
  const authResult = await requireSession();
  if (authResult.response) return authResult.response;

  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Category name is required" }, { status: 400 });
  }

  const category = await prisma.category.create({
    data: {
      name: body.name,
      order: Number(body.order) || 0,
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
  }, { status: 201 });
}
