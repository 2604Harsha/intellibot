"use client";

import { Mic, Paperclip, Send, Square, X, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceModeModal } from "./VoiceModeModal";
import { useBackgroundStore } from "@/store/background";
import { colorPalettes } from "@/background.config";

interface ComposerProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e?: React.FormEvent, attachments?: File[]) => void;
  isLoading: boolean;
  stop: () => void;
  setInput: (value: string) => void;
}

export function Composer({ input, handleInputChange, handleSubmit, isLoading, stop, setInput }: ComposerProps) {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const setMode = useBackgroundStore((state) => state.setMode);
  const pulse = useBackgroundStore((state) => state.pulse);
  const colorPalette = useBackgroundStore((state) => state.colorPalette);
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;
  
  const typingTimer = useRef<NodeJS.Timeout>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!(input || "").trim() && attachedFiles.length === 0 || isLoading) return;
    
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    
    setMode('thinking');
    handleSubmit(e, attachedFiles);
    setAttachedFiles([]);
  };
  
  // Return to idle mode when streaming stops
  useEffect(() => {
    if (!isLoading && input === "") {
      setMode('idle');
    }
  }, [isLoading]);

  return (
    <>
      <VoiceModeModal 
        isOpen={isVoiceOpen} 
        onClose={() => setIsVoiceOpen(false)} 
        onSend={(text) => {
          setInput(input + (input ? " " : "") + text);
          // Wait for state to settle, then submit form
          setTimeout(() => {
            const form = document.getElementById("chat-composer-form") as HTMLFormElement;
            if (form) form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
          }, 0);
        }}
      />
      <div className="w-full z-20 pt-6 pb-6 px-4 shrink-0">
      <div className="max-w-3xl mx-auto relative">
        
        {/* Stop Generation Button (appears when generating) */}
        {isLoading && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <button
              type="button"
              onClick={() => stop()}
              className="flex items-center gap-2 dark:bg-[#05060A] bg-white border dark:border-white/10 border-black/10 hover:dark:bg-white/5 hover:bg-black/5 text-sm dark:text-[#ECECF1] text-gray-900 px-4 py-2 rounded-full shadow-lg transition-colors"
            >
              <Square className="w-3 h-3 fill-current" /> Stop generating
            </button>
          </div>
        )}

        <form 
          id="chat-composer-form"
          onSubmit={onSubmit}
          className="relative flex flex-col dark:bg-[#05060A]/70 bg-white/70 backdrop-blur-3xl border dark:border-white/10 border-black/10 focus-within:dark:border-white/20 focus-within:border-black/20 focus-within:ring-4 focus-within:dark:ring-white/5 focus-within:ring-black/5 p-3 rounded-[32px] shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-300"
          style={{ '--focus-color': activeColors.cyan } as any}
        >
          {/* Attachment Staging Area */}
          <AnimatePresence>
            {attachedFiles.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2 px-2 pt-2 pb-1 overflow-x-auto scrollbar-thin"
              >
                {attachedFiles.map((file, idx) => (
                  <div key={idx} className="relative flex items-center gap-2 dark:bg-[#18181B] bg-white border dark:border-white/10 border-black/10 p-2 pr-8 rounded-xl shrink-0 group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `linear-gradient(135deg, ${activeColors.glow1}33, ${activeColors.glow2}33)` }}>
                      <FileText className="w-4 h-4" style={{ color: activeColors.cyan }} />
                    </div>
                    <div className="flex flex-col overflow-hidden max-w-[120px]">
                      <span className="text-xs dark:text-white text-black truncate font-medium">{file.name}</span>
                      <span className="text-[10px] text-[#A1A1AA]">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setAttachedFiles(files => files.filter((_, i) => i !== idx))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 bg-black/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-end gap-2 w-full">
            <input 
              type="file" 
              multiple
              ref={fileInputRef} 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files?.length) {
                  setAttachedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                  pulse(1.0);
                }
              }}
            />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 dark:text-[#A1A1AA] text-gray-500 hover:dark:text-white hover:text-black transition-all rounded-full hover:dark:bg-white/10 hover:bg-black/10 active:scale-95"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          
          <textarea
            ref={textareaRef}
            value={input}
            onFocus={() => setMode('focus')}
            onBlur={() => setMode('idle')}
            onChange={(e) => {
              setInput(e.target.value);
              try { handleInputChange(e); } catch(err) {}
            }}
            onKeyDown={(e) => {
              pulse(0.1);
              setMode('typing');
              clearTimeout(typingTimer.current);
              typingTimer.current = setTimeout(() => setMode('focus'), 500);

              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSubmit(e);
              }
            }}
            placeholder="Message IntelliBot..."
            className="flex-1 max-h-[200px] bg-transparent border-none focus:ring-0 resize-none py-3.5 px-3 dark:text-[#ECECF1] text-gray-900 placeholder-[#A1A1AA] text-[15px] scrollbar-thin leading-relaxed"
            rows={1}
          />

          {/* dynamic submit button */}
          {(input || "").trim() || attachedFiles.length > 0 ? (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              type="submit"
              className="p-3.5 mb-1 mr-1 dark:text-white text-black rounded-full shadow-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${activeColors.glow1}, ${activeColors.glow2})` }}
            >
              <Send className="w-5 h-5" />
            </motion.button>
          ) : (
            <button 
              type="button" 
              onClick={() => setIsVoiceOpen(true)}
              className="p-3.5 mb-1 mr-1 dark:text-[#A1A1AA] text-gray-500 hover:dark:text-white hover:text-black transition-all rounded-full hover:dark:bg-white/10 hover:bg-black/10 active:scale-95"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
          </div>
        </form>

        <div className="text-center mt-3">
          <p className="text-[11px] dark:text-[#A1A1AA] text-gray-500">
            IntelliBot can make mistakes. Consider verifying important information.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
