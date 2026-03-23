import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { emitMenuUpdated } from "@/lib/menu-events";
import { requireSession } from "@/lib/api-auth";

export async function POST(request: Request) {
  const authResult = await requireSession();
  if (authResult.response) return authResult.response;

  const body = await request.json();
  const price = Number(body.price);

  if (!body.name || !body.description || !body.categoryId || Number.isNaN(price)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const item = await prisma.menuItem.create({
    data: {
      name: body.name,
      description: body.description,
      ingredients: typeof body.ingredients === "string" ? body.ingredients : "",
      price,
      categoryId: body.categoryId,
      imageUrl: body.imageUrl ?? null,
      available: body.available ?? true,
    },
    include: {
      category: true,
    },
  });

  emitMenuUpdated();
  return NextResponse.json(item, { status: 201 });
}
