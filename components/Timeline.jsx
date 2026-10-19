"use client";

import Reveal from "@/components/ui/Reveal";

const timelineItems = [
  { title: "Feb 2026", content: "CivicBridge — Full-stack community feedback platform" },
  { title: "Jul 2026", content: "Google Solution Challenge participation" },
  { title: "Aug 2026", content: "HackSlash Co-Lead + IEEE Student Branch Coordinator" },
  { title: "Sep 2026", content: "Distributed File Storage + Brand AI-Readiness Audit" },
  { title: "Next", content: "Internships and bigger products" },
];

export default function Timeline() {
  return (
    <section id="journey" className="section-padding section-border" aria-label="Journey">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <Reveal>
              <h3
                className="text-xs font-mono tracking-[0.2em] uppercase mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                06 / JOURNEY
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-section max-w-xs">
                From ideas to impact, <em className="accent-italic">one step at a time.</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute left-[5px] top-1 bottom-0 w-px bg-[var(--border)]" aria-hidden="true" />

              {timelineItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.08}>
                  <div className="relative flex gap-8 mb-10 last:mb-0">
                    <div className="relative flex-shrink-0 w-3" aria-hidden="true">
                      <div className="w-[11px] h-[11px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg-page)] mt-1.5" />
                    </div>

                    <div className="flex-1 min-w-0 pb-2">
                      <h3 className="text-xs font-mono tracking-wider text-[var(--accent)] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-base text-[var(--text-primary)] leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
