import { useState, useMemo } from "react";
import {
  Ticket, AlertCircle, Clock, CheckCircle2, Plus, Search, ChevronDown,
  Filter, X, Bot, Edit, Users, RefreshCw, Phone, Check, ArrowUpDown,
  MoreVertical, Calendar, FileText, Send, Tag, Shield
} from "lucide-react";

export interface TicketItem {
  id: string;
  customer: string;
  phone: string;
  category: "Billing Issue" | "Refund Request" | "Technical Support" | "Call Quality" | "Account Verification" | "Integration";
  agent: "Payment Agent" | "Support Agent" | "Sales Agent" | "Triage Agent";
  priority: "High" | "Medium" | "Low";
  priorityColor: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  statusColor: string;
  date: string;
  dateType?: "Today" | "Yesterday" | "Last 7 Days" | "Last 30 Days";
  description?: string;
  timeline?: Array<{ title: string; time: string; author: string }>;
}

const initialTickets: TicketItem[] = [
  {
    id: "TKT-9912",
    customer: "Vikram Singh",
    phone: "+91 95555 12345",
    category: "Billing Issue",
    agent: "Payment Agent",
    priority: "High",
    priorityColor: "text-rose-700 bg-rose-50 border-rose-200",
    status: "Open",
    statusColor: "text-rose-700 bg-rose-50 border-rose-200",
    date: "Today, 09:12 AM",
    dateType: "Today",
    description: "Customer reported an unrecognized recurring charge on their credit card. Requires urgent transaction trace.",
    timeline: [
      { title: "Ticket created from voice call LC-8841", time: "Today, 09:12 AM", author: "Voice AI" },
      { title: "Priority escalated to High based on customer sentiment", time: "Today, 09:15 AM", author: "System" }
    ]
  },
  {
    id: "TKT-9911",
    customer: "Pooja Joshi",
    phone: "+91 99887 77665",
    category: "Refund Request",
    agent: "Payment Agent",
    priority: "Medium",
    priorityColor: "text-amber-700 bg-amber-50 border-amber-200",
    status: "In Progress",
    statusColor: "text-blue-700 bg-blue-50 border-blue-200",
    date: "Yesterday, 02:45 PM",
    dateType: "Yesterday",
    description: "Refund initiated for duplicate voice license plan subscription. Awaiting gateway settlement approval.",
    timeline: [
      { title: "Ticket created from call", time: "Yesterday, 02:45 PM", author: "Support Agent" },
      { title: "Assigned to Payment Agent", time: "Yesterday, 03:00 PM", author: "Payment Team" }
    ]
  },
  {
    id: "TKT-9910",
    customer: "Rahul Sharma",
    phone: "+91 98765 43210",
    category: "Technical Support",
    agent: "Support Agent",
    priority: "Low",
    priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    status: "Resolved",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    date: "Oct 8, 11:30 AM",
    dateType: "Last 7 Days",
    description: "SIP trunk routing misconfigured for incoming outbound lines. Re-routed to primary PBX switch successfully.",
    timeline: [
      { title: "Ticket created", time: "Oct 8, 11:30 AM", author: "Voice AI" },
      { title: "SIP configuration verified & resolved", time: "Oct 8, 12:45 PM", author: "Support Agent" }
    ]
  },
  {
    id: "TKT-9909",
    customer: "Amit Desai",
    phone: "+91 91234 88776",
    category: "Call Quality",
    agent: "Triage Agent",
    priority: "High",
    priorityColor: "text-rose-700 bg-rose-50 border-rose-200",
    status: "Open",
    statusColor: "text-rose-700 bg-rose-50 border-rose-200",
    date: "Today, 10:40 AM",
    dateType: "Today",
    description: "High jitter and voice packet drop reported during high-volume customer campaign dialer sessions.",
    timeline: [
      { title: "Ticket logged via automatic latency monitor", time: "Today, 10:40 AM", author: "Telemetry Bot" }
    ]
  },
  {
    id: "TKT-9908",
    customer: "Sneha Patil",
    phone: "+91 98234 11223",
    category: "Account Verification",
    agent: "Sales Agent",
    priority: "Medium",
    priorityColor: "text-amber-700 bg-amber-50 border-amber-200",
    status: "In Progress",
    statusColor: "text-blue-700 bg-blue-50 border-blue-200",
    date: "Yesterday, 11:15 AM",
    dateType: "Yesterday",
    description: "KYC documentation uploaded for enterprise caller ID validation and WhatsApp Business API integration.",
    timeline: [
      { title: "Documents received", time: "Yesterday, 11:15 AM", author: "Customer Portal" }
    ]
  },
  {
    id: "TKT-9907",
    customer: "Rohan Verma",
    phone: "+91 98765 99887",
    category: "Integration",
    agent: "Support Agent",
    priority: "Medium",
    priorityColor: "text-amber-700 bg-amber-50 border-amber-200",
    status: "Resolved",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    date: "Oct 5, 04:20 PM",
    dateType: "Last 7 Days",
    description: "Configured Salesforce webhooks for real-time AI call transcript syncing.",
    timeline: [
      { title: "Integration verified", time: "Oct 5, 05:00 PM", author: "Support Agent" }
    ]
  },
  {
    id: "TKT-9906",
    customer: "Ananya Iyer",
    phone: "+91 99881 33445",
    category: "Billing Issue",
    agent: "Payment Agent",
    priority: "Low",
    priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    status: "Closed",
    statusColor: "text-slate-600 bg-slate-100 border-slate-200",
    date: "Sep 28, 01:10 PM",
    dateType: "Last 30 Days",
    description: "Tax invoice receipt requested for corporate GST filing. Receipt dispatched via automated email.",
    timeline: [
      { title: "Invoice emailed and ticket closed", time: "Sep 28, 01:15 PM", author: "Billing Bot" }
    ]
  },
  {
    id: "TKT-9905",
    customer: "Kunal Shah",
    phone: "+91 90123 66778",
    category: "Technical Support",
    agent: "Support Agent",
    priority: "High",
    priorityColor: "text-rose-700 bg-rose-50 border-rose-200",
    status: "In Progress",
    statusColor: "text-blue-700 bg-blue-50 border-blue-200",
    date: "Today, 11:55 AM",
    dateType: "Today",
    description: "Custom Hindi dialect speech recognition model requires acoustic tuning for financial terms.",
    timeline: [
      { title: "Escalated to NLP Engineering", time: "Today, 12:00 PM", author: "Support Agent" }
    ]
  }
];

