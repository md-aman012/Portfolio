"use client";

import { useEffect, useRef, useState } from "react";

/**
 * High-performance, butter-smooth reveal hook.
 *
 * Uses positive bottom margin (60px) so the animation triggers smoothly
 * BEFORE the element enters the user's field of view. When motion is disabled,
 * it immediately returns true without cascading setState renders.
 */
export function useRevealOnce({ enabled = true, rootMargin = "0px 0px 60px 0px" } = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [enabled, rootMargin]);

  return [ref, !enabled || revealed];
}

export default useRevealOnce;
