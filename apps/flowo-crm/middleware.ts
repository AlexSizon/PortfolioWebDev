import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { authSecret } from "@/lib/auth-secret";

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: authSecret,
  });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pipeline/:path*",
    "/clients/:path*",
    "/tasks/:path*",
  ],
};
