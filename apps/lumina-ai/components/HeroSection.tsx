"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TAGLINE = "Create Content at Light Speed";
const CHAR_DELAY_MS = 40;

function useTypewriter(text: string, enabled: boolean) {
  const [displayed, setDisplayed] = useState(enabled ? "" : text);
  const [done, setDone] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setDone(true);
      return;
    }
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, CHAR_DELAY_MS);
    return () => clearInterval(interval);
  }, [text, enabled]);

  return { displayed, done };
}

export default function HeroSection() {
  const prefersReducedMotion = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setMounted(true);
  }, []);

  const animateTypewriter = mounted && !prefersReducedMotion.current;
  const { displayed } = useTypewriter(TAGLINE, animateTypewriter);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Aurora mesh background */}
      <div className="absolute inset-0 bg-space">
        <div
          className="absolute inset-0 opacity-60"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.35) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden="true"
          className={`absolute inset-[-50%] w-[200%] h-[200%] opacity-30 ${
            !prefersReducedMotion.current || !mounted ? "animate-aurora" : ""
          }`}
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, #10b981 0deg, #3b82f6 90deg, #8b5cf6 180deg, #10b981 270deg, #3b82f6 360deg)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(59,130,246,0.2) 0%, transparent 50%)",
          }}
        />
        {/* Dark vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(2,8,23,0.7) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald/30 bg-emerald/10 text-emerald text-xs font-medium tracking-wide mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          AI-Powered Content Creation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        >
          LUMINA AI
        </motion.h1>

        {/* Typewriter tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-2xl md:text-3xl font-light text-white/70 mb-4 min-h-[2em]"
          aria-label={TAGLINE}
        >
          {displayed}
          <span className="inline-block w-0.5 h-7 bg-emerald ml-0.5 align-middle animate-pulse" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-10"
        >
          Generate on-brand content across every platform in seconds. Powered by
          GPT-4, trained on your brand voice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#cta"
            className="px-8 py-3.5 rounded-xl bg-emerald text-space font-semibold text-base hover:bg-emerald/90 transition-all hover:scale-105 active:scale-95"
          >
            Get Started Free
          </a>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white/80 font-semibold text-base hover:bg-white/5 hover:border-white/40 transition-all"
          >
            Watch Demo
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-5"
        >
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
