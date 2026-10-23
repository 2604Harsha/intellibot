import { useBackgroundStore, BgTheme } from '../../store/background';
import { bgConfig, colorPalettes } from '../../background.config';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

function ThemeCard({ themeInfo }: { themeInfo: { id: string, name: string } }) {
  const { theme, setTheme } = useBackgroundStore();
  const isSelected = theme === themeInfo.id;
  
  // A tiny static preview representation for each theme
  const renderPreview = () => {
    switch(themeInfo.id) {
      case 'liquid-prism': return (
        <div className="absolute inset-0 overflow-hidden bg-black">
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500/40 rounded-full mix-blend-screen filter blur-xl animate-pulse" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-cyan-400/40 rounded-full mix-blend-screen filter blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      );
      case 'abyss-ocean': return (
        <div className="absolute inset-0 overflow-hidden bg-[#02050A]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-2 left-4 w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_5px_#00ffff] animate-bounce" />
        </div>
      );
      case 'holographic-terrain': return (
        <div className="absolute inset-0 bg-[#03040F] overflow-hidden flex items-center justify-center">
          <div className="w-[150%] h-[150%] border-[0.5px] border-cyan-500/30 rounded-[40%] animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-[120%] h-[120%] border-[0.5px] border-blue-500/30 rounded-[40%] animate-[spin_7s_linear_infinite_reverse]" />
        </div>
      );
      case 'synthwave-grid': return (
        <div className="absolute inset-0 bg-black overflow-hidden flex flex-col justify-end">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full blur-sm" />
          <div className="h-1/2 w-full bg-[linear-gradient(transparent_95%,rgba(34,211,238,0.5)_100%),linear-gradient(90deg,transparent_95%,rgba(34,211,238,0.5)_100%)] bg-[size:10px_10px] [transform:perspective(100px)_rotateX(60deg)] animate-[pulse_2s_ease-in-out_infinite]" />
        </div>
      );
      case 'neural-background': return (
        <div className="absolute inset-0 bg-[#03040F] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0,transparent_50%)] animate-pulse" />
          <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100">
            <line x1="20" y1="20" x2="80" y2="80" stroke="#3b82f6" strokeWidth="0.5" />
            <line x1="80" y1="20" x2="20" y2="80" stroke="#3b82f6" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="2" fill="#60a5fa" />
            <circle cx="80" cy="80" r="2" fill="#60a5fa" />
            <circle cx="80" cy="20" r="2" fill="#60a5fa" />
            <circle cx="20" cy="80" r="2" fill="#60a5fa" />
            <circle cx="50" cy="50" r="3" fill="#60a5fa" className="animate-ping" />
          </svg>
        </div>
      );
      default: return <div className="absolute inset-0 bg-[#03040F]" />;
    }
  };

  return (
    <button 
      onClick={() => setTheme(themeInfo.id as BgTheme)}
      className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 transition-all ${isSelected ? 'border-[#2547E8] ring-2 ring-[#2547E8]/50' : 'border-white/10 hover:border-white/30'}`}
    >
      <div className="absolute inset-0 bg-[#03040F]">
        {renderPreview()}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-2 left-3 font-medium text-xs text-white">
        {themeInfo.name}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-[#2547E8] rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );
}

export function ThemePicker() {
  const { intensity, setIntensity, reducedMotion, setReducedMotion, extraReadable, setExtraReadable, colorPalette, setColorPalette } = useBackgroundStore();
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          {bgConfig.themes.map(t => (
            <ThemeCard key={t.id} themeInfo={t} />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Color Palette</h3>
        <div className="flex items-center gap-3">
          {Object.values(colorPalettes).map((palette) => (
            <button
              key={palette.id}
              onClick={() => setColorPalette(palette.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${colorPalette === palette.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0A0A0C] scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'}`}
              style={{ background: `linear-gradient(135deg, ${palette.glow1}, ${palette.glow2})` }}
              title={palette.name}
            >
              {colorPalette === palette.id && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-[#A1A1AA]">Intensity</span>
            <span className="text-white">{intensity}%</span>
          </div>
          <input 
            type="range" min="0" max="100" value={intensity} 
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#5436DA] hover:accent-[#5436DA]/80 transition-all"
          />
        </div>
        
        <div className="flex items-center justify-between py-2 border-b border-white/5">
          <div>
            <span className="text-sm font-medium text-white">Reduce motion</span>
            <p className="text-[#A1A1AA] text-xs mt-1">Disables heavy background animations.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={reducedMotion} 
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5436DA]"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <span className="text-sm font-medium text-white">Extra readable mode</span>
            <p className="text-[#A1A1AA] text-xs mt-1">Increases contrast and darkens backgrounds.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={extraReadable} 
              onChange={(e) => setExtraReadable(e.target.checked)}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5436DA]"></div>
          </label>
        </div>
      </div>
    </div>
  );
}
