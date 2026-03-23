"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Connect",
    description:
      "Link your existing content — blog posts, social media, brand guidelines — so Lumina can learn your voice.",
  },
  {
    number: 2,
    title: "Create",
    description:
      "Describe what you need in plain language. Lumina generates drafts across every format in seconds.",
  },
  {
    number: 3,
    title: "Review",
    description:
      "Edit with AI-assisted suggestions. Refine tone, length, and format until it matches your vision.",
  },
  {
    number: 4,
    title: "Publish",
    description:
      "One click to distribute across all your channels, each piece optimized for the platform.",
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const dashOffset = useTransform(
    scrollYProgress,
    [0, 1],
    [pathLength, 0]
  );

  // Measure path length on mount and resize
  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const measure = () => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        setPathLength(length);
      }
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Build SVG path connecting step circles
  // Steps are laid out vertically for mobile, horizontally for desktop
  // We use a simple vertical path since we can't know exact positions at build time
  // The SVG is overlaid and connects 4 fixed-position circles
  const svgPath = "M 50 0 C 50 100, 50 200, 50 300 C 50 400, 50 500, 50 600";

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue/30 bg-blue/10 text-blue text-xs font-medium tracking-wide mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            From Idea to Published in Minutes
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Lumina AI streamlines your entire content workflow into four simple
            steps.
          </p>
        </div>

        {/* Steps layout */}
        <div className="relative">
          {/* Desktop: horizontal layout with connecting SVG */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-8 relative">
              {/* SVG connecting line (desktop) */}
              <svg
                className="absolute top-[2.25rem] left-[12.5%] w-3/4 h-8 pointer-events-none"
                viewBox="0 0 300 30"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Background track */}
                <path
                  d="M 0 15 L 300 15"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="2"
                />
                {/* Animated fill */}
                <motion.path
                  ref={pathRef}
                  d="M 0 15 L 300 15"
                  stroke="url(#timelineGradient)"
                  strokeWidth="2"
                  strokeDasharray={reducedMotion ? undefined : pathLength || 300}
                  strokeDashoffset={reducedMotion ? 0 : dashOffset}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="timelineGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: (step.number - 1) * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full border-2 border-emerald/40 bg-space flex items-center justify-center mb-4 relative z-10">
                    <span className="text-xl font-bold text-emerald">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical layout */}
          <div className="md:hidden relative pl-12">
            {/* Vertical SVG track */}
            <svg
              className="absolute left-[1.125rem] top-0 bottom-0 h-full w-8 pointer-events-none"
              viewBox="0 0 30 600"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 15 0 L 15 600"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2"
              />
              <motion.path
                d="M 15 0 L 15 600"
                stroke="url(#timelineGradientV)"
                strokeWidth="2"
                strokeDasharray={reducedMotion ? undefined : pathLength || 600}
                strokeDashoffset={reducedMotion ? 0 : dashOffset}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="timelineGradientV"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="flex flex-col gap-10">
              {steps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: (step.number - 1) * 0.1 }}
                  className="relative"
                >
                  {/* Circle indicator */}
                  <div className="absolute -left-12 top-0 w-[2.25rem] h-[2.25rem] rounded-full border-2 border-emerald/40 bg-space flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
