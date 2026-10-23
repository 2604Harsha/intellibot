"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppState } from "@/lib/store/useAppState";

function AuroraMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const botState = useAppState((s) => s.botState);

  // A highly optimized WebGL fragment shader for liquid aurora
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: 0.2 },
      uColor1: { value: new THREE.Color("#5436DA") }, // Violet
      uColor2: { value: new THREE.Color("#00E5FF") }, // Cyan
      uColor3: { value: new THREE.Color("#05060A") }, // Base Black
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uSpeed;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;
      
      // Simplex noise function placeholder (using sin/cos for performance)
      float noise(vec2 p) {
        return sin(p.x * 10.0 + uTime * uSpeed) * cos(p.y * 10.0 + uTime * uSpeed);
      }

      void main() {
        vec2 uv = vUv;
        float n = noise(uv * 2.0);
        
        // Mix colors based on noise and uv
        vec3 color = mix(uColor3, uColor1, smoothstep(-1.0, 1.0, n + uv.y));
        color = mix(color, uColor2, smoothstep(-0.5, 1.5, noise(uv * 3.0 + vec2(uTime * 0.1)) - uv.x));
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      
      // React to state
      let targetSpeed = 0.2;
      if (botState === 'thinking') targetSpeed = 1.5;
      if (botState === 'responding') targetSpeed = 0.8;
      if (botState === 'typing') targetSpeed = 0.5;

      // Smoothly interpolate speed
      materialRef.current.uniforms.uSpeed.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uSpeed.value,
        targetSpeed,
        0.05
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} transparent opacity={0.6} depthWrite={false} />
    </mesh>
  );
}

function GridOverlay() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{
      backgroundSize: '40px 40px',
      backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
      maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)'
    }} />
  );
}

export function LivingBackground() {
  const bgIntensity = useAppState((s) => s.bgIntensity);

  if (bgIntensity === 0) return null;

  return (
    <div className="fixed inset-0 z-[-1] bg-[#05060A] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 1] }} className="absolute inset-0">
        <AuroraMesh />
      </Canvas>
      <GridOverlay />
      
      {/* Noise Texture for Depth */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
}
