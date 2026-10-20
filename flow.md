# Flow.md — Build Log & Explanation

> This document tracks every phase of the portfolio build, explaining **what was done**, **how it works**, and **what each piece implements**.

---

## Phase 0 — Setup ✅

### What was done
1. **Scaffolded the Next.js project** using `create-next-app` with:
   - JavaScript (NOT TypeScript)
   - App Router (`app/` directory)
   - Tailwind CSS v4
   - ESLint
   - Import alias `@/*`
   
2. **Installed extra dependencies:**
   - `framer-motion` — animation library for scroll reveals, hover effects, staggered children
   - `lucide-react` — lightweight icon library (arrow icons, social icons, etc.)

3. **Created `data/portfolio.js`** — the single source of truth for ALL site content (name, socials, about, education, skills, achievements, certifications, positions, stats). No content is hard-coded in components. Projects live separately in `data/projects.js` so adding one is a single-file edit.

4. **Created the full folder structure** with placeholder components:

```
portfolio_new/
├── app/
│   ├── layout.js              # Root layout (fonts, metadata, Nav, Footer)
│   ├── page.js                # Home page (composes all sections)
│   ├── globals.css            # Design tokens & base styles
│   ├── not-found.js           # 404 page
│   └── work/
│       ├── page.js            # All projects listing
│       └── [slug]/page.js     # Individual project pages (static)
├── components/
│   ├── Nav.jsx                # Sticky navigation
│   ├── Footer.jsx             # Footer with socials
│   ├── MotionToggle.jsx       # ON/OFF animation toggle
│   ├── SkipLink.jsx           # Accessibility skip-to-content
│   ├── Hero.jsx               # Hero section
│   ├── ImpactStrip.jsx        # 4 impact numbers
│   ├── About.jsx              # About + education
│   ├── Projects.jsx           # Project cards section
│   ├── ProjectCard.jsx        # Single project card
│   ├── Skills.jsx             # Skills grouped by category
│   ├── Achievements.jsx       # Big-stat achievement cards
│   ├── Certifications.jsx     # Certification list
│   ├── Timeline.jsx           # Journey timeline
│   ├── Leadership.jsx         # Positions of responsibility
│   ├── ResumeSection.jsx      # Resume preview/download
│   ├── Contact.jsx            # Contact CTA
│   └── ui/                    # Reusable UI primitives
│       ├── Section.jsx        # Section wrapper with id
│       ├── Eyebrow.jsx        # "01 / SELECTED WORK" labels
│       ├── Reveal.jsx         # Scroll animation wrapper
│       ├── Pill.jsx           # Tag/chip component
│       └── Button.jsx         # Styled button/link
├── context/
│   └── MotionContext.jsx      # Motion ON/OFF state management
├── data/
│   ├── portfolio.js           # site content (name, about, skills, stats…)
│   └── projects.js            # one entry per project
├── public/
│   └── images/                # Photo & screenshots go here
└── TODO.md                    # Items to confirm before launch
```

5. **Created `TODO.md`** listing every `TODO` comment found in `data/portfolio.js` and `data/projects.js` — these are items you need to confirm/update before going live.

6. **Ran lint + build** — both pass with zero errors.

### How it works

| Concept | Explanation |
|---------|-------------|
| **App Router** | Next.js 14+ routing system. Every folder inside `app/` becomes a URL route. `app/page.js` = `/`, `app/work/page.js` = `/work`, `app/work/[slug]/page.js` = `/work/brand-ai-readiness-audit` etc. |
| **React Server Components** | By default, all components in the App Router are Server Components (rendered on the server, no JS sent to client). Only components with `"use client"` at the top run in the browser — we use this for animations, menus, and toggles. |
| **`data/portfolio.js`** | A central JS module that exports all your content as named exports. Components `import { about, skills, stats } from "@/data/portfolio"` and render that data. To change ANY text on the site, you only edit this one file. |
| **`data/projects.js`** | The project list, kept in its own module so a new project is a single append. Components `import { projects } from "@/data/projects"`. The `id` field doubles as the `/work/<id>` route segment, so the card grid, the `/work` index and the detail page all update together. |
| **`generateStaticParams`** | Tells Next.js which dynamic routes to pre-render at build time. We return all 3 project slugs so `/work/brand-ai-readiness-audit`, `/work/distributed-file-storage`, and `/work/civicbridge` are static HTML. |
| **`context/MotionContext.jsx`** | Uses React's `useSyncExternalStore` to safely read `localStorage` (avoiding hydration mismatches). Stores whether animations are ON/OFF. All animation components check this before animating. |
| **Tailwind CSS v4** | Utility-first CSS framework. In v4, configuration is done via CSS (`@theme` in `globals.css`) rather than `tailwind.config.js`. |