export default function DigitalTicketsContent() {
  const [tickets, setTickets] = useState<TicketItem[]>(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [agentFilter, setAgentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");

  // Active Dropdown state (for dropdown popovers)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // New Ticket Form State
  const [newCustomer, setNewCustomer] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCategory, setNewCategory] = useState<TicketItem["category"]>("Billing Issue");
  const [newAgent, setNewAgent] = useState<TicketItem["agent"]>("Support Agent");
  const [newPriority, setNewPriority] = useState<TicketItem["priority"]>("Medium");
  const [newDescription, setNewDescription] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Close dropdown on outside click
  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Filter Tickets dynamically
  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      // Search matching (ID, Customer name, Phone number)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        ticket.id.toLowerCase().includes(q) ||
        ticket.customer.toLowerCase().includes(q) ||
        ticket.phone.includes(q) ||
        ticket.category.toLowerCase().includes(q)
      );

      // Status filter
      const matchesStatus = statusFilter === "All" || ticket.status === statusFilter;

      // Priority filter
      const matchesPriority = priorityFilter === "All" || ticket.priority === priorityFilter;

      // Category filter
      const matchesCategory = categoryFilter === "All" || ticket.category === categoryFilter;

      // Agent filter
      const matchesAgent = agentFilter === "All" || ticket.agent === agentFilter;

      // Date filter
      const matchesDate = dateFilter === "All" || ticket.dateType === dateFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAgent && matchesDate;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter, categoryFilter, agentFilter, dateFilter]);

  // Dynamic KPI counts
  const totalCount = tickets.length;
  const openCount = tickets.filter(t => t.status === "Open").length;
  const inProgressCount = tickets.filter(t => t.status === "In Progress").length;
  const resolvedCount = tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;

  const ticketKpis = [
    { label: "Total Tickets", value: totalCount.toString(), color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: Ticket },
    { label: "Open Tickets", value: openCount.toString(), color: "bg-rose-50/50", borderColor: "border-rose-200", wave: "bg-rose-200/50", iconBg: "bg-rose-100 text-rose-600", icon: AlertCircle },
    { label: "In Progress", value: inProgressCount.toString(), color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: Clock },
    { label: "Resolved", value: resolvedCount.toString(), color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: CheckCircle2 },
  ];

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setCategoryFilter("All");
    setAgentFilter("All");
    setDateFilter("All");
    setOpenDropdown(null);
    showToast("Filters reset to default.");
  };

  const hasActiveFilters = searchQuery !== "" || statusFilter !== "All" || priorityFilter !== "All" || categoryFilter !== "All" || agentFilter !== "All" || dateFilter !== "All";

  // Create Ticket Handler
  const handleSaveTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.trim() || !newPhone.trim()) {
      showToast("Please enter customer name and phone number.");
      return;
    }

    const newId = `TKT-${9900 + tickets.length + 1}`;
    const priorityColor = newPriority === "High" ? "text-rose-700 bg-rose-50 border-rose-200" : newPriority === "Medium" ? "text-amber-700 bg-amber-50 border-amber-200" : "text-emerald-700 bg-emerald-50 border-emerald-200";

    const newTicketItem: TicketItem = {
      id: newId,
      customer: newCustomer.trim(),
      phone: newPhone.trim(),
      category: newCategory,
      agent: newAgent,
      priority: newPriority,
      priorityColor,
      status: "Open",
      statusColor: "text-rose-700 bg-rose-50 border-rose-200",
      date: "Today, Just now",
      dateType: "Today",
      description: newDescription.trim() || "Customer raised an inquiry via voice calling agent.",
      timeline: [
        { title: `Ticket created manually`, time: "Just now", author: "Agent Admin" },
        { title: `Assigned to ${newAgent}`, time: "Just now", author: "Routing Engine" }
      ]
    };

    setTickets([newTicketItem, ...tickets]);
    setSelectedTicket(newTicketItem);
    setIsCreating(false);
    setNewCustomer("");
    setNewPhone("");
    setNewDescription("");
    showToast(`Ticket ${newId} created successfully!`);
  };

  // Quick Resolve
  const handleResolveTicket = (ticket: TicketItem) => {
    const updated: TicketItem = {
      ...ticket,
      status: "Resolved",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      timeline: [
        { title: "Marked as Resolved", time: "Just now", author: "Agent Admin" },
        ...(ticket.timeline || [])
      ]
    };
    setTickets(prev => prev.map(t => t.id === ticket.id ? updated : t));
    setSelectedTicket(updated);
    showToast(`Ticket ${ticket.id} marked as Resolved.`);
  };

  // Reassign Agent
  const handleReassignAgent = (ticket: TicketItem, agentName: TicketItem["agent"]) => {
    const updated: TicketItem = {
      ...ticket,
      agent: agentName,
      timeline: [
        { title: `Reassigned to ${agentName}`, time: "Just now", author: "Agent Admin" },
        ...(ticket.timeline || [])
      ]
    };
    setTickets(prev => prev.map(t => t.id === ticket.id ? updated : t));
    setSelectedTicket(updated);
    showToast(`Reassigned to ${agentName}.`);
  };

  return (
    <div className="p-8 relative h-full">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Digital Tickets</h1>
          <p className="text-sm text-slate-500 mt-1">Manage customer issues and support requests from calls.</p>
        </div>
        <button 
          onClick={() => { setSelectedTicket(null); setIsCreating(true); }} 
          className="bg-[#1d4ed8] text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-[#1e40af] flex items-center gap-2 text-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" /> Create Ticket
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {ticketKpis.map((kpi) => (
          <div key={kpi.label} className={`relative overflow-hidden rounded-xl border ${kpi.borderColor} p-4 ${kpi.color} shadow-sm h-28 flex flex-col justify-between group hover:shadow-md transition-shadow`}>
            <div className={`absolute -bottom-8 -right-8 size-24 rounded-full ${kpi.wave} blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none`} />
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

      {/* Search & Fully Functional Interactive Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ticket ID, customer name or phone number..." 
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 font-medium transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdown Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative">
          {/* Status Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("status")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                statusFilter !== "All" 
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-xs" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{statusFilter === "All" ? "Status" : `Status: ${statusFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "status" && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase">Filter by Status</div>
                {["All", "Open", "In Progress", "Resolved", "Closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 font-medium ${
                      statusFilter === s ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>{s === "All" ? "All Statuses" : s}</span>
                    {statusFilter === s && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Priority Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("priority")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                priorityFilter !== "All" 
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-xs" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{priorityFilter === "All" ? "Priority" : `Priority: ${priorityFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "priority" && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase">Filter by Priority</div>
                {["All", "High", "Medium", "Low"].map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPriorityFilter(p); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 font-medium ${
                      priorityFilter === p ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>{p === "All" ? "All Priorities" : p}</span>
                    {priorityFilter === p && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("category")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                categoryFilter !== "All" 
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-xs" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{categoryFilter === "All" ? "Category" : `Category: ${categoryFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "category" && (
              <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase">Filter by Category</div>
                {["All", "Billing Issue", "Refund Request", "Technical Support", "Call Quality", "Account Verification", "Integration"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategoryFilter(c); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 font-medium ${
                      categoryFilter === c ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>{c === "All" ? "All Categories" : c}</span>
                    {categoryFilter === c && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Agent Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("agent")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                agentFilter !== "All" 
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-xs" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{agentFilter === "All" ? "Agent" : `Agent: ${agentFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "agent" && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase">Filter by Agent</div>
                {["All", "Support Agent", "Payment Agent", "Sales Agent", "Triage Agent"].map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAgentFilter(a); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 font-medium ${
                      agentFilter === a ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>{a === "All" ? "All Agents" : a}</span>
                    {agentFilter === a && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("date")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                dateFilter !== "All" 
                  ? "border-blue-500 bg-blue-50 text-blue-700 font-bold shadow-xs" 
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{dateFilter === "All" ? "Date" : `Date: ${dateFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "date" && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase">Filter by Date</div>
                {["All", "Today", "Yesterday", "Last 7 Days", "Last 30 Days"].map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDateFilter(d); setOpenDropdown(null); }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-50 font-medium ${
                      dateFilter === d ? "text-blue-600 font-bold bg-blue-50/50" : "text-slate-700"
                    }`}
                  >
                    <span>{d === "All" ? "All Dates" : d}</span>
                    {dateFilter === d && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button 
              onClick={handleClearFilters}
              className="ml-auto text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50 transition-colors"
            >
              <RefreshCw className="size-3" /> Clear Filters
            </button>
          )}
        </div>

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-bold text-slate-400">Active Filters:</span>
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium flex items-center gap-1">
                Keyword: "{searchQuery}" <button onClick={() => setSearchQuery("")} className="hover:text-rose-600 cursor-pointer"><X className="size-3" /></button>
              </span>
            )}
            {statusFilter !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium flex items-center gap-1">
                Status: {statusFilter} <button onClick={() => setStatusFilter("All")} className="hover:text-rose-600 cursor-pointer"><X className="size-3" /></button>
              </span>
            )}
            {priorityFilter !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium flex items-center gap-1">
                Priority: {priorityFilter} <button onClick={() => setPriorityFilter("All")} className="hover:text-rose-600 cursor-pointer"><X className="size-3" /></button>
              </span>
            )}
            {categoryFilter !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium flex items-center gap-1">
                Category: {categoryFilter} <button onClick={() => setCategoryFilter("All")} className="hover:text-rose-600 cursor-pointer"><X className="size-3" /></button>
              </span>
            )}
            {agentFilter !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium flex items-center gap-1">
                Agent: {agentFilter} <button onClick={() => setAgentFilter("All")} className="hover:text-rose-600 cursor-pointer"><X className="size-3" /></button>
              </span>
            )}
            {dateFilter !== "All" && (
              <span className="px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-medium flex items-center gap-1">
                Date: {dateFilter} <button onClick={() => setDateFilter("All")} className="hover:text-rose-600 cursor-pointer"><X className="size-3" /></button>
              </span>
            )}
            <span className="text-[11px] text-slate-400 font-semibold ml-auto">
              Found {filteredTickets.length} of {tickets.length} tickets
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-5">Ticket ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Phone</th>
                <th className="py-4 px-5">Issue Category</th>
                <th className="py-4 px-5">Assigned Agent</th>
                <th className="py-4 px-5">Priority</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Created Date</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Ticket className="size-10 mx-auto text-slate-300 mb-2" />
                    <div className="font-bold text-slate-700 text-sm">No tickets match your filter criteria</div>
                    <p className="text-xs text-slate-400 mt-1">Try relaxing filters or search terms.</p>
                    <button 
                      onClick={handleClearFilters}
                      className="mt-3 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    onClick={() => setSelectedTicket(ticket)}
                    className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedTicket?.id === ticket.id ? "bg-blue-50/60" : ""}`}
                  >
                    <td className="py-3 px-5">
                      <span className="font-mono text-[11px] font-bold text-blue-600 hover:underline">{ticket.id}</span>
                    </td>
                    <td className="py-3 px-5 font-bold text-[13px] text-slate-800">{ticket.customer}</td>
                    <td className="py-3 px-5 text-[12px] font-medium text-slate-500">{ticket.phone}</td>
                    <td className="py-3 px-5 text-[12px] font-semibold text-slate-700">{ticket.category}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2 py-1 rounded-md shadow-xs w-fit">
                        <Bot className="size-3 text-blue-500" /> {ticket.agent}
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold border ${ticket.priorityColor}`}>
                        <span className="size-1 rounded-full bg-current" /> {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${ticket.statusColor}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-[12px] font-medium text-slate-500">{ticket.date}</td>
                    <td className="py-3 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setSelectedTicket(ticket)} 
                        className="text-[11px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded inline-flex items-center transition-colors cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay */}
      {(selectedTicket || isCreating) && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity" 
          onClick={() => { setSelectedTicket(null); setIsCreating(false); }}
        />
      )}

      {/* Right Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 flex flex-col ${(selectedTicket || isCreating) ? "translate-x-0" : "translate-x-full"}`}>
        {(selectedTicket || isCreating) && (
          <>
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">{isCreating ? "Create New Ticket" : "Ticket Details"}</h2>
              <button onClick={() => { setSelectedTicket(null); setIsCreating(false); }} className="p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isCreating ? (
                <form onSubmit={handleSaveTicket} id="createTicketForm" className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                    <input 
                      type="text" 
                      required
                      value={newCustomer}
                      onChange={(e) => setNewCustomer(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-medium" 
                      placeholder="e.g. Ramesh Kumar" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input 
                      type="text" 
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-medium" 
                      placeholder="+91 98765 XXXXX" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Issue Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white font-medium"
                    >
                      <option>Billing Issue</option>
                      <option>Technical Support</option>
                      <option>Refund Request</option>
                      <option>Call Quality</option>
                      <option>Account Verification</option>
                      <option>Integration</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                      <select 
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white font-medium"
                      >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Assign Agent</label>
                      <select 
                        value={newAgent}
                        onChange={(e) => setNewAgent(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white font-medium"
                      >
                        <option>Support Agent</option>
                        <option>Payment Agent</option>
                        <option>Sales Agent</option>
                        <option>Triage Agent</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea 
                      rows={4} 
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-medium" 
                      placeholder="Describe the issue reported by the caller..."
                    />
                  </div>
                </form>
              ) : selectedTicket && (
                <>
                  {/* View Mode Details */}
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Ticket Information</h3>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-lg shadow-inner">
                        {selectedTicket.customer.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-900">{selectedTicket.customer}</div>
                        <div className="text-xs font-semibold text-slate-500 mt-0.5">{selectedTicket.phone} <span className="mx-1">•</span> ID: {selectedTicket.id}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                      <div className="text-[10px] font-semibold text-slate-500 mb-1">Status & Priority</div>
                      <div className="flex gap-2">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${selectedTicket.statusColor}`}>{selectedTicket.status}</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${selectedTicket.priorityColor}`}>{selectedTicket.priority}</span>
                      </div>
                    </div>
                    <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                      <div className="text-[10px] font-semibold text-slate-500 mb-1">Category</div>
                      <div className="text-sm font-bold text-slate-800">{selectedTicket.category}</div>
                    </div>
                  </div>

                  <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                    <div className="text-[10px] font-semibold text-slate-500 mb-1">Assigned Agent</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-800 text-sm">
                        <Bot className="size-4 text-blue-600" /> {selectedTicket.agent}
                      </div>
                      <select 
                        value={selectedTicket.agent}
                        onChange={(e) => handleReassignAgent(selectedTicket, e.target.value as any)}
                        className="text-xs font-bold text-blue-600 bg-white border border-slate-200 rounded px-2 py-1 cursor-pointer"
                      >
                        <option>Support Agent</option>
                        <option>Payment Agent</option>
                        <option>Sales Agent</option>
                        <option>Triage Agent</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Issue Description</h3>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      {selectedTicket.description || "Customer called in regarding service inquiry. Follow-up action requested."}
                    </p>
                  </div>

                  {/* Timeline History */}
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Ticket Activity</h3>
                    <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                      {(selectedTicket.timeline || [
                        { title: "Ticket created", time: selectedTicket.date, author: "Voice AI" }
                      ]).map((item, idx) => (
                        <div key={idx} className="relative pl-4">
                          <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                          <div className="text-xs font-bold text-slate-800">{item.title}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">{item.time} • by {item.author}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-5 border-t border-slate-200 bg-white flex gap-3">
              {isCreating ? (
                <>
                  <button 
                    type="button" 
                    onClick={() => setIsCreating(false)} 
                    className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-bold shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    form="createTicketForm"
                    className="flex-1 bg-[#1d4ed8] text-white py-2.5 rounded-lg text-sm font-bold shadow-xs hover:bg-[#1e40af] transition-colors cursor-pointer"
                  >
                    Save Ticket
                  </button>
                </>
              ) : selectedTicket && (
                <>
                  {selectedTicket.status !== "Resolved" && selectedTicket.status !== "Closed" ? (
                    <button 
                      onClick={() => handleResolveTicket(selectedTicket)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-sm font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <Check className="size-4" /> Mark Resolved
                    </button>
                  ) : (
                    <div className="flex-1 text-center py-2 text-xs font-bold text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200">
                      ✓ Ticket is Resolved
                    </div>
                  )}
                  <button 
                    onClick={() => { setSelectedTicket(null); }}
                    className="flex-1 flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-700 py-2.5 rounded-lg text-sm font-bold shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Close Drawer
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
