import { useEffect, useRef } from 'react';
import { useBackgroundStore } from '../../store/background';

export function useContentMask(refs: React.RefObject<HTMLElement>[]) {
  const setMaskRects = useBackgroundStore((s) => s.setMaskRects);
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    let lastRectsStr = '';

    const updateRects = () => {
      const rects = refs.map(ref => ref.current?.getBoundingClientRect()).filter(Boolean) as DOMRect[];
      
      // Simple deep equality check by stringifying the essential properties
      const rectsData = rects.map(r => ({ x: r.x, y: r.y, width: r.width, height: r.height }));
      const currentRectsStr = JSON.stringify(rectsData);
      
      if (currentRectsStr !== lastRectsStr) {
        lastRectsStr = currentRectsStr;
        setMaskRects(rects);
      }
    };

    updateRects();
    window.addEventListener('resize', updateRects);
    window.addEventListener('scroll', updateRects, true); // true for capture phase

    resizeObserver.current = new ResizeObserver(updateRects);
    refs.forEach(ref => {
      if (ref.current) resizeObserver.current?.observe(ref.current);
    });

    return () => {
      window.removeEventListener('resize', updateRects);
      window.removeEventListener('scroll', updateRects, true);
      resizeObserver.current?.disconnect();
    };
  }, [refs, setMaskRects]);
}