### Files changed
- Created: 26 files (components, pages, data, context, TODO.md)
- Modified: 0 files

### Build result
```
✓ npm run lint  — 0 errors
✓ npm run build — 0 errors, all routes statically generated
```

---

## Phase 1 — Design system, layout, navigation ✅

### What was done
1. **Design Tokens & Theme in `app/globals.css`**:
   - Defined core CSS variables for dark editorial aesthetics: `--bg-page: #0A0A0A`, `--bg-surface: #111111`, `--bg-card: #1A1A1A`.
   - Single vivid accent: Electric Teal (`--accent: #5EEAD4`, `--accent-glow: rgba(94, 234, 212, 0.15)`).
   - Card radius (`16px`), pill radius (`999px`), section vertical padding, and selection color using accent.
   - Visible focus rings (`*:focus-visible`) for full keyboard accessibility.

2. **Google Fonts & Metadata in `app/layout.js`**:
   - `Geist` (modern clean sans) + `Geist Mono` (code & tracking labels) + `Instrument Serif` (editorial italic accents).
   - High-grade SEO metadata: OpenGraph, Twitter card (`summary_large_image`), canonical URL, theme color.

3. **Global Navigation (`components/Nav.jsx`)**:
   - Sticky header with dynamic backdrop blur on scroll (`scrollY > 20`).
   - Desktop navigation links with arrow suffixes (`Work ↗`, `About ↗`, etc.) and animated underlines.
   - Accessible mobile slide-over menu with `aria-expanded`, Esc key listener, and body scroll lock.
   - "Let's talk" CTA button linking smoothly to `#contact`.

4. **Motion Preference System (`context/MotionContext.jsx` & `components/MotionToggle.jsx`)**:
   - Uses `useSyncExternalStore` for SSR-safe `localStorage` persistence and hydration safety.
   - Detects system `prefers-reduced-motion` by default.
   - Live interactive toggle button in the navbar.

5. **UI Primitives (`components/ui/`)**:
   - `Section.jsx`: Uniform section container with standard padding and top hairline border.
   - `Eyebrow.jsx`: Monospaced uppercase tracking label (`01 / SELECTED WORK`).
   - `Reveal.jsx`: Scroll reveal wrapper. The resting state is fully visible; an IntersectionObserver adds a `reveal-play` class that runs a CSS fade + slide + blur-to-sharp animation. Degrades to a plain `div` when motion is OFF.
   - `useReveal.js`: The IntersectionObserver hook behind `Reveal.jsx` — fires once, disconnects after the first intersection, and falls back to "already visible" when the browser has no `IntersectionObserver`.
   - `Pill.jsx`: Rounded tag badge for tech stack and skills.
   - `Button.jsx`: Flexible button/link with primary (accent fill), secondary (border), and ghost variants.
   - `Icons.jsx`: Handcrafted pixel-perfect SVG icons for GitHub & LinkedIn.

6. **Footer (`components/Footer.jsx`)**:
   - Accessible social icon links with hover glow effects.
   - "Back to top" smooth jump link.
   - Static copyright year (2026) and Plan.md tagline.

---

## Phase 2 — Hero (with Animated Character Portrait) + Impact strip ✅

### What was done
1. **Design System & Tokens Alignment (Inspired by `https://sarthak-sharma-portfolio-six.vercel.app/`)**:
   - Deep space black background (`#030303`), surface (`#0B0B0B`), and card (`#121212`).
   - Warm alabaster/bone ink typography (`#F1EEE8`) and refined muted gray (`#AAA9A4`).
   - Signature warm amber/orange accent (`#FF8C59`) and glow (`rgba(255, 140, 89, 0.18)`).
   - Architectural translucent hairline gridlines (`rgba(204, 220, 245, 0.14)`).
   - Serif display typography (`Instrument Serif`) for the logo, hero title, and metric numbers.

