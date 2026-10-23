"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Settings, Bell, User, Plug, Mic, CreditCard, Activity, BarChart, Database, HardDrive, Shield, Lock, Users, HeartHandshake, Key, Palette, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ThemePicker } from "@/components/background/ThemePicker";
import { useTheme } from "next-themes";
import { useBackgroundStore } from "@/store/background";
import { colorPalettes } from "@/background.config";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export function SettingsModal({ isOpen, onClose, initialTab = "personalization" }: SettingsModalProps) {
  const { colorPalette } = useBackgroundStore();
  const activeColors = colorPalettes[colorPalette as keyof typeof colorPalettes] || colorPalettes.cobalt;

  const [activeTab, setActiveTab] = useState(initialTab);
  const { theme: appTheme, setTheme: setAppTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  const [searchQuery, setSearchQuery] = useState("");

  const [model, setModel] = useState("IntelliBot-Pro (GPT-4o)");
  const [voice, setVoice] = useState("Alloy");
  const [openAIKey, setOpenAIKey] = useState("");
  const [cohereKey, setCohereKey] = useState("");
  const [savedStatus, setSavedStatus] = useState("");

  const [toggles, setToggles] = useState({
    browserNotifications: true,
    marketingEmails: false,
    mfa: false,
    contentFilters: true,
    improveIntelliBot: true,
    crashReports: true,
    webBrowsing: true,
    codeInterpreter: true,
    restrictExplicit: true,
    requirePIN: false,
  });

  const toggleSetting = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = (message: string) => {
    window.alert(message);
  };

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setModel(localStorage.getItem('preferredModel') || "IntelliBot-Pro (GPT-4o)");
      setVoice(localStorage.getItem('preferredVoice') || "Alloy");
      setOpenAIKey(localStorage.getItem('openAIKey') || "");
      setCohereKey(localStorage.getItem('cohereKey') || "");
    }
  }, []);

  const saveSetting = (key: string, value: string) => {
    localStorage.setItem(key, value);
    if (key === 'preferredModel') setModel(value);
    if (key === 'preferredVoice') setVoice(value);
  };

  const handleSaveKeys = () => {
    localStorage.setItem('openAIKey', openAIKey);
    localStorage.setItem('cohereKey', cohereKey);
    setSavedStatus("Saved!");
    setTimeout(() => setSavedStatus(""), 2000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "personalization", label: "Personalization", icon: User },
    { id: "profile", label: "Profile", icon: User },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "plugins", label: "Plugins", icon: Plug },
    { id: "voice", label: "Voice", icon: Mic },
    { id: "api", label: "API Keys", icon: Key },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "usage", label: "Usage", icon: Activity },
    { id: "analytics", label: "Analytics", icon: BarChart },
    { id: "data_controls", label: "Data controls", icon: Database },
    { id: "storage", label: "Storage", icon: HardDrive },
    { id: "safety", label: "Safety", icon: Shield },
    { id: "security", label: "Security and login", icon: Lock },
    { id: "parental", label: "Parental controls", icon: Users },
    { id: "trusted", label: "Trusted contact", icon: HeartHandshake },
  ];

  const filteredTabs = tabs.filter(tab => tab.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full max-w-[850px] h-[75vh] max-h-[800px] dark:bg-black/40 bg-white/80 backdrop-blur-[80px] border dark:border-white/10 border-black/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] flex overflow-hidden relative font-sans dark:text-zinc-200 text-gray-800"
          >
            {/* Ambient Modal Glow */}
            <div 
              className="absolute top-0 left-0 right-0 h-[300px] opacity-[0.06] pointer-events-none blur-[80px]"
              style={{ background: activeColors.glow1 }}
            />
            {/* Subtle inner highlight to simulate thick glass */}
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none" />

            {/* Sidebar */}
            <div className="w-[260px] dark:bg-white/[0.02] bg-white/40 border-r dark:border-white/10 border-black/10 flex flex-col relative z-10">
              <div className="p-4 pb-2">
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-md hover:dark:bg-white/10 bg-black/10 transition-colors mb-4 dark:text-zinc-400 text-gray-600 hover:dark:text-white text-black"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="relative mb-2">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 dark:text-zinc-400 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search settings"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border dark:border-white/20 border-black/20 rounded-lg py-1.5 pl-9 pr-3 text-sm dark:text-zinc-200 text-gray-800 placeholder-[#A1A1AA] focus:outline-none focus:dark:border-white/40 focus:border-black/40 focus:dark:bg-white/5 focus:bg-white/50 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-2 pb-4 scrollbar-premium">
                {filteredTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 relative overflow-hidden group ${
                        isActive
                          ? "dark:text-white text-black font-medium shadow-sm border dark:border-white/10 border-black/10"
                          : "dark:text-zinc-400 text-gray-600 hover:dark:text-white text-black hover:dark:bg-white/5 hover:bg-black/5 border border-transparent"
                      }`}
                      style={isActive ? { background: `linear-gradient(90deg, ${activeColors.glow1}33, transparent)` } : {}}
                    >
                      {isActive && (
                        <div 
                          className="absolute left-0 top-1 bottom-1 w-1 rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                          style={{ backgroundColor: activeColors.cyan }}
                        />
                      )}
                      <tab.icon className={`w-4 h-4 relative z-10 transition-transform ${isActive ? 'drop-shadow-md scale-110' : 'group-hover:scale-110'}`} style={isActive ? { color: activeColors.cyan } : {}} />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto scrollbar-premium bg-transparent relative z-10">
              <div className="max-w-2xl mx-auto px-8 py-10">
                <h2 className="text-xl font-semibold dark:text-zinc-200 text-gray-800 mb-8 pb-4 border-b dark:border-white/10 border-black/10">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>

                {/* Personalization Tab (Matches Screenshot) */}
                {activeTab === "personalization" && (
                  <div className="space-y-8">
                    {/* Select Row */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Base style and tone</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Set the style and tone of how IntelliBot responds to you. This doesn't impact IntelliBot's capabilities.</p>
                      </div>
                      <select className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black pr-2 border-none">
                        <option className="dark:bg-zinc-900 bg-gray-100">Professional</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Casual</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Direct</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">Characteristics</h4>
                      <p className="dark:text-zinc-400 text-gray-600 text-[13px] mb-4">Choose additional customizations on top of your base style and tone.</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm dark:text-zinc-200 text-gray-800">Warmth</span>
                          <select className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none">
                            <option className="dark:bg-zinc-900 bg-gray-100">Default</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">More</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">Less</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm dark:text-zinc-200 text-gray-800">Enthusiasm</span>
                          <select className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none">
                            <option className="dark:bg-zinc-900 bg-gray-100">More</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">Default</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">Less</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm dark:text-zinc-200 text-gray-800">Headers and Lists</span>
                          <select className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none">
                            <option className="dark:bg-zinc-900 bg-gray-100">Default</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">More</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">Less</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm dark:text-zinc-200 text-gray-800">Emoji</span>
                          <select className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none">
                            <option className="dark:bg-zinc-900 bg-gray-100">More</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">Default</option>
                            <option className="dark:bg-zinc-900 bg-gray-100">Less</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="pr-10">
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Fast answers</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">IntelliBot can sometimes use its general knowledge to give fast, in-depth answers. These aren't personalized and don't use your memory.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-10 h-5 dark:bg-white/10 bg-black/10 border dark:border-white/20 border-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all" style={{ backgroundColor: "var(--peer-checked-bg, rgba(255,255,255,0.1))" }} />
                        {/* We use a hack for dynamic peer checked background color using a style override in parent or just tailwind variables */}
                        <style>{`.peer:checked ~ div { background-color: ${activeColors.cyan} !important; border-color: ${activeColors.cyan} !important; }`}</style>
                      </label>
                    </div>

                    <div className="pt-2 pb-4">
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-3">Custom instructions</h4>
                      <textarea 
                        className="w-full h-32 dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-xl p-4 text-sm dark:text-zinc-200 text-gray-800 resize-none focus:outline-none focus:border-white/30"
                        defaultValue="I am a Machine Learning Engineer specializing in Computer Vision and real-time AI systems.&#10;&#10;My core expertise includes:&#10;- PyTorch, TensorFlow, YOLO, OpenCV"
                      />
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <ThemePicker />
                  </div>
                )}

                {/* General Tab */}
                {activeTab === "general" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Theme</h4>
                      </div>
                      <select 
                        value={mounted ? appTheme : "system"}
                        onChange={(e) => setAppTheme(e.target.value)}
                        className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none"
                      >
                        <option value="system" className="dark:bg-zinc-900 bg-gray-100">System</option>
                        <option value="dark" className="dark:bg-zinc-900 bg-gray-100">Dark</option>
                        <option value="light" className="dark:bg-zinc-900 bg-gray-100">Light</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Language Model</h4>
                      </div>
                      <select 
                        value={model}
                        onChange={(e) => saveSetting('preferredModel', e.target.value)}
                        className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none"
                      >
                        <option className="dark:bg-zinc-900 bg-gray-100">IntelliBot-Pro (GPT-4o)</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">IntelliBot-Fast (GPT-3.5)</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Command R+</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Clear all chats</h4>
                      </div>
                      <button 
                        onClick={async () => {
                          if (confirm('Are you sure you want to delete all chats? This cannot be undone.')) {
                            try {
                              await fetch('/api/chats', { method: 'DELETE' });
                              window.location.href = '/chat';
                            } catch (error) {
                              console.error('Failed to delete chats:', error);
                            }
                          }
                        }}
                        className="text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Data controls Tab */}
                {activeTab === "data_controls" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div className="pr-10">
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Chat history & training</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Save new chats on this browser to your history and allow them to be used to improve our models. Unsaved chats will be deleted from our systems within 30 days.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-10 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#10A37F]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Export data</h4>
                      </div>
                      <button className="dark:text-zinc-200 text-gray-800 hover:dark:text-white text-black dark:bg-white/5 bg-black/5 hover:dark:bg-white/10 bg-black/10 border dark:border-white/10 border-black/10 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        Export
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm text-red-500">Delete account</h4>
                      </div>
                      <button className="text-red-500 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        Delete
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Voice Tab */}
                {activeTab === "voice" && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Voice</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Choose the voice IntelliBot uses to speak aloud.</p>
                      </div>
                      <select 
                        value={voice}
                        onChange={(e) => saveSetting('preferredVoice', e.target.value)}
                        className="bg-transparent dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:dark:text-white text-black border-none"
                      >
                        <option className="dark:bg-zinc-900 bg-gray-100">Alloy</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Echo</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Fable</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Onyx</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Nova</option>
                        <option className="dark:bg-zinc-900 bg-gray-100">Shimmer</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* API Tab */}
                {activeTab === "api" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">OpenAI API Key</h4>
                      <p className="dark:text-zinc-400 text-gray-600 text-[13px] mb-4">Enter your own key to bypass usage limits.</p>
                      <div className="flex gap-3 max-w-md">
                        <input 
                          type="password" 
                          value={openAIKey}
                          onChange={(e) => setOpenAIKey(e.target.value)}
                          placeholder="sk-..." 
                          className="flex-1 dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-lg py-2 px-3 dark:text-white text-black text-sm focus:outline-none focus:dark:border-white/20 border-black/20 transition-colors"
                        />
                        <button onClick={handleSaveKeys} className="bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          {savedStatus || "Save"}
                        </button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t dark:border-white/10 border-black/10">
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">Cohere API Key</h4>
                      <p className="dark:text-zinc-400 text-gray-600 text-[13px] mb-4">For Command R and R+ models.</p>
                      <div className="flex gap-3 max-w-md">
                        <input 
                          type="password" 
                          value={cohereKey}
                          onChange={(e) => setCohereKey(e.target.value)}
                          placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxx" 
                          className="flex-1 dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-lg py-2 px-3 dark:text-white text-black text-sm focus:outline-none focus:dark:border-white/20 border-black/20 transition-colors"
                        />
                        <button onClick={handleSaveKeys} className="bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          {savedStatus || "Save"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === "billing" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold dark:text-white text-black mb-4">Upgrade your plan</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Free Plan */}
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-xl p-5 flex flex-col relative overflow-hidden">
                        <h4 className="text-lg font-medium dark:text-white text-black mb-1">Free</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-xs mb-4">For everyday tasks</p>
                        <div className="text-2xl font-semibold dark:text-white text-black mb-6">$0<span className="dark:text-zinc-400 text-gray-600 text-sm font-normal">/month</span></div>
                        
                        <button className="w-full dark:bg-white/10 bg-black/10 dark:text-white text-black px-4 py-2 rounded-lg text-sm font-medium mb-6 cursor-default">
                          Your current plan
                        </button>
                        
                        <div className="space-y-3 text-sm dark:text-zinc-200 text-gray-800 flex-1">
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Access to GPT-3.5</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Standard response speed</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Regular model updates</div>
                        </div>
                      </div>

                      {/* Plus Plan */}
                      <div className="border rounded-xl p-5 flex flex-col relative overflow-hidden" style={{ borderColor: activeColors.cyan, background: `linear-gradient(180deg, ${activeColors.glow1}20, transparent)` }}>
                        <div className="absolute top-0 right-0 p-4 opacity-30">
                          <Sparkles className="w-16 h-16" style={{ color: activeColors.cyan }} />
                        </div>
                        <h4 className="text-lg font-medium dark:text-white text-black mb-1 relative z-10">Plus</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-xs mb-4 relative z-10">For power users</p>
                        <div className="text-2xl font-semibold dark:text-white text-black mb-6 relative z-10">$20<span className="dark:text-zinc-400 text-gray-600 text-sm font-normal">/month</span></div>
                        
                        <button 
                          onClick={() => handleAction("Redirecting to Plus upgrade checkout...")}
                          className="w-full dark:text-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-6 relative z-10 shadow-lg hover:shadow-xl hover:opacity-90"
                          style={{ background: `linear-gradient(90deg, ${activeColors.glow1}, ${activeColors.glow2})` }}
                        >
                          Upgrade to Plus
                        </button>
                        
                        <div className="space-y-3 text-sm dark:text-zinc-200 text-gray-800 flex-1 relative z-10">
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Access to GPT-4o & Command R+</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Faster response speed</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Priority access during peak times</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Advanced data analysis</div>
                        </div>
                      </div>

                      {/* Pro/Team Plan */}
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-xl p-5 flex flex-col relative overflow-hidden">
                        <h4 className="text-lg font-medium dark:text-white text-black mb-1">Team</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-xs mb-4">For collaborative teams</p>
                        <div className="text-2xl font-semibold dark:text-white text-black mb-6">$30<span className="dark:text-zinc-400 text-gray-600 text-sm font-normal">/user/mo</span></div>
                        
                        <button 
                          onClick={() => handleAction("Redirecting to Team workspace setup...")}
                          className="w-full bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors mb-6"
                        >
                          Upgrade to Team
                        </button>
                        
                        <div className="space-y-3 text-sm dark:text-zinc-200 text-gray-800 flex-1">
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Everything in Plus</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Higher message limits</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Admin workspace console</div>
                          <div className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#10A37F] mt-1.5 shrink-0" /> Team data exclusion from training</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t dark:border-white/10 border-black/10">
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm font-medium mb-4">Payment Methods</h4>
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-white p-2 rounded flex items-center justify-center w-12 h-8">
                            <span className="text-[#1A1F36] font-bold text-xs">VISA</span>
                          </div>
                          <div>
                            <p className="dark:text-white text-black text-sm">Visa ending in 4242</p>
                            <p className="dark:text-zinc-400 text-gray-600 text-xs">Expires 12/28</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAction("Opening payment method editor...")}
                          className="dark:text-zinc-400 text-gray-600 hover:dark:text-white text-black text-sm transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                      <button 
                        onClick={() => handleAction("Opening Add Payment Method form...")}
                        className="mt-4 text-[#10A37F] hover:text-[#0E906F] text-sm font-medium transition-colors"
                      >
                        + Add payment method
                      </button>
                    </div>

                    <div className="mt-8 pt-8 border-t dark:border-white/10 border-black/10">
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm font-medium mb-4">Billing History</h4>
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-sm">
                          <thead className="dark:bg-white/5 bg-black/5 dark:text-zinc-400 text-gray-600 text-xs uppercase">
                            <tr>
                              <th className="px-4 py-3 font-medium">Date</th>
                              <th className="px-4 py-3 font-medium">Amount</th>
                              <th className="px-4 py-3 font-medium">Plan</th>
                              <th className="px-4 py-3 font-medium text-right">Invoice</th>
                            </tr>
                          </thead>
                          <tbody className="dark:text-zinc-200 text-gray-800 divide-y divide-white/10">
                            <tr>
                              <td className="px-4 py-3">Sep 1, 2026</td>
                              <td className="px-4 py-3">$0.00</td>
                              <td className="px-4 py-3">Free</td>
                              <td className="px-4 py-3 text-right">
                                <button 
                                  onClick={() => handleAction("Downloading invoice for Sep 1, 2026...")}
                                  className="dark:text-zinc-400 text-gray-600 hover:dark:text-white text-black transition-colors"
                                >
                                  Download
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3">Aug 1, 2026</td>
                              <td className="px-4 py-3">$0.00</td>
                              <td className="px-4 py-3">Free</td>
                              <td className="px-4 py-3 text-right">
                                <button 
                                  onClick={() => handleAction("Downloading invoice for Aug 1, 2026...")}
                                  className="dark:text-zinc-400 text-gray-600 hover:dark:text-white text-black transition-colors"
                                >
                                  Download
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="space-y-8">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                      {profilePic ? (
                        <div 
                          className="w-20 h-20 rounded-full shadow-lg bg-cover bg-center border dark:border-white/20 border-black/20" 
                          style={{ backgroundImage: `url(${profilePic})` }}
                        />
                      ) : (
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center dark:text-white text-black text-3xl font-bold shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-white/30"
                          style={{ background: `linear-gradient(135deg, ${activeColors.glow1}, ${activeColors.glow2})` }}
                        >
                          P
                        </div>
                      )}
                      <div className="space-y-2">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="dark:text-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-transparent hover:border-white/20"
                          style={{ background: `linear-gradient(135deg, ${activeColors.glow1}40, ${activeColors.glow2}40)` }}
                        >
                          Upload new picture
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleAvatarUpload} 
                          accept="image/jpeg, image/png" 
                          className="hidden" 
                        />
                        <p className="dark:text-zinc-400 text-gray-600 text-xs">At least 800x800 px recommended. JPG or PNG.</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">Display Name</h4>
                        <input 
                          type="text" 
                          defaultValue="Pro User"
                          className="w-full max-w-md dark:bg-black/40 bg-white/50 backdrop-blur-md border dark:border-white/20 border-black/20 rounded-lg py-2.5 px-3 dark:text-white text-black text-sm focus:outline-none focus:ring-2 shadow-inner transition-all"
                          style={{ '--tw-ring-color': activeColors.cyan } as any}
                        />
                        <p className="dark:text-zinc-400 text-gray-600 text-xs mt-1.5">This is the name that will be displayed in your profile and chat.</p>
                      </div>
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">Email Address</h4>
                        <div className="w-full max-w-md relative">
                          <input 
                            type="email" 
                            defaultValue="user@example.com"
                            className="w-full dark:bg-black/40 bg-white/50 backdrop-blur-md border dark:border-white/20 border-black/20 rounded-lg py-2.5 px-3 dark:text-white text-black text-sm focus:outline-none opacity-60 cursor-not-allowed shadow-inner"
                            disabled
                          />
                          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 dark:text-zinc-400 text-gray-600" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">Language</h4>
                        <select 
                          className="w-full dark:bg-black/40 bg-white/50 backdrop-blur-md border dark:border-white/20 border-black/20 dark:text-white text-black text-sm outline-none cursor-pointer py-2.5 px-3 rounded-lg appearance-none focus:ring-2 shadow-inner transition-all"
                          style={{ '--tw-ring-color': activeColors.cyan } as any}
                        >
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                        </select>
                      </div>
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-1">Timezone</h4>
                        <select 
                          className="w-full dark:bg-black/40 bg-white/50 backdrop-blur-md border dark:border-white/20 border-black/20 dark:text-white text-black text-sm outline-none cursor-pointer py-2.5 px-3 rounded-lg appearance-none focus:ring-2 shadow-inner transition-all"
                          style={{ '--tw-ring-color': activeColors.cyan } as any}
                        >
                          <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                          <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                          <option>(GMT+00:00) London</option>
                          <option>(GMT+01:00) Central European Time</option>
                          <option>(GMT+09:00) Tokyo</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-8 border-t dark:border-white/10 border-black/10">
                      <h4 className="text-red-400 text-sm font-medium mb-1">Danger Zone</h4>
                      <p className="dark:text-zinc-400 text-gray-600 text-[13px] mb-4">Permanently delete your account and all associated data.</p>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                            handleAction("Account deletion initiated.");
                          }
                        }}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Theme Mode</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Toggle between light and dark themes.</p>
                      </div>
                      <select className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/20 border-black/20 dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:border-white/40 py-1.5 px-3 rounded-lg">
                        <option value="system">System Default</option>
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Browser Notifications</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Receive desktop alerts when a response is ready.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('browserNotifications')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.browserNotifications ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.browserNotifications ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Marketing Emails</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Receive news, offers, and survey invitations.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('marketingEmails')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.marketingEmails ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.marketingEmails ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Security and login Tab */}
                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Multi-factor authentication</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Require an extra security step when logging in.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('mfa')}
                        className={`px-4 py-1.5 rounded-lg text-sm transition-colors font-medium ${toggles.mfa ? 'bg-[#10A37F] dark:text-white text-black' : 'dark:bg-white/10 bg-black/10 hover:bg-white/20 dark:text-white text-black'}`}
                      >
                        {toggles.mfa ? 'Enabled' : 'Enable'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Change Password</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Update the password used to log into your account.</p>
                      </div>
                      <button 
                        onClick={() => handleAction("Sending password reset link to your email...")}
                        className="dark:bg-white/10 bg-black/10 hover:bg-white/20 dark:text-white text-black px-4 py-1.5 rounded-lg text-sm transition-colors"
                      >
                        Update
                      </button>
                    </div>
                    <div>
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-3">Active Sessions</h4>
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 rounded-lg p-3 border dark:border-white/10 border-black/10 flex items-center justify-between">
                        <div>
                          <p className="dark:text-white text-black text-sm">Windows • Chrome</p>
                          <p className="dark:text-zinc-400 text-gray-600 text-xs">Current session • New York, US</p>
                        </div>
                        <span className="text-green-400 text-xs font-medium">Active now</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Safety Tab */}
                {activeTab === "safety" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Content Filters</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Automatically block sensitive or inappropriate content in responses.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('contentFilters')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.contentFilters ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.contentFilters ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Safe Search Level</h4>
                      </div>
                      <select className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/20 border-black/20 dark:text-zinc-200 text-gray-800 text-sm outline-none cursor-pointer hover:border-white/40 py-1.5 px-3 rounded-lg">
                        <option>Strict</option>
                        <option>Moderate</option>
                        <option>Off</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Storage Tab */}
                {activeTab === "storage" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-3">Local Cache Usage</h4>
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 rounded-lg p-4 border dark:border-white/10 border-black/10">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="dark:text-white text-black">12.4 MB Used</span>
                          <span className="dark:text-zinc-400 text-gray-600">500 MB Limit</span>
                        </div>
                        <div className="w-full dark:bg-white/10 bg-black/10 rounded-full h-2 mb-4">
                          <div className="bg-[#10A37F] h-2 rounded-full" style={{ width: '2.5%' }} />
                        </div>
                        <button 
                          onClick={() => {
                            handleAction("Cache cleared successfully. 12.4 MB freed.");
                            // We could also simulate cache emptying via state, but alert is fine for now
                          }}
                          className="dark:text-zinc-400 text-gray-600 hover:dark:text-white text-black text-sm underline transition-colors"
                        >
                          Clear cache & temporary files
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === "analytics" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Improve IntelliBot</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Share anonymous usage data to help us improve the app.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('improveIntelliBot')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.improveIntelliBot ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.improveIntelliBot ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Crash Reports</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Automatically send diagnostic data if the app crashes.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('crashReports')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.crashReports ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.crashReports ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Usage Tab */}
                {activeTab === "usage" && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium dark:text-white text-black mb-4">Current Billing Cycle</h3>
                    <div className="dark:bg-zinc-900/50 bg-gray-100/50 border dark:border-white/10 border-black/10 rounded-xl p-5">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="dark:text-zinc-200 text-gray-800">GPT-4o Messages</span>
                        <span className="dark:text-white text-black font-medium">42 / 500</span>
                      </div>
                      <div className="w-full dark:bg-white/10 bg-black/10 rounded-full h-2 mb-6">
                        <div className="bg-[#10A37F] h-2 rounded-full" style={{ width: '8.4%' }} />
                      </div>

                      <div className="flex justify-between text-sm mb-2">
                        <span className="dark:text-zinc-200 text-gray-800">Command R+ Messages</span>
                        <span className="dark:text-white text-black font-medium">120 / Unlimited</span>
                      </div>
                      <div className="w-full dark:bg-white/10 bg-black/10 rounded-full h-2 mb-6">
                        <div className="bg-[#00E5FF] h-2 rounded-full" style={{ width: '10%' }} />
                      </div>

                      <p className="text-xs dark:text-zinc-400 text-gray-600">Your limits will reset on Oct 15, 2026.</p>
                    </div>
                  </div>
                )}

                {/* Plugins Tab */}
                {activeTab === "plugins" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Web Browsing</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Allow IntelliBot to search the live internet for recent info.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('webBrowsing')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.webBrowsing ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.webBrowsing ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Code Interpreter</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Let the AI execute python code in a sandbox environment.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('codeInterpreter')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.codeInterpreter ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.codeInterpreter ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <button className="w-full border dark:border-white/20 border-black/20 dark:text-white text-black hover:dark:bg-white/5 bg-black/5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                      Browse Plugin Store
                    </button>
                  </div>
                )}

                {/* Parental Tab */}
                {activeTab === "parental" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Restrict explicit content</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Filter out mature or sensitive responses automatically.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('restrictExplicit')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.restrictExplicit ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.restrictExplicit ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Require PIN to change settings</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Lock these parental controls behind a 4-digit PIN.</p>
                      </div>
                      <button 
                        onClick={() => toggleSetting('requirePIN')}
                        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${toggles.requirePIN ? 'bg-[#10A37F]' : 'dark:bg-white/10 bg-black/10'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggles.requirePIN ? 'translate-x-4' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div>
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-3">Family Group</h4>
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 rounded-lg p-4 border dark:border-white/10 border-black/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 dark:text-zinc-400 text-gray-600" />
                          <div>
                            <p className="dark:text-white text-black text-sm">Not in a family group</p>
                            <p className="dark:text-zinc-400 text-gray-600 text-xs">Invite members to manage shared limits.</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleAction("Initializing Family Group setup...")}
                          className="dark:bg-white/10 bg-black/10 hover:bg-white/20 dark:text-white text-black px-4 py-1.5 rounded-lg text-sm transition-colors"
                        >
                          Setup
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Trusted Contact Tab */}
                {activeTab === "trusted" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b dark:border-white/10 border-black/10">
                      <div>
                        <h4 className="dark:text-zinc-200 text-gray-800 text-sm">Account Recovery</h4>
                        <p className="dark:text-zinc-400 text-gray-600 text-[13px] mt-0.5">Let trusted contacts help you recover your account if you get locked out.</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="dark:text-zinc-200 text-gray-800 text-sm mb-3">Your trusted contacts</h4>
                      <div className="dark:bg-zinc-900/50 bg-gray-100/50 rounded-lg p-4 border dark:border-white/10 border-black/10 flex flex-col items-center justify-center py-8">
                        <HeartHandshake className="w-8 h-8 dark:text-zinc-400 text-gray-600 mb-3" />
                        <p className="dark:text-white text-black text-sm mb-1">No contacts added</p>
                        <p className="dark:text-zinc-400 text-gray-600 text-xs mb-4">Add a trusted friend or family member.</p>
                        <button 
                          onClick={() => {
                            const email = window.prompt("Enter trusted contact's email address:");
                            if (email) handleAction(`Invite sent to ${email}`);
                          }}
                          className="bg-[#10A37F] hover:bg-[#0E906F] dark:text-white text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Add a contact
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Fallback for other tabs */}
                {!["personalization", "appearance", "general", "api", "data_controls", "voice", "billing", "profile", "security", "safety", "storage", "analytics", "usage", "plugins", "parental", "trusted"].includes(activeTab) && (
                  <div className="text-center py-20 dark:text-zinc-400 text-gray-600 text-sm">
                    Content for {tabs.find(t => t.id === activeTab)?.label} will be available soon.
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
