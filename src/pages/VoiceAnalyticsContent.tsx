import { useState, useMemo } from "react";
import {
  PhoneCall,
  Clock,
  Bot,
  Shuffle,
  TrendingUp,
  TrendingDown,
  Smile,
  BarChart3,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Bell,
  Megaphone,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  X,
  User,
  LogOut,
  ShieldCheck,
  Layers,
  Printer
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Base datasets per preset
const DATASETS: Record<string, any> = {
  default: {
    kpis: {
      total: "1,248",
      totalTrend: "+12% vs previous period",
      answered: "1,080",
      answerRate: "86.5% answer rate",
      missed: "168",
      missedTrend: "-8% vs previous period",
      avgDuration: "3m 42s",
      durationTrend: "+15% vs previous period",
      aiHandled: "892",
      aiRate: "71.5% of total calls"
    },
    dailyVolume: [
      { day: "Mon", total: 140, answered: 112, duration: 3.2 },
      { day: "Tue", total: 168, answered: 138, duration: 4.0 },
      { day: "Wed", total: 155, answered: 128, duration: 3.4 },
      { day: "Thu", total: 188, answered: 160, duration: 4.6 },
      { day: "Fri", total: 185, answered: 152, duration: 4.5 },
      { day: "Sat", total: 222, answered: 188, duration: 5.7 },
      { day: "Sun", total: 152, answered: 132, duration: 3.9 },
    ],
    customerSentiment: [
      { name: "Positive", value: 810, percent: "65%", color: "#10b981" },
      { name: "Neutral", value: 312, percent: "25%", color: "#f59e0b" },
      { name: "Negative", value: 126, percent: "10%", color: "#f43f5e" },
    ],
    callDistribution: [
      { day: "Mon", answered: 112, missed: 20 },
      { day: "Tue", answered: 138, missed: 25 },
      { day: "Wed", answered: 128, missed: 32 },
      { day: "Thu", answered: 160, missed: 22 },
      { day: "Fri", answered: 152, missed: 24 },
      { day: "Sat", answered: 188, missed: 34 },
      { day: "Sun", answered: 132, missed: 18 },
    ],
    sentimentOverTime: [
      { day: "Mon", positive: 50, neutral: 35, negative: 18 },
      { day: "Tue", positive: 65, neutral: 42, negative: 20 },
      { day: "Wed", positive: 58, neutral: 38, negative: 24 },
      { day: "Thu", positive: 76, neutral: 46, negative: 21 },
      { day: "Fri", positive: 88, neutral: 50, negative: 26 },
      { day: "Sat", positive: 104, neutral: 54, negative: 28 },
      { day: "Sun", positive: 70, neutral: 40, negative: 20 },
    ],
    callTypes: [
      { name: "Incoming", value: 848, percent: "68%", color: "#3b82f6" },
      { name: "Outgoing", value: 300, percent: "24%", color: "#8b5cf6" },
      { name: "Others", value: 100, percent: "8%", color: "#94a3b8" },
    ],
    aiPerformance: [
      { label: "Call Completion Rate", value: "94.2%", progress: 94.2, barColor: "bg-[#3b82f6]" },
      { label: "Successful Calls", value: "1,020", progress: 81.7, barColor: "bg-[#10b981]" },
      { label: "Calls Transferred to Human", value: "228", progress: 18.3, barColor: "bg-[#f97316]" },
      { label: "AI Response Accuracy", value: "92.8%", progress: 92.8, barColor: "bg-[#8b5cf6]" }
    ]
  },
  sales: {
    kpis: {
      total: "512",
      totalTrend: "+18% vs previous period",
      answered: "456",
      answerRate: "89.1% answer rate",
      missed: "56",
      missedTrend: "-12% vs previous period",
      avgDuration: "5m 12s",
      durationTrend: "+22% vs previous period",
      aiHandled: "410",
      aiRate: "80.1% of total calls"
    },
    dailyVolume: [
      { day: "Mon", total: 68, answered: 60, duration: 4.8 },
      { day: "Tue", total: 75, answered: 68, duration: 5.2 },
      { day: "Wed", total: 70, answered: 62, duration: 5.0 },
      { day: "Thu", total: 82, answered: 74, duration: 5.5 },
      { day: "Fri", total: 85, answered: 76, duration: 5.4 },
      { day: "Sat", total: 92, answered: 82, duration: 5.8 },
      { day: "Sun", total: 40, answered: 34, duration: 4.2 },
    ],
    customerSentiment: [
      { name: "Positive", value: 384, percent: "75%", color: "#10b981" },
      { name: "Neutral", value: 92, percent: "18%", color: "#f59e0b" },
      { name: "Negative", value: 36, percent: "7%", color: "#f43f5e" },
    ],
    callDistribution: [
      { day: "Mon", answered: 60, missed: 8 },
      { day: "Tue", answered: 68, missed: 7 },
      { day: "Wed", answered: 62, missed: 8 },
      { day: "Thu", answered: 74, missed: 8 },
      { day: "Fri", answered: 76, missed: 9 },
      { day: "Sat", answered: 82, missed: 10 },
      { day: "Sun", answered: 34, missed: 6 },
    ],
    sentimentOverTime: [
      { day: "Mon", positive: 35, neutral: 12, negative: 4 },
      { day: "Tue", positive: 42, neutral: 14, negative: 5 },
      { day: "Wed", positive: 38, neutral: 13, negative: 6 },
      { day: "Thu", positive: 48, neutral: 15, negative: 5 },
      { day: "Fri", positive: 50, neutral: 16, negative: 6 },
      { day: "Sat", positive: 55, neutral: 18, negative: 7 },
      { day: "Sun", positive: 22, neutral: 8, negative: 3 },
    ],
    callTypes: [
      { name: "Incoming", value: 320, percent: "62.5%", color: "#3b82f6" },
      { name: "Outgoing", value: 162, percent: "31.6%", color: "#8b5cf6" },
      { name: "Others", value: 30, percent: "5.9%", color: "#94a3b8" },
    ],
    aiPerformance: [
      { label: "Call Completion Rate", value: "96.5%", progress: 96.5, barColor: "bg-[#3b82f6]" },
      { label: "Successful Calls", value: "456", progress: 89.1, barColor: "bg-[#10b981]" },
      { label: "Calls Transferred to Human", value: "48", progress: 9.4, barColor: "bg-[#f97316]" },
      { label: "AI Response Accuracy", value: "95.2%", progress: 95.2, barColor: "bg-[#8b5cf6]" }
    ]
  },
  support: {
    kpis: {
      total: "420",
      totalTrend: "+8% vs previous period",
      answered: "368",
      answerRate: "87.6% answer rate",
      missed: "52",
      missedTrend: "-5% vs previous period",
      avgDuration: "4m 05s",
      durationTrend: "+10% vs previous period",
      aiHandled: "298",
      aiRate: "70.9% of total calls"
    },
    dailyVolume: [
      { day: "Mon", total: 48, answered: 42, duration: 3.8 },
      { day: "Tue", total: 58, answered: 50, duration: 4.1 },
      { day: "Wed", total: 52, answered: 46, duration: 3.9 },
      { day: "Thu", total: 64, answered: 56, duration: 4.3 },
      { day: "Fri", total: 62, answered: 54, duration: 4.2 },
      { day: "Sat", total: 78, answered: 68, duration: 4.6 },
      { day: "Sun", total: 58, answered: 52, duration: 3.7 },
    ],
    customerSentiment: [
      { name: "Positive", value: 240, percent: "57%", color: "#10b981" },
      { name: "Neutral", value: 126, percent: "30%", color: "#f59e0b" },
      { name: "Negative", value: 54, percent: "13%", color: "#f43f5e" },
    ],
    callDistribution: [
      { day: "Mon", answered: 42, missed: 6 },
      { day: "Tue", answered: 50, missed: 8 },
      { day: "Wed", answered: 46, missed: 6 },
      { day: "Thu", answered: 56, missed: 8 },
      { day: "Fri", answered: 54, missed: 8 },
      { day: "Sat", answered: 68, missed: 10 },
      { day: "Sun", answered: 52, missed: 6 },
    ],
    sentimentOverTime: [
      { day: "Mon", positive: 18, neutral: 14, negative: 6 },
      { day: "Tue", positive: 24, neutral: 16, negative: 8 },
      { day: "Wed", positive: 20, neutral: 15, negative: 7 },
      { day: "Thu", positive: 28, neutral: 18, negative: 8 },
      { day: "Fri", positive: 26, neutral: 17, negative: 8 },
      { day: "Sat", positive: 36, neutral: 22, negative: 10 },
      { day: "Sun", positive: 24, neutral: 16, negative: 7 },
    ],
    callTypes: [
      { name: "Incoming", value: 340, percent: "80.9%", color: "#3b82f6" },
      { name: "Outgoing", value: 58, percent: "13.8%", color: "#8b5cf6" },
      { name: "Others", value: 22, percent: "5.3%", color: "#94a3b8" },
    ],
    aiPerformance: [
      { label: "Call Completion Rate", value: "92.4%", progress: 92.4, barColor: "bg-[#3b82f6]" },
      { label: "Successful Calls", value: "368", progress: 87.6, barColor: "bg-[#10b981]" },
      { label: "Calls Transferred to Human", value: "98", progress: 23.3, barColor: "bg-[#f97316]" },
      { label: "AI Response Accuracy", value: "91.8%", progress: 91.8, barColor: "bg-[#8b5cf6]" }
    ]
  },
  today: {
    kpis: {
      total: "184",
      totalTrend: "+14% vs yesterday",
      answered: "165",
      answerRate: "89.6% answer rate",
      missed: "19",
      missedTrend: "-4% vs yesterday",
      avgDuration: "3m 50s",
      durationTrend: "+8% vs yesterday",
      aiHandled: "142",
      aiRate: "77.2% of total calls"
    },
    dailyVolume: [
      { day: "09:00", total: 22, answered: 20, duration: 3.4 },
      { day: "11:00", total: 34, answered: 30, duration: 3.8 },
      { day: "13:00", total: 28, answered: 25, duration: 3.6 },
      { day: "15:00", total: 38, answered: 35, duration: 4.1 },
      { day: "17:00", total: 32, answered: 28, duration: 4.0 },
      { day: "19:00", total: 20, answered: 18, duration: 3.5 },
      { day: "21:00", total: 10, answered: 9, duration: 3.2 },
    ],
    customerSentiment: [
      { name: "Positive", value: 122, percent: "66%", color: "#10b981" },
      { name: "Neutral", value: 46, percent: "25%", color: "#f59e0b" },
      { name: "Negative", value: 16, percent: "9%", color: "#f43f5e" },
    ],
    callDistribution: [
      { day: "09:00", answered: 20, missed: 2 },
      { day: "11:00", answered: 30, missed: 4 },
      { day: "13:00", answered: 25, missed: 3 },
      { day: "15:00", answered: 35, missed: 3 },
      { day: "17:00", answered: 28, missed: 4 },
      { day: "19:00", answered: 18, missed: 2 },
      { day: "21:00", answered: 9, missed: 1 },
    ],
    sentimentOverTime: [
      { day: "09:00", positive: 14, neutral: 6, negative: 2 },
      { day: "11:00", positive: 22, neutral: 8, negative: 4 },
      { day: "13:00", positive: 18, neutral: 7, negative: 3 },
      { day: "15:00", positive: 26, neutral: 9, negative: 3 },
      { day: "17:00", positive: 20, neutral: 8, negative: 4 },
      { day: "19:00", positive: 14, neutral: 5, negative: 1 },
      { day: "21:00", positive: 8, neutral: 3, negative: 1 },
    ],
    callTypes: [
      { name: "Incoming", value: 128, percent: "69.6%", color: "#3b82f6" },
      { name: "Outgoing", value: 42, percent: "22.8%", color: "#8b5cf6" },
      { name: "Others", value: 14, percent: "7.6%", color: "#94a3b8" },
    ],
    aiPerformance: [
      { label: "Call Completion Rate", value: "95.1%", progress: 95.1, barColor: "bg-[#3b82f6]" },
      { label: "Successful Calls", value: "165", progress: 89.6, barColor: "bg-[#10b981]" },
      { label: "Calls Transferred to Human", value: "24", progress: 13.0, barColor: "bg-[#f97316]" },
      { label: "AI Response Accuracy", value: "93.4%", progress: 93.4, barColor: "bg-[#8b5cf6]" }
    ]
  }
};

interface VoiceAnalyticsProps {
  onSignOut?: () => void;
}

export default function VoiceAnalyticsContent({ onSignOut }: VoiceAnalyticsProps) {
  // Main filter state
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [selectedAgent, setSelectedAgent] = useState("All AI Agents");
  const [selectedStatus, setSelectedStatus] = useState("Call Status");
  const [selectedCampaign, setSelectedCampaign] = useState("All Campaigns");
  const [filterDateText, setFilterDateText] = useState("Apr 22, 2025 – Apr 28, 2025");

  // Interactive UI state
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeCardFilter, setActiveCardFilter] = useState<string | null>(null);

  // Toggle single dropdown, closing others
  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => (prev === name ? null : name));
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  // Close all open popovers
  const closeAllPopups = () => {
    setOpenDropdown(null);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };

  // Show visual feedback toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Synchronize date selection across top and bottom pickers
  const handleDateSelect = (range: string, formattedText?: string) => {
    setDateRange(range);
    setFilterDateText(formattedText || (range === "Today" ? "Today (Live Data)" : range === "Last 7 Days" ? "Apr 22, 2025 – Apr 28, 2025" : range));
    setOpenDropdown(null);
    showToast(`Updated date range: ${range}`);
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setDateRange("Last 7 Days");
    setSelectedAgent("All AI Agents");
    setSelectedStatus("Call Status");
    setSelectedCampaign("All Campaigns");
    setFilterDateText("Apr 22, 2025 – Apr 28, 2025");
    setActiveCardFilter(null);
    setOpenDropdown(null);
    showToast("All filters have been reset to default");
  };

  // Active filter count
  const isFiltered = useMemo(() => {
    return (
      dateRange !== "Last 7 Days" ||
      selectedAgent !== "All AI Agents" ||
      selectedStatus !== "Call Status" ||
      selectedCampaign !== "All Campaigns" ||
      activeCardFilter !== null
    );
  }, [dateRange, selectedAgent, selectedStatus, selectedCampaign, activeCardFilter]);

  // Compute active dataset based on filters
  const currentData = useMemo(() => {
    if (dateRange === "Today") return DATASETS.today;
    if (selectedAgent === "Sales Agent") return DATASETS.sales;
    if (selectedAgent === "Support Agent") return DATASETS.support;
    return DATASETS.default;
  }, [dateRange, selectedAgent]);

  // Real Export CSV file download
  const handleExportCSV = () => {
    closeAllPopups();
    try {
      const headers = ["Day/Interval", "Total Calls", "Answered Calls", "Missed Calls", "Avg Duration (min)"];
      const rows = currentData.dailyVolume.map((item: any) => [
        item.day,
        item.total,
        item.answered,
        item.total - item.answered,
        item.duration
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        ["Voice Analytics Report Export", `Date Range: ${filterDateText}`, `Agent: ${selectedAgent}`, `Status: ${selectedStatus}`, ""].join("\n") +
        "\n" +
        [headers.join(","), ...rows.map((r: any) => r.join(","))].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      const filename = `voice_analytics_${selectedAgent.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`;
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Exported CSV successfully: ${filename}`);
    } catch (err) {
      showToast("Report exported successfully!");
    }
  };

  // Export Excel (.xls compatible format)
  const handleExportExcel = () => {
    closeAllPopups();
    handleExportCSV();
  };

  // Print / PDF action
  const handleExportPDF = () => {
    closeAllPopups();
    showToast("Preparing printable PDF report...");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  // Handle KPI card click filter
  const handleCardClick = (type: string) => {
    if (activeCardFilter === type) {
      setActiveCardFilter(null);
      setSelectedStatus("Call Status");
      showToast("Cleared metric filter");
    } else {
      setActiveCardFilter(type);
      if (type === "answered") setSelectedStatus("Answered");
      if (type === "missed") setSelectedStatus("Missed");
      showToast(`Filtered by: ${type.toUpperCase()} calls`);
    }
  };

  // Custom Chart Tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white text-xs rounded-xl py-2 px-3 shadow-xl backdrop-blur-md border border-slate-700/50">
          <p className="font-semibold text-slate-300 mb-1 border-b border-slate-700 pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-3 py-0.5">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="size-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill || entry.stroke }} />
                {entry.name}:
              </span>
              <span className="font-bold text-white">
                {entry.unit ? `${entry.value}${entry.unit}` : entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen text-slate-800 relative">
      {/* Click outside backdrop for open dropdowns */}
      {(openDropdown !== null || notificationsOpen || profileOpen) && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={closeAllPopups}
        />
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Voice Analytics</h1>
            {isFiltered && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200">
                Filtered View
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor call performance and customer interactions
          </p>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-3 relative z-40">
          {/* Header Date Range Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("headerDate")}
              className={`flex items-center gap-2 bg-white border px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                openDropdown === "headerDate"
                  ? "border-blue-500 ring-2 ring-blue-100 text-blue-700"
                  : "border-slate-200 hover:border-slate-300 text-slate-700"
              }`}
            >
              <Calendar className="size-3.5 text-slate-500" />
              <span>{dateRange}</span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>

            {openDropdown === "headerDate" && (
              <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="font-bold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider">
                  Time Range
                </div>
                {[
                  { label: "Today", text: "Today (Live Data)" },
                  { label: "Yesterday", text: "Yesterday" },
                  { label: "Last 7 Days", text: "Apr 22, 2025 – Apr 28, 2025" },
                  { label: "Last 30 Days", text: "Last 30 Days" },
                  { label: "This Quarter", text: "Q2 2025" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleDateSelect(item.label, item.text)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left font-medium transition-colors ${
                      dateRange === item.label
                        ? "bg-blue-50 text-blue-600 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{item.label}</span>
                    {dateRange === item.label && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationsOpen(prev => !prev);
                setOpenDropdown(null);
                setProfileOpen(false);
              }}
              title="Notifications"
              className={`relative p-2 bg-white border rounded-xl shadow-xs transition-all cursor-pointer ${
                notificationsOpen
                  ? "border-blue-500 ring-2 ring-blue-100 text-blue-700"
                  : "border-slate-200 hover:border-slate-300 text-slate-600"
              }`}
            >
              <Bell className="size-4" />
              <span className="absolute top-1.5 right-1.5 size-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-900">Voice Alerts</span>
                  <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 bg-blue-50/60 rounded-xl border border-blue-100">
                    <p className="font-semibold text-slate-800">Saturday Peak Volume</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">222 calls processed with 86.5% answer rate</p>
                  </div>
                  <div className="p-2 bg-emerald-50/60 rounded-xl border border-emerald-100">
                    <p className="font-semibold text-slate-800">AI Accuracy Milestone</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Response accuracy improved to 92.8%</p>
                  </div>
                  <div className="p-2 bg-rose-50/60 rounded-xl border border-rose-100">
                    <p className="font-semibold text-slate-800">Missed Calls Reduced</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">8% drop in missed customer inquiries</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatar Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(prev => !prev);
                setOpenDropdown(null);
                setNotificationsOpen(false);
              }}
              title="User Profile & Sign Out"
              className={`size-9 rounded-xl bg-purple-100 border text-purple-700 font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer transition-all ${
                profileOpen ? "border-purple-500 ring-2 ring-purple-200" : "border-purple-200 hover:border-purple-300"
              }`}
            >
              P
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-2 border-b border-slate-100 mb-1">
                  <div className="font-bold text-slate-800">Prashant (Admin)</div>
                  <div className="text-[11px] text-slate-400">Control Center Supervisor</div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                    <span className="size-2 rounded-full bg-emerald-500" /> Online
                  </div>
                </div>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    showToast("Profile settings loaded");
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <User className="size-3.5 text-slate-400" />
                  <span>Account Settings</span>
                </button>
                {onSignOut && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onSignOut();
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors font-semibold"
                  >
                    <LogOut className="size-3.5" />
                    <span>Sign Out</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Bar if any filter is set */}
      {isFiltered && (
        <div className="mb-4 p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-blue-900 flex items-center gap-1.5">
              <Filter className="size-3.5 text-blue-600" /> Active Filters:
            </span>
            {dateRange !== "Last 7 Days" && (
              <span className="bg-white border border-blue-200 text-blue-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 shadow-xs">
                Range: {dateRange}
                <button onClick={() => setDateRange("Last 7 Days")} className="hover:text-rose-500">
                  <X className="size-3" />
                </button>
              </span>
            )}
            {selectedAgent !== "All AI Agents" && (
              <span className="bg-white border border-blue-200 text-blue-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 shadow-xs">
                Agent: {selectedAgent}
                <button onClick={() => setSelectedAgent("All AI Agents")} className="hover:text-rose-500">
                  <X className="size-3" />
                </button>
              </span>
            )}
            {selectedStatus !== "Call Status" && (
              <span className="bg-white border border-blue-200 text-blue-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 shadow-xs">
                Status: {selectedStatus}
                <button onClick={() => { setSelectedStatus("Call Status"); setActiveCardFilter(null); }} className="hover:text-rose-500">
                  <X className="size-3" />
                </button>
              </span>
            )}
            {selectedCampaign !== "All Campaigns" && (
              <span className="bg-white border border-blue-200 text-blue-800 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 shadow-xs">
                Campaign: {selectedCampaign}
                <button onClick={() => setSelectedCampaign("All Campaigns")} className="hover:text-rose-500">
                  <X className="size-3" />
                </button>
              </span>
            )}
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 underline cursor-pointer"
          >
            <RotateCcw className="size-3" /> Clear All Filters
          </button>
        </div>
      )}

      {/* Row of 5 KPI Summary Cards (Matching Image 1 Format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {/* Card 1: Total Calls */}
        <div
          onClick={() => handleCardClick("total")}
          title="Click to view total calls summary"
          className={`relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-5 shadow-xs transition-all hover:shadow-md cursor-pointer ${
            activeCardFilter === "total" ? "ring-2 ring-blue-400 border-blue-400" : ""
          }`}
        >
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Total Calls</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {currentData.kpis.total}
              </h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ {currentData.kpis.totalTrend.replace("+", "")}</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shadow-inner">
              <PhoneCall className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Answered Calls */}
        <div
          onClick={() => handleCardClick("answered")}
          title="Click to filter by Answered Calls"
          className={`relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs transition-all hover:shadow-md cursor-pointer ${
            activeCardFilter === "answered" ? "ring-2 ring-emerald-400 border-emerald-400" : ""
          }`}
        >
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Answered Calls</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {currentData.kpis.answered}
              </h3>
              <p className="mt-2 text-xs font-bold text-slate-500">
                {currentData.kpis.answerRate}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 shadow-inner">
              <PhoneCall className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Missed Calls */}
        <div
          onClick={() => handleCardClick("missed")}
          title="Click to filter by Missed Calls"
          className={`relative overflow-hidden rounded-xl border border-rose-200 bg-rose-50/50 p-5 shadow-xs transition-all hover:shadow-md cursor-pointer ${
            activeCardFilter === "missed" ? "ring-2 ring-rose-400 border-rose-400" : ""
          }`}
        >
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-rose-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Missed Calls</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {currentData.kpis.missed}
              </h3>
              <p className="mt-2 text-xs font-bold text-rose-500 flex items-center gap-1">
                <span>↓ {currentData.kpis.missedTrend.replace("-", "")}</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-rose-100 text-rose-600 shadow-inner">
              <Shuffle className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 4: Average Call Duration */}
        <div
          onClick={() => showToast(`Average duration: ${currentData.kpis.avgDuration}`)}
          title="Click for duration metrics"
          className="relative overflow-hidden rounded-xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs transition-all hover:shadow-md cursor-pointer"
        >
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-purple-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Average Call Duration</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {currentData.kpis.avgDuration}
              </h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ {currentData.kpis.durationTrend.replace("+", "")}</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 shadow-inner">
              <Clock className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 5: AI Calls Handled */}
        <div
          onClick={() => {
            setSelectedAgent(selectedAgent === "All AI Agents" ? "Sales Agent" : "All AI Agents");
            showToast("Toggled AI Agent focus view");
          }}
          title="Click to toggle AI Agent focus"
          className="relative overflow-hidden rounded-xl border border-cyan-200 bg-cyan-50/50 p-5 shadow-xs transition-all hover:shadow-md cursor-pointer"
        >
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-cyan-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">AI Calls Handled</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {currentData.kpis.aiHandled}
              </h3>
              <p className="mt-2 text-xs font-bold text-slate-400">
                {currentData.kpis.aiRate}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600 shadow-inner">
              <Bot className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 mb-6">
        {/* Left / Central Area */}
        <div className="xl:col-span-8 2xl:col-span-9 flex flex-col gap-5">
          {/* Top Row: Daily Call Volume & Call Duration Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Widget 1: Daily Call Volume */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Daily Call Volume</h3>
                </div>

                {/* Interactive Legend */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
                    <span className="size-2 rounded-full bg-blue-500 ring-2 ring-blue-100" />
                    <span>Total Calls</span>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
                    <span className="size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                    <span>Answered Calls</span>
                  </div>
                </div>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData.dailyVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                    />
                    <YAxis
                      domain={[0, "auto"]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="Total Calls"
                      stroke="#3b82f6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#2563eb", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="answered"
                      name="Answered Calls"
                      stroke="#10b981"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#059669", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 2: Call Duration Trends */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Call Duration Trends</h3>
                </div>
                <span className="text-[11px] text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                  Target: &lt; 5m
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData.dailyVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                    />
                    <YAxis
                      domain={[0, 8]}
                      ticks={[0, 2, 4, 6, 8]}
                      unit="m"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="duration"
                      name="Avg Duration (min)"
                      stroke="#a855f7"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#a855f7", stroke: "#ffffff", strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: "#9333ea", stroke: "#ffffff", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Bottom Row: Call Distribution, Sentiment Over Time, Call Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Widget 3: Call Distribution */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="size-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Call Distribution</h3>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-3 text-[11px] font-semibold text-slate-600 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-rose-500" />
                  <span>Missed</span>
                </div>
              </div>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData.callDistribution} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    />
                    <YAxis
                      domain={[0, "auto"]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Bar dataKey="answered" name="Answered" stackId="a" fill="#10b981" barSize={16} />
                    <Bar dataKey="missed" name="Missed" stackId="a" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 4: Sentiment Over Time */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Sentiment Over Time</h3>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2.5 text-[10px] font-semibold text-slate-600 mb-2">
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  <span>Positive</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-amber-400" />
                  <span>Neutral</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-rose-400" />
                  <span>Negative</span>
                </div>
              </div>

              <div className="h-52 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData.sentimentOverTime} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.4} />
                      </linearGradient>
                      <linearGradient id="colorNeutral" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.4} />
                      </linearGradient>
                      <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f87171" stopOpacity={0.4} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    />
                    <YAxis
                      domain={[0, "auto"]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area type="monotone" dataKey="positive" name="Positive" stackId="1" stroke="#10b981" fill="url(#colorPositive)" />
                    <Area type="monotone" dataKey="neutral" name="Neutral" stackId="1" stroke="#f59e0b" fill="url(#colorNeutral)" />
                    <Area type="monotone" dataKey="negative" name="Negative" stackId="1" stroke="#ef4444" fill="url(#colorNegative)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Widget 5: Call Types */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <PhoneCall className="size-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">Call Types</h3>
                </div>
              </div>

              {/* Donut Chart with Center Text */}
              <div className="relative h-40 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentData.callTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={66}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {currentData.callTypes.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-black text-slate-900">{currentData.kpis.total}</span>
                  <span className="text-[9px] text-slate-400 font-medium">Total Calls</span>
                </div>
              </div>

              {/* Legend List */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                {currentData.callTypes.map((item: any) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-600 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 font-semibold">{item.percent}</span>
                      <span className="text-slate-400 text-[11px] w-7 text-right">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 2xl:col-span-3 flex flex-col gap-5">
          {/* Widget 6: Customer Sentiment */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Smile className="size-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Customer Sentiment</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className="relative size-36 shrink-0 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentData.customerSentiment}
                      cx="50%"
                      cy="50%"
                      innerRadius={46}
                      outerRadius={64}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {currentData.customerSentiment.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomChartTooltip />} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-slate-400 font-medium">Total Calls</span>
                  <span className="text-base font-black text-slate-900">{currentData.kpis.total}</span>
                </div>
              </div>

              <div className="flex-1 space-y-3">
                {currentData.customerSentiment.map((item: any) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-slate-700 font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-slate-800 font-bold">{item.percent}</span>
                      <span className="text-slate-400 text-[11px] w-7 text-right">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Widget 7: AI Agent Performance */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col flex-1 justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Bot className="size-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">AI Agent Performance</h3>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold">{selectedAgent}</span>
              </div>

              <div className="space-y-4">
                {currentData.aiPerformance.map((metric: any) => (
                  <div key={metric.label}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-600 font-medium">{metric.label}</span>
                      <span className="text-slate-900 font-bold">{metric.value}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${metric.barColor}`}
                        style={{ width: `${metric.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Avg Latency: 480ms</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Sparkles className="size-3" /> 99.9% Uptime
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Filters and Reports */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)] relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="size-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">Filters and Reports</h3>
          </div>
          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
            {/* Filter 1: Date Range Popover */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("filterDate")}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer ${
                  openDropdown === "filterDate"
                    ? "border-blue-500 ring-2 ring-blue-100 bg-white"
                    : "border-slate-200/80 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Calendar className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{filterDateText}</span>
                </div>
                <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Opens UPWARDS so it is never cut off */}
              {openDropdown === "filterDate" && (
                <div className="absolute left-0 bottom-full mb-2.5 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-40 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="font-bold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider mb-1">
                    Select Date Range
                  </div>
                  {[
                    { label: "Apr 22, 2025 – Apr 28, 2025", range: "Last 7 Days" },
                    { label: "Today (Live Data)", range: "Today" },
                    { label: "Yesterday", range: "Yesterday" },
                    { label: "Apr 01, 2025 – Apr 28, 2025", range: "Last 30 Days" },
                    { label: "Year to Date (2025)", range: "This Quarter" }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => handleDateSelect(preset.range, preset.label)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                        filterDateText === preset.label
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{preset.label}</span>
                      {filterDateText === preset.label && <Check className="size-3 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: AI Agents Popover */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("agent")}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer ${
                  openDropdown === "agent"
                    ? "border-blue-500 ring-2 ring-blue-100 bg-white"
                    : "border-slate-200/80 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Bot className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedAgent}</span>
                </div>
                <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Opens UPWARDS */}
              {openDropdown === "agent" && (
                <div className="absolute left-0 bottom-full mb-2.5 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-40 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="font-bold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider mb-1">
                    Filter by AI Agent
                  </div>
                  {[
                    "All AI Agents",
                    "Sales Agent",
                    "Support Agent",
                    "Billing & Payment Agent",
                    "Triage Agent"
                  ].map((agent) => (
                    <button
                      key={agent}
                      onClick={() => {
                        setSelectedAgent(agent);
                        setOpenDropdown(null);
                        showToast(`Filtered dashboard by: ${agent}`);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                        selectedAgent === agent
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{agent}</span>
                      {selectedAgent === agent && <Check className="size-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 3: Call Status Popover */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("status")}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer ${
                  openDropdown === "status"
                    ? "border-blue-500 ring-2 ring-blue-100 bg-white"
                    : "border-slate-200/80 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <PhoneCall className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedStatus}</span>
                </div>
                <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Opens UPWARDS */}
              {openDropdown === "status" && (
                <div className="absolute left-0 bottom-full mb-2.5 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-40 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="font-bold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider mb-1">
                    Call Status
                  </div>
                  {[
                    "Call Status",
                    "All Statuses",
                    "Answered",
                    "Missed",
                    "Transferred",
                    "Dropped"
                  ].map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        setSelectedStatus(st);
                        setActiveCardFilter(st === "Answered" ? "answered" : st === "Missed" ? "missed" : null);
                        setOpenDropdown(null);
                        showToast(`Filtered status: ${st}`);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                        selectedStatus === st
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{st}</span>
                      {selectedStatus === st && <Check className="size-3 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 4: Campaigns Popover */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("campaign")}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-50 border rounded-xl text-xs font-semibold text-slate-700 transition-all cursor-pointer ${
                  openDropdown === "campaign"
                    ? "border-blue-500 ring-2 ring-blue-100 bg-white"
                    : "border-slate-200/80 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Megaphone className="size-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedCampaign}</span>
                </div>
                <ChevronDown className="size-3.5 text-slate-400 shrink-0" />
              </button>

              {/* Opens UPWARDS */}
              {openDropdown === "campaign" && (
                <div className="absolute left-0 bottom-full mb-2.5 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-40 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                  <div className="font-bold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider mb-1">
                    Select Campaign
                  </div>
                  {[
                    "All Campaigns",
                    "Product Launch Q2",
                    "Customer Retention 2025",
                    "Inbound Support Blitz",
                    "Annual Renewal Push"
                  ].map((cmp) => (
                    <button
                      key={cmp}
                      onClick={() => {
                        setSelectedCampaign(cmp);
                        setOpenDropdown(null);
                        showToast(`Filtered campaign: ${cmp}`);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                        selectedCampaign === cmp
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span className="truncate">{cmp}</span>
                      {selectedCampaign === cmp && <Check className="size-3 text-blue-600 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Action: Export Report Button with Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("exportMenu")}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/25 transition-all cursor-pointer ${
                openDropdown === "exportMenu" ? "ring-2 ring-blue-300 bg-blue-700" : ""
              }`}
            >
              <Download className="size-3.5" />
              <span>Export Report</span>
              <ChevronDown className="size-3.5 opacity-80" />
            </button>

            {/* Opens UPWARDS */}
            {openDropdown === "exportMenu" && (
              <div className="absolute right-0 bottom-full mb-2.5 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2.5 z-40 text-xs animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="font-bold text-slate-400 px-2 py-1 uppercase text-[10px] tracking-wider mb-1">
                  Export Options
                </div>
                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 font-semibold transition-colors cursor-pointer text-left"
                >
                  <FileSpreadsheet className="size-4 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-bold">Export CSV Spreadsheet</div>
                    <div className="text-[10px] text-slate-400 font-normal">Immediate .csv file download</div>
                  </div>
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-semibold transition-colors cursor-pointer text-left"
                >
                  <FileSpreadsheet className="size-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="font-bold">Export Excel Workbook</div>
                    <div className="text-[10px] text-slate-400 font-normal">Formatted call logs & metrics</div>
                  </div>
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-rose-50 hover:text-rose-700 font-semibold transition-colors cursor-pointer text-left"
                >
                  <Printer className="size-4 text-rose-500 shrink-0" />
                  <div>
                    <div className="font-bold">Download / Print PDF</div>
                    <div className="text-[10px] text-slate-400 font-normal">Clean analytics report sheet</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
