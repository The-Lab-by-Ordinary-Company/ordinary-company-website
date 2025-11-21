"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useInView } from "framer-motion";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  warm: boolean;
};

const ABOUT_PARAGRAPHS = [
  "We're artists, designers, technologists, storytellers, musicians, and creatives chasing something bigger: joy, meaning, and connection.",
  "Every project we're a part of is crafted by humans, for humans. No shortcuts. No fluff. Just the real stuff that matters.",
  "We're Ordinary Company. And we're just getting started.",
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const aboutTextRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hasTypedAbout = useRef(false);
  const isAboutTextInView = useInView(aboutTextRef, { once: true, amount: 0.4 });
  const [typedParagraphs, setTypedParagraphs] = useState<string[]>(
    () => ABOUT_PARAGRAPHS.map(() => "")
  );

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".animate-on-scroll")
    );

    if (elements.length === 0) {
      return;
    }

    const once = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            if (once) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    const canvas = canvasRef.current;

    if (!section || !canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let animationFrameId = 0;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const createStars = () => {
      const density = (width * height) / 9000;
      const starCount = Math.max(90, Math.min(Math.floor(density), 320));

      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: 0.2 + Math.random() * 0.8,
        r: 0.5 + Math.random() * 1.6,
        vx: -0.15 - Math.random() * 0.35,
        vy: (Math.random() - 0.5) * 0.12,
        warm: Math.random() < 0.4,
      }));
    };

    const drawBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#0b0a09");
      gradient.addColorStop(1, "#14100e");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const radialOne = ctx.createRadialGradient(
        width * 0.72,
        height * 0.22,
        0,
        width * 0.72,
        height * 0.22,
        Math.max(width, height) * 0.9
      );
      radialOne.addColorStop(0.0, "rgba(251,146,60,0.20)");
      radialOne.addColorStop(0.5, "rgba(234,88,12,0.10)");
      radialOne.addColorStop(1.0, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = radialOne;
      ctx.fillRect(0, 0, width, height);

      const radialTwo = ctx.createRadialGradient(
        width * 0.18,
        height * 0.78,
        0,
        width * 0.18,
        height * 0.78,
        Math.max(width, height) * 0.7
      );
      radialTwo.addColorStop(0.0, "rgba(253,186,116,0.12)");
      radialTwo.addColorStop(0.6, "rgba(194,65,12,0.08)");
      radialTwo.addColorStop(1.0, "rgba(0,0,0,0)");
      ctx.fillStyle = radialTwo;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      createStars();
    };

    const render = () => {
      drawBackground();

      stars.forEach((star) => {
        star.x += star.vx * (0.8 + star.z);
        star.y += star.vy * (0.8 + star.z);

        if (star.x < -2) {
          star.x = width + 2;
          star.y = Math.random() * height;
        }
        if (star.y < -2) {
          star.y = height + 2;
        }
        if (star.y > height + 2) {
          star.y = -2;
        }

        const alpha = 0.55 + star.z * 0.45;
        ctx.beginPath();
        ctx.fillStyle = star.warm
          ? `rgba(251,146,60,${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.arc(star.x, star.y, star.r * (0.8 + star.z), 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = star.warm
          ? `rgba(251,146,60,${alpha * 0.6})`
          : `rgba(255,255,255,${alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - 6 * star.z, star.y - 2 * star.vy);
        ctx.stroke();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    resize();
    render();

    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (!isAboutTextInView || hasTypedAbout.current) {
      return;
    }

    hasTypedAbout.current = true;

    const typingSpeed = 35;
    const paragraphDelay = 600;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let cumulativeDelay = 0;

    ABOUT_PARAGRAPHS.forEach((text, index) => {
      for (let i = 0; i <= text.length; i += 1) {
        const timeout = setTimeout(() => {
          setTypedParagraphs((prev) => {
            const next = [...prev];
            next[index] = text.slice(0, i);
            return next;
          });
        }, cumulativeDelay + i * typingSpeed);
        timeouts.push(timeout);
      }

      cumulativeDelay += text.length * typingSpeed + paragraphDelay;
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isAboutTextInView, setTypedParagraphs]);

  const handleScrollToAbout = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      aboutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    []
  );

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative isolate flex min-h-screen flex-col overflow-hidden"
      >
        <div className="absolute inset-0 bg-neutral-950" />
        <canvas
          id="hero-space"
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_70%_20%,rgba(251,146,60,0.18),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_80%,rgba(234,88,12,0.12),transparent_60%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />
        <div className="relative z-10 flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
                <span className="inline-flex items-center rounded-full bg-white/90 pt-0.5 pr-2 pb-0.5 pl-2 text-xs font-medium text-neutral-900 font-sans">
                  Coming Soon
                </span>
                <span className="text-sm font-medium text-white/90 font-sans">
                  Full website launching soon
                </span>
              </div>
              <div className="animate-on-scroll flex justify-center [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
                <Image
                  src="/logo.png"
                  alt="Ordinary Company logo"
                  width={958}
                  height={395}
                  priority
                  className="h-auto w-full max-w-[600px]"
                  sizes="(min-width: 1024px) 600px, (min-width: 768px) 480px, (min-width: 640px) 400px, 300px"
                />
              </div>
              <p className="animate-on-scroll mt-6 mx-auto max-w-2xl text-base text-white/80 sm:text-lg [animation:fadeSlideIn_1s_ease-out_0.3s_both]">
                A Creative Studio based in Cincinnati, Ohio.
              </p>
              <div className="animate-on-scroll mt-10 flex justify-center [animation:fadeSlideIn_1s_ease-out_0.4s_both]">
                <a
                  href="#about"
                  onClick={handleScrollToAbout}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15 font-sans"
                >
                  About
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-lucide="arrow-right"
                    className="lucide lucide-arrow-right h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="hidden mx-auto mt-20 max-w-5xl">
              {/* Partners hidden for coming soon */}
            </div>
          </div>
        </div>
      </section>
      <motion.section
        id="about"
        ref={aboutRef}
        className="relative bg-black py-40 sm:py-48"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="mx-auto max-w-4xl px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <motion.h2
            className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60 font-sans"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            WHO WE ARE
          </motion.h2>
          <motion.div
            className="relative mt-8 text-lg leading-relaxed text-white/80 font-sans"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            ref={aboutTextRef}
            aria-live="polite"
          >
            <div
              className="pointer-events-none select-none space-y-6 opacity-0"
              aria-hidden="true"
            >
              {ABOUT_PARAGRAPHS.map((paragraph) => (
                <p key={`placeholder-${paragraph}`}>{paragraph}</p>
              ))}
            </div>
            <div className="absolute inset-0">
              <div className="space-y-6">
                {typedParagraphs.map((text, index) => (
                  <p key={ABOUT_PARAGRAPHS[index]}>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
      <section className="hidden relative bg-neutral-950 pt-20 pb-20">
        {/* Hidden: previous content not needed for coming soon */}
      </section>
      <section className="hidden relative bg-neutral-900/30 py-20">
        {/* Hidden: previous content not needed for coming soon */}
      </section>
      <section className="hidden relative bg-neutral-900/30 py-20">
        {/* Hidden: previous content not needed for coming soon */}
      </section>
      <section className="hidden relative bg-neutral-950 py-20">
        {/* Hidden: previous content not needed for coming soon */}
      </section>
      <section className="hidden relative bg-neutral-900/50 py-20">
        {/* Hidden: previous content not needed for coming soon */}
      </section>
      <footer className="relative border-t border-white/10 bg-neutral-950 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
            <div className="col-span-1 md:col-span-1">
              <a href="#" className="mb-4 inline-flex">
                <Image
                  src="/logo_w.png"
                  alt="Ordinary Company"
                  width={1099}
                  height={531}
                  className="h-12 w-auto"
                  priority
                />
              </a>
              <div className="mt-6 flex gap-3">
                <a
                  href="mailto:contact.theordinarycompany@gmail.com"
                  className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white px-4 text-sm font-medium text-neutral-900 transition hover:bg-white/90 font-sans"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium text-white font-sans">
                Social
              </h3>
              <ul className="flex flex-wrap items-center gap-4">
                <li>
                  <a
                    href="https://www.youtube.com/@Ordinary-Company"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="YouTube"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 transition group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.12 5 12 5 12 5s-6.12 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.88 19 12 19 12 19s6.12 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77 26.2 26.2 0 0 0 .4-4.8 26.2 26.2 0 0 0-.4-4.8ZM10.5 14.7V9.3L15.5 12Z"
                      />
                    </svg>
                    <span className="sr-only">YouTube</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/ordinary-company"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="LinkedIn"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 transition group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3.96v12H3Zm6.24 0H13v1.62h.05c.55-1.05 1.9-2.16 3.91-2.16 4.19 0 4.96 2.76 4.96 6.36V21H17v-5.28c0-1.26-.03-2.88-1.76-2.88-1.76 0-2.03 1.38-2.03 2.78V21H9.24Z"
                      />
                    </svg>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://ordinary-company.itch.io/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="itch.io"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 transition group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M4.5 4h15l2 4.5V18a2 2 0 0 1-2 2h-6l-1.5-1.5L10.5 20h-6a2 2 0 0 1-2-2V8.5Zm15.36 5.45L18.9 6H5.1l-1 2.45L4 12h2v6h2v-3.5a4 4 0 0 1 8 0V18h2v-6h2Zm-7.86 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
                      />
                    </svg>
                    <span className="sr-only">itch.io</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ordinarycompany.design/"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Instagram"
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 transition group-hover:scale-105"
                      aria-hidden="true"
                    >
                      <path
                        fill="currentColor"
                        d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 12 10.5Zm6-3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
            <p className="text-sm text-white/60 font-sans">
              © 2025 Ordinary Company Group LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="mailto:contact.theordinarycompany@gmail.com"
                className="text-sm text-white/60 transition hover:text-white font-sans"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