2. **Animated Character Portrait & Hero (`components/Hero.jsx`)**:
   - **Architectural Status Header**:
     - `▪ B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER` (with amber square indicator)
     - `BASED IN INDIA · THINKING BEYOND`
   - **Presence Sub-metadata**:
     - `00 / PRESENCE` + `+ FULL-STACK WEB`, `DISTRIBUTED SYSTEMS`, `DSA` on the left.
     - `NIT PATNA · CLASS OF 2028` on the right.
   - **Interactive 3D Character Portrait**:
     - Cutout portrait from `my_image/2.jpg` (Aman in black leather jacket, high-contrast B&W).
     - **3D Mouse Parallax Tilt**: Calculates normalized cursor position across the Hero and derives `rotateX` and `rotateY` via smooth Framer Motion spring physics (`damping: 25, stiffness: 180`).
     - **Dynamic Ambient Spotlight**: Warm amber halo behind the character tracking cursor coordinates.
     - **Breathing / Floating Motion**: Smooth continuous floating animation when motion is enabled.
     - **Seamless Fade**: Bottom gradient vignette mask blending into `#030303`.
   - **Display Typography & Caption**:
     - Tracked caption: `A HUMAN PERSPECTIVE ON TECHNOLOGY`.
     - Massive editorial serif title: `Md Aman` in italic serif.
     - Subtitle: `I build full-stack web products, solve DSA problems, and turn ideas into working applications.`
   - **Action CTAs**:
     - Primary: `Explore my work ↓` (smooth jump to `#work`).
     - Secondary: `Resume ↗` (with `download` attribute to `/Md_Aman_Resume.pdf`).
     - Social buttons: `GitHub ↗` and `LinkedIn ↗` (with SVG icons, new tab, `noopener noreferrer`).
   - **Bottom Architectural Bar**:
     - `SCROLL TO DISCOVER ↓` anchor.
     - `STUDENT & BUILDER · NIT PATNA`.
     - `AN ONGOING EXPLORATION`.

3. **Impact Strip (`components/ImpactStrip.jsx`)**:
   - 4 metric columns separated by vertical hairline borders:
     1. `Top 45` — Adobe University Hackathon (of 3,01,051+ registrations).
     2. `2,768` — Google Cloud Skills points (Gold League).
     3. `3` — Projects shipped (Full-stack & systems).
     4. `2` — Campus leadership roles (HackSlash Co-Lead & IEEE).
   - Framer Motion `useInView` count-up animation with strict React 19 compliance (zero synchronous setState in effect bodies).
   - Bottom bar with `THE WORK. THE REAL-WORLD IMPACT.` and `EXPLORE WORK ↗`.

### Build & Verification Results
```
✓ npm run lint  — 0 errors, 0 warnings
✓ npm run build — 0 errors, all 9 routes statically prerendered
✓ Browser Subagent verification — Verified 3D mouse parallax tilt, ambient spotlight, character portrait, typography, and responsive hairline column layout on localhost:3000.
```

---

## Phase 3 — About + Education ✅

### What was done
1. **`components/About.jsx`** — a two-column editorial layout:
   - **Left (7/12 width):** numbered eyebrow `01 / ABOUT`, a large serif headline, and the three About paragraphs.
   - **Right (5/12 width):** a hairline-ruled **Education** list (year + score on one mono line, degree and institute below), and a **Focus** block of `Pill`s beneath it.
   - The portrait card was later removed — see the "Polish pass" phase below.
2. **Headline accent parsing** — `about.headline` in `data/portfolio.js` was changed to `"Curious first. *Builder always.*"`. The `About` component splits the string on `*...*` segments and renders those as `<em className="accent-italic">` (Instrument Serif italic, amber). This keeps the emphasis data-driven instead of hard-coded in JSX.
3. **Education data** — rendered from the `education` array (`degree`, `institute`, `score`, `year`). No separate table markup, so it collapses cleanly to one column on mobile.

