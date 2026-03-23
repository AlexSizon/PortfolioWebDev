"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* Aurora gradient background (same as hero) */}
      <div className="absolute inset-0 bg-space">
        <div
          className="absolute inset-0 opacity-50"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20 animate-aurora"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #10b981 0deg, #3b82f6 90deg, #8b5cf6 180deg, #10b981 360deg)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(2,8,23,0.8) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/30 bg-emerald/10 text-emerald text-xs font-medium tracking-wide mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            Limited Early Access
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Start Creating at{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-blue">
              Light Speed
            </span>
          </h2>
          <p className="text-white/50 mb-10">
            Join 2,000+ marketers already on the early access list. Free during
            beta.
          </p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@company.com"
                  className="flex-1 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-emerald/50 focus:bg-white/8 transition-all"
                  aria-label="Email address"
                  aria-invalid={!!error}
                  aria-describedby={error ? "email-error" : undefined}
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-emerald text-space font-semibold text-sm hover:bg-emerald/90 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Get Early Access
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald/10 border border-emerald/20"
              >
                <svg
                  className="w-5 h-5 text-emerald"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-emerald font-medium text-sm">
                  You&apos;re on the list!{" "}
                  <span className="text-white/50 font-normal">
                    Demo mode — email not sent.
                  </span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p id="email-error" className="mt-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <p className="mt-4 text-xs text-white/30">
            No spam, ever. Unsubscribe any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
