"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSpring } from "framer-motion";
import { useBackgroundStore } from "../../store/background";
import { bgConfig, colorPalettes } from "../../background.config";
import { auroraFragShader } from "./shaders/aurora.frag.glsl";
import { particlesVertShader, particlesFragShader } from "./shaders/particles.glsl";
import { CssFallback } from "./CssFallback";
import { useAdaptiveQuality } from "./useAdaptiveQuality";

function BackgroundScene() {
  const { mode, actualQuality, intensity, audioLevel, pointer, reducedMotion, pulseValue, decayPulse, colorPalette } = useBackgroundStore();
  
  const activeColors = useMemo(() => {
    return colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;
  }, [colorPalette]);

  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particlesMatRef = useRef<THREE.ShaderMaterial>(null);
  const particlesGeomRef = useRef<THREE.BufferGeometry>(null);

  const { size, viewport } = useThree();

  // Springs for smooth transitions
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
      uColorError: { value: new THREE.Color(activeColors.error) },
      uIntensity: { value: 1.0 },
      uPulse: { value: 0 },
      uAudioLevel: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uModeWarp: { value: 0 },
      uModeColorShift: { value: 0 },
      uRipple: { value: 0 },
      uQuality: { value: 2 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: auroraFragShader,
  }), []);

  const particleArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uAudioLevel: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uModeWarp: { value: 0 },
    },
    vertexShader: particlesVertShader,
    fragmentShader: particlesFragShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColorBase.value.set(activeColors.base);
      materialRef.current.uniforms.uColorGlow1.value.set(activeColors.glow1);
      materialRef.current.uniforms.uColorGlow2.value.set(activeColors.glow2);
      materialRef.current.uniforms.uColorHighlight.value.set(activeColors.cyan);
      materialRef.current.uniforms.uColorError.value.set(activeColors.error);
    }
    
    let targetWarp = 0;
    let targetColorShift = 0;
    
    if (mode === 'thinking') {
      targetWarp = 1.0;
      targetColorShift = 0.5;
    } else if (mode === 'speaking') {
      targetColorShift = 1.0;
    } else if (mode === 'responding') {
      targetWarp = 0.5;
      ripple.set(ripple.get() + 5.0);
    }
    
    modeWarp.set(targetWarp);
    modeColorShift.set(targetColorShift);
  }, [mode, modeWarp, modeColorShift, ripple]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    
    let speed = bgConfig.motion.idleSpeed;
    if (mode === 'thinking') speed = bgConfig.motion.thinkingSpeed;
    if (mode === 'responding') speed = bgConfig.motion.respondingSpeed;
    if (reducedMotion) speed *= 0.1;

    timeRef.current += dt * speed;

    if (pulseValue > 0) {
      decayPulse(dt * 2.0);
    }

    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      uniforms.uTime.value = timeRef.current;
      uniforms.uResolution.value.set(size.width * state.viewport.dpr, size.height * state.viewport.dpr);
      uniforms.uIntensity.value = intensity === 2 ? 1.0 : (intensity === 1 ? 0.5 : 0.0);
      uniforms.uPulse.value = pulseValue;
      uniforms.uAudioLevel.value = THREE.MathUtils.lerp(uniforms.uAudioLevel.value, audioLevel, 0.1);
      if (!reducedMotion) {
        uniforms.uPointer.value.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.05);
      } else {
        uniforms.uPointer.value.set(0.5, 0.5);
      }
      uniforms.uModeWarp.value = modeWarp.get();
      uniforms.uModeColorShift.value = modeColorShift.get();
      uniforms.uRipple.value = ripple.get();
      uniforms.uQuality.value = actualQuality === 'high' ? 2 : (actualQuality === 'medium' ? 1 : 0);
    }
    
    if (particlesMatRef.current && actualQuality !== 'low' && actualQuality !== 'off' && intensity > 0) {
      const uniforms = particlesMatRef.current.uniforms;
      uniforms.uTime.value = timeRef.current;
      uniforms.uAudioLevel.value = materialRef.current!.uniforms.uAudioLevel.value;
      uniforms.uPointer.value.copy(materialRef.current!.uniforms.uPointer.value);
      uniforms.uModeWarp.value = modeWarp.get();
    }
  });

  useEffect(() => {
    if (!particlesGeomRef.current) return;
    const pCount = bgConfig.particles.count[actualQuality as keyof typeof bgConfig.particles.count] || 0;
    if (pCount === 0) return;
    
    const positions = new Float32Array(pCount * 3);
    const sizes = new Float32Array(pCount);
    const phases = new Float32Array(pCount);
    const depths = new Float32Array(pCount);
    
    for (let i = 0; i < pCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
      
      sizes[i] = (Math.random() * 0.5 + 0.5) * bgConfig.particles.size;
      phases[i] = Math.random() * Math.PI * 2;
      depths[i] = Math.random();
    }
    
    particlesGeomRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeomRef.current.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    particlesGeomRef.current.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    particlesGeomRef.current.setAttribute('aDepth', new THREE.BufferAttribute(depths, 1));
  }, [actualQuality]);

  const pCount = bgConfig.particles.count[actualQuality as keyof typeof bgConfig.particles.count] || 0;

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={materialRef} args={[shaderArgs]} depthWrite={false} />
      </mesh>
      
      {pCount > 0 && intensity > 0 && (
        <points>
          <bufferGeometry ref={particlesGeomRef} />
          <shaderMaterial ref={particlesMatRef} args={[particleArgs]} />
        </points>
      )}
    </>
  );
}

export function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);
  const { intensity, actualQuality, setPointer } = useBackgroundStore();
  
  useAdaptiveQuality();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight);
    };
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (!isTouch) {
      window.addEventListener('pointermove', handlePointerMove);
    }
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [setPointer]);

  if (!mounted || intensity === 0 || actualQuality === 'off') {
    return <CssFallback />;
  }

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#03040F] pointer-events-none" aria-hidden="true">
      <Canvas 
        camera={{ position: [0, 0, 1], orthographic: true }}
        dpr={actualQuality === 'high' ? [1, 1.5] : (actualQuality === 'medium' ? 1 : 0.75)}
        gl={{ powerPreference: "high-performance", antialias: false, stencil: false, depth: false }}
      >
        <FrameloopManager />
        <BackgroundScene />
      </Canvas>
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
}

function FrameloopManager() {
  const invalidate = useThree((s) => s.invalidate);
  const setFrameloop = useThree((s) => s.setFrameloop);
  
  useEffect(() => {
    setFrameloop('always');
    const handleVisibility = () => {
      if (document.hidden) {
        setFrameloop('demand');
      } else {
        setFrameloop('always');
        invalidate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [setFrameloop, invalidate]);
  return null;
}
