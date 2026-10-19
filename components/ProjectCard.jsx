"use client";

import Link from "next/link";
import { useMotion } from "@/context/MotionContext";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import Pill from "@/components/ui/Pill";

export default function ProjectCard({ project, index }) {
  const { motionEnabled } = useMotion();
  const num = String((index ?? 0) + 1).padStart(2, "0");

  return (
    <article className="h-full group flex flex-col bg-[var(--bg-card)] rounded-2xl border border-[var(--border)] overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)]">
      {/* Placeholder visual with project number */}
      <div
        className="relative h-48 sm:h-44 flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, rgba(255,140,89,0.10) 0%, rgba(255,140,89,0.02) 45%, transparent 100%)`,
        }}
      >
        <span className="text-7xl font-serif text-[var(--text-muted)] opacity-20 select-none">
          {num}
        </span>
        <span className="absolute top-4 left-5 text-[10px] font-mono tracking-wider text-[var(--accent)]">
          {project.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-serif text-[var(--text-primary)] mb-1">
          {project.title}
        </h3>
        <p className="text-xs font-mono tracking-wide text-[var(--text-muted)] mb-4">
          {project.subtitle} · {project.date}
        </p>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.stack.map((s) => (
            <Pill key={s}>{s}</Pill>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--border)]">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            Read the story
            <ArrowUpRight
              size={13}
              className={motionEnabled ? "transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : ""}
            />
          </Link>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              <GithubIcon size={13} />
              Code
            </a>
          ) : null}
          {project.live ? (
            <a
              href={project.live}
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
  );
}