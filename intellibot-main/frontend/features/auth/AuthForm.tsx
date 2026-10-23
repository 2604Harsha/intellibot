"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Globe, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

// Zod Schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    console.log("Authenticated:", values);
    // Placeholder redirect to main app
    router.push("/chat");
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Animated gradient border simulation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#5436DA]/20 via-transparent to-[#00E5FF]/20 opacity-50 blur-xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl font-space font-bold mb-2 tracking-tight">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>
        <p className="text-[#A1A1AA] mb-8 text-sm">
          {isLogin
            ? "Enter your details to access your workspace."
            : "Sign up to start building with intelligence."}
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-[#A1A1AA]" />
              <input
                {...form.register("email")}
                placeholder="Email address"
                className="w-full bg-[#05060A]/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-[#ECECF1] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#5436DA] focus:border-transparent transition-all"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-[#A1A1AA]" />
              <input
                type="password"
                {...form.register("password")}
                placeholder="Password"
                className="w-full bg-[#05060A]/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-[#ECECF1] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#5436DA] focus:border-transparent transition-all"
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {isLogin && (
            <div className="flex justify-between items-center text-xs text-[#A1A1AA]">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                <input type="checkbox" className="rounded bg-black border-white/20 text-[#5436DA] focus:ring-[#5436DA]" />
                Remember me
              </label>
              <a href="#" className="hover:text-[#00E5FF] transition-colors">Forgot password?</a>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ECECF1] text-[#05060A] font-semibold py-3 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-5 h-5 border-2 border-[#05060A] border-t-transparent rounded-full"
              />
            ) : (
              <>
                {isLogin ? "Sign in" : "Sign up"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-white/10 after:h-[1px] after:flex-1 after:bg-white/10">
          <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">Or continue with</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm">
            <Globe className="w-4 h-4" /> Google
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-sm">
            <span className="w-4 h-4 font-bold">GH</span> GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-[#A1A1AA]">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#00E5FF] hover:underline focus:outline-none"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/chat")}
            className="text-xs text-[#A1A1AA] hover:text-white underline transition-colors"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
}
