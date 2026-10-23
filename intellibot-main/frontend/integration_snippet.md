# Background Integration Snippets

## 1. Using the Content Mask (Readability Protection)
To ensure the background dims behind important text, pass refs of your content zones to `useContentMask`.

```tsx
import { useRef } from 'react';
import { useContentMask } from '@/components/background/ContentMask';

export function ChatLayout({ children }) {
  const centerColumnRef = useRef<HTMLDivElement>(null);
  const composerRef = useRef<HTMLDivElement>(null);
  
  // This automatically tracks the DOM bounds and feeds them to the shader
  useContentMask([centerColumnRef, composerRef]);

  return (
    <div className="flex h-screen bg-transparent">
      {/* ... sidebar ... */}
      <main className="flex-1 relative flex flex-col items-center">
        <div ref={centerColumnRef} className="w-full max-w-3xl flex-1">
           {children}
        </div>
        <div ref={composerRef} className="w-full max-w-3xl glass-surface rounded-2xl mb-6">
           {/* Composer goes here */}
        </div>
      </main>
    </div>
  );
}
```

## 2. Applying Upgraded Glass Surfaces
Use the new `.glass-surface`, `.text-primary-high`, and `.text-secondary-high` classes in `globals.css`:

```tsx
// Example suggestion card
<button className="glass-surface p-4 rounded-xl text-left transition-transform hover:scale-[1.02]">
  <h4 className="text-primary-high font-medium mb-1">Explain quantum computing</h4>
  <p className="text-secondary-high text-sm">Keep it simple enough for a 10 year old to understand.</p>
</button>
```

## 3. Streaming Response (Thinking & Responding State)
Hook into your SSE or React Server Components stream handler:

```tsx
import { useBackground } from '@/components/background';

export function useChatStream() {
  const { setMode } = useBackground();

  const submitQuery = async (query) => {
    setMode('thinking'); // High-energy mode
    const response = await fetch('/api/chat', { body: query });
    const reader = response.body.getReader();
    setMode('responding'); // Tokens streaming
    
    while(true) {
      const { done, value } = await reader.read();
      if (done) {
        setMode('idle');
        break;
      }
    }
  };
}
```

## 4. Voice Mode (Listening & Speaking State)
Use the exposed audio-reactive functions in your `VoiceModal`:

```tsx
import { useBackground } from '@/components/background';

export function VoiceModal({ isOpen }) {
  const { setMode, startListening, stopListening } = useBackground();

  useEffect(() => {
    if (isOpen) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        setMode('listening');
        startListening(stream); // feeds mic RMS to shader `uAudioLevel`
      });
    } else {
      stopListening();
      setMode('idle');
    }
  }, [isOpen]);
}
```
