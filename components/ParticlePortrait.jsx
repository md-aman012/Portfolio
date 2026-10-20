"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";
import { gsap } from "gsap";
import { useMotion } from "@/context/MotionContext";

const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute float aSize;
  attribute float aAlpha;
  attribute vec3 aRandom;
  attribute float aType;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vType;

  void main() {
    vColor = color;
    vAlpha = aAlpha;
    vType = aType;

    vec3 pos = position;

    // Subtle organic breathing and floating movement
    float breath = sin(uTime * 1.1 + pos.y * 1.6 + aRandom.x * 2.0) * 0.022;
    pos.z += breath;
    pos.y += cos(uTime * 0.85 + pos.x * 1.2) * 0.012;

    // Organic micro-motion for floating amber embers
    if (aType > 1.5) {
      float t = uTime * 0.35 + aRandom.y * 12.0;
      pos.x += sin(t * 1.2) * 0.12;
      pos.y += cos(t * 0.85) * 0.14 + sin(uTime * 0.15) * 0.04;
      pos.z += sin(t * 0.65) * 0.15;
    }

    // Coordinated load entrance: particles disperse in 3D and assemble smoothly
    if (uProgress < 1.0) {
      float p = clamp(uProgress, 0.0, 1.0);
      float ease = 1.0 - pow(1.0 - p, 3.0);
      vec3 disperse = vec3(
        (aRandom.x - 0.5) * 3.5,
        (aRandom.y - 0.5) * 2.8,
        (aRandom.z - 0.5) * 4.2
      );
      pos = mix(pos + disperse, pos, ease);
    }

    // Smooth subtle parallax based on pointer position with depth displacement
    float depthWeight = (pos.z * 0.18 + 0.08);
    pos.x += uMouse.x * depthWeight * 0.42;
    pos.y += uMouse.y * depthWeight * 0.32;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Distance attenuation and device pixel ratio
    float sizeMultiplier = (320.0 / -mvPosition.z) * uPixelRatio;

    // Subtle gentle pulsation for rim and amber floaters
    float pulse = 1.0;
    if (aType > 0.5) {
      pulse += 0.15 * sin(uTime * 2.2 + aRandom.z * 6.28);
    }

    gl_PointSize = aSize * sizeMultiplier * pulse;
    gl_PointSize = clamp(gl_PointSize, 1.0, 7.5);
  }
