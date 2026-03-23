import type { NextAuthConfig } from "next-auth";

// Edge-compatible config (no heavy imports like Prisma)
export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // redirect to login
      }
      return true;
    },
  },
  providers: [], // providers added in auth.ts (not edge-safe here)
};
