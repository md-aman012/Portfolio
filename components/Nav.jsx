"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  const [activeSection, setActiveSection] = useState(null);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  // Backdrop appears once the page has scrolled away from the hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently under the middle of the viewport
  useEffect(() => {
    const targets = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);
    if (!targets.length) return;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const next =
          navLinks.map((link) => link.href.slice(1)).find((id) => visible.has(id)) ??
          null;
        setActiveSection(next);
      },
      // A thin band across the middle of the viewport decides the active section
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    // Return focus to the trigger so keyboard users are not stranded
    toggleRef.current?.focus();
  }, []);

  // Focus trap + Escape handling for the mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;

    const node = menuRef.current;
    const getFocusable = () =>
      node
        ? Array.from(
            node.querySelectorAll('a[href], button:not([disabled])')
          ).filter((el) => el.offsetParent !== null)
        : [];

    // Move focus into the drawer once it has mounted
    const first = getFocusable()[0];
    if (first) first.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;

      const items = getFocusable();
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  // Prevent body scroll while the drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(8, 8, 8, 0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(var(--nav-blur))" : "none",
        WebkitBackdropFilter: scrolled ? "blur(var(--nav-blur))" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      {/* Gradient scrim keeps the top row readable over the hero particles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[var(--nav-height)] transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3,3,3,0.86) 0%, rgba(3,3,3,0.55) 55%, rgba(3,3,3,0) 100%)",
          opacity: scrolled ? 0 : 1,
        }}
      />

      <nav
        className="container-main relative flex items-center justify-between gap-6"
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

        {/* Desktop links + controls */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
                <span className="nav-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            );
          })}

          <span
            aria-hidden="true"
            className="w-px h-5 shrink-0"
            style={{ background: "var(--border)" }}
          />

          <MotionToggle />

          <a href="#contact" className="nav-cta">
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-3 md:hidden">
          <MotionToggle />
          <button
            ref={toggleRef}
            onClick={() => (mobileOpen ? closeMenu() : setMobileOpen(true))}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg transition-colors"
            style={{ color: "var(--text-primary)" }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 bottom-0 md:hidden z-40 overflow-y-auto"
            style={{
              top: "var(--nav-height)",
              backgroundColor: "rgba(10, 10, 10, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <nav className="container-main flex flex-col gap-1 pt-8 pb-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.45,
                    delay: 0.06 * i + 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-2xl font-medium py-3 transition-colors"
                  style={{
                    color: "var(--text-primary)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {link.label}
                  <span className="ml-2 text-sm" style={{ color: "var(--accent)" }}>
                    ↗
                  </span>
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={closeMenu}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.45,
                  delay: 0.06 * navLinks.length + 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 text-center text-sm font-mono uppercase tracking-wider py-3 rounded-full transition-all"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-page)",
                }}
              >
                Let&apos;s talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
