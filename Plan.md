# Plan.md — Md Aman's Portfolio (Next.js + JavaScript)

> **Purpose:** This file is the single source of truth for an AI coding agent (Claude Code, Cursor, Copilot Agent, etc.) to build my personal portfolio website.
> **How to use:** Put this file in an empty project folder. Tell the agent: *"Read Plan.md fully, then execute the prompts in Section 6 one phase at a time. Stop after each phase and let me review."*

> **Status (Oct 2026):** Phases 0–7 are **built and passing** (`npm run lint` clean, `npm run build` green, 12 routes). This document has been updated to match what actually exists in the repo. `flow.md` holds the per-phase build log.

---

## 1. Project Brief

| Item | Value |
|---|---|
| Owner | **Md Aman** — 3rd-year B.Tech CSE student, NIT Patna |
| Goal | A personal portfolio that shows my **skills, projects, achievements**, and links to my **resume, LinkedIn and GitHub** |
| Audience | Recruiters, internship/hiring managers, hackathon organisers, peers |
| Stack | **Next.js (App Router) + JavaScript (NOT TypeScript)** + Tailwind CSS + Framer Motion |
| Hosting | Vercel |
| Inspiration | https://sarthak-sharma-portfolio-six.vercel.app/ (look & feel only — never copy its text, images, or code) |

### Hard rules for the agent
1. **JavaScript only.** Files are `.js` / `.jsx`. No `.ts` / `.tsx`, no TypeScript config.
2. **Use the App Router** (`app/` directory), React Server Components by default; add `"use client"` only where needed (animations, menu, theme/motion toggle).
3. **Never invent facts.** Do not make up metrics, employers, testimonials, links, or project screenshots. Use only the data in Section 2. If something is missing, render a clean placeholder and list it in a `TODO.md`.
4. **All content lives in `data/portfolio.js` and `data/projects.js`.** Components read from them; no hard-coded copy inside components.
5. **Accessibility is required:** semantic HTML, skip-to-content link, visible focus rings, alt text, AA contrast, full keyboard navigation, `prefers-reduced-motion` respected.
6. **Mobile first.** Must look good from 360px to 1920px.
7. Keep dependencies minimal (see Section 4). Ask before adding anything else.
8. After each phase: run `npm run lint` and `npm run build`, fix errors, then summarise what changed.

---

## 2. Source Data (verified from my resume, GitHub profile and links)

### 2.1 Identity & links
- **Name:** Md Aman
- **Role line:** B.Tech CSE student · Full-stack developer
- **College:** National Institute of Technology, Patna (NIT Patna)
- **Phone:** +91-9523733319 *(do NOT show on the public page by default — keep it in the resume PDF only; see Open Items)*
- **College email:** mdamd.ug24.cs@nitp.ac.in
- **LinkedIn:** https://www.linkedin.com/in/md-aman-76000a324/
- **GitHub:** https://github.com/md-aman012
- **Resume file:** `public/Md_Aman_Resume.pdf` (I will drop my PDF there)
- **GitHub bio (use as About seed):** B.Tech student interested in software development; passionate about Web Development, JavaScript, and DSA; enjoys building real-world projects and turning ideas into working applications; focused on continuous growth, problem-solving, and clean, efficient code.

### 2.2 Data file — create this exactly as `data/portfolio.js`

