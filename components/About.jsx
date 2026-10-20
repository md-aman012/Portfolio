import { about, education } from "@/data/portfolio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";

export default function About() {
  return (
    <section id="about" className="section-padding section-border" aria-label="About">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Headline + narrative */}
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow number="01" label="ABOUT" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="heading-section max-w-2xl">
                {about.headline.split(/(\*[^*]+\*)/).map((part, i) =>
                  part.startsWith("*") && part.endsWith("*") ? (
                    <em key={i} className="accent-italic">
                      {part.slice(1, -1)}
                    </em>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </h2>
            </Reveal>

            <div className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[var(--text-muted)]">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Education + focus */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2}>
              <h3
                className="text-xs font-mono tracking-[0.2em] uppercase mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                Education
              </h3>
              <div className="space-y-0">
                {education.map((edu, i) => (
                  <div
                    key={i}
                    className={`py-5 flex flex-col gap-1 ${
                      i !== education.length - 1
                        ? "border-b border-[var(--border)]"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] font-mono tracking-wider text-[var(--accent)]">
                        {edu.year}
                      </span>
                      <span className="text-[10px] font-mono tracking-wider text-[var(--text-muted)]">
                        {edu.score}
                      </span>
                    </div>
                    <p className="text-base font-medium text-[var(--text-primary)]">
                      {edu.degree}
                    </p>
                    <p className="text-sm text-[var(--text-muted)]">
                      {edu.institute}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div
                className="mt-10 pt-8 border-t border-[var(--border)]"
              >
                <h3
                  className="text-xs font-mono tracking-[0.2em] uppercase mb-5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Focus
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {about.focus.map((f) => (
                    <Pill key={f}>{f}</Pill>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
