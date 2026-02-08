<p align="center">
  <img src="public/main/ordinary-logo-no-bg.svg" alt="Ordinary Company" width="200" />
</p>

<p align="center">
  <strong>A creative collective chasing joy, meaning, and connection.</strong>
</p>

<p align="center">
  <a href="https://ordinarycompany.design">
    <img src="https://img.shields.io/badge/Live-ordinarycompany.design-black?style=flat-square" alt="Website" />
  </a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat-square&logo=vercel" alt="Vercel" />
</p>

---

## About

This is the source code for the [Ordinary Company Group LLC](https://ordinarycompany.design) website. Ordinary Company is a creative collective of artists, designers, storytellers, musicians, and creatives based in Cincinnati, Ohio.

The site serves as a hub for the company's ventures:

- **[The Lab](https://lab.ordinarycompany.design)** &mdash; Software design & R&D
- **[Guildworks](https://guildworks.itch.io/)** &mdash; TTRPGs, games & animation

## Architecture

```
app/
├── layout.tsx           Root layout (Geist font, global styles)
├── globals.css          Shared styles + 404 page
├── (main)/              Main site route group
│   ├── layout.tsx       Light minimal theme + OG metadata
│   ├── page.tsx         Splash page with venture cards
│   └── not-found.tsx    Themed 404 page
└── lab/                 The Lab subdomain
    ├── layout.tsx       Lab theme (Geist Mono) + OG metadata
    ├── page.tsx         Section orchestrator
    ├── lab.css          Lab-specific styles
    └── components/      HeroSection, ProfileSection, WorkSection, etc.
```

**Subdomain routing:** `proxy.ts` detects the `lab` subdomain and rewrites requests to the `/lab` route, allowing `lab.ordinarycompany.design` to serve the Lab page from the same Next.js app.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **3D:** Three.js (Lab background)
- **Icons:** Lucide React
- **Hosting:** Vercel

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the main site.

To test the Lab subdomain locally, visit `http://lab.localhost:3000`.

---

<p align="center">
  <sub>&copy; 2026 Ordinary Company Group LLC. All rights reserved.</sub>
</p>