### How it works
| Concept | Explanation |
|---|---|
| **`Reveal` wrapper** | Each block is wrapped in `<Reveal delay={n}>` — a fade + 28px slide-up + blur-to-sharp driven by a CSS animation. The resting state is **already visible** (no `opacity: 0` in the server-rendered HTML); an IntersectionObserver adds the `reveal-play` class the moment the block enters the viewport, and the class is never removed. When motion is OFF the global `html[data-motion="off"]` rule cancels the animation, so content is never hidden if JS, motion, or JavaScript itself is disabled. |
| **`Eyebrow`** | Small uppercase mono label (`01 / ABOUT`). The number is optional — when `number` is empty the label renders on its own. Every section in the final build is numbered `01`–`09` so the sequence reads continuously down the page. |
| **Photo slot** | Removed in the polish pass — the About section is text-only and `public/images/aman.jpg` was deleted. |

### Files changed
- Modified: `components/About.jsx`, `components/ui/Eyebrow.jsx`, `data/portfolio.js` (about.headline)

---

## Phase 4 — Projects (cards + detail pages) ✅

### What was done
1. **`data/projects.js`** — the single source of truth for every project. Each entry is `{ id, title, category, description, tags[], image, liveUrl, repoUrl }` plus optional `subtitle`, `date`, `highlights[]`, `screenshot` and `isPlaceholder`. `id` doubles as the `/work/<id>` route segment, so adding a project means appending one object and nothing else.
2. **`components/Projects.jsx`** — section `id="work"`, eyebrow `02 / SELECTED WORK`, headline *"Ideas are a start. **This is the work.**"*, then a responsive grid (1 / 2 / 3 columns) of `ProjectCard`s mapped from the array, staggered 90ms apart.
3. **`components/ProjectCard.jsx`** — each card shows:
   - A **generated gradient cover** (no stock imagery, no hotlinked images) with the project number and the category label.
   - Title, subtitle, date, description, and tag pills (capped at five, with a `+N` counter, so every card is the same height).
   - Footer row with **`Live`** (external-link icon) and **`Code`** (GitHub icon) buttons plus `Read the story →`. Both buttons always render — when the matching URL is `null` the button is rendered as a disabled `aria-disabled` element, never a link to `#` — and both open in a new tab with `rel="noopener noreferrer"`.
   - Hover: the card lifts, the border brightens and the arrow nudges up-right. The nudge is gated on the motion toggle.
4. **`app/work/page.js`** — a full listing route that reuses the same `ProjectCard` plus a **"More on GitHub"** strip built from `otherRepos`.
5. **`app/work/[slug]/page.js`** — statically generated project detail page:
   - `generateStaticParams` returns every id; `generateMetadata` emits a per-project title and description.
   - `params` is read inside `<Suspense>` so the static shell stays instant-navigable.
   - Layout: 8-column visual area (screenshot when one exists, otherwise the gradient cover with the project number) + 4-column metadata rail (category, title, subtitle, date, tag pills, `Live` and `Code` buttons).
   - A **"What I built"** section lists the `highlights` as a numbered sequence.
   - **Prev/Next navigation** across projects, with `notFound()` for unknown slugs.
6. **Three placeholder entries** — "Demo Project One – E-commerce Dashboard", "Demo Project Two – Realtime Chat App" and "Demo Project Three – AI Notes Assistant" ship with sample copy, generated gradient covers, a **Placeholder** badge and a `// TODO: replace with a real project` comment above each.

### How it works
| Concept | Explanation |
|---|---|
| **`generateStaticParams`** | Next.js pre-renders `/work/<slug>` at build time for every slug returned. No server is needed at runtime for these pages. |
| **`await params`** | In Next 16, `params` is a Promise in dynamic routes. The page component reads it with `const { slug } = await params`. **Skipping this makes every slug return 404** even though the build reports the routes as static. |
| **`params` behind `<Suspense>`** | Next 16 validates that the static shell does not depend on the URL. Reading `params` outside a `<Suspense>` boundary logs *"URL data during prerendering"*. The page therefore renders a `<Suspense>` wrapper whose child awaits `params`. |
| **Disabled, not hidden, buttons** | A project with no demo URL renders the `Live` button as a disabled `<span aria-disabled="true">` rather than dropping it, so the card's footer keeps a consistent shape and there is never a dead link to `#`. |

