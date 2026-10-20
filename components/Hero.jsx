"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useMotion } from "@/context/MotionContext";
import { profile, socials } from "@/data/portfolio";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { gsap } from "gsap";

// Dynamically import ParticlePortrait with SSR disabled to prevent WebGL server-side issues
const ParticlePortrait = dynamic(() => import("./ParticlePortrait"), {
  ssr: false,
});

export default function Hero() {
  const { motionEnabled } = useMotion();
  const heroRef = useRef(null);

  const eyebrowRef = useRef(null);
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const actionsRef = useRef(null);
  const bottomRef = useRef(null);

  // Coordinated entrance animation with GSAP
  useEffect(() => {
    if (!motionEnabled) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Eyebrow reveal
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.35
        );
      }

      // Oversized editorial name reveal
      if (nameRef.current) {
        tl.fromTo(
          nameRef.current,
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: "power2.out" },
          0.5
        );
      }

      // Intro text reveal
      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.75
        );
      }

      // Actions / CTAs reveal
      if (actionsRef.current) {
        tl.fromTo(
          actionsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.95
        );
      }

      // Bottom bar reveal
      if (bottomRef.current) {
        tl.fromTo(
          bottomRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.0 },
          1.1
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [motionEnabled]);

  const github =
    socials.find((s) => s.label === "GitHub")?.href ||
    "https://github.com/md-aman012";
  const linkedin =
    socials.find((s) => s.label === "LinkedIn")?.href ||
    "https://www.linkedin.com/in/md-aman-76000a324/";

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex flex-col justify-between min-h-[100svh] pt-[calc(var(--nav-height)+0.5rem)] pb-6 sm:pb-8 px-4 sm:px-8 lg:px-16 overflow-hidden select-none bg-[#030303]"
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Real-time 3D Cinematic Particle Portrait Canvas */}
      <ParticlePortrait />

      {/* Architectural Background Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "20% 100%",
          maskImage: "linear-gradient(to bottom, black 30%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 92%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Warm Amber Glow centered behind head and shoulders */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          background:
            "radial-gradient(circle at 50% 22%, rgba(255, 140, 89, 0.12) 0%, rgba(255, 140, 89, 0.03) 38%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Top Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5 tracking-label text-[9px] sm:text-[10px]">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_var(--accent)]"
            style={{ backgroundColor: "var(--accent)" }}
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

      {/* Main Center Stage: Layered Oversized Typography Over Particle Portrait */}
      <div className="relative z-10 mt-auto mb-6 sm:mb-10 pt-4 pb-2 flex flex-col items-center text-center max-w-5xl mx-auto px-2 pointer-events-none">
        {/* Oversized High-Contrast Editorial Serif Name */}
        <h1
          ref={nameRef}
          className="font-serif italic text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12.5rem] tracking-tight leading-[0.9] text-[var(--text-primary)] my-1 sm:my-2 select-text"
          style={{
            textShadow: "0 6px 40px rgba(0, 0, 0, 0.85), 0 2px 15px rgba(0, 0, 0, 0.95)",
            color: "#F1EEE8",
          }}
        >
          Aman
        </h1>

        {/* Refined Kicker below the name */}
        <p
          ref={eyebrowRef}
          className="tracking-label text-[10px] sm:text-xs text-[var(--text-muted)] font-mono uppercase tracking-[0.24em] mt-3 sm:mt-4 mb-1.5"
          style={{
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          A DEVELOPER BUILDING THINGS FOR THE WEB
        </p>

        {/* Short introduction below the kicker */}
        <p
          ref={introRef}
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl mx-auto mt-2 sm:mt-3 leading-relaxed font-normal text-[var(--text-muted)]"
          style={{
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)",
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
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Resume link */}
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

          {/* GitHub Icon Link */}
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

          {/* LinkedIn Icon Link */}
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

      {/* Bottom Architectural Bar */}
      <div
        ref={bottomRef}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)] tracking-label text-[9px] sm:text-[10px]"
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
    </section>
  );
}