```js
// data/portfolio.js — single source of truth for all site content.
// Anything marked TODO must be confirmed by Aman before launch.

export const profile = {
  name: "Md Aman",
  shortName: "Aman",
  role: "Full-Stack Developer",
  tagline: "I build full-stack web products and keep learning how things work.",
  location: "Patna, India",
  college: "National Institute of Technology, Patna",
  degree: "B.Tech, Computer Science & Engineering",
  email: "mdamd.ug24.cs@nitp.ac.in", // TODO: confirm preferred public email
  resume: "/Md_Aman_Resume.pdf",
  siteUrl: "https://TODO-your-domain.vercel.app", // TODO: replace after deploy
};

export const socials = [
  { label: "GitHub", href: "https://github.com/md-aman012" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-aman-76000a324/" },
  { label: "Email", href: "mailto:mdamd.ug24.cs@nitp.ac.in" },
  // Optional: { label: "Instagram", href: "https://instagram.com/amansaab_0" }, // TODO: only if Aman wants it public
];

export const about = {
  headline: "I turn ideas into working software.",
  paragraphs: [
    "I'm a third-year Computer Science student at NIT Patna with a strong interest in web development, JavaScript and data structures & algorithms.",
    "I like building real-world projects end to end — from the database and REST APIs to the interface people actually use.",
    "Outside of class I help run tech communities on campus and take part in hackathons, where I learn the most.",
  ],
  focus: ["Full-stack web", "JavaScript", "DSA & problem solving", "Cloud basics"],
};

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institute: "National Institute of Technology, Patna",
    score: "CGPA 8.04",
    year: "Expected 2028", // TODO: resume says "june 2026" — confirm (batch is UG24, so likely 2028)
  },
  { degree: "Senior Secondary", institute: "Trident Public School", score: "90%", year: "May 2023" },
  { degree: "Secondary", institute: "Holy Mission Sr. Sec. School", score: "90.2%", year: "Apr 2021" },
];

export const skills = {
  Languages: ["Java", "C", "JavaScript", "Python", "HTML", "CSS"],
  "Frontend & Backend": ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "REST APIs", "JWT Authentication"],
  Databases: ["MongoDB", "PostgreSQL"],
  "Cloud & Services": ["AWS S3", "Google Cloud", "Cloudinary", "MongoDB Atlas"],
  Tools: ["Git", "GitHub", "Postman", "VS Code", "npm", "Jupyter Notebook"],
  Coursework: ["DBMS", "OOPS", "Operating Systems", "DSA", "Computer Networks", "AI", "ML"],
};

// Projects live in their own module — see `data/projects.js` (section 2.3).

// Other public repos visible on GitHub (optional "More on GitHub" strip)
export const otherRepos = [
  { name: "IEEE_SB_NITP-official-site", description: "Official website for IEEE Student Branch NITP (fork, JavaScript).", href: "https://github.com/md-aman012/IEEE_SB_NITP-official-site" },
  { name: "HackSlashNITP/DSMP", description: "Decentralized Social Media Platform promoting genuine connections and user ownership (JavaScript).", href: "https://github.com/HackSlashNITP/DSMP" },
  { name: "Blog", description: "Blog project (JavaScript).", href: "https://github.com/md-aman012/Blog" },
];

export const achievements = [
  {
    title: "Adobe University Hackathon",
    detail: "Selected among the Top 45 teams out of 3,01,051+ registrations.",
    stat: "Top 45",
    statLabel: "of 3,01,051+ registrations",
  },
  {
    title: "Google Cloud Skills Profile",
    detail: "Gold League with 2,768 points; earned multiple Google Cloud Skill Badges.",
    stat: "2,768",
    statLabel: "points · Gold League",
    href: null, // TODO: public Google Cloud Skills profile URL
  },
];

export const certifications = [
  { issuer: "Google", title: "Google Solution Challenge Hackathon Participation", date: "Jul 2026", href: null }, // TODO: credential URLs
  { issuer: "NPTEL", title: "The Joy of Computing using Python", date: "May 2026", href: null },
  { issuer: "Deloitte", title: "Data Analytics Job Simulation", date: "Jan 2026", href: null },
];

export const positions = [
  { role: "Co-Lead", org: "HackSlash, NIT Patna", date: "Aug 2026" },
  { role: "Coordinator", org: "IEEE Student Branch, NIT Patna", date: "Aug 2026" },
];
```

### 2.3 Data file — create `data/projects.js`

Projects get their own module so a new project only ever needs one file edited. `id` doubles as the `/work/<id>` route segment, so the card grid, the `/work` index and the detail page all update from a single append.

```js
// data/projects.js — single source of truth for every project on the site.
export const projects = [
  {
    id: "brand-ai-readiness-audit",       // unique key + /work/<id> segment
    title: "Brand AI-Readiness Audit",
    category: "AI tooling · Python",      // short mono label on the cover
    description: "One-paragraph summary used on the card and the detail page.",
    tags: ["Python", "Web Crawling", "JSON", "Schema.org", "Playwright"],
    image: "linear-gradient(135deg, rgba(255,140,89,0.16) 0%, transparent 100%)",
    liveUrl: null,                        // null → the "Live" button renders disabled
    repoUrl: "https://github.com/md-aman012", // null → the "Code" button renders disabled
    // Optional extras used by the detail page:
    subtitle: "Agent Skill Marketplace",
    date: "Sep 2026",
    highlights: ["…"],
    screenshot: null,                     // set to "/images/<id>.jpg" when one exists
    isPlaceholder: true,                  // marks a sample entry with a PLACEHOLDER badge
  },
];
```

