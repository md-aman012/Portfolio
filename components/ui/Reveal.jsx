"use client";

import { useMotion } from "@/context/MotionContext";
import { useRevealOnce } from "@/components/ui/useReveal";

const OFFSETS = {
  up: { "--reveal-x": "0px", "--reveal-y": "28px" },
  down: { "--reveal-x": "0px", "--reveal-y": "-28px" },
  left: { "--reveal-x": "28px", "--reveal-y": "0px" },
  right: { "--reveal-x": "-28px", "--reveal-y": "0px" },
};

/**
 * Reusable reveal-on-scroll wrapper.
 *
 * The server-rendered markup is fully visible — the fade/slide/blur is a CSS
 * animation that only starts once the element scrolls into view, so the
 * content is never trapped behind `opacity: 0` if JS is slow or disabled.
 * Motion OFF and `prefers-reduced-motion` skip the animation entirely.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) {
  const { motionEnabled } = useMotion();
  const [ref, revealed] = useRevealOnce({ enabled: motionEnabled });

  const style = {
    "--reveal-delay": `${Math.round(delay * 1000)}ms`,
    ...(OFFSETS[direction] || OFFSETS.up),
  };

  return (
    <div
      ref={ref}
      className={revealed ? `${className} reveal-play`.trim() : className}
      style={style}
      data-reveal=""
    >
      {children} 
    </div>
  );
}
