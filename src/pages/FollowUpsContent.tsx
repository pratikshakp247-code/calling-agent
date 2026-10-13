import { useState } from "react";
import {
  Calendar, Clock, AlertCircle, CheckCircle2, Plus, Search, ChevronDown,
  RefreshCw, Phone, Mail, User, Tag, ArrowUpRight, Edit, Check,
  X, CalendarClock, MoreVertical, MessageSquare, PhoneCall, Play,
  Square, Shield, ExternalLink, Filter, ChevronRight
} from "lucide-react";

export interface FollowUpItem {
  id: string;
  customerName: string;
  initials: string;
  avatarBg: string;
  phoneNumber: string;
  email: string;
  relatedCallId: string;
  callType: "Outbound" | "Inbound";
  callDuration: string;
  callOutcome: string;
  callSummary: string;
  reason: string;
  assignedAgent: string;
  agentInitials: string;
  agentAvatarBg: string;
  scheduledDateTime: string;
  priority: "High" | "Medium" | "Low";
  status: "Due Today" | "Pending" | "Overdue" | "Completed";
  customerGroup: string;
  tags: string[];
  createdOn: string;
  statusHistory: Array<{
    title: string;
    time: string;
    color: string;
  }>;
  notes: Array<{
    author: string;
    text: string;
    time: string;
  }>;
}

