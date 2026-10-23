"use client";

import { motion } from "framer-motion";
import { X, Play, Copy, Check, Terminal, ExternalLink, Download } from "lucide-react";
import { useState } from "react";

interface ArtifactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  code?: string;
  language?: string;
}

export function ArtifactPanel({ isOpen, onClose, title = "Data Analysis Script", code = 'print("Hello World")', language = "python" }: ArtifactPanelProps) {
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      setOutput("Connecting to sandbox...\n[Sandbox] Container started in 42ms.\n\nHello World\n\n[Sandbox] Execution completed successfully.");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, width: 0, x: 20 }}
      animate={{ opacity: 1, width: "50%", x: 0 }}
      exit={{ opacity: 0, width: 0, x: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-full bg-[#05060A] border-l border-white/10 flex flex-col shrink-0 overflow-hidden relative shadow-2xl"
    >
      {/* Header */}
      <div className="h-14 shrink-0 border-b border-white/10 flex items-center justify-between px-4 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-[#10A37F]/20 text-[#10A37F] rounded-md">
            <Terminal className="w-4 h-4" />
          </div>
          <span className="text-white font-medium text-sm truncate">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleRun} disabled={isRunning} className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-3 py-1.5 rounded-md text-xs font-medium transition-colors disabled:opacity-50">
            <Play className="w-3.5 h-3.5" />
            {isRunning ? "Running..." : "Run"}
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button className="p-1.5 text-zinc-400 hover:text-white transition-colors" title="Open in new window">
            <ExternalLink className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white transition-colors" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-auto relative bg-[#0D0D11] p-4 font-mono text-[13px] text-zinc-300 leading-relaxed scrollbar-premium">
          <div className="absolute top-2 right-2 z-10 flex gap-2">
            <button onClick={handleCopy} className="p-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-zinc-400 hover:text-white transition-colors">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <pre><code>{code}</code></pre>
        </div>

        {/* Console Output */}
        {output && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "30%", opacity: 1 }}
            className="border-t border-white/10 bg-[#05060A] flex flex-col shrink-0"
          >
            <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Terminal Output</span>
              <button onClick={() => setOutput(null)} className="text-zinc-500 hover:text-white">
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto font-mono text-[12px] text-zinc-300 whitespace-pre-wrap scrollbar-premium">
              {output}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
