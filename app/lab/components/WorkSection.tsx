"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";

export function WorkSection() {
  return (
    <section id="products" className="px-6 sm:px-8 bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-6xl py-24">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest font-geist-mono">
              What We Build
            </span>
            <div className="h-px flex-1 bg-neutral-200"></div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 mb-4"
          >
            Our Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-500 max-w-2xl font-geist-mono"
          >
            Tools and platforms we&apos;re designing and building in the open.
          </motion.p>
        </div>

        <div className="space-y-12">
          {/* Utsuwa */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-neutral-500 font-geist-mono font-medium">
                  2026
                </span>
                <div className="h-1 w-1 rounded-full bg-neutral-300"></div>
                <span className="text-xs text-neutral-500 font-geist-mono font-medium">
                  AI &amp; Creative Tech
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Utsuwa
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed font-geist-mono">
                An open-source web and desktop app for creating and animating
                AI-powered virtual characters. An alternative to xAI&apos;s Grok
                Companion and Razer&apos;s Project Ava.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">
                  SvelteKit
                </span>
                <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">
                  AI/ML
                </span>
                <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">
                  Open Source
                </span>
              </div>
              <a
                href="https://www.utsuwa.ai/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-blue-600 transition-colors border-b border-transparent hover:border-blue-600 pb-0.5"
              >
                View Docs <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-50 group-hover:-translate-y-2 transition-transform duration-500">
                <img
                  src="/lab/utsuwa-thumbnail.png"
                  alt="Utsuwa, AI virtual character framework"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </motion.div>

          {/* Pomodorii */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-neutral-500 font-geist-mono font-medium">
                  2025
                </span>
                <div className="h-1 w-1 rounded-full bg-neutral-300"></div>
                <span className="text-xs text-neutral-500 font-geist-mono font-medium">
                  Productivity
                </span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Pomodorii
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed font-geist-mono">
                The most delightful pomodoro timer on the internet. A
                retro-console-styled focus timer with custom sounds,
                multi-language support, and theme toggling.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">
                  Next.js
                </span>
                <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">
                  React
                </span>
                <span className="px-3 py-1 text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 rounded-full font-geist-mono">
                  PWA
                </span>
              </div>
              <a
                href="https://www.pomodorii.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-blue-600 transition-colors border-b border-transparent hover:border-blue-600 pb-0.5"
              >
                Try Pomodorii <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="order-1">
              <div className="rounded-xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-50 group-hover:-translate-y-2 transition-transform duration-500">
                <img
                  src="/lab/pomodorii-thumbnail.png"
                  alt="Pomodorii, retro pomodoro timer"
                  className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <a
            href="https://github.com/The-Lab-by-Ordinary-Company"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-all font-geist-mono text-sm shadow-sm hover:shadow-md"
          >
            <Github className="w-4 h-4" />
            Follow us on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
