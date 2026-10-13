import { useState } from "react";
import { 
  Users, PhoneCall, Star, UserPlus, Search, ChevronDown, Filter, 
  Phone, Mail, Tag, Edit, MoreVertical, X, CheckCircle2, MessageSquare, 
  Calendar, Clock, Activity, Trash2, ArrowUpRight, ArrowDownLeft, 
  SlidersHorizontal, Mic, MicOff, PhoneOff, Volume2, Plus, Share2, Check
} from "lucide-react";

export interface ContactItem {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  phone: string;
  email: string;
  group: "Sales" | "Support" | "Billing" | "Marketing";
  groupColor: string;
  tags: Array<{ label: string; color: string }>;
  status: "Active" | "Inactive";
  lastContactDate: string;
  lastContactTime: string;
  createdOn: string;
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  avgDuration: string;
  recentCalls: Array<{
    date: string;
    type: "Inbound" | "Outbound";
    agent: string;
    duration: string;
    status: "Success" | "Failed";
  }>;
}

const initialContacts: ContactItem[] = [
  {
    id: "CNT-101",
    name: "Rahul Sharma",
    initials: "RS",
    avatarBg: "bg-blue-600",
    phone: "+91 98765 12345",
    email: "rahul@gmail.com",
    group: "Sales",
    groupColor: "text-blue-700 bg-blue-50 border-blue-200",
    tags: [
      { label: "VIP", color: "text-rose-600 bg-rose-50 border-rose-200" },
      { label: "Customer", color: "text-blue-600 bg-blue-50 border-blue-200" }
    ],
    status: "Active",
    lastContactDate: "Oct 1, 2026",
    lastContactTime: "10:32 AM",
    createdOn: "Aug 12, 2026 • 10:24 AM",
    totalCalls: 24,
    successfulCalls: 20,
    failedCalls: 4,
    avgDuration: "05:32",
    recentCalls: [
      { date: "Oct 1, 2026 • 10:32 AM", type: "Inbound", agent: "Sales Agent", duration: "04:12", status: "Success" },
      { date: "Sep 28, 2026 • 02:15 PM", type: "Outbound", agent: "Support Agent", duration: "06:48", status: "Success" },
      { date: "Sep 20, 2026 • 11:05 AM", type: "Inbound", agent: "Sales Agent", duration: "03:27", status: "Success" },
    ]
  },
  {
    id: "CNT-102",
    name: "Priya Deshmukh",
    initials: "PD",
    avatarBg: "bg-indigo-600",
    phone: "+91 87654 32109",
    email: "priya@gmail.com",
    group: "Support",
    groupColor: "text-purple-700 bg-purple-50 border-purple-200",
    tags: [
      { label: "Complaint", color: "text-rose-600 bg-rose-50 border-rose-200" }
    ],
    status: "Active",
    lastContactDate: "Sep 28, 2026",
    lastContactTime: "02:15 PM",
    createdOn: "Aug 15, 2026 • 03:10 PM",
    totalCalls: 18,
    successfulCalls: 16,
    failedCalls: 2,
    avgDuration: "04:45",
    recentCalls: [
      { date: "Sep 28, 2026 • 02:15 PM", type: "Inbound", agent: "Support Agent", duration: "05:10", status: "Success" },
      { date: "Sep 15, 2026 • 11:30 AM", type: "Outbound", agent: "Support Agent", duration: "03:40", status: "Success" },
    ]
  },
  {
    id: "CNT-103",
    name: "Amit Patil",
    initials: "AP",
    avatarBg: "bg-blue-500",
    phone: "+91 91234 56789",
    email: "amit@gmail.com",
    group: "Sales",
    groupColor: "text-blue-700 bg-blue-50 border-blue-200",
    tags: [
      { label: "New", color: "text-sky-600 bg-sky-50 border-sky-200" }
    ],
    status: "Active",
    lastContactDate: "Sep 25, 2026",
    lastContactTime: "11:20 AM",
    createdOn: "Aug 20, 2026 • 09:15 AM",
    totalCalls: 12,
    successfulCalls: 11,
    failedCalls: 1,
    avgDuration: "06:15",
    recentCalls: [
      { date: "Sep 25, 2026 • 11:20 AM", type: "Outbound", agent: "Sales Agent", duration: "06:15", status: "Success" },
    ]
  },
  {
    id: "CNT-104",
    name: "Sneha Joshi",
    initials: "SJ",
    avatarBg: "bg-purple-600",
    phone: "+91 99887 76654",
    email: "sneha@gmail.com",
    group: "Support",
    groupColor: "text-purple-700 bg-purple-50 border-purple-200",
    tags: [
      { label: "Follow-up", color: "text-amber-600 bg-amber-50 border-amber-200" }
    ],
    status: "Active",
    lastContactDate: "Sep 22, 2026",
    lastContactTime: "04:45 PM",
    createdOn: "Aug 22, 2026 • 01:40 PM",
    totalCalls: 15,
    successfulCalls: 13,
    failedCalls: 2,
    avgDuration: "03:50",
    recentCalls: [
      { date: "Sep 22, 2026 • 04:45 PM", type: "Inbound", agent: "Follow-up Agent", duration: "03:50", status: "Success" },
    ]
  },
  {
    id: "CNT-105",
    name: "Vivek Kulkarni",
    initials: "VK",
    avatarBg: "bg-emerald-600",
    phone: "+91 90123 45678",
    email: "vivek@gmail.com",
    group: "Billing",
    groupColor: "text-blue-700 bg-blue-50 border-blue-200",
    tags: [
      { label: "Payment", color: "text-emerald-600 bg-emerald-50 border-emerald-200" }
    ],
    status: "Active",
    lastContactDate: "Sep 20, 2026",
    lastContactTime: "09:18 AM",
    createdOn: "Aug 25, 2026 • 11:00 AM",
    totalCalls: 9,
    successfulCalls: 8,
    failedCalls: 1,
    avgDuration: "02:40",
    recentCalls: [
      { date: "Sep 20, 2026 • 09:18 AM", type: "Inbound", agent: "Payment Agent", duration: "02:40", status: "Success" },
    ]
  },
  {
    id: "CNT-106",
    name: "Neha More",
    initials: "NM",
    avatarBg: "bg-rose-500",
    phone: "+91 98765 43210",
    email: "neha@gmail.com",
    group: "Sales",
    groupColor: "text-blue-700 bg-blue-50 border-blue-200",
    tags: [
      { label: "Prospect", color: "text-purple-600 bg-purple-50 border-purple-200" }
    ],
    status: "Inactive",
    lastContactDate: "Sep 18, 2026",
    lastContactTime: "03:12 PM",
    createdOn: "Aug 28, 2026 • 04:20 PM",
    totalCalls: 5,
    successfulCalls: 3,
    failedCalls: 2,
    avgDuration: "01:55",
    recentCalls: [
      { date: "Sep 18, 2026 • 03:12 PM", type: "Outbound", agent: "Sales Agent", duration: "01:55", status: "Failed" },
    ]
  },
  {
    id: "CNT-107",
    name: "Rohit Yadav",
    initials: "RY",
    avatarBg: "bg-amber-600",
    phone: "+91 87654 21098",
    email: "rohit@gmail.com",
    group: "Support",
    groupColor: "text-purple-700 bg-purple-50 border-purple-200",
    tags: [
      { label: "Complaint", color: "text-rose-600 bg-rose-50 border-rose-200" }
    ],
    status: "Active",
    lastContactDate: "Sep 16, 2026",
    lastContactTime: "01:05 PM",
    createdOn: "Sep 01, 2026 • 10:10 AM",
    totalCalls: 14,
    successfulCalls: 12,
    failedCalls: 2,
    avgDuration: "04:10",
    recentCalls: [
      { date: "Sep 16, 2026 • 01:05 PM", type: "Inbound", agent: "Support Agent", duration: "04:10", status: "Success" },
    ]
  },
  {
    id: "CNT-108",
    name: "Pooja Singh",
    initials: "PS",
    avatarBg: "bg-sky-600",
    phone: "+91 99876 54321",
    email: "pooja@gmail.com",
    group: "Marketing",
    groupColor: "text-slate-700 bg-slate-100 border-slate-200",
    tags: [
      { label: "Newsletter", color: "text-blue-600 bg-blue-50 border-blue-200" }
    ],
    status: "Active",
    lastContactDate: "Sep 14, 2026",
    lastContactTime: "10:22 AM",
    createdOn: "Sep 05, 2026 • 02:45 PM",
    totalCalls: 7,
    successfulCalls: 7,
    failedCalls: 0,
    avgDuration: "03:15",
    recentCalls: [
      { date: "Sep 14, 2026 • 10:22 AM", type: "Outbound", agent: "Sales Agent", duration: "03:15", status: "Success" },
    ]
  },
];

