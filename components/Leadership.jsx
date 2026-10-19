"use client";

import { positions } from "@/data/portfolio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

export default function Leadership() {
  return (
    <section id="leadership" className="section-padding section-border" aria-label="Leadership">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="07" label="LEADERSHIP" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            Building things <em className="accent-italic">with other people.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {positions.map((pos, i) => (
            <Reveal key={`${pos.role}-${pos.org}`} delay={0.1 + i * 0.08}>
              <div className="h-full bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200">
                <span className="text-[10px] font-mono tracking-wider text-[var(--accent)] block mb-3">
                  {pos.date}
                </span>
                <h3 className="text-2xl font-serif text-[var(--text-primary)] mb-1">
                  {pos.role}
                </h3>
                <p className="text-sm text-[var(--text-muted)]">{pos.org}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
