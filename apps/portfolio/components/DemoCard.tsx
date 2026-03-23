"use client";

import { motion } from "framer-motion";

export interface DemoCardData {
  id: string;
  brand: string;
  tagline: string;
  description: string;
  stack: string[];
  url: string;
  gradientClass: string;
  status: "live" | "coming-soon";
}

export default function DemoCard({ card }: { card: DemoCardData }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden hover:border-violet/50 hover:shadow-[0_0_40px_#7c3aed22] transition-[border-color,box-shadow] duration-300"
    >
      {/* Preview placeholder */}
      <div
        className={`h-48 w-full ${card.gradientClass} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center">
          <p className="font-heading text-2xl font-bold text-white drop-shadow">{card.brand}</p>
          <p className="text-sm text-white/60 mt-1">{card.tagline}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3 className="font-heading text-lg font-semibold text-white">{card.brand}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{card.description}</p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-3">
          {card.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-full text-xs bg-zinc-800 border border-zinc-700 text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-zinc-800">
          {card.status === "live" ? (
            <a
              href={card.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-violet hover:text-white transition-colors"
            >
              Open Demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              In Development
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
