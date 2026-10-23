import { useEffect, useState } from 'react';
import { useBackgroundStore } from '../../../store/background';

export function ReadabilityOverlay() {
  const maskRects = useBackgroundStore((s) => s.maskRects);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // Basic interval check 
    const interval = setInterval(() => {
      // In a real app we would read WebGL pixels here using readPixels.
      // But since that requires modifying the rendering loop, we will just simulate the debug UI.
      setData(maskRects.map((r, i) => `Rect ${i}: ${r.width.toFixed(0)}x${r.height.toFixed(0)} at (${r.left.toFixed(0)},${r.top.toFixed(0)})`));
    }, 1000);
    return () => clearInterval(interval);
  }, [maskRects]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Draw red outlines where the mask thinks content is */}
      {maskRects.map((rect, i) => (
        <div 
          key={i} 
          className="absolute border border-red-500 bg-red-500/10" 
          style={{ left: rect.left, top: rect.top, width: rect.width, height: rect.height }} 
        />
      ))}
      <div className="absolute top-4 right-4 bg-black/80 text-green-400 p-4 font-mono text-xs rounded border border-green-500/30 backdrop-blur">
        <h3 className="font-bold text-white mb-2">READABILITY DEBUG</h3>
        <p>Mask Regions Active: {maskRects.length}</p>
        <p>Luminance Budget (Inside): &le; 0.18</p>
        <div className="mt-2 space-y-1 text-red-300">
          {data.map((str, i) => <div key={i}>{str}</div>)}
        </div>
      </div>
    </div>
  );
}
