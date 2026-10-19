import fs from "fs";
import path from "path";
import { profile } from "@/data/portfolio";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

function resumeExists() {
  try {
    const filePath = path.join(process.cwd(), "public", profile.resume);
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

export default function ResumeSection() {
  const hasResume = resumeExists();

  return (
    <section id="resume" className="section-padding section-border" aria-label="Resume">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="08" label="RESUME" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            The short version, <em className="accent-italic">on one page.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <Reveal delay={0.2}>
            <div className="h-full bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors duration-200 flex flex-col">
              <h3 className="text-xl font-serif text-[var(--text-primary)] mb-4">
                Download resume (PDF)
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-8 leading-relaxed">
                Experience, skills, education, and achievements — condensed into a
                single page you can skim in under a minute.
              </p>

              {hasResume ? (
                <a
                  href={profile.resume}
                  download
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[var(--accent)] text-[var(--bg-page)] font-mono text-xs uppercase tracking-wider rounded-full hover:bg-[var(--text-primary)] transition-colors duration-200"
                  aria-label="Download Md Aman's resume PDF"
                >
                  Download resume
                </a>
              ) : (
                <p
                  className="rounded-xl border border-dashed px-6 py-5 text-sm text-[var(--text-muted)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  The PDF is being finalised. Reach me directly and I&apos;ll send
                  a copy over.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            {hasResume ? (
              <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
                <iframe
                  src={`${profile.resume}#toolbar=0`}
                  title="Resume preview"
                  className="w-full h-[500px] lg:h-[640px]"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 82%, var(--bg-card) 100%)",
                  }}
                  aria-hidden="true"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-2xl border border-dashed bg-[var(--bg-card)] p-12" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm text-[var(--text-muted)] text-center">
                  Resume preview will appear here once the PDF is uploaded to{" "}
                  <code className="font-mono text-[var(--accent)]">public/</code>.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
