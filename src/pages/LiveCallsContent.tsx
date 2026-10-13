import { useState } from "react";
import {
  Search, Clock, Bot, X, MicOff, Pause, PhoneForwarded, PhoneOff, 
  TrendingUp, Phone, Calendar, Smile, Meh, Minus, User, PhoneCall,
  CheckSquare, Square, MessageSquare, FileText, RefreshCw
} from "lucide-react";

const liveStats = [
  { label: "Active Calls", value: "24", icon: PhoneCall, color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", trend: "+12%", trendLabel: "vs. last hour", isLive: true },
  { label: "Waiting Calls", value: "8", icon: Clock, color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", trend: "+3%", trendLabel: "vs. last hour", isLive: false },
  { label: "Active AI Agents", value: "12", icon: Bot, color: "bg-purple-50/50", borderColor: "border-purple-200", wave: "bg-purple-200/50", iconBg: "bg-purple-100 text-purple-600", trend: "+2%", trendLabel: "vs. last hour", isLive: false },
  { label: "Calls Today", value: "186", icon: Calendar, color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", trend: "+18%", trendLabel: "vs. yesterday", isLive: false },
];

const callsData = [
  {
    id: "CL-10428",
    time: "10:58 AM",
    initials: "RS",
    avatarBg: "bg-blue-500",
    customer: "Rahul Sharma",
    phone: "+91 98XXX 12345",
    agent: "Sales Agent",
    status: "Connected",
    statusColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
    duration: "02:34",
    type: "Incoming",
    intent: "Pricing Inquiry",
    sentiment: "Positive",
    sentimentIcon: Smile,
    sentimentColor: "text-emerald-500",
    priority: "High",
    priorityBg: "bg-red-50 text-red-600 border-red-100",
  },
  {
    id: "CL-10427",
    time: "10:52 AM",
    initials: "PD",
    avatarBg: "bg-indigo-500",
    customer: "Priya Deshmukh",
    phone: "+91 97XXX 45678",
    agent: "Support Agent",
    status: "Connected",
    statusColor: "text-emerald-600",
    dotColor: "bg-emerald-500",
    duration: "05:12",
    type: "Outgoing",
    intent: "Technical Support",
    sentiment: "Neutral",
    sentimentIcon: Meh,
    sentimentColor: "text-slate-400",
    priority: "Medium",
    priorityBg: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    id: "CL-10426",
    time: "10:47 AM",
    initials: "AP",
    avatarBg: "bg-teal-500",
    customer: "Amit Patil",
    phone: "+91 99XXX 78901",
    agent: "Follow-up Agent",
    status: "On Hold",
    statusColor: "text-amber-500",
    dotColor: "bg-amber-400",
    duration: "00:48",
    type: "Incoming",
    intent: "Follow-up",
    sentiment: "N/A",
    sentimentIcon: Minus,
    sentimentColor: "text-slate-400",
    priority: "Low",
    priorityBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
  }
];

function LiveCallsContent() {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("All Calls");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToCRM = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 800);
  };

  const filteredCalls = callsData.filter(call => {
    if (activeFilter === "All Calls") return true;
    if (activeFilter === "On Hold") return call.status === "On Hold";
    return call.type === activeFilter;
  });

  // Auto-select the first call for preview purposes if needed
  // useEffect(() => { setSelectedCall(callsData[0]); }, []);

  return (
    <div className="min-h-full p-8 flex flex-col bg-[#f8fafc]">
      {/* Page Header (assuming this replaces the outer one, or sits within main) */}
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Live Calls</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor and manage active AI-powered calls in real time</p>
        </div>
      </div>

      {/* KPI Cards (Exact format matching Image 1) */}
      <div className="grid grid-cols-4 gap-4 mb-6 shrink-0">
        {liveStats.map((stat, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden rounded-xl border ${stat.borderColor} p-4 ${stat.color} shadow-sm h-28 flex flex-col justify-between group hover:shadow-md transition-all`}
          >
            <div className={`absolute -bottom-8 -right-8 size-24 rounded-full ${stat.wave} blur-xl group-hover:scale-110 transition-transform duration-500`} />
            <div className={`absolute bottom-0 right-0 size-20 rounded-tl-full ${stat.wave} opacity-40`} />
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-bold text-slate-700 leading-tight">{stat.label}</span>
                {stat.isLive && (
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-white/80 border border-emerald-200 px-1.5 py-0.5 rounded-full uppercase">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
              <div className={`size-6 rounded-md flex items-center justify-center shadow-sm ${stat.iconBg} bg-white/60 backdrop-blur-sm border border-white`}>
                <stat.icon className="size-3.5" />
              </div>
            </div>
            
            <div className="relative z-10 flex items-baseline justify-between">
              <div className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                <span>↑ {stat.trend}</span>
                <span className="text-[10px] text-slate-400 font-medium ml-0.5">{stat.trendLabel}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Left Side: Active Calls List */}
        <div className={`flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm p-6 transition-all duration-300 ${selectedCall ? "w-2/3" : "w-full"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Active Calls</h2>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-[340px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by customer, phone number or call ID..." 
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-[13px] font-medium focus:outline-none focus:border-blue-500 placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {["All Calls", "Incoming", "Outgoing", "On Hold"].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-colors border ${
                    activeFilter === filter 
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                      : "text-slate-600 border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="font-semibold px-5 py-2 w-28">Call ID</th>
                  <th className="font-semibold px-5 py-2">Customer</th>
                  <th className="font-semibold px-5 py-2">Phone</th>
                  <th className="font-semibold px-5 py-2">AI Agent</th>
                  <th className="font-semibold px-5 py-2">Status</th>
                  <th className="font-semibold px-5 py-2">Duration</th>
                  <th className="font-semibold px-5 py-2">Intent</th>
                  <th className="font-semibold px-5 py-2 text-center">Sentiment</th>
                  <th className="font-semibold px-5 py-2 text-center">Priority</th>
                  <th className="font-semibold px-5 py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCalls.map((call) => (
                  <tr key={call.id} className="bg-white border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow group cursor-pointer" onClick={() => setSelectedCall(call)}>
                    <td className="px-5 py-5 rounded-l-xl border-y border-l border-slate-200">
                      <div className="text-[14px] font-bold text-slate-700">{call.id}</div>
                      <div className="text-[12px] font-semibold text-slate-400 flex items-center gap-1 mt-0.5"><Phone className="size-3" /> {call.time}</div>
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className={`size-10 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-sm ${call.avatarBg}`}>{call.initials}</div>
                        <div className="text-[14px] font-bold text-slate-800">{call.customer}</div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200 text-[13px] text-slate-500 font-medium">
                      {call.phone}
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200 text-[13px] font-bold text-slate-700">
                      <div className="flex items-center gap-1.5"><Bot className="size-4 text-blue-500" /> {call.agent}</div>
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200">
                      <span className={`flex items-center gap-1.5 text-[12px] font-bold ${call.statusColor}`}>
                        <span className={`size-2 rounded-full ${call.dotColor}`} /> {call.status}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200 text-[13px] text-slate-600 font-semibold">
                      {call.duration}
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200 text-[13px] text-slate-600 font-semibold">
                      {call.intent}
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200 text-center">
                      <div className={`inline-flex items-center gap-1.5 text-[13px] font-bold ${call.sentimentColor}`}>
                        <call.sentimentIcon className="size-4" /> {call.sentiment}
                      </div>
                    </td>
                    <td className="px-5 py-5 border-y border-slate-200 text-center">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold border ${call.priorityBg}`}>
                        {call.priority}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-y border-r border-slate-200 rounded-r-xl text-right">
                      <button className="text-blue-600 border border-slate-200 bg-white shadow-sm text-xs font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">View Details &gt;</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
             <div className="text-xs text-slate-500 font-medium">Showing 3 of 24 active calls</div>
             <div className="flex items-center gap-1">
               <button className="size-7 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50 font-bold">&lt;</button>
               <button className="size-7 flex items-center justify-center bg-blue-600 text-white rounded font-bold shadow-sm text-xs">1</button>
               <button className="size-7 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold rounded text-xs">2</button>
               <button className="size-7 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold rounded text-xs">3</button>
               <button className="size-7 flex items-center justify-center hover:bg-slate-50 text-slate-600 font-bold rounded text-xs">4</button>
               <button className="size-7 flex items-center justify-center text-slate-400 font-bold rounded text-xs">...</button>
               <button className="size-7 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50 font-bold">&gt;</button>
             </div>
          </div>
        </div>

        {/* Right Side: Details Panel */}
        {selectedCall && (
          <div className="w-1/3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-[15px] font-bold text-slate-800">Selected Call Details</h2>
              <button onClick={() => { setSelectedCall(null); setIsSaved(false); }} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="size-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Profile */}
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className={`size-12 rounded-full text-white flex items-center justify-center text-lg font-bold shadow-sm ${selectedCall.avatarBg}`}>
                      {selectedCall.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{selectedCall.customer}</div>
                      <div className="text-[12px] text-slate-500 font-medium mt-0.5">{selectedCall.phone}</div>
                    </div>
                 </div>
                 <div className="flex flex-col items-end gap-1.5">
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold ${selectedCall.statusColor} bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full`}>
                      <span className={`size-1.5 rounded-full ${selectedCall.dotColor}`} /> {selectedCall.status}
                    </div>
                    <div className="flex items-center gap-1 text-slate-600 font-bold text-xs">
                      <Clock className="size-3 text-slate-400" /> {selectedCall.duration}
                    </div>
                 </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    <TrendingUp className="size-3" /> Call Type
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">Outgoing</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    <Bot className="size-3" /> AI Agent
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">{selectedCall.agent}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    <span className="text-[12px] leading-none">#</span> Call ID
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">{selectedCall.id}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                    <Clock className="size-3" /> Started At
                  </div>
                  <div className="text-[11px] font-bold text-slate-700">11:06 AM</div>
                </div>
              </div>

              {/* Controls */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-500 mb-3">Call Controls (Demo)</div>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors">
                    <MicOff className="size-3.5" /> Mute
                  </button>
                  <button className="flex-1 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors">
                    <Pause className="size-3.5" /> Hold
                  </button>
                  <button className="flex-1 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-[11px] font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors">
                    <PhoneForwarded className="size-3.5" /> Transfer
                  </button>
                  <button className="flex-1 py-2 bg-red-600 text-white shadow-sm rounded-lg text-[11px] font-bold hover:bg-red-700 flex items-center justify-center gap-1.5 transition-colors">
                    <PhoneOff className="size-3.5" /> End Call
                  </button>
                </div>
              </div>

              {/* Transcript */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-800 mb-4">
                  <MessageSquare className="size-4 text-blue-500" /> Live Transcript
                </div>
                <div className="relative pl-1 space-y-5 before:absolute before:inset-y-1 before:left-1.5 before:w-px before:bg-slate-200">
                  <div className="relative pl-5">
                    <div className="absolute left-[-2px] top-1 bg-white p-[2px]">
                      <div className="size-1.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex gap-3">
                      <div className="text-[9px] text-slate-400 font-bold w-12 pt-0.5 shrink-0">11:06 AM</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 mb-1">
                           <Bot className="size-3" /> AI Agent
                        </div>
                        <div className="bg-blue-50 text-blue-900 text-[11px] p-2.5 rounded-lg rounded-tl-none font-medium">Hello Rahul, how can I help you today?</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pl-5">
                    <div className="absolute left-[-2px] top-1 bg-white p-[2px]">
                      <div className="size-1.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex gap-3">
                      <div className="text-[9px] text-slate-400 font-bold w-12 pt-0.5 shrink-0">11:07 AM</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-1">
                           <User className="size-3" /> Customer
                        </div>
                        <div className="bg-slate-50 text-slate-700 border border-slate-100 text-[11px] p-2.5 rounded-lg rounded-tl-none font-medium shadow-sm">I'd like to know more about your pricing plans.</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative pl-5">
                    <div className="absolute left-[-2px] top-1 bg-white p-[2px]">
                      <div className="size-1.5 rounded-full bg-slate-300" />
                    </div>
                    <div className="flex gap-3">
                      <div className="text-[9px] text-slate-400 font-bold w-12 pt-0.5 shrink-0">11:08 AM</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 mb-1">
                           <Bot className="size-3" /> AI Agent
                        </div>
                        <div className="bg-blue-50 text-blue-900 text-[11px] p-2.5 rounded-lg rounded-tl-none font-medium">Certainly, I can explain the available plans.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="pt-2">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-800 mb-4">
                  <Bot className="size-4 text-blue-500" /> AI Insights
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-blue-50/60 border border-blue-100 p-2.5 rounded-lg text-center flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-blue-500 uppercase tracking-wider mb-1"><Bot className="size-3" /> Intent</div>
                    <div className="text-[11px] font-bold text-blue-700">{selectedCall.intent}</div>
                  </div>
                  <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 rounded-lg text-center flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-wider mb-1"><Smile className="size-3" /> Sentiment</div>
                    <div className="text-[11px] font-bold text-emerald-700">{selectedCall.sentiment}</div>
                  </div>
                  <div className="bg-amber-50/60 border border-amber-100 p-2.5 rounded-lg text-center flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-amber-500 uppercase tracking-wider mb-1"><TrendingUp className="size-3" /> Priority</div>
                    <div className="text-[11px] font-bold text-amber-700">{selectedCall.priority}</div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="pt-2 pb-2">
                <div className="flex items-center gap-2 text-[13px] font-bold text-slate-800 mb-3">
                  <FileText className="size-4 text-blue-500" /> Call Notes & Next Actions
                </div>
                <div className="border border-slate-200 rounded-xl p-3 shadow-sm bg-white">
                  <div className="space-y-3 mb-4 mt-1 px-1">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-500"><CheckSquare className="size-4" /></div>
                      <div className="text-[12px] font-semibold text-slate-700">Send pricing details</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-slate-300"><Square className="size-4" /></div>
                      <div className="text-[12px] font-semibold text-slate-700">Create follow-up</div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2 border-t border-slate-100">
                    <button 
                      onClick={handleSaveToCRM}
                      disabled={isSaving || isSaved}
                      className={`px-4 py-2 rounded-lg text-[11px] font-bold shadow-sm transition-all duration-300 flex items-center gap-1.5 ${
                        isSaved ? "bg-emerald-500 text-white" : 
                        isSaving ? "bg-blue-400 text-white cursor-not-allowed" : 
                        "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="size-3 animate-spin" /> Saving...
                        </>
                      ) : isSaved ? (
                        <>
                          <CheckSquare className="size-3" /> Saved!
                        </>
                      ) : (
                        "Save to CRM"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LiveCallsContent;
