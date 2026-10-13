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

function DashboardContent({ setActiveNav }: { setActiveNav?: (nav: string) => void }) {
  const [timeFilter, setTimeFilter] = useState("Hourly");

  const getChartData = () => {
    switch(timeFilter) {
      case "Weekly": return chartDataWeekly;
      case "Monthly": return chartDataMonthly;
      default: return chartDataHourly;
    }
  };

  return (
    <div className="p-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {dashboardKpis.map((kpi) => (
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

      {/* Charts Row */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Call Volume Trends</h2>
              <p className="text-xs text-slate-500 mt-0.5">Call flow comparison across service intervals</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-[#1d4ed8]"><span className="size-2 rounded-full bg-[#1d4ed8]" /> Current</div>
                <div className="flex items-center gap-1.5 text-slate-400"><span className="size-2 rounded-full bg-slate-300" /> Baseline</div>
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1 text-[11px] font-semibold text-slate-500 border border-slate-200">
                {["Hourly", "Weekly", "Monthly"].map((filter) => (
                  <button 
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-2.5 py-1 rounded transition-all duration-200 ${timeFilter === filter ? "bg-white shadow-sm text-slate-800" : "hover:text-slate-700"}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getChartData()} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="current" stroke="#1d4ed8" strokeWidth={2.5} fill="url(#colorCurrent)" dot={{ fill: '#1d4ed8', strokeWidth: 2, r: 3, stroke: 'white' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <div>
            <h2 className="text-base font-bold text-slate-800">Call Operations</h2>
            <p className="text-xs text-slate-500 mt-0.5">Daily call status distribution</p>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center mt-2">
            <div className="relative size-36">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value" stroke="none">
                    {donutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-black text-slate-800">1,248</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">CALLS</span>
              </div>
            </div>
            <div className="w-full mt-4 space-y-2.5 px-2">
              {donutData.map(item => (
                <div key={item.name} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2 font-semibold text-slate-600">
                    <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} /> {item.name}
                  </div>
                  <span className="font-bold text-slate-800">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions & AI Agent Status */}
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="col-span-8 grid grid-cols-2 gap-4">
          <button onClick={() => setActiveNav?.("Live Calls")} className="bg-[#0f2c6a] text-white text-left flex flex-col justify-center p-5 rounded-xl shadow-md hover:bg-[#1e3a8a] transition-all hover:-translate-y-0.5 relative overflow-hidden group">
            <span className="absolute top-4 right-4 flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            <div className="flex items-center gap-2 font-bold mb-1">
              <Activity className="size-4 text-blue-300 group-hover:text-blue-200 transition-colors" /> Live Call Monitor
            </div>
            <div className="text-xs text-blue-200/70 font-medium">24 Active Calls • 8 Waiting</div>
          </button>
          
          <button onClick={() => setActiveNav?.("AI Agents")} className="bg-[#1d4ed8] text-white text-left flex flex-col justify-center p-5 rounded-xl shadow-md hover:bg-[#1e40af] transition-all hover:-translate-y-0.5 group">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Bot className="size-4 text-blue-200 group-hover:text-blue-100 transition-colors" /> Add New Agent
            </div>
            <div className="text-xs text-blue-200/80 font-medium">Deploy a new voice AI assistant</div>
          </button>

          <button onClick={() => setActiveNav?.("Campaigns")} className="bg-white border border-slate-200 text-slate-700 text-left flex flex-col justify-center p-5 rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 group">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Megaphone className="size-4 text-blue-600" /> Broadcast Campaign
            </div>
            <div className="text-xs text-slate-500 font-medium">Reach up to 10,000+ contacts instantly</div>
          </button>

          <button onClick={() => setActiveNav?.("Call Scripts")} className="bg-white border border-slate-200 text-slate-700 text-left flex flex-col justify-center p-5 rounded-xl shadow-sm hover:bg-slate-50 transition-all hover:-translate-y-0.5 group">
            <div className="flex items-center gap-2 font-bold mb-1">
              <FileUp className="size-4 text-slate-400" /> Upload Call Script
            </div>
            <div className="text-xs text-slate-500 font-medium">Train agents with new dialogue flows</div>
          </button>
        </div>

        <div className="col-span-4 rounded-2xl bg-white border border-slate-200 shadow-sm p-5 flex flex-col">
          <h2 className="text-base font-bold text-slate-800 mb-4">AI Agent Status</h2>
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            {agentsStatus.map((agent) => (
              <div key={agent.name} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`size-8 rounded-lg flex items-center justify-center shadow-sm ${agent.bg} ${agent.text}`}>
                    <Bot className="size-4" />
                  </div>
                  <span className="text-[13px] font-semibold text-slate-800">{agent.name}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <span className={`size-2 rounded-full ${agent.dot}`} /> {agent.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="bg-[#0f2c6a] p-5 flex justify-between items-center text-white mx-4 mt-4 rounded-xl shadow-md">
           <div className="flex items-center gap-4">
              <div className="p-2.5 border border-white/20 rounded-lg bg-white/5">
                <List className="size-6 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold">Recent Call Activity</h2>
                </div>
                <p className="text-xs text-blue-200 mt-1">Track incoming customer calls, AI triage, and resolution progress</p>
              </div>
           </div>
           <button onClick={() => setActiveNav && setActiveNav("Call History")} className="bg-white text-[#0f2c6a] px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
             View All <MoreHorizontal className="size-4" />
           </button>
        </div>

        <div className="overflow-x-auto px-4 pb-4 mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f2c6a] text-white text-[10px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5 rounded-tl-lg">Customer</th>
                <th className="py-4 px-5">Phone</th>
                <th className="py-4 px-5">Call Type</th>
                <th className="py-4 px-5">AI Agent</th>
                <th className="py-4 px-5">Duration</th>
                <th className="py-4 px-5">Priority</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right rounded-tr-lg">Action</th>
              </tr>
              <tr><td colSpan={8} className="h-1 bg-yellow-400 p-0"></td></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dashboardCalls.map((call, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-5 font-bold text-sm text-slate-800">{call.customer}</td>
                  <td className="py-4 px-5 text-[13px] font-medium text-slate-600">{call.phone}</td>
                  <td className="py-4 px-5 text-[13px] font-semibold text-slate-700">{call.type}</td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg w-fit shadow-sm">
                      <Bot className="size-3 text-slate-400" /> {call.agent}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-[13px] font-semibold text-slate-600">{call.duration}</td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${call.priorityColor}`}>
                      <span className="size-1.5 rounded-full bg-current" /> {call.priority}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${call.statusColor}`}>
                      {call.isClosed ? <CheckCircle2 className="size-3" /> : <Activity className="size-3" />} {call.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <button onClick={() => setActiveNav && setActiveNav("Call History")} className="text-[11px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg inline-flex items-center gap-1 transition-colors shadow-sm">
                      Review <ChevronDown className="size-3.5 -rotate-90" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default DashboardContent;
