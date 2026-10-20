# TODO — Items to confirm before launch

These are extracted from the `TODO` comments in `data/portfolio.js` and `data/projects.js`:

## Identity & Links
- [ ] **Confirm preferred public email** — currently `mdamd.ug24.cs@nitp.ac.in` (profile.email)
- [ ] **Replace siteUrl** — currently `https://TODO-your-domain.vercel.app` (profile.siteUrl) — update after Vercel deploy. This drives `metadataBase`, canonical, OG URLs, sitemap, robots, and the JSON-LD `Person` schema.

## Projects — real work (`data/projects.js`)
- [ ] **Brand AI-Readiness Audit** — replace `repoUrl` with the exact repo URL (currently points to the profile)
- [ ] **Brand AI-Readiness Audit** — add `liveUrl` if deployed
- [ ] **Distributed File Storage** — replace `repoUrl` with the exact repo URL (currently points to the profile)
- [ ] **Distributed File Storage** — add `liveUrl` if deployed
- [ ] **CivicBridge** — confirm the fork link `https://github.com/md-aman012/CivicBridge_Team_Matrix` is the correct one
- [ ] **CivicBridge** — add `liveUrl` if deployed
- [ ] **Project screenshots** — the detail pages show the generated gradient cover until `screenshot` points at a real image in `public/images/`

## Projects — placeholders to replace
These three entries are **sample content** so the grid shows its full shape. Each carries a `// TODO: replace with a real project` comment in `data/projects.js` and renders a "Placeholder" badge on the card. Swap them for real work, or delete the entry.
- [ ] **Demo Project One – E-commerce Dashboard** (Next.js, Tailwind, MongoDB) — replace title, description, highlights, tags, `liveUrl` and `repoUrl`
- [ ] **Demo Project Two – Realtime Chat App** (React, Node.js, Socket.io) — replace title, description, highlights, tags, `liveUrl` and `repoUrl`
- [ ] **Demo Project Three – AI Notes Assistant** (Next.js, OpenAI API, PostgreSQL) — replace title, description, highlights, tags, `liveUrl` and `repoUrl`

## Education
- [ ] **Graduation year** — resume says "june 2026" but batch is UG24, so likely 2028. Currently set to "Expected 2028" — confirm or fix

## Achievements & Certifications
- [ ] **Google Cloud Skills profile URL** — currently null
- [ ] **Google Solution Challenge Hackathon** — credential URL (currently null)
- [ ] **NPTEL Joy of Computing** — credential URL (currently null)
- [ ] **Deloitte Data Analytics** — credential URL (currently null)

## Assets
- [ ] **Resume PDF** — drop `Md_Aman_Resume.pdf` into `public/`. Until it exists the Resume section shows a "being finalised" note instead of a broken preview frame, and the download button is hidden.

## Optional
- [ ] **Instagram** — `https://instagram.com/amansaab_0` — uncomment in socials only if Aman wants it public
- [ ] **Live GitHub section** — see Plan.md Phase 8(b): server-side fetch of `https://api.github.com/users/md-aman012/repos` with `revalidate: 3600`
- [ ] **Contact form** — see Plan.md Phase 8(c): hosted form service with honeypot, no backend of our own
