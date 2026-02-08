"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Youtube, Linkedin } from "lucide-react";

const ventures = [
  {
    name: "The Lab",
    tag: "Design & Engineering",
    description: "Software design & R&D",
    href: "https://lab.ordinarycompany.design",
    logo: "/lab/the-lab-logo.svg",
    external: false,
  },
  {
    name: "Guildworks",
    tag: "Worlds & Stories",
    description: "TTRPGs, games & animation",
    href: "https://guildworks.itch.io/",
    logo: "/main/guildworks-logo.svg",
    external: true,
  },
];

const links = [
  { label: "Instagram", href: "https://www.instagram.com/ordinarycompany.design/", icon: Instagram },
  { label: "YouTube", href: "https://www.youtube.com/@Ordinary-Company", icon: Youtube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ordinary-company", icon: Linkedin },
];

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col px-6 sm:px-12 bg-neutral-50">
      {/* Subtle dot grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #d4d4d4 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-20 flex justify-between items-center py-8 mb-8 sm:mb-0 w-full max-w-5xl mx-auto"
      >
        <img
          src="/main/ordinary-logo.svg"
          alt="Ordinary Company"
          className="h-6 w-auto"
        />
        <nav className="flex gap-1 text-neutral-400">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-2 hover:text-neutral-900 transition-colors"
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </nav>
      </motion.header>

      {/* Center content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        <motion.img
          src="/main/ordinary-logo-no-bg.svg"
          alt="Ordinary Company"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-48 sm:w-64 h-auto mb-6 text-neutral-700"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-neutral-400 text-sm sm:text-base text-center max-w-md mb-10 leading-relaxed"
        >
          A creative collective chasing joy, meaning, and connection.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-mono mb-4"
        >
          Our ventures
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl"
        >
          {ventures.map((venture, i) => (
            <motion.a
              key={venture.name}
              href={venture.href}
              target={venture.external ? "_blank" : undefined}
              rel={venture.external ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col items-center text-center p-8 pb-6 bg-white border border-neutral-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-neutral-900 hover:shadow-lg"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-neutral-200 group-hover:border-neutral-900 transition-colors rounded-tl" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-neutral-200 group-hover:border-neutral-900 transition-colors rounded-tr" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-neutral-200 group-hover:border-neutral-900 transition-colors rounded-bl" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-neutral-200 group-hover:border-neutral-900 transition-colors rounded-br" />

              {/* Index number */}
              <span className="absolute top-4 right-5 text-[10px] font-mono text-neutral-300 group-hover:text-neutral-500 transition-colors">
                0{i + 1}
              </span>

              {/* Logo area */}
              <div className="flex items-center justify-center h-28 mb-5">
                <img
                  src={venture.logo}
                  alt={venture.name}
                  className="max-h-full w-auto max-w-[180px] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Divider */}
              <div className="w-12 h-px bg-neutral-200 group-hover:bg-neutral-900 group-hover:w-16 transition-all duration-300 mb-4" />

              {/* Tag */}
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-mono mb-2">
                {venture.tag}
              </span>

              {/* Description */}
              <p className="text-sm text-neutral-500 mb-4">
                {venture.description}
              </p>

              {/* Enter button */}
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors">
                Enter
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </motion.a>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 py-8 text-center"
      >
        <p className="text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} Ordinary Company Group LLC
        </p>
      </motion.footer>
    </div>
  );
}
