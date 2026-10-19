"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/data/portfolio";
import { useMotion } from "@/context/MotionContext";
import { useInView, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function MetricColumn({ stat, motionEnabled, isLast }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [animatedValue, setAnimatedValue] = useState(
    stat.numericTarget !== undefined ? `${stat.prefix || ""}0` : stat.value
  );

  useEffect(() => {
    if (!motionEnabled || stat.numericTarget === undefined || !isInView) {
      return;
    }

    const controls = animate(0, stat.numericTarget, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        const rounded = Math.round(latest);
        const formatted = rounded.toLocaleString("en-US");
        setAnimatedValue(`${stat.prefix || ""}${formatted}`);
      },
    });

    return () => controls.stop();
  }, [isInView, motionEnabled, stat.numericTarget, stat.prefix]);

  const displayValue = !motionEnabled || stat.numericTarget === undefined
    ? stat.value
    : animatedValue;

  return (
    <div
      ref={ref}
      className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors duration-300 hover:bg-[#0f0f0f] ${
        !isLast ? "border-b lg:border-b-0 lg:border-r border-[var(--border)]" : ""
      }`}
    >
      <div>
        <span
          className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight font-serif text-[var(--text-primary)]"
        >
          {displayValue}
        </span>
        <p className="mt-3 text-xs sm:text-sm font-medium text-[var(--text-primary)]">
          {stat.label}
        </p>
      </div>

      {stat.detail && (
        <p className="mt-2 text-xs text-[var(--text-muted)] leading-relaxed">
          {stat.detail}
        </p>
      )}
    </div>
  );
}

export default function ImpactStrip() {
  const { motionEnabled } = useMotion();

  return (
    <section
      id="impact"
      className="relative z-10 border-b border-[var(--border)]"
      style={{ backgroundColor: "var(--bg-surface)" }}
      aria-label="Verified impact metrics"
    >
      <div className="container-main px-0 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-x-0 sm:border-x border-[var(--border)]">
          {stats.map((stat, idx) => (
            <MetricColumn
              key={idx}
              stat={stat}
              motionEnabled={motionEnabled}
              isLast={idx === stats.length - 1}
            />
          ))}
        </div>

        {/* Bottom strip link matching reference site */}
        <div className="flex items-center justify-between py-4 px-4 sm:px-8 border-t border-[var(--border)] text-xs tracking-label">
          <span className="text-[var(--text-muted)]">
            THE WORK. THE REAL-WORLD IMPACT.
          </span>
          <a
            href="#work"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            <span>EXPLORE WORK</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}
