"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MicOff } from "lucide-react";
import { useEffect, useState } from "react";
import { themeConfig } from "@/lib/theme.config";
import { useBackground } from "@/components/background";

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend?: (text: string) => void;
}

export function VoiceModal({ isOpen, onClose, onSend }: VoiceModalProps) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const { setMode, startListening, stopListening } = useBackground();

  // Real transcription using Web Speech API
  useEffect(() => {
    let recognition: any = null;

    if (!isOpen) {
      setTranscript("");
      setIsListening(false);
      stopListening();
      setMode('idle');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setTranscript("Speech recognition not supported in this browser.");
      setTimeout(() => onClose(), 3000);
      return;
    }

    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setMode('listening');
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => startListening(stream))
        .catch((e) => console.log('Mic denied:', e));
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
      
      // Wait a moment so user can read the final text
      setTimeout(() => {
        // If we captured some text, send it
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
      onClose();
    };

    try {
      recognition.start();
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060A]/95 backdrop-blur-3xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-colors border border-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Transcript Display */}
          <div className="absolute top-1/4 max-w-2xl px-8 text-center h-32 flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-space font-light text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500"
            >
              {transcript || "Listening..."}
            </motion.p>
          </div>

          {/* Mesmerizing Voice Orb */}
          <div className="relative mt-20 flex items-center justify-center">
            {/* Base glowing core */}
            <motion.div
              animate={{
                scale: isListening ? [1, 1.2, 1] : 1,
                opacity: isListening ? [0.8, 1, 0.8] : 0.5,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-40 h-40 rounded-full bg-gradient-to-tr from-[#5436DA] to-[#00E5FF] blur-md shadow-[0_0_80px_rgba(84,54,218,0.6)] flex items-center justify-center"
            >
              <div className="w-32 h-32 rounded-full bg-[#05060A] border border-white/10 mix-blend-overlay" />
            </motion.div>

            {/* Ripple rings */}
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-40 h-40 rounded-full border-2 border-[#00E5FF]/40"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                  className="absolute w-40 h-40 rounded-full border border-[#5436DA]/30"
                />
              </>
            )}
          </div>

          <div className="absolute bottom-16 text-center">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors border border-red-500/20 font-medium"
            >
              <MicOff className="w-5 h-5" /> Cancel
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
