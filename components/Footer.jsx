"use client";

import { socials, profile } from "@/data/portfolio";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Email: Mail,
};

export default function Footer() {
  const year = 2026;

  return (
    <footer
      className="section-border"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="container-main py-12 md:py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Socials */}
          <div className="flex items-center gap-5">
            {socials.map((s) => {
              const Icon = iconMap[s.label];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="p-2.5 rounded-full transition-all duration-200 border"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.background = "var(--accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {Icon && <Icon size={18} />}
                </a>
              );
            })}
          </div>

          {/* Back to top */}
          <a
            href="#"
            className="flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            aria-label="Back to top"
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            Back to top
            <ArrowUp size={14} />
          </a>
        </div>

        {/* Bottom row */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p>Built with Next.js. Always learning.</p>
        </div>
      </div>
    </footer>
  );
}
