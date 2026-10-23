"use client";

import { useBackgroundStore } from '../../store/background';
import { colorPalettes } from '../../background.config';
import { BackgroundHost } from './BackgroundHost';
import { ReadabilityScrim } from './ReadabilityScrim';
import { useAudioReactive } from './useAudioReactive';
import { ReadabilityOverlay } from './debug/ReadabilityOverlay';
import { useEffect, useState } from 'react';

export function BackgroundProvider() {
  const [debug, setDebug] = useState(false);
  const { colorPalette } = useBackgroundStore();
  
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('debug=readability')) {
      setDebug(true);
    }
  }, []);

  useEffect(() => {
    // Sync body background to the active color palette so the full window respects the theme
    const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;
    document.body.style.backgroundColor = activeColors.base;
  }, [colorPalette]);

  return (
    <>
      <BackgroundHost />
      <ReadabilityScrim />
      {debug && <ReadabilityOverlay />}
    </>
  );
}

export function useBackground() {
  const store = useBackgroundStore();
  const audio = useAudioReactive();
  
  return {
    ...store,
    startListening: audio.startListening,
    stopListening: audio.stopListening,
  };
}
