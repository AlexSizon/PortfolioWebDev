"use client";

import { useScroll, motion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-violet origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
