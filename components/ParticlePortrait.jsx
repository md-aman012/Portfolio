"use client";

import { useEffect, useRef } from "react";
import { useMotion } from "@/context/MotionContext";
import gsap from "gsap";

export default function ParticlePortrait({
  progressRef,
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { motionEnabled } = useMotion();

  useEffect(() => {
    const container = containerRef.current;
    const cv = canvasRef.current;
    if (!container || !cv) return;

    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let isDisposed = false;

    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const ss = (a, b, x) => {
      x = clamp((x - a) / (b - a), 0, 1);
      return x * x * (3 - 2 * x);
    };

    let dpr = 1;
    let W = 0;
    let H = 0;
    let pw = 0;
    let ph = 0;
    let px = 0;
    let py = 0;
    let P = [];
    let proc = null;
    let step = 4;
    let target = 0;
    let p = 0;
    const mouse = { x: -999, y: -999, sx: -999, sy: -999 };

    let src = null;

    function build() {
      if (!src || !src.width || !src.height) return;
      const w = Math.round(pw * dpr);
      const h = Math.round(ph * dpr);
      if (w <= 0 || h <= 0) return;

      proc = document.createElement("canvas");
      proc.width = w;
      proc.height = h;
      const g = proc.getContext("2d", { willReadFrequently: true });
      if (!g) return;

      g.drawImage(src, 0, 0, w, h);
      const id = g.getImageData(0, 0, w, h);
      const d = id.data;

      // Detect if image is opaque (black background) or transparent PNG
      let opaque = true;
      for (let i = 3; i < d.length; i += 388) {
        if (d[i] < 250) {
          opaque = false;
          break;
        }
      }

      if (opaque) {
        // Key out pure black background with smooth natural feathering
        for (let i = 0; i < d.length; i += 4) {
          const l = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255;
          d[i + 3] = Math.round(255 * ss(0.06, 0.26, l));
        }
        g.putImageData(id, 0, 0);
      }

      // Density tuned for silky smooth, non-cartoonish stardust particles
      step = W < 768 ? 3.5 : 4.0;
      const sd = Math.max(3, Math.round(step * dpr));
      P = [];
      for (let y = 0; y < h; y += sd) {
        for (let x = 0; x < w; x += sd) {
          const i = (y * w + x) * 4;
          const a = d[i + 3];
          if (a < 35) continue;
          P.push({
            x: x / dpr,
            y: y / dpr,
            r: d[i],
            g: d[i + 1],
            b: d[i + 2],
            a: a / 255,
            l: (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255,
            s: Math.random(),
            k: Math.random() * 6.28,
          });
        }
      }
    }

    function layout() {
      if (isDisposed) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = container.clientWidth || window.innerWidth;
      H = container.clientHeight || window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = W + "px";
      cv.style.height = H + "px";

      if (src && src.width && src.height) {
        // Precise size and alignment matching Portrait dissolve hero.html
        ph = Math.min(H * 0.6, 560);
        pw = (ph * src.width) / src.height;
        if (pw > W * 0.8) {
          pw = W * 0.8;
          ph = (pw * src.height) / src.width;
        }
        px = (W - pw) / 2; // Horizontally centered
        py = H * 0.07;     // Exactly 7% from top
        build();
      }
    }

    function tick(time, deltaTime) {
      if (isDisposed) return;
      const t = time;
      const m = motionEnabled ? 1 : 0;

      // GSAP smooth lerp - snappy & responsive
      p += (target - p) * 0.22;
      mouse.sx += (mouse.x - mouse.sx) * 0.18;
      mouse.sy += (mouse.y - mouse.sy) * 0.18;

      if (progressRef) {
        progressRef.current = p;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const ox = mouse.x < -900 ? 0 : (mouse.sx - cx) * 0.014;
      const oy = mouse.y < -900 ? 0 : (mouse.sy - cy) * 0.008;

      const imgAlpha = 1 - ss(0, 0.16, p);
      const fade = 1 - ss(0.62, 0.95, p);

      // BEFORE SCROLL (Resting state):
      // Clean, unpixelated photographic render with zero cartoonishness
      if (imgAlpha > 0.01 && proc) {
        ctx.globalAlpha = imgAlpha;
        ctx.drawImage(proc, px + ox, py + oy, pw, ph);

        // Ultra-fine micro-halftone texture only at resting state for depth,
        // using micro-dots with low opacity so it stays sharp and photographic
        if (P.length > 0) {
          ctx.fillStyle = "#000";
          ctx.globalAlpha = imgAlpha * 0.18;
          for (let i = 0; i < P.length; i += 2) {
            const o = P[i];
            const s = Math.max(0.6, step * (0.08 + 0.35 * (1 - o.l)));
            ctx.fillRect(px + ox + o.x - s / 2, py + oy + o.y - s / 2, s, s);
          }
        }
        ctx.globalAlpha = 1;
      }

      // DISSOLVED PARTICLES (Silky fluid stardust waves):
      if (p > 0.004 && fade > 0.01 && P.length > 0) {
        const R = 130;
        for (let i = 0; i < P.length; i++) {
          const o = P[i];
          const e = ss(o.s * 0.12, o.s * 0.12 + 0.58, p);
          if (e <= 0) continue;

          const dir = (o.x - pw / 2) / (pw / 2);
          const wave =
            Math.sin(o.y * 0.024 + t * 1.5 * m + o.k) * 20 +
            Math.sin(o.x * 0.016 - t * 1.1 * m) * 12;

          let x = px + ox + o.x + dir * (42 + 240 * o.s) * e * e + wave * e * 0.6;
          let y =
            py +
            oy +
            o.y +
            Math.sin(o.x * 0.028 + t * m + o.k) * 28 * e +
            (o.s - 0.5) * 75 * e -
            e * e * 36 * o.s;

          const dx = x - mouse.sx;
          const dy = y - mouse.sy;
          const dd = Math.hypot(dx, dy);
          if (dd < R && dd > 0) {
            const f = Math.pow(1 - dd / R, 2) * 50;
            x += (dx / dd) * f;
            y += (dy / dd) * f;
          }

          const mx = ss(0, 0.5, e);
          const br = 0.45 + 0.85 * o.l;
          const cr = o.r + (clamp(240 * br, 0, 255) - o.r) * mx;
          const cg = o.g + (clamp(142 * br, 0, 255) - o.g) * mx;
          const cb = o.b + (clamp(82 * br, 0, 255) - o.b) * mx;
          const al = o.a * fade * (0.6 + 0.4 * mx) * (0.5 + 0.6 * o.l);
          const sz = 1.2 + e * 2.2 * (0.5 + o.s * 0.8);

          ctx.fillStyle = `rgba(${cr | 0}, ${cg | 0}, ${cb | 0}, ${al.toFixed(2)})`;
          ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
        }
      }
    }

    function onScroll() {
      // Responsive trigger: starts immediately on first scroll pixel, completes in ~320px
      const scrollSpan = Math.min(window.innerHeight * 0.4, 340);
      target = motionEnabled
        ? clamp(window.scrollY / scrollSpan, 0, 1)
        : 0;
    }

    function onResize() {
      layout();
      onScroll();
    }

    function onPointerMove(e) {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (mouse.sx < -900) {
        mouse.sx = mouse.x;
        mouse.sy = mouse.y;
      }
    }

    function onPointerLeave() {
      mouse.x = -999;
      mouse.y = -999;
      mouse.sx = -999;
      mouse.sy = -999;
    }

    // Load initial portrait image
    if (!src) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (isDisposed) return;
        src = img;
        layout();
        onScroll();
      };
      img.src = "/images/portrait.png";
    } else {
      layout();
      onScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    // Use GSAP ticker for rock-solid 60/120fps smoothness across all displays
    gsap.ticker.add(tick);

    return () => {
      isDisposed = true;
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [motionEnabled, progressRef]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-auto ${className}`}
      style={{ zIndex: 1 }}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full block" />
    </div>
  );
}