Three clearly-marked demo entries ship in the file so the grid shows its full shape — each carries a `// TODO: replace with a real project` comment above it.

### 2.4 Honest "impact" numbers (use ONLY these in a stats strip)
- **Top 45 / 3,01,051+** — Adobe University Hackathon
- **2,768** — Google Cloud Skills points (Gold League)
- **3** — full-stack / systems projects shipped
- **2** — campus leadership roles (HackSlash, IEEE SB)

> Do not add fake numbers like "10k users" or "99% uptime".

---

## 3. Design Analysis of the Reference Site (https://sarthak-sharma-portfolio-six.vercel.app/)

Observed on the reference portfolio (structure, exact design tokens, typography & animations):

- **Pure pitch black & warm ink:** Background `#030303`, surface `#0B0B0B`, card `#121212`. Primary text is warm bone-white `#F1EEE8` (`--ink`), muted text is `#AAA9A4`.
- **Signature warm amber accent:** Accent is `#FF8C59` (`--blue` in reference tokens, displaying as warm glowing amber/orange); used for subtle status dots, hover states, buttons, and spotlight glows.
- **Architectural hairline borders:** Translucent subtle lines `rgba(204, 220, 245, 0.14)` (`#ccdcf524`), giving an engineered grid structure.
- **Hero Character / Portrait:**
  - High-contrast black & white portrait centered above the massive serif name headline.
  - Radial backlight glow behind the character that breathes and follows mouse cursor.
  - Interactive 3D mouse parallax tilt effect (`perspective`, `rotateX`, `rotateY`).
  - Seamless bottom gradient mask blending into the dark surface.
  - Respects Motion toggle (static, smooth fallback when motion is OFF).
- **Display typography:**
  - Massive editorial serif (`Instrument Serif`) for the hero name `Md Aman` and section headlines (`Ideas are a start. *This is the work.*`).
  - Monospaced tracked labels (`letter-spacing: 1.2px; font-size: 10px; font-family: var(--font-mono);`) for eyebrows, kickers, and bottom bars.
- **Layout & Sections:**
  - Sticky minimal nav with serif brand name and arrow-suffixed links (`Work ↗`, `About ↗`, `Let's talk ↗`).
  - Top status row: `▪ B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER` and `BASED IN INDIA · BUILDING BEYOND`.
  - Impact strip: 4 metrics divided by architectural gridlines with count-up animations.
  - Project cards, timeline, skills, and contact section with the same refined editorial polish.

### My adaptation (page map)
| # | Section | Eyebrow | Content |
|---|---|---|---|
| — | Nav | — | Aman (serif) · Work · About · Skills · Journey · Resume · "Let's talk" |
| 00 | Hero | `00 / PRESENCE` | Animated character portrait (from `public/images/aman-2.jpg`), name `Md Aman`, role line, tagline, CTAs (Explore work / Resume / GitHub / LinkedIn), bottom scroll bar |
| 01 | Impact strip | — | 4 verified metrics (Top 45, 2,768, 3, 2) with hairline grid borders and count-up |
| 02 | About | `01 / ABOUT` | Headline + paragraphs + focus chips + education list + photo |
| 03 | Selected Work | `02 / SELECTED WORK` | 3 numbered project cards → `/work/[slug]` pages |
| 04 | Skills | `03 / SKILLS` | Grouped skill cards (from `skills`) |
| 05 | Achievements | `04 / ACHIEVEMENTS` | Big-stat cards from `achievements` |
| 06 | Certifications | `05 / CERTIFICATIONS` | Issuer / title / date cards (equal-height) |
| 07 | Journey | `06 / JOURNEY` | Timeline: Feb 2026 CivicBridge → Jul 2026 Google Solution Challenge → Aug 2026 leadership roles → Sep 2026 two new projects → Next |
| 08 | Leadership | `07 / LEADERSHIP` | Positions of responsibility |
| 09 | Resume | `08 / RESUME` | Download button + inline PDF preview (graceful fallback if the PDF is missing) |
| 10 | Contact | `09 / LET'S TALK` | Closing CTA + email + GitHub + LinkedIn + copy-email button |
| — | Footer | — | Socials, © year, back to top |

