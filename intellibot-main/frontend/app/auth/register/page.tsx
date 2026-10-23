"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Mail, Lock, LogIn, Loader2, X, Zap, Shield, Brain, Eye, EyeOff, Activity, CheckCircle2, User } from "lucide-react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const Particles = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen z-0">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100 + 10}%`,
          }}
          animate={{
            top: "-5%",
            opacity: [0, Math.random() * 0.5 + 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}

export default function RegisterPage() {
  const isSignUp = true
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  
  const router = useRouter()

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, text: "", color: "bg-gray-500" };
    
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score < 3) return { score, text: "Weak", color: "bg-red-500" };
    if (score < 5) return { score, text: "Medium", color: "bg-yellow-500" };
    return { score, text: "Strong", color: "bg-green-500" };
  }

  const strength = getPasswordStrength(password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isSignUp) {
        if (!termsAccepted) {
          setError("You must accept the Terms and Conditions to create an account.")
          setIsLoading(false)
          return
        }
        if (email !== confirmEmail) {
          setError("Emails do not match")
          setIsLoading(false)
          return
        }
        if (password !== confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }
        if (strength.score < 5) {
          setError("Password is too weak. Please include at least 8 characters, uppercase, lowercase, numbers, and special characters.")
          setIsLoading(false)
          return
        }

        // Register the user
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        })
        
        if (!res.ok) {
          const errText = await res.text()
          throw new Error(errText)
        }
      }

      // Redirect to login page after successful registration
      router.push("/auth/login?registered=true")
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex min-h-screen bg-[#030407] relative font-sans overflow-x-hidden w-full">
      {/* Animated Ambient Glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-[#5436DA]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-[20%] -right-[10%] w-[800px] h-[800px] bg-[#00E5FF]/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none" 
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Floating Particles */}
      <Particles />

      {/* Full Bleed Background Image */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="w-full h-full relative"
        >
          <Image 
            src="/robot-avatar-2.jpg" 
            alt="AI Robot" 
            fill
            className="object-cover mix-blend-screen"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030407] via-[#030407]/80 to-[#030407]/40 z-10" />
      </div>

      {/* Left Marketing Column */}
      <div className="hidden lg:flex flex-col justify-center items-start w-[55%] p-24 z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#2A85FF]/10 border border-[#2A85FF]/20 rounded-full mb-8 w-fit">
            <div className="w-2 h-2 rounded-full bg-[#2A85FF]" />
            <span className="text-white text-xs font-medium tracking-wide">Join the Network</span>
          </div>
          
          <h1 className="text-5xl lg:text-[4.5rem] font-extrabold tracking-tighter text-white mb-6 leading-[1.05]">
            Accelerate <br/><span className="text-[#2A85FF]">Developer<br/>Productivity.</span>
          </h1>
          
          <p className="text-lg text-[#A1A1AA] max-w-lg mb-16 leading-relaxed font-light tracking-wide">
            Join thousands of global developers and researchers analyzing complex datasets and writing code in real-time.
          </p>

          <div className="flex items-center gap-12">
            <div>
              <div className="text-3xl font-bold text-white mb-1">15k+</div>
              <div className="text-[11px] text-[#A1A1AA] font-bold tracking-widest uppercase">Developers</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-white mb-1">50M+</div>
              <div className="text-[11px] text-[#A1A1AA] font-bold tracking-widest uppercase">Lines Written</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-[11px] text-[#A1A1AA] font-bold tracking-widest uppercase">Support</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Form Column */}
      <div className="w-full lg:w-[45%] flex flex-col items-center justify-center p-4 sm:p-12 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="w-full max-w-[420px]"
        >
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-14 h-14 bg-[#0A0C14] border border-[#00E5FF]/30 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.15)]">
              <Activity className="w-7 h-7 text-[#00E5FF]" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tighter text-white">
              Create Account
            </h2>
            <p className="text-[#A1A1AA] text-sm mt-3 font-light">
              Join IntelliBot PRO for advanced intelligence
            </p>
          </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-white ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required={isSignUp}
                  disabled={isLoading}
                  className="w-full bg-[#0A0C14]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-[#ECECF1] focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/30 transition-all placeholder-[#A1A1AA]/30"
                />
              </div>
            </motion.div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A1A1AA] transition-colors" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                required
                disabled={isLoading}
                className="w-full bg-[#0A0C14]/80 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm text-[#ECECF1] focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/30 transition-all placeholder-[#A1A1AA]/30"
              />
            </div>
          </div>

          {isSignUp && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-white ml-1">Confirm Email</label>
              <div className="relative group">
                <input 
                  type="email" 
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="Confirm your email"
                  required={isSignUp}
                  disabled={isLoading}
                  className="w-full bg-[#0A0C14]/80 border border-white/10 rounded-xl py-3.5 px-4 text-sm text-[#ECECF1] focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/30 transition-all placeholder-[#A1A1AA]/30"
                />
              </div>
            </motion.div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-white ml-1">Password</label>
            <div className="relative group">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="w-full bg-[#0A0C14]/80 border border-white/10 rounded-xl py-3.5 px-4 pr-12 text-sm text-[#ECECF1] focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/30 transition-all placeholder-[#A1A1AA]/30"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isSignUp && password && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <div className="flex gap-1 h-1 w-full rounded-full overflow-hidden bg-white/5">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div 
                    key={level}
                    className={`h-full flex-1 transition-colors duration-300 ${
                      strength.score >= level ? strength.color : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs ${
                strength.score < 3 ? 'text-red-400' : 
                strength.score < 5 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                Password Strength: {strength.text}
              </p>
            </motion.div>
          )}

          {isSignUp && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <label className="text-sm font-medium text-white ml-1">Confirm Password</label>
              <div className="relative group">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required={isSignUp}
                  disabled={isLoading}
                  className="w-full bg-[#0A0C14]/80 border border-white/10 rounded-xl py-3.5 px-4 pr-12 text-sm text-[#ECECF1] focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/30 transition-all placeholder-[#A1A1AA]/30"
                />
              </div>
            </motion.div>
          )}

          {isSignUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 mt-4"
            >
              <div className="relative flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#5436DA] focus:ring-[#5436DA]/50 focus:ring-offset-0 cursor-pointer transition-colors"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="terms" className="text-[#A1A1AA] cursor-pointer">
                    I accept the{' '}
                    <button type="button" onClick={() => setShowTerms(true)} className="text-[#00E5FF] hover:underline focus:outline-none">
                      Terms and Conditions
                    </button>
                    {' '}and{' '}
                    <button type="button" onClick={() => setShowPrivacy(true)} className="text-[#00E5FF] hover:underline focus:outline-none">
                      Privacy Policy
                    </button>.
                  </label>
                </div>
              </div>
            </motion.div>
          )}
          
          {!isSignUp && (
            <div className="flex items-center justify-between text-sm mt-4">
              <label className="flex items-center cursor-pointer text-[#A1A1AA] hover:text-white transition-colors">
                <input 
                  type="checkbox" 
                  className="sr-only"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <div className={`w-4 h-4 mr-2 rounded-full border ${rememberMe ? 'bg-[#00E5FF] border-[#00E5FF]' : 'border-white/20'} flex items-center justify-center transition-colors`}>
                  {rememberMe && <CheckCircle2 className="w-3 h-3 text-[#030407]" />}
                </div>
                Remember me
              </label>
              <button type="button" className="text-[#00E5FF] hover:text-[#00E5FF]/80 transition-colors font-medium">
                Forgot password?
              </button>
            </div>
          )}

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#2A85FF] hover:bg-[#2A85FF]/90 text-white rounded-xl py-3.5 font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>{isSignUp ? "Create Account" : "Sign In"}</>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center flex flex-col items-center">
          <p className="text-sm text-[#A1A1AA]">
            Already have an account?
            <Link 
              href="/auth/login"
              className="ml-2 text-[#00E5FF] hover:text-white transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
          
          <div className="mt-8 flex items-center gap-2 text-[11px] text-[#A1A1AA]/60 uppercase tracking-widest font-semibold">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
            Secure AI platform • Enterprise-grade design
          </div>
        </div>
      </motion.div>
    </div>
      {/* Terms and Conditions Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#05060A] border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col shadow-[0_0_50px_rgba(84,54,218,0.3)]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-space font-medium text-white">Terms and Conditions</h3>
                <button onClick={() => setShowTerms(false)} className="text-[#A1A1AA] hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto pr-2 space-y-4 text-sm text-[#A1A1AA] custom-scrollbar">
                <p>Welcome to IntelliBot PRO. By accessing or using our platform, you agree to be bound by these Terms and Conditions.</p>
                <h4 className="text-white font-medium">1. Acceptable Use</h4>
                <p>You agree not to use the AI assistant to generate harmful, illegal, or abusive content. We reserve the right to terminate accounts that violate this policy.</p>
                <h4 className="text-white font-medium">2. Data and Privacy</h4>
                <p>Your conversations may be temporarily stored to provide context to the AI. You retain ownership of your inputs, but grant us a license to process them to provide the service.</p>
                <h4 className="text-white font-medium">3. Limitation of Liability</h4>
                <p>IntelliBot PRO is provided "as is". We are not responsible for any decisions made based on the AI's output, as AI can occasionally produce inaccurate information (hallucinations).</p>
                <p>By checking the box, you confirm that you have read and agree to these terms.</p>
              </div>
              <button 
                onClick={() => setShowTerms(false)}
                className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#05060A] border border-white/10 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.2)]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-space font-medium text-white">Privacy Policy</h3>
                <button onClick={() => setShowPrivacy(false)} className="text-[#A1A1AA] hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto pr-2 space-y-4 text-sm text-[#A1A1AA] custom-scrollbar">
                <p>Your privacy is important to us. This policy outlines how we collect, use, and protect your data.</p>
                <h4 className="text-white font-medium">1. Information Collection</h4>
                <p>We collect your email address, name (if provided), and the chat messages you send to IntelliBot PRO to function and improve the service.</p>
                <h4 className="text-white font-medium">2. Security</h4>
                <p>We use industry-standard encryption to protect your account. Passwords are securely hashed using bcrypt and are never stored in plaintext.</p>
                <h4 className="text-white font-medium">3. Third-Party Sharing</h4>
                <p>We do not sell your personal data. We only share necessary data with LLM providers (e.g., OpenAI) for the sole purpose of generating responses.</p>
                <p>By checking the box, you confirm that you have read and agree to our data handling practices.</p>
              </div>
              <button 
                onClick={() => setShowPrivacy(false)}
                className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