const contactKpis = [
  { 
    label: "Total Contacts", 
    value: "248", 
    trend: "+12%", 
    color: "bg-blue-50/50", 
    borderColor: "border-blue-200", 
    wave: "bg-blue-200/50", 
    iconBg: "bg-blue-100 text-blue-600", 
    icon: Users 
  },
  { 
    label: "Active Contacts", 
    value: "186", 
    trend: "+8%", 
    color: "bg-emerald-50/50", 
    borderColor: "border-emerald-200", 
    wave: "bg-emerald-200/50", 
    iconBg: "bg-emerald-100 text-emerald-600", 
    icon: PhoneCall 
  },
  { 
    label: "High Priority", 
    value: "42", 
    trend: "+15%", 
    color: "bg-rose-50/50", 
    borderColor: "border-rose-200", 
    wave: "bg-rose-200/50", 
    iconBg: "bg-rose-100 text-rose-600", 
    icon: Star 
  },
  { 
    label: "Recent Added", 
    value: "28", 
    trend: "+22%", 
    color: "bg-amber-50/50", 
    borderColor: "border-amber-200", 
    wave: "bg-amber-200/50", 
    iconBg: "bg-amber-100 text-amber-600", 
    icon: UserPlus 
  },
];

export default function ContactsContent() {
  const [contacts, setContacts] = useState<ContactItem[]>(initialContacts);
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(initialContacts[0]);
  const [activeTab, setActiveTab] = useState<"Overview" | "Call History" | "Notes" | "Activity">("Overview");

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState("All Groups");
  const [tagFilter, setTagFilter] = useState("All Tags");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Notes state
  const [notes, setNotes] = useState<string[]>([
    "Customer requested callback regarding enterprise calling package pricing.",
    "Verified phone connection and voice routing quality - 100% nominal.",
  ]);
  const [newNote, setNewNote] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Forms
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    group: "Sales" as const,
    tag: "VIP",
    status: "Active" as const,
  });

  // Call simulator state
  const [callDuration, setCallDuration] = useState(0);
  const [isCallMuted, setIsCallMuted] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Filtered contacts
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.label.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGroup = groupFilter === "All Groups" || c.group === groupFilter;
    const matchesTag = tagFilter === "All Tags" || c.tags.some(t => t.label === tagFilter);
    const matchesStatus = statusFilter === "All Status" || c.status === statusFilter;

    return matchesSearch && matchesGroup && matchesTag && matchesStatus;
  });

  // Open Call Simulator
  const handleStartCall = (contact: ContactItem) => {
    setSelectedContact(contact);
    setCallDuration(0);
    setIsCallMuted(false);
    setIsCallModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (contact: ContactItem) => {
    setSelectedContact(contact);
    setContactForm({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      group: contact.group,
      tag: contact.tags[0]?.label || "VIP",
      status: contact.status,
    });
    setIsEditModalOpen(true);
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact) return;

    const getGroupColor = (g: string) => {
      switch (g) {
        case "Sales": return "text-blue-700 bg-blue-50 border-blue-200";
        case "Support": return "text-purple-700 bg-purple-50 border-purple-200";
        case "Billing": return "text-blue-700 bg-blue-50 border-blue-200";
        default: return "text-slate-700 bg-slate-100 border-slate-200";
      }
    };

    const getTagColor = (t: string) => {
      switch (t) {
        case "VIP": return "text-rose-600 bg-rose-50 border-rose-200";
        case "Complaint": return "text-rose-600 bg-rose-50 border-rose-200";
        case "New": return "text-sky-600 bg-sky-50 border-sky-200";
        case "Follow-up": return "text-amber-600 bg-amber-50 border-amber-200";
        case "Payment": return "text-emerald-600 bg-emerald-50 border-emerald-200";
        default: return "text-blue-600 bg-blue-50 border-blue-200";
      }
    };

    const updated: ContactItem = {
      ...selectedContact,
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      group: contactForm.group,
      groupColor: getGroupColor(contactForm.group),
      tags: [{ label: contactForm.tag, color: getTagColor(contactForm.tag) }],
      status: contactForm.status,
    };

    setContacts(prev => prev.map(c => c.id === selectedContact.id ? updated : c));
    setSelectedContact(updated);
    setIsEditModalOpen(false);
    showToast(`Contact "${updated.name}" updated successfully!`);
  };

  // Add Contact
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim()) return;

    const initials = contactForm.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "CT";
    const newContact: ContactItem = {
      id: `CNT-${contacts.length + 101}`,
      name: contactForm.name,
      initials,
      avatarBg: "bg-blue-600",
      phone: contactForm.phone || "+91 98000 00000",
      email: contactForm.email || "user@example.com",
      group: contactForm.group,
      groupColor: "text-blue-700 bg-blue-50 border-blue-200",
      tags: [{ label: contactForm.tag, color: "text-sky-600 bg-sky-50 border-sky-200" }],
      status: contactForm.status,
      lastContactDate: "Just now",
      lastContactTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdOn: "Today • " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      totalCalls: 0,
      successfulCalls: 0,
      failedCalls: 0,
      avgDuration: "00:00",
      recentCalls: [],
    };

    setContacts([newContact, ...contacts]);
    setSelectedContact(newContact);
    setIsAddModalOpen(false);
    setContactForm({
      name: "",
      phone: "",
      email: "",
      group: "Sales",
      tag: "VIP",
      status: "Active",
    });
    showToast(`New contact "${newContact.name}" added successfully!`);
  };

  // Delete Contact
  const handleDeleteContact = (contactId: string) => {
    const remaining = contacts.filter(c => c.id !== contactId);
    setContacts(remaining);
    setSelectedContact(remaining.length > 0 ? remaining[0] : null);
    showToast("Contact deleted successfully.");
  };

  // Add note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([newNote.trim(), ...notes]);
    setNewNote("");
    showToast("Note added.");
  };

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
            <Users className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Contacts</h1>
            <p className="text-sm text-slate-500 mt-1">Manage your customer contacts and keep your calling list organized.</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setContactForm({
              name: "",
              phone: "",
              email: "",
              group: "Sales",
              tag: "VIP",
              status: "Active",
            });
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all cursor-pointer hover:shadow"
        >
          <Plus className="size-4" /> Add Contact
        </button>
      </div>

      {/* KPI Cards (Exact format matching Image 1) */}
      <div className="grid grid-cols-4 gap-4 mb-6 shrink-0">
        {contactKpis.map((kpi) => (
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

      {/* Main Table + Right Drawer layout */}
      <div className="flex gap-6 items-start">
        {/* Left: Contacts Table */}
        <div className={`flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 ${selectedContact ? "flex-1 min-w-0" : "w-full"}`}>
          {/* Filters Bar */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 shrink-0 flex-wrap">
            <div className="relative flex-1 min-w-[280px] max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, phone number, email or tags..." 
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500" 
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="size-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <select 
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none cursor-pointer"
                >
                  <option>All Groups</option>
                  <option>Sales</option>
                  <option>Support</option>
                  <option>Billing</option>
                  <option>Marketing</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none cursor-pointer"
                >
                  <option>All Tags</option>
                  <option>VIP</option>
                  <option>Complaint</option>
                  <option>New</option>
                  <option>Follow-up</option>
                  <option>Payment</option>
                  <option>Prospect</option>
                  <option>Newsletter</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
              </div>

              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-slate-50 focus:outline-none cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-500 pointer-events-none" />
              </div>

              <button 
                onClick={() => {
                  setSearchQuery("");
                  setGroupFilter("All Groups");
                  setTagFilter("All Tags");
                  setStatusFilter("All Status");
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 cursor-pointer"
              >
                <Filter className="size-3.5" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap min-w-max">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 size-4" /></th>
                  <th className="px-3 py-4">Name</th>
                  <th className="px-3 py-4">Phone Number</th>
                  <th className="px-3 py-4">Email</th>
                  <th className="px-3 py-4">Group</th>
                  <th className="px-3 py-4">Tags</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Last Contact</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredContacts.map((contact) => {
                  const isSelected = selectedContact?.id === contact.id;
                  return (
                    <tr 
                      key={contact.id} 
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/60" : ""}`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 size-4" />
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${contact.avatarBg} shrink-0`}>
                            {contact.initials}
                          </div>
                          <div>
                            <div className="text-[14px] font-bold text-slate-800">{contact.name}</div>
                            <div className="text-[11px] font-medium text-slate-400">{contact.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm font-semibold text-slate-700">{contact.phone}</td>
                      <td className="px-3 py-4 text-sm font-medium text-slate-600">{contact.email}</td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${contact.groupColor}`}>
                          {contact.group}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {contact.tags.map((tag, idx) => (
                            <span key={idx} className={`px-2 py-0.5 rounded text-[11px] font-bold border ${tag.color}`}>
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          contact.status === "Active" 
                            ? "text-emerald-700 bg-emerald-50 border border-emerald-200" 
                            : "text-slate-500 bg-slate-100 border border-slate-200"
                        }`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="text-xs font-bold text-slate-700">{contact.lastContactDate}</div>
                        <div className="text-[10px] font-semibold text-slate-400">{contact.lastContactTime}</div>
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => handleStartCall(contact)}
                            title="Call Contact"
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Phone className="size-4" />
                          </button>
                          <button 
                            onClick={() => handleOpenEdit(contact)}
                            title="Edit Contact"
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit className="size-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteContact(contact.id)}
                            title="Delete Contact"
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

          {/* Table Footer Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-b-xl shrink-0">
            <div className="text-xs font-bold text-slate-500">
              Showing 1 to {filteredContacts.length} of 248 contacts
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

        {/* Right: Selected Contact Detail Drawer (Exact match to screenshot) */}
        {selectedContact && (
          <div className="w-[380px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 relative">
              <button 
                onClick={() => setSelectedContact(null)} 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className={`size-16 rounded-full flex items-center justify-center text-white font-black text-xl shadow-md ${selectedContact.avatarBg} shrink-0`}>
                  {selectedContact.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-slate-800 leading-tight">{selectedContact.name}</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-600">{selectedContact.phone}</div>
                  <div className="text-xs text-slate-400">{selectedContact.email}</div>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-5">
                <button 
                  onClick={() => handleStartCall(selectedContact)}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                >
                  <Phone className="size-3.5" /> Call
                </button>
                <button 
                  onClick={() => setIsMessageModalOpen(true)}
                  className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageSquare className="size-3.5" /> Message
                </button>
                <button 
                  onClick={() => handleOpenEdit(selectedContact)}
                  className="py-2 px-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit className="size-3.5" /> Edit
                </button>
                <button 
                  onClick={() => handleDeleteContact(selectedContact.id)}
                  title="Delete Contact"
                  className="py-2 px-3 bg-white border border-slate-200 hover:bg-rose-50 hover:text-rose-600 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              {/* Drawer Tabs */}
              <div className="flex gap-6 mt-6 border-b border-slate-100">
                {(["Overview", "Call History", "Notes", "Activity"] as const).map((tab) => (
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

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[calc(100vh-380px)]">
              {activeTab === "Overview" && (
                <>
                  {/* Contact Information */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <Users className="size-3.5 text-blue-600" /> Contact Information
                      </h3>
                      <button 
                        onClick={() => handleOpenEdit(selectedContact)}
                        className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        <Edit className="size-3" /> Edit
                      </button>
                    </div>

                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Name</span>
                        <span className="font-bold text-slate-800">{selectedContact.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Phone Number</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Phone className="size-3 text-slate-400" /> {selectedContact.phone}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Email</span>
                        <span className="font-bold text-slate-800 flex items-center gap-1">
                          <Mail className="size-3 text-slate-400" /> {selectedContact.email}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Group</span>
                        <span className="font-bold text-slate-800">{selectedContact.group}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Tags</span>
                        <div className="flex items-center gap-1">
                          {selectedContact.tags.map((t, idx) => (
                            <span key={idx} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${t.color}`}>
                              {t.label}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Status</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          ● {selectedContact.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">Created On</span>
                        <span className="font-bold text-slate-700">{selectedContact.createdOn}</span>
                      </div>
                    </div>
                  </div>

                  {/* Call Statistics */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Activity className="size-3.5 text-blue-600" /> Call Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Calls</div>
                        <div className="text-xl font-black text-slate-800">{selectedContact.totalCalls}</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Successful Calls</div>
                        <div className="text-xl font-black text-emerald-600">{selectedContact.successfulCalls} (83%)</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Failed Calls</div>
                        <div className="text-xl font-black text-rose-500">{selectedContact.failedCalls} (17%)</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3.5 bg-white">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg. Call Duration</div>
                        <div className="text-xl font-black text-slate-800">{selectedContact.avgDuration}</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Call History */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <Clock className="size-3.5 text-blue-600" /> Recent Call History
                      </h3>
                      <button 
                        onClick={() => setActiveTab("Call History")}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-3">
                      {selectedContact.recentCalls.map((call, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                              <Phone className="size-4" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800">{call.date}</div>
                              <div className="text-[11px] text-slate-500">{call.type} • {call.agent}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold text-slate-700">{call.duration}</div>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                              {call.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeTab === "Call History" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 mb-2">Detailed Call Log for {selectedContact.name}</div>
                  {selectedContact.recentCalls.map((call, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{call.date}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {call.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex justify-between">
                        <span>Agent: {call.agent} ({call.type})</span>
                        <span className="font-semibold text-slate-700">Duration: {call.duration}</span>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => handleStartCall(selectedContact)}
                    className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm mt-4 cursor-pointer"
                  >
                    <Phone className="size-3.5" /> Place New Call
                  </button>
                </div>
              )}

              {activeTab === "Notes" && (
                <div className="space-y-4">
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add an internal agent note about this contact..."
                      className="w-full p-3 rounded-lg border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 resize-none h-20"
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
                    >
                      Save Note
                    </button>
                  </form>

                  <div className="space-y-2.5">
                    {notes.map((n, i) => (
                      <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed">
                        {n}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Activity" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-slate-500">Timeline of updates:</div>
                  <div className="border-l-2 border-slate-200 pl-4 space-y-4 text-xs">
                    <div>
                      <div className="font-bold text-slate-800">Inbound Call Handled</div>
                      <div className="text-slate-400 text-[10px]">Oct 1, 2026 • 10:32 AM via Sales Agent</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Support Ticket Resolved</div>
                      <div className="text-slate-400 text-[10px]">Sep 28, 2026 • 02:20 PM</div>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">Contact Registered</div>
                      <div className="text-slate-400 text-[10px]">{selectedContact.createdOn}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ===================== CALL MODAL ===================== */}
      {isCallModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden text-center p-6">
            <div className="size-20 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg text-2xl font-bold animate-pulse">
              {selectedContact.initials}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{selectedContact.name}</h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">{selectedContact.phone}</p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 mt-3">
              <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
              Connected • 00:14
            </div>

            {/* Audio Wave */}
            <div className="flex items-center justify-center gap-1.5 my-6 h-8">
              {[12, 28, 18, 32, 14, 26, 20, 10, 24].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-blue-600 rounded-full animate-bounce"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsCallMuted(!isCallMuted)}
                className={`p-3 rounded-full border transition-colors cursor-pointer ${
                  isCallMuted ? "bg-rose-50 border-rose-200 text-rose-600" : "bg-slate-100 border-slate-200 text-slate-700"
                }`}
              >
                {isCallMuted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsCallModalOpen(false)}
                className="p-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <PhoneOff className="size-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================== ADD CONTACT MODAL ===================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <UserPlus className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Add New Contact</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kadam"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +91 98765 00000"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@gmail.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Group</label>
                  <select
                    value={contactForm.group}
                    onChange={(e: any) => setContactForm({ ...contactForm, group: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Billing</option>
                    <option>Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Tag</label>
                  <select
                    value={contactForm.tag}
                    onChange={(e) => setContactForm({ ...contactForm, tag: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>VIP</option>
                    <option>Complaint</option>
                    <option>New</option>
                    <option>Follow-up</option>
                    <option>Payment</option>
                    <option>Prospect</option>
                    <option>Newsletter</option>
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
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== EDIT CONTACT MODAL ===================== */}
      {isEditModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Edit className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-800">Edit Contact: {selectedContact.name}</h3>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Phone Number</label>
                <input
                  type="text"
                  required
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Group</label>
                  <select
                    value={contactForm.group}
                    onChange={(e: any) => setContactForm({ ...contactForm, group: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Sales</option>
                    <option>Support</option>
                    <option>Billing</option>
                    <option>Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status</label>
                  <select
                    value={contactForm.status}
                    onChange={(e: any) => setContactForm({ ...contactForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 bg-white"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
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

      {/* ===================== QUICK MESSAGE MODAL ===================== */}
      {isMessageModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm overflow-hidden p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800">Send Message</h3>
              <button onClick={() => setIsMessageModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="size-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">To: <span className="font-bold text-slate-800">{selectedContact.name}</span> ({selectedContact.phone})</p>
            <textarea
              placeholder="Type SMS or WhatsApp message..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 h-24 mb-4"
            />
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setIsMessageModalOpen(false);
                  showToast("Message sent to " + selectedContact.name);
                }}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
