import { create } from 'zustand';

type BotState = 'idle' | 'typing' | 'thinking' | 'responding' | 'listening';

interface AppState {
  botState: BotState;
  setBotState: (state: BotState) => void;
  // Intensity controls: 0 (Off), 1 (Low), 2 (High)
  bgIntensity: 0 | 1 | 2;
  setBgIntensity: (intensity: 0 | 1 | 2) => void;
}

export const useAppState = create<AppState>((set) => ({
  botState: 'idle',
  setBotState: (botState) => set({ botState }),
  bgIntensity: 2,
  setBgIntensity: (bgIntensity) => set({ bgIntensity }),
}));
