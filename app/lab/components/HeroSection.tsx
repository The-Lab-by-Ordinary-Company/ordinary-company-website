"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const handler = () => setReady(true);
    window.addEventListener("loader-complete", handler);

    // Fallback if loader isn't present or event never fires
    const fallback = setTimeout(() => setReady(true), 5000);

    return () => {
      window.removeEventListener("loader-complete", handler);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <header className="relative w-full h-screen flex flex-col justify-between p-6 sm:p-12 z-10 pointer-events-none">
      {/* Top Nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
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
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
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

        {/* Right Title - hero logo that the loader flies into */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-right flex flex-col items-end"
        >
          <img
            id="hero-logo"
            src="/lab/the-lab-logo.svg"
            alt="The Lab"
            className="w-64 md:w-80 lg:w-96 h-auto"
          />
        </motion.div>
      </div>
    </header>
  );
}
