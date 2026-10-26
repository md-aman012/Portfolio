"use client";

import { useMotion } from "@/context/MotionContext";
import { useRevealOnce } from "@/components/ui/useReveal";

const OFFSETS = {
  up: { "--reveal-x": "0px", "--reveal-y": "16px" },
  down: { "--reveal-x": "0px", "--reveal-y": "-16px" },
  left: { "--reveal-x": "16px", "--reveal-y": "0px" },
  right: { "--reveal-x": "-16px", "--reveal-y": "0px" },
};

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
