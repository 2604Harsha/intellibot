export const colorPalettes = {
  cobalt: {
    id: "cobalt",
    name: "Cobalt Deep",
    base: "#03040F",
    base2: "#060A1F",
    glow1: "#1B2BFF",
    glow2: "#2547E8",
    cyan: "#1FA8FF",
    error: "#ff2a5f",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Glow",
    base: "#020A06",
    base2: "#05130A",
    glow1: "#00E572",
    glow2: "#00B259",
    cyan: "#33FF99",
    error: "#ff2a5f",
  },
  amethyst: {
    id: "amethyst",
    name: "Amethyst Void",
    base: "#080312",
    base2: "#100624",
    glow1: "#8C33FF",
    glow2: "#6614FF",
    cyan: "#D480FF",
    error: "#ff2a5f",
  },
  crimson: {
    id: "crimson",
    name: "Crimson Forge",
    base: "#120202",
    base2: "#1A0404",
    glow1: "#FF1F40",
    glow2: "#E60026",
    cyan: "#FF6680",
    error: "#ff2a5f",
  }
};

export const bgConfig = {
  defaultPalette: "cobalt",
  colors: colorPalettes.cobalt, // Default fallback
  themes: [
    { id: 'holographic-terrain', name: 'Holographic Terrain' },
    { id: 'abyss-ocean', name: 'Abyss Ocean' },
    { id: 'liquid-prism', name: 'Liquid Prism' },
    { id: 'neural-background', name: 'Neural Core (2D Canvas)' },
    { id: 'synthwave-grid', name: 'Synthwave Grid' },
  ],
  luminance: {
    maxOutsideMask: 0.25,
    maxInsideMask: 0.18, // 4.5:1 relative to white text
    maskDimFactor: 0.35,
  },
  motion: {
    idleSpeed: 0.02,
    thinkingSpeed: 0.05,
    respondingSpeed: 0.04,
    springDamping: 25,
    springStiffness: 100,
    transitionMs: 700,
  },
  qualityThresholds: {
    fpsDropDuration: 30,
    badFrameMs: 20, 
  }
};
