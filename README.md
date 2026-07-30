# Beeswax Scotland — Premium Redesign (Next.js 16 + GSAP)

A cinematic, animation-first ecommerce frontend prototype for Beeswax Scotland,
built with Next.js 16 (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger,
and Lenis smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Structure

- `app/` — routes, root layout, global styles
- `components/sections/` — one component per homepage section (Hero, BrandStory, WhyBeeswax, …)
- `components/ui/` — shared UI primitives (CustomCursor, MagneticButton, Loader, DripRail)
- `hooks/` — `useLenis` (smooth scroll setup), `useMagnetic` (magnetic button physics)
- `animations/` — reusable GSAP animation helpers (scroll reveals)
- `lib/gsap.ts` — GSAP plugin registration, shared across client components
- `constants/` — product, ingredient and navigation data
- `types/` — shared TypeScript types

## Notes

- Every section component is a Client Component (`"use client"`) since GSAP/ScrollTrigger
  need the DOM and browser APIs.
- `useLenis` mounts once in `app/page.tsx` and syncs Lenis' RAF loop with GSAP's ticker
  so ScrollTrigger and smooth scroll stay in sync.
- Product and ingredient images point to Unsplash placeholders — swap in real product
  photography before shipping.
- Replace the placeholder copy in `constants/` with approved brand copy before launch.
