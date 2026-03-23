"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: Stat[] = [
  {
    value: 83,
    suffix: "%",
    label: "Marketers Overwhelmed",
    description: "spend 4+ hours/day on content creation tasks",
  },
  {
    value: 4.5,
    suffix: "h",
    label: "Average Daily Waste",
    description: "average time wasted weekly on manual content work",
  },
  {
    prefix: "$",
    value: 67,
    suffix: "B",
    label: "Market Opportunity",
    description: "content market size projected by 2027",
  },
];

function useCountUp(
  target: number,
  duration: number,
  enabled: boolean,
  active: boolean
) {
  const [count, setCount] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || !enabled || hasRun.current) return;
    hasRun.current = true;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // easeOut curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, enabled, target, duration]);

  return active ? count : target;
}

function StatItem({
  stat,
  reducedMotion,
}: {
  stat: Stat;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(stat.value, 1500, !reducedMotion, active);

  return (
    <div
      ref={ref}
      className="text-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors"
    >
      <div className="text-5xl md:text-6xl font-bold text-white mb-2 tabular-nums">
        {stat.prefix && <span className="text-emerald">{stat.prefix}</span>}
        <span>{count}</span>
        <span className="text-emerald">{stat.suffix}</span>
      </div>
      <div className="text-lg font-semibold text-white/80 mb-1">{stat.label}</div>
      <div className="text-sm text-white/40 max-w-[200px] mx-auto">
        {stat.description}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return (
    <section id="stats" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Content Problem Is Real
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Marketers spend more time creating content than actually connecting
            with their audience. Lumina AI changes that.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} reducedMotion={reducedMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}
