# TODO — Items to confirm before launch

These are extracted from `data/portfolio.js` TODO comments:

## Identity & Links
- [ ] **Confirm preferred public email** — currently `mdamd.ug24.cs@nitp.ac.in` (profile.email)
- [ ] **Replace siteUrl** — currently `https://TODO-your-domain.vercel.app` (profile.siteUrl) — update after Vercel deploy. This drives `metadataBase`, canonical, OG URLs, sitemap, robots, and the JSON-LD `Person` schema.

## Projects
- [ ] **Brand AI-Readiness Audit** — replace GitHub link with exact repo URL (currently points to profile)
- [ ] **Distributed File Storage** — replace GitHub link with exact repo URL (currently points to profile)
- [ ] **Distributed File Storage** — add live demo URL if deployed
- [ ] **CivicBridge** — confirm the fork link `https://github.com/md-aman012/CivicBridge_Team_Matrix` is the correct one
- [ ] **Project screenshots** — the detail pages show a numbered placeholder until a `public/images/<slug>.jpg` exists

## Education
- [ ] **Graduation year** — resume says "june 2026" but batch is UG24, so likely 2028. Currently set to "Expected 2028" — confirm or fix

## Achievements & Certifications
- [ ] **Google Cloud Skills profile URL** — currently null
- [ ] **Google Solution Challenge Hackathon** — credential URL (currently null)
- [ ] **NPTEL Joy of Computing** — credential URL (currently null)
- [ ] **Deloitte Data Analytics** — credential URL (currently null)

## Assets
- [ ] **Resume PDF** — drop `Md_Aman_Resume.pdf` into `public/`. Until it exists the Resume section shows a "being finalised" note instead of a broken preview frame, and the download button is hidden.
- [ ] **Photo** — `public/images/aman.jpg` is already in place and renders in the About section

## Optional
- [ ] **Instagram** — `https://instagram.com/amansaab_0` — uncomment in socials only if Aman wants it public
- [ ] **Live GitHub section** — see Plan.md Phase 8(b): server-side fetch of `https://api.github.com/users/md-aman012/repos` with `revalidate: 3600`
- [ ] **Contact form** — see Plan.md Phase 8(c): hosted form service with honeypot, no backend of our own
