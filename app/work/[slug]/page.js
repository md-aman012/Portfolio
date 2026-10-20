import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} | Md Aman`,
    description: project.description,
  };
}

export default function ProjectPage({ params }) {
  // `params` is read inside <Suspense> so the static shell stays
  // instant-navigable (Next.js App Router requirement).
  return (
    <Suspense fallback={<ProjectFallback />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

function ProjectFallback() {
  return (
    <main className="min-h-screen pt-[var(--nav-height)]">
      <section className="section-padding section-border" aria-label="Loading project">
        <div className="container-main">
          <div
            className="h-[520px] w-full rounded-2xl border border-[var(--border)]"
            style={{ background: "var(--bg-card)" }}
          />
        </div>
      </section>
    </main>
  );
}

async function ProjectContent({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === slug);
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
                  href={`/work/${prev.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  ← {prev.title}
                </Link>
              ) : null}
              <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)] opacity-50">
                {project.id}
              </span>
              {next ? (
                <Link
                  href={`/work/${next.id}`}
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
                className="relative h-[520px] w-full rounded-2xl overflow-hidden border border-[var(--border)]"
                style={{ background: project.image }}
              >
                {project.screenshot ? (
                  <Image
                    src={project.screenshot}
                    alt={`Preview of ${project.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover object-center"
                    quality={80}
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-12">
                    <span className="text-9xl font-serif text-[var(--text-muted)] opacity-30 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-lg font-serif text-[var(--text-primary)]">
                      Visual placeholder
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] max-w-xs text-center">
                      No screenshot for this project yet. Add one to{" "}
                      <code className="font-mono text-xs">/images/{project.id}.jpg</code>{" "}
                      and set the <code className="font-mono text-xs">screenshot</code> field in{" "}
                      <code className="font-mono text-xs">data/projects.js</code>.
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
                {project.isPlaceholder ? (
                  <span className="self-start text-[9px] font-mono tracking-[0.18em] uppercase px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-surface)]">
                    Placeholder entry
                  </span>
                ) : null}
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
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-block text-xs font-medium px-3 py-1.5 rounded-full border"
                      style={{
                        color: "var(--text-muted)",
                        borderColor: "var(--border)",
                        background: "var(--bg-surface)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-8 border-t border-[var(--border)]">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[var(--accent)] text-[var(--bg-page)] text-xs font-mono uppercase tracking-wider hover:bg-[var(--text-primary)] transition-colors duration-200"
                  >
                    Live
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Live link coming soon"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider opacity-40 cursor-not-allowed"
                  >
                    Live
                    <ExternalLink size={13} />
                  </span>
                )}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[var(--border)] text-[var(--text-primary)] text-xs font-mono uppercase tracking-wider hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                  >
                    <GithubIcon size={14} />
                    Code
                  </a>
                ) : (
                  <span
                    aria-disabled="true"
                    title="Repository link coming soon"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full border border-[var(--border)] text-[var(--text-muted)] text-xs font-mono uppercase tracking-wider opacity-40 cursor-not-allowed"
                  >
                    <GithubIcon size={14} />
                    Code
                  </span>
                )}
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                >
                  All work
                  <ArrowUpRight size={13} />
                </Link>
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
