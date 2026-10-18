# Plan.md — Md Aman's Portfolio (Next.js + JavaScript)

> **Purpose:** This file is the single source of truth for an AI coding agent (Claude Code, Cursor, Copilot Agent, etc.) to build my personal portfolio website.
> **How to use:** Put this file in an empty project folder. Tell the agent: *"Read Plan.md fully, then execute the prompts in Section 6 one phase at a time. Stop after each phase and let me review."*

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
4. **All content lives in `data/portfolio.js`.** Components read from it; no hard-coded copy inside components.
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

export const projects = [
  {
    slug: "brand-ai-readiness-audit",
    title: "Brand AI-Readiness Audit",
    subtitle: "Agent Skill Marketplace",
    date: "Sep 2026",
    category: "AI tooling · Python",
    summary:
      "A modular system that audits websites for AI discoverability, content quality and user engagement, and outputs evidence-backed reports.",
    highlights: [
      "Built a modular system to audit websites for AI discoverability, content quality and user engagement.",
      "Implemented web crawling, structured-data validation and automated issue detection.",
      "Generated evidence-backed JSON reports with severity rankings and prioritized recommendations.",
      "Implemented page-type-aware checks, finding deduplication, report validation and read-only website auditing.",
    ],
    stack: ["Python", "Web Crawling", "JSON", "Schema.org", "Playwright"],
    github: "https://github.com/md-aman012", // TODO: replace with exact repo URL
    live: null,
  },
  {
    slug: "distributed-file-storage",
    title: "Distributed File Storage System",
    subtitle: "Secure full-stack file platform",
    date: "Sep 2026",
    category: "Full-stack · Cloud",
    summary:
      "A secure file storage platform with authenticated upload, download, sharing and deletion, backed by AWS S3 and PostgreSQL.",
    highlights: [
      "Developed a secure full-stack file storage platform supporting authenticated upload, download, sharing and deletion of user files.",
      "Implemented JWT authentication and bcrypt password hashing with protected REST APIs.",
      "Integrated AWS S3 and Multer-S3 for direct file streaming, user-isolated storage, MIME validation and 50 MB file-size enforcement.",
      "Designed PostgreSQL-backed file metadata management with S3 presigned URLs for secure, time-limited downloads.",
    ],
    stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "AWS S3", "JWT", "Multer"],
    github: "https://github.com/md-aman012", // TODO: exact repo URL
    live: null, // TODO: live demo URL if deployed
  },
  {
    slug: "civicbridge",
    title: "CivicBridge",
    subtitle: "Transparent Community–Government Feedback Platform",
    date: "Feb 2026",
    category: "Full-stack · Civic tech",
    summary:
      "A platform where residents report civic issues with images and precise location, and the community upvotes and discusses what matters most.",
    highlights: [
      "Developed a full-stack platform enabling residents to report civic issues with images and precise location tracking.",
      "Built interactive features allowing users to upvote, comment and highlight trending community issues.",
      "Incorporated mapping services (Leaflet/Mapbox) to visualize issue locations and identify geographic patterns.",
    ],
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Leaflet/Mapbox"],
    github: "https://github.com/md-aman012/CivicBridge_Team_Matrix", // fork of a team repo — confirm this is the right link
    live: null,
  },
];

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

### 2.3 Honest "impact" numbers (use ONLY these in a stats strip)
- **Top 45 / 3,01,051+** — Adobe University Hackathon
- **2,768** — Google Cloud Skills points (Gold League)
- **3** — full-stack / systems projects shipped
- **2** — campus leadership roles (HackSlash, IEEE SB)

> Do not add fake numbers like "10k users" or "99% uptime".

---

## 3. Design Analysis of the Reference Site (what to emulate)

Observed on the reference portfolio (structure & feel — not its content):

