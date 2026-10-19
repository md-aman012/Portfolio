"use client";

import { skills } from "@/data/portfolio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";

export default function Skills() {
  return (
    <section id="skills" className="section-padding section-border" aria-label="Skills">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="03" label="SKILLS" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            Tools I reach for, <em className="accent-italic">every time.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <Reveal key={category} delay={0.1 * (idx % 6)}>
              <div className="h-full bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200">
                <h3 className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <Pill key={skill}>{skill}</Pill>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}