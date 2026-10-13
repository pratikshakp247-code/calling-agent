import { useState } from "react";
import {
  FileText, Plus, Search, ChevronDown, Phone, Headset, CreditCard,
  Calendar, AlertCircle, Star, Copy, Edit, Trash2, X, Play,
  CheckCircle2, Clock, Globe, ArrowUpRight, RefreshCw, MoreVertical,
  Check, Archive, Sparkles, Sliders, Shield, MessageSquare
} from "lucide-react";

export interface ScriptItem {
  id: string;
  name: string;
  desc: string;
  fullDesc: string;
  type: "Outbound" | "Inbound";
  purpose: string;
  purposeColor: string;
  language: string;
  status: "Active" | "Draft" | "Inactive" | "Archived";
  statusColor: string;
  lastUpdated: string;
  createdOn: string;
  iconBg: string;
  iconColor: string;
  icon: any;
  previewText: string;
  tags: string[];
  totalCalls: number;
  connectedCalls: number;
  successRate: string;
  avgDuration: string;
  contentSteps: Array<{
    step: string;
    label: string;
    speech: string;
  }>;
}

const initialScripts: ScriptItem[] = [
  {
    id: "OUT-001",
    name: "Sales Outreach Script",
    desc: "Initial outreach for new leads",
    fullDesc: "Initial outreach script for new leads and potential customers.",
    type: "Outbound",
    purpose: "Lead Generation",
    purposeColor: "text-rose-700 bg-rose-50 border-rose-200",
    language: "English",
    status: "Active",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lastUpdated: "Oct 1, 2026 • 10:32 AM",
    createdOn: "Oct 1, 2026 • 10:32 AM",
    iconBg: "bg-blue-50 text-blue-600 border-blue-200",
    iconColor: "text-blue-600",
    icon: Phone,
    previewText: "Hello! Thank you for your interest in our services. I'm calling from [Your Company Name]. We help businesses grow with our smart solutions. Would you like to know more about how we can help you today?",
    tags: ["Lead Generation", "Outbound", "Sales", "English"],
    totalCalls: 124,
    connectedCalls: 98,
    successRate: "79%",
    avgDuration: "03:24",
    contentSteps: [
      { step: "01", label: "Greeting & Identity", speech: "Hello! Thank you for your interest in our services. I am your AI assistant calling from Calling Agent." },
      { step: "02", label: "Value Proposition", speech: "We help enterprises automate high-volume calling workflows with natural human-like voice intelligence." },
      { step: "03", label: "Qualification Question", speech: "Are you currently managing outbound calls manually or using a dialer system?" },
      { step: "04", label: "Closing & Booking", speech: "I'd love to schedule a quick 10-minute demo with our solution engineer. Does tomorrow morning work for you?" },
    ]
  },
  {
    id: "INB-002",
    name: "Customer Support Script",
    desc: "Resolve customer queries",
    fullDesc: "Comprehensive triage and resolution flow for inbound customer care inquiries.",
    type: "Inbound",
    purpose: "Support",
    purposeColor: "text-purple-700 bg-purple-50 border-purple-200",
    language: "Hindi",
    status: "Active",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lastUpdated: "Sep 28, 2026 • 02:15 PM",
    createdOn: "Sep 28, 2026 • 02:15 PM",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    iconColor: "text-purple-600",
    icon: Headset,
    previewText: "नमस्ते! हमारे ग्राहक सेवा केंद्र में आपका स्वागत है। मैं आपकी क्या सहायता कर सकता हूँ? क्या आप अपने हालिया ऑर्डर या सेवा के बारे में पूछताछ करना चाहते हैं?",
    tags: ["Support", "Inbound", "Hindi", "Troubleshooting"],
    totalCalls: 215,
    connectedCalls: 189,
    successRate: "88%",
    avgDuration: "04:12",
    contentSteps: [
      { step: "01", label: "Greeting (Hindi)", speech: "नमस्ते! हमारे सपोर्ट केंद्र में कॉल करने के लिए धन्यवाद। मैं आपकी किस प्रकार सहायता कर सकता हूँ?" },
      { step: "02", label: "Issue Identification", speech: "कृपया अपनी समस्या का संक्षेप में विवरण दें ताकि मैं सही विभाग से जानकारी प्राप्त कर सकूँ।" },
      { step: "03", label: "Resolution / Ticket Creation", speech: "मैंने आपका अनुरोध दर्ज कर लिया है और टिकट आईडी आपके पंजीकृत नंबर पर भेज दी गई है।" },
    ]
  },
  {
    id: "OUT-003",
    name: "Payment Reminder Script",
    desc: "Payment due notifications",
    fullDesc: "Polite automated payment notification and payment link dispatch script.",
    type: "Outbound",
    purpose: "Payment",
    purposeColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    language: "Marathi",
    status: "Active",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lastUpdated: "Sep 25, 2026 • 11:20 AM",
    createdOn: "Sep 25, 2026 • 11:20 AM",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    iconColor: "text-emerald-600",
    icon: CreditCard,
    previewText: "नमस्कार! हा कॉल आपल्या थकित बिलाची आठवण करून देण्यासाठी आहे. आपण आता लगेच ऑनलाइन पेमेंट करू इच्छिता का? मी आपल्या WhatsApp वर सुरक्षित पेमेंट लिंक पाठवू शकतो.",
    tags: ["Payment", "Outbound", "Marathi", "Collections"],
    totalCalls: 310,
    connectedCalls: 275,
    successRate: "92%",
    avgDuration: "02:10",
    contentSteps: [
      { step: "01", label: "Verification (Marathi)", speech: "नमस्कार! मी आपल्या खात्याच्या पेमेंट संबंधित मदतीसाठी कॉल करत आहे. काय मी खातेदाराशी बोलत आहे?" },
      { step: "02", label: "Amount Due Notification", speech: "आपल्या चालू महिन्याचे बिल बाकी असून अंतिम तारीख जवळ आली आहे." },
      { step: "03", label: "Instant Payment Link Dispatch", speech: "मी आपल्या WhatsApp वर त्वरित UPI व नेट बँकिंग लिंक पाठवत आहे. धन्यवाद!" },
    ]
  },
  {
    id: "OUT-004",
    name: "Follow-up Call Script",
    desc: "Re-engage with cold leads",
    fullDesc: "Nurturing script to re-ignite conversation with inactive or unconverted prospects.",
    type: "Outbound",
    purpose: "Follow-up",
    purposeColor: "text-amber-700 bg-amber-50 border-amber-200",
    language: "English",
    status: "Active",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lastUpdated: "Sep 22, 2026 • 04:45 PM",
    createdOn: "Sep 22, 2026 • 04:45 PM",
    iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    iconColor: "text-amber-600",
    icon: Calendar,
    previewText: "Hi there! I noticed you checked out our solution earlier this month. We just released an updated feature package that might be helpful. Do you have two minutes to catch up?",
    tags: ["Follow-up", "Outbound", "Sales", "Nurture"],
    totalCalls: 95,
    connectedCalls: 68,
    successRate: "71%",
    avgDuration: "02:45",
    contentSteps: [
      { step: "01", label: "Context Re-establishment", speech: "Hi there! I'm following up on our previous conversation regarding AI automated voice dialer." },
      { step: "02", label: "Offer & Feature Update", speech: "We just rolled out 12 new regional languages with ultra-low latency." },
      { step: "03", label: "Call to Action", speech: "Would you like me to send over the updated case studies and pricing sheet?" },
    ]
  },
  {
    id: "INB-005",
    name: "Complaint Resolution Script",
    desc: "Handle escalations and complaints",
    fullDesc: "De-escalation dialogue engineered to handle frustrated callers and record formal complaints.",
    type: "Inbound",
    purpose: "Complaint",
    purposeColor: "text-rose-700 bg-rose-50 border-rose-200",
    language: "Hindi",
    status: "Draft",
    statusColor: "text-slate-600 bg-slate-100 border-slate-200",
    lastUpdated: "Sep 20, 2026 • 03:12 PM",
    createdOn: "Sep 20, 2026 • 03:12 PM",
    iconBg: "bg-rose-50 text-rose-600 border-rose-200",
    iconColor: "text-rose-600",
    icon: AlertCircle,
    previewText: "हमें हुई असुविधा के लिए अत्यंत खेद है। मैं आपकी समस्या को तुरंत प्राथमिकता के आधार पर हमारे वरिष्ठ प्रबंधन तक पहुँचाने के लिए यहाँ हूँ। कृपया मुझे पूरा विवरण बताएं।",
    tags: ["Complaint", "Inbound", "Hindi", "Escalation"],
    totalCalls: 45,
    connectedCalls: 40,
    successRate: "65%",
    avgDuration: "05:50",
    contentSteps: [
      { step: "01", label: "Empathy Statement", speech: "हमें हुई असुविधा के लिए अत्यंत खेद है। आपकी संतुष्टि हमारी सर्वोच्च प्राथमिकता है।" },
      { step: "02", label: "Incident Logging", speech: "मैंने आपकी शिकायत को टिकट #CMP-9042 के रूप में दर्ज कर लिया है।" },
      { step: "03", label: "Human Escalation Option", speech: "क्या आप चाहते हैं कि मैं इस कॉल को हमारे सीनियर सुपरवाइजर को ट्रांसफर करूँ?" },
    ]
  },
  {
    id: "OUT-006",
    name: "Appointment Booking Script",
    desc: "Schedule appointments",
    fullDesc: "High-conversion scheduling script with interactive calendar slot coordination.",
    type: "Outbound",
    purpose: "Appointment",
    purposeColor: "text-purple-700 bg-purple-50 border-purple-200",
    language: "English",
    status: "Active",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lastUpdated: "Sep 18, 2026 • 09:18 AM",
    createdOn: "Sep 18, 2026 • 09:18 AM",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    iconColor: "text-purple-600",
    icon: Calendar,
    previewText: "Good day! I'm calling to confirm your upcoming consultation appointment with our senior enterprise advisor. Would Wednesday at 3:00 PM or Thursday at 11:00 AM work best for you?",
    tags: ["Appointment", "Outbound", "English", "Calendar"],
    totalCalls: 180,
    connectedCalls: 155,
    successRate: "84%",
    avgDuration: "02:30",
    contentSteps: [
      { step: "01", label: "Greeting & Purpose", speech: "Good day! I'm calling to confirm your upcoming consultation appointment with our advisor." },
      { step: "02", label: "Slot Selection", speech: "We have available slots this Wednesday at 3:00 PM or Thursday at 11:00 AM. Which one do you prefer?" },
      { step: "03", label: "Confirmation SMS", speech: "Wonderful! I have booked your slot and sent the Google Meet link via SMS." },
    ]
  },
  {
    id: "INB-007",
    name: "Feedback Collection Script",
    desc: "Collect customer feedback",
    fullDesc: "CSAT and NPS conversational survey script with sentiment detection.",
    type: "Inbound",
    purpose: "Feedback",
    purposeColor: "text-teal-700 bg-teal-50 border-teal-200",
    language: "Marathi",
    status: "Active",
    statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    lastUpdated: "Sep 16, 2026 • 01:35 PM",
    createdOn: "Sep 16, 2026 • 01:35 PM",
    iconBg: "bg-teal-50 text-teal-600 border-teal-200",
    iconColor: "text-teal-600",
    icon: Star,
    previewText: "नमस्कार! आमची सेवा वापरल्याबद्दल धन्यवाद. आपल्या अनुभवावर आधारित १ ते ५ गुणांमध्ये आपण आमच्या सेवेला किती गुण द्याल? आपला अभिप्राय आमच्यासाठी खूप महत्त्वाचा आहे.",
    tags: ["Feedback", "Inbound", "Marathi", "CSAT"],
    totalCalls: 240,
    connectedCalls: 210,
    successRate: "90%",
    avgDuration: "01:50",
    contentSteps: [
      { step: "01", label: "Welcome & Survey Intro", speech: "आमच्या सेवेबद्दल आपल्या बहुमूल्य अभिप्रायासाठी फक्त १ मिनिट द्याल का?" },
      { step: "02", label: "NPS Rating Question", speech: "१ ते ५ च्या प्रमाणामध्ये, आपण आमच्या सेवेची इतरांना शिफारस कराल का?" },
      { step: "03", label: "Gratitude & Wrap-up", speech: "आपल्या मौल्यवान वेळेबद्दल आणि अभिप्रायाबद्दल मनापासून धन्यवाद!" },
    ]
  },
  {
    id: "OUT-008",
    name: "Product Information Script",
    desc: "Share product details",
    fullDesc: "Comprehensive product specifications and FAQ responses for registered web leads.",
    type: "Outbound",
    purpose: "Product Info",
    purposeColor: "text-violet-700 bg-violet-50 border-violet-200",
    language: "English",
    status: "Inactive",
    statusColor: "text-rose-700 bg-rose-50 border-rose-200",
    lastUpdated: "Sep 14, 2026 • 10:22 AM",
    createdOn: "Sep 14, 2026 • 10:22 AM",
    iconBg: "bg-sky-50 text-sky-600 border-sky-200",
    iconColor: "text-sky-600",
    icon: FileText,
    previewText: "Hello! You recently requested more information regarding our Voice AI features on our website. I can guide you through our pricing tiers, API integrations, and quick setup guide right now.",
    tags: ["Product Info", "Outbound", "English", "Specs"],
    totalCalls: 85,
    connectedCalls: 55,
    successRate: "62%",
    avgDuration: "03:15",
    contentSteps: [
      { step: "01", label: "Web Lead Callback", speech: "Hello! You recently requested product details on our website. I am here to assist." },
      { step: "02", label: "Feature Overview", speech: "Our voice agent integrates with Twilio, SIP trunks, and all major CRMs with real-time analytics." },
      { step: "03", label: "Documentation Dispatch", speech: "I have dispatched the PDF product manual and API keys to your email." },
    ]
  },
];

