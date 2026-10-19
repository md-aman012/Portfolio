"use client";

import { createContext, useContext, useState, useEffect, useSyncExternalStore } from "react";

const MotionContext = createContext({ motionEnabled: true, toggleMotion: () => {} });

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

  // Initialize from localStorage on mount
  useEffect(() => {
    motionState = getInitialMotionPreference();
    motionListeners.forEach((l) => l());
  }, []);

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
