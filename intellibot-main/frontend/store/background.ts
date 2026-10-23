import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BgMode = 'idle' | 'focus' | 'typing' | 'thinking' | 'responding' | 'listening' | 'speaking' | 'error';
export type BgQuality = 'high' | 'medium' | 'low' | 'off';
export type BgTheme = 'holographic-terrain' | 'abyss-ocean' | 'liquid-prism' | 'neural-background' | 'synthwave-grid';

interface BgState {
  theme: BgTheme;
  colorPalette: string;
  mode: BgMode;
  quality: BgQuality | 'auto';
  actualQuality: BgQuality;
  intensity: number; // 0 to 100
  audioLevel: number;
  pointer: { x: number; y: number };
  reducedMotion: boolean;
  extraReadable: boolean;
  pulseValue: number;
  maskRects: DOMRect[]; // Passed from ContentMask.ts
  
  setTheme: (theme: BgTheme) => void;
  setColorPalette: (palette: string) => void;
  setMode: (mode: BgMode) => void;
  setQuality: (quality: BgQuality | 'auto') => void;
  setActualQuality: (quality: BgQuality) => void;
  setIntensity: (intensity: number) => void;
  setAudioLevel: (level: number) => void;
  setPointer: (x: number, y: number) => void;
  setReducedMotion: (reduced: boolean) => void;
  setExtraReadable: (extra: boolean) => void;
  setMaskRects: (rects: DOMRect[]) => void;
  pulse: (strength?: number) => void;
  decayPulse: (amount: number) => void;
}

export const useBackgroundStore = create<BgState>()(
  persist(
    (set) => ({
      theme: 'neural-background',
      colorPalette: 'cobalt',
      mode: 'idle',
      quality: 'auto',
      actualQuality: 'high',
      intensity: 100,
      audioLevel: 0,
      pointer: { x: 0.5, y: 0.5 },
      reducedMotion: typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
      extraReadable: false,
      pulseValue: 0,
      maskRects: [],

      setTheme: (theme) => set({ theme }),
      setColorPalette: (colorPalette) => set({ colorPalette }),
      setMode: (mode) => set({ mode }),
      setQuality: (quality) => set({ quality }),
      setActualQuality: (actualQuality) => set({ actualQuality }),
      setIntensity: (intensity) => set({ intensity }),
      setAudioLevel: (audioLevel) => set({ audioLevel }),
      setPointer: (x, y) => set({ pointer: { x, y } }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setExtraReadable: (extraReadable) => set({ extraReadable }),
      setMaskRects: (maskRects) => set({ maskRects }),
      pulse: (strength = 1) => set((s) => ({ pulseValue: Math.min(s.pulseValue + strength, 2.0) })),
      decayPulse: (amount) => set((s) => ({ pulseValue: Math.max(0, s.pulseValue - amount) })),
    }),
    {
      name: 'intellibot-bg-settings',
      partialize: (state) => ({ 
        theme: state.theme, 
        colorPalette: state.colorPalette,
        intensity: state.intensity, 
        reducedMotion: state.reducedMotion, 
        extraReadable: state.extraReadable, 
        quality: state.quality 
      }),
    }
  )
);