export default function CallScriptsContent() {
  const [scripts, setScripts] = useState<ScriptItem[]>(initialScripts);
  const [selectedScript, setSelectedScript] = useState<ScriptItem | null>(initialScripts[0]);
  const [activeTab, setActiveTab] = useState<"Overview" | "Script Content" | "Settings" | "Performance">("Overview");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Modals & Feedback
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    desc: "",
    type: "Outbound" as "Outbound" | "Inbound",
    purpose: "Lead Generation",
    language: "English",
    status: "Active" as "Active" | "Draft" | "Inactive" | "Archived",
    previewText: "",
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Copy Preview Text
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Script preview copied to clipboard!");
  };

  // Archive Script
  const handleArchiveScript = (script: ScriptItem) => {
    const updated: ScriptItem = {
      ...script,
      status: "Archived",
      statusColor: "text-slate-600 bg-slate-100 border-slate-200"
    };
    setScripts(prev => prev.map(s => s.id === script.id ? updated : s));
    setSelectedScript(updated);
    showToast(`Script "${script.name}" archived.`);
  };

  // Toggle Active/Inactive
  const handleToggleStatus = (script: ScriptItem) => {
    const nextStatus = script.status === "Active" ? "Inactive" : "Active";
    const nextColor = nextStatus === "Active" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200";
    const updated: ScriptItem = { ...script, status: nextStatus, statusColor: nextColor };
    setScripts(prev => prev.map(s => s.id === script.id ? updated : s));
    setSelectedScript(updated);
    showToast(`Script status changed to ${nextStatus}.`);
  };

  // Create Script
  const handleCreateScript = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    const newId = `${formState.type === "Outbound" ? "OUT" : "INB"}-00${scripts.length + 1}`;
    const newScript: ScriptItem = {
      id: newId,
      name: formState.name,
      desc: formState.desc || "Custom voice script",
      fullDesc: formState.desc || "Interactive conversational script for AI calling agent.",
      type: formState.type,
      purpose: formState.purpose,
      purposeColor: "text-blue-700 bg-blue-50 border-blue-200",
      language: formState.language,
      status: formState.status,
      statusColor: formState.status === "Active" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-slate-600 bg-slate-100 border-slate-200",
      lastUpdated: "Just now",
      createdOn: "Oct 12, 2026 • 12:50 PM",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
      iconColor: "text-blue-600",
      icon: formState.type === "Outbound" ? Phone : Headset,
      previewText: formState.previewText || "Hello! Thank you for calling. How can I help you today?",
      tags: [formState.purpose, formState.type, formState.language],
      totalCalls: 0,
      connectedCalls: 0,
      successRate: "0%",
      avgDuration: "00:00",
      contentSteps: [
        { step: "01", label: "Opening Statement", speech: formState.previewText || "Hello! How can I help you?" },
      ]
    };

    setScripts([newScript, ...scripts]);
    setSelectedScript(newScript);
    setIsCreateModalOpen(false);
    showToast(`New script "${newScript.name}" created!`);
  };

  // Filter Logic
  const filteredScripts = scripts.filter(s => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || (
      s.name.toLowerCase().includes(q) ||
      s.purpose.toLowerCase().includes(q) ||
      s.tags.some(t => t.toLowerCase().includes(q)) ||
      s.language.toLowerCase().includes(q)
    );

    const matchesType = typeFilter === "All Types" || s.type === typeFilter;
    const matchesStatus = statusFilter === "All Status" || s.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
    showToast("Filters reset to default.");
  };

  // KPIs
  const totalCount = scripts.length;
  const activeCount = scripts.filter(s => s.status === "Active").length;
  const draftCount = scripts.filter(s => s.status === "Draft").length;
  const archivedCount = scripts.filter(s => s.status === "Archived" || s.status === "Inactive").length;

  return (
    <div className="p-8 space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="size-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shadow-xs">
            <FileText className="size-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Call Scripts</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Manage and organize your AI call scripts for different use cases.
            </p>
          </div>
        </div>

        <button 
          onClick={() => {
            setFormState({
              name: "",
              desc: "",
              type: "Outbound",
              purpose: "Lead Generation",
              language: "English",
              status: "Active",
              previewText: "",
            });
            setIsCreateModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="size-4" /> Create New Script
        </button>
      </div>

      {/* 4 KPI Cards (Matching Image Exactly) */}
      <div className="grid grid-cols-4 gap-6">
        {/* Total Scripts */}
        <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Total Scripts</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">12</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                ↑ +2 this week
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shadow-inner">
              <FileText className="size-5" />
            </div>
          </div>
        </div>

        {/* Active Scripts */}
        <div className="relative overflow-hidden rounded-xl border border-cyan-200 bg-cyan-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-cyan-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Active Scripts</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">9</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                ↑ +1 this week
              </p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600 shadow-inner">
              <Phone className="size-5" />
            </div>
          </div>
        </div>

        {/* Draft Scripts */}
        <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-purple-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Draft Scripts</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">2</h3>
              <p className="mt-2 text-xs font-bold text-slate-400">
                0 this week
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 shadow-inner">
              <Edit className="size-5" />
            </div>
          </div>
        </div>

        {/* Archived Scripts */}
        <div className="relative overflow-hidden rounded-xl border border-sky-200 bg-sky-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-sky-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Archived Scripts</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800">1</h3>
              <p className="mt-2 text-xs font-bold text-slate-400">
                0 this week
              </p>
            </div>
            <div className="p-3 rounded-xl bg-sky-100 text-sky-600 shadow-inner">
              <Archive className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content: Left Table & Right Details Drawer */}
      <div className="flex items-start gap-6">
        {/* Left Side: Search, Filters & Table */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
          {/* Filters Bar */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/30">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scripts by name, purpose or tags..."
                className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Script Type Dropdown */}
            <div className="relative w-36">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
              >
                <option>All Types</option>
                <option>Outbound</option>
                <option>Inbound</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative w-36">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 appearance-none bg-white focus:outline-none cursor-pointer"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Inactive</option>
                <option>Archived</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            <button 
              onClick={handleClearFilters}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 cursor-pointer py-1.5 shrink-0"
            >
              <RefreshCw className="size-3.5" /> Clear Filters
            </button>
          </div>

          {/* Section Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">
              Call Scripts ({filteredScripts.length})
            </h2>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap min-w-max">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-4 w-10"><input type="checkbox" className="rounded border-slate-300 size-4" /></th>
                  <th className="px-3 py-4">Script Name</th>
                  <th className="px-3 py-4">Type</th>
                  <th className="px-3 py-4">Purpose</th>
                  <th className="px-3 py-4">Language</th>
                  <th className="px-3 py-4">Status</th>
                  <th className="px-3 py-4">Last Updated</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredScripts.map((script) => {
                  const isSelected = selectedScript?.id === script.id;
                  const Icon = script.icon;
                  return (
                    <tr 
                      key={script.id}
                      onClick={() => setSelectedScript(script)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${isSelected ? "bg-blue-50/60" : ""}`}
                    >
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-slate-300 size-4" />
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`size-8 rounded-full flex items-center justify-center shrink-0 border ${script.iconBg}`}>
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-[13px]">{script.name}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{script.desc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                          script.type === "Outbound"
                            ? "text-blue-700 bg-blue-50 border-blue-200"
                            : "text-purple-700 bg-purple-50 border-purple-200"
                        }`}>
                          {script.type}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${script.purposeColor}`}>
                          {script.purpose}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-slate-600 font-medium">{script.language}</td>
                      <td className="px-3 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-flex items-center gap-1.5 ${script.statusColor}`}>
                          <span className={`size-1.5 rounded-full ${script.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-current"}`} />
                          {script.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-slate-600 font-medium">{script.lastUpdated}</td>
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleToggleStatus(script)}
                          title="Toggle Status"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          <MoreVertical className="size-4" />
                        </button>
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
              Showing 1 to {filteredScripts.length} of 12 scripts
            </div>
            <div className="flex items-center gap-1.5">
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:bg-white font-bold">&lt;</button>
              <button className="size-8 flex items-center justify-center bg-blue-600 text-white rounded-lg font-bold shadow-xs text-sm">1</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">2</button>
              <button className="size-8 flex items-center justify-center border border-slate-200 rounded-lg text-slate-600 hover:bg-white font-bold">&gt;</button>
            </div>
          </div>
        </div>

        {/* Right Side: Script Details Drawer (Matching Image 1 Exactly) */}
        {selectedScript && (
          <div className="w-[380px] shrink-0 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-8 duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-800">Script Details</span>
                <button 
                  onClick={() => setSelectedScript(null)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-11 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-slate-800 leading-tight">{selectedScript.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                      {selectedScript.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    {selectedScript.id} • {selectedScript.type}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {selectedScript.fullDesc}
                  </div>
                </div>
              </div>

              {/* Drawer Tabs */}
              <div className="flex gap-5 mt-6 border-b border-slate-100">
                {(["Overview", "Script Content", "Settings", "Performance"] as const).map((tab) => (
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
                  {/* Script Information */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="size-3.5 text-blue-600" /> Script Information
                      </h4>
                      <button 
                        onClick={() => {
                          setFormState({
                            name: selectedScript.name,
                            desc: selectedScript.desc,
                            type: selectedScript.type,
                            purpose: selectedScript.purpose,
                            language: selectedScript.language,
                            status: selectedScript.status,
                            previewText: selectedScript.previewText,
                          });
                          setIsEditModalOpen(true);
                        }}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Edit className="size-3" /> Edit
                      </button>
                    </div>

                    <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Name</span>
                        <span className="text-slate-800 font-bold">{selectedScript.name}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Script ID</span>
                        <span className="text-slate-800 font-bold">{selectedScript.id}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Type</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200">
                          {selectedScript.type}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Purpose</span>
                        <span className="text-blue-600 font-bold">{selectedScript.purpose}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Language</span>
                        <span className="text-slate-800 font-bold flex items-center gap-1">
                          🇮🇳 {selectedScript.language}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Created On</span>
                        <span className="text-slate-700 font-semibold flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" /> {selectedScript.createdOn}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-semibold">Last Updated</span>
                        <span className="text-slate-700 font-semibold flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" /> {selectedScript.lastUpdated}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Script Preview */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="size-3.5 text-blue-600" /> Script Preview
                      </h4>
                      <button 
                        onClick={() => handleCopyText(selectedScript.previewText)}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="size-3" /> Copy
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/30 text-xs text-slate-700 leading-relaxed font-medium">
                      "{selectedScript.previewText}"
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedScript.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Performance (Last 7 Days) */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Performance (Last 7 Days)
                      </h4>
                      <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
                        View Details
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Total Calls</div>
                        <div className="text-base font-black text-slate-800">{selectedScript.totalCalls}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 18%</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Connected</div>
                        <div className="text-base font-black text-slate-800">{selectedScript.connectedCalls}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 12%</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Success Rate</div>
                        <div className="text-base font-black text-slate-800">{selectedScript.successRate}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 6%</div>
                      </div>
                      <div className="border border-slate-200 rounded-xl p-3 bg-white text-center">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Avg. Duration</div>
                        <div className="text-base font-black text-slate-800">{selectedScript.avgDuration}</div>
                        <div className="text-[9px] font-bold text-emerald-500 mt-1">↑ 10%</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons (Matching Image) */}
                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => showToast(`Script "${selectedScript.name}" deployed to active dialer campaigns!`)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                    >
                      <Play className="size-4 fill-current" /> Use This Script
                    </button>
                    <button
                      onClick={() => {
                        setFormState({
                          name: selectedScript.name,
                          desc: selectedScript.desc,
                          type: selectedScript.type,
                          purpose: selectedScript.purpose,
                          language: selectedScript.language,
                          status: selectedScript.status,
                          previewText: selectedScript.previewText,
                        });
                        setIsEditModalOpen(true);
                      }}
                      className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Edit className="size-3.5" /> Edit Script
                    </button>
                    <button
                      onClick={() => handleArchiveScript(selectedScript)}
                      className="w-full py-2.5 bg-white border border-rose-300 hover:bg-rose-50 text-rose-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Trash2 className="size-3.5" /> Archive Script
                    </button>
                  </div>
                </>
              )}

              {activeTab === "Script Content" && (
                <div className="space-y-4 text-xs">
                  <div className="text-slate-500 font-medium">Conversational Flow Steps:</div>
                  {selectedScript.contentSteps.map((step, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span className="size-5 rounded-full bg-blue-100 text-blue-600 text-[10px] flex items-center justify-center font-mono">
                          {step.step}
                        </span>
                        {step.label}
                      </div>
                      <p className="text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed font-medium">
                        "{step.speech}"
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "Settings" && (
                <div className="space-y-4 text-xs">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <span className="font-bold text-slate-800 block">AI Voice Parameters</span>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Speaking Rate</span>
                      <span className="font-bold text-slate-800">1.05x (Optimal Conversational)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Interruption Sensitivity</span>
                      <span className="font-bold text-emerald-600">High (Instant Pause)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Fallback Human Transfer</span>
                      <span className="font-bold text-blue-600">Enabled (Ext 104)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Performance" && (
                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                    <span className="font-bold text-slate-800 block">Call Funnel Analytics</span>
                    <div className="flex justify-between"><span>Opening Hook Retention</span><span className="font-bold text-emerald-600">92%</span></div>
                    <div className="flex justify-between"><span>Pitch Engagement</span><span className="font-bold text-blue-600">81%</span></div>
                    <div className="flex justify-between"><span>Appointment Agreed</span><span className="font-bold text-purple-600">79%</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal: Create New Script */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                  <FileText className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Create New Call Script</h3>
                  <p className="text-xs text-slate-400">Define dialogue templates for voice agents</p>
                </div>
              </div>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateScript} className="mt-5 space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Script Name *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Festival Offer Promotion"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Call Type</label>
                  <select 
                    value={formState.type}
                    onChange={(e) => setFormState({ ...formState, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium bg-white"
                  >
                    <option>Outbound</option>
                    <option>Inbound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Language</label>
                  <select 
                    value={formState.language}
                    onChange={(e) => setFormState({ ...formState, language: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium bg-white"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Purpose</label>
                  <select 
                    value={formState.purpose}
                    onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium bg-white"
                  >
                    <option>Lead Generation</option>
                    <option>Support</option>
                    <option>Payment</option>
                    <option>Follow-up</option>
                    <option>Complaint</option>
                    <option>Appointment</option>
                    <option>Feedback</option>
                    <option>Product Info</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Status</label>
                  <select 
                    value={formState.status}
                    onChange={(e) => setFormState({ ...formState, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium bg-white"
                  >
                    <option>Active</option>
                    <option>Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Opening Speech Prompt</label>
                <textarea 
                  rows={3}
                  placeholder="The first phrase the AI agent greets the caller with..."
                  value={formState.previewText}
                  onChange={(e) => setFormState({ ...formState, previewText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-xs cursor-pointer"
                >
                  Create Script
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Script */}
      {isEditModalOpen && selectedScript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-base">Edit Script ({selectedScript.id})</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Script Name</label>
                <input 
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Preview Speech</label>
                <textarea 
                  rows={4}
                  value={formState.previewText}
                  onChange={(e) => setFormState({ ...formState, previewText: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const updated: ScriptItem = {
                    ...selectedScript,
                    name: formState.name,
                    previewText: formState.previewText,
                    lastUpdated: "Just now"
                  };
                  setScripts(prev => prev.map(s => s.id === selectedScript.id ? updated : s));
                  setSelectedScript(updated);
                  setIsEditModalOpen(false);
                  showToast("Script updated successfully.");
                }}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
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
