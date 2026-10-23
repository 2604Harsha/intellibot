import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useBackgroundStore } from '../../../store/background';
import { colorPalettes } from '../../../background.config';

const terrainVertexShader = `
uniform float uTime;
varying float vElevation;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  float elevation = snoise(vec2(modelPosition.x * 0.5, modelPosition.z * 0.5 - uTime * 0.5)) * 0.5;
  elevation += snoise(vec2(modelPosition.x * 2.0, modelPosition.z * 2.0 - uTime)) * 0.1;
  
  modelPosition.y += elevation;
  vElevation = elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
}
`;

const terrainFragmentShader = `
uniform vec3 uColorBase;
uniform vec3 uColorHighlight;
varying float vElevation;

void main() {
  float mixStrength = (vElevation + 0.5) * 1.0;
  vec3 color = mix(uColorBase, uColorHighlight, mixStrength);
  gl_FragColor = vec4(color, 1.0);
}
`;

export function HolographicTerrain3D() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const colorPalette = useBackgroundStore(s => s.colorPalette);
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorBase: { value: new THREE.Color(activeColors.base) },
    uColorHighlight: { value: new THREE.Color(activeColors.cyan) },
  }), [activeColors]);

  const mode = useBackgroundStore(s => s.mode);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    let speed = 1;
    if (mode === 'thinking') speed = 5;
    else if (mode === 'responding') speed = 2.5;
    else if (mode === 'speaking') speed = 2;

    timeRef.current += delta * speed;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = timeRef.current;
      materialRef.current.uniforms.uColorBase.value.set(activeColors.base);
      materialRef.current.uniforms.uColorHighlight.value.set(activeColors.cyan);
    }
  });

  return (
    <>
      <color attach="background" args={[activeColors.base]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
        <planeGeometry args={[20, 20, 128, 128]} />
        <shaderMaterial 
          ref={materialRef}
          vertexShader={terrainVertexShader}
          fragmentShader={terrainFragmentShader}
          uniforms={uniforms}
          wireframe={true}
          transparent={true}
        />
      </mesh>
    </>
  );
}