### Files changed
- Added: `data/projects.js`
- Modified: `data/portfolio.js` (project array removed), `components/Projects.jsx`, `components/ProjectCard.jsx`, `app/work/page.js`, `app/work/[slug]/page.js`, `app/sitemap.js`

---

## Phase 5 — Skills, Achievements, Certifications, Leadership ✅

### What was done
1. **`components/Skills.jsx`** — eyebrow `03 / SKILLS`, headline *"Tools I reach for, **every time.**"*, then one card per group in the `skills` object (Languages, Frontend & Backend, Databases, Cloud & Services, Tools, Coursework). Each card lists its items as `Pill`s. **No percentage bars and no star ratings** — the design states what is used, not a self-scored proficiency.
2. **`components/Achievements.jsx`** — eyebrow `04 / ACHIEVEMENTS`, headline *"Big moments, **real numbers.**"*, then a big-stat card per achievement: the stat in large serif, the label, and the detail line. Cards link out only when an `href` exists.
3. **`components/Certifications.jsx`** — eyebrow `05 / CERTIFICATIONS`, a three-card grid of issuer / title / date, with a `View credential ↗` link only when `href` is set. Cards stretch to a common height so the row's bottom edges line up.
4. **`components/Leadership.jsx`** — eyebrow `07 / LEADERSHIP`, headline *"Building things **with other people.**"*, then a card per position showing date, role, and organisation.

### How it works
| Concept | Explanation |
|---|---|
| **`Object.entries(skills)`** | The `skills` export is a plain object keyed by category. `Object.entries` turns it into `[category, items]` pairs, so adding a new category to `data/portfolio.js` needs no component change. |
| **Staggered reveal** | Each card is wrapped in `<Reveal delay={i * 0.09}>` so cards cascade in on scroll rather than all at once. The increment is small enough that a long list still resolves within a second. |
| **Honest numbers** | Every figure on the site (Top 45, 3,01,051+, 2,768, 3 projects, 2 roles) comes straight from the resume-verified data in `data/portfolio.js`. Nothing is invented. |

### Files changed
- Modified: `components/Skills.jsx`, `components/Achievements.jsx`, `components/Certifications.jsx`, `components/Leadership.jsx`

---

## Phase 6 — Journey timeline + Resume + Contact ✅

### What was done
1. **`components/Timeline.jsx`** — eyebrow `06 / JOURNEY`, headline *"From ideas to impact, **one step at a time.**"*. A vertical spine with amber-ringed dots and five dated entries:
   - Feb 2026 — CivicBridge
   - Jul 2026 — Google Solution Challenge participation
   - Aug 2026 — HackSlash Co-Lead + IEEE Student Branch Coordinator
   - Sep 2026 — Distributed File Storage + Brand AI-Readiness Audit
   - Next — "Internships and bigger products" (generic, no company names)
2. **`components/ResumeSection.jsx`** — eyebrow `08 / RESUME`, headline *"The short version, **on one page.**"*, a download button, and an inline PDF preview in an `<iframe>` with a bottom gradient mask.
   - **Implemented as a Server Component** that calls `fs.existsSync()` on `public/Md_Aman_Resume.pdf` at build time. If the file is missing it renders a *"The PDF is being finalised"* note and a placeholder panel **instead of a broken iframe**. The `public/` PDF still needs to be added.
3. **`components/Contact.jsx`** — eyebrow `09 / LET'S TALK`, headline *"Have an idea or an opportunity? **Say hello.**"*, a two-column panel with:
   - An open-to-work statement.
   - Stacked pill buttons for Email, GitHub, and LinkedIn (external links get `rel="noopener noreferrer"`).
   - A **Copy email** button that writes the address to the clipboard and confirms via a `role="status"` / `aria-live="polite"` region. It swallows a clipboard failure silently — the `mailto:` link still works.
   - **No backend form** and **no phone number**, per the privacy rule in Plan.md §2.1.

### How it works
| Concept | Explanation |
|---|---|
| **Server vs Client split** | `ResumeSection.jsx` has no `"use client"` — it needs `fs` and `path`, which only exist on the server. It still renders the client `Reveal` component (client components can be nested inside server components). Everything else on the page is a client component because it uses Framer Motion. |
| **`navigator.clipboard`** | The Clipboard API requires a secure context (HTTPS or `localhost`). The `try/catch` means a failure degrades to "no confirmation message" rather than a crash. |
| **`aria-live` region** | A visually reserved (`h-4`) element with `role="status"` announces "Copied" to screen readers without shifting layout. |