- **Dark, editorial look.** Near-black background (`#030303` theme colour), light text, lots of negative space.
- **Big display typography** with an *italic accent word* inside each headline (e.g. "Ideas are a start. *This is the work.*").
- **Small uppercase tracking labels** as section eyebrows with numbering: `01 / SELECTED WORK`, `02 / …`.
- **Sticky minimal nav** with arrow-suffixed links (Work ↗, About ↗) and a clear "Let's talk" CTA; plus a mobile "Menu".
- **Skip-to-content link** and a visible **"MOTION OFF" toggle** for animation preferences.
- **Hero** → impact stats (3 big numbers) → story/about → selected work (numbered cards) → "how I work" → media/voice → speaking → timeline → contact/footer.
- **Numbered project cards** with category label, title, one-line description, and "Explore the story" link, plus individual project pages (`/work/[slug]`).
- **Timeline** ("2021 / 2024 / Today / Next") for the journey.
- **Closing CTA** ("Something great starts with a hello") and a footer with social links.
- **Rich metadata:** Open Graph image (1200×630), Twitter card, canonical URL, theme-color.

### My adaptation (page map)
| # | Section | Content |
|---|---|---|
| — | Nav | Aman · Work · About · Skills · Achievements · Resume · "Let's talk" |
| 00 | Hero | Name, role line, tagline, CTAs (View work / Resume / GitHub / LinkedIn) |
| 01 | Impact strip | The 4 honest numbers from 2.3 |
| 02 | About | Headline + paragraphs + focus chips + education mini-table |
| 03 | Selected Work | 3 numbered project cards → `/work/[slug]` pages |
| 04 | Skills | Grouped skill cards (from `skills`) |
| 05 | Achievements & Certifications | Big-stat cards + certification list |
| 06 | Journey | Timeline: Feb 2026 CivicBridge → Jul 2026 Google Solution Challenge → Aug 2026 leadership roles → Sep 2026 two new projects → Next |
| 07 | Leadership | Positions of responsibility |
| 08 | Resume | Embedded preview/download button for the PDF |
| 09 | Contact | Closing CTA + email + GitHub + LinkedIn (+ optional simple form) |
| — | Footer | Socials, © year, back to top |

### Design tokens
```
Background:  #0A0A0A (page) · #111111 (surface) · #1A1A1A (card)
Text:        #F5F5F4 (primary) · #A3A3A3 (muted)
Accent:      one accent only — choose an electric teal/lime (e.g. #5EEAD4 or #C6F432); used for italic words, links, focus rings
Border:      rgba(255,255,255,0.08)
Radius:      16px cards, 999px pills
Display font: a serif or grotesk with character (e.g. "Instrument Serif" for italic accents + "Inter"/"Geist" for body) via next/font/google
Section padding: py-24 md:py-32, max-width 1200px container
```
Light mode is optional (Phase 8). Default and primary design is **dark**.

### Motion rules
- Subtle: fade/slide-up on scroll, staggered children, hover lift on cards, animated underline on links.
- A **Motion toggle** in the nav (ON/OFF) persisted in `localStorage`; default follows `prefers-reduced-motion`.
- No heavy WebGL/3D. Keep Lighthouse Performance ≥ 90.

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

**Structure**
```
aman-portfolio/
├─ app/
│  ├─ layout.js            # fonts, metadata, skip link, Nav, Footer
│  ├─ page.js              # home: composes all sections
│  ├─ globals.css          # tokens, base styles
│  ├─ opengraph-image.js   # dynamic OG image (ImageResponse)
│  ├─ sitemap.js
│  ├─ robots.js
│  ├─ not-found.js
│  └─ work/
│     ├─ page.js           # all projects
│     └─ [slug]/page.js    # project detail (generateStaticParams)
├─ components/
│  ├─ Nav.jsx  Footer.jsx  MotionToggle.jsx  SkipLink.jsx
│  ├─ Hero.jsx  ImpactStrip.jsx  About.jsx  Projects.jsx  ProjectCard.jsx
│  ├─ Skills.jsx  Achievements.jsx  Certifications.jsx
│  ├─ Timeline.jsx  Leadership.jsx  ResumeSection.jsx  Contact.jsx
│  └─ ui/  Section.jsx  Eyebrow.jsx  Reveal.jsx  Pill.jsx  Button.jsx
├─ context/MotionContext.jsx
├─ data/portfolio.js       # from Section 2.2
├─ public/
│  ├─ Md_Aman_Resume.pdf
│  └─ images/              # optional photo, project screenshots
├─ TODO.md
└─ Plan.md
```

