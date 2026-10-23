"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring } from "framer-motion";
import { useBackgroundStore } from "../../store/background";
import { bgConfig } from "../../background.config";
import { LiquidPrism3D } from "./themes/liquid-prism-3d";
import { AbyssOcean3D } from "./themes/abyss-ocean-3d";
import { HolographicTerrain3D } from "./themes/holographic-terrain-3d";
import { SynthwaveGrid3D } from "./themes/synthwave-grid-3d";
import { NeuralBackground } from "./themes/neural-background";
import { CssFallback } from "./CssFallback";
import { useAdaptiveQuality } from "./useAdaptiveQuality";
import { colorPalettes } from "../../background.config";

function ShaderTheme({ shaderStr }: { shaderStr: string }) {
  const mode = useBackgroundStore(s => s.mode);
  const actualQuality = useBackgroundStore(s => s.actualQuality);
  const reducedMotion = useBackgroundStore(s => s.reducedMotion);
  const colorPalette = useBackgroundStore(s => s.colorPalette);
  const maskRects = useBackgroundStore(s => s.maskRects);
  
  const activeColors = useMemo(() => {
    return colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;
  }, [colorPalette]);
  
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const { size, viewport } = useThree();

  const springConfig = { damping: bgConfig.motion.springDamping, stiffness: bgConfig.motion.springStiffness };
  const modeWarp = useSpring(0, springConfig);
  const modeColorShift = useSpring(0, springConfig);
  const ripple = useSpring(0, springConfig);
  const timeRef = useRef(0);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColorBase: { value: new THREE.Color(activeColors.base) },
      uColorGlow1: { value: new THREE.Color(activeColors.glow1) },
      uColorGlow2: { value: new THREE.Color(activeColors.glow2) },
      uColorHighlight: { value: new THREE.Color(activeColors.cyan) },
      uIntensity: { value: 1.0 },
      uPulse: { value: 0 },
      uAudioLevel: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uModeWarp: { value: 0 },
      uModeColorShift: { value: 0 },
      uRipple: { value: 0 },
      uQuality: { value: 2 },
      uMaskRects: { value: [] },
      uNumRects: { value: 0 }
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
    fragmentShader: shaderStr,
  }), [shaderStr]);

  useEffect(() => {
    let targetWarp = 0; let targetColorShift = 0;
    if (mode === 'thinking') { targetWarp = 1.0; targetColorShift = 0.5; }
    else if (mode === 'speaking') { targetColorShift = 1.0; }
    else if (mode === 'responding') { targetWarp = 0.5; ripple.set(ripple.get() + 5.0); }
    
    modeWarp.set(targetWarp);
    modeColorShift.set(targetColorShift);
  }, [mode, modeWarp, modeColorShift, ripple]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColorBase.value.set(activeColors.base);
      materialRef.current.uniforms.uColorGlow1.value.set(activeColors.glow1);
      materialRef.current.uniforms.uColorGlow2.value.set(activeColors.glow2);
      materialRef.current.uniforms.uColorHighlight.value.set(activeColors.cyan);
    }
  }, [activeColors]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const bgState = useBackgroundStore.getState();
    const { intensity, pulseValue, audioLevel, pointer, decayPulse } = bgState;

    let speed = bgConfig.motion.idleSpeed;
    if (mode === 'thinking') speed = bgConfig.motion.thinkingSpeed;
    if (mode === 'responding') speed = bgConfig.motion.respondingSpeed;
    if (reducedMotion) speed *= 0.1;

    timeRef.current += dt * speed;
    if (pulseValue > 0) decayPulse(dt * 2.0);

    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      uniforms.uTime.value = timeRef.current;
      uniforms.uResolution.value.set(size.width * state.viewport.dpr, size.height * state.viewport.dpr);
      uniforms.uIntensity.value = intensity;
      uniforms.uPulse.value = pulseValue;
      uniforms.uAudioLevel.value = THREE.MathUtils.lerp(uniforms.uAudioLevel.value, audioLevel, 0.1);
      if (!reducedMotion) uniforms.uPointer.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.05);
      
      uniforms.uModeWarp.value = modeWarp.get();
      uniforms.uModeColorShift.value = modeColorShift.get();
      uniforms.uRipple.value = ripple.get();
      uniforms.uQuality.value = actualQuality === 'high' ? 2 : (actualQuality === 'medium' ? 1 : 0);
      
      // Update mask rects
      const rectData: THREE.Vector4[] = [];
      maskRects.slice(0, 10).forEach(rect => {
        // Convert screen rects to normalized coordinates [0, 1]
        rectData.push(new THREE.Vector4(
          rect.left / window.innerWidth,
          1.0 - rect.top / window.innerHeight, // WebGL is Y-up
          rect.width / window.innerWidth,
          rect.height / window.innerHeight
        ));
      });
      while (rectData.length < 10) rectData.push(new THREE.Vector4(0,0,0,0)); // Pad to max 10
      
      uniforms.uMaskRects.value = rectData;
      uniforms.uNumRects.value = Math.min(maskRects.length, 10);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} depthWrite={false} />
    </mesh>
  );
}

function ActiveTheme() {
  const theme = useBackgroundStore(s => s.theme);
  
  if (theme === 'abyss-ocean') return <AbyssOcean3D />;
  if (theme === 'holographic-terrain') return <HolographicTerrain3D />;
  if (theme === 'synthwave-grid') return <SynthwaveGrid3D />;
  return <LiquidPrism3D />; // default liquid-prism
}

export function BackgroundHost() {
  const [mounted, setMounted] = useState(false);
  const actualQuality = useBackgroundStore(s => s.actualQuality);
  const setPointer = useBackgroundStore(s => s.setPointer);
  const theme = useBackgroundStore(s => s.theme);
  
  useAdaptiveQuality();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouch) window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [setPointer]);

  if (!mounted || actualQuality === 'off') return <CssFallback />;

  if (theme === 'neural-background') {
    return <NeuralBackground />;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden dark:bg-[#03040F] bg-gray-50 pointer-events-none" aria-hidden="true">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={actualQuality === 'high' ? [1, 1.5] : (actualQuality === 'medium' ? 1 : 0.75)}
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}
      >
        <FrameloopManager />
        <ActiveTheme />
      </Canvas>
    </div>
  );
}

function FrameloopManager() {
  const invalidate = useThree((s) => s.invalidate);
  const setFrameloop = useThree((s) => s.setFrameloop);
  
  useEffect(() => {
    setFrameloop('always');
    const handleVisibility = () => {
      if (document.hidden) setFrameloop('demand');
      else { setFrameloop('always'); invalidate(); }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [setFrameloop, invalidate]);
  return null;
}
