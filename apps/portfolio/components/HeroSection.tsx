"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Animated violet blob */}
      <div
        aria-hidden="true"
        style={{ animation: "blob-float 10s ease-in-out infinite" }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] rounded-full bg-violet/[0.15] blur-[130px] pointer-events-none"
      />
      {/* Secondary blob for depth */}
      <div
        aria-hidden="true"
        style={{ animation: "blob-float 14s ease-in-out infinite reverse" }}
        className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-dim/10 blur-[100px] pointer-events-none"
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-3xl"
      >
        <motion.p
          variants={item}
          className="mb-4 text-sm font-medium tracking-widest text-violet uppercase"
        >
          Full-Stack Developer
        </motion.p>

        <motion.h1
          variants={item}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
        >
          Alex{" "}
          <span className="text-violet">Syzonenko</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed"
        >
          I build beautiful, fast, and production-ready web applications.
          From animated landing pages to real-time dashboards — explore the demos below.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollTo("demos")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-violet text-white font-medium hover:bg-violet-dim active:scale-95 transition-all duration-200 cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-zinc-700 text-zinc-300 font-medium hover:border-violet hover:text-white active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          className="mt-16 flex flex-col items-center gap-2 text-zinc-600"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 h-8 bg-zinc-700 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
