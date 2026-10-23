import { useEffect, useRef } from 'react';
import { useBackgroundStore } from '../../store/background';

export function useAudioReactive() {
  const setAudioLevel = useBackgroundStore((s) => s.setAudioLevel);
  const audioCtx = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const rafId = useRef<number>(0);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      if (audioCtx.current && audioCtx.current.state !== 'closed') {
        audioCtx.current.close().catch(() => {});
      }
    };
  }, []);

  const startListening = async (stream: MediaStream) => {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const source = audioCtx.current.createMediaStreamSource(stream);
    analyser.current = audioCtx.current.createAnalyser();
    analyser.current.fftSize = 256;
    source.connect(analyser.current);

    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    
    const update = () => {
      if (!analyser.current) return;
      analyser.current.getByteFrequencyData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const rms = Math.sqrt(sum / dataArray.length) / 255.0; // 0 to 1
      setAudioLevel(rms);
      rafId.current = requestAnimationFrame(update);
    };
    update();
  };

  const stopListening = () => {
    cancelAnimationFrame(rafId.current);
    setAudioLevel(0);
  };

  return { startListening, stopListening };
}
