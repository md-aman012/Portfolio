import { projects } from "@/data/projects";
import { profile } from "@/data/portfolio";

export default function sitemap() {
  const base = profile.siteUrl.replace(/\/$/, "");

  const staticRoutes = ["", "/work"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "monthly" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
