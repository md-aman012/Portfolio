"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot "has this entered the viewport?" flag.
 *
 * The element itself is never hidden by this hook — the resting state is
 * visible. The reveal is a CSS animation applied on top, so content stays
 * readable if JavaScript is slow, blocked or disabled.
 */
export function useRevealOnce({ enabled = true, rootMargin = "0px 0px -12% 0px" } = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
 
  useEffect(() => {
    if (!enabled) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    // No IntersectionObserver (or a very old browser) — show everything.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return [ref, revealed];
}

export default useRevealOnce;
