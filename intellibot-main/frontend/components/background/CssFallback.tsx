import { useBackgroundStore } from '../../store/background';
import { bgConfig } from '../../background.config';

export function CssFallback() {
  const intensity = useBackgroundStore(s => s.intensity);
  if (intensity === 0) return <div className="fixed inset-0 bg-[#03040F] z-[-1]" />;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#03040F] transition-opacity duration-1000">
      <div 
        className="absolute bottom-[-20%] left-[10%] w-[80%] h-[70%] rounded-[100%] blur-[120px] animate-pulse-slow"
        style={{ background: `radial-gradient(circle, ${bgConfig.colors.glow1}40 0%, transparent 70%)` }}
      />
      <div 
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-[100%] blur-[120px] animate-pulse-slow-delay"
        style={{ background: `radial-gradient(circle, ${bgConfig.colors.highlight}20 0%, transparent 70%)` }}
      />
    </div>
  );
}
