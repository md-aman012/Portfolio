"use client";

import Link from "next/link";
import { useMotion } from "@/context/MotionContext";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import Pill from "@/components/ui/Pill";

const actionBase =
  "inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full border text-xs font-mono uppercase tracking-wider transition-colors duration-200";

// Cap the pill list so every card in the grid keeps the same height.
const MAX_VISIBLE_TAGS = 5;

export default function ProjectCard({ project, index }) {
  const { motionEnabled } = useMotion();
  const num = String((index ?? 0) + 1).padStart(2, "0");
  const { liveUrl, repoUrl } = project;

  // A missing URL renders a disabled button — never a dead link to "#".
  const liveButton = liveUrl ? (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} — open the live site in a new tab`}
      className={`${actionBase} border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]`}
    >
      Live
      <ExternalLink size={12} />
    </a>
  ) : (
    <span
      aria-disabled="true"
      title="Live link coming soon"
      className={`${actionBase} border-[var(--border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed`}
    >
      Live
      <ExternalLink size={12} />
    </span>
  );

  const codeButton = repoUrl ? (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.title} source code on GitHub`}
      className={`${actionBase} border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]`}
    >
      <GithubIcon size={13} />
      Code
    </a>
  ) : (
    <span
      aria-disabled="true"
      title="Repository link coming soon"
      className={`${actionBase} border-[var(--border)] text-[var(--text-muted)] opacity-40 cursor-not-allowed`}
    >
      <GithubIcon size={13} />
      Code
    </span>
  );

  return (
    <article className="h-full group flex flex-col bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] hover:-translate-y-1">
      {/* Cover visual — generated gradient, never an external image */}
      <div
        className="relative h-48 sm:h-44 flex items-center justify-center overflow-hidden"
        style={{ background: project.image }}
      >
        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(255,140,89,0.10),transparent_65%)]" />
        <span className="text-7xl font-serif text-[var(--text-muted)] opacity-20 select-none">
          {num}
        </span>
        <span className="absolute top-4 left-5 text-[10px] font-mono tracking-wider text-[var(--accent)]">
          {project.category}
        </span>
        {project.isPlaceholder ? (
          <span className="absolute top-3.5 right-4 text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-1 rounded-full border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-surface)]">
            Placeholder
          </span>
        ) : null}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-serif text-[var(--text-primary)] mb-1 min-h-[3.5rem]">
          {project.title}
        </h3>
        <p className="text-xs font-mono tracking-wide text-[var(--text-muted)] mb-4 min-h-[2rem]">
          {project.subtitle} · {project.date}
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 min-h-[4.375rem] line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6 min-h-[6.375rem] sm:min-h-[4.25rem] content-start">
          {project.tags.slice(0, MAX_VISIBLE_TAGS).map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
          {project.tags.length > MAX_VISIBLE_TAGS ? (
            <Pill key="more">+{project.tags.length - MAX_VISIBLE_TAGS}</Pill>
          ) : null}
        </div>

        <div className="mt-auto pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {liveButton}
            {codeButton}
          </div>
          <Link
            href={`/work/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            Read the story
            <ArrowUpRight
              size={13}
              className={
                motionEnabled
                  ? "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  : ""
              }
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
