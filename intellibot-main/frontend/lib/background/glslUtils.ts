export const noiseGlsl = `
// Simplex 3D Noise
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 1.0/7.0;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

float fbm(vec3 x, int octaves) {
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100.0);
    // Keep it low frequency, max 3 octaves usually
    for (int i = 0; i < 3; ++i) {
        if (i >= octaves) break;
        v += a * snoise(x);
        x = x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}
`;

export const maskGlsl = `
#define MAX_RECTS 10
uniform vec4 uMaskRects[MAX_RECTS];
uniform int uNumRects;

float computeContentMask(vec2 fragCoord) {
    float mask = 0.0;
    for(int i = 0; i < MAX_RECTS; i++) {
        if (i >= uNumRects) break;
        vec4 rect = uMaskRects[i];
        // rect: x, y, width, height (normalized to screen)
        // distance field to rounded rect could be used, or just soft bounds
        
        vec2 center = rect.xy + rect.zw * 0.5;
        vec2 halfSize = rect.zw * 0.5;
        
        // normalized coordinates from center of this rect
        vec2 d = abs(fragCoord - center) - halfSize;
        float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
        
        // Soft falloff (blur radius ~0.1 screen size)
        float localMask = 1.0 - smoothstep(0.0, 0.15, dist);
        mask = max(mask, localMask);
    }
    return mask;
}

vec3 applyHighlightCap(vec3 color, float maskAmount) {
    // Soft shoulder tone mapping
    color = 1.0 - exp(-color * 1.5); // HDR -> LDR
    
    // In mask area, dim heavily
    float dimFactor = mix(1.0, 0.45, maskAmount);
    color *= dimFactor;
    
    // Clamp to ensure WCAG limits
    float maxLum = mix(0.85, 0.18, maskAmount);
    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    if(lum > maxLum) {
        color = color * (maxLum / lum);
    }
    
    return color;
}
`;
