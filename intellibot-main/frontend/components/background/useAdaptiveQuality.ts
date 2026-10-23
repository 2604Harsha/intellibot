import { useEffect, useRef } from 'react';
import { useBackgroundStore } from '../../store/background';
import { bgConfig } from '../../background.config';

export function useAdaptiveQuality() {
  const quality = useBackgroundStore((s) => s.quality);
  const setActualQuality = useBackgroundStore((s) => s.setActualQuality);
  const badFrames = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (quality !== 'auto') {
      setActualQuality(quality);
      return;
    }

    // Initial heuristic
    let initialQuality: 'high' | 'medium' | 'low' = 'high';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) initialQuality = 'medium';
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      initialQuality = 'low';
    }
    setActualQuality(initialQuality);

    const monitor = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      lastTime.current = now;

      if (delta > bgConfig.qualityThresholds.badFrameMs) {
        badFrames.current++;
        if (badFrames.current > bgConfig.qualityThresholds.fpsDropDuration) {
          const current = useBackgroundStore.getState().actualQuality;
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
    };

    rafId.current = requestAnimationFrame(monitor);
    return () => cancelAnimationFrame(rafId.current);
  }, [quality, setActualQuality]);
}
