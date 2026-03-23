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
  const data: Record<string, unknown> = {};

  if (body.name !== undefined) data.name = body.name;
  if (body.description !== undefined) data.description = body.description;
  if (body.ingredients !== undefined) data.ingredients = body.ingredients;
  if (body.price !== undefined) data.price = Number(body.price);
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
  if (body.available !== undefined) data.available = Boolean(body.available);
  if (body.categoryId !== undefined) data.categoryId = body.categoryId;

  const item = await prisma.menuItem.update({
    where: { id },
    data,
    include: { category: true },
  });

  emitMenuUpdated();
  return NextResponse.json(item);
}

export async function DELETE(_request: Request, { params }: Params) {
  const authResult = await requireSession();
  if (authResult.response) return authResult.response;

  const { id } = await params;
  await prisma.menuItem.delete({ where: { id } });
  emitMenuUpdated();
  return NextResponse.json({ success: true });
}
