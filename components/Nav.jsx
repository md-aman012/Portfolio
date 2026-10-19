"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { profile } from "@/data/portfolio";
import MotionToggle from "./MotionToggle";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Journey", href: "#journey" },
  { label: "Resume", href: "#resume" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    },
    [mobileOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? `blur(var(--nav-blur))` : "none",
        WebkitBackdropFilter: scrolled ? `blur(var(--nav-blur))` : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        className="container-main flex items-center justify-between"
        style={{ height: "var(--nav-height)" }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-serif italic text-2xl tracking-normal transition-opacity hover:opacity-80"
          style={{ color: "var(--text-primary)" }}
        >
          {profile.name}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="link-underline text-sm tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              {link.label}
              <span className="ml-0.5 text-xs" style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}

          <MotionToggle />

          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "var(--bg-page)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.9";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <MotionToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 md:hidden"
          style={{
            top: "var(--nav-height)",
            backgroundColor: "rgba(10, 10, 10, 0.98)",
            backdropFilter: "blur(24px)",
          }}
        >
          <nav
            className="container-main flex flex-col gap-1 pt-8"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-medium py-3 transition-colors"
                style={{
                  color: "var(--text-primary)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {link.label}
                <span className="ml-2 text-sm" style={{ color: "var(--accent)" }}>↗</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-6 text-center text-lg font-semibold py-3.5 rounded-full transition-all"
              style={{
                background: "var(--accent)",
                color: "var(--bg-page)",
              }}
            >
              Let&apos;s talk
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
