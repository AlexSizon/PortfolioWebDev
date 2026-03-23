"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  function handleDemoLogin() {
    const demoEmail = "demo@flowo.app";
    const demoPassword = "demo123";
    setEmail(demoEmail);
    setPassword(demoPassword);
    setLoading(true);

    signIn("credentials", {
      email: demoEmail,
      password: demoPassword,
      redirect: false,
    }).then((result) => {
      setLoading(false);
      if (result?.error) {
        setError("Demo login failed. Please try again.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <div className="min-h-screen bg-flowo-void flex items-center justify-center p-4">
      {/* Background gradient */}
      <div
        className="fixed inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, #7c3aed40, transparent)",
        }}
      />

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-flowo-violet to-flowo-cyan flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-2xl font-bold text-white">FLOWO</span>
          </div>
          <p className="text-slate-400 text-sm">CRM for Creative Agencies</p>
        </div>

        {/* Demo banner */}
        <div className="glass-card p-4 mb-6 border border-flowo-violet/30 bg-flowo-violet/10 rounded-xl">
          <p className="text-sm text-slate-300 text-center">
            Demo credentials are pre-filled. Click below to enter.
          </p>
        </div>

        {/* Demo button */}
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full mb-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-flowo-violet to-flowo-cyan hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Logging in..." : "Login as Demo →"}
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-xs text-slate-500">or enter manually</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Manual login form */}
        <div className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 focus:border-flowo-violet/50 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-flowo-violet/50 focus:border-flowo-violet/50 transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg font-medium text-white bg-flowo-violet hover:bg-flowo-violet-light transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
