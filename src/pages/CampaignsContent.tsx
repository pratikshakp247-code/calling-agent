import { useState } from "react";
import { 
  Megaphone, Plus, Search, ChevronDown, PhoneCall, Activity, CheckCircle2,
  Play, Pause, BarChart2, Edit, Trash2, X, Clock, Users, ArrowUpRight,
  TrendingUp, TrendingDown, RefreshCw, AlertCircle, Bot, Sliders, Calendar,
  Star, MoreVertical, Square, Check, Phone, Shield
} from "lucide-react";

export interface CampaignItem {
  id: string;
  name: string;
  desc: string;
  type: "Outbound" | "Inbound";
  targetAudience: string;
  totalCalls: number;
  successRate: string;
  status: "Running" | "Completed" | "Paused" | "Draft";
  createdOn: string;
  createdBy: string;
  avatarBg: string;
  successfulCalls: number;
  failedCalls: number;
  avgDuration: string;
  noAnswerCount: number;
  recentActivities: Array<{
    title: string;
    time: string;
    icon: any;
    iconColor: string;
    iconBg: string;
  }>;
}

const initialCampaigns: CampaignItem[] = [
  {
    id: "CMP-001",
    name: "Sales Outreach - Q4",
    desc: "Product promotion campaign for existing customers.",
    type: "Outbound",
    targetAudience: "Existing Customers",
    totalCalls: 2340,
    successRate: "82%",
    status: "Running",
    createdOn: "Oct 1, 2026 • 10:32 AM",
    createdBy: "Pratiksha Patil",
    avatarBg: "bg-purple-100 text-purple-600",
    successfulCalls: 1919,
    failedCalls: 156,
    avgDuration: "04:32",
    noAnswerCount: 265,
    recentActivities: [
      { title: "Campaign started", time: "Oct 1, 2026 • 10:32 AM", icon: Play, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { title: "1,200 calls completed", time: "Oct 2, 2026 • 09:15 AM", icon: PhoneCall, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
      { title: "Performance review", time: "Oct 3, 2026 • 11:20 AM", icon: BarChart2, iconColor: "text-purple-600", iconBg: "bg-purple-50" },
    ]
  },
  {
    id: "CMP-002",
    name: "Customer Support",
    desc: "Support follow-up calls for open inquiries.",
    type: "Inbound",
    targetAudience: "Support Tickets",
    totalCalls: 1892,
    successRate: "76%",
    status: "Running",
    createdOn: "Sep 28, 2026 • 02:15 PM",
    createdBy: "Rahul Sharma",
    avatarBg: "bg-purple-100 text-purple-600",
    successfulCalls: 1437,
    failedCalls: 182,
    avgDuration: "05:10",
    noAnswerCount: 273,
    recentActivities: [
      { title: "Support routing initiated", time: "Sep 28, 2026 • 02:15 PM", icon: Play, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
      { title: "Agent allocation scaled up", time: "Sep 29, 2026 • 10:00 AM", icon: Bot, iconColor: "text-purple-600", iconBg: "bg-purple-50" },
    ]
  },
  {
    id: "CMP-003",
    name: "Payment Reminder",
    desc: "Payment due notifications and automated collections.",
    type: "Outbound",
    targetAudience: "Due Customers",
    totalCalls: 1245,
    successRate: "88%",
    status: "Completed",
    createdOn: "Sep 25, 2026 • 11:20 AM",
    createdBy: "Vivek Kulkarni",
    avatarBg: "bg-blue-100 text-blue-600",
    successfulCalls: 1095,
    failedCalls: 65,
    avgDuration: "02:45",
    noAnswerCount: 85,
    recentActivities: [
      { title: "Batch notifications completed", time: "Sep 25, 2026 • 11:20 AM", icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    ]
  },
  {
    id: "CMP-004",
    name: "Feedback Collection",
    desc: "Customer feedback survey and CSAT ratings.",
    type: "Outbound",
    targetAudience: "Recent Customers",
    totalCalls: 980,
    successRate: "74%",
    status: "Paused",
    createdOn: "Sep 22, 2026 • 04:45 PM",
    createdBy: "Sneha Patil",
    avatarBg: "bg-amber-100 text-amber-600",
    successfulCalls: 725,
    failedCalls: 95,
    avgDuration: "03:15",
    noAnswerCount: 160,
    recentActivities: [
      { title: "Survey paused by admin", time: "Sep 24, 2026 • 03:30 PM", icon: Pause, iconColor: "text-amber-600", iconBg: "bg-amber-50" },
    ]
  },
  {
    id: "CMP-005",
    name: "Appointment Booking",
    desc: "Schedule consultations and product demo calls.",
    type: "Outbound",
    targetAudience: "Prospects",
    totalCalls: 765,
    successRate: "81%",
    status: "Running",
    createdOn: "Sep 20, 2026 • 09:18 AM",
    createdBy: "Amit Desai",
    avatarBg: "bg-emerald-100 text-emerald-600",
    successfulCalls: 619,
    failedCalls: 48,
    avgDuration: "04:12",
    noAnswerCount: 98,
    recentActivities: [
      { title: "Outbound dialer started", time: "Sep 20, 2026 • 09:18 AM", icon: Play, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    ]
  },
  {
    id: "CMP-006",
    name: "Re-engagement",
    desc: "Win back inactive customers with personalized incentives.",
    type: "Outbound",
    targetAudience: "Inactive Customers",
    totalCalls: 654,
    successRate: "69%",
    status: "Draft",
    createdOn: "Sep 18, 2026 • 03:12 PM",
    createdBy: "Pratiksha Patil",
    avatarBg: "bg-rose-100 text-rose-600",
    successfulCalls: 451,
    failedCalls: 72,
    avgDuration: "03:40",
    noAnswerCount: 131,
    recentActivities: [
      { title: "Campaign draft prepared", time: "Sep 18, 2026 • 03:12 PM", icon: Edit, iconColor: "text-slate-600", iconBg: "bg-slate-100" },
    ]
  },
  {
    id: "CMP-007",
    name: "Product Demo",
    desc: "Demo call campaign for newly registered web leads.",
    type: "Outbound",
    targetAudience: "Leads",
    totalCalls: 432,
    successRate: "87%",
    status: "Completed",
    createdOn: "Sep 15, 2026 • 10:05 AM",
    createdBy: "Rahul Sharma",
    avatarBg: "bg-sky-100 text-sky-600",
    successfulCalls: 375,
    failedCalls: 22,
    avgDuration: "06:15",
    noAnswerCount: 35,
    recentActivities: [
      { title: "Product demos finished", time: "Sep 15, 2026 • 10:05 AM", icon: CheckCircle2, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    ]
  },
  {
    id: "CMP-008",
    name: "Survey Campaign",
    desc: "Customer satisfaction survey for annual review.",
    type: "Inbound",
    targetAudience: "Existing Customers",
    totalCalls: 321,
    successRate: "72%",
    status: "Running",
    createdOn: "Sep 12, 2026 • 01:30 PM",
    createdBy: "Sneha Patil",
    avatarBg: "bg-purple-100 text-purple-600",
    successfulCalls: 231,
    failedCalls: 29,
    avgDuration: "03:25",
    noAnswerCount: 61,
    recentActivities: [
      { title: "Customer survey live", time: "Sep 12, 2026 • 01:30 PM", icon: Play, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    ]
  },
];

const campaignKpis = [
  { 
    label: "Total Campaigns", 
    value: "12", 
    trend: "+20% this month", 
    color: "bg-blue-50/50", 
    borderColor: "border-blue-200", 
    wave: "bg-blue-200/50", 
    iconBg: "bg-blue-100 text-blue-600", 
    icon: Bot 
  },
  { 
    label: "Total Calls", 
    value: "8,524", 
    trend: "+18% this week", 
    color: "bg-purple-50/50", 
    borderColor: "border-purple-200", 
    wave: "bg-purple-200/50", 
    iconBg: "bg-purple-100 text-purple-600", 
    icon: PhoneCall 
  },
  { 
    label: "Successful Calls", 
    value: "6,842", 
    trend: "+24% this week", 
    color: "bg-emerald-50/50", 
    borderColor: "border-emerald-200", 
    wave: "bg-emerald-200/50", 
    iconBg: "bg-emerald-100 text-emerald-600", 
    icon: CheckCircle2 
  },
  { 
    label: "Avg. Success Rate", 
    value: "80.3%", 
    trend: "+6% this week", 
    color: "bg-sky-50/50", 
    borderColor: "border-sky-200", 
    wave: "bg-sky-200/50", 
    iconBg: "bg-sky-100 text-sky-600", 
    icon: Star 
  },
];

export default function CampaignsContent() {
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(initialCampaigns[0]);
  const [activeTab, setActiveTab] = useState<"Overview" | "Performance" | "Call List" | "Settings">("Overview");

  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("Last 30 days");

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form state
  const [formState, setFormState] = useState({
    name: "",
    desc: "",
    type: "Outbound" as "Outbound" | "Inbound",
    targetAudience: "Existing Customers",
    totalCalls: 1000,
    status: "Running" as "Running" | "Completed" | "Paused" | "Draft",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle Pause/Play
  const handleTogglePause = (campaign: CampaignItem) => {
    const nextStatus = campaign.status === "Running" ? "Paused" : "Running";
    const updated = { ...campaign, status: nextStatus };
    setCampaigns(prev => prev.map(c => c.id === campaign.id ? updated : c));
    setSelectedCampaign(updated);
    showToast(`Campaign "${campaign.name}" is now ${nextStatus.toLowerCase()}.`);
  };

  // Stop Campaign
  const handleStopCampaign = (campaign: CampaignItem) => {
    const updated = { ...campaign, status: "Completed" as const };
    setCampaigns(prev => prev.map(c => c.id === campaign.id ? updated : c));
    setSelectedCampaign(updated);
    showToast(`Campaign "${campaign.name}" marked as completed.`);
  };

  // Open Edit
  const handleOpenEdit = (campaign: CampaignItem) => {
    setSelectedCampaign(campaign);
    setFormState({
      name: campaign.name,
      desc: campaign.desc,
      type: campaign.type,
      targetAudience: campaign.targetAudience,
      totalCalls: campaign.totalCalls,
      status: campaign.status,
    });
    setIsEditModalOpen(true);
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const updated: CampaignItem = {
      ...selectedCampaign,
      name: formState.name,
      desc: formState.desc,
      type: formState.type,
      targetAudience: formState.targetAudience,
      totalCalls: Number(formState.totalCalls),
      status: formState.status,
    };

    setCampaigns(prev => prev.map(c => c.id === selectedCampaign.id ? updated : c));
    setSelectedCampaign(updated);
    setIsEditModalOpen(false);
    showToast(`Campaign "${updated.name}" updated successfully!`);
  };

  // Create Campaign
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const newId = `CMP-00${campaigns.length + 1}`;
    const newCamp: CampaignItem = {
      id: newId,
      name: formState.name,
      desc: formState.desc || "Automated calling campaign.",
      type: formState.type,
      targetAudience: formState.targetAudience,
      totalCalls: Number(formState.totalCalls) || 500,
      successRate: "78%",
      status: formState.status,
      createdOn: "Oct 12, 2026 • " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdBy: "Pratiksha Patil",
      avatarBg: "bg-purple-100 text-purple-600",
      successfulCalls: Math.floor((Number(formState.totalCalls) || 500) * 0.78),
      failedCalls: 35,
      avgDuration: "04:15",
      noAnswerCount: 45,
      recentActivities: [
        { title: "Campaign created", time: "Just now", icon: Play, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" }
      ]
    };

    setCampaigns([newCamp, ...campaigns]);
    setSelectedCampaign(newCamp);
    setIsCreateModalOpen(false);
    showToast(`New campaign "${newCamp.name}" launched successfully!`);
  };

  // Delete Campaign
  const handleConfirmDelete = () => {
    if (!selectedCampaign) return;
    const name = selectedCampaign.name;
    const remaining = campaigns.filter(c => c.id !== selectedCampaign.id);
    setCampaigns(remaining);
    setSelectedCampaign(remaining.length > 0 ? remaining[0] : null);
    setIsDeleteModalOpen(false);
    showToast(`Campaign "${name}" deleted.`);
  };

  // Clear Filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
    setDateFilter("Last 30 days");
  };

  // Filtered Campaigns
  const filteredCampaigns = campaigns.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.targetAudience.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "All Types" || c.type === typeFilter;
    const matchesStatus = statusFilter === "All Status" || c.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] p-8 flex flex-col bg-[#f4f7fb] relative">
      {/* Toast Alert */}
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
            <Megaphone className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Campaigns</h1>
            <p className="text-sm text-slate-500 mt-1">Create and manage your calling campaigns. Track performance and optimize results.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setFormState({
              name: "",
              desc: "",
              type: "Outbound",
              targetAudience: "Existing Customers",
              totalCalls: 1000,
              status: "Running",
            });
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all cursor-pointer hover:shadow"
        >
          <Plus className="size-4" /> Create Campaign
        </button>
      </div>

      {/* 4 KPI Cards (Matching Image 1 Data & Image 2 Wave Format) */}
      <div className="grid grid-cols-4 gap-4 mb-6 shrink-0">
        {campaignKpis.map((kpi) => (
          <div 
            key={kpi.label} 
            className={`relative overflow-hidden rounded-xl border ${kpi.borderColor} p-4 ${kpi.color} shadow-sm h-28 flex flex-col justify-between group hover:shadow-md transition-all`}
          >
            <div className={`absolute -bottom-8 -right-8 size-24 rounded-full ${kpi.wave} blur-xl group-hover:scale-110 transition-transform duration-500`} />
            <div className={`absolute bottom-0 right-0 size-20 rounded-tl-full ${kpi.wave} opacity-40`} />
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-[12px] font-bold text-slate-700 leading-tight">{kpi.label}</span>
              <div className={`size-6 rounded-md flex items-center justify-center shadow-sm ${kpi.iconBg} bg-white/60 backdrop-blur-sm border border-white`}>
                <kpi.icon className="size-3.5" />
              </div>
            </div>
            
            <div className="relative z-10 flex items-baseline justify-between">
              <div className="text-2xl font-black text-slate-800 tracking-tight">{kpi.value}</div>
              <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-0.5">
                <span>↑ {kpi.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Container: Left Table + Right Detail Drawer */}
      <div className="flex gap-6 items-start">
        {/* Left Side: Campaigns Table */}
        <div className={`flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${selectedCampaign ? "flex-1 min-w-0" : "w-full"}`}>
          {/* Search & Filters Bar (Matching Image 1) */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0 flex-wrap">
            <div className="relative flex-1 min-w-[260px] max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaign name, ID, or description..." 
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500" 
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Campaign Type</span>
                <div className="relative">
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none cursor-pointer w-28"
                  >
                    <option>All Types</option>
                    <option>Outbound</option>
                    <option>Inbound</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Status</span>
                <div className="relative">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none cursor-pointer w-28"
                  >
                    <option>All Status</option>
                    <option>Running</option>
                    <option>Completed</option>
                    <option>Paused</option>
                    <option>Draft</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 mb-0.5 uppercase tracking-wide">Date Range</span>
                <div className="relative">
                  <select 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none cursor-pointer w-32"
                  >
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>This Quarter</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
                </div>
              </div>

              <button 
                onClick={handleClearFilters}
                className="text-xs font-bold text-blue-600 mt-3.5 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="size-3.5" /> Clear Filters
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h2 className="text-base font-bold text-slate-800">Campaigns ({filteredCampaigns.length})</h2>
          </div>

          {/* Table (Matching Image 1 Columns & 8 Exact Rows) */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap min-w-max">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 size-4" /></th>
                  <th className="px-3 py-4">Campaign Name ↕</th>
                  <th className="px-3 py-4">ID</th>
                  <th className="px-3 py-4">Type</th>
                  <th className="px-3 py-4">Target Audience</th>
                  <th className="px-3 py-4 text-center">Total Calls</th>
                  <th className="px-3 py-4 text-center">Success Rate</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Created On</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCampaigns.map((camp) => {
                  const isSelected = selectedCampaign?.id === camp.id;
                  return (
                    <tr 
                      key={camp.id}
                      onClick={() => setSelectedCampaign(camp)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/60" : ""}`}
                    >
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 size-4" />
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-9 rounded-full flex items-center justify-center shrink-0 ${camp.avatarBg}`}>
                            <Bot className="size-4.5" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-[13px]">{camp.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{camp.desc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 font-bold text-slate-600">{camp.id}</td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                          camp.type === "Outbound" 
                            ? "text-blue-700 bg-blue-50 border-blue-200" 
                            : "text-purple-700 bg-purple-50 border-purple-200"
                        }`}>
                          {camp.type}
                        </span>
                      </td>
                      <td className="px-3 py-4 font-semibold text-slate-700">{camp.targetAudience}</td>
                      <td className="px-3 py-4 text-center font-bold text-slate-800">{camp.totalCalls.toLocaleString()}</td>
                      <td className="px-3 py-4 text-center font-bold text-slate-800">{camp.successRate}</td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-flex items-center gap-1.5 ${
                          camp.status === "Running" 
                            ? "text-emerald-700 bg-emerald-50 border-emerald-200" 
                            : camp.status === "Completed"
                            ? "text-blue-700 bg-blue-50 border-blue-200"
                            : camp.status === "Paused"
                            ? "text-amber-700 bg-amber-50 border-amber-200"
                            : "text-slate-600 bg-slate-100 border-slate-200"
                        }`}>
                          <span className={`size-1.5 rounded-full ${
                            camp.status === "Running" ? "bg-emerald-500 animate-pulse" : "bg-current"
                          }`} />
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-slate-600 font-medium">{camp.createdOn}</td>
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(camp)}
                            title="Edit"
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit className="size-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedCampaign(camp);
                              setIsDeleteModalOpen(true);
                            }}
                            title="Delete"
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-b-xl shrink-0">
            <div className="text-xs font-bold text-slate-500">
              Showing 1 to {filteredCampaigns.length} of {campaigns.length} campaigns
            </div>
            <div className="flex items-center gap-1.5">
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-white font-bold">&lt;</button>
              <button className="size-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold shadow-sm text-sm">1</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">2</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">&gt;</button>
            </div>
          </div>
        </div>

        {/* Right Side: Campaign Details Drawer (Matching Image 1 Exactly) */}
        {selectedCampaign && (
          <div className="w-[380px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-800">Campaign Details</span>
                <button 
                  onClick={() => setSelectedCampaign(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex items-start gap-4">
                <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Megaphone className="size-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-800 leading-tight">{selectedCampaign.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      {selectedCampaign.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {selectedCampaign.id} • {selectedCampaign.type}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {selectedCampaign.desc}
                  </div>
                </div>
              </div>

              {/* Drawer Tabs */}
              <div className="flex gap-6 mt-6 border-b border-slate-100">
                {(["Overview", "Performance", "Call List", "Settings"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs font-bold transition-colors cursor-pointer relative ${
                      activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[calc(100vh-380px)]">
              {activeTab === "Overview" && (
                <>
                  {/* Campaign Information Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="size-3.5 text-blue-600" /> Campaign Information
                      </h4>
                      <button 
                        onClick={() => handleOpenEdit(selectedCampaign)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="size-3" /> Edit
                      </button>
                    </div>

                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Campaign Name</span>
                        <span className="text-slate-800 font-bold">{selectedCampaign.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Campaign ID</span>
                        <span className="text-slate-800 font-bold">{selectedCampaign.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Type</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200">
                          {selectedCampaign.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Target Audience</span>
                        <span className="text-slate-800 font-bold">{selectedCampaign.targetAudience}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Created On</span>
                        <span className="text-slate-700 font-semibold">{selectedCampaign.createdOn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Created By</span>
                        <span className="text-slate-800 font-bold">{selectedCampaign.createdBy}</span>
                      </div>
                    </div>
                  </div>

                  {/* Call Statistics Section */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Activity className="size-3.5 text-blue-600" /> Call Statistics
                      </h4>
                      <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                        View Report
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Calls</div>
                        <div className="text-base font-black text-slate-800">{selectedCampaign.totalCalls.toLocaleString()}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 12%</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Successful Calls</div>
                        <div className="text-base font-black text-slate-800">{selectedCampaign.successfulCalls.toLocaleString()}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 18%</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Failed Calls</div>
                        <div className="text-base font-black text-slate-800">{selectedCampaign.failedCalls}</div>
                        <div className="text-[9px] font-bold text-rose-500 mt-1">↓ 5%</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Avg. Duration</div>
                        <div className="text-base font-black text-slate-800">{selectedCampaign.avgDuration}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 10%</div>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Progress Section (Donut Chart & Breakdown) */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-blue-600" /> Campaign Progress
                    </h4>
                    
                    <div className="flex items-center gap-6 p-4 rounded-xl border border-slate-200 bg-white">
                      {/* Donut Chart Ring */}
                      <div className="relative size-24 shrink-0 flex items-center justify-center">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                          <circle 
                            cx="18" 
                            cy="18" 
                            r="14" 
                            fill="none" 
                            stroke="#0ea5e9" 
                            strokeWidth="3"
                            strokeDasharray="82, 100" 
                            strokeLinecap="round" 
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-base font-black text-slate-800 leading-none">{selectedCampaign.successRate}</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase mt-0.5">Success Rate</span>
                        </div>
                      </div>

                      {/* Legend Breakdown */}
                      <div className="space-y-2 flex-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <span className="size-2 rounded-full bg-teal-500" /> Successful Calls Rate
                          </span>
                          <span className="font-bold text-slate-800">{selectedCampaign.successfulCalls.toLocaleString()} (82%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <span className="size-2 rounded-full bg-rose-500" /> Failed
                          </span>
                          <span className="font-bold text-slate-800">{selectedCampaign.failedCalls} (7%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <span className="size-2 rounded-full bg-sky-400" /> No Answer
                          </span>
                          <span className="font-bold text-slate-800">{selectedCampaign.noAnswerCount} (11%)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity Section */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Clock className="size-3.5 text-blue-600" /> Recent Activity
                    </h4>

                    <div className="space-y-3">
                      {selectedCampaign.recentActivities.map((act, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                          <div className={`size-8 rounded-full flex items-center justify-center ${act.iconBg} ${act.iconColor} shrink-0`}>
                            <act.icon className="size-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-800">{act.title}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{act.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons (Matching Image 1) */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      onClick={() => handleTogglePause(selectedCampaign)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                    >
                      {selectedCampaign.status === "Running" ? (
                        <>
                          <Pause className="size-4" /> Pause Campaign
                        </>
                      ) : (
                        <>
                          <Play className="size-4 fill-current" /> Resume Campaign
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleStopCampaign(selectedCampaign)}
                      className="w-full py-2.5 bg-white border border-rose-300 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Square className="size-3.5 fill-current" /> Stop Campaign
                    </button>
                  </div>
                </>
              )}

              {activeTab === "Performance" && (
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-2">Hourly Call Performance</span>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span>Peak Calling Hour</span><span className="font-bold">11:00 AM - 01:00 PM</span></div>
                      <div className="flex justify-between"><span>Average Answer Time</span><span className="font-bold">8.4 seconds</span></div>
                      <div className="flex justify-between"><span>AI Agent Sentiment</span><span className="font-bold text-emerald-600">88% Positive</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Call List" && (
                <div className="space-y-3 text-xs">
                  <div className="text-slate-500 font-medium mb-2">Leads queued in {selectedCampaign.name}:</div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between">
                    <div><div className="font-bold">Rohan Verma</div><div className="text-slate-400 text-[10px]">+91 98765 11223</div></div>
                    <span className="text-emerald-600 font-bold">Answered</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-lg flex justify-between">
                    <div><div className="font-bold">Ananya Sen</div><div className="text-slate-400 text-[10px]">+91 98234 44556</div></div>
                    <span className="text-blue-600 font-bold">Dialing...</span>
                  </div>
                </div>
              )}

              {activeTab === "Settings" && (
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span>Retry Unanswered Leads</span>
                    <input type="checkbox" defaultChecked className="rounded size-4 text-blue-600" />
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span>Recording & Speech Analytics</span>
                    <input type="checkbox" defaultChecked className="rounded size-4 text-blue-600" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===================== MODAL 1: CREATE CAMPAIGN ===================== */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Megaphone className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Create New Campaign</h3>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Outreach - Q4"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Description</label>
                <input
                  type="text"
                  placeholder="e.g. Product promotion campaign for existing customers"
                  value={formState.desc}
                  onChange={(e) => setFormState({ ...formState, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Type</label>
                  <select
                    value={formState.type}
                    onChange={(e: any) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option>Outbound</option>
                    <option>Inbound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status</label>
                  <select
                    value={formState.status}
                    onChange={(e: any) => setFormState({ ...formState, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option>Running</option>
                    <option>Completed</option>
                    <option>Paused</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Target Audience</label>
                  <select
                    value={formState.targetAudience}
                    onChange={(e) => setFormState({ ...formState, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option>Existing Customers</option>
                    <option>Support Tickets</option>
                    <option>Due Customers</option>
                    <option>Recent Customers</option>
                    <option>Prospects</option>
                    <option>Leads</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Total Calls</label>
                  <input
                    type="number"
                    value={formState.totalCalls}
                    onChange={(e) => setFormState({ ...formState, totalCalls: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL 2: EDIT CAMPAIGN ===================== */}
      {isEditModalOpen && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Edit className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Edit Campaign: {selectedCampaign.name}</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Campaign Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Description</label>
                <input
                  type="text"
                  value={formState.desc}
                  onChange={(e) => setFormState({ ...formState, desc: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Type</label>
                  <select
                    value={formState.type}
                    onChange={(e: any) => setFormState({ ...formState, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option>Outbound</option>
                    <option>Inbound</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status</label>
                  <select
                    value={formState.status}
                    onChange={(e: any) => setFormState({ ...formState, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option>Running</option>
                    <option>Completed</option>
                    <option>Paused</option>
                    <option>Draft</option>
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

      {/* ===================== MODAL 3: DELETE CONFIRMATION ===================== */}
      {isDeleteModalOpen && selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center">
            <div className="size-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <Trash2 className="size-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">Delete Campaign?</h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Are you sure you want to delete <span className="font-bold text-slate-700">{selectedCampaign.name}</span> ({selectedCampaign.id})? All call records and queue logs will be permanently removed.
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
                Delete Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
