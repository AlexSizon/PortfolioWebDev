"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 8 fictional company logos (text-based)
const logos = [
  { name: "Nexora", accent: "text-emerald" },
  { name: "Veltix", accent: "text-blue" },
  { name: "Prismly", accent: "text-purple" },
  { name: "Orbion", accent: "text-emerald" },
  { name: "Kairos", accent: "text-blue" },
  { name: "Fyntech", accent: "text-purple" },
  { name: "Stackly", accent: "text-emerald" },
  { name: "Quorra", accent: "text-blue" },
];

const testimonials = [
  {
    quote:
      "Lumina AI cut our content production time by 70%. Our team now spends mornings on strategy instead of staring at a blank page. The brand voice training is uncanny.",
    author: "Maya Chen",
    role: "Head of Marketing",
    company: "Nexora",
    initials: "MC",
  },
  {
    quote:
      "We publish to 6 platforms daily. Before Lumina, that took a full team. Now one person handles it all. The multi-platform optimization is genuinely impressive.",
    author: "James Okafor",
    role: "Founder & CEO",
    company: "Veltix",
    initials: "JO",
  },
  {
    quote:
      "I was skeptical about AI sounding 'like us.' After 3 months with Lumina, our audience engagement is up 40%. It learned our voice faster than a human hire would.",
    author: "Sarah Lindström",
    role: "Content Director",
    company: "Prismly",
    initials: "SL",
  },
];

function LogoMarquee() {
  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <div className="py-12 border-y border-white/5 overflow-hidden">
      <p className="text-center text-xs text-white/30 tracking-widest uppercase mb-8">
        Trusted by fast-growing teams
      </p>
      <div className="pause-on-hover relative overflow-hidden">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center gap-1.5 select-none"
            >
              <span
                className={`text-sm font-bold tracking-wider ${logo.accent} opacity-60 hover:opacity-90 transition-opacity`}
              >
                {logo.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const testimonial = testimonials[current] ?? testimonials[0]!;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  };

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <div className="py-24 px-6 max-w-3xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald/30 bg-emerald/10 text-emerald text-xs font-medium tracking-wide mb-12">
        Testimonials
      </div>

      <div className="relative min-h-[220px] flex items-center justify-center overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Quote marks */}
            <svg
              className="w-8 h-8 text-emerald/40 mb-4 mx-auto"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-blue flex items-center justify-center text-xs font-bold text-space">
                {testimonial.initials}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  {testimonial.author}
                </p>
                <p className="text-xs text-white/40">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-emerald" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function SocialProofSection() {
  return (
    <section id="social-proof" className="py-12 overflow-hidden">
      <LogoMarquee />
      <TestimonialsCarousel />
    </section>
  );
}