**Additional routes built**
| Route | Purpose |
|---|---|
| `/work` | All projects + a "More on GitHub" strip from `otherRepos` |
| `/work/[slug]` | Statically generated project detail page (overview, stack, highlights, prev/next) |
| `/opengraph-image` | Dynamic 1200×630 OG image via `next/og` |
| `/sitemap.xml`, `/robots.txt` | Auto-generated from `data/portfolio.js` |
| `/_not-found` | Branded 404 page |

### Design tokens (matching reference site exactly)
```
Background:  #030303 (page) · #0B0B0B (surface) · #121212 (card)
Text:        #F1EEE8 (primary / bone-white ink) · #AAA9A4 (muted)
Accent:      #FF8C59 (warm amber/orange) · Glow: rgba(255, 140, 89, 0.18)
Border:      rgba(204, 220, 245, 0.14) · Hover: rgba(204, 220, 245, 0.28)
Radius:      16px cards, 999px pills
Display font: Instrument Serif (display serif + italic accents)
Body font:   Geist (sans)
Mono font:   Geist Mono (tracked metadata labels)
Gutter:      clamp(24px, 5vw, 88px)
```

### Motion rules & Character Animation
- Interactive 3D tilt on the Hero portrait tracking the cursor (smooth spring interpolation).
- Floating breathing animation on the portrait and ambient backlight glow.
- When **MOTION OFF** is selected: 3D tilt and floating animations are completely disabled; static clean display.
- Subtle fade/slide-up on scroll for section reveals.
- Keep Lighthouse Performance ≥ 90.

---

## 4. Tech Stack & Project Structure

**Install**
```bash
npx create-next-app@latest aman-portfolio
# Choose: JavaScript (NOT TypeScript) · ESLint: Yes · Tailwind CSS: Yes · src/ dir: No · App Router: Yes · Turbopack: Yes · import alias: @/*
cd aman-portfolio
npm i framer-motion lucide-react
```
Allowed extra packages: `framer-motion`, `lucide-react`. Nothing else without asking.

### 4.1 Actual installed versions (this repo)
| Package | Version | Note |
|---|---|---|
| `next` | 16.4.2 | `cacheComponents: true`, Turbopack default |
| `react` / `react-dom` | 19.3.0 | |
| `tailwindcss` | ^4 | CSS-first config via `@theme` in `globals.css` — no `tailwind.config.js` |
| `framer-motion` | ^14.3.0 | |
| `lucide-react` | ^1.59.0 | **v1 dropped brand icons** — see gotchas |

### 4.2 Next 16 / lucide v1 gotchas (hit during the build)
1. **`params` is a Promise in dynamic routes.** `app/work/[slug]/page.js` must be `async` and `await params` — otherwise every slug 404s even though `generateStaticParams` lists it.
2. **`export const runtime = "edge"` breaks `app/opengraph-image.js`.** With `cacheComponents: true` in `next.config.mjs`, Next 16 rejects the edge runtime for that route. Use the default Node.js runtime and drop the export.
3. **`lucide-react` v1 removed brand icons.** `import { Github } from "lucide-react"` fails the build ("Did you mean to import Gift?"). Use the hand-rolled `GithubIcon` / `LinkedinIcon` in `components/ui/Icons.jsx` instead. `Mail`, `ArrowUpRight`, `Check`, `Copy`, `Download`, `Menu`, `X` still exist.
4. **`react/no-unescaped-entities`** fires on raw `"` and `>` inside JSX text. Escape as `&quot;` / `&gt;` or move the string into a JS expression.
5. **Inline `blurDataURL` base64 strings** can trip the same lint rule. Drop `placeholder="blur"` rather than fight it.

