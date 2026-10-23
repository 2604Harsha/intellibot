export const particlesVertShader = `
uniform float uTime;
uniform float uAudioLevel;
uniform vec2 uPointer;
uniform float uModeWarp;

attribute float aSize;
attribute float aPhase;
attribute float aDepth;

varying vec2 vUv;
varying float vAlpha;

void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Slow drift
    pos.y += sin(uTime * 0.2 + aPhase) * 0.1;
    pos.x += cos(uTime * 0.15 + aPhase) * 0.1;
    
    // Pointer parallax
    pos.x += (uPointer.x - 0.5) * (1.0 - aDepth) * 2.0;
    pos.y += -(uPointer.y - 0.5) * (1.0 - aDepth) * 2.0;
    
    // Audio reaction
    pos.y += (1.0 - aDepth) * uAudioLevel * sin(aPhase * 10.0) * 0.5;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Twinkle
    vAlpha = (sin(uTime * 2.0 + aPhase * 5.0) * 0.5 + 0.5) * (1.0 - aDepth) * 0.6;
    vAlpha += uAudioLevel * 0.5;
    
    gl_PointSize = aSize * (300.0 / -mvPosition.z) * (1.0 + uModeWarp);
    gl_Position = projectionMatrix * mvPosition;
}
`;

export const particlesFragShader = `
varying vec2 vUv;
varying float vAlpha;

void main() {
    // Soft circle
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    gl_FragColor = vec4(0.4, 0.8, 1.0, alpha); // Cyan/blue tint
}
`;
