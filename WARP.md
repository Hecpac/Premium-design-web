# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common commands (npm)
This repo is a Next.js (App Router) app using npm (has `package-lock.json`).

- Install deps (clean, reproducible):
  - `npm ci`
- Dev server:
  - `npm run dev`
- Production build:
  - `npm run build`
- Run production server locally (after build):
  - `npm run start`
- Lint:
  - `npm run lint`
  - Autofix (where possible): `npm run lint -- --fix`
  - Lint a single file/dir: `npm run lint -- src/app/page.tsx`
- Typecheck (no dedicated script currently; TypeScript is in devDependencies):
  - `npx tsc -p tsconfig.json --noEmit`
- Bundle analyzer (wired via `@next/bundle-analyzer` in `next.config.ts`):
  - PowerShell:
    - `$env:ANALYZE='true'; npm run build`
  - Cross-platform:
    - `npx cross-env ANALYZE=true npm run build`

Tests:
- No test runner/config is currently present (no `test` script and no `*.test.*`/`*.spec.*` found).

## High-level architecture
### Runtime stack
- Next.js App Router (`src/app/*`) with React 19.
- Tailwind CSS v4 (CSS-first via `@import "tailwindcss";`) and design tokens in CSS variables.
- Framer Motion for animation; global wrapper uses `LazyMotion`.
- Vercel Analytics + Speed Insights are mounted in the root layout.

### App Router structure (server-first)
- `src/app/layout.tsx`
  - Global fonts via `next/font` (Inter + Playfair Display) and sets CSS variables (`--font-inter`, `--font-playfair`).
  - Global SEO metadata and JSON-LD (`jsonLd` graph) injected in `<head>`.
  - Wraps the app with `Providers` (Framer Motion) and `WebVitals` (dev overlay + beacon).
  - Mounts `@vercel/analytics` and `@vercel/speed-insights`.
- `src/app/page.tsx`
  - Marketing homepage composed from feature sections (hero, trust signals, bento grid, portfolio, insights, FAQ, contact).
- `src/app/projects/page.tsx`
  - Portfolio listing page; server component using `searchParams` to filter and `getAllProjects()` as data source.
- `src/app/insights/page.tsx`
  - Insights listing page using `getAllInsights()`.
- Dynamic routes exist as folders but are currently empty:
  - `src/app/projects/[slug]/`
  - `src/app/insights/[slug]/`

### Data “layer” (static in-repo content)
This project currently uses in-repo static arrays as the source of truth (no CMS):
- `src/lib/projects.ts`: `PROJECTS` + helpers (`getAllProjects`, `getProjectBySlug`, etc.).
- `src/lib/insights.ts`: `INSIGHTS` + helpers (`getAllInsights`, `getInsightBySlug`, etc.).

If you add project/insight detail pages, they should read from these helpers and use `getAll*Slugs()` for static generation.

### UI components vs feature components
- `src/components/ui/*`
  - “UI primitives” used across pages (e.g., `Button`, `Navbar`, `Accordion`).
  - `src/lib/utils.ts` provides `cn()` (clsx + tailwind-merge) and should be used for class composition.
- `src/components/features/*`
  - Page sections and business/marketing blocks.
  - Notable:
    - `HeroScene` (`src/components/features/HeroScene/*`): LCP-critical hero background image + motion wrappers.
    - `SelectedWorks` (`src/components/features/SelectedWorks/*`): server wrapper passing typed data into a client component for filtering/animation.
    - `ContactCapture`: client form with `react-hook-form` + Zod.

### Styling / design tokens
- `src/app/globals.css`
  - Defines HSL tokens (e.g., `--background`, `--primary`) and maps them via Tailwind v4 `@theme inline`.
  - Also contains global typographic scale and some shared utility classes (e.g., `.section-spacing`, `.editorial-card`).

### Assets
- Static images live in `public/images/*`.
  - Insights images: `public/images/insights/*`
  - Portfolio images: `public/images/selected-works/*`

### Web Vitals pipeline (dev overlay + server endpoint)
- Client reporter: `src/components/web-vitals.tsx`
  - Uses `useReportWebVitals` and sends metrics to `/api/vitals` via `sendBeacon` when available.
  - Shows a small “LIVE VITALS” overlay only in development.
- Server endpoint: `src/app/api/vitals/route.ts`
  - Accepts POSTs and currently logs metrics to stdout (good for Vercel logs).

## Project-specific agent rules (read before changing UI/perf-sensitive code)
This repo contains a detailed rulebook in `.agentrules` (performance, motion, images, file conventions, etc.). Treat it as a source of truth.

Key constraints that affect most changes:
- Core Web Vitals targets are strict (LCP/INP/CLS budgets and a small initial bundle budget).
- Images: prefer `next/image`, avoid CLS (explicit sizing or aspect-ratio wrappers), prioritize above-the-fold hero imagery.
- Fonts: only use `next/font` in the root layout (avoid CSS `@import`/`<link>` for Google Fonts).
- Animation: respect `prefers-reduced-motion`; prefer transform/opacity animations.
- App Router convention: server components by default; add `'use client'` only when necessary.

## Additional product/design docs
- `docs/project_brief.md`: business goals + narrative framing.
- `docs/style_guide.md` and `docs/style_references/style_guide.md`: design references and intended “cinematic luxury” direction.

When making visual changes, cross-check against `src/app/globals.css` (actual tokens) and `.agentrules` (performance and implementation rules).