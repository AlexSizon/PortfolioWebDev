"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/alsy",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/Alex_Sizon",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alex-syzonenko-9591271a9/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4.983 3.5C4.983 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.13 1 2.5 1s2.483 1.12 2.483 2.5zM.5 8h4V24h-4V8zM8 8h3.833v2.183h.054C12.42 9.233 13.97 7.5 16.81 7.5 22.09 7.5 24 10.973 24 16.01V24h-4v-7.08c0-1.688-.03-3.86-2.352-3.86-2.355 0-2.716 1.838-2.716 3.736V24h-4V8z" />
      </svg>
    ),
  },
];

const inputClass =
  "w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-violet transition-colors";
const errorClass = "mt-1.5 text-xs text-red-400";

export default function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        { from_name: data.name, from_email: data.email, message: data.message },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "" }
      );
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-medium tracking-widest text-violet uppercase mb-3">
            Contact
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Have a project in mind? Send me a message and I&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center rounded-2xl border border-green-800/50 bg-green-950/20">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-white font-medium">Message sent successfully!</p>
                <p className="text-zinc-400 text-sm">I&apos;ll be in touch soon.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-violet hover:underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className={errorClass}>{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={inputClass}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className={errorClass}>{errors.message.message}</p>}
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    Something went wrong. Please try again or reach out via Telegram.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-violet text-white font-medium hover:bg-violet-dim disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 transition-all duration-200"
                >
                  {status === "loading" ? (
                    <>
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 lg:pt-2"
          >
            <div>
              <p className="text-zinc-400 leading-relaxed">
                I&apos;m open to freelance projects, full-time opportunities, and interesting
                collaborations. Whether you need a full product built from scratch or just a fresh
                UI — let&apos;s talk.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest">
                Find me on
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ label, href, icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                  >
                    <span className="group-hover:text-violet transition-colors">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
