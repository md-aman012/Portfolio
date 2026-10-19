"use client";

import { socials } from "@/data/portfolio";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const emailHref =
    socials.find((s) => s.label === "Email")?.href || "mailto:mdamd.ug24.cs@nitp.ac.in";
  const emailAddress = emailHref.replace("mailto:", "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard unavailable (insecure context) — the mailto link still works.
    }
  };

  return (
    <section id="contact" className="section-padding section-border" aria-label="Contact">
      <div className="container-main">
        <Reveal>
          <Eyebrow number="09" label="LET&apos;S TALK" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="heading-section max-w-2xl">
            Have an idea or an opportunity? <em className="accent-italic">Say hello.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12 bg-[var(--bg-surface)] rounded-2xl p-8 md:p-12 border border-[var(--border)]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
              <div className="flex-1">
                <p className="font-serif text-2xl sm:text-3xl text-[var(--text-primary)] leading-tight mb-4">
                  Open to internships, freelance projects, and collaborations.
                </p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
                  I read every message. If you&apos;re building something and want a
                  second pair of hands, tell me about it — I&apos;ll get back to you.
                </p>
              </div>

              <div className="flex flex-col gap-4 lg:w-72">
                {socials.map((s) => {
                  const Icon = iconMap[s.label];
                  const isEmail = s.label === "Email";
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target={isEmail ? undefined : "_blank"}
                      rel={isEmail ? undefined : "noopener noreferrer"}
                      aria-label={isEmail ? `Email ${s.label}` : `${s.label} profile`}
                      className="group inline-flex items-center justify-between gap-4 px-6 py-4 rounded-full border text-xs font-mono uppercase tracking-wider transition-colors duration-200"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-primary)",
                        background: "var(--bg-card)",
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        {Icon ? <Icon size={15} /> : null}
                        {s.label}
                      </span>
                      {isEmail ? (
                        <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      ) : (
                        <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                      )}
                    </a>
                  );
                })}

                <button
                  type="button"
                  onClick={handleCopy}
                  aria-label="Copy email address to clipboard"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-200"
                  style={{
                    background: "var(--accent)",
                    color: "var(--bg-page)",
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy email"}
                </button>

                <p
                  className="text-center text-[10px] font-mono tracking-wider text-[var(--text-muted)] h-4"
                  role="status"
                  aria-live="polite"
                >
                  {copied ? emailAddress : ""}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
