import React, { useState } from "react";
import { Headset, Bot, PhoneCall, User, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (username: string) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Please enter your admin username");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);

    // Realistic authentication delay with smooth feedback
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess(username);
      }, 600);
    }, 700);
  };

  const handleQuickFill = () => {
    setUsername("admin");
    setPassword("callingAgent@2026");
    setError(null);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050b17] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Background Ambient Glows & Laser Beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial background aura behind center card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-600/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-500/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px]" />

        {/* Diagonal Glowing Laser Streaks (Matching the screenshot exactly) */}
        <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Cyan Laser Beam Gradient */}
            <linearGradient id="cyanLaser" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>

            {/* Violet Laser Beam Gradient */}
            <linearGradient id="purpleLaser" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="40%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#6366f1" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>

            {/* Subtle Horizon Blue Beam */}
            <linearGradient id="horizonBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Diagonal Laser lines slicing across background */}
          <line x1="-10%" y1="38%" x2="110%" y2="52%" stroke="url(#cyanLaser)" strokeWidth="1.6" />
          <line x1="-15%" y1="78%" x2="115%" y2="18%" stroke="url(#purpleLaser)" strokeWidth="1.8" />
          <line x1="-5%" y1="20%" x2="105%" y2="40%" stroke="url(#cyanLaser)" strokeWidth="0.75" strokeOpacity="0.4" />
          <line x1="-10%" y1="88%" x2="110%" y2="65%" stroke="url(#horizonBeam)" strokeWidth="1" />
        </svg>

        {/* Ambient Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.7) 1px, transparent 0)`,
            backgroundSize: "36px 36px"
          }}
        />
      </div>

      {/* Main Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-[430px]">
        {/* Outer Glow Halo behind Card */}
        <div className="absolute -inset-1 bg-gradient-to-b from-sky-500/20 via-blue-500/10 to-transparent rounded-[32px] blur-xl opacity-75 pointer-events-none" />

        <div className="relative rounded-[28px] bg-[#0c162d]/85 backdrop-blur-2xl border border-sky-400/25 p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(14,165,233,0.18),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all">
          
          {/* Top Circular Icon Badge */}
          <div className="flex justify-center -mt-1 mb-5">
            <div className="relative">
              {/* Outer Neon Glow */}
              <div className="absolute inset-0 rounded-full bg-sky-400 blur-lg opacity-80 scale-110" />
              
              {/* Center Gradient Circle */}
              <div className="relative size-18 rounded-full bg-gradient-to-b from-[#0ea5e9] to-[#0284c7] flex items-center justify-center border-2 border-sky-300/40 shadow-[0_0_28px_rgba(14,165,233,0.8),inset_0_2px_4px_rgba(255,255,255,0.4)]">
                <Headset className="size-9 text-white stroke-[2.2]" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-[27px] font-extrabold text-white tracking-[0.16em] leading-tight">
              CALLING AGENT
            </h1>
            <p className="text-[11px] font-bold text-slate-400 tracking-[0.24em] mt-1.5 uppercase">
              SMART VOICE ASSISTANT DASHBOARD
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message if any */}
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="size-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {/* Admin Username Field */}
            <div>
              <label 
                htmlFor="username-input" 
                className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2"
              >
                ADMIN USERNAME
              </label>
              <div className="relative rounded-2xl bg-[#ebf3fc] border border-blue-100/60 shadow-inner flex items-center px-4 h-13 transition-all focus-within:ring-2 focus-within:ring-sky-400/50 focus-within:border-sky-400">
                <User className="size-5 text-slate-500 shrink-0 mr-3" />
                <input
                  id="username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base font-semibold outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password-input" 
                className="block text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-2"
              >
                PASSWORD
              </label>
              <div className="relative rounded-2xl bg-[#ebf3fc] border border-blue-100/60 shadow-inner flex items-center px-4 h-13 transition-all focus-within:ring-2 focus-within:ring-sky-400/50 focus-within:border-sky-400">
                <Lock className="size-5 text-slate-500 shrink-0 mr-3" />
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className={`w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-base font-semibold outline-none ${
                    !showPassword && password === "••••••••••••" ? "tracking-widest" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors ml-2 cursor-pointer"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full h-13 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#0ea5e9] to-[#0284c7] bg-[length:200%_auto] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_8px_25px_rgba(2,132,199,0.45)] hover:shadow-[0_10px_32px_rgba(2,132,199,0.7)] hover:brightness-110 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-80`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center gap-2 text-emerald-100">
                    <CheckCircle2 className="size-5" />
                    <span>Access Granted</span>
                  </span>
                ) : (
                  <>
                    <span>Sign In to Control Center</span>
                    <ArrowRight className="size-4.5 stroke-[2.2]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Helper Badge */}
          <div className="mt-6 pt-5 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-sky-400" />
              <span>VoiceAI Security 256-bit</span>
            </span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-sky-400 hover:text-sky-300 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="size-3" />
              <span>Reset Default</span>
            </button>
          </div>
        </div>

        {/* Footer Subtext */}
        <div className="text-center mt-5 text-[11px] text-slate-500 font-medium tracking-wide">
          VoiceAI Smart Calling Agent • Autonomous Voice Control Center
        </div>
      </div>
    </div>
  );
}
