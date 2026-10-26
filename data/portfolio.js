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
  email: "mdaman13720@gmail.com", // TODO: confirm preferred public email
  resume: "/Resume.pdf",
  siteUrl: "https://TODO-your-domain.vercel.app", // TODO: replace after deploy
};


export const socials = [
  { label: "GitHub", href: "https://github.com/md-aman012" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/md-aman-76000a324/" },
  { label: "Email", href: "mailto:mdaman13720@gmail.com" },
  // Optional: { label: "Instagram", href: "https://instagram.com/amansaab_0" }, // TODO: only if Aman wants it public
];

export const about = {
  headline: "Curious first. *Builder always.*",
  paragraphs: [
    "I'm a third-year Computer Science student at NIT Patna with a strong interest in web development, JavaScript and data structures & algorithms.",
    "I like building real-world projects end to end — from the database and REST APIs to the interface people actually use.",
    "Outside of class I help run tech communities on campus and take part in hackathons, where I learn the most.",
  ],
  focus: ["Full-stack web", "Agentic AI", "DSA & problem solving", "Cloud Services"],
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

// Projects live in their own file — see data/projects.js.

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
    value: "8+",
    numericTarget: 8,
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

