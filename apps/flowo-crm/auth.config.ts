import type { NextAuthConfig } from "next-auth";
import { authSecret } from "@/lib/auth-secret";

const PROTECTED_PATHS = ["/dashboard", "/pipeline", "/clients", "/tasks"];

const authConfig: NextAuthConfig = {
  secret: authSecret,
  trustHost: true,
  providers: [],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isProtected = PROTECTED_PATHS.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      const isLoggedIn = Boolean(auth?.user);

      if (isProtected && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return Response.redirect(loginUrl);
      }

      if (nextUrl.pathname === "/login" && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string | undefined;
      }
      return session;
    },
  },
};

export default authConfig;
