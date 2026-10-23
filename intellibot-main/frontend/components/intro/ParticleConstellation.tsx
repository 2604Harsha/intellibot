"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleConstellation({ stage }: { stage: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate random particles (1500 points)
  const particlesCount = 1500;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a spherical distribution
      const radius = 3 + Math.random() * 2;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // x
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      pos[i * 3 + 2] = radius * Math.cos(phi);                   // z
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Rotate slowly
    pointsRef.current.rotation.y += delta * 0.1;
    pointsRef.current.rotation.x += delta * 0.05;

    // Orchestrate based on stage
    // Stage 0: compressed point
    // Stage 1+: exploded neural net
    // Stage 5: morph to orb (compress slightly and pulse)
    
    const targetScale = stage === 0 ? 0.01 : stage >= 5 ? 0.5 : 1;
    
    // Smooth lerp to target scale
    pointsRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#00E5FF"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
