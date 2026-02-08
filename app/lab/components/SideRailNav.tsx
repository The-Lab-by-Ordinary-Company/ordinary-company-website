"use client";

import { motion } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";

function smoothScroll(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function NavButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="group grid place-items-center hover:text-black hover:bg-neutral-100 transition relative text-neutral-400 w-10 h-10 rounded-full cursor-pointer"
      onClick={onClick}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
      {/* Tooltip: above on mobile, right on desktop */}
      <span className="absolute bottom-12 lg:bottom-auto lg:left-12 bg-neutral-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-geist-mono">
        {label}
      </span>
    </button>
  );
}

export function SideRailNav() {
  return (
    <>
      {/* Desktop: fixed left rail */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-30"
      >
        <div className="flex flex-col gap-2 bg-white border-neutral-200 border rounded-full p-2 shadow-lg items-center">
          <NavButton
            icon={Home}
            label="Home"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <NavButton icon={Briefcase} label="Projects" onClick={() => smoothScroll("products")} />
          <NavButton icon={User} label="About" onClick={() => smoothScroll("about")} />
          <NavButton icon={Mail} label="Contact" onClick={() => smoothScroll("contact")} />
        </div>
      </motion.aside>

      {/* Mobile: fixed bottom bar */}
      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
        className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="flex flex-row gap-2 bg-white border-neutral-200 border rounded-full p-2 shadow-lg items-center">
          <NavButton
            icon={Home}
            label="Home"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <NavButton icon={Briefcase} label="Projects" onClick={() => smoothScroll("products")} />
          <NavButton icon={User} label="About" onClick={() => smoothScroll("about")} />
          <NavButton icon={Mail} label="Contact" onClick={() => smoothScroll("contact")} />
        </div>
      </motion.aside>
    </>
  );
}
