"use client";

import { motion } from "framer-motion";
import DemoCard, { type DemoCardData } from "./DemoCard";

const demoUrls = {
  maisonNord:
    process.env.NEXT_PUBLIC_MAISON_NORD_URL ?? "https://repomaison-nord-production.up.railway.app/",
  okamiRamen:
    process.env.NEXT_PUBLIC_OKAMI_RAMEN_URL ?? "https://repookami-ramen-production.up.railway.app/menu",
  flowoCrm:
    process.env.NEXT_PUBLIC_FLOWO_CRM_URL ?? "https://flowo-crm-production.up.railway.app/dashboard",
  luminaAi:
    process.env.NEXT_PUBLIC_LUMINA_AI_URL ?? "https://repolumina-ai-production.up.railway.app/",
} as const;

const demos: DemoCardData[] = [
  {
    id: "maison-nord",
    brand: "Maison Nord",
    tagline: "Interior Design Studio",
    description:
      "A premium interior design studio with editorial-style layouts, smooth scroll transitions, and a curated project gallery. Built for maximum Lighthouse score.",
    stack: ["Astro", "Tailwind CSS", "Swiper"],
    url: demoUrls.maisonNord,
    gradientClass: "bg-linear-to-br from-stone-700 to-stone-950",
    status: "live",
  },
  {
    id: "okami-ramen",
    brand: "Okami Ramen",
    tagline: "Japanese Restaurant",
    description:
      "Full-stack restaurant app with online ordering, real-time kitchen status updates via SSE, and a JWT-protected staff dashboard.",
    stack: ["Next.js", "Prisma", "SQLite", "SSE", "NextAuth"],
    url: demoUrls.okamiRamen,
    gradientClass: "bg-linear-to-br from-red-900 to-orange-950",
    status: "live",
  },
  {
    id: "flowo-crm",
    brand: "Flowo CRM",
    tagline: "Client Pipeline Manager",
    description:
      "Glassmorphism-styled CRM dashboard with drag-and-drop Kanban boards, analytics charts, and full client lifecycle management.",
    stack: ["Next.js", "Zustand", "dnd-kit", "Recharts"],
    url: demoUrls.flowoCrm,
    gradientClass: "bg-linear-to-br from-sky-900 to-violet-950",
    status: "live",
  },
  {
    id: "lumina-ai",
    brand: "Lumina AI",
    tagline: "SaaS Product Landing",
    description:
      "Animated SaaS product landing page with scroll-driven section reveals, interactive pricing tiers, and a 3D hero element.",
    stack: ["Next.js", "Framer Motion", "Three.js"],
    url: demoUrls.luminaAi,
    gradientClass: "bg-linear-to-br from-violet-900 to-indigo-950",
    status: "live",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function DemoShowcase() {
  return (
    <section id="demos" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-medium tracking-widest text-violet uppercase mb-3">
            Portfolio
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Demo Projects
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Each demo represents a different industry, design style, and technical challenge —
            built to production standards.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {demos.map((demo) => (
            <motion.div key={demo.id} variants={cardVariants}>
              <DemoCard card={demo} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
