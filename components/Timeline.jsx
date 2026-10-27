"use client";

import Reveal from "@/components/ui/Reveal";

const timelineItems = [
  {
    title: "Aug 2024",
    subtitle: "Started at NIT Patna",
    content:
      "Began my B.Tech in Computer Science and Engineering, turning curiosity into a passion for technology.",
  },
  {
    title: "Nov 2024",
    subtitle: "Joined the Developer Community",
    content:
      "Became a Blockchain Developer at HackSlash and a Student Web Developer at IEEE Student Branch.",
  },
  {
    title: "2025",
    subtitle: "From Code to Projects",
    content:
      "Built full-stack applications with the MERN stack and explored cloud technologies and AI-powered solutions.",
  },
  {
    title: "2026",
    subtitle: "Hackathons & AI Innovation",
    content:
      "Achieved Top 45 in the Adobe University Hackathon, built distributed storage systems, and explored GPT-based models and agentic AI.",
  },
  {
    title: "Next",
    subtitle: "Internships & Bigger Ideas",
    content:
      "Looking for impactful internships, ambitious collaborations, and opportunities to build products that matter.",
  },
];

export default function Timeline() {
  return (
    <section
      id="journey"
      className="section-padding section-border"
      aria-label="Journey"
    >
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
                From ideas to impact,{" "}
                <em className="accent-italic">one step at a time.</em>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <div className="relative">
              <div
                className="absolute left-[5px] top-1 bottom-0 w-px bg-[var(--border)]"
                aria-hidden="true"
              />

              {timelineItems.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.08}>
                  <div className="relative flex gap-8 mb-10 last:mb-0">
                    {/* Timeline bullet */}
                    <div
                      className="relative flex-shrink-0 w-3"
                      aria-hidden="true"
                    >
                      <div className="w-[11px] h-[11px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg-page)] mt-[3px]" />
                    </div>

                    {/* Timeline content */}
                    <div className="flex-1 min-w-0 pb-2">
                      <h3 className="text-xs font-mono tracking-wider text-[var(--accent)] mb-2">
                        {item.title}
                      </h3>

                      <h4 className="text-base md:text-lg font-semibold text-[var(--text-primary)] leading-snug mb-1">
                        {item.subtitle}
                      </h4>

                      <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
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
