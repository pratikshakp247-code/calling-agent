import { useState } from "react";
import {
  LayoutDashboard, PhoneCall, History, Users, Bot, Megaphone, BarChart3,
  FileText, Settings, Search, Bell, Activity, CheckCircle2, PhoneMissed, Clock,
  TrendingUp, TrendingDown, ChevronDown, MoreHorizontal, FileUp, Menu, Info, List,
  Download, Filter, X, Play, RefreshCw, MessageSquare, Save, Calendar, Headset, Shield,
  Ticket, CreditCard, Plus, Edit, AlertCircle, MicOff, Pause, PhoneForwarded, PhoneOff, PhoneIncoming, PhoneOutgoing,
  LogOut
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

import { navItems } from "./data/mockData";
import DashboardContent from "./pages/DashboardContent";
import CallHistoryContent from "./pages/CallHistoryContent";
import LiveCallsContent from "./pages/LiveCallsContent";
import AiAgentsContent from "./pages/AiAgentsContent";
import DigitalTicketsContent from "./pages/DigitalTicketsContent";
import CallPassesContent from "./pages/CallPassesContent";
import ContactsContent from "./pages/ContactsContent";
import CampaignsContent from "./pages/CampaignsContent";
import FollowUpsContent from "./pages/FollowUpsContent";
import CallScriptsContent from "./pages/CallScriptsContent";
import VoiceAnalyticsContent from "./pages/VoiceAnalyticsContent";
import CallTranscriptsContent from "./pages/CallTranscriptsContent";
import UsersRolesContent from "./pages/UsersRolesContent";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState("admin");
  const [activeNav, setActiveNav] = useState("Users & Roles");

  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-white border-r border-slate-200 shadow-sm z-20 shrink-0">
        {/* Dark Blue Logo Header */}
        <div className="flex h-20 items-center px-5 bg-[#0f2c6a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-full border-2 border-white bg-transparent pt-0.5">
              <Bot className="mb-0.5 size-4 text-blue-400" />
              <span className="text-[6px] font-bold text-blue-400 leading-none tracking-wider">AI</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-black tracking-widest text-white leading-tight">Calling Agent</div>
              <div className="text-[9px] font-bold text-yellow-400 tracking-wider leading-none mt-0.5">SMART VOICE ASSISTANT</div>
            </div>
          </div>
        </div>
        
        {/* Sidebar Nav */}
        <div className="flex-1 overflow-y-auto py-6">
          {["CALL OPERATIONS", "CUSTOMER SERVICES", "INTELLIGENCE & ADMIN"].map((category) => (
            <div key={category} className="mb-6">
              <div className="px-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                {category}
              </div>
              <nav className="space-y-1 px-3">
                {navItems.filter(i => i.category === category).map((item) => {
                  const isActive = activeNav === item.label;
                  return (
                    <button 
                      key={item.label} 
                      onClick={() => setActiveNav(item.label)} 
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors relative ${isActive ? "bg-[#f0f4f8] text-[#1d4ed8]" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#1d4ed8] rounded-r-full" />}
                      <item.icon className={`size-4 ${isActive ? "text-[#1d4ed8]" : "text-slate-400"}`} />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Calling Control Desk Card */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 relative overflow-hidden group hover:bg-slate-100 transition-colors">
            <div className="absolute -top-2 -right-2 p-2 opacity-[0.03] group-hover:opacity-[0.05] group-hover:scale-110 transition-all">
              <Headset className="size-20" />
            </div>
            <div className="flex items-center gap-2 mb-2 relative z-10">
              <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600 shadow-inner">
                <Headset className="size-4" />
              </div>
              <div className="text-xs font-bold text-slate-800">Calling Control Desk</div>
            </div>
            <p className="text-[10px] text-slate-500 mb-3 leading-relaxed relative z-10 font-medium">
              Need assistance with AI configuration or call routing?
            </p>
            <button className="w-full py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors shadow-sm relative z-10">
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content wrapper */}
      <div className="flex-1 flex flex-col min-w-[1020px] h-screen relative">
        {/* Header (displayed on other views, hidden on Voice Analytics, Call Transcripts & Users & Roles to match the exact page design) */}
        {activeNav !== "Voice Analytics" && activeNav !== "Call Transcripts" && activeNav !== "Users & Roles" && (
        <header className="h-20 bg-white flex items-center justify-between px-8 border-b border-slate-200 shrink-0 z-10 relative">
          <div className="flex items-center gap-6">
            <Menu className="size-6 text-slate-600 cursor-pointer hover:text-slate-800" />
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-slate-800">
                  {activeNav === "Dashboard" ? "Dashboard" : activeNav}
                </h1>
                <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                  <span className="size-2 bg-blue-600 rounded-full" /> All Systems Operational
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Overview of VoiceAI Calling Operations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search calls, agents, campaigns..." 
                className="w-full pl-9 pr-14 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 bg-slate-100 rounded px-1.5 py-0.5">Ctrl K</div>
            </div>
            
            <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors border border-slate-200">
              <Bell className="size-5" />
              <span className="absolute top-0 right-0 size-3 flex items-center justify-center rounded-full bg-rose-500 border border-white text-[8px] font-bold text-white leading-none pt-[1px]">4</span>
            </button>
            
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="size-10 rounded-lg bg-[#0f2c6a] text-white flex items-center justify-center font-bold text-sm shadow-sm uppercase">
                {currentUser.slice(0, 2) || "AD"}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{currentUser}</div>
                <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Control Center Admin</div>
              </div>
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              title="Sign Out to Login Page"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>
        )}

        {/* Dynamic Main Views */}
        <main className="flex-1 overflow-y-auto relative bg-[#f8f9fa]">
          {activeNav === "Dashboard" && <DashboardContent setActiveNav={setActiveNav} />}
          {activeNav === "Call History" && <CallHistoryContent />}
          {activeNav === "Live Calls" && <LiveCallsContent />}
          {activeNav === "Contacts" && <ContactsContent />}
          {activeNav === "AI Agents" && <AiAgentsContent />}
          {activeNav === "Campaigns" && <CampaignsContent />}
          {activeNav === "Digital Tickets" && <DigitalTicketsContent />}
          {activeNav === "Call Passes" && <CallPassesContent />}
          {activeNav === "Follow-ups" && <FollowUpsContent />}
          {activeNav === "Call Scripts" && <CallScriptsContent />}
          {activeNav === "Voice Analytics" && <VoiceAnalyticsContent onSignOut={() => setIsAuthenticated(false)} />}
          {activeNav === "Call Transcripts" && <CallTranscriptsContent onSignOut={() => setIsAuthenticated(false)} />}
          {activeNav === "Users & Roles" && <UsersRolesContent />}
        </main>
      </div>
    </div>
  );
}

export default App;
