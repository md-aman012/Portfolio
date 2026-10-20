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
    repoUrl: "https://github.com/md-aman012", // TODO: replace with the exact repo URL
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
    liveUrl: null, // TODO: live demo URL once deployed
    repoUrl: "https://github.com/md-aman012", // TODO: replace with the exact repo URL
    screenshot: null, // TODO: drop a real screenshot at /images/<id>.jpg
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
    liveUrl: null, // TODO: live demo URL once deployed
    repoUrl: "https://github.com/md-aman012/CivicBridge_Team_Matrix", // TODO: confirm this is the right link
    screenshot: null, // TODO: drop a real screenshot at /images/<id>.jpg
  },

  // ---------------------------------------------------------------------------
  // PLACEHOLDER PROJECTS — replace the entries below with real work.
  // The title, description, tags and links are all sample content; swap them
  // for an actual project (or delete the entry) before publishing.
  // ---------------------------------------------------------------------------
  {
    // TODO: replace with a real project
    id: "demo-ecommerce-dashboard",
    title: "Demo Project One – E-commerce Dashboard",
    subtitle: "Store analytics and inventory control",
    date: "Sample",
    category: "E-commerce · Full-stack",
    description:
      "A full-featured e-commerce dashboard with real-time analytics, inventory management and customer insights. Placeholder project — swap in the real build.",
    highlights: [
      "Built a sales overview with revenue, order and conversion metrics.",
      "Added inventory management with low-stock alerts and restock workflows.",
      "Implemented customer segmentation and repeat-purchase analytics.",
      "Placeholder entry — replace with the real project highlights.",
    ],
    tags: ["Next.js", "Tailwind", "MongoDB"],
    image:
      "linear-gradient(135deg, rgba(255,140,89,0.18) 0%, rgba(255,140,89,0.04) 45%, transparent 100%)",
    liveUrl: "https://demo-ecommerce.vercel.app",
    repoUrl: "https://github.com/md-aman012/demo-ecommerce",
    screenshot: null,
    isPlaceholder: true,
  },
  {
    // TODO: replace with a real project
    id: "demo-realtime-chat",
    title: "Demo Project Two – Realtime Chat App",
    subtitle: "Messaging with presence and typing states",
    date: "Sample",
    category: "Communication · Realtime",
    description:
      "A real-time messaging platform with WebSocket integration, user authentication and file sharing capabilities. Placeholder project — swap in the real build.",
    highlights: [
      "Implemented WebSocket rooms with typing indicators and presence.",
      "Added JWT authentication and per-conversation read receipts.",
      "Built file sharing with drag-and-drop upload and link previews.",
      "Placeholder entry — replace with the real project highlights.",
    ],
    tags: ["React", "Node.js", "Socket.io"],
    image:
      "linear-gradient(135deg, rgba(94,234,212,0.14) 0%, rgba(94,234,212,0.03) 45%, transparent 100%)",
    liveUrl: "https://demo-chat.vercel.app",
    repoUrl: "https://github.com/md-aman012/demo-chat",
    screenshot: null,
    isPlaceholder: true,
  },
  {
    // TODO: replace with a real project
    id: "demo-ai-notes-assistant",
    title: "Demo Project Three – AI Notes Assistant",
    subtitle: "Summaries and topic extraction for notes",
    date: "Sample",
    category: "AI tools · Next.js",
    description:
      "An intelligent note-taking application with AI-powered summarization, topic extraction and smart organization features. Placeholder project — swap in the real build.",
    highlights: [
      "Added one-click summaries and key-point extraction over long notes.",
      "Built automatic tagging and topic clustering across a notebook.",
      "Implemented semantic search over stored notes with PostgreSQL.",
      "Placeholder entry — replace with the real project highlights.",
    ],
    tags: ["Next.js", "OpenAI API", "PostgreSQL"],
    image:
      "linear-gradient(135deg, rgba(167,139,250,0.14) 0%, rgba(167,139,250,0.03) 45%, transparent 100%)",
    liveUrl: "https://demo-ai-notes.vercel.app",
    repoUrl: "https://github.com/md-aman012/demo-ai-notes",
    screenshot: null,
    isPlaceholder: true,
  },
];
