import { useState } from "react";
import {
  LayoutDashboard, PhoneCall, History, Users, Bot, Megaphone, BarChart3,
  FileText, Settings, Search, Bell, Activity, CheckCircle2, PhoneMissed, Clock,
  TrendingUp, TrendingDown, ChevronDown, MoreHorizontal, FileUp, Menu, Info, List,
  Download, Filter, X, Play, RefreshCw, MessageSquare, Save, Calendar, Headset, Shield,
  Ticket, CreditCard, Plus, Edit, AlertCircle, MicOff, Pause, PhoneForwarded, PhoneOff, PhoneIncoming, PhoneOutgoing
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { 
  navItems, dashboardKpis, dashboardCalls, agentsStatus, chartDataHourly, 
  chartDataWeekly, chartDataMonthly, donutData, historyKpis, historyTableData, 
  liveKpis, liveCallsData, waitingQueue, ticketKpis, ticketData, passKpis, passData 
} from "../data/mockData";

function CallHistoryContent() {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [filters, setFilters] = useState({
    dateRange: "",
    aiagent: "",
    status: "",
    calltype: "",
    priority: "",
    sentiment: "",
    campaign: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSaveToCRM = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
    }, 800);
  };

  const handleSchedule = () => {
    setIsScheduling(true);
    setTimeout(() => {
      setIsScheduling(false);
      setIsScheduled(true);
    }, 800);
  };

  return (
    <div className="p-8 relative h-full">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Call History</h1>
          <p className="text-sm text-slate-500 mt-1">Review and manage all customer calls.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2 text-sm transition-colors">
          <Download className="size-4 text-slate-400" /> Export
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {historyKpis.map((kpi) => (
          <div key={kpi.label} className={`relative overflow-hidden rounded-xl border ${kpi.borderColor} p-4 ${kpi.color} shadow-sm h-28 flex flex-col justify-between group hover:shadow-md transition-shadow`}>
            <div className={`absolute -bottom-8 -right-8 size-24 rounded-full ${kpi.wave} blur-xl group-hover:scale-110 transition-transform duration-500`} />
            <div className={`absolute bottom-0 right-0 size-20 rounded-tl-full ${kpi.wave} opacity-40`} />
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[11px] font-bold text-slate-700 leading-tight">{kpi.label}</span>
              <div className={`size-6 rounded-md flex items-center justify-center shadow-sm ${kpi.iconBg} bg-white/60 backdrop-blur-sm border border-white`}>
                <kpi.icon className="size-3.5" />
              </div>
            </div>
            <div className="relative z-10 flex items-baseline gap-2">
              <div className="text-2xl font-black text-slate-800 tracking-tight">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, phone, call ID or agent..." 
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            <select 
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              className="pl-8 pr-8 py-1.5 rounded border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
            >
              <option value="">Date Range</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3 text-slate-400 pointer-events-none" />
          </div>
          
          {["AI Agent", "Status", "Call Type", "Priority", "Sentiment", "Campaign"].map(filter => {
            const key = filter.toLowerCase().replace(" ", "") as keyof typeof filters;
            
            // Extract unique values for the dropdown
            let dataKey = key as any;
            if (filter === "AI Agent") dataKey = "agent";
            if (filter === "Call Type") dataKey = "type";
            
            const uniqueOptions = Array.from(new Set(historyTableData.map(item => (item as any)[dataKey]).filter(Boolean)));
            
            return (
              <div key={filter} className="relative">
                <select 
                  value={filters[key]}
                  onChange={(e) => setFilters({...filters, [key]: e.target.value})}
                  className="pl-3 pr-8 py-1.5 rounded border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 appearance-none cursor-pointer focus:outline-none focus:border-blue-500"
                >
                  <option value="">{filter}</option>
                  {uniqueOptions.map(opt => (
                    <option key={opt as string} value={opt as string}>{opt as string}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3 text-slate-400 pointer-events-none" />
              </div>
            );
          })}
          
          <button 
            onClick={() => {
              setFilters({dateRange: "", aiagent: "", status: "", calltype: "", priority: "", sentiment: "", campaign: ""});
              setSearchQuery("");
            }}
            className="ml-auto text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-5">Call ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Phone</th>
                <th className="py-4 px-5">Call Type</th>
                <th className="py-4 px-5">AI Agent</th>
                <th className="py-4 px-5">Date & Time</th>
                <th className="py-4 px-5">Duration</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Sentiment</th>
                <th className="py-4 px-5">Priority</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(() => {
                let filtered = historyTableData.filter(call => {
                  if (filters.aiagent && call.agent !== filters.aiagent) return false;
                  if (filters.status && call.status !== filters.status) return false;
                  if (filters.calltype && call.type !== filters.calltype) return false;
                  if (filters.priority && call.priority !== filters.priority) return false;
                  if (filters.sentiment && call.sentiment !== filters.sentiment) return false;
                  if (searchQuery) {
                    const q = searchQuery.toLowerCase();
                    return call.customer.toLowerCase().includes(q) || 
                           call.phone.includes(q) || 
                           call.id.toLowerCase().includes(q) || 
                           call.agent.toLowerCase().includes(q);
                  }
                  return true;
                });
                
                if (filtered.length === 0) {
                  return (
                    <tr>
                      <td colSpan={11} className="py-8 text-center text-slate-500 text-sm font-medium">No calls found matching these filters.</td>
                    </tr>
                  );
                }
                
                return filtered.map((call) => (
                  <tr key={call.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-5"><span className="font-mono text-[11px] font-semibold text-slate-500">{call.id}</span></td>
                    <td className="py-3 px-5 font-bold text-[13px] text-slate-800">{call.customer}</td>
                    <td className="py-3 px-5 text-[12px] font-medium text-slate-500">{call.phone}</td>
                    <td className="py-3 px-5 text-[12px] font-semibold text-slate-600">{call.type}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-sm w-fit">
                        <Bot className="size-3 text-slate-400" /> {call.agent}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-[12px] font-medium text-slate-500">{call.date}</td>
                    <td className="py-3 px-5 text-[12px] font-semibold text-slate-600">{call.duration}</td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${call.statusColor}`}>
                        {call.status}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${call.sentimentColor}`}>
                        {call.sentiment}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border ${call.priorityColor}`}>
                         <span className="size-1 rounded-full bg-current" /> {call.priority}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <button onClick={() => setSelectedCall(call)} className="text-[11px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded inline-flex items-center transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay */}
      {selectedCall && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" 
          onClick={() => setSelectedCall(null)}
        />
      )}

      {/* Right Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 flex flex-col ${selectedCall ? "translate-x-0" : "translate-x-full"}`}>
        {selectedCall && (
          <>
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">Call Details</h2>
              <button onClick={() => { setSelectedCall(null); setIsSaved(false); setIsScheduled(false); }} className="p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Customer Info */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Customer Information</h3>
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg shadow-inner">
                    {selectedCall.customer.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-900">{selectedCall.customer}</div>
                    <div className="text-xs font-semibold text-slate-500 mt-0.5">{selectedCall.phone} <span className="mx-1">•</span> ID: {selectedCall.id}</div>
                  </div>
                </div>
              </div>

              {/* Call Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                   <div className="text-[10px] font-semibold text-slate-500 mb-1">AI Agent</div>
                   <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5"><Bot className="size-3.5 text-blue-600" /> {selectedCall.agent}</div>
                </div>
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                   <div className="text-[10px] font-semibold text-slate-500 mb-1">Date & Time</div>
                   <div className="text-sm font-bold text-slate-800 flex items-center gap-1.5"><Calendar className="size-3.5 text-slate-400" /> {selectedCall.date}</div>
                </div>
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                   <div className="text-[10px] font-semibold text-slate-500 mb-1">Call Intent</div>
                   <div className="text-sm font-bold text-slate-800">{selectedCall.type}</div>
                </div>
                <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                   <div className="text-[10px] font-semibold text-slate-500 mb-1">Status & Priority</div>
                   <div className="flex gap-2">
                     <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${selectedCall.statusColor}`}>{selectedCall.status}</span>
                     <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${selectedCall.priorityColor}`}>{selectedCall.priority}</span>
                   </div>
                </div>
              </div>

              {/* Audio Player */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Call Recording</h3>
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-2 shadow-sm">
                  <button className="size-8 rounded-md bg-[#0f2c6a] text-white flex items-center justify-center hover:bg-[#1e3a8a] transition-colors shrink-0">
                    <Play className="size-4 ml-0.5" />
                  </button>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3 rounded-full" />
                  </div>
                  <div className="text-xs font-mono font-semibold text-slate-500 shrink-0">01:12 / {selectedCall.duration}</div>
                </div>
              </div>

              {/* Summary & Sentiment */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xs font-bold text-blue-900 flex items-center gap-1.5"><Activity className="size-3.5" /> AI Call Summary</h3>
                  <div className={`px-2 py-0.5 rounded text-[10px] font-bold border bg-white ${selectedCall.sentimentColor}`}>
                    {selectedCall.sentiment} (89%)
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium mb-3">Customer inquired about enterprise pricing for a team of 50. Discussed basic features and analytics requirements. Requested a callback for a live demo.</p>
                <div className="bg-white rounded border border-blue-100 p-3">
                  <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1 flex items-center gap-1"><RefreshCw className="size-3" /> Follow-up Required</div>
                  <div className="text-xs font-semibold text-slate-800">Schedule demo and send pricing deck by Oct 10.</div>
                </div>
              </div>

              {/* Transcript Preview */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Transcript Snippet</h3>
                <div className="space-y-3 bg-slate-50 border border-slate-100 p-4 rounded-xl">
                   <div className="flex gap-3">
                     <div className="size-6 shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><Bot className="size-3" /></div>
                     <div className="bg-white border border-slate-200 rounded-lg rounded-tl-none p-2.5 text-xs text-slate-700 font-medium">Hi {selectedCall.customer.split(' ')[0]}, this is VoiceAI. How can I help you today?</div>
                   </div>
                   <div className="flex gap-3 flex-row-reverse">
                     <div className="size-6 shrink-0 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center">R</div>
                     <div className="bg-blue-600 text-white rounded-lg rounded-tr-none p-2.5 text-xs font-medium">I want to know the pricing for 50 users.</div>
                   </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer Buttons */}
            <div className="p-5 border-t border-slate-200 bg-white grid grid-cols-2 gap-3">
              <button 
                onClick={handleSchedule}
                disabled={isScheduling || isScheduled}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-300 ${
                  isScheduled ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                  isScheduling ? "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed" :
                  "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {isScheduling ? (
                  <><RefreshCw className="size-4 animate-spin" /> Scheduling...</>
                ) : isScheduled ? (
                  <><CheckCircle2 className="size-4 text-emerald-600" /> Scheduled!</>
                ) : (
                  <><Calendar className="size-4 text-slate-400" /> Schedule</>
                )}
              </button>
              <button 
                onClick={handleSaveToCRM}
                disabled={isSaving || isSaved}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-all duration-300 ${
                  isSaved ? "bg-emerald-500 text-white" :
                  isSaving ? "bg-blue-400 text-white cursor-not-allowed" :
                  "bg-[#1d4ed8] text-white hover:bg-[#1e40af]"
                }`}
              >
                {isSaving ? (
                  <><RefreshCw className="size-4 animate-spin" /> Saving...</>
                ) : isSaved ? (
                  <><CheckCircle2 className="size-4" /> Saved!</>
                ) : (
                  <><Save className="size-4" /> Save to CRM</>
                )}
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}


export default CallHistoryContent;
