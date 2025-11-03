'use client';

import Image from "next/image";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  warm: boolean;
};

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
                A creative agency based in Cincinnati, Ohio.
              </p>
              <div className="animate-on-scroll mt-10 flex justify-center [animation:fadeSlideIn_1s_ease-out_0.4s_both]">
                <a
                  href="mailto:contact.theordinarycompany@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/15 font-sans"
                >
                  Contact Us
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
              <p className="text-sm text-white/60 font-sans">
                A creative agency based in Cincinnati, Ohio. Full website coming soon.
              </p>
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
                Location
              </h3>
              <ul className="space-y-3">
                <li>
                  <span className="text-sm text-white/60 font-sans">
                    Cincinnati, Ohio
                  </span>
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
