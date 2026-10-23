"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Sparkles, Code, PenTool, Brain, Search as SearchIcon } from "lucide-react";
import { useState } from "react";

interface PromptLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt?: (prompt: string) => void;
}

const PROMPT_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coding", label: "Coding" },
  { id: "writing", label: "Writing" },
  { id: "analysis", label: "Analysis" },
];

const PROMPTS = [
  {
    id: 1,
    title: "Senior React Developer",
    category: "coding",
    icon: Code,
    description: "Act as an expert React developer. Write clean, modular, and extremely performant code using the latest patterns.",
    prompt: "Act as a senior React developer. I will provide you with a task, and you will respond with production-ready, highly optimized, and thoroughly commented React code. Use modern hooks and Next.js App Router conventions."
  },
  {
    id: 2,
    title: "Expert Copywriter",
    category: "writing",
    icon: PenTool,
    description: "Generate highly engaging, SEO-optimized copy designed to convert readers.",
    prompt: "Act as an expert SEO copywriter. Write highly engaging, persuasive, and conversion-optimized content. Focus on strong hooks, active voice, and clear formatting."
  },
  {
    id: 3,
    title: "Data Analyst",
    category: "analysis",
    icon: Brain,
    description: "Analyze complex datasets and extract actionable business insights.",
    prompt: "Act as a senior data analyst. I will provide a scenario or data snippet. You will break down the trends, identify outliers, and suggest actionable business strategies based on the numbers."
  },
  {
    id: 4,
    title: "System Architect",
    category: "coding",
    icon: SearchIcon,
    description: "Design highly scalable cloud architectures and microservices.",
    prompt: "Act as a Principal Cloud Architect. Design a scalable, resilient system architecture for the following requirements. Propose specific AWS/GCP services and explain trade-offs."
  }
];

export function PromptLibraryModal({ isOpen, onClose, onSelectPrompt }: PromptLibraryModalProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrompts = PROMPTS.filter(p => 
    (activeCategory === "all" || p.category === activeCategory) &&
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="w-full max-w-4xl bg-[#09090B] border border-white/10 rounded-2xl shadow-2xl flex flex-col h-[80vh] max-h-[800px] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#10A37F] to-[#0E906F] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Prompt Library</h2>
                  <p className="text-zinc-400 text-sm">Pre-optimized templates for the best results.</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Toolbar */}
            <div className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                {PROMPT_CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-white text-black shadow-md' 
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search prompts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-premium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPrompts.map(prompt => (
                  <div 
                    key={prompt.id} 
                    className="group bg-zinc-900/50 border border-white/5 hover:border-white/20 rounded-xl p-5 transition-all hover:bg-zinc-900 cursor-pointer"
                    onClick={() => {
                      if (onSelectPrompt) onSelectPrompt(prompt.prompt);
                      onClose();
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/5 rounded-lg text-white">
                          <prompt.icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-white font-medium">{prompt.title}</h3>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-white/5 px-2 py-1 rounded-full">
                        {prompt.category}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {prompt.description}
                    </p>
                    <div className="text-[#10A37F] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Use this prompt →
                    </div>
                  </div>
                ))}
              </div>
              {filteredPrompts.length === 0 && (
                <div className="text-center py-20 text-zinc-500">
                  No prompts found matching your criteria.
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
