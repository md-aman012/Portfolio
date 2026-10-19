import { projects, otherRepos } from "@/data/portfolio";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

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
              Three shipped projects spanning full-stack web, distributed systems, and AI tooling. Each built from scratch with production-grade practices.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((p, idx) => (
              <article
                key={p.slug}
                className="group flex flex-col h-full bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)]"
              >
                <div
                  className="relative h-48 sm:h-44 flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,140,89,0.10) 0%, rgba(255,140,89,0.02) 45%, transparent 100%)`,
                  }}
                >
                  <span className="text-7xl font-serif text-[var(--text-muted)] opacity-20 select-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="absolute top-4 left-5 text-[10px] font-mono tracking-wider text-[var(--accent)]">
                    {p.category}
                  </span>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-serif text-[var(--text-primary)] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs font-mono tracking-wide text-[var(--text-muted)] mb-4">
                    {p.subtitle} · {p.date}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                    {p.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="inline-block text-xs font-medium px-3 py-1.5 rounded-full border"
                        style={{
                          color: "var(--text-muted)",
                          borderColor: "var(--border)",
                          background: "var(--bg-surface)",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border)]">
                    <Link
                      href={`/work/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                    >
                      Read the story
                      <ArrowUpRight size={13} />
                    </Link>
                    {p.github ? (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        <GithubIcon size={13} />
                        Code
                      </a>
                    ) : null}
                    {p.live ? (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                      >
                        Live
                        <ArrowUpRight size={12} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
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