const initialFollowUps: FollowUpItem[] = [
  {
    id: "FU-1001",
    customerName: "Rahul Sharma",
    initials: "RS",
    avatarBg: "bg-blue-600 text-white",
    phoneNumber: "+91 98765 12345",
    email: "rahul.sharma@email.com",
    relatedCallId: "CL-10231",
    callType: "Outbound",
    callDuration: "04:32",
    callOutcome: "Interested",
    callSummary: "Customer asked about pricing and requested a detailed demo.",
    reason: "Pricing Inquiry",
    assignedAgent: "Priya Deshmukh",
    agentInitials: "PD",
    agentAvatarBg: "bg-purple-600 text-white",
    scheduledDateTime: "12 Oct, 03:30 PM",
    priority: "High",
    status: "Due Today",
    customerGroup: "Sales",
    tags: ["VIP", "Customer"],
    createdOn: "Aug 12, 2026 • 10:24 AM",
    statusHistory: [
      { title: "Created", time: "10 Oct, 2026 • 11:20 AM", color: "bg-blue-500" },
      { title: "Assigned to Priya Deshmukh", time: "10 Oct, 2026 • 02:15 PM", color: "bg-purple-500" },
      { title: "Status set to Due Today", time: "11 Oct, 2026 • 09:30 AM", color: "bg-amber-500" },
    ],
    notes: [
      { author: "Priya Deshmukh", text: "Customer prefers WhatsApp follow-up link along with the pricing quote PDF.", time: "10 Oct, 02:40 PM" }
    ]
  },
  {
    id: "FU-1002",
    customerName: "Amit Singh",
    initials: "AS",
    avatarBg: "bg-indigo-600 text-white",
    phoneNumber: "+91 87654 32109",
    email: "amit.singh@enterprise.in",
    relatedCallId: "CL-10228",
    callType: "Outbound",
    callDuration: "06:12",
    callOutcome: "Demo Scheduled",
    callSummary: "Requested live walkthrough of AI auto-dialer features.",
    reason: "Product Demo",
    assignedAgent: "Rohit Yadav",
    agentInitials: "RY",
    agentAvatarBg: "bg-indigo-600 text-white",
    scheduledDateTime: "12 Oct, 11:00 AM",
    priority: "Medium",
    status: "Pending",
    customerGroup: "Enterprise",
    tags: ["Hot Lead"],
    createdOn: "Sep 05, 2026 • 02:10 PM",
    statusHistory: [
      { title: "Created", time: "11 Oct, 2026 • 09:00 AM", color: "bg-blue-500" },
      { title: "Assigned to Rohit Yadav", time: "11 Oct, 2026 • 09:15 AM", color: "bg-purple-500" },
    ],
    notes: [
      { author: "Rohit Yadav", text: "Prepared sandbox environment with custom prompts for their call center.", time: "11 Oct, 10:30 AM" }
    ]
  },
  {
    id: "FU-1003",
    customerName: "Priya Deshmukh",
    initials: "PD",
    avatarBg: "bg-purple-600 text-white",
    phoneNumber: "+91 91234 56789",
    email: "priya.deshmukh@client.org",
    relatedCallId: "CL-10220",
    callType: "Inbound",
    callDuration: "08:45",
    callOutcome: "Escalated",
    callSummary: "Reported unexpected telephony trunk disconnection during peak hours.",
    reason: "Complaint",
    assignedAgent: "Sneha Joshi",
    agentInitials: "SJ",
    agentAvatarBg: "bg-pink-600 text-white",
    scheduledDateTime: "11 Oct, 04:15 PM",
    priority: "High",
    status: "Overdue",
    customerGroup: "Support",
    tags: ["High Priority", "SLA At Risk"],
    createdOn: "Jul 18, 2026 • 09:15 AM",
    statusHistory: [
      { title: "Created", time: "09 Oct, 2026 • 04:00 PM", color: "bg-blue-500" },
      { title: "Escalated to Tier 2", time: "10 Oct, 2026 • 11:00 AM", color: "bg-rose-500" },
      { title: "Overdue alert generated", time: "11 Oct, 2026 • 04:15 PM", color: "bg-rose-500" },
    ],
    notes: [
      { author: "Sneha Joshi", text: "Network ops confirmed SIP server reconnect. Callback urgently needed.", time: "11 Oct, 04:45 PM" }
    ]
  },
  {
    id: "FU-1004",
    customerName: "Sagar Kale",
    initials: "SK",
    avatarBg: "bg-amber-600 text-white",
    phoneNumber: "+91 99887 76654",
    email: "sagar.kale@biztech.com",
    relatedCallId: "CL-10218",
    callType: "Outbound",
    callDuration: "03:15",
    callOutcome: "Follow-up",
    callSummary: "Discussed annual maintenance contract renewal terms.",
    reason: "Follow-up Call",
    assignedAgent: "Amit Patil",
    agentInitials: "AP",
    agentAvatarBg: "bg-emerald-600 text-white",
    scheduledDateTime: "13 Oct, 10:00 AM",
    priority: "Low",
    status: "Pending",
    customerGroup: "Operations",
    tags: ["SMB", "Renewal"],
    createdOn: "Aug 29, 2026 • 11:45 AM",
    statusHistory: [
      { title: "Created", time: "11 Oct, 2026 • 01:20 PM", color: "bg-blue-500" },
      { title: "Assigned to Amit Patil", time: "11 Oct, 2026 • 02:00 PM", color: "bg-purple-500" },
    ],
    notes: [
      { author: "Amit Patil", text: "Sent revised quote with 10% annual billing discount.", time: "11 Oct, 02:15 PM" }
    ]
  },
  {
    id: "FU-1005",
    customerName: "Neha More",
    initials: "NP",
    avatarBg: "bg-purple-600 text-white",
    phoneNumber: "+91 98765 43210",
    email: "neha.more@retailhub.in",
    relatedCallId: "CL-10215",
    callType: "Outbound",
    callDuration: "05:10",
    callOutcome: "Converted",
    callSummary: "Agreed to sign up for multi-channel conversational AI agent.",
    reason: "Sales Inquiry",
    assignedAgent: "Sneha Joshi",
    agentInitials: "SJ",
    agentAvatarBg: "bg-pink-600 text-white",
    scheduledDateTime: "10 Oct, 02:30 PM",
    priority: "Medium",
    status: "Completed",
    customerGroup: "Sales",
    tags: ["Signed Contract"],
    createdOn: "Aug 15, 2026 • 04:30 PM",
    statusHistory: [
      { title: "Created", time: "08 Oct, 2026 • 10:00 AM", color: "bg-blue-500" },
      { title: "Completed successfully", time: "10 Oct, 2026 • 02:50 PM", color: "bg-emerald-500" },
    ],
    notes: [
      { author: "Sneha Joshi", text: "Payment link processed. Onboarding call scheduled for next Monday.", time: "10 Oct, 03:00 PM" }
    ]
  },
  {
    id: "FU-1006",
    customerName: "Rohit Kumar",
    initials: "RK",
    avatarBg: "bg-blue-600 text-white",
    phoneNumber: "+91 87654 21098",
    email: "rohit.kumar@logistics.net",
    relatedCallId: "CL-10212",
    callType: "Outbound",
    callDuration: "02:50",
    callOutcome: "Interested",
    callSummary: "Wants to renew current AI call-forwarding license for 12 months.",
    reason: "Renewal",
    assignedAgent: "Rohit Yadav",
    agentInitials: "RY",
    agentAvatarBg: "bg-indigo-600 text-white",
    scheduledDateTime: "14 Oct, 12:45 PM",
    priority: "Low",
    status: "Pending",
    customerGroup: "Logistics",
    tags: ["Long-term Customer"],
    createdOn: "Sep 01, 2026 • 10:00 AM",
    statusHistory: [
      { title: "Created", time: "11 Oct, 2026 • 11:30 AM", color: "bg-blue-500" },
      { title: "Scheduled", time: "11 Oct, 2026 • 11:45 AM", color: "bg-blue-500" },
    ],
    notes: [
      { author: "Rohit Yadav", text: "Awaiting approval from procurement team.", time: "11 Oct, 12:00 PM" }
    ]
  },
  {
    id: "FU-1007",
    customerName: "Deepak Shinde",
    initials: "DS",
    avatarBg: "bg-indigo-800 text-white",
    phoneNumber: "+91 90123 45678",
    email: "deepak.shinde@shindegroup.com",
    relatedCallId: "CL-10208",
    callType: "Outbound",
    callDuration: "07:15",
    callOutcome: "Demo Scheduled",
    callSummary: "Requires Hindi and Marathi voice model demonstrations.",
    reason: "Product Demo",
    assignedAgent: "Priya Deshmukh",
    agentInitials: "PD",
    agentAvatarBg: "bg-purple-600 text-white",
    scheduledDateTime: "13 Oct, 03:00 PM",
    priority: "Medium",
    status: "Due Today",
    customerGroup: "Enterprise",
    tags: ["Multilingual", "Priority"],
    createdOn: "Aug 03, 2026 • 01:15 PM",
    statusHistory: [
      { title: "Created", time: "11 Oct, 2026 • 03:15 PM", color: "bg-blue-500" },
      { title: "Status marked as Due Today", time: "12 Oct, 2026 • 09:00 AM", color: "bg-amber-500" },
    ],
    notes: [
      { author: "Priya Deshmukh", text: "Prepared Marathi voice sample audio files for presentation.", time: "12 Oct, 09:15 AM" }
    ]
  },
  {
    id: "FU-1008",
    customerName: "Vikas Gupta",
    initials: "VG",
    avatarBg: "bg-rose-500 text-white",
    phoneNumber: "+91 99876 54321",
    email: "vikas.gupta@fintechcorp.in",
    relatedCallId: "CL-10205",
    callType: "Inbound",
    callDuration: "04:45",
    callOutcome: "Feedback Logged",
    callSummary: "Positive feedback on AI latency, requested custom CRM webhook.",
    reason: "Feedback",
    assignedAgent: "Amit Patil",
    agentInitials: "AP",
    agentAvatarBg: "bg-emerald-600 text-white",
    scheduledDateTime: "16 Oct, 11:30 AM",
    priority: "Low",
    status: "Pending",
    customerGroup: "FinTech",
    tags: ["Developer Feedback"],
    createdOn: "Jul 22, 2026 • 11:00 AM",
    statusHistory: [
      { title: "Created", time: "11 Oct, 2026 • 04:30 PM", color: "bg-blue-500" },
      { title: "Assigned to Amit Patil", time: "11 Oct, 2026 • 05:00 PM", color: "bg-purple-500" },
    ],
    notes: [
      { author: "Amit Patil", text: "Forwarded webhook documentation URL to client.", time: "11 Oct, 05:30 PM" }
    ]
  },
];

