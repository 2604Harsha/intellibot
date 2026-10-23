(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/background.config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bgConfig",
    ()=>bgConfig,
    "colorPalettes",
    ()=>colorPalettes
]);
const colorPalettes = {
    cobalt: {
        id: "cobalt",
        name: "Cobalt Deep",
        base: "#03040F",
        base2: "#060A1F",
        glow1: "#1B2BFF",
        glow2: "#2547E8",
        cyan: "#1FA8FF",
        error: "#ff2a5f"
    },
    emerald: {
        id: "emerald",
        name: "Emerald Glow",
        base: "#020A06",
        base2: "#05130A",
        glow1: "#00E572",
        glow2: "#00B259",
        cyan: "#33FF99",
        error: "#ff2a5f"
    },
    amethyst: {
        id: "amethyst",
        name: "Amethyst Void",
        base: "#080312",
        base2: "#100624",
        glow1: "#8C33FF",
        glow2: "#6614FF",
        cyan: "#D480FF",
        error: "#ff2a5f"
    },
    crimson: {
        id: "crimson",
        name: "Crimson Forge",
        base: "#120202",
        base2: "#1A0404",
        glow1: "#FF1F40",
        glow2: "#E60026",
        cyan: "#FF6680",
        error: "#ff2a5f"
    }
};
const bgConfig = {
    defaultPalette: "cobalt",
    colors: colorPalettes.cobalt,
    themes: [
        {
            id: 'holographic-terrain',
            name: 'Holographic Terrain'
        },
        {
            id: 'abyss-ocean',
            name: 'Abyss Ocean'
        },
        {
            id: 'liquid-prism',
            name: 'Liquid Prism'
        },
        {
            id: 'neural-background',
            name: 'Neural Core (2D Canvas)'
        },
        {
            id: 'synthwave-grid',
            name: 'Synthwave Grid'
        }
    ],
    luminance: {
        maxOutsideMask: 0.25,
        maxInsideMask: 0.18,
        maskDimFactor: 0.35
    },
    motion: {
        idleSpeed: 0.02,
        thinkingSpeed: 0.05,
        respondingSpeed: 0.04,
        springDamping: 25,
        springStiffness: 100,
        transitionMs: 700
    },
    qualityThresholds: {
        fpsDropDuration: 30,
        badFrameMs: 20
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/BackgroundHost.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundHost",
    ()=>BackgroundHost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export D as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$liquid$2d$prism$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/themes/liquid-prism-3d.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$abyss$2d$ocean$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/themes/abyss-ocean-3d.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$holographic$2d$terrain$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/themes/holographic-terrain-3d.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$synthwave$2d$grid$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/themes/synthwave-grid-3d.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$neural$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/themes/neural-background.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$CssFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/CssFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$useAdaptiveQuality$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/useAdaptiveQuality.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function ShaderTheme({ shaderStr }) {
    _s();
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ShaderTheme.useBackgroundStore[mode]": (s)=>s.mode
    }["ShaderTheme.useBackgroundStore[mode]"]);
    const actualQuality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ShaderTheme.useBackgroundStore[actualQuality]": (s)=>s.actualQuality
    }["ShaderTheme.useBackgroundStore[actualQuality]"]);
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ShaderTheme.useBackgroundStore[reducedMotion]": (s)=>s.reducedMotion
    }["ShaderTheme.useBackgroundStore[reducedMotion]"]);
    const colorPalette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ShaderTheme.useBackgroundStore[colorPalette]": (s)=>s.colorPalette
    }["ShaderTheme.useBackgroundStore[colorPalette]"]);
    const maskRects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ShaderTheme.useBackgroundStore[maskRects]": (s)=>s.maskRects
    }["ShaderTheme.useBackgroundStore[maskRects]"]);
    const activeColors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShaderTheme.useMemo[activeColors]": ()=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"][colorPalette] || __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"].cobalt;
        }
    }["ShaderTheme.useMemo[activeColors]"], [
        colorPalette
    ]);
    const meshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const materialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { size, viewport } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])();
    const springConfig = {
        damping: __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].motion.springDamping,
        stiffness: __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].motion.springStiffness
    };
    const modeWarp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(0, springConfig);
    const modeColorShift = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(0, springConfig);
    const ripple = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(0, springConfig);
    const timeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const shaderArgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShaderTheme.useMemo[shaderArgs]": ()=>({
                uniforms: {
                    uTime: {
                        value: 0
                    },
                    uColorBase: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.base)
                    },
                    uColorGlow1: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.glow1)
                    },
                    uColorGlow2: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.glow2)
                    },
                    uColorHighlight: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.cyan)
                    },
                    uIntensity: {
                        value: 1.0
                    },
                    uPulse: {
                        value: 0
                    },
                    uAudioLevel: {
                        value: 0
                    },
                    uPointer: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](0.5, 0.5)
                    },
                    uResolution: {
                        value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1, 1)
                    },
                    uModeWarp: {
                        value: 0
                    },
                    uModeColorShift: {
                        value: 0
                    },
                    uRipple: {
                        value: 0
                    },
                    uQuality: {
                        value: 2
                    },
                    uMaskRects: {
                        value: []
                    },
                    uNumRects: {
                        value: 0
                    }
                },
                vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
                fragmentShader: shaderStr
            })
    }["ShaderTheme.useMemo[shaderArgs]"], [
        shaderStr
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderTheme.useEffect": ()=>{
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
        }
    }["ShaderTheme.useEffect"], [
        mode,
        modeWarp,
        modeColorShift,
        ripple
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderTheme.useEffect": ()=>{
            if (materialRef.current) {
                materialRef.current.uniforms.uColorBase.value.set(activeColors.base);
                materialRef.current.uniforms.uColorGlow1.value.set(activeColors.glow1);
                materialRef.current.uniforms.uColorGlow2.value.set(activeColors.glow2);
                materialRef.current.uniforms.uColorHighlight.value.set(activeColors.cyan);
            }
        }
    }["ShaderTheme.useEffect"], [
        activeColors
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "ShaderTheme.useFrame": (state, delta)=>{
            const dt = Math.min(delta, 0.1);
            const bgState = __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"].getState();
            const { intensity, pulseValue, audioLevel, pointer, decayPulse } = bgState;
            let speed = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].motion.idleSpeed;
            if (mode === 'thinking') speed = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].motion.thinkingSpeed;
            if (mode === 'responding') speed = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].motion.respondingSpeed;
            if (reducedMotion) speed *= 0.1;
            timeRef.current += dt * speed;
            if (pulseValue > 0) decayPulse(dt * 2.0);
            if (materialRef.current) {
                const uniforms = materialRef.current.uniforms;
                uniforms.uTime.value = timeRef.current;
                uniforms.uResolution.value.set(size.width * state.viewport.dpr, size.height * state.viewport.dpr);
                uniforms.uIntensity.value = intensity;
                uniforms.uPulse.value = pulseValue;
                uniforms.uAudioLevel.value = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(uniforms.uAudioLevel.value, audioLevel, 0.1);
                if (!reducedMotion) uniforms.uPointer.value.lerp(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](pointer.x, pointer.y), 0.05);
                uniforms.uModeWarp.value = modeWarp.get();
                uniforms.uModeColorShift.value = modeColorShift.get();
                uniforms.uRipple.value = ripple.get();
                uniforms.uQuality.value = actualQuality === 'high' ? 2 : actualQuality === 'medium' ? 1 : 0;
                // Update mask rects
                const rectData = [];
                maskRects.slice(0, 10).forEach({
                    "ShaderTheme.useFrame": (rect)=>{
                        // Convert screen rects to normalized coordinates [0, 1]
                        rectData.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](rect.left / window.innerWidth, 1.0 - rect.top / window.innerHeight, rect.width / window.innerWidth, rect.height / window.innerHeight));
                    }
                }["ShaderTheme.useFrame"]);
                while(rectData.length < 10)rectData.push(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector4"](0, 0, 0, 0)); // Pad to max 10
                uniforms.uMaskRects.value = rectData;
                uniforms.uNumRects.value = Math.min(maskRects.length, 10);
            }
        }
    }["ShaderTheme.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        ref: meshRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    2,
                    2
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/BackgroundHost.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                ref: materialRef,
                args: [
                    shaderArgs
                ],
                depthWrite: false
            }, void 0, false, {
                fileName: "[project]/components/background/BackgroundHost.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_s(ShaderTheme, "s7NabANajIFAY9XxpLZA0DwJZOE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = ShaderTheme;
function ActiveTheme() {
    _s1();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ActiveTheme.useBackgroundStore[theme]": (s)=>s.theme
    }["ActiveTheme.useBackgroundStore[theme]"]);
    if (theme === 'abyss-ocean') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$abyss$2d$ocean$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AbyssOcean3D"], {}, void 0, false, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 138,
        columnNumber: 39
    }, this);
    if (theme === 'holographic-terrain') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$holographic$2d$terrain$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HolographicTerrain3D"], {}, void 0, false, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 139,
        columnNumber: 47
    }, this);
    if (theme === 'synthwave-grid') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$synthwave$2d$grid$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SynthwaveGrid3D"], {}, void 0, false, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 140,
        columnNumber: 42
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$liquid$2d$prism$2d$3d$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LiquidPrism3D"], {}, void 0, false, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 141,
        columnNumber: 10
    }, this); // default liquid-prism
}
_s1(ActiveTheme, "jD7tHDsjGpz/0BnjaN3+c39rUiM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
_c1 = ActiveTheme;
function BackgroundHost() {
    _s2();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const actualQuality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "BackgroundHost.useBackgroundStore[actualQuality]": (s)=>s.actualQuality
    }["BackgroundHost.useBackgroundStore[actualQuality]"]);
    const setPointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "BackgroundHost.useBackgroundStore[setPointer]": (s)=>s.setPointer
    }["BackgroundHost.useBackgroundStore[setPointer]"]);
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "BackgroundHost.useBackgroundStore[theme]": (s)=>s.theme
    }["BackgroundHost.useBackgroundStore[theme]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$useAdaptiveQuality$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdaptiveQuality"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundHost.useEffect": ()=>setMounted(true)
    }["BackgroundHost.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundHost.useEffect": ()=>{
            const handlePointerMove = {
                "BackgroundHost.useEffect.handlePointerMove": (e)=>setPointer(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
            }["BackgroundHost.useEffect.handlePointerMove"];
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            if (!isTouch) window.addEventListener('pointermove', handlePointerMove);
            return ({
                "BackgroundHost.useEffect": ()=>window.removeEventListener('pointermove', handlePointerMove)
            })["BackgroundHost.useEffect"];
        }
    }["BackgroundHost.useEffect"], [
        setPointer
    ]);
    if (!mounted || actualQuality === 'off') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$CssFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CssFallback"], {}, void 0, false, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 161,
        columnNumber: 51
    }, this);
    if (theme === 'neural-background') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$themes$2f$neural$2d$background$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NeuralBackground"], {}, void 0, false, {
            fileName: "[project]/components/background/BackgroundHost.tsx",
            lineNumber: 164,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-0 overflow-hidden dark:bg-[#03040F] bg-gray-50 pointer-events-none",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
            camera: {
                position: [
                    0,
                    0,
                    5
                ],
                fov: 75
            },
            dpr: actualQuality === 'high' ? [
                1,
                1.5
            ] : actualQuality === 'medium' ? 1 : 0.75,
            gl: {
                powerPreference: "high-performance",
                antialias: false,
                stencil: false,
                depth: false
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FrameloopManager, {}, void 0, false, {
                    fileName: "[project]/components/background/BackgroundHost.tsx",
                    lineNumber: 174,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveTheme, {}, void 0, false, {
                    fileName: "[project]/components/background/BackgroundHost.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/background/BackgroundHost.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/background/BackgroundHost.tsx",
        lineNumber: 168,
        columnNumber: 5
    }, this);
}
_s2(BackgroundHost, "PFHdHgUT4svvBd+AAPCV/CcSi10=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$useAdaptiveQuality$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdaptiveQuality"]
    ];
});
_c2 = BackgroundHost;
function FrameloopManager() {
    _s3();
    const invalidate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "FrameloopManager.useThree[invalidate]": (s)=>s.invalidate
    }["FrameloopManager.useThree[invalidate]"]);
    const setFrameloop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"])({
        "FrameloopManager.useThree[setFrameloop]": (s)=>s.setFrameloop
    }["FrameloopManager.useThree[setFrameloop]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FrameloopManager.useEffect": ()=>{
            setFrameloop('always');
            const handleVisibility = {
                "FrameloopManager.useEffect.handleVisibility": ()=>{
                    if (document.hidden) setFrameloop('demand');
                    else {
                        setFrameloop('always');
                        invalidate();
                    }
                }
            }["FrameloopManager.useEffect.handleVisibility"];
            document.addEventListener('visibilitychange', handleVisibility);
            return ({
                "FrameloopManager.useEffect": ()=>document.removeEventListener('visibilitychange', handleVisibility)
            })["FrameloopManager.useEffect"];
        }
    }["FrameloopManager.useEffect"], [
        setFrameloop,
        invalidate
    ]);
    return null;
}
_s3(FrameloopManager, "qY4z8PeUGKHeF3RuMR2X2na+rkI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useThree$3e$__["useThree"]
    ];
});
_c3 = FrameloopManager;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ShaderTheme");
__turbopack_context__.k.register(_c1, "ActiveTheme");
__turbopack_context__.k.register(_c2, "BackgroundHost");
__turbopack_context__.k.register(_c3, "FrameloopManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/BackgroundProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundProvider",
    ()=>BackgroundProvider,
    "useBackground",
    ()=>useBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$BackgroundHost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/BackgroundHost.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$ReadabilityScrim$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/ReadabilityScrim.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$useAudioReactive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/useAudioReactive.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$debug$2f$ReadabilityOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/background/debug/ReadabilityOverlay.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function BackgroundProvider() {
    _s();
    const [debug, setDebug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { colorPalette } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundProvider.useEffect": ()=>{
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.search.includes('debug=readability')) {
                setDebug(true);
            }
        }
    }["BackgroundProvider.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackgroundProvider.useEffect": ()=>{
            // Sync body background to the active color palette so the full window respects the theme
            const activeColors = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"][colorPalette] || __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"].cobalt;
            document.body.style.backgroundColor = activeColors.base;
        }
    }["BackgroundProvider.useEffect"], [
        colorPalette
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$BackgroundHost$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackgroundHost"], {}, void 0, false, {
                fileName: "[project]/components/background/BackgroundProvider.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$ReadabilityScrim$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReadabilityScrim"], {}, void 0, false, {
                fileName: "[project]/components/background/BackgroundProvider.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            debug && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$debug$2f$ReadabilityOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReadabilityOverlay"], {}, void 0, false, {
                fileName: "[project]/components/background/BackgroundProvider.tsx",
                lineNumber: 31,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/BackgroundProvider.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(BackgroundProvider, "i1grKz51sF6ZlPZgy0+XSGTXL7k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
_c = BackgroundProvider;
function useBackground() {
    _s1();
    const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])();
    const audio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$useAudioReactive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioReactive"])();
    return {
        ...store,
        startListening: audio.startListening,
        stopListening: audio.stopListening
    };
}
_s1(useBackground, "dNCD5zulYQitJVYjHeVYaaxqXok=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$background$2f$useAudioReactive$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAudioReactive"]
    ];
});
var _c;
__turbopack_context__.k.register(_c, "BackgroundProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/CssFallback.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CssFallback",
    ()=>CssFallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function CssFallback() {
    _s();
    const intensity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "CssFallback.useBackgroundStore[intensity]": (s)=>s.intensity
    }["CssFallback.useBackgroundStore[intensity]"]);
    if (intensity === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-[#03040F] z-[-1]"
    }, void 0, false, {
        fileName: "[project]/components/background/CssFallback.tsx",
        lineNumber: 6,
        columnNumber: 31
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[-1] overflow-hidden bg-[#03040F] transition-opacity duration-1000",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[-20%] left-[10%] w-[80%] h-[70%] rounded-[100%] blur-[120px] animate-pulse-slow",
                style: {
                    background: `radial-gradient(circle, ${__TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].colors.glow1}40 0%, transparent 70%)`
                }
            }, void 0, false, {
                fileName: "[project]/components/background/CssFallback.tsx",
                lineNumber: 10,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-[100%] blur-[120px] animate-pulse-slow-delay",
                style: {
                    background: `radial-gradient(circle, ${__TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].colors.highlight}20 0%, transparent 70%)`
                }
            }, void 0, false, {
                fileName: "[project]/components/background/CssFallback.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/CssFallback.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(CssFallback, "HALTlqAkKceI18CXAx0PuNrFiTA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
_c = CssFallback;
var _c;
__turbopack_context__.k.register(_c, "CssFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/ReadabilityScrim.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReadabilityScrim",
    ()=>ReadabilityScrim
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
function ReadabilityScrim() {
    _s();
    const { theme, extraReadable } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])();
    if (theme === 'solid-calm' && !extraReadable) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 scrim-overlay",
        style: {
            opacity: extraReadable ? 1 : 0.6
        },
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/components/background/ReadabilityScrim.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, this);
}
_s(ReadabilityScrim, "3UZmqd5o6z8J7CUF4+NLPRqawPA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
_c = ReadabilityScrim;
var _c;
__turbopack_context__.k.register(_c, "ReadabilityScrim");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/debug/ReadabilityOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReadabilityOverlay",
    ()=>ReadabilityOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function ReadabilityOverlay() {
    _s();
    const maskRects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "ReadabilityOverlay.useBackgroundStore[maskRects]": (s)=>s.maskRects
    }["ReadabilityOverlay.useBackgroundStore[maskRects]"]);
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReadabilityOverlay.useEffect": ()=>{
            // Basic interval check 
            const interval = setInterval({
                "ReadabilityOverlay.useEffect.interval": ()=>{
                    // In a real app we would read WebGL pixels here using readPixels.
                    // But since that requires modifying the rendering loop, we will just simulate the debug UI.
                    setData(maskRects.map({
                        "ReadabilityOverlay.useEffect.interval": (r, i)=>`Rect ${i}: ${r.width.toFixed(0)}x${r.height.toFixed(0)} at (${r.left.toFixed(0)},${r.top.toFixed(0)})`
                    }["ReadabilityOverlay.useEffect.interval"]));
                }
            }["ReadabilityOverlay.useEffect.interval"], 1000);
            return ({
                "ReadabilityOverlay.useEffect": ()=>clearInterval(interval)
            })["ReadabilityOverlay.useEffect"];
        }
    }["ReadabilityOverlay.useEffect"], [
        maskRects
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 pointer-events-none z-[9999]",
        children: [
            maskRects.map((rect, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute border border-red-500 bg-red-500/10",
                    style: {
                        left: rect.left,
                        top: rect.top,
                        width: rect.width,
                        height: rect.height
                    }
                }, i, false, {
                    fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4 bg-black/80 text-green-400 p-4 font-mono text-xs rounded border border-green-500/30 backdrop-blur",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-white mb-2",
                        children: "READABILITY DEBUG"
                    }, void 0, false, {
                        fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "Mask Regions Active: ",
                            maskRects.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Luminance Budget (Inside): ≤ 0.18"
                    }, void 0, false, {
                        fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 space-y-1 text-red-300",
                        children: data.map((str, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: str
                            }, i, false, {
                                fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                                lineNumber: 33,
                                columnNumber: 33
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/debug/ReadabilityOverlay.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_s(ReadabilityOverlay, "f66bFWCoHNAoY7iKSaxJaePyeAE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
_c = ReadabilityOverlay;
var _c;
__turbopack_context__.k.register(_c, "ReadabilityOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/themes/abyss-ocean-3d.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbyssOcean3D",
    ()=>AbyssOcean3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Points$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Points.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PointMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/PointMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
function AbyssOcean3D() {
    _s();
    const pointsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const colorPalette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "AbyssOcean3D.useBackgroundStore[colorPalette]": (s)=>s.colorPalette
    }["AbyssOcean3D.useBackgroundStore[colorPalette]"]);
    const activeColors = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"][colorPalette] || __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"].cobalt;
    // Generate random particles for the ocean depths
    const particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AbyssOcean3D.useMemo[particles]": ()=>{
            const p = new Float32Array(3000);
            for(let i = 0; i < 3000; i++){
                p[i * 3] = (Math.random() - 0.5) * 20; // x
                p[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
                p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
            }
            return p;
        }
    }["AbyssOcean3D.useMemo[particles]"], []);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "AbyssOcean3D.useBackgroundStore[mode]": (s)=>s.mode
    }["AbyssOcean3D.useBackgroundStore[mode]"]);
    const timeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "AbyssOcean3D.useFrame": (state, delta)=>{
            let speed = 1;
            if (mode === 'thinking') speed = 6;
            else if (mode === 'responding') speed = 3;
            else if (mode === 'speaking') speed = 2;
            timeRef.current += delta * speed;
            if (pointsRef.current) {
                pointsRef.current.rotation.y = timeRef.current * 0.05;
                pointsRef.current.position.y = Math.sin(timeRef.current * 0.2) * 1;
            }
        }
    }["AbyssOcean3D.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#02050A"
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    "#02050A",
                    2,
                    15
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.2
            }, void 0, false, {
                fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    5,
                    -5
                ],
                color: activeColors.cyan,
                intensity: 2,
                distance: 20
            }, void 0, false, {
                fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    -5,
                    -5,
                    -5
                ],
                color: activeColors.glow1,
                intensity: 1.5,
                distance: 20
            }, void 0, false, {
                fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Points$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"], {
                ref: pointsRef,
                positions: particles,
                stride: 3,
                frustumCulled: false,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PointMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointMaterial"], {
                    transparent: true,
                    color: activeColors.cyan,
                    size: 0.05,
                    sizeAttenuation: true,
                    depthWrite: false,
                    blending: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdditiveBlending"]
                }, void 0, false, {
                    fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/themes/abyss-ocean-3d.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(AbyssOcean3D, "ItA4ITFu7daR6iCteEmpK33vfvg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = AbyssOcean3D;
var _c;
__turbopack_context__.k.register(_c, "AbyssOcean3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/themes/holographic-terrain-3d.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HolographicTerrain3D",
    ()=>HolographicTerrain3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
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
function HolographicTerrain3D() {
    _s();
    const materialRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const colorPalette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "HolographicTerrain3D.useBackgroundStore[colorPalette]": (s)=>s.colorPalette
    }["HolographicTerrain3D.useBackgroundStore[colorPalette]"]);
    const activeColors = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"][colorPalette] || __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"].cobalt;
    const uniforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HolographicTerrain3D.useMemo[uniforms]": ()=>({
                uTime: {
                    value: 0
                },
                uColorBase: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.base)
                },
                uColorHighlight: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.cyan)
                }
            })
    }["HolographicTerrain3D.useMemo[uniforms]"], [
        activeColors
    ]);
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "HolographicTerrain3D.useBackgroundStore[mode]": (s)=>s.mode
    }["HolographicTerrain3D.useBackgroundStore[mode]"]);
    const timeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "HolographicTerrain3D.useFrame": (state, delta)=>{
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
        }
    }["HolographicTerrain3D.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    activeColors.base
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/themes/holographic-terrain-3d.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                position: [
                    0,
                    -2,
                    -5
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            20,
                            20,
                            128,
                            128
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/background/themes/holographic-terrain-3d.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                        ref: materialRef,
                        vertexShader: terrainVertexShader,
                        fragmentShader: terrainFragmentShader,
                        uniforms: uniforms,
                        wireframe: true,
                        transparent: true
                    }, void 0, false, {
                        fileName: "[project]/components/background/themes/holographic-terrain-3d.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/background/themes/holographic-terrain-3d.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/themes/holographic-terrain-3d.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(HolographicTerrain3D, "N1qSRnBjcPvCw8/f73JMOEPDdCQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = HolographicTerrain3D;
var _c;
__turbopack_context__.k.register(_c, "HolographicTerrain3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/themes/liquid-prism-3d.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LiquidPrism3D",
    ()=>LiquidPrism3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/MeshTransmissionMaterial.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Float.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
function LiquidPrism3D() {
    _s();
    const colorPalette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "LiquidPrism3D.useBackgroundStore[colorPalette]": (s)=>s.colorPalette
    }["LiquidPrism3D.useBackgroundStore[colorPalette]"]);
    const activeColors = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"][colorPalette] || __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"].cobalt;
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "LiquidPrism3D.useBackgroundStore[mode]": (s)=>s.mode
    }["LiquidPrism3D.useBackgroundStore[mode]"]);
    let speedMult = 1;
    if (mode === 'thinking') speedMult = 5;
    else if (mode === 'responding') speedMult = 2;
    else if (mode === 'speaking') speedMult = 1.5;
    const bg = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.base);
    const tint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](activeColors.cyan);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    bg.r,
                    bg.g,
                    bg.b
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.5
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    10,
                    10,
                    10
                ],
                intensity: 1,
                color: tint
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -10,
                    -10,
                    -10
                ],
                intensity: 0.5,
                color: activeColors.glow1
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float"], {
                speed: 2 * speedMult,
                rotationIntensity: 1,
                floatIntensity: 2,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        0,
                        -2
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("torusKnotGeometry", {
                            args: [
                                1.5,
                                0.4,
                                128,
                                32
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshTransmissionMaterial"], {
                            backside: true,
                            samples: 4,
                            thickness: 2,
                            chromaticAberration: 1,
                            anisotropy: 0.3,
                            distortion: 0.5,
                            distortionScale: 0.5,
                            temporalDistortion: 0.2,
                            iridescence: 1,
                            iridescenceIOR: 1.5,
                            iridescenceThicknessRange: [
                                100,
                                400
                            ],
                            color: activeColors.glow2
                        }, void 0, false, {
                            fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float"], {
                speed: 1.5 * speedMult,
                rotationIntensity: 1.5,
                floatIntensity: 3,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        -3,
                        1,
                        -5
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                            args: [
                                1.2,
                                64,
                                64
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshTransmissionMaterial"], {
                            backside: true,
                            samples: 4,
                            thickness: 3,
                            chromaticAberration: 0.5,
                            color: activeColors.cyan
                        }, void 0, false, {
                            fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float"], {
                speed: 2.5 * speedMult,
                rotationIntensity: 0.5,
                floatIntensity: 1,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        3,
                        -2,
                        -3
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("octahedronGeometry", {
                            args: [
                                1.5,
                                2
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshTransmissionMaterial"], {
                            backside: true,
                            samples: 4,
                            thickness: 1,
                            chromaticAberration: 1.5,
                            color: activeColors.glow1
                        }, void 0, false, {
                            fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/themes/liquid-prism-3d.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(LiquidPrism3D, "ycdaLO9apVpcO0EcN9ejJXUFAoc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
_c = LiquidPrism3D;
var _c;
__turbopack_context__.k.register(_c, "LiquidPrism3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/themes/neural-background.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NeuralBackground",
    ()=>NeuralBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
/**
 * Living AI Neural Core background.
 * Canvas 2D: deforming neural filaments around a pulsing core, expanding energy
 * waves, particles travelling curved orbital/flow paths in two depth layers.
 * CSS: drifting aurora light fields + readability overlays.
 */ const PALETTE = [
    [
        57,
        120,
        255
    ],
    [
        57,
        217,
        255
    ],
    [
        129,
        87,
        255
    ],
    [
        183,
        161,
        255
    ]
];
const rgba = (c, a)=>`rgba(${c[0]},${c[1]},${c[2]},${a})`;
function NeuralBackground() {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NeuralBackground.useEffect": ()=>{
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx) return;
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const mobile = window.innerWidth < 768;
            const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4 || mobile;
            const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1 : 1.5);
            let w = 0, h = 0, cx = 0, cy = 0, R = 0;
            const resize = {
                "NeuralBackground.useEffect.resize": ()=>{
                    w = window.innerWidth;
                    h = window.innerHeight;
                    canvas.width = Math.floor(w * dpr);
                    canvas.height = Math.floor(h * dpr);
                    canvas.style.width = `${w}px`;
                    canvas.style.height = `${h}px`;
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    cx = w / 2;
                    cy = h * 0.48;
                    R = Math.min(w, h) * (mobile ? 0.42 : 0.36);
                }
            }["NeuralBackground.useEffect.resize"];
            resize();
            // --- Neural filaments: closed deforming loops + radial tendrils ---
            const loops = Array.from({
                length: lowPower ? 5 : 8
            }, {
                "NeuralBackground.useEffect.loops": (_, i)=>({
                        r: 0.45 + i * 0.09,
                        seed: Math.random() * 100,
                        speed: 0.5 + Math.random() * 0.6,
                        col: PALETTE[i % 4],
                        tilt: 0.55 + Math.random() * 0.25,
                        rot: Math.random() * Math.PI
                    })
            }["NeuralBackground.useEffect.loops"]);
            const tendrils = Array.from({
                length: lowPower ? 10 : 18
            }, {
                "NeuralBackground.useEffect.tendrils": (_, i)=>({
                        a: i / (lowPower ? 10 : 18) * Math.PI * 2 + Math.random() * 0.3,
                        len: 1.1 + Math.random() * 0.9,
                        seed: Math.random() * 100,
                        col: PALETTE[i * 3 % 4]
                    })
            }["NeuralBackground.useEffect.tendrils"]);
            // --- Particles travelling orbital/spiral paths (2 depth layers) ---
            const makeP = {
                "NeuralBackground.useEffect.makeP": (front)=>({
                        ang: Math.random() * Math.PI * 2,
                        rad: 0.3 + Math.random() * 1.6,
                        w: (front ? 0.25 : 0.1) * (Math.random() < 0.5 ? 1 : 0.7) * (0.6 + Math.random()),
                        drift: (Math.random() - 0.5) * 0.08,
                        tilt: 0.5 + Math.random() * 0.3,
                        size: front ? 1.2 + Math.random() * 1.6 : 0.5 + Math.random() * 0.8,
                        alpha: front ? 0.75 : 0.35,
                        col: PALETTE[Math.floor(Math.random() * 4)],
                        seed: Math.random() * 10,
                        front
                    })
            }["NeuralBackground.useEffect.makeP"];
            const particles = [
                ...Array.from({
                    length: lowPower ? 35 : 70
                }, {
                    "NeuralBackground.useEffect": ()=>makeP(false)
                }["NeuralBackground.useEffect"]),
                ...Array.from({
                    length: lowPower ? 18 : 36
                }, {
                    "NeuralBackground.useEffect": ()=>makeP(true)
                }["NeuralBackground.useEffect"])
            ];
            // --- Energy waves ---
            const waves = [];
            let waveTimer = 0;
            let t = 0;
            let last = performance.now();
            let raf = 0;
            let running = true;
            const draw = {
                "NeuralBackground.useEffect.draw": (now)=>{
                    const mode = __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"].getState().mode;
                    let speedMult = 1;
                    let pulseBoost = 0;
                    if (mode === 'thinking') {
                        speedMult = 5.0;
                        pulseBoost = 0.4;
                    } else if (mode === 'responding') {
                        speedMult = 2.0;
                        pulseBoost = 0.2;
                    } else if (mode === 'speaking') {
                        speedMult = 1.5;
                        pulseBoost = 0.3;
                    }
                    const dt = Math.min(now - last, 50) / 1000 * speedMult;
                    last = now;
                    t += dt;
                    ctx.clearRect(0, 0, w, h);
                    // Pulsing core field
                    const pulse = 0.5 + 0.5 * Math.sin(t * 1.3) * Math.sin(t * 0.47 + 1) + pulseBoost;
                    const coreR = R * (0.9 + pulse * 0.25);
                    let g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 1.6);
                    g.addColorStop(0, rgba(PALETTE[1], 0.22 + pulse * 0.12));
                    g.addColorStop(0.25, rgba(PALETTE[0], 0.16 + pulse * 0.08));
                    g.addColorStop(0.6, rgba(PALETTE[2], 0.07));
                    g.addColorStop(1, "rgba(5,7,17,0)");
                    ctx.fillStyle = g;
                    ctx.fillRect(0, 0, w, h);
                    ctx.globalCompositeOperation = "lighter";
                    // Energy waves expanding from core
                    waveTimer -= dt;
                    if (waveTimer <= 0) {
                        waves.push({
                            r: R * 0.2,
                            col: PALETTE[Math.floor(Math.random() * 3)]
                        });
                        waveTimer = 2.6 + Math.random() * 1.8;
                    }
                    for(let i = waves.length - 1; i >= 0; i--){
                        const wv = waves[i];
                        wv.r += dt * R * 0.32;
                        const life = 1 - (wv.r - R * 0.2) / (R * 2.2);
                        if (life <= 0) {
                            waves.splice(i, 1);
                            continue;
                        }
                        ctx.beginPath();
                        ctx.ellipse(cx, cy, wv.r, wv.r * 0.62, 0, 0, Math.PI * 2);
                        ctx.strokeStyle = rgba(wv.col, 0.28 * life * life);
                        ctx.lineWidth = 2 + 10 * (1 - life);
                        ctx.stroke();
                    }
                    // Deforming neural loops
                    const segs = lowPower ? 60 : 110;
                    for (const L of loops){
                        const rot = L.rot + t * 0.08 * L.speed;
                        ctx.beginPath();
                        for(let s = 0; s <= segs; s++){
                            const a = s / segs * Math.PI * 2;
                            const n = Math.sin(a * 3 + t * L.speed + L.seed) * 0.09 + Math.sin(a * 5 - t * 0.7 * L.speed + L.seed * 2) * 0.05 + Math.sin(a * 2 + t * 0.4) * 0.06;
                            const rr = R * (L.r + n) * (1 + pulse * 0.04);
                            const x = Math.cos(a) * rr;
                            const y = Math.sin(a) * rr * L.tilt;
                            const px = cx + x * Math.cos(rot) - y * Math.sin(rot);
                            const py = cy + x * Math.sin(rot) + y * Math.cos(rot);
                            s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                        }
                        ctx.strokeStyle = rgba(L.col, 0.08);
                        ctx.lineWidth = 6;
                        ctx.stroke();
                        ctx.strokeStyle = rgba(L.col, 0.32);
                        ctx.lineWidth = 1.1;
                        ctx.stroke();
                    }
                    // Radial tendrils that bend and flow outward
                    for (const T of tendrils){
                        const a0 = T.a + Math.sin(t * 0.3 + T.seed) * 0.25 + t * 0.03;
                        ctx.beginPath();
                        const steps = 22;
                        let px = 0, py = 0;
                        for(let s = 0; s <= steps; s++){
                            const k = s / steps;
                            const bend = Math.sin(k * 4 + t * 1.1 + T.seed) * 0.35 * k;
                            const a = a0 + bend;
                            const rr = R * (0.2 + k * T.len);
                            px = cx + Math.cos(a) * rr;
                            py = cy + Math.sin(a) * rr * 0.68;
                            s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
                        }
                        const lg = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * (0.2 + T.len));
                        lg.addColorStop(0, rgba(T.col, 0.45));
                        lg.addColorStop(1, rgba(T.col, 0));
                        ctx.strokeStyle = lg;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        // signal travelling along tendril
                        const k = (t * 0.25 + T.seed) % 1;
                        const bend = Math.sin(k * 4 + t * 1.1 + T.seed) * 0.35 * k;
                        const rr = R * (0.2 + k * T.len);
                        const sx = cx + Math.cos(a0 + bend) * rr;
                        const sy = cy + Math.sin(a0 + bend) * rr * 0.68;
                        ctx.fillStyle = rgba(PALETTE[1], 0.8 * (1 - k));
                        ctx.beginPath();
                        ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    // Orbiting particles with short trails
                    for (const p of particles){
                        p.ang += p.w * dt;
                        p.rad += Math.sin(t * 0.5 + p.seed) * p.drift * dt;
                        const wob = Math.sin(t * 0.9 + p.seed) * 0.08;
                        const rr = R * (p.rad + wob);
                        const x = cx + Math.cos(p.ang) * rr * 1.25;
                        const y = cy + Math.sin(p.ang) * rr * p.tilt;
                        const tx = cx + Math.cos(p.ang - 0.12) * rr * 1.25;
                        const ty = cy + Math.sin(p.ang - 0.12) * rr * p.tilt;
                        const tw = 0.6 + 0.4 * Math.sin(t * 2 + p.seed * 5);
                        if (p.front) {
                            ctx.strokeStyle = rgba(p.col, 0.25 * tw);
                            ctx.lineWidth = p.size * 0.8;
                            ctx.beginPath();
                            ctx.moveTo(tx, ty);
                            ctx.lineTo(x, y);
                            ctx.stroke();
                            ctx.fillStyle = rgba(p.col, 0.15 * tw);
                            ctx.beginPath();
                            ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
                            ctx.fill();
                        }
                        ctx.fillStyle = rgba(p.col, p.alpha * tw);
                        ctx.beginPath();
                        ctx.arc(x, y, p.size, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    // Bright core
                    ctx.globalCompositeOperation = "lighter";
                    g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.28);
                    g.addColorStop(0, rgba([
                        220,
                        240,
                        255
                    ], 0.35 + pulse * 0.2));
                    g.addColorStop(0.4, rgba(PALETTE[1], 0.18));
                    g.addColorStop(1, rgba(PALETTE[0], 0));
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(cx, cy, R * 0.28, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over";
                    if (running && !reduced) raf = requestAnimationFrame(draw);
                }
            }["NeuralBackground.useEffect.draw"];
            raf = requestAnimationFrame(draw);
            const onVis = {
                "NeuralBackground.useEffect.onVis": ()=>{
                    running = !document.hidden;
                    cancelAnimationFrame(raf);
                    if (running && !reduced) {
                        last = performance.now();
                        raf = requestAnimationFrame(draw);
                    }
                }
            }["NeuralBackground.useEffect.onVis"];
            let rt = 0;
            const onResize = {
                "NeuralBackground.useEffect.onResize": ()=>{
                    clearTimeout(rt);
                    rt = window.setTimeout({
                        "NeuralBackground.useEffect.onResize": ()=>{
                            resize();
                            if (reduced) requestAnimationFrame(draw);
                        }
                    }["NeuralBackground.useEffect.onResize"], 120);
                }
            }["NeuralBackground.useEffect.onResize"];
            document.addEventListener("visibilitychange", onVis);
            window.addEventListener("resize", onResize);
            return ({
                "NeuralBackground.useEffect": ()=>{
                    cancelAnimationFrame(raf);
                    clearTimeout(rt);
                    document.removeEventListener("visibilitychange", onVis);
                    window.removeEventListener("resize", onResize);
                }
            })["NeuralBackground.useEffect"];
        }
    }["NeuralBackground.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": true,
        className: "neural-bg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aurora aurora-1"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aurora aurora-2"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aurora aurora-3"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 267,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "aurora aurora-4"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 268,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "neural-canvas"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "neural-readability"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "neural-vignette"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 271,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "neural-grain"
            }, void 0, false, {
                fileName: "[project]/components/background/themes/neural-background.tsx",
                lineNumber: 272,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/themes/neural-background.tsx",
        lineNumber: 264,
        columnNumber: 5
    }, this);
}
_s(NeuralBackground, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = NeuralBackground;
var _c;
__turbopack_context__.k.register(_c, "NeuralBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/themes/synthwave-grid-3d.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SynthwaveGrid3D",
    ()=>SynthwaveGrid3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-9ce18a08.esm.js [app-client] (ecmascript) <export F as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
function SynthwaveGrid3D() {
    _s();
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const colorPalette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "SynthwaveGrid3D.useBackgroundStore[colorPalette]": (s)=>s.colorPalette
    }["SynthwaveGrid3D.useBackgroundStore[colorPalette]"]);
    const activeColors = __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"][colorPalette] || __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["colorPalettes"].cobalt;
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "SynthwaveGrid3D.useBackgroundStore[mode]": (s)=>s.mode
    }["SynthwaveGrid3D.useBackgroundStore[mode]"]);
    const timeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"])({
        "SynthwaveGrid3D.useFrame": (state, delta)=>{
            let speed = 2; // base speed
            if (mode === 'thinking') speed = 10;
            else if (mode === 'responding') speed = 4;
            else if (mode === 'speaking') speed = 3;
            timeRef.current += delta * speed;
            if (gridRef.current) {
                // Infinite scrolling effect using accumulated time
                gridRef.current.position.z = timeRef.current % 1;
            }
        }
    }["SynthwaveGrid3D.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    activeColors.base
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    activeColors.base,
                    5,
                    20
                ]
            }, void 0, false, {
                fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                position: [
                    0,
                    2,
                    -15
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circleGeometry", {
                        args: [
                            4,
                            64
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        color: activeColors.glow1
                    }, void 0, false, {
                        fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    -1,
                    0
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Grid"], {
                    ref: gridRef,
                    position: [
                        0,
                        0,
                        0
                    ],
                    args: [
                        40,
                        40
                    ],
                    cellSize: 1,
                    cellThickness: 1,
                    cellColor: activeColors.cyan,
                    sectionSize: 5,
                    sectionThickness: 1.5,
                    sectionColor: activeColors.glow2,
                    fadeDistance: 20,
                    fadeStrength: 1
                }, void 0, false, {
                    fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/background/themes/synthwave-grid-3d.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_s(SynthwaveGrid3D, "Zmu8aAfB28w5/OYP5gyEYwd+kZ0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$9ce18a08$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__F__as__useFrame$3e$__["useFrame"]
    ];
});
_c = SynthwaveGrid3D;
var _c;
__turbopack_context__.k.register(_c, "SynthwaveGrid3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/useAdaptiveQuality.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAdaptiveQuality",
    ()=>useAdaptiveQuality
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/background.config.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useAdaptiveQuality() {
    _s();
    const quality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "useAdaptiveQuality.useBackgroundStore[quality]": (s)=>s.quality
    }["useAdaptiveQuality.useBackgroundStore[quality]"]);
    const setActualQuality = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "useAdaptiveQuality.useBackgroundStore[setActualQuality]": (s)=>s.setActualQuality
    }["useAdaptiveQuality.useBackgroundStore[setActualQuality]"]);
    const badFrames = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const lastTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(performance.now());
    const rafId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAdaptiveQuality.useEffect": ()=>{
            if (quality !== 'auto') {
                setActualQuality(quality);
                return;
            }
            // Initial heuristic
            let initialQuality = 'high';
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) initialQuality = 'medium';
            if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
                initialQuality = 'low';
            }
            setActualQuality(initialQuality);
            const monitor = {
                "useAdaptiveQuality.useEffect.monitor": ()=>{
                    const now = performance.now();
                    const delta = now - lastTime.current;
                    lastTime.current = now;
                    if (delta > __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].qualityThresholds.badFrameMs) {
                        badFrames.current++;
                        if (badFrames.current > __TURBOPACK__imported__module__$5b$project$5d2f$background$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bgConfig"].qualityThresholds.fpsDropDuration) {
                            const current = __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"].getState().actualQuality;
                            if (current === 'high') {
                                setActualQuality('medium');
                                badFrames.current = 0;
                            } else if (current === 'medium') {
                                setActualQuality('low');
                                badFrames.current = 0;
                            }
                        }
                    } else {
                        badFrames.current = Math.max(0, badFrames.current - 0.1);
                    }
                    rafId.current = requestAnimationFrame(monitor);
                }
            }["useAdaptiveQuality.useEffect.monitor"];
            rafId.current = requestAnimationFrame(monitor);
            return ({
                "useAdaptiveQuality.useEffect": ()=>cancelAnimationFrame(rafId.current)
            })["useAdaptiveQuality.useEffect"];
        }
    }["useAdaptiveQuality.useEffect"], [
        quality,
        setActualQuality
    ]);
}
_s(useAdaptiveQuality, "0VWbxR2CGU6x+/57w4bynXOAL9A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/background/useAudioReactive.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAudioReactive",
    ()=>useAudioReactive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/background.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useAudioReactive() {
    _s();
    const setAudioLevel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"])({
        "useAudioReactive.useBackgroundStore[setAudioLevel]": (s)=>s.setAudioLevel
    }["useAudioReactive.useBackgroundStore[setAudioLevel]"]);
    const audioCtx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAudioReactive.useEffect": ()=>{
            return ({
                "useAudioReactive.useEffect": ()=>{
                    cancelAnimationFrame(rafId.current);
                    if (audioCtx.current && audioCtx.current.state !== 'closed') {
                        audioCtx.current.close().catch({
                            "useAudioReactive.useEffect": ()=>{}
                        }["useAudioReactive.useEffect"]);
                    }
                }
            })["useAudioReactive.useEffect"];
        }
    }["useAudioReactive.useEffect"], []);
    const startListening = async (stream)=>{
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        const source = audioCtx.current.createMediaStreamSource(stream);
        analyser.current = audioCtx.current.createAnalyser();
        analyser.current.fftSize = 256;
        source.connect(analyser.current);
        const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
        const update = ()=>{
            if (!analyser.current) return;
            analyser.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for(let i = 0; i < dataArray.length; i++){
                sum += dataArray[i];
            }
            const rms = Math.sqrt(sum / dataArray.length) / 255.0; // 0 to 1
            setAudioLevel(rms);
            rafId.current = requestAnimationFrame(update);
        };
        update();
    };
    const stopListening = ()=>{
        cancelAnimationFrame(rafId.current);
        setAudioLevel(0);
    };
    return {
        startListening,
        stopListening
    };
}
_s(useAudioReactive, "1muNWoC579wdh7pVHbRVaxTT/Y8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$background$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBackgroundStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Providers",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
"use client";
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/components/providers.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/store/background.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBackgroundStore",
    ()=>useBackgroundStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-client] (ecmascript)");