**Structure**
```
portfolio_new/
├─ app/
│  ├─ layout.js            # fonts, metadata, JSON-LD, skip link, Nav, Footer
│  ├─ page.js              # home: composes all sections
│  ├─ globals.css          # tokens, base styles
│  ├─ opengraph-image.js   # dynamic OG image (ImageResponse)
│  ├─ sitemap.js
│  ├─ robots.js
│  ├─ not-found.js
│  └─ work/
│     ├─ page.js           # all projects + "More on GitHub"
│     └─ [slug]/page.js    # project detail (generateStaticParams)
├─ components/
│  ├─ Nav.jsx  Footer.jsx  MotionToggle.jsx  SkipLink.jsx
│  ├─ Hero.jsx  ImpactStrip.jsx  About.jsx  Projects.jsx  ProjectCard.jsx
│  ├─ Skills.jsx  Achievements.jsx  Certifications.jsx
│  ├─ Timeline.jsx  Leadership.jsx  ResumeSection.jsx  Contact.jsx
│  └─ ui/
│     ├─ Eyebrow.jsx      # "01 / ABOUT" tracked mono label  (used)
│     ├─ Reveal.jsx       # scroll reveal, no-op when motion OFF  (used)
│     ├─ useReveal.js     # one-shot IntersectionObserver hook behind Reveal  (used)
│     ├─ Pill.jsx         # rounded tag/chip  (used)
│     ├─ Icons.jsx        # GithubIcon + LinkedinIcon (lucide v1 dropped brands)  (used)
│     ├─ Section.jsx      # generic section wrapper — available, currently unused
│     └─ Button.jsx       # generic button — available, currently unused
├─ context/MotionContext.jsx
├─ data/portfolio.js       # from Section 2.2
├─ data/projects.js        # from Section 2.3 — one entry per project
├─ public/
│  ├─ Md_Aman_Resume.pdf   # ← still needs to be added
│  └─ images/              # portrait.jpg, aman-2.jpg
├─ flow.md
├─ Plan.md
└─ TODO.md
```

---

## 5. Content Copy Drafts (agent may use; Aman will edit)

> **Status: these are now implemented.** Asterisks mark the italic accent word.

- **Hero status row:** `▪ B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER` / `BASED IN INDIA · THINKING BEYOND`
- **Hero caption:** `A HUMAN PERSPECTIVE ON TECHNOLOGY`
- **Hero headline:** `Md Aman` (huge Instrument Serif italic)
- **Hero sub:** "I build full-stack web products, solve DSA problems, and turn ideas into working applications."
- **Hero CTAs:** `Explore my work ↓` · `Resume ↗` · `GitHub ↗` · `LinkedIn ↗`
- **Hero bottom bar:** `SCROLL TO DISCOVER ↓` · `STUDENT & BUILDER · NIT PATNA` · `AN ONGOING EXPLORATION`
- **About headline:** "Curious first. *Builder always.*"
- **Skills headline:** "Tools I reach for, *every time.*"
- **Achievements headline:** "Big moments, *real numbers.*"
- **Certifications headline:** "Verified skills, *backed by credentials.*"
- **Journey headline:** "From ideas to impact, *one step at a time.*"
- **Leadership headline:** "Building things *with other people.*"
- **Resume headline:** "The short version, *on one page.*"
- **Projects headline:** "Ideas are a start. *This is the work.*"
- **Contact headline:** "Have an idea or an opportunity? *Say hello.*"
- **Footer line:** "Built with Next.js. Always learning."

Tone: confident, plain, first-person, no buzzword soup, no claims that aren't in Section 2.

---

## 6. Phased Prompts for the AI Agent

> Run these in order. Paste one prompt at a time. Each prompt assumes the agent has read this whole file.

### Phase 0 — Setup
```text
Read Plan.md completely. Then:
1. Scaffold the project exactly as in Section 4 (JavaScript, App Router, Tailwind, ESLint). Do not use TypeScript.
2. Install only framer-motion and lucide-react.
3. Create data/portfolio.js using the exact code in Section 2.2 (and data/projects.js from Section 2.3).
4. Create the folder structure from Section 4 with empty placeholder components that export a simple default function.
5. Create TODO.md listing every "TODO" comment found in data/portfolio.js and data/projects.js.
6. Run npm run lint and npm run build. Report results and stop.
```

