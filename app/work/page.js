import { projects } from "@/data/projects";
import { otherRepos } from "@/data/portfolio";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "All Projects | Md Aman",
  description: "Explore all my full-stack, AI, and systems projects with source code and live demos.",
};

export default function WorkPage() {
  return (
    <main className="min-h-screen pt-[var(--nav-height)]">
      <section className="section-padding section-border" aria-label="All Projects">
        <div className="container-main">
          <div className="max-w-3xl">
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-muted)" }}>
              02 / ALL PROJECTS
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95] text-[var(--text-primary)] mb-6">
              Ideas are a start. <em className="text-[var(--accent)] font-serif italic">This is the work.</em>
            </h1>
            <p className="text-base text-[var(--text-muted)] leading-relaxed">
              Shipped projects spanning full-stack web, distributed systems, and AI tooling — each built from scratch with production-grade practices. Entries marked as placeholders are still waiting on their real write-up.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((p, idx) => (
              <ProjectCard key={p.id} project={p} index={idx} />
            ))}
          </div>

          {/* More on GitHub strip */}
          <div className="mt-16 pt-12 border-t border-[var(--border)]">
            <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-muted)" }}>
              MORE ON GITHUB
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherRepos.map((repo, i) => (
                <Link
                  key={repo.name}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-serif text-[var(--text-muted)] opacity-30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {repo.name}
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                    {repo.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    View on GitHub
                    <ArrowUpRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