export default function FollowUpsContent() {
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(initialFollowUps);
  const [selectedItem, setSelectedItem] = useState<FollowUpItem | null>(initialFollowUps[0]);
  const [activeTab, setActiveTab] = useState<"Overview" | "Call History" | "Notes" | "Status History">("Overview");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [assignedAgentFilter, setAssignedAgentFilter] = useState("All Agents");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");
  const [typeFilter, setTypeFilter] = useState("All Types");

  // Modals & Active State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  // Form State for Add Follow-up
  const [newFollowUp, setNewFollowUp] = useState({
    customerName: "",
    phoneNumber: "",
    email: "",
    reason: "Pricing Inquiry",
    assignedAgent: "Priya Deshmukh",
    scheduledDateTime: "12 Oct, 04:00 PM",
    priority: "Medium" as "High" | "Medium" | "Low",
    status: "Due Today" as "Due Today" | "Pending" | "Overdue" | "Completed",
    customerGroup: "Sales",
  });

  // Call Simulator State
  const [callDuration, setCallDuration] = useState("00:15");
  const [isCallMuted, setIsCallMuted] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Toggle Complete
  const handleToggleComplete = (item: FollowUpItem) => {
    const nextStatus = item.status === "Completed" ? "Pending" : "Completed";
    const updated: FollowUpItem = {
      ...item,
      status: nextStatus,
      statusHistory: [
        {
          title: `Status set to ${nextStatus}`,
          time: "Just now",
          color: nextStatus === "Completed" ? "bg-emerald-500" : "bg-blue-500"
        },
        ...item.statusHistory
      ]
    };
    setFollowUps(prev => prev.map(f => f.id === item.id ? updated : f));
    if (selectedItem?.id === item.id) setSelectedItem(updated);
    showToast(`Follow-up ${item.id} marked as ${nextStatus}.`);
  };

  // Handle Add Follow-up
  const handleCreateFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFollowUp.customerName.trim() || !newFollowUp.phoneNumber.trim()) return;

    const initials = newFollowUp.customerName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "CU";
    const newId = `FU-${1000 + followUps.length + 1}`;
    const newItem: FollowUpItem = {
      id: newId,
      customerName: newFollowUp.customerName,
      initials,
      avatarBg: "bg-blue-600 text-white",
      phoneNumber: newFollowUp.phoneNumber,
      email: newFollowUp.email || "customer@example.com",
      relatedCallId: `CL-${10230 + followUps.length}`,
      callType: "Outbound",
      callDuration: "03:45",
      callOutcome: "Follow-up Scheduled",
      callSummary: "Scheduled direct callback from agent desk.",
      reason: newFollowUp.reason,
      assignedAgent: newFollowUp.assignedAgent,
      agentInitials: newFollowUp.assignedAgent.split(" ").map(n => n[0]).join("").toUpperCase(),
      agentAvatarBg: "bg-purple-600 text-white",
      scheduledDateTime: newFollowUp.scheduledDateTime,
      priority: newFollowUp.priority,
      status: newFollowUp.status,
      customerGroup: newFollowUp.customerGroup,
      tags: ["New Lead"],
      createdOn: "Oct 12, 2026 • 12:15 PM",
      statusHistory: [
        { title: "Created", time: "Just now", color: "bg-blue-500" },
        { title: `Assigned to ${newFollowUp.assignedAgent}`, time: "Just now", color: "bg-purple-500" }
      ],
      notes: []
    };

    setFollowUps([newItem, ...followUps]);
    setSelectedItem(newItem);
    setIsAddModalOpen(false);
    showToast(`Follow-up "${newId}" for ${newItem.customerName} created successfully!`);
  };

  // Add Note
  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedItem) return;
    const updatedNote = {
      author: "Pratiksha Patil",
      text: newNoteText.trim(),
      time: "Just now"
    };
    const updated: FollowUpItem = {
      ...selectedItem,
      notes: [updatedNote, ...selectedItem.notes]
    };
    setFollowUps(prev => prev.map(f => f.id === selectedItem.id ? updated : f));
    setSelectedItem(updated);
    setNewNoteText("");
    showToast("Note added successfully.");
  };

  // Reschedule
  const handleReschedule = (newDate: string) => {
    if (!selectedItem) return;
    const updated: FollowUpItem = {
      ...selectedItem,
      scheduledDateTime: newDate,
      statusHistory: [
        { title: `Rescheduled to ${newDate}`, time: "Just now", color: "bg-amber-500" },
        ...selectedItem.statusHistory
      ]
    };
    setFollowUps(prev => prev.map(f => f.id === selectedItem.id ? updated : f));
    setSelectedItem(updated);
    setIsRescheduleModalOpen(false);
    showToast(`Rescheduled to ${newDate}`);
  };

  // Filter Logic
  const filteredFollowUps = followUps.filter(item => {
    const matchesSearch = 
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phoneNumber.includes(searchQuery) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAgent = assignedAgentFilter === "All Agents" || item.assignedAgent === assignedAgentFilter;
    const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter;
    const matchesPriority = priorityFilter === "All Priorities" || item.priority === priorityFilter;
    const matchesType = typeFilter === "All Types" || item.reason === typeFilter;

    return matchesSearch && matchesAgent && matchesStatus && matchesPriority && matchesType;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setDateRange("Last 30 days");
    setAssignedAgentFilter("All Agents");
    setStatusFilter("All Statuses");
    setPriorityFilter("All Priorities");
    setTypeFilter("All Types");
    showToast("Filters reset to default.");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shadow-sm">
            <CalendarClock className="size-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Follow-ups</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage scheduled customer callbacks and pending follow-up actions.
            </p>
          </div>
        </div>

        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" /> Add Follow-up
        </button>
      </div>

      {/* 4 KPI Cards (Pastel Wave Theme matching Image 1 & design system) */}
      <div className="grid grid-cols-4 gap-6">
        {/* Total Follow-ups */}
        <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-5 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Total Follow-ups</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">248</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                ↑ 12% <span className="text-slate-400 font-medium">vs. last week</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shadow-inner">
              <CalendarClock className="size-5" />
            </div>
          </div>
        </div>

        {/* Due Today */}
        <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-amber-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Due Today</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">36</h3>
              <p className="mt-2 text-xs font-bold text-amber-600 flex items-center gap-1">
                ↑ 8% <span className="text-slate-400 font-medium">vs. last week</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-600 shadow-inner">
              <Clock className="size-5" />
            </div>
          </div>
        </div>

        {/* Overdue */}
        <div className="relative overflow-hidden rounded-xl border border-rose-200 bg-rose-50/50 p-5 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-rose-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Overdue</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">12</h3>
              <p className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1">
                ↓ 25% <span className="text-slate-400 font-medium">vs. last week</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-100 text-rose-600 shadow-inner">
              <AlertCircle className="size-5" />
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-sm transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Completed</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">200</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                ↑ 18% <span className="text-slate-400 font-medium">vs. last week</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 shadow-inner">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Left Table & Right Details Drawer */}
      <div className="flex items-start gap-6">
        {/* Left Side: Search, Filters & Table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          {/* Filter Bar (2 Rows matching Image exactly) */}
          <div className="p-5 border-b border-slate-100 space-y-3.5 bg-slate-50/30">
            {/* Row 1: Search, Date Range, Assigned Agent */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by customer name, phone number or follow-up ID..."
                  className="w-full pl-9 pr-4 py-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Date Range Dropdown */}
              <div className="relative w-44">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full pl-8 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
                >
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Today</option>
                  <option>Tomorrow</option>
                  <option>Next 7 days</option>
                </select>
                <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Assigned Agent Dropdown */}
              <div className="relative w-40">
                <select 
                  value={assignedAgentFilter}
                  onChange={(e) => setAssignedAgentFilter(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
                >
                  <option>All Agents</option>
                  <option>Priya Deshmukh</option>
                  <option>Rohit Yadav</option>
                  <option>Sneha Joshi</option>
                  <option>Amit Patil</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Row 2: Status, Priority, Follow-up Type & Clear Filters */}
            <div className="flex items-center gap-3">
              {/* Status Dropdown */}
              <div className="relative w-36">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
                >
                  <option>All Statuses</option>
                  <option>Due Today</option>
                  <option>Pending</option>
                  <option>Overdue</option>
                  <option>Completed</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Priority Dropdown */}
              <div className="relative w-36">
                <select 
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
                >
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Follow-up Type Dropdown */}
              <div className="relative w-40">
                <select 
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
                >
                  <option>All Types</option>
                  <option>Pricing Inquiry</option>
                  <option>Product Demo</option>
                  <option>Complaint</option>
                  <option>Follow-up Call</option>
                  <option>Sales Inquiry</option>
                  <option>Renewal</option>
                  <option>Feedback</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
              </div>

              <div className="flex-1" />

              {/* Clear Filters */}
              <button 
                onClick={handleClearFilters}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer py-1.5"
              >
                <RefreshCw className="size-3.5" /> Clear Filters
              </button>
            </div>
          </div>

          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">
              Follow-ups ({filteredFollowUps.length})
            </h2>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap min-w-max">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-4 w-10"><input type="checkbox" className="rounded border-slate-300 size-4" /></th>
                  <th className="px-3 py-4">Follow-up ID</th>
                  <th className="px-3 py-4">Customer</th>
                  <th className="px-3 py-4">Phone Number</th>
                  <th className="px-3 py-4">Related Call</th>
                  <th className="px-3 py-4">Reason</th>
                  <th className="px-3 py-4">Assigned Agent</th>
                  <th className="px-3 py-4">Scheduled Date & Time</th>
                  <th className="px-3 py-4 text-center">Priority</th>
                  <th className="px-3 py-4 text-center">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredFollowUps.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  return (
                    <tr 
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/60" : ""}`}
                    >
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 size-4" />
                      </td>
                      <td className="px-3 py-4 font-bold text-slate-700">{item.id}</td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`size-7 rounded-full flex items-center justify-center font-bold text-[11px] ${item.avatarBg} shrink-0`}>
                            {item.initials}
                          </div>
                          <span className="font-bold text-slate-800 text-[13px]">{item.customerName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-slate-600 font-medium">{item.phoneNumber}</td>
                      <td className="px-3 py-4">
                        <span className="font-semibold text-blue-600 hover:underline">{item.relatedCallId}</span>
                      </td>
                      <td className="px-3 py-4 font-medium text-slate-700">{item.reason}</td>
                      <td className="px-3 py-4 font-semibold text-slate-700">{item.assignedAgent}</td>
                      <td className="px-3 py-4 text-slate-600 font-medium">{item.scheduledDateTime}</td>
                      <td className="px-3 py-4 text-center">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                          item.priority === "High" 
                            ? "text-rose-700 bg-rose-50 border-rose-200" 
                            : item.priority === "Medium"
                            ? "text-amber-700 bg-amber-50 border-amber-200"
                            : "text-emerald-700 bg-emerald-50 border-emerald-200"
                        }`}>
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold border inline-flex items-center gap-1.5 ${
                          item.status === "Due Today" 
                            ? "text-amber-700 bg-amber-50 border-amber-200" 
                            : item.status === "Pending"
                            ? "text-blue-700 bg-blue-50 border-blue-200"
                            : item.status === "Overdue"
                            ? "text-rose-700 bg-rose-50 border-rose-200"
                            : "text-emerald-700 bg-emerald-50 border-emerald-200"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="px-2.5 py-1 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleToggleComplete(item)}
                            title={item.status === "Completed" ? "Mark Pending" : "Mark Complete"}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <MoreVertical className="size-3.5" />
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
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
            <div className="text-xs font-bold text-slate-500">
              Showing 1 to {filteredFollowUps.length} of {followUps.length} follow-ups
            </div>
            <div className="flex items-center gap-1.5">
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-white font-bold">&lt;</button>
              <button className="size-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold shadow-sm text-sm">1</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">2</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">3</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">4</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">5</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">&gt;</button>
            </div>
          </div>
        </div>

        {/* Right Side: Follow-up Details Drawer (Exact Match with Image) */}
        {selectedItem && (
          <div className="w-[380px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-800">Follow-up Details</span>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Customer Profile & Priority */}
              <div className="flex items-start gap-3.5 mb-5">
                <div className={`size-12 rounded-full flex items-center justify-center font-black text-base ${selectedItem.avatarBg} shrink-0 shadow-sm`}>
                  {selectedItem.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-800">{selectedItem.customerName}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200">
                      {selectedItem.priority} Priority
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{selectedItem.phoneNumber}</div>
                  <div className="text-xs text-slate-400 font-medium">{selectedItem.email}</div>
                </div>
              </div>

              {/* Action Buttons (Call Customer, Reschedule, Mark Complete) */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setIsCallModalOpen(true)}
                  className="py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Phone className="size-3" /> Call Customer
                </button>
                <button
                  onClick={() => setIsRescheduleModalOpen(true)}
                  className="py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="size-3" /> Reschedule
                </button>
                <button
                  onClick={() => handleToggleComplete(selectedItem)}
                  className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    selectedItem.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <Check className="size-3" /> {selectedItem.status === "Completed" ? "Done" : "Mark Complete"}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-6 mt-6 border-b border-slate-100">
                {(["Overview", "Call History", "Notes", "Status History"] as const).map((tab) => (
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

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[calc(100vh-380px)]">
              {activeTab === "Overview" && (
                <>
                  {/* Customer Information */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="size-3.5 text-blue-600" /> Customer Information
                      </h4>
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="size-3" /> Edit
                      </button>
                    </div>

                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Name</span>
                        <span className="text-slate-800 font-bold">{selectedItem.customerName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Phone Number</span>
                        <span className="text-slate-800 font-bold flex items-center gap-1.5">
                          <Phone className="size-3 text-slate-400" /> {selectedItem.phoneNumber}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Email</span>
                        <span className="text-slate-800 font-bold flex items-center gap-1.5">
                          <Mail className="size-3 text-slate-400" /> {selectedItem.email}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Group</span>
                        <span className="text-slate-800 font-bold">{selectedItem.customerGroup}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Tags</span>
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200">
                            VIP
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-200">
                            Customer
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Created On</span>
                        <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                          <Clock className="size-3 text-slate-400" /> {selectedItem.createdOn}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Related Call Summary */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <PhoneCall className="size-3.5 text-blue-600" /> Related Call Summary
                      </h4>
                      <button 
                        onClick={() => setIsCallModalOpen(true)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        View Call
                      </button>
                    </div>

                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Call ID</span>
                        <span className="text-blue-600 font-bold">{selectedItem.relatedCallId}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Call Type</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200">
                          {selectedItem.callType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Call Duration</span>
                        <span className="text-slate-800 font-bold">{selectedItem.callDuration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Call Outcome</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          {selectedItem.callOutcome}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-semibold block mb-1">Summary</span>
                        <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed font-medium">
                          {selectedItem.callSummary}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Follow-up Details */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CalendarClock className="size-3.5 text-blue-600" /> Follow-up Details
                    </h4>

                    <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                          <Tag className="size-3 text-slate-400" /> Reason
                        </span>
                        <span className="text-slate-800 font-bold">{selectedItem.reason}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                          <User className="size-3 text-slate-400" /> Assigned Agent
                        </span>
                        <span className="text-slate-800 font-bold flex items-center gap-1.5">
                          <span className={`size-5 rounded-full flex items-center justify-center text-[9px] font-bold ${selectedItem.agentAvatarBg}`}>
                            {selectedItem.agentInitials}
                          </span>
                          {selectedItem.assignedAgent}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                          <Clock className="size-3 text-slate-400" /> Scheduled Date & Time
                        </span>
                        <span className="text-slate-800 font-bold">{selectedItem.scheduledDateTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                          <AlertCircle className="size-3 text-slate-400" /> Priority
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200">
                          {selectedItem.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="size-3 text-slate-400" /> Status
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200">
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status History */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Clock className="size-3.5 text-blue-600" /> Status History
                    </h4>

                    <div className="space-y-4 pl-2 border-l-2 border-slate-200 ml-2">
                      {selectedItem.statusHistory.map((sh, idx) => (
                        <div key={idx} className="relative pl-4">
                          <div className={`absolute -left-[21px] top-1 size-2.5 rounded-full ${sh.color} ring-4 ring-white`} />
                          <div className="text-xs font-bold text-slate-800">{sh.title}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">{sh.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Call History" && (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-800">{selectedItem.relatedCallId}</span>
                      <span className="text-emerald-600 font-bold">Completed</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mb-2">Duration: {selectedItem.callDuration} • Outbound Voice AI</div>
                    <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-slate-600 leading-relaxed text-[11px]">
                      "{selectedItem.callSummary}"
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Notes" && (
                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <textarea 
                      rows={3}
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      placeholder="Add an internal follow-up note for the team..."
                      className="w-full p-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-blue-500 font-medium"
                    />
                    <button 
                      onClick={handleAddNote}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                    >
                      Post Note
                    </button>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {selectedItem.notes.length === 0 ? (
                      <p className="text-slate-400 text-center py-4">No notes yet.</p>
                    ) : (
                      selectedItem.notes.map((note, i) => (
                        <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800">{note.author}</span>
                            <span className="text-[10px] text-slate-400">{note.time}</span>
                          </div>
                          <p className="text-slate-600 font-medium leading-relaxed">{note.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === "Status History" && (
                <div className="space-y-4 text-xs pl-2 border-l-2 border-slate-200 ml-2">
                  {selectedItem.statusHistory.map((sh, idx) => (
                    <div key={idx} className="relative pl-4">
                      <div className={`absolute -left-[21px] top-1 size-2.5 rounded-full ${sh.color} ring-4 ring-white`} />
                      <div className="text-xs font-bold text-slate-800">{sh.title}</div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">{sh.time}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Add Follow-up */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <CalendarClock className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Schedule New Follow-up</h3>
                  <p className="text-xs text-slate-400">Set callback reminders and task assignments</p>
                </div>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFollowUp} className="mt-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Customer Full Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Anand Mahindra"
                  value={newFollowUp.customerName}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, customerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Phone Number *</label>
                  <input 
                    type="text"
                    required
                    placeholder="+91 98765 XXXXX"
                    value={newFollowUp.phoneNumber}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Email Address</label>
                  <input 
                    type="email"
                    placeholder="name@domain.com"
                    value={newFollowUp.email}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Follow-up Reason</label>
                  <select 
                    value={newFollowUp.reason}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, reason: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium bg-white"
                  >
                    <option>Pricing Inquiry</option>
                    <option>Product Demo</option>
                    <option>Complaint</option>
                    <option>Follow-up Call</option>
                    <option>Sales Inquiry</option>
                    <option>Renewal</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Assigned Agent</label>
                  <select 
                    value={newFollowUp.assignedAgent}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, assignedAgent: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium bg-white"
                  >
                    <option>Priya Deshmukh</option>
                    <option>Rohit Yadav</option>
                    <option>Sneha Joshi</option>
                    <option>Amit Patil</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Scheduled Time</label>
                  <input 
                    type="text"
                    value={newFollowUp.scheduledDateTime}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, scheduledDateTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Priority</label>
                  <select 
                    value={newFollowUp.priority}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium bg-white"
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-bold mb-1">Status</label>
                  <select 
                    value={newFollowUp.status}
                    onChange={(e) => setNewFollowUp({ ...newFollowUp, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium bg-white"
                  >
                    <option>Due Today</option>
                    <option>Pending</option>
                    <option>Overdue</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Save & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Reschedule */}
      {isRescheduleModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-xs">
            <h3 className="font-bold text-slate-800 text-base mb-1">Reschedule Follow-up</h3>
            <p className="text-slate-400 mb-4">Choose a new date and time for {selectedItem.customerName}</p>

            <div className="space-y-3">
              <button 
                onClick={() => handleReschedule("Today, 05:00 PM")}
                className="w-full p-3 text-left border border-slate-200 hover:border-blue-500 rounded-xl hover:bg-blue-50/50 font-bold text-slate-700"
              >
                Later Today (05:00 PM)
              </button>
              <button 
                onClick={() => handleReschedule("Tomorrow, 11:00 AM")}
                className="w-full p-3 text-left border border-slate-200 hover:border-blue-500 rounded-xl hover:bg-blue-50/50 font-bold text-slate-700"
              >
                Tomorrow Morning (11:00 AM)
              </button>
              <button 
                onClick={() => handleReschedule("Next Week, 10:00 AM")}
                className="w-full p-3 text-left border border-slate-200 hover:border-blue-500 rounded-xl hover:bg-blue-50/50 font-bold text-slate-700"
              >
                Next Monday (10:00 AM)
              </button>
            </div>

            <div className="mt-5 flex justify-end">
              <button 
                onClick={() => setIsRescheduleModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Call Simulator */}
      {isCallModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-800 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Active Call Session</span>
              </div>
              <button onClick={() => setIsCallModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="size-4" />
              </button>
            </div>

            <div className="py-8 text-center">
              <div className="size-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-2xl font-black mb-3 shadow-lg shadow-blue-500/20">
                {selectedItem.initials}
              </div>
              <h3 className="text-lg font-bold">{selectedItem.customerName}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedItem.phoneNumber}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-mono">
                <Clock className="size-3 text-emerald-400" /> {callDuration}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 mb-6 text-xs text-slate-300 space-y-1">
              <div className="font-bold text-slate-400 uppercase text-[10px]">AI Voice Assistant Context</div>
              <p>Following up on {selectedItem.reason.toLowerCase()}. Assigned agent: {selectedItem.assignedAgent}.</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={() => setIsCallMuted(!isCallMuted)}
                className={`p-3.5 rounded-full border cursor-pointer ${isCallMuted ? "bg-amber-500/20 border-amber-500 text-amber-400" : "bg-slate-800 border-slate-700 text-slate-300"}`}
              >
                {isCallMuted ? "Unmute" : "Mute"}
              </button>
              <button 
                onClick={() => {
                  setIsCallModalOpen(false);
                  showToast("Call ended. Call recording saved to history.");
                }}
                className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-600/30 cursor-pointer"
              >
                <Phone className="size-4 rotate-135" /> End Call
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Edit Customer Info */}
      {isEditModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-xs">
            <h3 className="font-bold text-slate-800 text-base mb-1">Edit Customer Information</h3>
            <p className="text-slate-400 mb-4">Update contact information for {selectedItem.customerName}</p>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-600 font-bold mb-1">Customer Name</label>
                <input 
                  type="text" 
                  defaultValue={selectedItem.customerName}
                  id="editCustomerName"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Phone Number</label>
                <input 
                  type="text" 
                  defaultValue={selectedItem.phoneNumber}
                  id="editCustomerPhone"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-bold mb-1">Email</label>
                <input 
                  type="email" 
                  defaultValue={selectedItem.email}
                  id="editCustomerEmail"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const newName = (document.getElementById("editCustomerName") as HTMLInputElement)?.value || selectedItem.customerName;
                  const newPhone = (document.getElementById("editCustomerPhone") as HTMLInputElement)?.value || selectedItem.phoneNumber;
                  const newEmail = (document.getElementById("editCustomerEmail") as HTMLInputElement)?.value || selectedItem.email;
                  const updated = {
                    ...selectedItem,
                    customerName: newName,
                    phoneNumber: newPhone,
                    email: newEmail,
                  };
                  setFollowUps(prev => prev.map(f => f.id === selectedItem.id ? updated : f));
                  setSelectedItem(updated);
                  setIsEditModalOpen(false);
                  showToast("Customer details updated.");
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