### Phase 1 — Design system, layout, navigation
```text
Implement the design system and global layout from Plan.md Sections 1 and 3.
- globals.css: CSS variables / Tailwind theme tokens for the colours, radius and spacing in "Design tokens". Dark theme default. Smooth scroll. Selection colour uses the accent.
- app/layout.js: load fonts with next/font/google (a serif with italic for accent words + a clean sans for body), set <html lang="en">, add SkipLink ("Skip to content" -> #main), Nav, <main id="main">, Footer.
- Metadata in layout.js: title "Md Aman | Full-Stack Developer", description from profile.tagline, openGraph, twitter card (summary_large_image), canonical via profile.siteUrl, themeColor "#0A0A0A". Use metadataBase.
- Nav.jsx: sticky, blurred background, logo "Aman", links (Work, About, Skills, Achievements, Resume) with arrow suffix on desktop, a "Let's talk" CTA linking to #contact, and an accessible mobile menu (button with aria-expanded, focus trap not required but Escape closes it).
- MotionToggle.jsx + context/MotionContext.jsx: ON/OFF toggle, default from prefers-reduced-motion, persisted in localStorage (read it safely inside useEffect to avoid hydration mismatch).
- ui/Section.jsx (wrapper with id, eyebrow, heading), ui/Eyebrow.jsx (small uppercase tracked label like "01 / SELECTED WORK"), ui/Reveal.jsx (framer-motion fade/slide-up that becomes a no-op when motion is OFF), ui/Pill.jsx, ui/Button.jsx.
- Footer.jsx: socials from data, copyright year, back-to-top link.
Visible focus rings on every interactive element. Run lint + build, then stop.
```

### Phase 2 — Hero (with Animated Character Portrait) + Impact strip
```text
Build components/Hero.jsx and components/ImpactStrip.jsx matching the exact visual style, layout, typography, and character animation inspired by https://sarthak-sharma-portfolio-six.vercel.app/.
Hero:
- Top status row: "▪ B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER" and "BASED IN INDIA · BUILDING BEYOND".
- Presence label: "00 / PRESENCE" and "+ WEB DEVELOPMENT · DISTRIBUTED SYSTEMS · DSA".
- Animated Character Portrait: Centered B&W portrait from `public/images/aman-2.jpg`, featuring interactive 3D mouse parallax tilt (`perspective`, `rotateX`, `rotateY`), an ambient warm amber spotlight glow that follows the cursor, a floating breathing motion, and bottom gradient fade mask.
- Kicker & massive editorial serif headline: "A BUILDER'S PERSPECTIVE ON SOFTWARE", followed by "Md Aman" in huge Instrument Serif.
- Subtitle: "I build full-stack web products, solve DSA problems, and turn ideas into working applications."
- 4 CTAs: "Explore my work ↓" (smooth jump to #work), "Download resume ↗" (`download` attribute), "GitHub ↗", "LinkedIn ↗" (both in new tab with rel="noopener noreferrer").
- Bottom status bar: "SCROLL TO DISCOVER ↓", student tag line, and interactive MOTION ON/OFF toggle.
ImpactStrip:
- 4 large numbers from Section 2.4 divided by hairline architectural grid lines with count-up animations on first view (Top 45, 2,768, 3, 2).
Compose both in app/page.js. Make it responsive 360px–1920px. Lint + build, then stop.
```

### Phase 3 — About + Education
```text
Build components/About.jsx (id="about"): numbered eyebrow "01 / ABOUT", headline from about.headline with an italic accent, the paragraphs, the focus chips (Pill), and a compact education list from the `education` array (degree, institute, score, year) laid out as a clean responsive grid (not a heavy table on mobile). Add to app/page.js. Lint + build, then stop.
```

### Phase 4 — Projects (cards + detail pages)
```text
Build the Selected Work section and project pages.
1. components/Projects.jsx (id="work"): eyebrow "02 / SELECTED WORK", headline from Plan.md Section 5, and a grid of numbered ProjectCards mapped from `projects` in data/projects.js. Each card shows number, category, title, subtitle, description, tag pills, and three footer actions: "Live" (external-link icon), "Code" (GitHub icon) and "Read the story" (-> /work/[id]). Both "Live" and "Code" always render — when the matching URL is null the button is rendered disabled (never a link to "#") — and both open in a new tab with rel="noopener noreferrer".
2. app/work/page.js: lists all projects (reusing the same ProjectCard) + a "More on GitHub" strip from `otherRepos`.
3. app/work/[slug]/page.js: statically generated with generateStaticParams; includes generateMetadata per project; layout = title, subtitle, date, tag pills, overview, "What I built" bullet list (highlights), Live + Code buttons, and Prev/Next project navigation. Call notFound() for unknown slugs. Read `params` inside <Suspense> so the static shell stays instant-navigable.
4. If a project has no screenshot, show the generated gradient cover with the project number — do not use stock images.
5. Ship three clearly-marked placeholder entries (E-commerce Dashboard, Realtime Chat App, AI Notes Assistant) with sample copy, generated gradient covers and a "Placeholder" badge.
Hover: card lifts and the arrow nudges (disabled if motion OFF). Lint + build, then stop.
```

