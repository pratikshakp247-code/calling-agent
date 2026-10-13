
import {
  LayoutDashboard, PhoneCall, History, Users, Bot, Megaphone, BarChart3,
  FileText, Settings, Search, Bell, Activity, CheckCircle2, PhoneMissed, Clock,
  TrendingUp, TrendingDown, ChevronDown, MoreHorizontal, FileUp, Menu, Info, List,
  Download, Filter, X, Play, RefreshCw, MessageSquare, Save, Calendar, Headset, Shield,
  Ticket, CreditCard, Plus, Edit, AlertCircle, MicOff, Pause, PhoneForwarded, PhoneOff, PhoneIncoming, PhoneOutgoing
} from "lucide-react";

export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, category: "CALL OPERATIONS" },
  { label: "Live Calls", icon: PhoneCall, category: "CALL OPERATIONS" },
  { label: "Call History", icon: History, category: "CALL OPERATIONS" },
  { label: "Contacts", icon: Users, category: "CALL OPERATIONS" },
  { label: "AI Agents", icon: Bot, category: "CUSTOMER SERVICES" },
  { label: "Campaigns", icon: Megaphone, category: "CUSTOMER SERVICES" },
  { label: "Digital Tickets", icon: Ticket, category: "CUSTOMER SERVICES" },
  { label: "Call Passes", icon: CreditCard, category: "CUSTOMER SERVICES" },
  { label: "Follow-ups", icon: Clock, category: "CUSTOMER SERVICES" },
  { label: "Call Scripts", icon: FileText, category: "CUSTOMER SERVICES" },
  { label: "Voice Analytics", icon: BarChart3, category: "INTELLIGENCE & ADMIN" },
  { label: "Call Transcripts", icon: MessageSquare, category: "INTELLIGENCE & ADMIN" },
  { label: "Users & Roles", icon: Shield, category: "INTELLIGENCE & ADMIN" },
  { label: "System Settings", icon: Settings, category: "INTELLIGENCE & ADMIN" },
];

// --- DASHBOARD DATA ---
export const dashboardKpis = [
  { label: "Total Calls", value: "1,248", trend: "+12.5%", color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: PhoneCall },
  { label: "Answered Calls", value: "1,020", trend: "+8.2%", color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: CheckCircle2 },
  { label: "Missed Calls", value: "228", trend: "-3.1%", color: "bg-rose-50/50", borderColor: "border-rose-200", wave: "bg-rose-200/50", iconBg: "bg-rose-100 text-rose-600", icon: PhoneMissed },
  { label: "Avg. Duration", value: "04:32", trend: "+0:18", color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: Clock },
  { label: "AI Calls", value: "1,150", trend: "+16.4%", color: "bg-indigo-50/50", borderColor: "border-indigo-200", wave: "bg-indigo-200/50", iconBg: "bg-indigo-100 text-indigo-600", icon: Bot },
  { label: "Success Rate", value: "78%", trend: "+4.7%", color: "bg-violet-50/50", borderColor: "border-violet-200", wave: "bg-violet-200/50", iconBg: "bg-violet-100 text-violet-600", icon: Activity },
];

