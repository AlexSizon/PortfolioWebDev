"use client";

import { useRef, useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  function handleDemoLogin() {
    setEmail("admin@okami.app");
    setPassword("demo123");
    setError(null);
    queueMicrotask(() => formRef.current?.requestSubmit());
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0500] px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo / Brand */}
        <div className="text-center space-y-2">
          <div className="inline-block text-[#ff4b00] text-4xl font-bold tracking-wider"
            style={{ fontFamily: "var(--font-noto-serif-jp), serif" }}>
            大神
          </div>
          <h1 className="text-[#f5e6d3] text-2xl font-semibold tracking-wide">
            OKAMI RAMEN
          </h1>
          <p className="text-[#f5e6d3]/50 text-sm">Admin Portal</p>
        </div>

        {/* Demo credentials banner */}
        <div className="rounded-lg border border-[#ff4b00]/30 bg-[#ff4b00]/10 px-4 py-3 text-sm text-[#f5e6d3]/80">
          <p className="font-medium text-[#ff4b00]">Demo credentials</p>
          <p className="mt-0.5">Email: admin@okami.app</p>
          <p>Password: demo123</p>
        </div>

        {/* Demo login button — prominent */}
        <Button
          onClick={handleDemoLogin}
          disabled={isPending}
          className="h-11 w-full"
        >
          {isPending ? (
            <>
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            "Login as Demo →"
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#3d2218]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[#0d0500] px-3 text-[#f5e6d3]/40">or sign in manually</span>
          </div>
        </div>

        {/* Manual login form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-medium text-[#f5e6d3]/70">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@okami.app"
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-xs font-medium text-[#f5e6d3]/70">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11"
            />
          </div>

          {error && (
            <p className="rounded-md bg-red-950/50 border border-red-800/50 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            variant="secondary"
            className="h-11 w-full"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Back to menu */}
        <p className="text-center text-xs text-[#f5e6d3]/40">
          <a href="/menu" className="hover:text-[#ff4b00] transition-colors">
            ← View public menu
          </a>
        </p>
      </div>
    </div>
  );
}
