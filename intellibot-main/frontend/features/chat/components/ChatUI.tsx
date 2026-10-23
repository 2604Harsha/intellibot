"use client";

import { Composer } from "@/features/chat/components/Composer";
import { ArtifactPanel } from "@/features/chat/components/ArtifactPanel";
import { themeConfig } from "@/lib/theme.config";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, Copy, RefreshCw, ThumbsUp, ThumbsDown, Download, Sparkles, Volume2, Square, Share, MoreHorizontal, Check, Trash2, FileText, Settings } from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { useContentMask } from "@/components/background/ContentMask";
import { useBackgroundStore } from "@/store/background";
import { colorPalettes } from "@/background.config";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ChatUIProps {
  initialId?: string;
  initialMessages?: any[];
}

export function ChatUI({ initialId, initialMessages = [] }: ChatUIProps) {
  const [chatId] = useState(() => initialId || Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const [error, setError] = useState<any>(null);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  
  const [isShared, setIsShared] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  
  // Close the more menu if clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsMoreMenuOpen(false);
    if (isMoreMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMoreMenuOpen]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsShared(true);
    setTimeout(() => setIsShared(false), 2000);
  };

  const handleDownload = () => {
    const content = messages.map(m => `${m.role.toUpperCase()}:\n${m.content}\n`).join('\n---\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IntelliBot-Chat-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2000);
  };

  const toggleSpeech = (text: string, idx: number) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    
    if (speakingIdx === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
      setMode('idle');
      return;
    }
    
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[_*~`#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.onstart = () => {
      setSpeakingIdx(idx);
      setMode('speaking');
    };
    utterance.onend = () => {
      if (speakingIdx === idx) {
        setSpeakingIdx(null);
        setMode('idle');
      }
    };
    utterance.onerror = () => {
      setSpeakingIdx(null);
      setMode('idle');
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const [isArtifactOpen, setIsArtifactOpen] = useState(false);
  const [artifactData, setArtifactData] = useState<{ title?: string; code?: string; language?: string }>({});

  const isLoading = status === 'submitted';

  const { colorPalette } = useBackgroundStore();
  const activeColors = useMemo(() => colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt, [colorPalette]);

  const setMode = useBackgroundStore((state) => state.setMode);

  const sendMessage = async ({ role, content }: { role: string, content: string }, documentIds?: string[]) => {
    const newMessages = [...messages, { role, content }];
    setMessages(newMessages);
    setStatus('submitted');
    setError(null);
    
    // Stop any current speech
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    
    // Start the thinking animation in the background
    setMode('thinking');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, chatId, documentIds })
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      
      
      // Stop the thinking animation
      setMode('idle');
      
    } catch (err: any) {
      setError({ message: err.message });
      setMode('idle');
    } finally {
      setStatus('idle');
    }
  };

  const stop = () => setStatus('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent, attachments?: File[]) => {
    e?.preventDefault();
    if (!input.trim() && (!attachments || attachments.length === 0) || isLoading) return;
    
    let documentIds: string[] = [];
    if (attachments && attachments.length > 0) {
      setStatus('submitted'); // Show loading state
      for (const file of attachments) {
        const formData = new FormData();
        formData.append("file", file);
        if (chatId) formData.append("chatId", chatId);
        
        try {
          const res = await fetch('/api/upload', { method: 'POST', body: formData });
          const data = await res.json();
          if (data.document?.id) {
            documentIds.push(data.document.id);
          }
        } catch (err) {
          console.error("Upload error", err);
        }
      }
    }

    sendMessage({ role: 'user', content: input || "Uploaded document" }, documentIds);
    setInput("");
  };
  
  const centerColumnRef = useRef<HTMLDivElement>(null);
  // Removed full-screen mask to allow the premium background to shine through

  // Auto-scroll to bottom when messages or status change
  useEffect(() => {
    const scrollToBottom = () => {
      if (centerColumnRef.current) {
        centerColumnRef.current.scrollTo({
          top: centerColumnRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    };
    
    // Slight delay to ensure ReactMarkdown finishes rendering
    const timeout = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeout);
  }, [messages, status]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="flex w-full h-full overflow-hidden dark:bg-transparent bg-white/75">
      <div className={`flex-1 min-h-0 relative flex flex-col h-full overflow-hidden transition-all duration-300 ${isArtifactOpen ? 'hidden md:flex border-r dark:border-white/10 border-black/10' : ''}`}>
      
      {/* Background gradients removed to let the unified BackgroundHost handle everything! */}

      {/* Premium Floating Header */}
      {messages.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-6 z-50 flex items-center gap-2"
        >
          <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 rounded-xl dark:bg-[#111114]/60 bg-white/60 dark:text-gray-300 text-gray-700 hover:dark:text-white hover:text-black hover:dark:bg-white/10 hover:bg-black/10 transition-colors text-sm font-medium backdrop-blur-2xl border dark:border-white/10 border-black/10 shadow-lg group">
            {isShared ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: activeColors.cyan }} />}
            {isShared ? "Copied Link" : "Share"}
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 rounded-xl dark:bg-[#111114]/60 bg-white/60 dark:text-gray-300 text-gray-700 hover:dark:text-white hover:text-black hover:dark:bg-white/10 hover:bg-black/10 transition-colors text-sm font-medium backdrop-blur-2xl border dark:border-white/10 border-black/10 shadow-lg group">
            {isDownloaded ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Download className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" style={{ color: activeColors.glow1 }} />}
            {isDownloaded ? "Saved!" : "Download"}
          </button>
          <div className="relative">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMoreMenuOpen(!isMoreMenuOpen); }}
              className="p-1.5 rounded-xl dark:bg-[#111114]/60 bg-white/60 dark:text-gray-300 text-gray-700 hover:dark:text-white hover:text-black hover:dark:bg-white/10 hover:bg-black/10 transition-colors backdrop-blur-2xl border dark:border-white/10 border-black/10 shadow-lg"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {isMoreMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 dark:bg-[#0A0D14]/90 bg-white/95 backdrop-blur-3xl border dark:border-white/10 border-black/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden font-sans py-2"
                >
                  <button onClick={() => setMessages([])} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                    <Trash2 className="w-4 h-4" /> Clear Chat
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm dark:text-[#ECECF1] text-gray-800 hover:dark:bg-white/10 hover:bg-black/5 transition-colors">
                    <FileText className="w-4 h-4" /> Export Data
                  </button>
                  <div className="my-1 border-t dark:border-white/10 border-black/10" />
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm dark:text-[#ECECF1] text-gray-800 hover:dark:bg-white/10 hover:bg-black/5 transition-colors">
                    <Settings className="w-4 h-4" /> Chat Settings
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Messages Area */}
      <div ref={centerColumnRef} className="flex-1 min-h-0 overflow-y-auto z-10 scrollbar-premium scroll-mask-y w-full flex justify-center pb-4">
        
        {messages.length === 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="h-full flex flex-col items-center justify-center p-8"
          >
            <motion.div 
              variants={itemVariants}
              className="w-24 h-24 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(0,229,255,0.2)] mb-6 relative overflow-hidden ring-1 dark:ring-white/10 ring-black/10"
              style={{ background: `linear-gradient(135deg, ${activeColors.glow1}, ${activeColors.glow2})` }}
            >
              <div className="absolute inset-0 bg-white/20 backdrop-blur-sm z-0" />
              <img src="/bot-avatar.jpg" alt="IntelliBot Avatar" className="w-full h-full object-cover relative z-10 hover:scale-110 transition-transform duration-700" />
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-sans font-semibold mb-3 dark:text-white text-black tracking-tight text-center drop-shadow-sm">
              How can I help you today?
            </motion.h1>
            <motion.p variants={itemVariants} className="dark:text-[#A1A1AA] text-gray-600 mb-10 text-base tracking-wide text-center drop-shadow-sm">
              {themeConfig.tagline}
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
              {["Design a database schema", "Explain quantum computing", "Write a Python script", "Summarize this article"].map((prompt, i) => (
                <motion.button 
                  key={i} 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setInput(prompt);
                    setTimeout(() => {
                      const event = new Event('submit', { cancelable: true, bubbles: true });
                      document.getElementById('chat-composer-form')?.dispatchEvent(event);
                    }, 10);
                  }}
                  className="dark:bg-black/40 bg-white/40 backdrop-blur-xl border dark:border-white/10 border-black/10 hover:dark:border-white/20 hover:border-black/20 hover:dark:bg-white/5 hover:bg-white/60 p-5 rounded-3xl text-left text-sm transition-all shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="font-medium mb-1 dark:text-white text-black relative z-10 transition-colors">{prompt}</div>
                  <div className="text-xs dark:text-zinc-400 text-gray-600 line-clamp-1 relative z-10 transition-colors">Click to instantly send this prompt</div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <div className="max-w-3xl mx-auto w-full pt-10 px-4 space-y-8 pb-8">
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`flex gap-4 group ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div 
                    className="w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center mt-1 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 border dark:border-white/20 border-black/10 bg-[#0A0D14] z-10 hover:scale-105"
                    style={{ boxShadow: `0 0 15px ${activeColors.cyan}40` }}
                  >
                    <div className="absolute inset-0 opacity-30 pointer-events-none z-20 mix-blend-overlay" style={{ background: `linear-gradient(135deg, ${activeColors.cyan}, transparent)` }} />
                    <img src="/bot-avatar.jpg" alt="AI" className="w-full h-full object-cover relative z-10" />
                  </div>
                )}
                
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  {msg.role === 'assistant' && (
                    <div className="font-semibold text-sm mb-1 ml-1 flex items-center gap-2">
                      <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${activeColors.cyan}, ${activeColors.glow1})` }}>
                        {themeConfig.name}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/10 text-[10px] font-bold dark:text-white text-black/70 tracking-wider">PRO</span>
                    </div>
                  )}
                  
                  <div 
                    className={`prose dark:prose-invert prose-p:leading-relaxed max-w-none text-[15px] relative overflow-hidden ${
                      msg.role === 'user' 
                        ? 'dark:text-white text-black px-6 py-4 rounded-3xl rounded-tr-sm shadow-[0_8px_30px_rgba(0,0,0,0.3)] border dark:border-white/20 border-black/10' 
                        : 'dark:text-[#ECECF1] text-gray-900 px-6 py-5 w-full dark:bg-[#0A0D14]/60 bg-white/80 border dark:border-white/10 border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-2xl rounded-3xl rounded-tl-sm'
                    }`}
                    style={msg.role === 'user' ? { background: `linear-gradient(135deg, ${activeColors.glow1}, ${activeColors.glow2})` } : {}}
                  >
                    {msg.role === 'user' && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none mix-blend-overlay" />
                    )}
                    {msg.role === 'assistant' && (
                      <div 
                        className="absolute top-0 left-0 w-64 h-64 opacity-[0.08] pointer-events-none rounded-full mix-blend-screen blur-3xl -translate-x-1/4 -translate-y-1/4" 
                        style={{ background: activeColors.cyan }} 
                      />
                    )}
                    <div className="relative z-10">
                      <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        img({ src, alt }) {
                          return (
                            <div className="my-6 rounded-2xl overflow-hidden border dark:border-white/10 border-black/10 shadow-2xl relative group">
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-medium text-sm hover:scale-105 transition-transform shadow-xl">
                                  <Download className="w-4 h-4" /> Download Image
                                </button>
                              </div>
                              <img src={src} alt={alt} className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                          );
                        },
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || '');
                          const codeString = String(children).replace(/\n$/, '');
                          
                          if (!inline && match) {
                            return (
                              <div className="my-6 rounded-xl overflow-hidden bg-[#1E1E1E] border dark:border-white/10 border-black/10 shadow-xl">
                                <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b dark:border-white/5 border-black/5">
                                  <span className="text-xs font-mono dark:text-white text-black/70 lowercase">{match[1]}</span>
                                  <div className="flex items-center gap-3">
                                    {(match[1] === 'python' || match[1] === 'js' || match[1] === 'javascript' || match[1] === 'ts' || match[1] === 'typescript' || match[1] === 'html') && (
                                      <button 
                                        onClick={() => {
                                          setArtifactData({ title: `Generated ${match[1]} Script`, code: codeString, language: match[1] });
                                          setIsArtifactOpen(true);
                                        }}
                                        className="flex items-center gap-1.5 text-xs text-[#10A37F] hover:text-[#0E906F] transition-colors font-medium"
                                      >
                                        <Sparkles className="w-3.5 h-3.5" /> Open Artifact
                                      </button>
                                    )}
                                    <button 
                                      onClick={() => navigator.clipboard.writeText(codeString)}
                                      className="flex items-center gap-1.5 text-xs dark:text-white text-black/50 hover:dark:text-white text-black transition-colors"
                                    >
                                      <Copy className="w-3.5 h-3.5" /> Copy code
                                    </button>
                                  </div>
                                </div>
                                <div className="p-4 overflow-x-auto text-sm">
                                  <SyntaxHighlighter
                                    style={vscDarkPlus as any}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{ margin: 0, padding: 0, background: 'transparent' }}
                                    {...props}
                                  >
                                    {codeString}
                                  </SyntaxHighlighter>
                                </div>
                              </div>
                            );
                          }
                          return (
                            <code className="dark:bg-white/10 bg-black/10 text-[#00E5FF] px-1.5 py-0.5 rounded-md text-[13px] font-mono" {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    </div>
                  </div>

                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                      <button 
                        onClick={() => toggleSpeech(msg.content, idx)}
                        title={speakingIdx === idx ? "Stop speaking" : "Read aloud"}
                        className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors"
                      >
                        {speakingIdx === idx ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button onClick={() => navigator.clipboard.writeText(msg.content)} className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors" title="Copy"><Copy className="w-4 h-4" /></button>
                      <button className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors" title="Regenerate"><RefreshCw className="w-4 h-4" /></button>
                      <button onClick={handleShare} className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors" title="Share"><Share className="w-4 h-4" /></button>
                      <button 
                        onClick={() => {
                          const blob = new Blob([msg.content], { type: 'text/plain' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `IntelliBot-Message-${idx}.txt`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }} 
                        className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors" title="Download Message"
                      ><Download className="w-4 h-4" /></button>
                      <button onClick={(e) => { e.currentTarget.style.color = activeColors.cyan; }} className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors ml-2" title="Good Response"><ThumbsUp className="w-4 h-4" /></button>
                      <button onClick={(e) => { e.currentTarget.style.color = '#EF4444'; }} className="p-1.5 text-[#A1A1AA] hover:dark:text-white text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-md transition-colors" title="Bad Response"><ThumbsDown className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm flex flex-col gap-2">
                <span className="font-semibold text-red-300">Error generating response:</span>
                <code>{error.message || String(error)}</code>
              </div>
            )}
            
            {status === 'submitted' || status === 'streaming' && messages.length > 0 && messages[messages.length - 1].role !== 'assistant' && (
              <div className="flex gap-4">
                <div 
                  className="w-8 h-8 shrink-0 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] mt-1 relative overflow-hidden animate-pulse border dark:border-white/10 border-black/10 bg-black/50"
                >
                  <img src="/bot-avatar.jpg" alt="AI" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2 mt-1 ml-1">
                  <div className="font-semibold text-sm mb-1 flex items-center gap-2">
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${activeColors.cyan}, ${activeColors.glow1})` }}>
                      {themeConfig.name}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md dark:bg-white/10 bg-black/10 text-[10px] font-bold dark:text-white text-black/70 tracking-wider">PRO</span>
                  </div>
                  <div className="flex items-center gap-1.5 h-6">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: activeColors.cyan, animationDelay: '0ms', animationDuration: '0.8s' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: activeColors.glow1, animationDelay: '150ms', animationDuration: '0.8s' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: activeColors.glow2, animationDelay: '300ms', animationDuration: '0.8s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="print:hidden">
        <Composer 
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          setInput={setInput}
        />
      </div>
      </div>
      
      <ArtifactPanel 
        isOpen={isArtifactOpen} 
        onClose={() => setIsArtifactOpen(false)}
        {...artifactData}
      />
    </div>
  );
}