export const dashboardCalls = [
  { customer: "Rahul Sharma", phone: "+91 98765 XXXXX", type: "Pricing Inquiry", agent: "Sales Agent", duration: "04:32", priority: "High", priorityColor: "text-rose-600 bg-rose-50 border-rose-200/50", status: "Resolved", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200/50", isClosed: true },
  { customer: "Sneha Patil", phone: "+91 98234 XXXXX", type: "Technical Support", agent: "Support Agent", duration: "12:15", priority: "Medium", priorityColor: "text-amber-600 bg-amber-50 border-amber-200/50", status: "In Progress", statusColor: "text-blue-600 bg-blue-50 border-blue-200/50", isClosed: false },
  { customer: "Amit Desai", phone: "+91 91234 XXXXX", type: "Demo Request", agent: "Sales Agent", duration: "08:45", priority: "Medium", priorityColor: "text-amber-600 bg-amber-50 border-amber-200/50", status: "Follow-up", statusColor: "text-amber-600 bg-amber-50 border-amber-200/50", isClosed: false },
  { customer: "Pooja Joshi", phone: "+91 99887 XXXXX", type: "Refund Request", agent: "Payment Agent", duration: "02:10", priority: "Low", priorityColor: "text-emerald-600 bg-emerald-50 border-emerald-200/50", status: "Missed", statusColor: "text-rose-600 bg-rose-50 border-rose-200/50", isClosed: true },
];

export const agentsStatus = [
  { name: "Sales Agent", status: "Active", dot: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Support Agent", status: "Active", dot: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50" },
  { name: "Follow-up Agent", status: "Busy", dot: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-50" },
  { name: "Payment Agent", status: "Offline", dot: "bg-slate-400", text: "text-slate-500", bg: "bg-slate-50" },
];

export const chartDataHourly = [
  { name: '06:00', current: 1800, baseline: 1500 },
  { name: '08:00', current: 5000, baseline: 4800 },
  { name: '10:00', current: 6800, baseline: 6500 },
  { name: '12:00', current: 4200, baseline: 4000 },
  { name: '14:00', current: 3900, baseline: 3800 },
  { name: '16:00', current: 5800, baseline: 5500 },
  { name: '18:00', current: 7400, baseline: 7000 },
  { name: '20:00', current: 5000, baseline: 4800 },
  { name: '22:00', current: 2200, baseline: 2000 },
];

export const chartDataWeekly = [
  { name: 'Mon', current: 12000, baseline: 11000 },
  { name: 'Tue', current: 14500, baseline: 13800 },
  { name: 'Wed', current: 15800, baseline: 14200 },
  { name: 'Thu', current: 13200, baseline: 13000 },
  { name: 'Fri', current: 16900, baseline: 15500 },
  { name: 'Sat', current: 8500, baseline: 8000 },
  { name: 'Sun', current: 7200, baseline: 7000 },
];

export const chartDataMonthly = [
  { name: 'Week 1', current: 45000, baseline: 42000 },
  { name: 'Week 2', current: 52000, baseline: 48000 },
  { name: 'Week 3', current: 48000, baseline: 46000 },
  { name: 'Week 4', current: 61000, baseline: 55000 },
];

export const donutData = [
  { name: 'Completed', value: 1020, color: '#1d4ed8' },
  { name: 'In Progress', value: 186, color: '#0ea5e9' },
  { name: 'Follow-up', value: 18, color: '#eab308' },
  { name: 'Missed', value: 24, color: '#ef4444' },
];

// --- CALL HISTORY DATA ---
export const historyKpis = [
  { label: "Total Calls", value: "1,248", color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: PhoneCall },
  { label: "Completed", value: "1,020", color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: CheckCircle2 },
  { label: "Missed", value: "24", color: "bg-rose-50/50", borderColor: "border-rose-200", wave: "bg-rose-200/50", iconBg: "bg-rose-100 text-rose-600", icon: PhoneMissed },
  { label: "Follow-ups", value: "18", color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: RefreshCw },
  { label: "Avg Call Duration", value: "04:32", color: "bg-indigo-50/50", borderColor: "border-indigo-200", wave: "bg-indigo-200/50", iconBg: "bg-indigo-100 text-indigo-600", icon: Clock },
  { label: "Success Rate", value: "78%", color: "bg-violet-50/50", borderColor: "border-violet-200", wave: "bg-violet-200/50", iconBg: "bg-violet-100 text-violet-600", icon: Activity },
];

export const historyTableData = [
  { id: "CL-10231", customer: "Rahul Sharma", phone: "+91 98765 43210", type: "Pricing Inquiry", agent: "Sales Agent", date: "Oct 8, 10:32 AM", duration: "04:32", status: "Completed", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", sentiment: "Positive", sentimentColor: "text-emerald-700 bg-emerald-50 border-emerald-200", priority: "High", priorityColor: "text-rose-700 bg-rose-50 border-rose-200" },
  { id: "CL-10232", customer: "Sneha Patil", phone: "+91 98234 56789", type: "Technical Support", agent: "Support Agent", date: "Oct 8, 10:15 AM", duration: "12:15", status: "In Progress", statusColor: "text-blue-700 bg-blue-50 border-blue-200", sentiment: "Neutral", sentimentColor: "text-slate-600 bg-slate-100 border-slate-200", priority: "Medium", priorityColor: "text-amber-700 bg-amber-50 border-amber-200" },
  { id: "CL-10233", customer: "Amit Desai", phone: "+91 91234 98765", type: "Demo Request", agent: "Sales Agent", date: "Oct 8, 09:45 AM", duration: "08:45", status: "Follow-up", statusColor: "text-amber-700 bg-amber-50 border-amber-200", sentiment: "Positive", sentimentColor: "text-emerald-700 bg-emerald-50 border-emerald-200", priority: "Medium", priorityColor: "text-amber-700 bg-amber-50 border-amber-200" },
  { id: "CL-10234", customer: "Pooja Joshi", phone: "+91 99887 77665", type: "Refund Request", agent: "Payment Agent", date: "Oct 8, 09:20 AM", duration: "02:10", status: "Missed", statusColor: "text-rose-700 bg-rose-50 border-rose-200", sentiment: "Negative", sentimentColor: "text-rose-700 bg-rose-50 border-rose-200", priority: "Low", priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "CL-10235", customer: "Vikram Singh", phone: "+91 95555 12345", type: "Product Inquiry", agent: "Sales Agent", date: "Oct 8, 08:50 AM", duration: "06:12", status: "Completed", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", sentiment: "Positive", sentimentColor: "text-emerald-700 bg-emerald-50 border-emerald-200", priority: "Medium", priorityColor: "text-amber-700 bg-amber-50 border-amber-200" },
  { id: "CL-10236", customer: "Neha Verma", phone: "+91 90000 55555", type: "Complaint", agent: "Support Agent", date: "Oct 8, 08:30 AM", duration: "15:40", status: "Follow-up", statusColor: "text-amber-700 bg-amber-50 border-amber-200", sentiment: "Negative", sentimentColor: "text-rose-700 bg-rose-50 border-rose-200", priority: "High", priorityColor: "text-rose-700 bg-rose-50 border-rose-200" },
];

// --- LIVE CALLS DATA ---
export const liveKpis = [
  { label: "Active Calls", value: "24", color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: PhoneCall },
  { label: "Active AI Agents", value: "18", color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: Bot },
  { label: "Waiting Calls", value: "8", color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: Clock },
  { label: "Completed Today", value: "1,248", color: "bg-indigo-50/50", borderColor: "border-indigo-200", wave: "bg-indigo-200/50", iconBg: "bg-indigo-100 text-indigo-600", icon: CheckCircle2 },
];

export const liveCallsData = [
  { id: "LC-8841", customer: "Anjali Desai", phone: "+91 98765 00011", type: "Incoming", intent: "Support", agent: "Support Agent", duration: "02:15", status: "Connected", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", priority: "High", priorityColor: "text-rose-700 bg-rose-50 border-rose-200", sentiment: "Neutral" },
  { id: "LC-8842", customer: "Rohan Kapoor", phone: "+91 91234 55566", type: "Outgoing", intent: "Sales Follow-up", agent: "Sales Agent", duration: "08:42", status: "Connected", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", priority: "Medium", priorityColor: "text-amber-700 bg-amber-50 border-amber-200", sentiment: "Positive" },
  { id: "LC-8843", customer: "Priya Singh", phone: "+91 99887 22233", type: "Incoming", intent: "Billing", agent: "Payment Agent", duration: "00:45", status: "On Hold", statusColor: "text-amber-700 bg-amber-50 border-amber-200", priority: "Medium", priorityColor: "text-amber-700 bg-amber-50 border-amber-200", sentiment: "Negative" },
  { id: "LC-8844", customer: "Unknown Caller", phone: "+91 95555 44411", type: "Incoming", intent: "General", agent: "Triage Agent", duration: "00:10", status: "Connecting", statusColor: "text-blue-700 bg-blue-50 border-blue-200", priority: "Low", priorityColor: "text-slate-700 bg-slate-100 border-slate-200", sentiment: "Neutral" },
];

export const waitingQueue = [
  { id: "WQ-01", customer: "Amit Patel", position: 1, waitTime: "01:20", agent: "Support Agent" },
  { id: "WQ-02", customer: "Neha Sharma", position: 2, waitTime: "00:45", agent: "Sales Agent" },
  { id: "WQ-03", customer: "Vikram Joshi", position: 3, waitTime: "00:15", agent: "Unassigned" },
];

// --- DIGITAL TICKETS DATA ---
export const ticketKpis = [
  { label: "Total Tickets", value: "342", color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: Ticket },
  { label: "Open Tickets", value: "45", color: "bg-rose-50/50", borderColor: "border-rose-200", wave: "bg-rose-200/50", iconBg: "bg-rose-100 text-rose-600", icon: AlertCircle },
  { label: "In Progress", value: "112", color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: Clock },
  { label: "Resolved", value: "185", color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: CheckCircle2 },
];

export const ticketData = [
  { id: "TKT-9912", customer: "Vikram Singh", phone: "+91 95555 12345", category: "Billing Issue", agent: "Payment Agent", priority: "High", priorityColor: "text-rose-700 bg-rose-50 border-rose-200", status: "Open", statusColor: "text-rose-700 bg-rose-50 border-rose-200", date: "Oct 9, 09:12 AM" },
  { id: "TKT-9911", customer: "Pooja Joshi", phone: "+91 99887 77665", category: "Refund Request", agent: "Payment Agent", priority: "Medium", priorityColor: "text-amber-700 bg-amber-50 border-amber-200", status: "In Progress", statusColor: "text-blue-700 bg-blue-50 border-blue-200", date: "Oct 8, 14:45 PM" },
  { id: "TKT-9910", customer: "Rahul Sharma", phone: "+91 98765 43210", category: "Technical Support", agent: "Support Agent", priority: "Low", priorityColor: "text-emerald-700 bg-emerald-50 border-emerald-200", status: "Resolved", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", date: "Oct 8, 11:30 AM" },
];

// --- CALL PASSES DATA ---
export const passKpis = [
  { label: "Total Plans", value: "1,840", color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: CreditCard },
  { label: "Active Subscriptions", value: "1,520", color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: CheckCircle2 },
  { label: "Minutes Used", value: "450K", color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: Activity },
  { label: "Remaining Minutes", value: "120K", color: "bg-indigo-50/50", borderColor: "border-indigo-200", wave: "bg-indigo-200/50", iconBg: "bg-indigo-100 text-indigo-600", icon: Clock },
];

export const passData = [
  { customer: "TechCorp India", plan: "Enterprise", limit: "10,000", used: 8500, remaining: "1,500", expiry: "Nov 15, 2026", status: "Active", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", payment: "Paid", paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { customer: "Sneha Patil", plan: "Pro", limit: "2,000", used: 1900, remaining: "100", expiry: "Oct 12, 2026", status: "Expiring Soon", statusColor: "text-amber-700 bg-amber-50 border-amber-200", payment: "Paid", paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { customer: "Amit Desai", plan: "Basic", limit: "500", used: 500, remaining: "0", expiry: "Oct 5, 2026", status: "Expired", statusColor: "text-rose-700 bg-rose-50 border-rose-200", payment: "Pending", paymentColor: "text-amber-700 bg-amber-50 border-amber-200" },
];



