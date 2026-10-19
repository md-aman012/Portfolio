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
  headline: "Curious first. *Builder always.*",
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

// Impact stats for the hero strip (Section 2.3 of Plan.md)
export const stats = [
  {
    value: "Top 45",
    numericTarget: 45,
    prefix: "Top ",
    label: "Adobe University Hackathon",
    detail: "of 3,01,051+ registrations",
  },
  {
    value: "2,768",
    numericTarget: 2768,
    label: "Google Cloud Skills points",
    detail: "Gold League",
  },
  {
    value: "3",
    numericTarget: 3,
    label: "Projects shipped",
    detail: "Full-stack & systems",
  },
  {
    value: "2",
    numericTarget: 2,
    label: "Campus leadership roles",
    detail: "HackSlash Co-Lead & IEEE",
  },
];