---

## 5. Content Copy Drafts (agent may use; Aman will edit)

- **Hero eyebrow:** `B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER`
- **Hero headline:** `Aman *builds*` / `things that work.` *(italic accent on one word)*
- **Hero sub:** "Third-year CSE student at NIT Patna. I build full-stack web apps, enjoy DSA, and learn the most by shipping."
- **About headline:** "Curious first. *Builder always.*"
- **Projects headline:** "Ideas are a start. *This is the work.*" → change to something original, e.g. "Three things I built. *Here's how.*"
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
3. Create data/portfolio.js using the exact code in Section 2.2.
4. Create the folder structure from Section 4 with empty placeholder components that export a simple default function.
5. Create TODO.md listing every "TODO" comment found in data/portfolio.js.
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

### Phase 2 — Hero + Impact strip
```text
Build components/Hero.jsx and components/ImpactStrip.jsx using data from data/portfolio.js and Section 2.3 / Section 5 of Plan.md.
Hero: full-viewport-height on desktop, eyebrow label, huge display headline with ONE italic accent word, subtitle, 4 CTAs (View my work -> #work, Download resume -> profile.resume with the download attribute, GitHub, LinkedIn — external links open in a new tab with rel="noopener noreferrer"). Add a subtle animated background (soft gradient glow or fine grid) that is disabled when motion is OFF. A "Scroll to discover" cue at the bottom.
ImpactStrip: 4 large numbers from Section 2.3 with small labels, count-up animation on first view (skipped when motion is OFF). Numbers must come from data (achievements + a small `stats` array you add to data/portfolio.js: Top 45, 2,768, 3, 2). No invented figures.
Compose both in app/page.js. Make it responsive 360px–1920px. Lint + build, then stop.
```

### Phase 3 — About + Education
```text
Build components/About.jsx (id="about"): numbered eyebrow "01 / ABOUT", headline from about.headline with an italic accent, the paragraphs, the focus chips (Pill), and a compact education list from the `education` array (degree, institute, score, year) laid out as a clean responsive grid (not a heavy table on mobile). Optional circular/rounded photo slot that renders only if public/images/aman.jpg exists — otherwise a tasteful monogram "MA". Add to app/page.js. Lint + build, then stop.
```

