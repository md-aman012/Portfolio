"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import { useMotion } from "@/context/MotionContext";
import { profile, socials } from "@/data/portfolio";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Hero() {
  const { motionEnabled } = useMotion();
  const heroRef = useRef(null);

  // Mouse tilt physics for the character portrait
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 25 });

  // 3D rotation angles derived from normalized cursor position (-0.5 to 0.5)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["35%", "65%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["25%", "55%"]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!motionEnabled || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(mouseX);
      y.set(mouseY);
    },
    [motionEnabled, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const github = socials.find((s) => s.label === "GitHub")?.href || "https://github.com/md-aman012";
  const linkedin = socials.find((s) => s.label === "LinkedIn")?.href || "https://www.linkedin.com/in/md-aman-76000a324/";

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero"
      className="relative flex flex-col justify-between min-h-[calc(100vh-var(--nav-height))] pt-[calc(var(--nav-height)+1rem)] pb-6 sm:pb-8 px-4 sm:px-8 lg:px-16 overflow-hidden select-none"
      style={{
        backgroundColor: "var(--bg-page)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Background Architectural Grid Lines */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "25% 100%",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
        }}
        aria-hidden="true"
      />

      {/* Dynamic Ambient Spotlight Glow behind the character */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          background: motionEnabled
            ? `radial-gradient(circle at 50% 35%, rgba(255, 140, 89, 0.16) 0%, rgba(255, 140, 89, 0.04) 40%, transparent 70%)`
            : `radial-gradient(circle at 50% 35%, rgba(255, 140, 89, 0.12) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Top Status Line */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[var(--border)]">
        <div className="flex items-center gap-2 tracking-label text-[9px] sm:text-[10px]">
          <span
            className="w-1.5 h-1.5 rounded-xs shrink-0"
            style={{ backgroundColor: "var(--accent)" }}
            aria-hidden="true"
          />
          <span>B.TECH CSE · NIT PATNA · FULL-STACK DEVELOPER</span>
        </div>
        <div className="tracking-label text-[10px] hidden sm:block">
          BASED IN INDIA · THINKING BEYOND
        </div>
      </div>

      {/* Main Center Stage: Animated Character Portrait & Typography */}
      <div className="relative z-10 my-auto py-6 sm:py-8 flex flex-col items-center text-center">
        {/* Presence Sub-metadata on Desktop */}
        <div className="w-full flex justify-between items-start mb-2 px-2 hidden lg:flex">
          <div className="text-left tracking-label">
            <span className="block text-[var(--accent)] font-medium">00 / PRESENCE</span>
            <div className="mt-2 space-y-0.5 text-[9px] text-[var(--text-muted)] opacity-80 font-mono">
              <p>+ FULL-STACK WEB</p>
              <p>&nbsp;&nbsp;DISTRIBUTED SYSTEMS</p>
              <p>&nbsp;&nbsp;DSA & PROBLEM SOLVING</p>
            </div>
          </div>
          <div className="text-right tracking-label opacity-70">
            <p>NIT PATNA</p>
            <p className="text-[9px] mt-1">CLASS OF 2028</p>
          </div>
        </div>

        {/* Character Portrait with 3D Tilt & Floating Animation */}
        <div
          className="relative my-2 sm:my-3"
          style={{ perspective: 1000 }}
        >
          {/* Animated Glow Halo */}
          {motionEnabled && (
            <motion.div
              className="absolute -inset-6 rounded-full blur-2xl pointer-events-none opacity-40"
              style={{
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                left: glowX,
                top: glowY,
              }}
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.35, 0.5, 0.35],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* 3D Tilting Character Container */}
          <motion.div
            style={{
              ...(motionEnabled
                ? {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }
                : {}),
              backgroundColor: "#080808",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.8)",
            }}
            animate={
              motionEnabled
                ? {
                    y: [0, -6, 0],
                  }
                : {}
            }
            transition={
              motionEnabled
                ? {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {}
            }
            className="relative w-48 sm:w-56 md:w-64 aspect-[3.8/5] mx-auto overflow-hidden rounded-2xl border border-[var(--border)] transition-shadow duration-300"
          >
            {/* The Cutout Portrait Image */}
            <Image
              src="/images/aman-2.jpg"
              alt="Md Aman — Full-Stack Developer"
              fill
              priority
              sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
              className="object-cover object-top transition-transform duration-500 ease-out hover:scale-105"
              style={{
                filter: "grayscale(100%) contrast(110%) brightness(95%)",
              }}
            />

            {/* Seamless Bottom Gradient Fade into pure dark */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 60%, rgba(3, 3, 3, 0.7) 85%, #030303 100%)",
              }}
            />

            {/* Ambient vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.6)",
              }}
            />
          </motion.div>
        </div>

        {/* Caption below Portrait */}
        <p className="tracking-label text-[9px] sm:text-[10px] mt-4 mb-1 text-[var(--text-muted)]">
          A HUMAN PERSPECTIVE ON TECHNOLOGY
        </p>

        {/* Huge Serif Display Headline matching Sarthak's */}
        <h1
          className="font-serif italic text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight leading-[0.95] text-[var(--text-primary)] my-2"
        >
          {profile.name}
        </h1>

        {/* Subtitle */}
        <p
          className="text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-2 leading-relaxed font-normal"
          style={{ color: "var(--text-muted)" }}
        >
          I build full-stack web products, solve DSA problems, and turn ideas into working applications.
        </p>

        {/* CTAs matching Sarthak Sharma's style */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Explore my work button */}
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderColor: "var(--border)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.backgroundColor = "rgba(255, 140, 89, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
            }}
          >
            <span>Explore my work</span>
            <ArrowDown size={13} />
          </a>

          {/* Download Resume button */}
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer"
            style={{
              backgroundColor: "transparent",
              borderColor: "var(--border)",
              color: "var(--text-muted)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--text-primary)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <Download size={13} />
            <span>Resume</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>

          {/* GitHub link */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer"
            style={{
              backgroundColor: "transparent",
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
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>

          {/* LinkedIn link */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 border cursor-pointer"
            style={{
              backgroundColor: "transparent",
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
            <span className="hidden sm:inline">LinkedIn</span>
            <ArrowUpRight size={12} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* Bottom Architectural Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)] tracking-label text-[9px] sm:text-[10px]">
        {/* Scroll cue */}
        <a
          href="#impact"
          className="flex items-center gap-2 hover:text-[var(--accent)] transition-colors"
          aria-label="Scroll to discover impact numbers"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={11} className={motionEnabled ? "animate-bounce" : ""} />
        </a>

        {/* Center Tagline */}
        <span className="hidden md:inline text-[var(--text-muted)]">
          STUDENT &amp; BUILDER · NIT PATNA
        </span>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          <span className="tracking-label text-[var(--text-muted)] opacity-80">
            AN ONGOING EXPLORATION
          </span>
        </div>
      </div>
    </section>
  );
}
