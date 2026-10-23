import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useBackgroundStore } from '../../../store/background';
import { colorPalettes } from '../../../background.config';

export function LiquidPrism3D() {
  const colorPalette = useBackgroundStore(s => s.colorPalette);
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;

  const mode = useBackgroundStore(s => s.mode);

  let speedMult = 1;
  if (mode === 'thinking') speedMult = 5;
  else if (mode === 'responding') speedMult = 2;
  else if (mode === 'speaking') speedMult = 1.5;

  const bg = new THREE.Color(activeColors.base);
  const tint = new THREE.Color(activeColors.cyan);

  return (
    <>
      <color attach="background" args={[bg.r, bg.g, bg.b]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color={tint} />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color={activeColors.glow1} />

      <Float speed={2 * speedMult} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0, -2]}>
          <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={1}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.2}
            iridescence={1}
            iridescenceIOR={1.5}
            iridescenceThicknessRange={[100, 400]}
            color={activeColors.glow2}
          />
        </mesh>
      </Float>

      <Float speed={1.5 * speedMult} rotationIntensity={1.5} floatIntensity={3}>
        <mesh position={[-3, 1, -5]}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={3}
            chromaticAberration={0.5}
            color={activeColors.cyan}
          />
        </mesh>
      </Float>

      <Float speed={2.5 * speedMult} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[3, -2, -3]}>
          <octahedronGeometry args={[1.5, 2]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            chromaticAberration={1.5}
            color={activeColors.glow1}
          />
        </mesh>
      </Float>
    </>
  );
}
