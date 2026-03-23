import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/api-helpers";

export async function GET(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const tag = searchParams.get("tag") ?? "";

  const clients = await prisma.client.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search } },
                { company: { contains: search } },
                { email: { contains: search } },
              ],
            }
          : {},
        tag ? { tags: { contains: tag } } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(clients);
}

export async function POST(req: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const body = await req.json();
  const { name, company, email, phone, tags, notes } = body;

  if (!name || !company || !email) {
    return NextResponse.json(
      { error: "name, company, and email are required" },
      { status: 400 }
    );
  }

  const client = await prisma.client.create({
    data: {
      name,
      company,
      email,
      phone: phone ?? null,
      tags: JSON.stringify(tags ?? []),
      notes: notes ?? null,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