### Files changed
- Modified: `components/Timeline.jsx`, `components/ResumeSection.jsx`, `components/Contact.jsx`, `app/page.js`

---

## Phase 7 — SEO, OG image, performance, accessibility ✅

### What was done
1. **`app/opengraph-image.js`** — a dynamic 1200×630 OG image built with `next/og`'s `ImageResponse`: pitch-black background, amber uppercase kicker `MD AMAN · FULL-STACK DEVELOPER`, large `Md Aman` wordmark, and `NIT PATNA · B.Tech CSE` subtitle. Served at `/opengraph-image`.
2. **`app/sitemap.js`** — auto-generates `/`, `/work`, and every `/work/[slug]` with `lastModified`, `changeFrequency`, and `priority`. Served at `/sitemap.xml`.
3. **`app/robots.js`** — allows everything and points at the sitemap. Served at `/robots.txt`.
4. **JSON-LD Person schema** in `app/layout.js` — `name`, `url`, `jobTitle`, `email`, `description`, `image`, `PostalAddress` (Patna, IN), `alumniOf` + `affiliation` (NIT Patna), and `sameAs` for GitHub and LinkedIn. Emitted as `<script type="application/ld+json">` in the layout so it applies to every route.
5. **`app/not-found.js`** — a branded 404: `ERROR 404` kicker, *"This page went **missing.**"*, and two CTAs (Back home / See the work). Carries its own `metadata`.
6. **Nav update** — `Achievements` was replaced with `Journey` in the desktop and mobile menus so the nav matches the section order on the page.

### How it works
| Concept | Explanation |
|---|---|
| **`cacheComponents` + edge runtime** | `next.config.mjs` sets `cacheComponents: true`. Under that flag Next 16 **rejects** `export const runtime = "edge"` on `opengraph-image.js` with *"Route segment config `runtime` is not compatible with `nextConfig.cacheComponents`"*. The fix is to delete the export and use the default Node.js runtime. |
| **`metadataBase`** | Set from `profile.siteUrl` in `layout.js`. Every relative OG/Twitter/canonical URL resolves against it, which is what makes the link preview work. **Replace `profile.siteUrl` with the real Vercel URL before launch.** |
| **`next/image` everywhere** | The hero portrait uses `fill` + `priority` (above the fold, no lazy loading). The About photo uses explicit `width`/`height` + `loading="lazy"`. Both carry descriptive `alt` text. |
| **Single `h1`** | The hero is the only `h1` on the page. Every other section heading is an `h2`, and sub-blocks (Education, What I built) use `h3`. |

### Files changed
- Created: `app/opengraph-image.js`, `app/sitemap.js`, `app/robots.js`
- Modified: `app/layout.js` (JSON-LD), `app/not-found.js`, `components/Nav.jsx`

---

## Polish pass — visual QA (after Phase 7) ✅

A Playwright pass against the running dev server captured the full page at **1440×900** and **390×844**, and asserted DOM-level invariants. What it confirmed was already correct: all twelve blocks render in order, the hero portrait loads uncropped, every text node resolves to one of three palette colours on the near-black background, there is **no horizontal overflow** at either width, **no overlapping text**, no broken icons, no failed requests, and no console errors.

It also surfaced four cosmetic defects, all now fixed:

| # | Defect | Fix |
|---|---|---|
| 1 | The `CERTIFICATIONS` eyebrow rendered un-numbered, breaking the `NN / LABEL` sequence between `04` and `05` | Numbered the section and shifted the rest: Certifications `05`, Journey `06`, Leadership `07`, Resume `08`, Contact `09` |
| 2 | The Achievements grid used `lg:grid-cols-3` but only has two cards, leaving a blank third column | Grid changed to `sm:grid-cols-2` so the two cards fill the row |
| 3 | Certification cards had unequal heights — the Google title wraps to two lines, so the row's bottom edges did not line up | `h-full` on both the `Reveal` wrapper and the card, with the card switched to `flex flex-col` so the credential link anchors to the bottom |
| 4 | On mobile the Resume panels were inverted — the empty preview placeholder rendered *above* the call-to-action, so users hit a dead placeholder first | Removed the `order-*` overrides; DOM order (CTA, then preview) now applies at every width |
| 5 | The hero's presence label also read `01 / PRESENCE`, colliding with About's `01 / ABOUT` — two `01`s on one page | The hero is section `00` in the page map, so its label is now `00 / PRESENCE`. The page reads `00 → 09` with no repeat |

