import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useBackgroundStore } from '../../../store/background';
import { colorPalettes } from '../../../background.config';

export function AbyssOcean3D() {
  const pointsRef = useRef<any>(null);
  const colorPalette = useBackgroundStore(s => s.colorPalette);
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;

  // Generate random particles for the ocean depths
  const particles = useMemo(() => {
    const p = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20; // x
      p[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
    }
    return p;
  }, []);

  const mode = useBackgroundStore(s => s.mode);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    let speed = 1;
    if (mode === 'thinking') speed = 6;
    else if (mode === 'responding') speed = 3;
    else if (mode === 'speaking') speed = 2;

    timeRef.current += delta * speed;

    if (pointsRef.current) {
      pointsRef.current.rotation.y = timeRef.current * 0.05;
      pointsRef.current.position.y = Math.sin(timeRef.current * 0.2) * 1;
    }
  });

  return (
    <>
      <color attach="background" args={["#02050A"]} />
      <fog attach="fog" args={["#02050A", 2, 15]} />
      
      <ambientLight intensity={0.2} />
      {/* Bioluminescent volumetric-like lights */}
      <pointLight position={[0, 5, -5]} color={activeColors.cyan} intensity={2} distance={20} />
      <pointLight position={[-5, -5, -5]} color={activeColors.glow1} intensity={1.5} distance={20} />

      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color={activeColors.cyan} 
          size={0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
}
