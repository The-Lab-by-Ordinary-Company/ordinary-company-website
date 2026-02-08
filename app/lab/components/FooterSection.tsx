"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";

export function FooterSection() {
  return (
    <footer id="contact" className="bg-white border-t border-neutral-200 px-6 sm:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl py-12 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-between items-center">
          <div>
            <div className="mb-3">
              <img
                src="/lab/the-lab-logo.svg"
                alt="The Lab"
                className="h-6 w-auto"
              />
            </div>
            <p className="text-neutral-500 text-sm font-geist-mono">
              A software design &amp; R&amp;D group by <a href="https://ordinarycompany.design" className="underline hover:text-neutral-900 transition-colors">Ordinary Company Group LLC</a>.
            </p>
            <p className="text-neutral-400 text-xs font-geist-mono mt-1">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:justify-end items-start md:items-center text-sm font-medium text-neutral-600">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-geist-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for projects
            </div>
            <nav className="flex gap-6">
              <a
                href="https://github.com/The-Lab-by-Ordinary-Company"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-black transition"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
