"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PricingTier {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: "Perfect for solo creators and small blogs.",
    features: [
      "50 AI generations / month",
      "3 brand voice profiles",
      "Blog & social formats",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    monthlyPrice: 79,
    yearlyPrice: 63,
    description: "For growing teams that publish daily.",
    features: [
      "Unlimited AI generations",
      "10 brand voice profiles",
      "All platform formats",
      "Advanced analytics",
      "Priority support",
      "Team collaboration (5 seats)",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 199,
    yearlyPrice: 159,
    description: "Custom workflows for large organizations.",
    features: [
      "Unlimited everything",
      "Unlimited brand profiles",
      "Custom integrations",
      "Dedicated success manager",
      "SLA & compliance",
      "Unlimited seats",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-emerald flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function AnimatedPrice({
  price,
  period,
}: {
  price: number;
  period: "monthly" | "yearly";
}) {
  return (
    <div className="flex items-end gap-1 justify-center my-4 h-14">
      <span className="text-2xl font-medium text-white/50 mb-1">$</span>
      <div className="relative overflow-hidden h-14 flex items-end">
        <AnimatePresence mode="wait" custom={period}>
          <motion.span
            key={`${price}-${period}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-5xl font-bold text-white tabular-nums"
          >
            {price}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-white/40 text-sm mb-2">
        /{period === "monthly" ? "mo" : "mo"}
      </span>
    </div>
  );
}

function PricingCard({
  tier,
  billing,
}: {
  tier: PricingTier;
  billing: "monthly" | "yearly";
}) {
  const price =
    billing === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 ${
        tier.highlighted
          ? "scale-[1.03] border-2 border-emerald/50 bg-gradient-to-b from-emerald/10 to-transparent"
          : "border border-white/8 bg-white/[0.02]"
      }`}
    >
      {/* Most Popular badge */}
      {tier.highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-emerald text-space text-xs font-bold tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-lg font-semibold text-white/80 mb-1">{tier.name}</h3>
        <p className="text-sm text-white/40">{tier.description}</p>

        <AnimatedPrice price={price} period={billing} />

        {billing === "yearly" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-emerald font-medium mb-1"
          >
            Billed annually · save 20%
          </motion.p>
        )}
      </div>

      <a
        href="#cta"
        className={`mt-6 mb-8 py-3 rounded-xl text-sm font-semibold text-center transition-all hover:scale-[1.02] active:scale-95 ${
          tier.highlighted
            ? "bg-emerald text-space hover:bg-emerald/90"
            : "border border-white/15 text-white/80 hover:bg-white/5 hover:border-white/30"
        }`}
      >
        {tier.cta}
      </a>

      <ul className="flex flex-col gap-3 mt-auto">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <CheckIcon />
            <span className="text-sm text-white/60">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple/30 bg-purple/10 text-purple text-xs font-medium tracking-wide mb-4">
            Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-white/50 mb-8">
            Start free. No credit card required.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full border border-white/10 bg-white/5">
            <button
              onClick={() => setBilling("monthly")}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                billing === "monthly" ? "text-space" : "text-white/50 hover:text-white/80"
              }`}
            >
              {billing === "monthly" && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                billing === "yearly" ? "text-space" : "text-white/50 hover:text-white/80"
              }`}
            >
              {billing === "yearly" && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                />
              )}
              <span className="relative z-10">Yearly</span>
            </button>
            {/* Save 20% badge */}
            <AnimatePresence>
              {billing === "yearly" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-2.5 py-0.5 rounded-full bg-emerald/20 text-emerald text-xs font-semibold"
                >
                  Save 20%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {tiers.map((tier) => (
            <PricingCard key={tier.name} tier={tier} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  );
}
