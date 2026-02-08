"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, Github } from "lucide-react";

export function ProfileSection() {
  return (
    <section id="about" className="sm:px-8 px-6 pt-20 pb-16 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Logo / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="glitch-logo w-full p-8">
              <img
                src="/lab/the-lab-logo.svg"
                alt="The Lab by Ordinary Company"
                className="glitch-logo__img"
              />
              <div className="glitch-logo__layer glitch-logo__layer--cyan">
                <img src="/lab/the-lab-logo.svg" alt="" aria-hidden="true" />
              </div>
              <div className="glitch-logo__layer glitch-logo__layer--red">
                <img src="/lab/the-lab-logo.svg" alt="" aria-hidden="true" />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="flex flex-col justify-center h-full">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-6"
              >
                <ArrowDownRight className="w-4 h-4 text-neutral-400" />
                <div className="h-px flex-1 bg-neutral-200"></div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl font-semibold text-neutral-900 mb-6 tracking-tight"
              >
                Where Design Meets Engineering
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed text-neutral-600 mb-8 font-geist-mono"
              >
                The Lab is a software design &amp; R&amp;D group owned and
                operated by Ordinary Company Group LLC, based in Cincinnati,
                Ohio. We design and build beautiful digital products, crafting
                interfaces with clean design systems and bringing them to life
                with code.
              </motion.p>

              {/* Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 gap-4 mb-10"
              >
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-900 font-geist-mono uppercase tracking-wide">
                    What We Do
                  </h3>
                  <ul className="text-sm text-neutral-500 space-y-2">
                    <li className="font-geist-mono">&bull; UI/UX Design</li>
                    <li className="font-geist-mono">
                      &bull; Full-Stack Development
                    </li>
                    <li className="font-geist-mono">&bull; Design Systems</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-900 font-geist-mono uppercase tracking-wide">
                    Focus Areas
                  </h3>
                  <ul className="text-sm text-neutral-500 space-y-2">
                    <li className="font-geist-mono">
                      &bull; Product Design &amp; R&amp;D
                    </li>
                    <li className="font-geist-mono">
                      &bull; Creative Technology
                    </li>
                    <li className="font-geist-mono">
                      &bull; Open Source
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex gap-4"
              >
                <a
                  href="#products"
                  className="px-6 py-3 rounded-lg bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors font-geist-mono text-sm"
                >
                  View our products
                </a>
                <a
                  href="https://github.com/The-Lab-by-Ordinary-Company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-200 text-neutral-900 font-medium hover:bg-neutral-50 transition-colors font-geist-mono text-sm"
                >
                  <Github className="w-4 h-4" />
                  Follow on GitHub
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
