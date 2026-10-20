"use client";

import { Fragment, useEffect, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { useMotion } from "@/context/MotionContext";
import { profile, socials } from "@/data/portfolio";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

// Dynamically import particle portrait so it never reaches the browser on the server
const ParticlePortrait = dynamic(() => import("./ParticlePortrait"), {
  ssr: false,
});

// Layout effect on the client only — avoids React's SSR warning while still
// letting us hide the hero type before the first paint.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Hero() {
  const { motionEnabled } = useMotion();

  const heroRef = useRef(null);
  const nameContainerRef = useRef(null); // the <h1> — scoping target for entrance animation
  const eyebrowRef = useRef(null);
  const introRef = useRef(null);
  const actionsRef = useRef(null);
  const bottomRef = useRef(null);
  // One-time flags: guarantee the entrance plays exactly once per page load and
  // never re-triggers on scroll, re-entry, resize, hover, or React re-renders.
  const startedRef = useRef(false);
  const timelineRef = useRef(null);

  // Entrance animation. Runs once after fonts are ready; skipped entirely when
  // motion is OFF (system preference or manual toggle).
  useIsomorphicLayoutEffect(() => {
    if (!motionEnabled || startedRef.current) return;

    const nameEl = nameContainerRef.current;
    if (!nameEl) return;

    // All animatable elements must be present (no hydration race).
    if (
      ![eyebrowRef.current, introRef.current, actionsRef.current, bottomRef.current].every(
        Boolean
      )
    ) {
      return;
    }

    const letters = nameEl.querySelectorAll("[data-letter]");
    const animated = [
      ...letters,
      eyebrowRef.current,
      introRef.current,
      actionsRef.current,
      bottomRef.current,
    ];

    // Hide before the browser paints, so the resting state is never shown
    // before the entrance (no flash).
    if (letters.length) {
      gsap.set(letters, { y: -30, opacity: 0, filter: "blur(12px)" });
    }
    gsap.set([eyebrowRef.current, introRef.current], { y: 16, opacity: 0 });
    gsap.set(actionsRef.current, { y: 10, opacity: 0 });
    gsap.set(bottomRef.current, { opacity: 0 });

    // Wait for web fonts so the per-letter stagger reads naturally and the
    // glyphs never reflow mid-animation.
    const fontsReady =
      typeof document !== "undefined" && document.fonts && document.fonts.ready;

    const start = () => {
      // Guard against a second start (StrictMode mounts the effect twice).
      if (startedRef.current) return;
      startedRef.current = true;

      const timeline = gsap.timeline({
        onComplete: () => {
          // Strip every style GSAP wrote so the heading ends fully static —
          // no leftover transform, opacity or filter.
          gsap.set(animated, { clearProps: "transform,opacity,filter" });
          timelineRef.current = null;
        },
      });
      timelineRef.current = timeline;

      // Per-letter staggered entrance: fade + slide up + blur-to-sharp.
      if (letters.length) {
        timeline.fromTo(
          letters,
          { y: -30, opacity: 0, filter: "blur(12px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.62, stagger: 0.055 },
          0
        );
      }
      // Supporting rows land after the headline settles.
      timeline.fromTo(
        [eyebrowRef.current, introRef.current],
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        1.05
      );
      timeline.fromTo(
        actionsRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.3
      );
      timeline.fromTo(
        bottomRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        1.55
      );
    };

    if (fontsReady) {
      fontsReady.then(start);
    } else {
      start();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      // Restore the resting state on unmount.
      gsap.set(animated, { clearProps: "transform,opacity,filter" });
    };
  }, [motionEnabled]);

  const github =
    socials.find((s) => s.label === "GitHub")?.href ?? "https://github.com/md-aman012";
  const linkedin =
    socials.find(
      (s) => s.label === "LinkedIn"
    )?.href ?? "https://www.linkedin.com/in/md-aman-76000a324/";

  // Render the name as individual letter spans so the entrance can stagger per-letter.
  const nameWords = ["Md", "Aman"];

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex flex-col justify-between min-h-[100svh] pt-[calc(var(--nav-height)+0.5rem)] pb-6 sm:pb-8 overflow-hidden select-none bg-[#030303]"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Real-time 3D Cinematic Particle Portrait */}
      <ParticlePortrait />

      {/* Architectural Background Grid Lines (bottom-faded to blend into surface) */}
      <div
        aria-hidden="true"
        className="pointer-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "20% 100%",
          maskImage:
            "linear-gradient(to bottom, black 30%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 30%, transparent 92%)",
        }}
      />

      {/* Subtle warm amber glow centered behind character/shoulders */}
      <div
        aria-hidden="true"
        className="pointer-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle at 50% 22%, rgba(255, 140, 89, 0.12), rgba(255, 140, 89, 0.03) 38%, transparent 70%)",
        }}
      />

      {/* Top Architectural Status Header Row — shares the page gutter */}
      <div className="container-main w-full relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[var(--border)]">
          <div className="flex items-center gap-2.5 tracking-label text-[9px] sm:text-[10px]">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                backgroundColor: "var(--accent)",
                boxShadow: "0 0 8px var(--accent)",
              }}
              aria-hidden="true"
            />
            <span className="font-mono text-[var(--text-muted)]">
              B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER
            </span>
          </div>
          <div className="tracking-label text-[10px] hidden sm:block font-mono text-[var(--text-muted)] opacity-80">
            BASED IN INDIA · THINKING BEYOND
          </div>
        </div>
      </div>

      {/* Main Center Stage: Layered Oversized Typography Over Particle Portrait */}
      <div
        className="relative z-10 mt-auto mb-6 sm:mb-10 pt-4 pb-2 flex flex-col items-center text-center max-w-5xl mx-auto px-6 pointer-events-none"
      >
        {/* Letters of the name — staggered entrance (no transforms left after animation) */}
        <h1
          ref={nameContainerRef}
          className="hero-heading font-serif tracking-tight leading-[0.9] my-1 sm:my-2 select-text"
          style={{
            color: "#F1EEE8",
            textShadow:
              "0 6px 40px rgba(0,0,0,0.85), 0 2px 15px rgba(0,0,0,0.95)",
          }}
        >
          {nameWords.map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 ? " " : null}
              <span
                className={wi === 1 ? "accent-italic" : undefined}
                // Optical spacing for the italic word (reference: .hero h1 em{margin-left:.035em})
                style={wi === 1 ? { marginLeft: "0.035em" } : undefined}
              >
                {Array.from(word).map((ch, ci) => (
                  <span data-letter key={ci}>{ch}</span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>

        {/* Refined Kicker below the name */}
        <p
          ref={eyebrowRef}
          className="tracking-label text-[10px] sm:text-xs mt-3 sm:mt-4 mb-1.5"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          A DEVELOPER BUILDING THINGS FOR THE WEB
        </p>

        {/* Short introduction paragraph */}
        <p
          ref={introRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto mt-2 sm:mt-3 leading-relaxed font-normal text-[var(--text-muted)]"
          style={{
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          I build thoughtful digital experiences with code, creativity, and curiosity.
        </p>

        {/* Calls to Action: Understated, elegant buttons */}
        <div
          ref={actionsRef}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 pointer-events-auto"
        >
          {/* Primary CTA: Explore My Work */}
          <a
            href="#work"
            className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border backdrop-blur-md cursor-pointer group"
            style={{
              backgroundColor: "rgba(18, 18, 18, 0.75)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.backgroundColor = "rgba(255, 140, 89, 0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.backgroundColor = "rgba(18, 18, 18, 0.75)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>Explore My Work</span>
            <ArrowDown
              size={13}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>

          {/* Secondary CTA: Let's Connect */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 border cursor-pointer backdrop-blur-sm group"
            style={{
              backgroundColor: "rgba(10, 10, 10, 0.4)",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--text-primary)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.backgroundColor = "rgba(10, 10, 10, 0.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Resume download link (desktop only) */}
          <a
            href={profile.resume}
            download
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer opacity-70 hover:opacity-100"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.borderColor = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <Download size={13} />
            <span>Resume</span>
          </a>

          {/* GitHub icon link */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-3 rounded-full text-xs transition-all duration-200 border cursor-pointer opacity-70 hover:opacity-100"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <GithubIcon size={14} />
          </a>

          {/* LinkedIn icon link */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-3 rounded-full text-xs transition-all duration-200 border cursor-pointer opacity-70 hover:opacity-100"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <LinkedinIcon size={14} />
          </a>
        </div>
      </div>

      {/* Bottom Architectural Bar — shares the page gutter */}
      <div className="container-main w-full relative z-10">
        <div
          ref={bottomRef}
          className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)] tracking-label text-[9px] sm:text-[10px]"
        >
          {/* Scroll cue */}
          <a
            href="#impact"
            className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors cursor-pointer group"
            aria-label="Scroll to discover impact numbers"
          >
            <span>SCROLL TO DISCOVER</span>
            <ArrowDown
              size={11}
              className={`transition-transform duration-300 group-hover:translate-y-0.5 ${
                motionEnabled ? "animate-bounce" : ""
              }`}
            />
          </a>

          {/* Center Tagline */}
          <span className="hidden md:inline text-[var(--text-muted)] font-mono opacity-80">
            STUDENT &amp; BUILDER · NIT PATNA
          </span>

          {/* Right Status */}
          <div className="flex items-center gap-4">
            <span className="tracking-label text-[var(--text-muted)] opacity-80 font-mono">
              AN ONGOING EXPLORATION ↗
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 