### Phase 5 — Skills, Achievements, Certifications, Leadership
```text
Build:
- components/Skills.jsx (id="skills", eyebrow "03 / SKILLS"): one card per group in `skills`, with pills inside. Staggered reveal. Do NOT show percentage bars or star ratings.
- components/Achievements.jsx (id="achievements", eyebrow "04 / ACHIEVEMENTS"): big-stat cards from `achievements` (stat large, label small, description below). If href is null render no link.
- components/Certifications.jsx: list from `certifications` (issuer, title, date), link only if href exists.
- components/Leadership.jsx: cards from `positions`.
Add all to app/page.js in the order defined in Plan.md Section 3. Lint + build, then stop.
```

### Phase 6 — Journey timeline + Resume + Contact ✅ *(built)*
```text
Build:
- components/Timeline.jsx: vertical timeline (single column with a hairline spine and accent dots) using ONLY these dated facts: Feb 2026 CivicBridge, Jul 2026 Google Solution Challenge participation, Aug 2026 HackSlash Co-Lead + IEEE SB Coordinator, Sep 2026 Distributed File Storage + Brand AI-Readiness Audit, then a final "Next" item: "Internships and bigger products" (generic, no company names).
- components/ResumeSection.jsx (id="resume"): short intro, a prominent "Download resume (PDF)" button, and an inline preview via <iframe src="/Md_Aman_Resume.pdf#toolbar=0">. Implemented as a **server component** that checks `fs.existsSync(public/<resume>)` at build time — if the PDF is absent it renders a clear note and a "resume is being finalised" panel instead of a broken frame.
- components/Contact.jsx (id="contact"): closing CTA headline with italic accent, email (mailto), GitHub, LinkedIn buttons, a "Copy email" button with `role="status"` / `aria-live="polite"` confirmation. No backend form; keep it static and spam-safe. Do NOT display the phone number.
Add to app/page.js. Lint + build, then stop.
```

### Phase 7 — SEO, OG image, performance, accessibility ✅ *(built)*
```text
Polish and harden:
- app/opengraph-image.js using next/og ImageResponse (1200x630): dark background, "Md Aman", "Full-Stack Developer · NIT Patna", accent colour. NOTE: with `cacheComponents: true` on Next 16, `export const runtime = "edge"` is rejected — the route must use the default Node.js runtime.
- app/sitemap.js (home, /work, each /work/[slug]) and app/robots.js; JSON-LD <script type="application/ld+json"> Person schema in app/layout.js (name, url, sameAs = GitHub + LinkedIn, alumniOf / affiliation = NIT Patna, jobTitle).
- Use next/image for all images with width/height and alt; lazy-load below the fold.
- Accessibility audit: heading order (single h1), landmark roles, link text clarity, colour contrast >= 4.5:1, focus visible, aria-labels for icon-only buttons, reduced-motion honoured, keyboard-only walkthrough.
- Run a Lighthouse pass (or reason about it) and fix anything under 90 for Performance, Accessibility, Best Practices, SEO.
- not-found.js with a friendly 404 and a link home.
Lint + build, then summarise remaining issues and stop.
```

### Phase 8 — Optional enhancements (only if I ask)
```text
Optional upgrades, do ONE at a time and ask me first:
a) Light/dark theme toggle (system default, persisted).
b) Live GitHub section: a server-side fetch to https://api.github.com/users/md-aman012/repos with `next: { revalidate: 3600 }`, showing public repos (name, description, language, stars) with graceful failure if the API errors/rate-limits.
c) Simple contact form using a hosted form service (Formspree/Web3Forms) with client-side validation and spam honeypot.
d) Custom cursor / subtle spotlight effect (disabled for touch + reduced motion).
e) Blog or "Notes" section using MDX.
```