Also fixed: the `EXPLORE WORK ↗` link in the impact strip wrapped to two lines on mobile with the arrow pushed to the far edge — it now carries `shrink-0 whitespace-nowrap`.

### One deliberate non-fix
The blank regions in the first full-page screenshot were a **capture artifact**, not a user-facing bug. At the time `Reveal` used `useInView(..., { once: true })`, so a fast programmatic jump past a block never fired the animation and the block stayed at `opacity: 0`. This is no longer possible: the reveal system was rebuilt so the **resting state is fully visible** and the animation is a pure CSS class toggle (see "Overhaul pass" below). A block that is never intersected simply stays visible.

### Files changed
- Modified: `components/Certifications.jsx`, `components/Achievements.jsx`, `components/Timeline.jsx`, `components/Leadership.jsx`, `components/ResumeSection.jsx`, `components/Contact.jsx`, `components/ImpactStrip.jsx`, `Plan.md`, `flow.md`

---

## Overhaul pass — hero, navbar, about, projects, reveals ✅

The portfolio had reached a working state. This pass fixed the structural defects that would break on narrow windows or after a hard refresh. All changes run through `npm run lint` and `npm run build` and are verified at 360px / 768px / 1440px with Playwright (no horizontal overflow, no console errors).

### What was done

1. **Hero heading** — changed from `Aman` to `Md Aman`, split into letter spans for a per-letter entrance, and settled to a fully static heading (no leftover transform / opacity / will-change) with a tiny blur-to-sharp ease. An eyebrow (`00 / PRESENCE`) slides in just after the name; the meta row and CTA buttons follow at delays of ~0.55s–0.9s. Animation plays **once** on load, after fonts are ready, and never replays on scroll, resize or re-mount — even under React StrictMode's double-invoke (guarded with a one-time ref flag) and even when MOTION is OFF (`html[data-motion="off"]` kills all transitions/animations globally). The name renders in Instrument Serif italic, sizing via `clamp(2.75rem, 11vw, 12rem)` so it fits on one line at 360/768/1440px and wraps cleanly on the very narrowest screens.

2. **Particle portrait** — rewrote as a scroll-driven scrubber: particle density maps to `1 − scrollY/heroHeight`, so descending disperses particles, lifts them slightly and scales them down; ascending reverses smoothly. The loop runs only while the hero stays in view (IntersectionObserver), uses `requestAnimationFrame` with a lerp toward the target progress, and caps `devicePixelRatio` on wide screens. When MOTION is OFF or the browser asks for reduced motion, the canvas hides (`display: none`) and the static portrait image shows — a non-reactive fallback. Up to ~5,000 particles (capped for mobile); no `window`/`document` access during SSR, no hydration warnings.

3. **Navbar** — logo and right-side controls now live in the same centred gutter container as the rest of the page (no more off-gutter content or hero particles bleeding through the links). Link hover underline slides from left to full width, arrows nudge up-right, and a translucent `blur(16px)` scrim fades in once the page scrolls past the header. Active-section highlighting works via IntersectionObserver (rootMargin `−45% 0px −50% 0px`); mobile menu is a drawer overlay (`role="dialog" aria-modal="true"`) with a focus trap, Escape returns focus to the hamburger, and closing the menu restores `body.overflow` — nothing overflows at 360px, and the header stacks cleanly at <768px.

4. **About section** — removed the photo entirely (the file `public/images/aman.jpg` was unreferenced). Rebalanced into a wider, intentional text layout: headline + paragraphs on the left, Education + Focus on the right. Heading now wraps cleanly to two lines at 1440px instead of clipped.

