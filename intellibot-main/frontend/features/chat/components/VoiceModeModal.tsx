"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, MicOff, Settings2, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

interface VoiceModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (text: string) => void;
}

export function VoiceModeModal({ isOpen, onClose, onSend }: VoiceModeModalProps) {
  const [isListening, setIsListening] = useState(false);
  const [volume, setVolume] = useState(0);
  const [transcript, setTranscript] = useState("");

  // Speech Recognition Logic
  useEffect(() => {
    let recognition: any = null;

    if (!isListening) {
      if (recognition) recognition.stop();
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setTranscript("Speech recognition not supported in this browser.");
      setTimeout(() => setIsListening(false), 3000);
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      // Could connect to audio analyzer here for real volume, but random is fine for UI
    };

    recognition.onresult = (event: any) => {
      let current = "";
      for (let i = 0; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setTranscript(current);
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        setTranscript(current => {
          if (current.trim() && onSend) {
            onSend(current.trim());
          }
          return current;
        });
        onClose();
      }, 800);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening, isOpen, onClose, onSend]);

  // Fake volume visualizer
  useEffect(() => {
    if (!isListening) {
      setVolume(0);
      return;
    }
    
    const interval = setInterval(() => {
      setVolume(Math.random() * 100);
    }, 100);
    
    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full backdrop-blur-md">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/70 font-medium">IntelliBot Advanced Voice</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                <Settings2 className="w-6 h-6" />
              </button>
              <button 
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Center Orb */}
          <div className="relative flex flex-col items-center justify-center w-full max-w-lg mx-auto">
            <motion.div
              animate={{ 
                scale: isListening ? [1, 1.2 + (volume / 200), 1] : 1,
                opacity: isListening ? 1 : 0.5
              }}
              transition={{ 
                duration: isListening ? 0.2 : 2, 
                repeat: isListening ? Infinity : 0,
                repeatType: "reverse"
              }}
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
            >
              {/* Glow Layers */}
              <div className={`absolute inset-0 rounded-full blur-[80px] transition-all duration-500 ${isListening ? 'bg-cyan-500/40' : 'bg-white/10'}`} />
              <div className={`absolute inset-10 rounded-full blur-[40px] transition-all duration-500 ${isListening ? 'bg-blue-400/50' : 'bg-white/20'}`} />
              <div className={`absolute inset-20 rounded-full blur-[20px] transition-all duration-500 ${isListening ? 'bg-white/80' : 'bg-white/40'}`} />
              
              {/* Core */}
              <div className="relative z-10 w-24 h-24 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)]" />
            </motion.div>

            <div className="mt-20 text-center space-y-4">
              <p className="text-white/50 text-lg font-medium tracking-wide h-8">
                {isListening ? (transcript || "Listening...") : "Tap the microphone to speak"}
              </p>
              
              <button 
                onClick={() => setIsListening(!isListening)}
                className={`p-6 rounded-full transition-all duration-300 shadow-2xl ${
                  isListening 
                    ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20" 
                    : "bg-white text-black hover:scale-105"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
