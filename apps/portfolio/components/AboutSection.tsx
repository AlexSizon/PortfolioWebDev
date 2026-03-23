"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "TypeScript", accent: "bg-blue-500" },
  { name: "React", accent: "bg-cyan-500" },
  { name: "Next.js", accent: "bg-white" },
  { name: "Node.js", accent: "bg-green-500" },
  { name: "PostgreSQL", accent: "bg-blue-400" },
  { name: "Prisma ORM", accent: "bg-indigo-400" },
  { name: "Tailwind CSS", accent: "bg-sky-400" },
  { name: "Framer Motion", accent: "bg-violet" },
  { name: "Docker", accent: "bg-blue-500" },
  { name: "Git", accent: "bg-orange-500" },
  { name: "Figma", accent: "bg-pink-400" },
  { name: "Astro", accent: "bg-amber-400" },
  { name: "Redis", accent: "bg-red-500" },
  { name: "REST / GraphQL", accent: "bg-pink-500" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-zinc-900/40">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-medium tracking-widest text-violet uppercase mb-3">
            Background
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Bio */}
          <div className="flex flex-col gap-5">
            <p className="text-zinc-300 leading-relaxed text-lg">
              Hi, I&apos;m <span className="text-white font-semibold">Alex</span> — a full-stack
              developer with a passion for building products that look great and work flawlessly.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              I specialize in <span className="text-white">React&nbsp;/&nbsp;Next.js</span> on the
              frontend and <span className="text-white">Node.js + PostgreSQL</span> on the backend.
              I care deeply about performance, accessibility, and polished user interfaces.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              When I&apos;m not shipping features, I&apos;m exploring design systems, learning new
              rendering strategies, or working on open-source projects. Each demo in this portfolio
              targets a different aesthetic and technical challenge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-violet text-white text-sm font-medium hover:bg-violet-dim transition-colors"
              >
                Hire Me
              </a>
              <a
                href="https://github.com/alsy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-violet hover:text-white transition-colors"
              >
                GitHub Profile
              </a>
            </div>
          </div>

          {/* Skills grid */}
          <div>
            <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest mb-6">
              Tech Stack
            </p>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3"
            >
              {skills.map(({ name, accent }) => (
                <motion.li
                  key={name}
                  variants={skillVariants}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${accent}`} />
                  <span className="text-sm text-zinc-300">{name}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
