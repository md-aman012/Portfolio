/**
 * Single source of truth for every project shown on the site.
 *
 * Shape:
 *   id       — unique key, also the `/work/<id>` route segment
 *   title    — card + detail heading
 *   category — short mono label shown on the cover
 *   description — one-paragraph summary used on the card and the detail page
 *   tags[]   — tech stack pills
 *   image    — CSS gradient used as the cover visual (no external images)
 *   liveUrl  — deployed site, or null when there is nothing to link to yet
 *   repoUrl  — GitHub repository, or null when there is nothing to link to yet
 *
 * Optional extras used by the detail page:
 *   subtitle, date, highlights[], screenshot (path under /public/images)
 *
 * `isPlaceholder: true` marks a sample entry — the card shows a PLACEHOLDER
 * badge so demo content is never mistaken for shipped work.
 *
 * To add a project: append one object to the array below. Cards, the
 * /work index and the /work/<id> detail page all read from here.
 */
export const projects = [
  {
    id: "brand-ai-readiness-audit",
    title: "Brand AI-Readiness Audit",
    subtitle: "Agent Skill Marketplace",
    date: "Sep 2026",
    category: "AI tooling · Python",
    description:
      "A modular system that audits websites for AI discoverability, content quality and user engagement, and outputs evidence-backed reports.",
    highlights: [
      "Built a modular system to audit websites for AI discoverability, content quality and user engagement.",
      "Implemented web crawling, structured-data validation and automated issue detection.",
      "Generated evidence-backed JSON reports with severity rankings and prioritized recommendations.",
      "Implemented page-type-aware checks, finding deduplication, report validation and read-only website auditing.",
    ],
    tags: ["Python", "Web Crawling", "JSON", "Schema.org", "Playwright"],
    image:
      "linear-gradient(135deg, rgba(255,140,89,0.16) 0%, rgba(255,140,89,0.04) 45%, transparent 100%)",
    liveUrl: null, // TODO: live demo URL once deployed
    repoUrl: "https://github.com/md-aman012/Ai_Audit_Adobe_Hackathon", // TODO: replace with the exact repo URL
    screenshot: null, // TODO: drop a real screenshot at /images/<id>.jpg
  },
  {
    id: "distributed-file-storage",
    title: "Distributed File Storage System",
    subtitle: "Secure full-stack file platform",
    date: "Sep 2026",
    category: "Full-stack · Cloud",
    description:
      "A secure file storage platform with authenticated upload, download, sharing and deletion, backed by AWS S3 and PostgreSQL.",
    highlights: [
      "Developed a secure full-stack file storage platform supporting authenticated upload, download, sharing and deletion of user files.",
      "Implemented JWT authentication and bcrypt password hashing with protected REST APIs.",
      "Integrated AWS S3 and Multer-S3 for direct file streaming, user-isolated storage, MIME validation and 50 MB file-size enforcement.",
      "Designed PostgreSQL-backed file metadata management with S3 presigned URLs for secure, time-limited downloads.",
    ],
    tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "AWS S3", "JWT", "Multer"],
    image:
      "linear-gradient(135deg, rgba(255,140,89,0.13) 0%, rgba(255,140,89,0.03) 50%, transparent 100%)",
    liveUrl: "https://distributed-file-storage-xi.vercel.app/", // TODO: live demo URL once deployed
    repoUrl: "https://github.com/md-aman012/Distributed-file-Storage", // TODO: replace with the exact repo URL
    screenshot: "/images/2.jpg", // TODO: drop a real screenshot at /images/<id>.jpg
  },
  {
    id: "civicbridge",
    title: "CivicBridge",
    subtitle: "Transparent Community–Government Feedback Platform",
    date: "Feb 2026",
    category: "Full-stack · Civic tech",
    description:
      "A platform where residents report civic issues with images and precise location, and the community upvotes and discusses what matters most.",
    highlights: [
      "Developed a full-stack platform enabling residents to report civic issues with images and precise location tracking.",
      "Built interactive features allowing users to upvote, comment and highlight trending community issues.",
      "Incorporated mapping services (Leaflet/Mapbox) to visualize issue locations and identify geographic patterns.",
    ],
    tags: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "JWT", "Cloudinary", "Leaflet/Mapbox"],
    image:
      "linear-gradient(135deg, rgba(255,140,89,0.15) 0%, rgba(255,140,89,0.02) 55%, transparent 100%)",
    liveUrl: "https://civic-bridge-team-matrix.vercel.app/", // TODO: live demo URL once deployed
    repoUrl: "https://github.com/md-aman012/CivicBridge_Team_Matrix", // TODO: confirm this is the right link
    screenshot: "/images/3.jpg", // TODO: drop a real screenshot at /images/<id>.jpg
  },

  // ---------------------------------------------------------------------------
  // PLACEHOLDER PROJECTS — replace the entries below with real work.
  // The title, description, tags and links are all sample content; swap them
  // for an actual project (or delete the entry) before publishing.
  // ---------------------------------------------------------------------------
  {
  id: "Workout-Tracker",
  title: "Workout Tracker",
  subtitle: "Track Every Rep. Measure Your Progress.",
  date: "2026",
  category: "Full-Stack · Fitness Tech",
  description:
    "A full-stack fitness tracking application built to help users manage workouts, log exercises and sets, review training history, and visualize progress through interactive charts. Features authentication, daily workout tracking, and weekly workout summaries.",
  highlights: [
    "Built workout logging with exercise management and set-by-set tracking.",
    "Developed workout history and daily/weekly views to review training activity.",
    "Integrated interactive progress charts to visualize workout trends.",
    "Implemented Supabase integration and authentication flows with Next.js server-side support."
  ],
  tags: [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Supabase",
    "Recharts"
  ],
  image:
    "linear-gradient(135deg, rgba(34,197,94,0.20) 0%, rgba(16,185,129,0.08) 45%, transparent 100%)",
  liveUrl: "https://workout-tracker-eight-lovat.vercel.app/",
  repoUrl: "https://github.com/md-aman012/Workout_Tracker",
  screenshot: "/images/4.jpg",
  isPlaceholder: false,
},
{
  id: "IEEE-SB-NITP",
  title: "IEEE SB NIT Patna Website",
  subtitle: "Building the Digital Presence of IEEE SB NITP",
  date: "2025",
  category: "Open Source · Web Development",
  description:
    "Contributed to the official website of the IEEE Student Branch at NIT Patna, collaborating on UI improvements, website navigation, and component integration to enhance the online experience for students and visitors.",
  highlights: [
    "Updated the homepage to align with a revised Figma design.",
    "Improved the Contact Us section by integrating the dedicated contact page.",
    "Updated the Become a Member button to navigate users to the membership page.",
    "Fixed a duplicate footer issue to maintain a consistent page layout."
  ],
  tags: [
    "Next.js",
    "React",
    "JavaScript",
    "Tailwind CSS",
    "Git",
    "Collaborative Development"
  ],
  image:
    "linear-gradient(135deg, rgba(59,130,246,0.20) 0%, rgba(99,102,241,0.08) 45%, transparent 100%)",
  liveUrl: "https://ieeesbnitp.vercel.app/",
  repoUrl: "https://github.com/Sandeepkumargond/IEEE_SB_NITP-official-site",
  screenshot: "/images/5.jpg",
  isPlaceholder: false,
},
  {
  id: "Personal-Blog",
  title: "Personal Blog Platform",
  subtitle: "A Space to Write, Publish, and Share Ideas",
  date: "2026",
  category: "Full-Stack · Web Development",
  description:
    "A full-stack blogging platform that enables users to create, publish, edit, and manage blog posts through a dedicated dashboard. Built with a React frontend and Node.js/Express backend, it includes user authentication, protected routes, Markdown rendering, and a MongoDB-backed content management system.",
  highlights: [
    "Developed login and signup flows with JWT-based authentication and protected routes.",
    "Implemented blog post creation, editing, deletion, and retrieval using REST APIs.",
    "Integrated MongoDB and Mongoose for storing users and blog posts, with unique URL-friendly slugs.",
    "Improved the interface with responsive styling, dark-mode support, and a dashboard for managing posts."
  ],
  tags: [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT",
    "REST API"
  ],
  image:
    "linear-gradient(135deg, rgba(139,92,246,0.20) 0%, rgba(59,130,246,0.08) 45%, transparent 100%)",
  liveUrl: "https://blog-xi-lac-93.vercel.app/",
  repoUrl: "https://github.com/md-aman012/Blog",
  screenshot: "/images/6.png",
  isPlaceholder: false,
},
];
