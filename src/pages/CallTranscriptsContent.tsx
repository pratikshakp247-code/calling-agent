import { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  Calendar,
  ChevronDown,
  Download,
  Bell,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  Check,
  X,
  Sparkles,
  Bot,
  User,
  Phone,
  Smile,
  Meh,
  Frown,
  RotateCcw,
  Share2,
  Copy,
  Printer,
  FileSpreadsheet,
  ArrowUpRight,
  Headphones,
  SlidersHorizontal,
  Info
} from "lucide-react";

// --- Mock Call Transcripts Dataset ---
interface TranscriptDialogue {
  time: string;
  seconds: number;
  speaker: "agent" | "customer";
  name: string;
  avatarText?: string;
  avatarColor?: string;
  text: string;
}

interface CallTranscriptItem {
  id: string;
  contactName: string;
  phone: string;
  avatar: string;
  avatarColor: string;
  aiAgent: string;
  dateTime: string;
  duration: string;
  durationSeconds: number;
  sentiment: "Positive" | "Neutral" | "Negative";
  status: "Completed" | "Needs Review";
  callType: string;
  summary: string;
  keyTopics: string[];
  sentimentDescription: string;
  dialogue: TranscriptDialogue[];
  metadata: {
    callId: string;
    model: string;
    latency: string;
    quality: string;
    crmStatus: string;
    intent: string;
  };
}