### Phase 9 — Deploy
```text
Prepare for Vercel deployment:
1. Make sure .gitignore is correct, no secrets in repo, `npm run build` passes with zero errors.
2. Replace profile.siteUrl with the real Vercel URL (ask me for it), update metadataBase, sitemap and canonical.
3. Write a README.md: what it is, tech stack, how to run (npm install, npm run dev), how to edit content (only data/portfolio.js and data/projects.js), and how to deploy to Vercel.
4. Give me the exact git commands to push to a new GitHub repo and the steps to import it on vercel.com.
```

---

## 7. Open Items for Aman to Resolve (the agent must NOT guess these)

1. **Graduation year** — resume says "june 2026" for B.Tech, but you're in 3rd year (UG24 batch), so it's probably **2028**. I used "Expected 2028" in the data file — confirm or fix. (Fix it on the resume PDF too.)
2. **Exact repo links** for Project A (Brand AI-Readiness Audit) and Project B (Distributed File Storage). Your GitHub profile shows 29 repos but I could only see the 4 pinned ones. CivicBridge currently points to your fork of a team repo — confirm that's the one you want to show.
3. **Live demo URLs** for any deployed project (huge credibility boost).
4. **Phone number & email privacy** — I kept the phone off the website. Decide whether to show your college email or `mdaman13720@gmail.com` (from your GitHub README). College email may stop working after you graduate.
5. **Instagram** (`amansaab_0` is on your GitHub README) — left out by default; add only if you want it public.
6. **Certificate/credential URLs** and your **Google Cloud Skills profile URL** so the cards can link out.
7. **A photo** (optional) → `public/images/aman.jpg`. **Dropped** — the About section is now text-only.
8. **Resume cleanups** I noticed while reading it:
   - "Delloite" → **Deloitte**
   - "Mongo DB" → **MongoDB**
   - CivicBridge bullet 4 is an exact duplicate of bullet 2 — I removed it in the data file; replace it with something new if you have it (e.g. how you used Cloudinary for image uploads).
   - Project B and C use "Tools" labels inconsistently; keep one format.
9. **LinkedIn** — I couldn't read your LinkedIn page (it blocks automated access), so nothing from it is used besides your profile URL. If it has anything (headline, experience) you want on the site, paste it into the chat.

---

## 8. Definition of Done / QA Checklist

- [x] `npm run lint` and `npm run build` pass with zero errors/warnings that matter
- [x] All content is read from `data/portfolio.js` and `data/projects.js` (no hard-coded copy in components)
- [x] No TypeScript files anywhere
- [x] Every link works; external links use `rel="noopener noreferrer"`
- [ ] Resume downloads correctly from `/Md_Aman_Resume.pdf` — **PDF not yet added to `public/`**; the section degrades gracefully until it is
- [x] No invented numbers, clients, or quotes
- [x] Works 360px → 1920px; no horizontal scroll
- [x] Browser QA pass at 1440px and 390px — no horizontal overflow, no overlapping text, no invisible text, no broken icons, no failed requests, no console errors; the four cosmetic defects it surfaced are fixed (see `flow.md`)
- [x] Section eyebrows read `00 / PRESENCE` → `09 / LET'S TALK` with no repeated number
- [x] Keyboard-only navigation works; skip link works; focus visible
- [x] Motion toggle works and respects `prefers-reduced-motion`
- [ ] Lighthouse ≥ 90 in all four categories — run a pass on the deployed URL
- [x] OG image and Twitter card render (`/opengraph-image` returns a 1200×630 PNG)
- [ ] Deployed on Vercel; `siteUrl`, sitemap and canonical updated — **`profile.siteUrl` is still the placeholder**
- [ ] GitHub README and LinkedIn "Featured" section link back to the live portfolio

---

## 9. Master Prompt (single-shot alternative)

If your agent handles long tasks well, paste this instead of the phased prompts:

```text
You are a senior front-end engineer. Read Plan.md in full and build the complete portfolio for Md Aman using Next.js (App Router) and JavaScript only (no TypeScript), Tailwind CSS, Framer Motion and lucide-react.
Follow Section 1 hard rules, create data/portfolio.js exactly as in Section 2.2 and data/projects.js as in Section 2.3, emulate the editorial dark design language from Section 3 (do not copy the reference site's text, images or code), use the structure in Section 4, and implement every section of the page map. Never invent facts; use placeholders and TODO.md for anything missing. Work phase by phase (Phases 0–7 in Section 6), run lint and build after each, and give me a short summary plus a list of open items from Section 7 at the end.
```