### Phase 4 — Projects (cards + detail pages)
```text
Build the Selected Work section and project pages.
1. components/Projects.jsx (id="work"): eyebrow "02 / SELECTED WORK", headline from Plan.md Section 5, three numbered ProjectCards (01, 02, 03) from `projects`. Each card shows number, category, title, subtitle, summary, stack pills, and links: "Read the story" (-> /work/[slug]), GitHub, and Live (only if not null).
2. app/work/page.js: lists all projects + a "More on GitHub" strip from `otherRepos`.
3. app/work/[slug]/page.js: statically generated with generateStaticParams; includes generateMetadata per project; layout = title, subtitle, date, stack pills, overview, "What I built" bullet list (highlights), links, and Prev/Next project navigation. Call notFound() for unknown slugs.
4. If a project has no screenshot, show a neat gradient placeholder card with the project number — do not use stock images.
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

### Phase 6 — Journey timeline + Resume + Contact
```text
Build:
- components/Timeline.jsx: vertical timeline (alternating on desktop, single column on mobile) using ONLY these dated facts: Feb 2026 CivicBridge, Jul 2026 Google Solution Challenge participation, Aug 2026 HackSlash Co-Lead + IEEE SB Coordinator, Sep 2026 Distributed File Storage + Brand AI-Readiness Audit, then a final "Next" item: "Internships and bigger products" (generic, no company names).
- components/ResumeSection.jsx (id="resume"): short intro, a prominent "Download resume (PDF)" button, and an inline preview via <iframe src="/Md_Aman_Resume.pdf#toolbar=0"> on desktop with a graceful fallback message + link on mobile. If the file is missing, show a clear note instead of a broken frame.
- components/Contact.jsx (id="contact"): closing CTA headline with italic accent, email (mailto), GitHub, LinkedIn buttons, a "Copy email" button with a toast/aria-live confirmation. No backend form; keep it static and spam-safe. Do NOT display the phone number.
Add to app/page.js. Lint + build, then stop.
```

### Phase 7 — SEO, OG image, performance, accessibility
```text
Polish and harden:
- app/opengraph-image.js using next/og ImageResponse (1200x630): dark background, "Md Aman", "Full-Stack Developer · NIT Patna", accent colour.
- app/sitemap.js (home, /work, each /work/[slug]) and app/robots.js; JSON-LD <script type="application/ld+json"> Person schema on the home page (name, url, sameAs = GitHub + LinkedIn, alumniOf / affiliation = NIT Patna, jobTitle).
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
3. Write a README.md: what it is, tech stack, how to run (npm install, npm run dev), how to edit content (only data/portfolio.js), and how to deploy to Vercel.
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
7. **A photo** (optional) → `public/images/aman.jpg`.
8. **Resume cleanups** I noticed while reading it:
   - "Delloite" → **Deloitte**
   - "Mongo DB" → **MongoDB**
   - CivicBridge bullet 4 is an exact duplicate of bullet 2 — I removed it in the data file; replace it with something new if you have it (e.g. how you used Cloudinary for image uploads).
   - Project B and C use "Tools" labels inconsistently; keep one format.
9. **LinkedIn** — I couldn't read your LinkedIn page (it blocks automated access), so nothing from it is used besides your profile URL. If it has anything (headline, experience) you want on the site, paste it into the chat.

---

## 8. Definition of Done / QA Checklist

- [ ] `npm run lint` and `npm run build` pass with zero errors/warnings that matter
- [ ] All content is read from `data/portfolio.js` (no hard-coded copy in components)
- [ ] No TypeScript files anywhere
- [ ] Every link works; external links use `rel="noopener noreferrer"`
- [ ] Resume downloads correctly from `/Md_Aman_Resume.pdf`
- [ ] No invented numbers, clients, or quotes
- [ ] Works 360px → 1920px; no horizontal scroll
- [ ] Keyboard-only navigation works; skip link works; focus visible
- [ ] Motion toggle works and respects `prefers-reduced-motion`
- [ ] Lighthouse ≥ 90 in all four categories
- [ ] OG image and Twitter card render (test with a link preview tool)
- [ ] Deployed on Vercel; `siteUrl`, sitemap and canonical updated
- [ ] GitHub README and LinkedIn "Featured" section link back to the live portfolio

---

## 9. Master Prompt (single-shot alternative)

If your agent handles long tasks well, paste this instead of the phased prompts:

```text
You are a senior front-end engineer. Read Plan.md in full and build the complete portfolio for Md Aman using Next.js (App Router) and JavaScript only (no TypeScript), Tailwind CSS, Framer Motion and lucide-react.
Follow Section 1 hard rules, create data/portfolio.js exactly as in Section 2.2, emulate the editorial dark design language from Section 3 (do not copy the reference site's text, images or code), use the structure in Section 4, and implement every section of the page map. Never invent facts; use placeholders and TODO.md for anything missing. Work phase by phase (Phases 0–7 in Section 6), run lint and build after each, and give me a short summary plus a list of open items from Section 7 at the end.
```
