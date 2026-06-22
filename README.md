# VISIUM — Walk Through Reality

The launch experience for **VISIUM**, a Real Estate 5.0 platform that turns properties into photorealistic, walkable digital twins powered by Gaussian Splatting, spatial computing and real-time rendering.

This is not a generic SaaS landing page — it's a cinematic, scroll-driven product film built to feel like Apple Vision Pro × Tesla × Linear × Stripe × Airbnb Luxe.

---

## ✦ Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS** + custom design tokens |
| 2D Motion | **Framer Motion** + **GSAP** |
| 3D | **Three.js** + **React Three Fiber** + **drei** |
| Fonts | Inter (UI) + Space Grotesk (display) |

---

## ✦ Getting started

```bash
cd "VISIUM WEB"
npm install
npm run dev
```

Open <http://localhost:3000>.

Production build:

```bash
npm run build && npm run start
```

> Hero imagery is streamed from Unsplash. Drop your own renders into `public/` and update the URLs in `data/` and the section components to go fully offline.

---

## ✦ Design system

Defined in `tailwind.config.ts` and `styles/globals.css`.

| Token | Value | Use |
|---|---|---|
| `--void` | `#050505` | Background |
| `--primary` | `#00D084` | Brand / CTAs |
| `--secondary` | `#1B1F24` | Surfaces |
| `--accent` | `#FFFFFF` | Text |
| `--highlight` | `#6FFFE9` | Glow accents |

Signatures: glassmorphism (`.glass`), gradient headlines (`.text-gradient`), the cinematic **arc-glow** light source (`.arc-glow`), film grain, and a spatial `cubic-bezier(0.16, 1, 0.3, 1)` easing used everywhere.

---

## ✦ Architecture

```
VISIUM WEB/
├── app/                  # App Router: layout, page, metadata, icon
├── components/
│   ├── ui/               # GlassCard, GradientText, SectionHeading,
│   │                     #   MagneticButton, Reveal, Marquee
│   ├── sections/         # The 6 storytelling sections + CTA
│   ├── Navbar / Footer / Hero / HeroCanvas / ScrollProgress
├── three/                # R3F scene: HeroScene, DigitalTwin,
│   │                     #   SpatialGrid, Particles, Rig
├── animations/           # Shared Framer Motion variants
├── hooks/                # useMousePosition, useMediaQuery, useScrollProgress
├── data/                 # Content: nav, stats, technology, industries
├── lib/ · utils/         # cn(), math helpers, constants
├── types/                # Shared TS types
└── styles/               # globals.css + design tokens
```

---

## ✦ Storytelling flow (10 sections)

1. **Hero** — `WALK THROUGH REALITY` over a live Three.js digital-twin scene.
2. **The Problem** — why static photos, video and floor plans fail.
3. **The Solution** — pinned scroll-morph *looking at* → *walking through*, resolving into Capture · Reconstruct · Explore.
4. **Immersive Exploration** — freedom of movement, spatial HUD mock.
5. **Gaussian Splatting** — sticky visual + scroll-synced steps + animated stat counters.
6. **Digital Twin Platform** — bento grid of capabilities with 3D tilt cards.
7. **Industry Use Cases** — agencies, developers, luxury, hospitality, construction, portals.
8. **Future Vision** — *the operating system for spatial real estate.*
9. **Call To Action** — request a demo.
10. **Footer** — early-access capture + premium wordmark.

### Motion stack
- **Framer Motion** — entrance reveals, parallax, magnetic buttons, tilt cards, count-ups, pinned scroll morphs.
- **GSAP + ScrollTrigger** — word-by-word `SplitReveal` headlines, staggered pillars, scroll-synced active states (`lib/gsap.ts`, `hooks/useGsap.ts`).
- Fully responsive, with a static fallback under `prefers-reduced-motion`.

---

## ✦ The 3D hero

A client-only `<Canvas>` (`three/HeroScene.tsx`, loaded via `next/dynamic` with `ssr:false`):

- a floating **digital twin** — stacked architectural floor-plates with glowing wireframes, a luminous core and an orbiting scan ring;
- a scrolling **spatial grid** floor;
- additive **volumetric particles**;
- cinematic spot + point lighting and ACES tone mapping;
- a **camera parallax rig** that eases toward the pointer.

Performance: `AdaptiveDpr`, capped `dpr={[1, 2]}`, and a full static fallback for `prefers-reduced-motion`.

---

## ✦ Accessibility & performance

- Honors `prefers-reduced-motion` (3D disabled, animations stilled).
- Semantic landmarks, keyboard-navigable nav, focus-visible CTAs.
- Lazy 3D, image masking and additive blending kept GPU-light.

© VISIUM Spatial, Inc. — Real Estate 5.0.