const TRANSCRIPTS_DATA: CallTranscriptItem[] = [
  {
    id: "TR-101",
    contactName: "Aisha Patel",
    phone: "+91 98765 43210",
    avatar: "AP",
    avatarColor: "bg-blue-600",
    aiAgent: "Customer Support Bot",
    dateTime: "Apr 22, 2025 • 11:24 AM",
    duration: "4m 12s",
    durationSeconds: 252,
    sentiment: "Positive",
    status: "Completed",
    callType: "Inbound Call",
    summary:
      "Customer Aisha Patel called to inquire about the premium plan, showed interest in the 20% discount offer and asked about long-term customer benefits. The call ended with the customer agreeing to receive the plan details via email.",
    keyTopics: ["Premium Plan", "Discount Offer", "Long-Term Benefits", "Email Communication"],
    sentimentDescription:
      "Customer was polite, interested and had a positive tone throughout the conversation.",
    metadata: {
      callId: "CALL-20250422-8841",
      model: "VoiceAI Hermes v3.2",
      latency: "420ms (Avg Response)",
      quality: "HD VoLTE (48kHz)",
      crmStatus: "Synced to HubSpot (Deal #9821)",
      intent: "Product Inquiry / Discount Terms"
    },
    dialogue: [
      {
        time: "00:00",
        seconds: 0,
        speaker: "agent",
        name: "AI Agent",
        text: "Hello! Thank you for calling VoiceAI. I'm your virtual assistant. How can I help you today?"
      },
      {
        time: "00:18",
        seconds: 18,
        speaker: "customer",
        name: "Customer",
        avatarText: "AP",
        avatarColor: "bg-purple-600",
        text: "Hi, I wanted to know about the current offers on your premium plan."
      },
      {
        time: "00:32",
        seconds: 32,
        speaker: "agent",
        name: "AI Agent",
        text: "Sure! I'd be happy to help you with that. Our premium plan currently has a 20% discount for the first 3 months. Would you like me to share the details?"
      },
      {
        time: "01:05",
        seconds: 65,
        speaker: "customer",
        name: "Customer",
        avatarText: "AP",
        avatarColor: "bg-purple-600",
        text: "Yes, please. Can you also tell me if there is any additional benefit for long-term customers?"
      },
      {
        time: "01:48",
        seconds: 108,
        speaker: "agent",
        name: "AI Agent",
        text: "Absolutely! Long-term customers get extra 5% cashback and priority support. I can also send the plan details to your email if you'd like."
      },
      {
        time: "02:12",
        seconds: 132,
        speaker: "customer",
        name: "Customer",
        avatarText: "AP",
        avatarColor: "bg-purple-600",
        text: "That sounds great. Please send it to my email. Thank you!"
      },
      {
        time: "02:28",
        seconds: 148,
        speaker: "agent",
        name: "AI Agent",
        text: "You're welcome! I've sent the details to your registered email address. Is there anything else I can assist you with today?"
      }
    ]
  },
  {
    id: "TR-102",
    contactName: "Rahul Sharma",
    phone: "+91 87654 32109",
    avatar: "RS",
    avatarColor: "bg-purple-600",
    aiAgent: "Sales Assistant",
    dateTime: "Apr 22, 2025 • 10:45 AM",
    duration: "2m 38s",
    durationSeconds: 158,
    sentiment: "Neutral",
    status: "Completed",
    callType: "Outbound Call",
    summary:
      "Sales follow-up regarding enterprise calling credits. Customer Rahul requested renewal invoice breakdown and scheduled an account executive demo for Thursday.",
    keyTopics: ["Enterprise Credits", "Renewal Invoice", "Demo Scheduling"],
    sentimentDescription:
      "Customer remained professional and requested formal email documentation before confirming payment.",
    metadata: {
      callId: "CALL-20250422-8712",
      model: "VoiceAI Hermes v3.2",
      latency: "390ms (Avg Response)",
      quality: "HD VoLTE (48kHz)",
      crmStatus: "Synced to Salesforce (Lead #4102)",
      intent: "Enterprise Upgrade / Demo"
    },
    dialogue: [
      {
        time: "00:00",
        seconds: 0,
        speaker: "agent",
        name: "AI Agent",
        text: "Hello Rahul, this is Alex from VoiceAI following up on your team's trial account. How has the platform experience been so far?"
      },
      {
        time: "00:15",
        seconds: 15,
        speaker: "customer",
        name: "Customer",
        avatarText: "RS",
        avatarColor: "bg-purple-600",
        text: "Hi Alex. The voice bot responses are fast, but I need the itemized pricing for 10 seats."
      },
      {
        time: "00:35",
        seconds: 35,
        speaker: "agent",
        name: "AI Agent",
        text: "Understood. The 10-seat enterprise bundle includes unlimited AI telephony and CRM sync at $49 per seat per month. Would Thursday at 3 PM work for a live architecture walkthrough?"
      },
      {
        time: "01:10",
        seconds: 70,
        speaker: "customer",
        name: "Customer",
        avatarText: "RS",
        avatarColor: "bg-purple-600",
        text: "Thursday 3 PM works fine. Send the calendar invite to rahul@techcorp.in."
      },
      {
        time: "01:40",
        seconds: 100,
        speaker: "agent",
        name: "AI Agent",
        text: "Calendar invite sent! We look forward to connecting with your engineering leads on Thursday."
      }
    ]
  },
  {
    id: "TR-103",
    contactName: "Priya Deshmukh",
    phone: "+91 76543 21098",
    avatar: "PD",
    avatarColor: "bg-rose-500",
    aiAgent: "Support Agent",
    dateTime: "Apr 22, 2025 • 09:32 AM",
    duration: "5m 27s",
    durationSeconds: 327,
    sentiment: "Negative",
    status: "Needs Review",
    callType: "Inbound Call",
    summary:
      "Customer Priya reported repeated call drop issues on incoming SIP trunks during peak morning hours. Bot escalated ticket to tier-2 telecom infrastructure team.",
    keyTopics: ["Call Drops", "SIP Trunking", "Latency", "Escalation Ticket"],
    sentimentDescription:
      "Customer expressed frustration regarding SLA downtime; ticket flagged for immediate manager review.",
    metadata: {
      callId: "CALL-20250422-8605",
      model: "VoiceAI Hermes v3.2",
      latency: "510ms (Elevated)",
      quality: "Standard VoIP (16kHz)",
      crmStatus: "Escalated to Zendesk (Ticket #88124)",
      intent: "Technical Support / SLA Complaint"
    },
    dialogue: [
      {
        time: "00:00",
        seconds: 0,
        speaker: "agent",
        name: "AI Agent",
        text: "Thank you for reaching VoiceAI Technical Support. I am your automated diagnostic assistant. Please describe the problem."
      },
      {
        time: "00:20",
        seconds: 20,
        speaker: "customer",
        name: "Customer",
        avatarText: "PD",
        avatarColor: "bg-rose-500",
        text: "We have had three customer calls drop consecutively this morning on SIP trunk 2. This is impacting our business."
      },
      {
        time: "00:50",
        seconds: 50,
        speaker: "agent",
        name: "AI Agent",
        text: "I sincerely apologize for the disruption Priya. I have run an instant carrier route diagnostic and detected packet jitter on the Mumbai gateway."
      },
      {
        time: "01:30",
        seconds: 90,
        speaker: "customer",
        name: "Customer",
        avatarText: "PD",
        avatarColor: "bg-rose-500",
        text: "Please escalate this to a network engineer right now and confirm when the backup route will take over."
      },
      {
        time: "02:10",
        seconds: 130,
        speaker: "agent",
        name: "AI Agent",
        text: "I have flagged this as Priority-1 and routed the ticket to our senior telecom engineer. You will receive an SMS update within 15 minutes."
      }
    ]
  },
  {
    id: "TR-104",
    contactName: "Amit Joshi",
    phone: "+91 91234 56789",
    avatar: "AJ",
    avatarColor: "bg-teal-600",
    aiAgent: "Customer Support Bot",
    dateTime: "Apr 21, 2025 • 06:18 PM",
    duration: "3m 11s",
    durationSeconds: 191,
    sentiment: "Positive",
    status: "Completed",
    callType: "Inbound Call",
    summary:
      "Customer called to verify webhook authentication credentials for custom CRM integration. Bot provided updated bearer token instructions successfully.",
    keyTopics: ["Webhook Setup", "API Authentication", "Developer Portal"],
    sentimentDescription:
      "Customer was very satisfied with quick step-by-step resolution without waiting in queue.",
    metadata: {
      callId: "CALL-20250421-8201",
      model: "VoiceAI Hermes v3.2",
      latency: "410ms (Avg Response)",
      quality: "HD VoLTE (48kHz)",
      crmStatus: "Synced to Zoho CRM (Contact #5591)",
      intent: "Developer / API Integration"
    },
    dialogue: [
      {
        time: "00:00",
        seconds: 0,
        speaker: "agent",
        name: "AI Agent",
        text: "Hello Amit! Welcome to VoiceAI Developer Support. How may I assist your API implementation?"
      },
      {
        time: "00:16",
        seconds: 16,
        speaker: "customer",
        name: "Customer",
        avatarText: "AJ",
        avatarColor: "bg-teal-600",
        text: "Hi, I was getting a 401 unauthorized on our webhook callback endpoint."
      },
      {
        time: "00:38",
        seconds: 38,
        speaker: "agent",
        name: "AI Agent",
        text: "Our API v2 requires HMAC SHA256 signature validation in the headers. I can trigger a test payload to your endpoint right now."
      },
      {
        time: "01:20",
        seconds: 80,
        speaker: "customer",
        name: "Customer",
        avatarText: "AJ",
        avatarColor: "bg-teal-600",
        text: "That worked instantly! The payload arrived with a 200 OK. Thank you so much."
      }
    ]
  },
  {
    id: "TR-105",
    contactName: "Neha Kulkarni",
    phone: "+91 99887 76655",
    avatar: "NK",
    avatarColor: "bg-indigo-600",
    aiAgent: "Sales Assistant",
    dateTime: "Apr 21, 2025 • 04:05 PM",
    duration: "4m 56s",
    durationSeconds: 296,
    sentiment: "Neutral",
    status: "Completed",
    callType: "Outbound Call",
    summary:
      "Inquired about multilingual language packs for Hindi and Marathi voice assistants. Bot demonstrated live accent sample and sent regional brochure.",
    keyTopics: ["Indic Languages", "Hindi/Marathi Voice", "Speech-to-Text Accents"],
    sentimentDescription:
      "Customer liked the regional voice demo and requested a pilot test for 5 agents next week.",
    metadata: {
      callId: "CALL-20250421-8045",
      model: "VoiceAI Hermes v3.2",
      latency: "435ms (Avg Response)",
      quality: "HD VoLTE (48kHz)",
      crmStatus: "Synced to Salesforce (Opp #1209)",
      intent: "Multilingual Expansion"
    },
    dialogue: [
      {
        time: "00:00",
        seconds: 0,
        speaker: "agent",
        name: "AI Agent",
        text: "Namaste Neha! Calling from VoiceAI regarding your inquiry on Indic regional voice agent models."
      },
      {
        time: "00:22",
        seconds: 22,
        speaker: "customer",
        name: "Customer",
        avatarText: "NK",
        avatarColor: "bg-indigo-600",
        text: "Yes, we want to know if the agent supports natural conversational Marathi and Hindi code-mixing."
      },
      {
        time: "00:55",
        seconds: 55,
        speaker: "agent",
        name: "AI Agent",
        text: "Ho nakki! Our neural Indic speech engine natively processes Hinglish and Marathi with 96% intent accuracy across colloquial accents."
      },
      {
        time: "01:45",
        seconds: 105,
        speaker: "customer",
        name: "Customer",
        avatarText: "NK",
        avatarColor: "bg-indigo-600",
        text: "Great! Let's schedule a pilot deployment for our Pune customer care team."
      }
    ]
  }
];

