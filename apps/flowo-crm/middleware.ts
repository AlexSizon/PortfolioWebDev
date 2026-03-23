import NextAuth, {
  type NextAuthRequest,
  type NextAuthResult,
} from "next-auth";
import {
  NextResponse,
  type NextFetchEvent,
  type NextMiddleware,
} from "next/server";
import authConfig from "@/auth.config";

const authResult: NextAuthResult = NextAuth(authConfig);
const middleware: NextMiddleware = authResult.auth(
  (_request: NextAuthRequest, _event: NextFetchEvent) => NextResponse.next()
);

export default middleware;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/pipeline/:path*",
    "/clients/:path*",
    "/tasks/:path*",
  ],
};
