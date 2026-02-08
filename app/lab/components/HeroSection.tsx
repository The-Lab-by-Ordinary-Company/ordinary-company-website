"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <header className="relative w-full h-screen flex flex-col justify-between p-6 sm:p-12 z-10 pointer-events-none">
      {/* Top Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto w-full max-w-[1400px] mx-auto"
      >
        <img
          src="/lab/the-lab-logo.svg"
          alt="The Lab"
          className="h-8 w-auto"
        />
      </motion.div>

      {/* Hero Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 pointer-events-auto w-full max-w-[1400px] mx-auto mb-4">
        {/* Left Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="max-w-xs space-y-8"
        >
          <p className="text-sm leading-relaxed text-neutral-600 font-medium">
            a software design &amp; R&amp;D group based in Cincinnati, Ohio.
            where design meets engineering.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("main-content")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b border-black pb-1 hover:text-neutral-600 hover:border-neutral-400 transition-all cursor-pointer"
          >
            Explore{" "}
            <span className="group-hover:translate-y-0.5 transition-transform duration-300">
              ↓
            </span>
          </button>
        </motion.div>

        {/* Right Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-right flex flex-col items-end"
        >
          <img
            src="/lab/the-lab-logo.svg"
            alt="The Lab"
            className="w-64 md:w-80 lg:w-96 h-auto"
          />
        </motion.div>
      </div>
    </header>
  );
}
