"use client";

import { useMotion } from "@/context/MotionContext";

export default function MotionToggle() {
  const { motionEnabled, toggleMotion } = useMotion();

  return (
    <button
      onClick={toggleMotion}
      aria-label={motionEnabled ? "Turn motion off" : "Turn motion on"}
      className="text-xs font-mono tracking-widest uppercase px-3 py-1.5 rounded-full transition-all duration-200 border cursor-pointer"
      style={{
        color: motionEnabled ? "var(--accent)" : "var(--text-muted)",
        borderColor: motionEnabled ? "var(--accent)" : "var(--border)",
        background: motionEnabled ? "var(--accent-glow)" : "transparent",
      }}
    >
      Motion {motionEnabled ? "ON" : "OFF"}
    </button>
  );
}