interface CallTranscriptsProps {
  onSignOut?: () => void;
}

export default function CallTranscriptsContent({ onSignOut }: CallTranscriptsProps) {
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [selectedAgent, setSelectedAgent] = useState("All Agents");
  const [selectedStatus, setSelectedStatus] = useState("All Call Statuses");
  const [selectedSentiment, setSelectedSentiment] = useState("All Sentiments");

  // Selection & Inspector State
  const [selectedTranscript, setSelectedTranscript] = useState<CallTranscriptItem>(TRANSCRIPTS_DATA[0]);
  const [inspectorTab, setInspectorTab] = useState<"summary" | "metadata">("summary");

  // Interactive Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioSeconds, setCurrentAudioSeconds] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const playbackTimerRef = useRef<any>(null);

  // Popovers & Feedback
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio Playback simulation
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setInterval(() => {
        setCurrentAudioSeconds((prev) => {
          if (prev >= selectedTranscript.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / audioSpeed);
    } else {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    }
    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [isPlaying, audioSpeed, selectedTranscript.durationSeconds]);

  // When selected transcript changes, reset player
  const handleSelectTranscript = (item: CallTranscriptItem) => {
    setSelectedTranscript(item);
    setIsPlaying(false);
    setCurrentAudioSeconds(0);
    showToast(`Viewing transcript: ${item.contactName}`);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
    setNotificationsOpen(false);
    setProfileOpen(false);
    setMoreMenuOpen(false);
  };

  const closeAllPopups = () => {
    setOpenDropdown(null);
    setNotificationsOpen(false);
    setProfileOpen(false);
    setMoreMenuOpen(false);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? "0" : ""}${rem}`;
  };

  // Filtered dataset
  const filteredList = TRANSCRIPTS_DATA.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keyTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAgent =
      selectedAgent === "All Agents" ||
      item.aiAgent.toLowerCase().includes(selectedAgent.toLowerCase());

    const matchesStatus =
      selectedStatus === "All Call Statuses" || item.status === selectedStatus;

    const matchesSentiment =
      selectedSentiment === "All Sentiments" || item.sentiment === selectedSentiment;

    return matchesSearch && matchesAgent && matchesStatus && matchesSentiment;
  });

  // Export full transcript as text file download
  const handleExportTranscript = () => {
    closeAllPopups();
    try {
      const dialogueText = selectedTranscript.dialogue
        .map((d) => `[${d.time}] ${d.name}: ${d.text}`)
        .join("\n\n");

      const fileContent = `=== CALL TRANSCRIPT ===
Contact: ${selectedTranscript.contactName} (${selectedTranscript.phone})
Date & Time: ${selectedTranscript.dateTime}
Duration: ${selectedTranscript.duration}
AI Agent: ${selectedTranscript.aiAgent}
Sentiment: ${selectedTranscript.sentiment}
Status: ${selectedTranscript.status}

=== AI SUMMARY ===
${selectedTranscript.summary}

=== CONVERSATION LOG ===
${dialogueText}
`;
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filename = `transcript_${selectedTranscript.contactName.replace(/\s+/g, "_")}_${selectedTranscript.id}.txt`;
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Exported transcript text file: ${filename}`);
    } catch {
      showToast("Transcript exported successfully");
    }
  };

  // Export Table CSV
  const handleExportCSV = () => {
    closeAllPopups();
    try {
      const headers = ["ID", "Contact", "Phone", "AI Agent", "Date & Time", "Duration", "Sentiment", "Status"];
      const rows = filteredList.map((item) => [
        item.id,
        item.contactName,
        item.phone,
        item.aiAgent,
        item.dateTime,
        item.duration,
        item.sentiment,
        item.status
      ]);
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.href = encodedUri;
      link.download = `call_transcripts_export_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Exported CSV spreadsheet with all filtered calls");
    } catch {
      showToast("Export completed");
    }
  };

  const handleCopyTranscript = () => {
    closeAllPopups();
    const text = selectedTranscript.dialogue.map((d) => `${d.name}: ${d.text}`).join("\n");
    navigator.clipboard?.writeText(text);
    showToast("Full transcript copied to clipboard!");
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen text-slate-800 relative font-sans">
      {/* Click outside backdrop */}
      {(openDropdown !== null || notificationsOpen || profileOpen || moreMenuOpen) && (
        <div className="fixed inset-0 z-30 bg-transparent" onClick={closeAllPopups} />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        {/* Title */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            <MessageSquare className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Call Transcripts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review, search, and analyze recorded conversations
            </p>
          </div>
        </div>

        {/* Top Controls Toolbar */}
        <div className="flex items-center flex-wrap gap-2.5 relative z-40">
          {/* Date Picker Button */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("dateRange")}
              className={`flex items-center gap-2 bg-white border px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                openDropdown === "dateRange" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Calendar className="size-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {openDropdown === "dateRange" && (
              <div className="absolute left-0 top-full mt-1.5 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                {["Today", "Yesterday", "Last 7 Days", "Last 30 Days", "This Month"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateRange(range);
                      setOpenDropdown(null);
                      showToast(`Date range set: ${range}`);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                      dateRange === range ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{range}</span>
                    {dateRange === range && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcripts, contacts, or keywords"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-xs text-slate-800 placeholder-slate-400 transition-all shadow-xs outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* All Agents Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("agentFilter")}
              className={`flex items-center gap-1.5 bg-white border px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                openDropdown === "agentFilter" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span>{selectedAgent}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {openDropdown === "agentFilter" && (
              <div className="absolute left-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs">
                {["All Agents", "Customer Support Bot", "Sales Assistant", "Support Agent"].map((agent) => (
                  <button
                    key={agent}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setOpenDropdown(null);
                      showToast(`Filtered by: ${agent}`);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                      selectedAgent === agent ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{agent}</span>
                    {selectedAgent === agent && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* All Call Statuses Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("statusFilter")}
              className={`flex items-center gap-1.5 bg-white border px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                openDropdown === "statusFilter" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span>{selectedStatus}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {openDropdown === "statusFilter" && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs">
                {["All Call Statuses", "Completed", "Needs Review"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setSelectedStatus(st);
                      setOpenDropdown(null);
                      showToast(`Filtered status: ${st}`);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                      selectedStatus === st ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{st}</span>
                    {selectedStatus === st && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* All Sentiments Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("sentimentFilter")}
              className={`flex items-center gap-1.5 bg-white border px-3 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                openDropdown === "sentimentFilter" ? "border-blue-500 ring-2 ring-blue-100" : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <span>{selectedSentiment}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>

            {openDropdown === "sentimentFilter" && (
              <div className="absolute left-0 top-full mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs">
                {["All Sentiments", "Positive", "Neutral", "Negative"].map((snt) => (
                  <button
                    key={snt}
                    onClick={() => {
                      setSelectedSentiment(snt);
                      setOpenDropdown(null);
                      showToast(`Filtered sentiment: ${snt}`);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                      selectedSentiment === snt ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{snt}</span>
                    {selectedSentiment === snt && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("exportMenu")}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
            >
              <Download className="size-3.5" />
              <span>Export</span>
            </button>

            {openDropdown === "exportMenu" && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <FileSpreadsheet className="size-4 text-emerald-600" />
                  <span>Export Transcripts List (CSV)</span>
                </button>
                <button
                  onClick={handleExportTranscript}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <FileText className="size-4 text-blue-600" />
                  <span>Download Active Transcript (.txt)</span>
                </button>
              </div>
            )}
          </div>

          {/* Bell Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen((prev) => !prev);
                setOpenDropdown(null);
                setProfileOpen(false);
              }}
              title="Notifications"
              className="relative p-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-40 text-xs">
                <div className="font-bold text-slate-900 pb-2 border-b border-slate-100 mb-2">
                  Transcript Alerts
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                    <p className="font-semibold text-slate-800">Review Flagged: Priya Deshmukh</p>
                    <p className="text-[11px] text-slate-500">SLA complaint on SIP trunk 2 requires attention</p>
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="font-semibold text-slate-800">High Sentiment Call</p>
                    <p className="text-[11px] text-slate-500">Aisha Patel verified premium discount</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen((prev) => !prev);
                setOpenDropdown(null);
                setNotificationsOpen(false);
              }}
              className="size-9 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer hover:border-purple-300 transition-all"
            >
              P
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-40 text-xs">
                <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                  <div className="font-bold text-slate-800">Prashant (Admin)</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">Online</div>
                </div>
                {onSignOut && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold"
                  >
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row of 4 KPI Summary Cards (Matching Image 1 Format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Total Transcripts */}
        <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Total Transcripts</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">1,248</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ 12% vs previous period</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shadow-inner">
              <FileText className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Completed</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">1,080</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ 15% vs previous period</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 shadow-inner">
              <CheckCircle2 className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Needs Review */}
        <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-amber-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Needs Review</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">42</h3>
              <p className="mt-2 text-xs font-bold text-rose-500 flex items-center gap-1">
                <span>↑ 8% vs previous period</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-600 shadow-inner">
              <AlertTriangle className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 4: Avg. Call Duration */}
        <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-purple-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Avg. Call Duration</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">3m 42s</h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ 10% vs previous period</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 shadow-inner">
              <Clock className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section: Transcripts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-5">Contact</th>
                <th className="py-3 px-5">AI Agent</th>
                <th className="py-3 px-5">Date & Time</th>
                <th className="py-3 px-5">Duration</th>
                <th className="py-3 px-5">Sentiment</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.map((item) => {
                const isSelected = selectedTranscript.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => handleSelectTranscript(item)}
                    className={`transition-colors cursor-pointer group ${
                      isSelected ? "bg-blue-50/50" : "hover:bg-slate-50/80"
                    }`}
                  >
                    {/* Contact */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-8 rounded-full ${item.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
                        >
                          {item.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{item.contactName}</div>
                          <div className="text-[11px] text-slate-400 font-medium">{item.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* AI Agent */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <Bot className="size-3.5 text-blue-500 shrink-0" />
                        <span>{item.aiAgent}</span>
                      </div>
                    </td>

                    {/* Date & Time */}
                    <td className="py-3.5 px-5 text-slate-600 font-medium whitespace-nowrap">
                      {item.dateTime}
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-5 text-slate-700 font-semibold whitespace-nowrap">
                      {item.duration}
                    </td>

                    {/* Sentiment */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      {item.sentiment === "Positive" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <Smile className="size-3 text-emerald-600" />
                          <span>Positive</span>
                        </span>
                      )}
                      {item.sentiment === "Neutral" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                          <Meh className="size-3 text-amber-500" />
                          <span>Neutral</span>
                        </span>
                      )}
                      {item.sentiment === "Negative" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                          <Frown className="size-3 text-rose-500" />
                          <span>Negative</span>
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      {item.status === "Completed" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          Completed
                        </span>
                      )}
                      {item.status === "Needs Review" && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/60">
                          Needs Review
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTranscript(item);
                        }}
                        title="View Transcript Details"
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-blue-100 text-blue-700"
                            : "text-slate-400 group-hover:text-blue-600 hover:bg-slate-100"
                        }`}
                      >
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No transcripts matching your filter query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Active Transcript Detail & AI Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
        {/* Left Column: Audio Player & Transcript Dialogue (Span 8) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Contact Banner Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`size-10 rounded-full ${selectedTranscript.avatarColor} text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm`}
                >
                  {selectedTranscript.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 text-sm">
                      {selectedTranscript.contactName}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-slate-500">
                      {selectedTranscript.callType}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Check className="size-2.5" /> {selectedTranscript.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1 flex-wrap">
                    <span>{selectedTranscript.phone}</span>
                    <span className="text-slate-300">•</span>
                    <span>{selectedTranscript.dateTime}</span>
                    <span className="text-slate-300">•</span>
                    <span>{selectedTranscript.duration}</span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                      <Smile className="size-3" /> {selectedTranscript.sentiment}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audio Player Bar */}
            <div className="bg-slate-50/80 rounded-2xl p-3 sm:p-4 border border-slate-200/80 mb-5">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Play / Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="size-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30 transition-transform active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
                </button>

                {/* Timestamp */}
                <span className="text-xs font-semibold text-slate-600 font-mono w-20 shrink-0">
                  {formatTime(currentAudioSeconds)} / {selectedTranscript.duration.replace("m ", ":").replace("s", "")}
                </span>

                {/* Scrubber Progress Bar */}
                <div
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setCurrentAudioSeconds(Math.round(ratio * selectedTranscript.durationSeconds));
                  }}
                  className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden relative cursor-pointer group"
                >
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-150"
                    style={{
                      width: `${(currentAudioSeconds / selectedTranscript.durationSeconds) * 100}%`
                    }}
                  />
                </div>

                {/* Volume / Mute Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute" : "Mute"}
                  className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="size-4 text-rose-500" /> : <Volume2 className="size-4" />}
                </button>

                {/* Speed Toggle */}
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const next = speeds[(speeds.indexOf(audioSpeed) + 1) % speeds.length];
                    setAudioSpeed(next);
                    showToast(`Playback speed: ${next}x`);
                  }}
                  className="px-2 py-1 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  {audioSpeed}x
                </button>

                {/* More Menu */}
                <div className="relative">
                  <button
                    onClick={() => setMoreMenuOpen((prev) => !prev)}
                    className="p-1.5 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  >
                    <MoreVertical className="size-4" />
                  </button>

                  {moreMenuOpen && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs">
                      <button
                        onClick={handleCopyTranscript}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <Copy className="size-3.5" /> Copy Transcript
                      </button>
                      <button
                        onClick={handleExportTranscript}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 text-slate-700 hover:bg-slate-50 rounded-lg"
                      >
                        <Download className="size-3.5" /> Save Audio (.mp3)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Transcript Messages List */}
            <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 divide-y divide-slate-50">
              {selectedTranscript.dialogue.map((msg, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentAudioSeconds(msg.seconds)}
                  className="pt-3 first:pt-0 flex items-start gap-3 hover:bg-slate-50/60 p-2 rounded-xl transition-colors cursor-pointer group"
                >
                  {/* Timestamp */}
                  <span className="text-[11px] font-mono text-slate-400 group-hover:text-blue-600 font-semibold pt-0.5 w-10 shrink-0">
                    {msg.time}
                  </span>

                  {/* Speaker Badge */}
                  <div className="w-24 shrink-0 flex items-center gap-1.5">
                    {msg.speaker === "agent" ? (
                      <div className="flex items-center gap-1 text-blue-600 font-bold text-xs">
                        <Bot className="size-3.5" />
                        <span>AI Agent</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-purple-600 font-bold text-xs">
                        <span className="size-4 rounded-full bg-purple-100 text-purple-700 font-bold text-[9px] flex items-center justify-center">
                          {selectedTranscript.avatar}
                        </span>
                        <span>Customer</span>
                      </div>
                    )}
                  </div>

                  {/* Message Content */}
                  <p className="flex-1 text-xs text-slate-700 leading-relaxed font-normal">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Summary & Call Metadata (Span 4) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            {/* Tab Headers */}
            <div className="flex items-center gap-6 border-b border-slate-100 pb-3 mb-5">
              <button
                onClick={() => setInspectorTab("summary")}
                className={`flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer relative pb-1 ${
                  inspectorTab === "summary"
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Sparkles className="size-3.5" />
                <span>AI Summary</span>
                {inspectorTab === "summary" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setInspectorTab("metadata")}
                className={`flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer relative pb-1 ${
                  inspectorTab === "metadata"
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Info className="size-3.5" />
                <span>Call Metadata</span>
                {inspectorTab === "metadata" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </div>

            {/* Tab 1: AI Summary Content */}
            {inspectorTab === "summary" ? (
              <div className="space-y-5 animate-in fade-in duration-150">
                {/* AI Summary Card */}
                <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="size-4 text-blue-600" />
                    <h4 className="text-xs font-bold text-slate-900">AI Summary</h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {selectedTranscript.summary}
                  </p>
                </div>

                {/* Key Topics */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Key Topics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTranscript.keyTopics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold border border-blue-100"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2">Sentiment</h4>
                  <div className="flex items-center gap-2 mb-1">
                    {selectedTranscript.sentiment === "Positive" && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <Smile className="size-3.5" /> Positive
                      </span>
                    )}
                    {selectedTranscript.sentiment === "Neutral" && (
                      <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Meh className="size-3.5" /> Neutral
                      </span>
                    )}
                    {selectedTranscript.sentiment === "Negative" && (
                      <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                        <Frown className="size-3.5" /> Negative
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {selectedTranscript.sentimentDescription}
                  </p>
                </div>
              </div>
            ) : (
              /* Tab 2: Call Metadata */
              <div className="space-y-3.5 animate-in fade-in duration-150 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Call ID</span>
                  <span className="font-mono font-bold text-slate-800">{selectedTranscript.metadata.callId}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">AI Model</span>
                  <span className="font-semibold text-slate-800">{selectedTranscript.metadata.model}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Avg Latency</span>
                  <span className="font-semibold text-emerald-600">{selectedTranscript.metadata.latency}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Audio Quality</span>
                  <span className="font-semibold text-slate-800">{selectedTranscript.metadata.quality}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">CRM Sync</span>
                  <span className="font-semibold text-blue-600">{selectedTranscript.metadata.crmStatus}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Detected Intent</span>
                  <span className="font-semibold text-slate-800">{selectedTranscript.metadata.intent}</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              onClick={handleCopyTranscript}
              className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Copy className="size-3.5 text-slate-500" />
              <span>Copy Log</span>
            </button>
            <button
              onClick={handleExportTranscript}
              className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="size-3.5 text-blue-600" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
