import { useEffect, useRef } from "react";
import { useBackgroundStore } from "../../../store/background";

/**
 * Living AI Neural Core background.
 * Canvas 2D: deforming neural filaments around a pulsing core, expanding energy
 * waves, particles travelling curved orbital/flow paths in two depth layers.
 * CSS: drifting aurora light fields + readability overlays.
 */
const PALETTE = [
  [57, 120, 255], // electric blue #3978FF
  [57, 217, 255], // cyan #39D9FF
  [129, 87, 255], // violet #8157FF
  [183, 161, 255], // lavender #B7A1FF
] as const;
const rgba = (c: readonly number[], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || mobile;
    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);

    let w = 0, h = 0, cx = 0, cy = 0, R = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2;
      cy = h * 0.48;
      R = Math.min(w, h) * (mobile ? 0.42 : 0.36);
    };
    resize();

    // --- Neural filaments: closed deforming loops + radial tendrils ---
    const loops = Array.from({ length: lowPower ? 5 : 8 }, (_, i) => ({
      r: 0.45 + i * 0.09,
      seed: Math.random() * 100,
      speed: 0.5 + Math.random() * 0.6,
      col: PALETTE[i % 4]!,
      tilt: 0.55 + Math.random() * 0.25,
      rot: Math.random() * Math.PI,
    }));
    const tendrils = Array.from({ length: lowPower ? 10 : 18 }, (_, i) => ({
      a: (i / (lowPower ? 10 : 18)) * Math.PI * 2 + Math.random() * 0.3,
      len: 1.1 + Math.random() * 0.9,
      seed: Math.random() * 100,
      col: PALETTE[(i * 3) % 4]!,
    }));

    // --- Particles travelling orbital/spiral paths (2 depth layers) ---
    const makeP = (front: boolean) => ({
      ang: Math.random() * Math.PI * 2,
      rad: 0.3 + Math.random() * 1.6,
      w: (front ? 0.25 : 0.1) * (Math.random() < 0.5 ? 1 : 0.7) * (0.6 + Math.random()),
      drift: (Math.random() - 0.5) * 0.08,
      tilt: 0.5 + Math.random() * 0.3,
      size: front ? 1.2 + Math.random() * 1.6 : 0.5 + Math.random() * 0.8,
      alpha: front ? 0.75 : 0.35,
      col: PALETTE[Math.floor(Math.random() * 4)]!,
      seed: Math.random() * 10,
      front,
    });
    const particles = [
      ...Array.from({ length: lowPower ? 35 : 70 }, () => makeP(false)),
      ...Array.from({ length: lowPower ? 18 : 36 }, () => makeP(true)),
    ];

    // --- Energy waves ---
    const waves: { r: number; col: readonly number[] }[] = [];
    let waveTimer = 0;

    let t = 0;
    let last = performance.now();
    let raf = 0;
    let running = true;

    const draw = (now: number) => {
      const mode = useBackgroundStore.getState().mode;
      let speedMult = 1;
      let pulseBoost = 0;
      if (mode === 'thinking') { speedMult = 5.0; pulseBoost = 0.4; }
      else if (mode === 'responding') { speedMult = 2.0; pulseBoost = 0.2; }
      else if (mode === 'speaking') { speedMult = 1.5; pulseBoost = 0.3; }
      
      const dt = Math.min(now - last, 50) / 1000 * speedMult;
      last = now;
      t += dt;
      ctx.clearRect(0, 0, w, h);

      // Pulsing core field
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.3) * Math.sin(t * 0.47 + 1) + pulseBoost;
      const coreR = R * (0.9 + pulse * 0.25);
      let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.6);
      g.addColorStop(0, rgba(PALETTE[1], 0.22 + pulse * 0.12));
      g.addColorStop(0.25, rgba(PALETTE[0], 0.16 + pulse * 0.08));
      g.addColorStop(0.6, rgba(PALETTE[2], 0.07));
      g.addColorStop(1, "rgba(5,7,17,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      // Energy waves expanding from core
      waveTimer -= dt;
      if (waveTimer <= 0) {
        waves.push({ r: R * 0.2, col: PALETTE[Math.floor(Math.random() * 3)]! });
        waveTimer = 2.6 + Math.random() * 1.8;
      }
      for (let i = waves.length - 1; i >= 0; i--) {
        const wv = waves[i]!;
        wv.r += dt * R * 0.32;
        const life = 1 - (wv.r - R * 0.2) / (R * 2.2);
        if (life <= 0) { waves.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.ellipse(cx, cy, wv.r, wv.r * 0.62, 0, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(wv.col, 0.28 * life * life);
        ctx.lineWidth = 2 + 10 * (1 - life);
        ctx.stroke();
      }

      // Deforming neural loops
      const segs = lowPower ? 60 : 110;
      for (const L of loops) {
        const rot = L.rot + t * 0.08 * L.speed;
        ctx.beginPath();
        for (let s = 0; s <= segs; s++) {
          const a = (s / segs) * Math.PI * 2;
          const n =
            Math.sin(a * 3 + t * L.speed + L.seed) * 0.09 +
            Math.sin(a * 5 - t * 0.7 * L.speed + L.seed * 2) * 0.05 +
            Math.sin(a * 2 + t * 0.4) * 0.06;
          const rr = R * (L.r + n) * (1 + pulse * 0.04);
          const x = Math.cos(a) * rr;
          const y = Math.sin(a) * rr * L.tilt;
          const px = cx + x * Math.cos(rot) - y * Math.sin(rot);
          const py = cy + x * Math.sin(rot) + y * Math.cos(rot);
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = rgba(L.col, 0.08);
        ctx.lineWidth = 6;
        ctx.stroke();
        ctx.strokeStyle = rgba(L.col, 0.32);
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }

      // Radial tendrils that bend and flow outward
      for (const T of tendrils) {
        const a0 = T.a + Math.sin(t * 0.3 + T.seed) * 0.25 + t * 0.03;
        ctx.beginPath();
        const steps = 22;
        let px = 0, py = 0;
        for (let s = 0; s <= steps; s++) {
          const k = s / steps;
          const bend = Math.sin(k * 4 + t * 1.1 + T.seed) * 0.35 * k;
          const a = a0 + bend;
          const rr = R * (0.2 + k * T.len);
          px = cx + Math.cos(a) * rr;
          py = cy + Math.sin(a) * rr * 0.68;
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        const lg = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * (0.2 + T.len));
        lg.addColorStop(0, rgba(T.col, 0.45));
        lg.addColorStop(1, rgba(T.col, 0));
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1;
        ctx.stroke();
        // signal travelling along tendril
        const k = (t * 0.25 + T.seed) % 1;
        const bend = Math.sin(k * 4 + t * 1.1 + T.seed) * 0.35 * k;
        const rr = R * (0.2 + k * T.len);
        const sx = cx + Math.cos(a0 + bend) * rr;
        const sy = cy + Math.sin(a0 + bend) * rr * 0.68;
        ctx.fillStyle = rgba(PALETTE[1], 0.8 * (1 - k));
        ctx.beginPath();
        ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Orbiting particles with short trails
      for (const p of particles) {
        p.ang += p.w * dt;
        p.rad += Math.sin(t * 0.5 + p.seed) * p.drift * dt;
        const wob = Math.sin(t * 0.9 + p.seed) * 0.08;
        const rr = R * (p.rad + wob);
        const x = cx + Math.cos(p.ang) * rr * 1.25;
        const y = cy + Math.sin(p.ang) * rr * p.tilt;
        const tx = cx + Math.cos(p.ang - 0.12) * rr * 1.25;
        const ty = cy + Math.sin(p.ang - 0.12) * rr * p.tilt;
        const tw = 0.6 + 0.4 * Math.sin(t * 2 + p.seed * 5);
        if (p.front) {
          ctx.strokeStyle = rgba(p.col, 0.25 * tw);
          ctx.lineWidth = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.fillStyle = rgba(p.col, 0.15 * tw);
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = rgba(p.col, p.alpha * tw);
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright core
      ctx.globalCompositeOperation = "lighter";
      g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.28);
      g.addColorStop(0, rgba([220, 240, 255], 0.35 + pulse * 0.2));
      g.addColorStop(0.4, rgba(PALETTE[1], 0.18));
      g.addColorStop(1, rgba(PALETTE[0], 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      if (running && !reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVis = () => {
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running && !reduced) {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    let rt = 0;
    const onResize = () => {
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        if (reduced) requestAnimationFrame(draw);
      }, 120);
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div aria-hidden className="neural-bg">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />
      <div className="aurora aurora-4" />
      <canvas ref={canvasRef} className="neural-canvas" />
      <div className="neural-readability" />
      <div className="neural-vignette" />
      <div className="neural-grain" />
    </div>
  );
}
