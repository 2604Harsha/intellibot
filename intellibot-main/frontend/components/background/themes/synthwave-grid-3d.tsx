import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';
import { useBackgroundStore } from '../../../store/background';
import { colorPalettes } from '../../../background.config';

export function SynthwaveGrid3D() {
  const gridRef = useRef<any>(null);
  const colorPalette = useBackgroundStore(s => s.colorPalette);
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;

  const mode = useBackgroundStore(s => s.mode);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    let speed = 2; // base speed
    if (mode === 'thinking') speed = 10;
    else if (mode === 'responding') speed = 4;
    else if (mode === 'speaking') speed = 3;

    timeRef.current += delta * speed;

    if (gridRef.current) {
      // Infinite scrolling effect using accumulated time
      gridRef.current.position.z = timeRef.current % 1;
    }
  });

  return (
    <>
      <color attach="background" args={[activeColors.base]} />
      <fog attach="fog" args={[activeColors.base, 5, 20]} />
      
      {/* Sun */}
      <mesh position={[0, 2, -15]}>
        <circleGeometry args={[4, 64]} />
        <meshBasicMaterial color={activeColors.glow1} />
      </mesh>

      {/* Moving Grid */}
      <group position={[0, -1, 0]}>
        <Grid 
          ref={gridRef}
          position={[0, 0, 0]} 
          args={[40, 40]} 
          cellSize={1} 
          cellThickness={1} 
          cellColor={activeColors.cyan} 
          sectionSize={5} 
          sectionThickness={1.5} 
          sectionColor={activeColors.glow2} 
          fadeDistance={20} 
          fadeStrength={1} 
        />
      </group>
    </>
  );
}
