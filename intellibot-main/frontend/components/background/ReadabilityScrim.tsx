import { useBackgroundStore } from '../../store/background';

export function ReadabilityScrim() {
  const { theme, extraReadable } = useBackgroundStore();
  
  if (theme === 'solid-calm' && !extraReadable) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 scrim-overlay"
      style={{ opacity: extraReadable ? 1 : 0.6 }}
      aria-hidden="true"
    />
  );
}
