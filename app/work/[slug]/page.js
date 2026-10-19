import { projects } from "@/data/portfolio";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Md Aman`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <main className="min-h-screen pt-[var(--nav-height)]">
      <section className="section-padding section-border" aria-label="Project Detail">
        <div className="container-main">
          {/* Navigation breadcrumb */}
          <nav className="mb-10" aria-label="Project navigation">
            <div className="flex flex-wrap items-center gap-4">
              {prev ? (
                <Link
                  href={`/work/${prev.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  ← {prev.title}
                </Link>
              ) : null}
              <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] opacity-50">
                {project.slug}
              </span>
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  {next.title} →
                </Link>
              ) : null}
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column */}
            <div className="lg:col-span-8">
              <div
                className="relative h-[520px] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)]"
              >
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full relative"
                  >
                    <Image
                      src={`/images/${project.slug}.jpg`}
                      alt={`Preview of ${project.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1024px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      style={{ filter: "grayscale(20%) contrast(110%)" }}
                      quality={80}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent opacity-60" />
                  </a>
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-surface)] p-12">
                    <span className="text-9xl font-serif text-[var(--text-muted)] opacity-30 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-serif text-[var(--text-primary)]">
                      Visual placeholder
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] max-w-xs text-center">
                      No screenshot for this project yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--accent)]">
                  {project.category}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl tracking-tight leading-[0.95] text-[var(--text-primary)]">
                  {project.title}
                </h1>
                <h2 className="text-lg font-serif text-[var(--text-muted)] italic">
                  {project.subtitle}
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)]">
                  Date
                </span>
                <p className="text-base text-[var(--text-primary)]">{project.date}</p>
              </div>

              <div className="flex flex-col gap-3 border-t border-[var(--border)] pt-6">
                <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)]">
                  Tech stack
                </span>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.stack.map((s) => (
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
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-4 pt-8 border-t border-[var(--border)]">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[var(--border)] text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    <GithubIcon size={14} />
                    View on GitHub
                  </a>
                ) : null}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[var(--accent)] text-[var(--bg-page)] text-xs font-mono uppercase tracking-wider hover:bg-[var(--text-primary)] transition-colors duration-200"
                  >
                    Live Demo
                    <ArrowUpRight size={13} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {/* What I built */}
          <section className="mt-20 pt-16 border-t border-[var(--border)]" aria-label="What I built">
            <h2 className="text-xs font-mono tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-muted)" }}>
              WHAT I BUILT
            </h2>
            <div className="space-y-6">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex gap-4"
                  style={{ opacity: i === 0 ? 1 : 0.9 }}
                >
                  <span className="flex-shrink-0 text-[10px] font-mono tracking-wider text-[var(--accent)] mt-[3px]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-base leading-relaxed text-[var(--text-primary)]">
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}