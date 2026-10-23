import { noiseGlsl } from '../../../lib/background/noise.glsl';

export const auroraFragShader = `
uniform float uTime;
uniform vec3 uColorBase;
uniform vec3 uColorGlow1;
uniform vec3 uColorGlow2;
uniform vec3 uColorHighlight;
uniform vec3 uColorError;
uniform float uIntensity;
uniform float uPulse;
uniform float uAudioLevel;
uniform vec2 uPointer;
uniform vec2 uResolution;
uniform float uModeWarp;
uniform float uModeColorShift;
uniform float uRipple;
uniform int uQuality;

varying vec2 vUv;

${noiseGlsl}

float dither(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453) / 255.0 * 2.0;
}

void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 pos = (uv - 0.5) * vec2(aspect, 1.0);
    
    // Pointer parallax / interaction
    vec2 pointerPos = (uPointer - 0.5) * vec2(aspect, 1.0);
    float pointerDist = length(pos - pointerPos);
    float pointerGlow = smoothstep(0.4, 0.0, pointerDist) * 0.15;
    
    float warpStr = 1.0 + uModeWarp * 1.5;
    int octaves = uQuality == 2 ? 4 : (uQuality == 1 ? 3 : 2);
    
    // FBM domain warping
    vec3 p = vec3(pos * 2.5 * warpStr, uTime * 0.1);
    float q = fbm(p - vec3(0.0, uTime * 0.2, 0.0), octaves);
    float r = fbm(p + vec3(q * 2.0, q * 2.0, uTime * 0.3) + vec3(uRipple, uAudioLevel * 2.0, 0.0), octaves);
    float noiseVal = fbm(p + vec3(r * 4.0, r * 4.0, uTime * 0.2), octaves);
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5));
    
    // Glows
    vec2 bottomCenter = vec2(0.5, 0.0);
    float glowDist = length((uv - bottomCenter) * vec2(1.0, 1.5));
    float mainGlow = smoothstep(1.2, 0.0, glowDist) * (1.0 + uPulse * 0.5 + uAudioLevel * 0.8);
    float topBloom = smoothstep(1.5, 0.0, length(uv - vec2(0.0, 1.0))) * 0.4;
    
    vec3 color = uColorBase;
    float fbmMix = smoothstep(0.0, 1.0, noiseVal) * mainGlow;
    vec3 activeGlow2 = mix(uColorGlow2, uColorHighlight, uModeColorShift);
    
    color = mix(color, uColorGlow1, mainGlow * 0.6);
    color = mix(color, activeGlow2, fbmMix);
    color = mix(color, uColorHighlight, topBloom * noiseVal);
    
    // Error pulse overrides
    color = mix(color, uColorError, uPulse * (1.0 - uIntensity)); 
    
    color += pointerGlow * uColorHighlight;
    
    // Rays
    float rays = (sin(uv.x * 20.0 + uTime + noiseVal*5.0) * 0.5 + 0.5) * mainGlow * 0.1;
    color += rays * uColorHighlight * uIntensity;
    
    color *= uIntensity;
    color *= vignette;
    
    if (uQuality > 0) {
        color += dither(gl_FragCoord.xy) * 0.03;
    }
    
    gl_FragColor = vec4(color, 1.0);
}
`;
