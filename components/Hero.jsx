"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useMotion } from "@/context/MotionContext";
import { profile } from "@/data/portfolio";

const ParticlePortrait = dynamic(() => import("./ParticlePortrait"), {
  ssr: false,
});

const CAPTION_TEXT = "A human perspective on technology";
const GLYPHS = "01/-.\\_";

export default function Hero() {
  const { motionEnabled, toggleMotion } = useMotion();

  const dissolveRef = useRef(0);
  const txtRef = useRef(null);
  const capRef = useRef(null);

  // Scramble glitch on the kicker text while the portrait dissolves
  useEffect(() => {
    if (!motionEnabled) return;
    const el = capRef.current;
    const txt = txtRef.current;
    if (!el) return;

    let scrambled = false;
    const interval = setInterval(() => {
      const p = dissolveRef.current;

      // Gentle translateY lift on the text as you dissolve
      if (txt) {
        txt.style.transform = `translateY(${(-p * 24).toFixed(1)}px)`;
      }

      // Smoothstep for glitch intensity
      const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
      const ss = (a, b, x) => {
        x = clamp((x - a) / (b - a), 0, 1);
        return x * x * (3 - 2 * x);
      };

      const q = ss(0.02, 0.4, p) * 0.55;
      if (q > 0.005) {
        scrambled = true;
        el.textContent = Array.from(CAPTION_TEXT)
          .map((ch) =>
            ch === " " || Math.random() >= q
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("");
      } else if (scrambled) {
        scrambled = false;
        el.textContent = CAPTION_TEXT;
      }
    }, 45);

    return () => {
      clearInterval(interval);
      el.textContent = CAPTION_TEXT;
      if (txt) txt.style.transform = "none";
    };
  }, [motionEnabled]);

  // Split profile name for serif italic formatting: "Md" normal, "Aman" italic
  const parts = (profile.name || "Md Aman").trim().split(/\s+/);
  const lastWord = parts.pop();
  const firstWords = parts.join(" ");

  return (
    <header className="track relative h-[125svh] select-none" id="hero">
      <div className="stage sticky top-0 h-[100svh] overflow-hidden bg-black">
        {/* Real-time fluid stardust dissolve canvas */}
        <ParticlePortrait progressRef={dissolveRef} />

        {/* Top Edge Left */}
        <div
          className="edge l mono absolute z-10 left-7 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a8a8a] select-none"
          style={{ top: "calc(84px + env(safe-area-inset-top, 0px))" }}
        >
          <span
            className="dot inline-block w-[5px] h-[5px] bg-[#e8704f] mr-2 align-middle"
            aria-hidden="true"
          />
          DEVELOPER. PROBLEM SOLVER. INNOVATOR.
        </div>

        {/* Top Edge Right */}
        <div
          className="edge r mono hidden sm:block absolute z-10 right-7 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a8a8a] select-none"
          style={{ top: "calc(84px + env(safe-area-inset-top, 0px))" }}
        >
          Based in India · Thinking beyond
        </div>

        {/* Left Rail: 01 / PRESENCE */}
        <div className="rail mono hidden md:block absolute z-10 left-7 top-[30svh] font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a8a8a] leading-[1.6] select-none">
          <b className="block text-[#e8704f] font-normal mb-3.5">01 / Presence</b>
          <div className="plus text-[#e8704f] text-base mb-2 font-normal">+</div>
          SOFTWARE DEVELOPMENT
          <br />
          AI & MACHINE LEARNING
          <br />
          DATA STRUCTURES & ALGORITHMS
        </div>

        {/* Main Center Typography */}
        <div
          ref={txtRef}
          className="txt absolute z-10 inset-x-0 top-[43svh] flex flex-col items-center text-center px-4 pointer-events-none transition-transform duration-75"
        >
          {/* Scramble kicker */}
          <div
            ref={capRef}
            className="mono font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase text-[#bdb8b0]"
          >
            {CAPTION_TEXT}
          </div>

          {/* Heading */}
          <h1
            className="font-serif text-[clamp(48px,min(13vw,17svh),168px)] leading-[0.95] tracking-[-0.035em] mt-2.5 text-[#f2efea]"
          >
            {firstWords ? `${firstWords} ` : ""}
            <em className="italic">{lastWord}</em>
          </h1>

          {/* Subtitle */}
          <p className="sub mt-[clamp(10px,2.4svh,24px)] text-[#cfcac2] max-w-[34ch] text-xs sm:text-sm md:text-base leading-relaxed">
            I build web experiences, solve complex problems, and explore the possibilities of AI.
          </p>

          {/* CTA Buttons */}
          <div className="cta flex items-center gap-5 sm:gap-6 mt-[clamp(12px,2.4svh,22px)] pointer-events-auto">
            <a
              href="#work"
              className="pill inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-medium text-[#f2efea] transition-all duration-200"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(255, 255, 255, 0.07)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.14)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.07)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              Explore my work ↓
            </a>
            <a
              href="#contact"
              className="link text-[#f2efea] text-xs sm:text-[13px] border-b border-[#8a8a8a] pb-0.5 hover:border-white transition-colors"
            >
              Start a conversation ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="bar mono absolute z-10 left-7 right-7 flex justify-between gap-3 font-mono text-[10px] tracking-[0.14em] uppercase text-[#8a8a8a]"
          style={{ bottom: "calc(54px + env(safe-area-inset-bottom, 0px))" }}
        >
          <a href="#impact" className="hover:text-white transition-colors">
            Scroll to discover ↓
          </a>
          <span className="hidden sm:inline">BUILDING • LEARNING • SHIPPING</span>
          <span className="hidden md:inline">An ongoing exploration ↗</span>
        </div>

        {/* Bottom Right Toolbar Control: Motion Toggle */}
        <div
          className="ctl r fixed z-30 right-3"
          style={{ bottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
        >
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={motionEnabled}
            className="font-mono text-[10px] tracking-[0.1em] uppercase text-[#f2efea] border rounded-lg px-2.5 py-1.5 cursor-pointer backdrop-blur-md transition-all select-none"
            style={{
              backgroundColor: "rgba(28, 28, 28, 0.55)",
              borderColor: "rgba(255, 255, 255, 0.1)",
            }}
          >
            {motionEnabled ? "Motion on" : "Motion off"}
          </button>
        </div>
      </div>
    </header>
  );
}
