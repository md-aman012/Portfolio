"use client";

import { certifications } from "@/data/portfolio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function Certifications() {
  return (
    <section className="section-padding section-border" aria-label="Certifications">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="05" label="CERTIFICATIONS" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            Verified skills, <em className="accent-italic">backed by credentials.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={0.1 + i * 0.08}>
              <div className="h-full bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200 flex flex-col">
                <span className="text-[10px] font-mono tracking-wider text-[var(--accent)] mb-2 block">
                  {cert.issuer}
                </span>
                <p className="font-medium text-[var(--text-primary)] mb-1">
                  {cert.title}
                </p>
                <p className="text-sm text-[var(--text-muted)]">
                  {cert.date}
                </p>
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-[10px] font-mono text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    View credential ↗
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}