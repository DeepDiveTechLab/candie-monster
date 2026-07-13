# candie.monster — landing site

Single-page, black-background, video-driven landing site for **candie.monster**, a
futuristic neural-AI interface product. Built with **React + TypeScript + Vite +
Tailwind CSS + Framer Motion**. Primary typeface is **Space Mono** throughout.

## Run locally
```bash
npm install
npm run dev      # Vite dev server
npm run build    # production build to /dist
npm run preview  # serve the production build
npm run typecheck# optional strict TypeScript check
```

## No-build preview
Open **`preview.html`** directly in a browser — it loads React, Framer Motion and
Tailwind from CDNs, so there's nothing to install. Needs an internet connection.

## Sections
1. **Hero** — mouse-scrubbed background video, dot grid, Anton SC watermark, `ScrambleIn` headings, 800 ms entrance.
2. **Cinematic text** — scroll-driven 3D paragraph (`useScroll`→`useSpring`→`useTransform`→`useMotionTemplate`).
3. **Metrics** — three animated stats.
4. **Technology / Adaptive Intel** — heading + 4-item capability grid.
5. **Architecture** — pure-black section with three layer cards.
6. **Footer** — half-width video + candie.monster brand block.

Branding is **candie.monster** everywhere. No routing, no state management, no backend.
