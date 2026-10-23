"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { themeConfig } from "@/lib/theme.config";
import { ParticleConstellation } from "./ParticleConstellation";

export function IntroSequence() {
  const router = useRouter();
  const [stage, setStage] = useState(0); // 0: Silence, 1: Spark, 2: Text 1, 3: Text 2, 4: Text 3, 5: Orb/Reveal
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Master timeline orchestration
    const timeline = [
      { delay: 2000, nextStage: 1 }, // Spark explodes
      { delay: 4000, nextStage: 2 }, // Text 1
      { delay: 6000, nextStage: 3 }, // Text 2
      { delay: 8000, nextStage: 4 }, // Text 3
      { delay: 10000, nextStage: 5 }, // Reveal Orb & Handoff
    ];

    let timeouts: NodeJS.Timeout[] = [];

    if (!isSkipped) {
      timeline.forEach(({ delay, nextStage }) => {
        timeouts.push(setTimeout(() => setStage(nextStage), delay));
      });
      // Transition to auth after 14s
      timeouts.push(setTimeout(() => handleComplete(), 14000));
    }

    return () => timeouts.forEach(clearTimeout);
  }, [isSkipped]);

  const handleComplete = () => {
    localStorage.setItem("intro_seen", "true");
    router.push("/auth/login");
  };

  if (isSkipped) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#05060A] text-[#ECECF1] overflow-hidden flex items-center justify-center">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ParticleConstellation stage={stage} />
        </Canvas>
      </div>

      {/* Cinematic Text Overlay */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <AnimatePresence mode="wait">
          {stage === 2 && (
            <motion.h1
              key="text1"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-space font-light tracking-wide"
            >
              {themeConfig.intro.lines[0]}
            </motion.h1>
          )}
          {stage === 3 && (
            <motion.h1
              key="text2"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-space font-light tracking-wide"
            >
              {themeConfig.intro.lines[1]}
            </motion.h1>
          )}
          {stage === 4 && (
            <motion.h1
              key="text3"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-space font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#5436DA] to-[#00E5FF]"
            >
              {themeConfig.intro.lines[2]}
            </motion.h1>
          )}
          {stage === 5 && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 mt-20"
            >
              <h1 className="text-5xl md:text-7xl font-space font-bold tracking-tighter text-white">
                {themeConfig.name}
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-inter font-light">
                {themeConfig.tagline}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: stage > 0 ? 0.5 : 0 }}
        whileHover={{ opacity: 1 }}
        onClick={() => {
          setIsSkipped(true);
          handleComplete();
        }}
        className="absolute bottom-8 right-8 text-sm font-inter uppercase tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors z-50"
      >
        Skip Intro
      </motion.button>
    </div>
  );
}
