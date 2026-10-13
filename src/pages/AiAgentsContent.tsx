import { useState, useEffect } from "react";
import { 
  Bot, Plus, Search, ChevronDown, PhoneCall, Activity, Star, 
  MoreVertical, Edit, Calendar, Trash2, Play, Circle, User,
  CheckCircle2, Clock, Globe, Mic, X, RefreshCw, Settings,
  Volume2, MicOff, PhoneOff, Send, MessageSquare, AlertTriangle,
  Pause
} from "lucide-react";

interface AgentItem {
  id: string;
  name: string;
  desc: string;
  type: string;
  typeColor: string;
  language: string;
  voice: string;
  status: string;
  statusColor: string;
  callsToday: string;
  successRate: string;
  createdOn: string;
  createdTime: string;
  avatarBg: string;
}

const agentStats = [
  { label: "Total Agents", value: "6", trend: "+2 this week", icon: Bot, color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600" },
  { label: "Active Calls", value: "12", trend: "+3 live now", icon: PhoneCall, color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600" },
  { label: "Total Conversations", value: "2,458", trend: "+18% this week", icon: Activity, color: "bg-indigo-50/50", borderColor: "border-indigo-200", wave: "bg-indigo-200/50", iconBg: "bg-indigo-100 text-indigo-600" },
  { label: "Avg. Success Rate", value: "82%", trend: "+5% this week", icon: Star, color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600" },
];

const initialAgentsList: AgentItem[] = [
  {
    id: "AGT-001",
    name: "Sales Assistant",
    desc: "Handles sales inquiries & product pricing",
    type: "Sales",
    typeColor: "text-blue-600 bg-blue-50 border-blue-100",
    language: "English",
    voice: "Female (Neerja)",
    status: "Active",
    statusColor: "text-emerald-600 bg-emerald-50",
    callsToday: "24",
    successRate: "88%",
    createdOn: "Oct 1, 2026",
    createdTime: "10:32 AM",
    avatarBg: "bg-blue-50 text-blue-600"
  },
  {
    id: "AGT-002",
    name: "Support Assistant",
    desc: "Handles customer support & troubleshooting",
    type: "Support",
    typeColor: "text-purple-600 bg-purple-50 border-purple-100",
    language: "Hindi",
    voice: "Male (Arjun)",
    status: "Active",
    statusColor: "text-emerald-600 bg-emerald-50",
    callsToday: "18",
    successRate: "75%",
    createdOn: "Sep 28, 2026",
    createdTime: "02:15 PM",
    avatarBg: "bg-purple-50 text-purple-600"
  },
  {
    id: "AGT-003",
    name: "Payment Assistant",
    desc: "Handles payment & billing queries",
    type: "Payment",
    typeColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    language: "Marathi",
    voice: "Female (Pranali)",
    status: "Active",
    statusColor: "text-emerald-600 bg-emerald-50",
    callsToday: "12",
    successRate: "92%",
    createdOn: "Sep 25, 2026",
    createdTime: "11:20 AM",
    avatarBg: "bg-emerald-50 text-emerald-600"
  },
  {
    id: "AGT-004",
    name: "Follow-up Assistant",
    desc: "Conducts automated scheduled customer follow-ups",
    type: "Follow-up",
    typeColor: "text-amber-600 bg-amber-50 border-amber-100",
    language: "English",
    voice: "Male (Rohan)",
    status: "On Hold",
    statusColor: "text-blue-600 bg-blue-50",
    callsToday: "6",
    successRate: "67%",
    createdOn: "Sep 22, 2026",
    createdTime: "04:45 PM",
    avatarBg: "bg-amber-50 text-amber-600"
  },
  {
    id: "AGT-005",
    name: "Complaint Assistant",
    desc: "Handles grievance escalations & priority resolution",
    type: "Support",
    typeColor: "text-purple-600 bg-purple-50 border-purple-100",
    language: "Hindi",
    voice: "Female (Sneha)",
    status: "Active",
    statusColor: "text-emerald-600 bg-emerald-50",
    callsToday: "9",
    successRate: "81%",
    createdOn: "Sep 20, 2026",
    createdTime: "09:18 AM",
    avatarBg: "bg-rose-50 text-rose-600"
  },
  {
    id: "AGT-006",
    name: "Product Information",
    desc: "Provides self-service product specs & features",
    type: "Information",
    typeColor: "text-teal-600 bg-teal-50 border-teal-100",
    language: "English",
    voice: "Male (Karan)",
    status: "Inactive",
    statusColor: "text-slate-500 bg-slate-100",
    callsToday: "0",
    successRate: "0%",
    createdOn: "Sep 18, 2026",
    createdTime: "03:12 PM",
    avatarBg: "bg-teal-50 text-teal-600"
  },
];

function AiAgentsContent() {
  const [agents, setAgents] = useState<AgentItem[]>(initialAgentsList);
  const [selectedAgent, setSelectedAgent] = useState<AgentItem | null>(initialAgentsList[0]);
  
  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  
  // Modals state
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Toast notification
  const [toast, setToast] = useState<string | null>(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    desc: "",
    type: "Sales",
    language: "English",
    voice: "Female (Neerja)",
    status: "Active",
  });

  // Add agent form state
  const [addForm, setAddForm] = useState({
    name: "",
    desc: "",
    type: "Sales",
    language: "English",
    voice: "Female (Neerja)",
    status: "Active",
  });

  // Test Call Simulator state
  const [callDuration, setCallDuration] = useState(0);
  const [isCallMuted, setIsCallMuted] = useState(false);
  const [isCallPaused, setIsCallPaused] = useState(false);
  const [testMessages, setTestMessages] = useState<Array<{ sender: "agent" | "user"; text: string }>>([]);
  const [inputMessage, setInputMessage] = useState("");

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Timer for Test Call
  useEffect(() => {
    let interval: any = null;
    if (isTestModalOpen && !isCallPaused) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestModalOpen, isCallPaused]);

  // Open Test Simulator
  const handleOpenTest = (agent?: AgentItem) => {
    const target = agent || selectedAgent;
    if (!target) return;
    setSelectedAgent(target);
    setCallDuration(0);
    setIsCallMuted(false);
    setIsCallPaused(false);
    setTestMessages([
      { 
        sender: "agent", 
        text: `Namaste! I am ${target.name}. I am connected and ready to assist you. How can I help you today?` 
      }
    ]);
    setIsTestModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (agent?: AgentItem) => {
    const target = agent || selectedAgent;
    if (!target) return;
    setSelectedAgent(target);
    setEditForm({
      name: target.name,
      desc: target.desc,
      type: target.type,
      language: target.language,
      voice: target.voice,
      status: target.status,
    });
    setIsEditModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (agent?: AgentItem) => {
    const target = agent || selectedAgent;
    if (!target) return;
    setSelectedAgent(target);
    setIsDeleteModalOpen(true);
  };

  // Save Edit Changes
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAgent) return;

    const getTypeColor = (type: string) => {
      switch (type) {
        case "Sales": return "text-blue-600 bg-blue-50 border-blue-100";
        case "Support": return "text-purple-600 bg-purple-50 border-purple-100";
        case "Payment": return "text-emerald-600 bg-emerald-50 border-emerald-100";
        case "Follow-up": return "text-amber-600 bg-amber-50 border-amber-100";
        default: return "text-teal-600 bg-teal-50 border-teal-100";
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case "Active": return "text-emerald-600 bg-emerald-50";
        case "On Hold": return "text-blue-600 bg-blue-50";
        default: return "text-slate-500 bg-slate-100";
      }
    };

    const updatedAgent: AgentItem = {
      ...selectedAgent,
      name: editForm.name,
      desc: editForm.desc,
      type: editForm.type,
      typeColor: getTypeColor(editForm.type),
      language: editForm.language,
      voice: editForm.voice,
      status: editForm.status,
      statusColor: getStatusColor(editForm.status),
    };

    setAgents((prev) => prev.map((a) => (a.id === selectedAgent.id ? updatedAgent : a)));
    setSelectedAgent(updatedAgent);
    setIsEditModalOpen(false);
    showToast(`"${updatedAgent.name}" updated successfully!`);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!selectedAgent) return;
    const deletedName = selectedAgent.name;
    const remaining = agents.filter((a) => a.id !== selectedAgent.id);
    setAgents(remaining);
    setSelectedAgent(remaining.length > 0 ? remaining[0] : null);
    setIsDeleteModalOpen(false);
    showToast(`"${deletedName}" was deleted successfully.`);
  };

  // Create New Agent
  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.name.trim()) return;

    const newId = `AGT-00${agents.length + 1}`;
    const newAgent: AgentItem = {
      id: newId,
      name: addForm.name,
      desc: addForm.desc || "Configured for automated voice handling",
      type: addForm.type,
      typeColor: "text-blue-600 bg-blue-50 border-blue-100",
      language: addForm.language,
      voice: addForm.voice,
      status: addForm.status,
      statusColor: "text-emerald-600 bg-emerald-50",
      callsToday: "0",
      successRate: "100%",
      createdOn: "Today",
      createdTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarBg: "bg-blue-50 text-blue-600",
    };

    setAgents([newAgent, ...agents]);
    setSelectedAgent(newAgent);
    setIsAddModalOpen(false);
    setAddForm({
      name: "",
      desc: "",
      type: "Sales",
      language: "English",
      voice: "Female (Neerja)",
      status: "Active",
    });
    showToast(`New agent "${newAgent.name}" created successfully!`);
  };

  // Send message in Test Call
  const handleSendTestMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !selectedAgent) return;

    const userText = inputMessage;
    setTestMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMessage("");

    // Simulate agent response
    setTimeout(() => {
      let reply = `I understand your request regarding "${userText}". I am processing the data with the VoiceAI core engine now.`;
      if (userText.toLowerCase().includes("pricing") || userText.toLowerCase().includes("price")) {
        reply = `Our Calling Agent plans start at ₹999/month with automated AI speech, unlimited concurrency, and CRM sync.`;
      } else if (userText.toLowerCase().includes("support") || userText.toLowerCase().includes("issue")) {
        reply = `I have logged ticket #${Math.floor(1000 + Math.random() * 9000)}. Our technical team has been notified.`;
      }
      setTestMessages((prev) => [...prev, { sender: "agent", text: reply }]);
    }, 900);
  };

  // Filtered agents list
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "All Types" || agent.type === typeFilter;
    const matchesStatus = statusFilter === "All Status" || agent.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] p-8 flex flex-col bg-[#f4f7fb] relative">
      {/* Toast Alert Notification */}
      {toast && (
        <div className="fixed top-24 right-8 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="size-5 text-emerald-400" />
          <span className="text-sm font-semibold">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm border border-blue-100">
            <Bot className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">AI Agents</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your AI voice assistants, view performance and configure live call agents.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all cursor-pointer hover:shadow"
        >
          <Plus className="size-4" /> Add New Agent
        </button>
      </div>

      {/* KPI Cards (Exact format matching Image 1) */}
      <div className="grid grid-cols-4 gap-4 mb-6 shrink-0">
        {agentStats.map((stat, i) => (
          <div 
            key={i} 
            className={`relative overflow-hidden rounded-xl border ${stat.borderColor} p-4 ${stat.color} shadow-sm h-28 flex flex-col justify-between group hover:shadow-md transition-all`}
          >
            <div className={`absolute -bottom-8 -right-8 size-24 rounded-full ${stat.wave} blur-xl group-hover:scale-110 transition-transform duration-500`} />
            <div className={`absolute bottom-0 right-0 size-20 rounded-tl-full ${stat.wave} opacity-40`} />
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[12px] font-bold text-slate-700 leading-tight">{stat.label}</span>
              <div className={`size-6 rounded-md flex items-center justify-center shadow-sm ${stat.iconBg} bg-white/60 backdrop-blur-sm border border-white`}>
                <stat.icon className="size-3.5" />
              </div>
            </div>
            
            <div className="relative z-10 flex items-baseline justify-between">
              <div className="text-2xl font-black text-slate-800 tracking-tight">
                {i === 0 ? agents.length : stat.value}
              </div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                <span>↑ {stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex gap-6 items-start">
        {/* Left Side: Agents List */}
        <div className={`flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${selectedAgent ? "flex-1 min-w-0" : "w-full"}`}>
          {/* Filters Row */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0">
             <div className="relative flex-1 max-w-sm">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search agent name, ID or type..." 
                 className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500" 
               />
               {searchQuery && (
                 <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                   <X className="size-4" />
                 </button>
               )}
             </div>
             <div className="flex items-center gap-5">
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wide">Agent Type</span>
                  <div className="relative">
                    <select 
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none w-32 cursor-pointer"
                    >
                      <option>All Types</option>
                      <option>Sales</option>
                      <option>Support</option>
                      <option>Payment</option>
                      <option>Follow-up</option>
                      <option>Information</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wide">Status</span>
                  <div className="relative">
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none w-32 cursor-pointer"
                    >
                      <option>All Status</option>
                      <option>Active</option>
                      <option>On Hold</option>
                      <option>Inactive</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setTypeFilter("All Types");
                    setStatusFilter("All Status");
                  }}
                  className="text-xs font-bold text-blue-600 mt-5 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
                >
                   <RefreshCw className="size-3.5" /> Clear Filters
                </button>
             </div>
          </div>
          
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0">
             <h2 className="text-base font-bold text-slate-800">AI Agents ({filteredAgents.length})</h2>
          </div>

          <div className="w-full overflow-x-auto">
             <table className="w-full text-left whitespace-nowrap min-w-max">
               <thead className="bg-white border-b border-slate-100">
                 <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                   <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 size-4" /></th>
                   <th className="px-3 py-4">Agent Name</th>
                   <th className="px-3 py-4">ID</th>
                   <th className="px-3 py-4">Type</th>
                   <th className="px-3 py-4">Language</th>
                   <th className="px-3 py-4">Voice</th>
                   <th className="px-3 py-4">Status</th>
                   <th className="px-3 py-4 text-center">Calls Today</th>
                   <th className="px-3 py-4 text-center">Success Rate</th>
                   <th className="px-3 py-4">Created On</th>
                   <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {filteredAgents.map((agent) => {
                   const isSelected = selectedAgent?.id === agent.id;
                   return (
                     <tr 
                       key={agent.id} 
                       className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/60" : ""}`} 
                       onClick={() => setSelectedAgent(agent)}
                     >
                       <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 size-4" /></td>
                       <td className="px-3 py-5">
                         <div className="flex items-center gap-4">
                           <div className={`size-12 rounded-full flex items-center justify-center ${agent.avatarBg}`}>
                             <Bot className="size-6" />
                           </div>
                           <div>
                             <div className="text-[15px] font-bold text-slate-800">{agent.name}</div>
                             <div className="text-[13px] font-medium text-slate-500 mt-1">{agent.desc}</div>
                           </div>
                         </div>
                       </td>
                       <td className="px-3 py-5 text-[14px] font-bold text-slate-600">{agent.id}</td>
                       <td className="px-3 py-5">
                         <span className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border ${agent.typeColor}`}>
                           {agent.type}
                         </span>
                       </td>
                       <td className="px-3 py-5 text-[14px] font-bold text-slate-700 flex items-center gap-2 mt-4">
                         <Globe className="size-4 text-blue-500" /> {agent.language}
                       </td>
                       <td className="px-3 py-5 text-[14px] font-bold text-slate-700">
                         <div className="flex items-center gap-2">
                           <Mic className="size-4 text-slate-400" />
                           <div className="flex flex-col">
                             <span>{agent.voice.split(' ')[0]}</span>
                             <span className="text-xs text-slate-400 mt-0.5">{agent.voice.split(' ')[1]}</span>
                           </div>
                         </div>
                       </td>
                       <td className="px-3 py-5">
                         <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${agent.statusColor}`}>
                           {agent.status}
                         </span>
                       </td>
                       <td className="px-3 py-5 text-[15px] font-bold text-slate-700 text-center">{agent.callsToday}</td>
                       <td className="px-3 py-5 text-[15px] font-bold text-slate-700 text-center">{agent.successRate}</td>
                       <td className="px-3 py-5">
                         <div className="text-[14px] font-bold text-slate-700">{agent.createdOn}</div>
                         <div className="text-[12px] font-bold text-slate-400 mt-1">{agent.createdTime}</div>
                       </td>
                       <td className="px-6 py-5 text-right">
                         <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                           <button 
                             onClick={() => handleOpenTest(agent)}
                             title="Test this Agent"
                             className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors border border-emerald-200 flex items-center gap-1 cursor-pointer"
                           >
                             <Play className="size-3 fill-current" /> Test
                           </button>
                           <button 
                             onClick={() => handleOpenEdit(agent)}
                             title="Edit Agent"
                             className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-100 flex items-center gap-1 cursor-pointer"
                           >
                             <Edit className="size-3" /> Edit
                           </button>
                           <button 
                             onClick={() => handleOpenDelete(agent)}
                             title="Delete Agent"
                             className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                           >
                             <Trash2 className="size-4" />
                           </button>
                         </div>
                       </td>
                     </tr>
                   );
                 })}
               </tbody>
             </table>
          </div>
          
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-b-xl shrink-0">
             <div className="text-xs font-bold text-slate-500">
               Showing 1 to {filteredAgents.length} of {agents.length} agents
             </div>
             <div className="flex items-center gap-1.5">
               <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-white font-bold">&lt;</button>
               <button className="size-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold shadow-sm text-sm">1</button>
               <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">&gt;</button>
             </div>
          </div>
        </div>

        {/* Right Side: Selected Agent Detail Drawer */}
        {selectedAgent && (
          <div className="w-[360px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Panel Header */}
            <div className="p-6 border-b border-slate-100 relative">
              <button onClick={() => setSelectedAgent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                <X className="size-5" />
              </button>
              
              <div className="flex gap-4">
                <div className="size-16 rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                   <Bot className="size-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-slate-800">{selectedAgent.name}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${selectedAgent.statusColor}`}>
                      <span className={`size-1.5 rounded-full ${selectedAgent.status === 'Active' ? 'bg-emerald-500' : 'bg-current'}`} />
                      {selectedAgent.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
                    <span>{selectedAgent.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${selectedAgent.typeColor}`}>{selectedAgent.type}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 mt-6 border-b border-slate-100">
                <button className="pb-3 text-sm font-bold text-blue-600 border-b-2 border-blue-600">Overview</button>
                <button className="pb-3 text-sm font-bold text-slate-500 hover:text-slate-700">Performance</button>
                <button className="pb-3 text-sm font-bold text-slate-500 hover:text-slate-700">Settings</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 max-h-[calc(100vh-420px)]">
              {/* Agent Information */}
              <div>
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[13px] font-bold text-slate-800">Agent Information</h3>
                   <button 
                     onClick={() => handleOpenEdit(selectedAgent)}
                     className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                   >
                     <Edit className="size-3" /> Edit
                   </button>
                 </div>
                 <div className="space-y-4">
                   <div className="flex items-center">
                     <div className="w-1/3 flex items-center gap-2 text-[12px] font-semibold text-slate-500"><User className="size-3.5" /> Agent Name</div>
                     <div className="w-2/3 text-[12px] font-bold text-slate-800">{selectedAgent.name}</div>
                   </div>
                   <div className="flex items-center">
                     <div className="w-1/3 flex items-center gap-2 text-[12px] font-semibold text-slate-500"><Calendar className="size-3.5" /> Agent ID</div>
                     <div className="w-2/3 text-[12px] font-bold text-slate-800">{selectedAgent.id}</div>
                   </div>
                   <div className="flex items-center">
                     <div className="w-1/3 flex items-center gap-2 text-[12px] font-semibold text-slate-500"><Settings className="size-3.5" /> Type</div>
                     <div className="w-2/3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${selectedAgent.typeColor}`}>{selectedAgent.type}</span></div>
                   </div>
                   <div className="flex items-center">
                     <div className="w-1/3 flex items-center gap-2 text-[12px] font-semibold text-slate-500"><Globe className="size-3.5" /> Language</div>
                     <div className="w-2/3 text-[12px] font-bold text-slate-800">{selectedAgent.language} (India)</div>
                   </div>
                   <div className="flex items-center">
                     <div className="w-1/3 flex items-center gap-2 text-[12px] font-semibold text-slate-500"><Mic className="size-3.5" /> Voice</div>
                     <div className="w-2/3 text-[12px] font-bold text-slate-800">{selectedAgent.voice}</div>
                   </div>
                   <div className="flex items-center">
                     <div className="w-1/3 flex items-center gap-2 text-[12px] font-semibold text-slate-500"><Clock className="size-3.5" /> Created On</div>
                     <div className="w-2/3 text-[12px] font-bold text-slate-800">{selectedAgent.createdOn} • {selectedAgent.createdTime}</div>
                   </div>
                 </div>
              </div>

              {/* Performance Mini Stats */}
              <div>
                 <div className="flex items-center justify-between mb-4">
                   <h3 className="text-[13px] font-bold text-slate-800">Performance (Last 7 Days)</h3>
                   <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">View Details</button>
                 </div>
                 <div className="grid grid-cols-4 gap-3">
                   <div className="border border-slate-200 rounded-xl p-3 text-center">
                     <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Calls</div>
                     <div className="text-[15px] font-black text-slate-800">186</div>
                     <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 18%</div>
                   </div>
                   <div className="border border-slate-200 rounded-xl p-3 text-center">
                     <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Success Rate</div>
                     <div className="text-[15px] font-black text-slate-800">{selectedAgent.successRate}</div>
                     <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 5%</div>
                   </div>
                   <div className="border border-slate-200 rounded-xl p-3 text-center">
                     <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Avg. Duration</div>
                     <div className="text-[15px] font-black text-slate-800">04:32</div>
                     <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 12%</div>
                   </div>
                   <div className="border border-slate-200 rounded-xl p-3 text-center">
                     <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Failed Calls</div>
                     <div className="text-[15px] font-black text-slate-800">12</div>
                     <div className="text-[9px] font-bold text-rose-500 mt-1">↑ 3%</div>
                   </div>
                 </div>
              </div>

              {/* Recent Activity */}
              <div>
                 <h3 className="text-[13px] font-bold text-slate-800 mb-4">Recent Activity</h3>
                 <div className="relative pl-3 space-y-4 before:absolute before:inset-y-1 before:left-[15px] before:w-px before:bg-slate-200">
                   <div className="relative pl-6">
                     <div className="absolute left-[-2px] top-1.5 bg-white p-[2px]">
                       <div className="size-2 rounded-full bg-blue-500" />
                     </div>
                     <div className="flex justify-between items-start mb-0.5">
                       <div className="text-[12px] font-bold text-slate-800">Call completed</div>
                       <div className="text-[10px] font-semibold text-slate-400">2 min ago</div>
                     </div>
                     <div className="text-[11px] font-semibold text-slate-500">+91 98765 43210 • Pricing inquiry</div>
                   </div>
                   <div className="relative pl-6">
                     <div className="absolute left-[-2px] top-1.5 bg-white p-[2px]">
                       <div className="size-2 rounded-full bg-blue-500" />
                     </div>
                     <div className="flex justify-between items-start mb-0.5">
                       <div className="text-[12px] font-bold text-slate-800">Call in progress</div>
                       <div className="text-[10px] font-semibold text-slate-400">12 min ago</div>
                     </div>
                     <div className="text-[11px] font-semibold text-slate-500">+91 97654 32109 • Product info</div>
                   </div>
                   <div className="relative pl-6">
                     <div className="absolute left-[-2px] top-1.5 bg-white p-[2px]">
                       <div className="size-2 rounded-full bg-emerald-500" />
                     </div>
                     <div className="flex justify-between items-start mb-0.5">
                       <div className="text-[12px] font-bold text-slate-800">Call completed</div>
                       <div className="text-[10px] font-semibold text-slate-400">28 min ago</div>
                     </div>
                     <div className="text-[11px] font-semibold text-slate-500">+91 96543 21098 • Support</div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Bottom Actions - NOW FULLY FUNCTIONAL */}
            <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50 shrink-0">
               <button 
                 onClick={() => handleOpenTest(selectedAgent)}
                 className="w-full py-3 bg-blue-600 text-white rounded-lg text-[13px] font-bold shadow-sm hover:bg-blue-700 flex items-center justify-center gap-2 transition-all cursor-pointer hover:shadow active:scale-[0.99]"
               >
                 <Play className="size-4 fill-current" /> Test Agent
               </button>
               <button 
                 onClick={() => handleOpenEdit(selectedAgent)}
                 className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-lg text-[13px] font-bold shadow-sm hover:bg-slate-50 flex items-center justify-center gap-2 transition-all cursor-pointer"
               >
                 <Edit className="size-4" /> Edit Agent
               </button>
               <button 
                 onClick={() => handleOpenDelete(selectedAgent)}
                 className="w-full py-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-lg text-[13px] font-bold shadow-sm hover:bg-rose-100 flex items-center justify-center gap-2 transition-all cursor-pointer"
               >
                 <Trash2 className="size-4" /> Delete Agent
               </button>
            </div>
          </div>
        )}
      </div>

      {/* ===================== MODAL 1: TEST AGENT SIMULATOR ===================== */}
      {isTestModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#0f2c6a] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-blue-500/30 border border-blue-400 flex items-center justify-center text-blue-300">
                  <Bot className="size-5" />
                </div>
                <div>
                  <div className="text-base font-bold flex items-center gap-2">
                    {selectedAgent.name}
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-xs text-blue-200 font-medium">
                    Testing Voice Call • {selectedAgent.voice} • {selectedAgent.language}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-900/80 px-2.5 py-1 rounded-md text-xs font-mono font-bold text-blue-200 border border-blue-700">
                  {formatTimer(callDuration)}
                </span>
                <button 
                  onClick={() => setIsTestModalOpen(false)}
                  className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Audio Waveform Simulator */}
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Volume2 className="size-4 text-emerald-400 animate-pulse" />
                <span>{isCallPaused ? "Call On Hold" : isCallMuted ? "Mic Muted" : "AI Agent Speaking..."}</span>
              </div>
              <div className="flex items-center gap-1.5 h-6">
                {[12, 22, 16, 28, 14, 24, 18, 10, 26, 15].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-gradient-to-t from-sky-500 to-emerald-400 rounded-full transition-all duration-300"
                    style={{
                      height: isCallPaused ? "4px" : `${h}px`,
                      opacity: isCallPaused ? 0.3 : 0.9,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="p-5 flex-1 max-h-[300px] overflow-y-auto space-y-3 bg-[#f8fafc]">
              {testMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-xs"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-xs"
                    }`}
                  >
                    {msg.sender === "agent" && (
                      <div className="text-[10px] font-bold text-blue-600 mb-1 uppercase tracking-wider flex items-center gap-1">
                        <Bot className="size-3" /> {selectedAgent.name}
                      </div>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Test Prompt Chips */}
            <div className="px-5 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
              <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase">Try:</span>
              <button 
                type="button" 
                onClick={() => { setInputMessage("What is the pricing plan?"); }}
                className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                Pricing Inquiry
              </button>
              <button 
                type="button" 
                onClick={() => { setInputMessage("I want to report an issue with my call."); }}
                className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                Report Issue
              </button>
              <button 
                type="button" 
                onClick={() => { setInputMessage("Can you check my digital ticket status?"); }}
                className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer text-xs"
              >
                Check Ticket
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendTestMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type or simulate user speech..."
                className="flex-1 px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Send className="size-3.5" /> Speak
              </button>
            </form>

            {/* Bottom Call Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCallMuted(!isCallMuted)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    isCallMuted 
                      ? "bg-rose-50 border-rose-200 text-rose-600" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {isCallMuted ? <MicOff className="size-3.5" /> : <Mic className="size-3.5" />}
                  <span>{isCallMuted ? "Unmute" : "Mute"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsCallPaused(!isCallPaused)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors cursor-pointer ${
                    isCallPaused 
                      ? "bg-amber-50 border-amber-200 text-amber-600" 
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Pause className="size-3.5" />
                  <span>{isCallPaused ? "Resume" : "Hold"}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsTestModalOpen(false)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <PhoneOff className="size-3.5" /> End Test Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL 2: EDIT AGENT MODAL ===================== */}
      {isEditModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Edit className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Edit Agent: {selectedAgent.name}</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Agent Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Description</label>
                <input
                  type="text"
                  value={editForm.desc}
                  onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Payment</option>
                    <option>Follow-up</option>
                    <option>Information</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status</label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Language</label>
                  <select
                    value={editForm.language}
                    onChange={(e) => setEditForm({ ...editForm, language: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Voice Model</label>
                  <select
                    value={editForm.voice}
                    onChange={(e) => setEditForm({ ...editForm, voice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Female (Neerja)</option>
                    <option>Male (Arjun)</option>
                    <option>Female (Pranali)</option>
                    <option>Male (Rohan)</option>
                    <option>Female (Sneha)</option>
                    <option>Male (Karan)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL 3: DELETE AGENT CONFIRMATION ===================== */}
      {isDeleteModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center">
            <div className="size-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Trash2 className="size-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Delete AI Agent?</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-700">{selectedAgent.name}</span> ({selectedAgent.id})? All call routing and associated voice logs will be unassigned.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Delete Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL 4: ADD NEW AGENT ===================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Plus className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Add New Calling Agent</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Agent Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Specialist"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Handles product demos and routing"
                  value={addForm.desc}
                  onChange={(e) => setAddForm({ ...addForm, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Type</label>
                  <select
                    value={addForm.type}
                    onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Payment</option>
                    <option>Follow-up</option>
                    <option>Information</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status</label>
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Active</option>
                    <option>On Hold</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Language</label>
                  <select
                    value={addForm.language}
                    onChange={(e) => setAddForm({ ...addForm, language: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Voice Model</label>
                  <select
                    value={addForm.voice}
                    onChange={(e) => setAddForm({ ...addForm, voice: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Female (Neerja)</option>
                    <option>Male (Arjun)</option>
                    <option>Female (Pranali)</option>
                    <option>Male (Rohan)</option>
                    <option>Female (Sneha)</option>
                    <option>Male (Karan)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiAgentsContent;
