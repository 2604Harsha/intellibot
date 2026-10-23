"use client";

import { MessageSquare, Plus, Search, Settings, PanelLeftClose, PanelLeftOpen, Folder, Tag, User as UserIcon, LogOut, Pin, PinOff, HelpCircle, Sparkles, ChevronRight, ExternalLink, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsModal } from "./SettingsModal";
import { PromptLibraryModal } from "./PromptLibraryModal";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBackgroundStore } from "@/store/background";
import { colorPalettes } from "@/background.config";

interface Chat {
  id: string;
  title: string;
  updatedAt: string;
  isPinned?: boolean;
  folderId?: string | null;
}

interface Folder {
  id: string;
  name: string;
  _count?: {
    chats: number;
  };
}

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState("personalization");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const { data: session } = useSession();
  const pathname = usePathname();
  
  const { colorPalette } = useBackgroundStore();
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;

  // Helper to group chats by date/pin status
  const groupedChats = chats.reduce((acc, chat) => {
    if (chat.isPinned) {
      if (!acc['Pinned']) acc['Pinned'] = [];
      acc['Pinned'].push(chat);
      return acc;
    }

    const date = new Date(chat.updatedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let group = 'Older';
    if (diffDays <= 1 && now.getDate() === date.getDate()) group = 'Today';
    else if (diffDays <= 2 && now.getDate() !== date.getDate()) group = 'Yesterday';
    else if (diffDays <= 7) group = 'Previous 7 Days';

    if (!acc[group]) acc[group] = [];
    acc[group].push(chat);
    return acc;
  }, {} as Record<string, Chat[]>);

  const groupOrder = ['Pinned', 'Today', 'Yesterday', 'Previous 7 Days', 'Older'];

  const togglePin = async (e: React.MouseEvent, chat: Chat) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Optimistic update
    setChats(current => 
      current.map(c => c.id === chat.id ? { ...c, isPinned: !c.isPinned } : c)
    );

    try {
      await fetch(`/api/chats/${chat.id}/pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPinned: !chat.isPinned })
      });
    } catch (error) {
      console.error("Failed to pin chat", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetch('/api/chats')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setChats(data);
        })
        .catch(console.error);
        
      fetch('/api/folders')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setFolders(data);
        })
        .catch(console.error);
    }
  }, [session]);

  const handleCreateFolder = async () => {
    const name = window.prompt("Enter new folder name:");
    if (!name || !name.trim()) return;
    
    try {
      const res = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() })
      });
      if (res.ok) {
        const newFolder = await res.json();
        setFolders(current => [newFolder, ...current]);
      }
    } catch (error) {
      console.error("Failed to create folder", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 400, damping: 30 } }
  };

  return (
    <div className="print:hidden h-full shrink-0 relative z-40">
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} initialTab={settingsTab} />

      {/* Toggle Button for mobile/collapsed state */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="absolute top-4 left-4 z-50 p-2 text-[#A1A1AA] hover:dark:text-white text-black bg-[#05060A]/80 backdrop-blur-md rounded-lg border dark:border-white/10 border-black/10"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="h-full dark:bg-white/[0.02] bg-white/75 backdrop-blur-[40px] border-r dark:border-white/10 border-black/10 flex flex-col overflow-hidden relative z-40 shadow-[8px_0_30px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient colored glow inside the sidebar */}
            <div 
              className="absolute top-0 left-0 right-0 h-[300px] opacity-[0.08] pointer-events-none blur-[60px]"
              style={{ background: activeColors.glow1 }}
            />
            {/* Subtle inner highlight to simulate thick glass */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />
            
            {/* Brand Header with Avatar & Animation */}
            <div className="px-5 pt-6 pb-4 flex items-start justify-between relative">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center p-[2px] overflow-hidden group/logo shadow-[0_0_20px_rgba(0,229,255,0.15)]">
                  {/* Rotating gradient border animation */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-[-50%] w-[200%] h-[200%]"
                    style={{ background: `conic-gradient(from 0deg, transparent 0%, transparent 60%, ${activeColors.cyan} 80%, ${activeColors.glow1} 100%)` }}
                  />
                  <div className="absolute inset-[2px] bg-[#0A0D14] rounded-[14px] z-10" />
                  <img src="/bot-avatar.jpg" alt="Logo" className="w-full h-full object-cover rounded-[13px] relative z-20 group-hover/logo:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center h-14">
                  <span className="font-extrabold text-lg tracking-wide dark:text-white text-black drop-shadow-md leading-tight">IntelliBot</span>
                  <span className="text-[11px] uppercase font-bold tracking-[0.25em] mt-0.5" style={{ color: activeColors.cyan }}>Nexus</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 -mr-2 mt-1 dark:text-[#A1A1AA] text-gray-500 hover:dark:text-white hover:text-black hover:dark:bg-white/10 hover:bg-black/10 rounded-lg transition-colors"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 pb-3">
              <Link 
                href="/chat" 
                className="flex-1 flex items-center justify-center gap-2 dark:text-white text-black px-4 py-3 rounded-xl transition-all border dark:border-white/20 border-black/20 font-semibold text-sm group relative overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <div 
                  className="absolute inset-0 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${activeColors.glow1}, ${activeColors.glow2})` }}
                />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{ background: activeColors.cyan }}
                />
                {/* Glossy top highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-50" />
                <Plus className="w-4 h-4 relative z-10 group-hover:rotate-90 transition-transform duration-300" style={{ color: activeColors.cyan }} /> 
                <span className="relative z-10 text-[13px] tracking-wide dark:text-white text-black drop-shadow-md">New Chat</span>
              </Link>
            </div>

            <div className="px-4 py-2 relative group mt-1">
              <Search className="w-4 h-4 absolute left-7 top-1/2 -translate-y-1/2 dark:text-[#A1A1AA] text-gray-500 group-focus-within:dark:text-white group-focus-within:text-black transition-colors z-10" />
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full dark:bg-white/[0.04] bg-black/[0.04] hover:dark:bg-white/[0.08] hover:bg-black/[0.08] border dark:border-white/10 border-black/10 rounded-xl py-2.5 pl-10 pr-4 text-sm dark:text-[#ECECF1] text-gray-900 placeholder-[#A1A1AA] focus:outline-none focus:dark:border-white/30 focus:border-black/30 focus:dark:bg-white/[0.1] focus:bg-black/[0.1] transition-all shadow-inner relative z-0"
                style={{ focusVisible: { borderColor: activeColors.cyan } } as any}
              />
              <div 
                className="absolute inset-0 opacity-0 group-focus-within:opacity-10 pointer-events-none transition-opacity duration-500 rounded-xl blur-md"
                style={{ background: activeColors.glow1 }}
              />
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-premium scroll-mask-y"
            >
              
              {/* Folders Section */}
              {/* Folders Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <motion.h3 variants={itemVariants} className="text-[11px] font-bold dark:text-white text-black/50 uppercase tracking-[0.15em]">Folders</motion.h3>
                  <motion.button variants={itemVariants} onClick={handleCreateFolder} className="text-[#A1A1AA] hover:dark:text-white text-black transition-colors" title="Create Folder">
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
                <div className="space-y-1">
                  {folders.length === 0 ? (
                    <motion.div variants={itemVariants} className="px-3 py-2 text-[#A1A1AA] text-xs">
                      No folders yet
                    </motion.div>
                  ) : (
                    folders.map((folder, index) => (
                      <motion.button key={folder.id} variants={itemVariants} className="w-full text-left px-3 py-2 rounded-lg hover:dark:bg-white/10 hover:bg-black/5 dark:text-gray-300 text-gray-800 hover:dark:text-white hover:text-black text-[13px] font-medium truncate flex items-center justify-between group transition-colors">
                        <span className="flex items-center gap-3"><Folder className="w-4 h-4 drop-shadow-md" style={{ color: index % 2 === 0 ? activeColors.cyan : activeColors.glow1 }} /> {folder.name}</span>
                        <span className="text-xs dark:text-white/70 text-black/70 dark:bg-white/10 bg-black/10 px-2 py-0.5 rounded-full group-hover:dark:bg-white/20 group-hover:bg-black/20 group-hover:dark:text-white transition-all">{folder._count?.chats || 0}</span>
                      </motion.button>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {chats.length === 0 ? (
                  <div>
                    <motion.h3 variants={itemVariants} className="text-[11px] font-bold dark:text-white text-black/50 uppercase tracking-[0.15em] mb-3">Recent Chats</motion.h3>
                    <motion.div variants={itemVariants} className="px-3 py-2 text-[#A1A1AA] text-xs">
                      No recent chats
                    </motion.div>
                  </div>
                ) : (
                  groupOrder.map(group => {
                    if (!groupedChats[group] || groupedChats[group].length === 0) return null;
                    return (
                      <div key={group}>
                        <motion.h3 variants={itemVariants} className="text-[10px] font-bold dark:text-white text-black/40 uppercase tracking-[0.15em] mb-2 px-3">{group}</motion.h3>
                        <div className="space-y-1">
                          {groupedChats[group].map(chat => {
                            const isActive = pathname === `/chat/${chat.id}`;
                            return (
                              <Link 
                                key={chat.id} 
                                href={`/chat/${chat.id}`}
                                className={`w-full group/item relative text-left px-3 py-2.5 rounded-xl text-[13px] flex items-center justify-between transition-all duration-300 border border-transparent ${isActive ? 'dark:text-white text-black font-semibold dark:border-white/10 border-black/10 shadow-lg' : 'hover:dark:bg-white/[0.06] hover:bg-black/[0.04] dark:text-gray-300 text-gray-800 font-medium hover:dark:text-white hover:text-black hover:translate-x-1'}`}
                              >
                                {isActive && (
                                  <>
                                    <div 
                                      className="absolute inset-0 opacity-[0.25] rounded-xl"
                                      style={{ background: `linear-gradient(90deg, ${activeColors.glow1}, transparent)` }}
                                    />
                                    <div 
                                      className="absolute left-0 top-1/4 bottom-1/4 w-[4px] rounded-r-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                                      style={{ backgroundColor: activeColors.cyan }}
                                    />
                                  </>
                                )}
                                <div className="flex items-center gap-3 overflow-hidden relative z-10">
                                  <div className="relative w-5 h-5 shrink-0 flex items-center justify-center rounded-md overflow-hidden bg-black/20 border dark:border-white/10 border-black/10 group-hover/item:border-white/30 transition-colors duration-300">
                                    <motion.div 
                                      animate={{ 
                                        rotate: [0, 360],
                                        scale: isActive ? [1, 1.2, 1] : [1, 1.1, 1] 
                                      }}
                                      transition={{ 
                                        rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                                        scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                                      }}
                                      className="absolute inset-[-50%] w-[200%] h-[200%] opacity-50 group-hover/item:opacity-100 transition-opacity duration-300"
                                      style={{ 
                                        background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${activeColors.cyan} 60%, ${activeColors.glow1} 100%)`,
                                        filter: 'blur(2px)'
                                      }}
                                    />
                                    <div className="absolute inset-[1px] bg-[#05060A] rounded-[5px] z-10" />
                                    <div 
                                      className="w-1.5 h-1.5 rounded-full relative z-20 group-hover/item:scale-125 transition-transform duration-300" 
                                      style={{ 
                                        background: isActive ? activeColors.cyan : activeColors.glow1, 
                                        boxShadow: `0 0 8px ${isActive ? activeColors.cyan : activeColors.glow1}` 
                                      }} 
                                    />
                                  </div>
                                  <span className="truncate group-hover/item:pl-1 transition-all duration-300">{chat.title}</span>
                                </div>
                                <button 
                                  onClick={(e) => togglePin(e, chat)}
                                  className={`p-1.5 shrink-0 rounded-md hover:dark:bg-white/10 bg-black/10 transition-all relative z-10 ${chat.isPinned ? 'dark:text-white text-black opacity-100' : 'opacity-0 group-hover/item:opacity-100'}`}
                                >
                                  {chat.isPinned ? <Pin className="w-3.5 h-3.5 fill-current" style={{ color: activeColors.cyan }} /> : <Pin className="w-3.5 h-3.5" />}
                                </button>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>

            <div className="p-3 border-t dark:border-white/5 border-black/5 relative">
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <>
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-3 mb-2 w-[240px] bg-[#2F2F2F] border border-[#3F3F3F] rounded-xl shadow-2xl z-50 overflow-hidden font-sans py-1.5"
                    >
                      <div className="px-3 py-2 text-xs text-[#A1A1AA] flex items-center justify-between border-b border-[#3F3F3F]/50 pb-2 mb-1">
                        <span className="truncate">{session?.user?.email}</span>
                      </div>
                      
                      <button 
                        onClick={() => { setSettingsTab("billing"); setIsSettingsOpen(true); setIsProfileMenuOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4" /> Upgrade plan
                        </div>
                      </button>

                      <button 
                        onClick={() => { setSettingsTab("personalization"); setIsSettingsOpen(true); setIsProfileMenuOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="w-4 h-4" /> Personalization
                        </div>
                      </button>

                      <button 
                        onClick={() => { setSettingsTab("profile"); setIsSettingsOpen(true); setIsProfileMenuOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <UserIcon className="w-4 h-4" /> Profile
                        </div>
                      </button>

                      <button 
                        onClick={() => { setSettingsTab("general"); setIsSettingsOpen(true); setIsProfileMenuOpen(false); }}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Settings className="w-4 h-4" /> Settings
                        </div>
                      </button>

                      <div className="w-full relative">
                        <button 
                          onClick={() => { setIsPromptLibraryOpen(true); setIsProfileMenuOpen(false); }}
                          className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-4 h-4 text-[#10A37F]" /> Prompt Library
                          </div>
                        </button>
                        
                        {/* Nested Help Menu */}
                        <AnimatePresence>
                          {isHelpMenuOpen && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              className="absolute left-full bottom-0 ml-1 w-52 bg-[#2F2F2F] border border-[#3F3F3F] rounded-xl shadow-2xl py-1.5 z-50"
                            >
                              <button onClick={(e) => { e.stopPropagation(); window.open('https://help.openai.com/en/', '_blank'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><HelpCircle className="w-4 h-4" /> Help center</button>
                              <button onClick={(e) => { e.stopPropagation(); window.open('https://openai.com/policies/privacy-policy', '_blank'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><Shield className="w-4 h-4" /> Privacy center</button>
                              <button onClick={(e) => { e.stopPropagation(); window.open('https://help.openai.com/en/articles/6825453-chatgpt-release-notes', '_blank'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><Tag className="w-4 h-4" /> Release notes</button>
                              <button onClick={(e) => { e.stopPropagation(); window.open('https://openai.com/chatgpt/download/', '_blank'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><ExternalLink className="w-4 h-4" /> Download apps</button>
                              <div className="h-px bg-[#3F3F3F]/50 my-1.5" />
                              <button onClick={(e) => { e.stopPropagation(); window.open('https://openai.com/policies/terms-of-use', '_blank'); }} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><span>Terms of Service</span></button>
                              <button onClick={(e) => { e.stopPropagation(); window.open('https://openai.com/policies/privacy-policy', '_blank'); }} className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><span>Privacy Policy</span></button>
                              <button onClick={(e) => { e.stopPropagation(); alert('Bug reporting coming soon!'); }} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"><HelpCircle className="w-4 h-4" /> Report a bug</button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="h-px bg-[#3F3F3F]/50 my-1.5" />

                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm text-[#ECECF1] hover:bg-[#3F3F3F] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <LogOut className="w-4 h-4" /> Log out
                        </div>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              
              {/* Profile Button */}
              {session?.user ? (
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-sm rounded-xl transition-all duration-300 border ${isProfileMenuOpen ? 'dark:bg-white/10 bg-black/10 dark:border-white/20 border-black/20 shadow-inner' : 'dark:border-white/5 border-black/5 hover:bg-white/[0.08] hover:dark:border-white/20 border-black/20 bg-white/[0.02]'}`}
                >
                  <div 
                    className="w-9 h-9 rounded-full flex items-center justify-center dark:text-white text-black font-bold text-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] shrink-0 border border-white/30 relative overflow-hidden"
                  >
                    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${activeColors.glow1}, ${activeColors.glow2})` }} />
                    <span className="relative z-10 drop-shadow-md">{session.user.email?.[0].toUpperCase() || 'U'}</span>
                  </div>
                  <div className="flex-1 overflow-hidden flex flex-col items-start justify-center">
                    <span className="truncate dark:text-white text-black font-semibold text-[13px] tracking-wide drop-shadow-sm">{session.user.name || session.user.email?.split('@')[0] || 'User'}</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ backgroundColor: activeColors.cyan }} />
                      <span className="truncate text-[10px] text-[#A1A1AA] uppercase tracking-widest font-bold" style={{ color: activeColors.cyan }}>Pro Plan</span>
                    </div>
                  </div>
                </button>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        initialTab={settingsTab}
      />
      <PromptLibraryModal 
        isOpen={isPromptLibraryOpen}
        onClose={() => setIsPromptLibraryOpen(false)}
        onSelectPrompt={(prompt) => {
          alert(`Prompt selected: ${prompt.substring(0, 50)}...`);
        }}
      />
    </div>
  );
}
