import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function checkDemoRestriction(): Promise<NextResponse | null> {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = (session.user as { role?: string })?.role;
  if (role === "demo") {
    return NextResponse.json(
      { message: "This action is not available in demo mode" },
      { status: 403 }
    );
  }

  return null;
}

export async function requireAuth(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
