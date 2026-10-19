"use client";

import { achievements } from "@/data/portfolio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding section-border" aria-label="Achievements">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="04" label="ACHIEVEMENTS" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            Big moments, <em className="accent-italic">real numbers.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {achievements.map((ach, i) => (
            <Reveal key={ach.stat} delay={0.1 + i * 0.08}>
              <div className="h-full bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200 flex flex-col">
                <span className="text-xs font-mono tracking-[0.2em] uppercase mb-3" style={{ color: "var(--accent)" }}>
                  {ach.title}
                </span>
                <span className="text-4xl sm:text-5xl font-light tracking-tight font-serif mb-2 text-[var(--text-primary)]">
                  {ach.stat}
                </span>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {ach.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}