5. **Projects** — extracted project data into `data/projects.js`; the three real projects were migrated and three clearly-marked placeholder entries ("E-commerce Dashboard", "Realtime Chat App", "AI Notes Assistant") shipped as samples. Every card now has `Live` (external-link icon) and `Code` (GitHub icon) buttons that **always render** — disabled spans when the URL is missing — and both open in a new tab with `rel="noopener noreferrer"`. Cards share an identical height (title capped to two lines, description capped to three lines, tags capped to five pills + a `+N` counter), so the 1 / 2 / 3-column grid has matching row heights at every width. Detail pages reuse the same card markup, clamp tag pills to five, and gate `params` behind `<Suspense>` to satisfy Next 16's instant-navigation validation.

6. **Reveal system** — rebuilt as a CSS-animation reveal whose resting state is **already visible**: the element starts fully opaque, and a `reveal-play` class is added by an IntersectionObserver once it enters the viewport. That means content stays readable whether JS is slow, blocked, disabled or off — the requirement "no permanent opacity: 0 before hydration" holds by construction. Sections stagger their entrance (eyebrow → heading → block with per-element delay); stat cards use the same hook with a count-up animation layered on top. The `MOTION OFF` toggle flips `html[data-motion="off]` which kills every animation and transition globally, leaving elements in their final visible state; `prefers-reduced-motion` does the same. Built as `components/ui/useReveal.js` + `components/ui/Reveal.jsx` (framer-motion retained for ImpactStrip's count-up; `useInView` kept).

### Files changed
- Added: `data/projects.js`, `components/ui/useReveal.js`
- Modified: `components/Hero.jsx`, `components/ParticlePortrait.jsx`, `components/Nav.jsx`, `components/About.jsx`, `components/Projects.jsx`, `components/ProjectCard.jsx`, `app/work/page.js`, `app/work/[slug]/page.js`, `app/sitemap.js`, `app/globals.css`, `context/MotionContext.jsx`, `Plan.md`, `flow.md`, `TODO.md`

### Verification
```
✓ npm run lint  — 0 errors, 0 warnings
✓ npm run build — 0 errors, 15 routes
```
Playwright checks at 360px / 768px / 1440px passed with zero console errors: hero name / font / lines, no horizontal overflow, no replay on scroll, portrait disperses on scroll and reverses back, navbar aligned + backdrop + active link + mobile drawer trap, about layout, six equal-height project cards with Live/Code buttons, detail pages. No-JS load showed the whole page rendered (about head and hero h1 present), so the reveal system degrades to fully visible content without any JS.

## Final state

```
✓ npm run lint  — 0 errors, 0 warnings
✓ npm run build — 0 errors, 15 routes prerendered

Route (app)
┌ ○ /                    ┌ ○ /_not-found       ┌ ○ /opengraph-image
├ ○ /work                ├ ƒ /sitemap.xml      ├ ○ /robots.txt
└ ○ /work/[slug]  →  ◐ /work/[slug] + 6 static project pages
```

Route check against the production server:
```
/                                        200 text/html
/work                                    200 text/html
/work/civicbridge                        200 text/html
/work/distributed-file-storage           200 text/html
/work/brand-ai-readiness-audit           200 text/html
/work/demo-ecommerce-dashboard           200 text/html
/work/demo-realtime-chat                 200 text/html
/work/demo-ai-notes-assistant            200 text/html
/nope                                    404 text/html
/opengraph-image                         200 image/png
/sitemap.xml                             200 application/xml
/robots.txt                              200 text/plain
```

Eyebrow sequence, top to bottom:
```
00 / PRESENCE → 01 / ABOUT → 02 / SELECTED WORK → 03 / SKILLS
→ 04 / ACHIEVEMENTS → 05 / CERTIFICATIONS → 06 / JOURNEY
→ 07 / LEADERSHIP → 08 / RESUME → 09 / LET'S TALK
```

### Outstanding items (see `TODO.md`)
- `public/Md_Aman_Resume.pdf` has not been added — the Resume section degrades gracefully until it is.
- `profile.siteUrl` is still the placeholder `https://TODO-your-domain.vercel.app`; set it to the real Vercel URL before launch so canonical, OG, sitemap, and JSON-LD URLs are correct.
- Repo URLs for two of the three real projects still point at the GitHub profile rather than the exact repositories, and the three demo entries are placeholders waiting to be replaced.

