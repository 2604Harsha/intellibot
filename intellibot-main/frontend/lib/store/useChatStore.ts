import { create } from 'zustand';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatStore {
  messages: Message[];
  isGenerating: boolean;
  addMessage: (message: Message) => void;
  setGenerating: (status: boolean) => void;
  sendMessage: (content: string) => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  isGenerating: false,
  
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setGenerating: (status) => set({ isGenerating: status }),

  sendMessage: async (content: string) => {
    const { addMessage, setGenerating, messages } = get();
    
    // 1. Add user message
    addMessage({ role: 'user', content });
    setGenerating(true);

    try {
      // 2. Call the Flask backend using the environment variable or fallback to local
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          chat_history: messages // pass previous history
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // 3. Add bot response
      addMessage({ role: 'assistant', content: data.response });

    } catch (error) {
      console.error('Error communicating with backend:', error);
      addMessage({ role: 'assistant', content: "⚠️ Sorry, I couldn't reach the backend server. Make sure `python app.py` is running." });
    } finally {
      setGenerating(false);
    }
  },
}));