;
;
const useBackgroundStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        theme: 'neural-background',
        colorPalette: 'cobalt',
        mode: 'idle',
        quality: 'auto',
        actualQuality: 'high',
        intensity: 100,
        audioLevel: 0,
        pointer: {
            x: 0.5,
            y: 0.5
        },
        reducedMotion: ("TURBOPACK compile-time truthy", 1) ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : "TURBOPACK unreachable",
        extraReadable: false,
        pulseValue: 0,
        maskRects: [],
        setTheme: (theme)=>set({
                theme
            }),
        setColorPalette: (colorPalette)=>set({
                colorPalette
            }),
        setMode: (mode)=>set({
                mode
            }),
        setQuality: (quality)=>set({
                quality
            }),
        setActualQuality: (actualQuality)=>set({
                actualQuality
            }),
        setIntensity: (intensity)=>set({
                intensity
            }),
        setAudioLevel: (audioLevel)=>set({
                audioLevel
            }),
        setPointer: (x, y)=>set({
                pointer: {
                    x,
                    y
                }
            }),
        setReducedMotion: (reducedMotion)=>set({
                reducedMotion
            }),
        setExtraReadable: (extraReadable)=>set({
                extraReadable
            }),
        setMaskRects: (maskRects)=>set({
                maskRects
            }),
        pulse: (strength = 1)=>set((s)=>({
                    pulseValue: Math.min(s.pulseValue + strength, 2.0)
                })),
        decayPulse: (amount)=>set((s)=>({
                    pulseValue: Math.max(0, s.pulseValue - amount)
                }))
    }), {
    name: 'intellibot-bg-settings',
    partialize: (state)=>({
            theme: state.theme,
            colorPalette: state.colorPalette,
            intensity: state.intensity,
            reducedMotion: state.reducedMotion,
            extraReadable: state.extraReadable,
            quality: state.quality
        })
}));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0fy12me._.js.map