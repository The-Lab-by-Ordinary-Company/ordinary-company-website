"use client";

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
        className="relative isolate flex h-screen flex-col overflow-hidden"
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
              <div className="mb-6 inline-flex items-center rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/15 backdrop-blur animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
                <span className="text-sm font-medium text-white/90 font-sans">
                  Full Site Coming Soon
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
              <div className="animate-on-scroll mt-8 flex justify-center gap-4 [animation:fadeSlideIn_1s_ease-out_0.3s_both]">
                <a
                  href="https://www.youtube.com/@Ordinary-Company"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="YouTube"
                  className="social-icon-cyber group inline-flex h-12 w-12 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white"
                >
                  <span className="cyber-tooltip">YouTube</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.12 5 12 5 12 5s-6.12 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.88 19 12 19 12 19s6.12 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77 26.2 26.2 0 0 0 .4-4.8 26.2 26.2 0 0 0-.4-4.8ZM10.5 14.7V9.3L15.5 12Z"
                    />
                  </svg>
                  <span className="sr-only">YouTube</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/ordinary-company"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="social-icon-cyber group inline-flex h-12 w-12 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white"
                >
                  <span className="cyber-tooltip">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3.96v12H3Zm6.24 0H13v1.62h.05c.55-1.05 1.9-2.16 3.91-2.16 4.19 0 4.96 2.76 4.96 6.36V21H17v-5.28c0-1.26-.03-2.88-1.76-2.88-1.76 0-2.03 1.38-2.03 2.78V21H9.24Z"
                    />
                  </svg>
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a
                  href="https://ordinary-company.itch.io/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="itch.io"
                  className="social-icon-cyber group inline-flex h-12 w-12 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white"
                >
                  <span className="cyber-tooltip">itch.io</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 245.37069 220.73612"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M31.99 1.365C21.287 7.72.2 31.945 0 38.298v10.516C0 62.144 12.46 73.86 23.773 73.86c13.584 0 24.902-11.258 24.903-24.62 0 13.362 10.93 24.62 24.515 24.62 13.586 0 24.165-11.258 24.165-24.62 0 13.362 11.622 24.62 25.207 24.62h.246c13.586 0 25.208-11.258 25.208-24.62 0 13.362 10.58 24.62 24.164 24.62 13.585 0 24.515-11.258 24.515-24.62 0 13.362 11.32 24.62 24.903 24.62 11.313 0 23.773-11.714 23.773-25.046V38.298c-.2-6.354-21.287-30.58-31.988-36.933C180.118.197 157.056-.005 122.685 0c-34.37.003-81.228.54-90.697 1.365zm65.194 66.217a28.025 28.025 0 0 1-4.78 6.155c-5.128 5.014-12.157 8.122-19.906 8.122a28.482 28.482 0 0 1-19.948-8.126c-1.858-1.82-3.27-3.766-4.563-6.032l-.006.004c-1.292 2.27-3.092 4.215-4.954 6.037a28.5 28.5 0 0 1-19.948 8.12c-.934 0-1.906-.258-2.692-.528-1.092 11.372-1.553 22.24-1.716 30.164l-.002.045c-.02 4.024-.04 7.333-.06 11.93.21 23.86-2.363 77.334 10.52 90.473 19.964 4.655 56.7 6.775 93.555 6.788h.006c36.854-.013 73.59-2.133 93.554-6.788 12.883-13.14 10.31-66.614 10.52-90.474-.022-4.596-.04-7.905-.06-11.93l-.003-.045c-.162-7.926-.623-18.793-1.715-30.165-.786.27-1.757.528-2.692.528a28.5 28.5 0 0 1-19.948-8.12c-1.862-1.822-3.662-3.766-4.955-6.037l-.006-.004c-1.294 2.266-2.705 4.213-4.563 6.032a28.48 28.48 0 0 1-19.947 8.125c-7.748 0-14.778-3.11-19.906-8.123a28.025 28.025 0 0 1-4.78-6.155 27.99 27.99 0 0 1-4.736 6.155 28.49 28.49 0 0 1-19.95 8.124c-.27 0-.54-.012-.81-.02h-.007c-.27.008-.54.02-.813.02a28.49 28.49 0 0 1-19.95-8.123 27.992 27.992 0 0 1-4.736-6.155zm-20.486 26.49l-.002.01h.015c8.113.017 15.32 0 24.25 9.746 7.028-.737 14.372-1.105 21.722-1.094h.006c7.35-.01 14.694.357 21.723 1.094 8.93-9.747 16.137-9.73 24.25-9.746h.014l-.002-.01c3.833 0 19.166 0 29.85 30.007L210 165.244c8.504 30.624-2.723 31.373-16.727 31.4-20.768-.773-32.267-15.855-32.267-30.935-11.496 1.884-24.907 2.826-38.318 2.827h-.006c-13.412 0-26.823-.943-38.318-2.827 0 15.08-11.5 30.162-32.267 30.935-14.004-.027-25.23-.775-16.726-31.4L46.85 124.08c10.684-30.007 26.017-30.007 29.85-30.007zm45.985 23.582v.006c-.02.02-21.863 20.08-25.79 27.215l14.304-.573v12.474c0 .584 5.74.346 11.486.08h.006c5.744.266 11.485.504 11.485-.08v-12.474l14.304.573c-3.928-7.135-25.79-27.215-25.79-27.215v-.006l-.003.002z"
                    />
                  </svg>
                  <span className="sr-only">itch.io</span>
                </a>
                <a
                  href="https://www.instagram.com/ordinarycompany.design/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="social-icon-cyber group inline-flex h-12 w-12 items-center justify-center rounded-sm border border-white/20 bg-white/5 text-white"
                >
                  <span className="cyber-tooltip">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7a2 2 0 0 0-2-2H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 12 10.5Zm6-3.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  <span className="sr-only">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-6 left-0 right-0 z-10 text-center text-xs text-white/40 font-sans">
          © 2025 Ordinary Company Group LLC. All rights reserved.
        </p>
      </section>
    </>
  );
}