`;

const fragmentShader = `
  uniform float uAmberGlow;
  varying vec3 vColor;
  varying float vAlpha;
  varying float vType;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) discard;

    // Crisp stardust particle with soft antialiased edge
    float core = smoothstep(0.5, 0.08, dist);
    float alpha = core * vAlpha;

    vec3 finalColor = vColor;

    // Subtle warm corona glow for amber particles
    if (vType > 0.5) {
      float corona = exp(-dist * 4.0) * 0.35 * uAmberGlow;
      finalColor += vec3(0.35, 0.14, 0.02) * corona;
      alpha = max(alpha, corona * vAlpha);
    }

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function checkWebGLSupport() {
  if (typeof window === "undefined") return true;
  try {
    const testCanvas = document.createElement("canvas");
    return Boolean(
      testCanvas.getContext("webgl2") || testCanvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

export default function ParticlePortrait({
  className = "",
  onLoaded,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { motionEnabled } = useMotion();

  const [webglSupported, setWebglSupported] = useState(checkWebGLSupport);
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !webglSupported) return;

    let isDisposed = false;
    let animationFrameId = null;

    // Three.js scene setup
    const container = containerRef.current;
    const canvas = canvasRef.current;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    // Adjust camera Z based on screen width for optimal framing
    camera.position.z = width < 768 ? 5.2 : 4.15;
    camera.position.y = width < 768 ? 0.05 : 0.08;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false, // Particles use smoothstep in shader, antialias is unnecessary & costly
        powerPreference: "high-performance",
      });
    } catch {
      setTimeout(() => setWebglSupported(false), 0);
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.0);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(width, height);

    // Uniforms for shaders
    const uniforms = {
      uTime: { value: 0.0 },
      uProgress: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: pixelRatio },
      uAmberGlow: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    let pointsMesh = null;
    let particleGeometry = null;

    // Smoothed mouse tracking
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    // Function to populate geometry with Float32 buffers
    const setupGeometry = (positions, colors, sizes, alphas, types, randoms, count) => {
      if (isDisposed) return;

      particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(positions), 3)
      );
      particleGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(colors), 3)
      );
      particleGeometry.setAttribute(
        "aSize",
        new THREE.BufferAttribute(new Float32Array(sizes), 1)
      );
      particleGeometry.setAttribute(
        "aAlpha",
        new THREE.BufferAttribute(new Float32Array(alphas), 1)
      );
      particleGeometry.setAttribute(
        "aType",
        new THREE.BufferAttribute(new Float32Array(types), 1)
      );
      particleGeometry.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(new Float32Array(randoms), 3)
      );

      pointsMesh = new THREE.Points(particleGeometry, material);
      scene.add(pointsMesh);

      setDataReady(true);
      if (onLoaded) onLoaded();

      // Entrance animation with GSAP
      if (motionEnabled) {
        gsap.to(uniforms.uProgress, {
          value: 1.0,
          duration: 2.2,
          ease: "power2.out",
          delay: 0.15,
        });
      } else {
        uniforms.uProgress.value = 1.0;
      }
    };

    // Load precomputed binary particle dataset with fallback to JSON and runtime sampling
    const loadParticleData = async () => {
      try {
        const binRes = await fetch("/particles-data.bin");
        if (binRes.ok) {
          const arrayBuffer = await binRes.arrayBuffer();
          const floatView = new Float32Array(arrayBuffer);
          const count = Math.round(floatView[0]);
          let offset = 1;

          const positions = floatView.subarray(offset, offset + count * 3);
          offset += count * 3;
          const colors = floatView.subarray(offset, offset + count * 3);
          offset += count * 3;
          const sizes = floatView.subarray(offset, offset + count);
          offset += count;
          const alphas = floatView.subarray(offset, offset + count);
          offset += count;
          const types = floatView.subarray(offset, offset + count);
          offset += count;
          const randoms = floatView.subarray(offset, offset + count * 3);

          setupGeometry(positions, colors, sizes, alphas, types, randoms, count);
          return;
        }
      } catch (err) {
        console.warn("Binary particle loading failed, trying JSON fallback...", err);
      }

      try {
        const jsonRes = await fetch("/particles-data.json");
        if (jsonRes.ok) {
          const json = await jsonRes.json();
          setupGeometry(
            json.positions,
            json.colors,
            json.sizes,
            json.alphas,
            json.types,
            json.randoms,
            json.count
          );
          return;
        }
      } catch (err) {
        console.warn("JSON particle loading failed, running client-side image sampler...", err);
      }

      // Dynamic client-side sampler fallback
      sampleFromImage("/images/portrait.jpg", setupGeometry);
    };

    const sampleFromImage = (imageSrc, callback) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (isDisposed) return;
        const sampleW = width < 768 ? 240 : 420;
        const sampleH = Math.round(sampleW / (img.width / img.height));
        const aspect = sampleW / sampleH;

        const offCanvas = document.createElement("canvas");
        offCanvas.width = sampleW;
        offCanvas.height = sampleH;
        const ctx = offCanvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, sampleW, sampleH);

        const imgData = ctx.getImageData(0, 0, sampleW, sampleH).data;
        const positions = [];
        const colors = [];
        const sizes = [];
        const alphas = [];
        const types = [];
        const randoms = [];

        const cx = 0.44;
        const cy = 0.36;
        const rx = 0.22;
        const ry = 0.26;

        for (let y = 0; y < sampleH; y++) {
          for (let x = 0; x < sampleW; x++) {
            const idx = (y * sampleW + x) * 4;
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;

            if (lum <= 0.055) continue;

            const nx = x / sampleW;
            const ny = y / sampleH;
            const px = (nx - 0.5) * 4.0;
            const py = -(ny - 0.5) * (4.0 / aspect);

            const dx = (nx - cx) / rx;
            const dy = (ny - cy) / ry;
            const distHead = Math.sqrt(dx * dx + dy * dy);

            let pz = 0;
            if (distHead < 1.0) {
              const headDome = Math.sqrt(Math.max(0.0, 1.0 - distHead * distHead)) * 0.75;
              const relief = Math.pow(lum, 1.3) * 0.40;
              pz = headDome + relief;
            } else {
              const torsoX = (nx - 0.5) / 0.48;
              const torsoDome = Math.sqrt(Math.max(0.0, 1.0 - Math.min(1.0, torsoX * torsoX))) * 0.45;
              pz = torsoDome - (ny - 0.6) * 0.3 + lum * 0.2 - 0.2;
            }

            const isAmber = r > 50 && r > b * 1.32 && r > g * 1.12 && nx > 0.38;

            let cr, cg, cb, size, alpha, pType;
            if (isAmber) {
              pType = 1.0;
              cr = 1.0;
              cg = 0.55 + 0.15 * Math.random();
              cb = 0.24;
              size = 0.022 + 0.020 * lum;
              alpha = Math.min(1.0, 0.50 + lum * 0.65);
            } else {
              pType = 0.0;
              const v = 0.78 + 0.22 * lum;
              cr = v * 0.95;
              cg = v * 0.96;
              cb = v * 1.0;
              size = 0.018 + 0.022 * Math.pow(lum, 1.2);
              alpha = Math.min(0.95, 0.28 + lum * 0.72);
            }

            positions.push(px + (Math.random() - 0.5) * 0.012);
            positions.push(py + (Math.random() - 0.5) * 0.012);
            positions.push(pz + (Math.random() - 0.5) * 0.04);

            colors.push(cr, cg, cb);
            sizes.push(size);
            alphas.push(alpha);
            types.push(pType);
            randoms.push(Math.random(), Math.random(), Math.random());
          }
        }

        // Add subtle ember floaters
        for (let i = 0; i < 85; i++) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 0.45 + Math.random() * 1.8;
          const px = (cx - 0.5) * 4.0 + Math.cos(angle) * radius;
          const py = -(cy - 0.5) * (4.0 / aspect) + Math.sin(angle) * (radius * 0.85);
          const pz = (Math.random() - 0.5) * 1.2;

          positions.push(px, py, pz);
          colors.push(1.0, 0.62 + 0.18 * Math.random(), 0.24);
          sizes.push(0.024 + 0.018 * Math.random());
          alphas.push(0.30 + 0.40 * Math.random());
          types.push(2.0);
          randoms.push(Math.random(), Math.random(), Math.random());
        }

        callback(positions, colors, sizes, alphas, types, randoms, positions.length / 3);
      };
      img.onerror = () => {
        setWebglSupported(false);
      };
      img.src = imageSrc;
    };

    loadParticleData();

    // Mouse move handler
    const handleMouseMove = (e) => {
      if (!motionEnabled) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetMouse.x = Math.max(-1, Math.min(1, x));
      targetMouse.y = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      targetMouse.x = 0;
      targetMouse.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;

      camera.aspect = width / height;
      camera.position.z = width < 768 ? 5.2 : 4.15;
      camera.position.y = width < 768 ? 0.05 : 0.08;
      camera.updateProjectionMatrix();

      const newPixelRatio = Math.min(window.devicePixelRatio || 1, 2.0);
      renderer.setPixelRatio(newPixelRatio);
      renderer.setSize(width, height);
      uniforms.uPixelRatio.value = newPixelRatio;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Handle WebGL context loss
    canvas.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        setWebglSupported(false);
      },
      false
    );

    // Animation Loop
    let lastTime = performance.now();

    const animate = (now) => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((now - lastTime) * 0.001, 0.1);
      lastTime = now;

      if (motionEnabled) {
        uniforms.uTime.value += delta;

        // Smooth mouse damping / lerp
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.055;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.055;
        uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);

        // Subtle restrained mesh tilt (within ~3 degrees)
        if (pointsMesh) {
          pointsMesh.rotation.y = currentMouse.x * 0.045;
          pointsMesh.rotation.x = -currentMouse.y * 0.035;
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      isDisposed = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);

      if (particleGeometry) particleGeometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [motionEnabled, onLoaded, webglSupported]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Dynamic WebGL Canvas — always rendered so ref is available */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{
          opacity: webglSupported && dataReady ? 1 : 0,
          transition: "opacity 0.8s ease-out",
          display: webglSupported ? "block" : "none",
        }}
      />

      {/* Graceful Fallback Portrait Image if WebGL is unsupported or motion disabled */}
      {(!webglSupported || !motionEnabled) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full max-w-[540px] aspect-[1402/1122] opacity-80 mix-blend-screen">
            <Image
              src="/images/portrait.jpg"
              alt="Md Aman Portrait"
              fill
              priority
              className="object-contain"
              style={{
                filter: "grayscale(100%) contrast(120%) brightness(90%)",
                maskImage:
                  "radial-gradient(circle at 50% 45%, black 45%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 45%, black 45%, transparent 75%)",
              }}
            />
          </div>
        </div>
      )}

      {/* Subtle Bottom vignette fade to blend seamlessly into page background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(3, 3, 3, 0.1) 0%, transparent 40%, rgba(3, 3, 3, 0.7) 80%, #030303 100%)",
        }}
      />
    </div>
  );
}
