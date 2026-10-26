"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";

const MotionContext = createContext({
  motionEnabled: true,
  toggleMotion: () => {},
});

// Use a ref-based approach to read localStorage without triggering setState in effect
function getInitialMotionPreference() {
  if (typeof window === "undefined") return true;
  const stored = localStorage.getItem("motion-preference");
  if (stored !== null) return stored === "true";
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// External store for motion preference
let motionListeners = [];
let motionState = true; // SSR default

function subscribeMotion(listener) {
  motionListeners = [...motionListeners, listener];
  return () => {
    motionListeners = motionListeners.filter((l) => l !== listener);
  };
}

function getMotionSnapshot() {
  return motionState;
}

function getMotionServerSnapshot() {
  return true;
}

export function MotionProvider({ children }) {
  const motionEnabled = useSyncExternalStore(
    subscribeMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );

  // Mirror the preference onto <html data-motion> so CSS can switch every
  // animation and transition off in one place.
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? "on" : "off";
  }, [motionEnabled]);

  // Initialize from localStorage on mount
  useEffect(() => {
    motionState = getInitialMotionPreference();
    motionListeners.forEach((l) => l());
  }, []);

  // Initialize Lenis smooth scroll for butter-smooth website animation
  useEffect(() => {
    if (!motionEnabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [motionEnabled]);

  const toggleMotion = () => {
    motionState = !motionState;
    localStorage.setItem("motion-preference", String(motionState));
    motionListeners.forEach((l) => l());
  };

  return (
    <MotionContext.Provider value={{ motionEnabled, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}

export default MotionContext;
