import { useState, useMemo } from "react";
import {
  CreditCard, CheckCircle2, Activity, Clock, Plus, Search, ChevronDown,
  X, RefreshCw, Check, Edit, Users, Calendar, AlertCircle
} from "lucide-react";

export interface PassItem {
  customer: string;
  plan: "Enterprise" | "Pro" | "Basic" | "Custom";
  limit: string;
  used: number;
  remaining: string;
  expiry: string;
  expiryCategory?: "This Month" | "Next Month" | "Expired";
  status: "Active" | "Expiring Soon" | "Expired";
  statusColor: string;
  payment: "Paid" | "Pending" | "Overdue";
  paymentColor: string;
}

const initialPasses: PassItem[] = [
  { customer: "TechCorp India", plan: "Enterprise", limit: "10,000", used: 8500, remaining: "1,500", expiry: "Nov 15, 2026", expiryCategory: "Next Month", status: "Active", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", payment: "Paid", paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { customer: "Sneha Patil", plan: "Pro", limit: "2,000", used: 1900, remaining: "100", expiry: "Oct 12, 2026", expiryCategory: "This Month", status: "Expiring Soon", statusColor: "text-amber-700 bg-amber-50 border-amber-200", payment: "Paid", paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { customer: "Amit Desai", plan: "Basic", limit: "500", used: 500, remaining: "0", expiry: "Oct 5, 2026", expiryCategory: "Expired", status: "Expired", statusColor: "text-rose-700 bg-rose-50 border-rose-200", payment: "Pending", paymentColor: "text-amber-700 bg-amber-50 border-amber-200" },
  { customer: "Global Logistics Ltd", plan: "Enterprise", limit: "15,000", used: 6200, remaining: "8,800", expiry: "Dec 30, 2026", expiryCategory: "Next Month", status: "Active", statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200", payment: "Paid", paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { customer: "FinServe Capital", plan: "Pro", limit: "5,000", used: 4800, remaining: "200", expiry: "Oct 18, 2026", expiryCategory: "This Month", status: "Expiring Soon", statusColor: "text-amber-700 bg-amber-50 border-amber-200", payment: "Paid", paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { customer: "Kiran Real Estate", plan: "Basic", limit: "1,000", used: 950, remaining: "50", expiry: "Oct 01, 2026", expiryCategory: "Expired", status: "Expired", statusColor: "text-rose-700 bg-rose-50 border-rose-200", payment: "Overdue", paymentColor: "text-rose-700 bg-rose-50 border-rose-200" },
];

export default function CallPassesContent() {
  const [passes, setPasses] = useState<PassItem[]>(initialPasses);
  const [selectedPass, setSelectedPass] = useState<PassItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [expiryFilter, setExpiryFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // New Plan form state
  const [newCustomer, setNewCustomer] = useState("");
  const [newPlan, setNewPlan] = useState<PassItem["plan"]>("Pro");
  const [newLimit, setNewLimit] = useState("2,000");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  // Filtered passes
  const filteredPasses = useMemo(() => {
    return passes.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.customer.toLowerCase().includes(q) ||
        item.plan.toLowerCase().includes(q)
      );

      const matchesPlan = planFilter === "All" || item.plan === planFilter;
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesExpiry = expiryFilter === "All" || item.expiryCategory === expiryFilter;
      const matchesPayment = paymentFilter === "All" || item.payment === paymentFilter;

      return matchesSearch && matchesPlan && matchesStatus && matchesExpiry && matchesPayment;
    });
  }, [passes, searchQuery, planFilter, statusFilter, expiryFilter, paymentFilter]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setPlanFilter("All");
    setStatusFilter("All");
    setExpiryFilter("All");
    setPaymentFilter("All");
    setOpenDropdown(null);
    showToast("Filters reset to default.");
  };

  const hasActiveFilters = searchQuery !== "" || planFilter !== "All" || statusFilter !== "All" || expiryFilter !== "All" || paymentFilter !== "All";

  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.trim()) return;

    const newPassItem: PassItem = {
      customer: newCustomer.trim(),
      plan: newPlan,
      limit: newLimit,
      used: 0,
      remaining: newLimit,
      expiry: "Nov 30, 2026",
      expiryCategory: "Next Month",
      status: "Active",
      statusColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      payment: "Paid",
      paymentColor: "text-emerald-700 bg-emerald-50 border-emerald-200"
    };

    setPasses([newPassItem, ...passes]);
    setSelectedPass(newPassItem);
    setIsCreating(false);
    setNewCustomer("");
    showToast(`Subscription plan created for ${newPassItem.customer}!`);
  };

  const passKpis = [
    { label: "Total Plans", value: passes.length.toString(), color: "bg-blue-50/50", borderColor: "border-blue-200", wave: "bg-blue-200/50", iconBg: "bg-blue-100 text-blue-600", icon: CreditCard },
    { label: "Active Subscriptions", value: passes.filter(p => p.status === "Active").length.toString(), color: "bg-emerald-50/50", borderColor: "border-emerald-200", wave: "bg-emerald-200/50", iconBg: "bg-emerald-100 text-emerald-600", icon: CheckCircle2 },
    { label: "Expiring Soon", value: passes.filter(p => p.status === "Expiring Soon").length.toString(), color: "bg-amber-50/50", borderColor: "border-amber-200", wave: "bg-amber-200/50", iconBg: "bg-amber-100 text-amber-600", icon: Activity },
    { label: "Pending Payments", value: passes.filter(p => p.payment === "Pending" || p.payment === "Overdue").length.toString(), color: "bg-rose-50/50", borderColor: "border-rose-200", wave: "bg-rose-200/50", iconBg: "bg-rose-100 text-rose-600", icon: Clock },
  ];

  return (
    <div className="p-8 relative h-full">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="size-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-semibold">{toast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Call Passes</h1>
          <p className="text-sm text-slate-500 mt-1">Manage calling subscriptions, plans, and minute usage.</p>
        </div>
        <button 
          onClick={() => { setSelectedPass(null); setIsCreating(true); }} 
          className="bg-[#1d4ed8] text-white px-4 py-2 rounded-lg font-bold shadow-sm hover:bg-[#1e40af] flex items-center gap-2 text-sm transition-colors cursor-pointer"
        >
          <Plus className="size-4" /> Create Plan
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {passKpis.map((kpi) => (
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

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer, business or plan..." 
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500 font-medium transition-all"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3 relative">
          {/* Plan Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("plan")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                planFilter !== "All" ? "border-blue-500 bg-blue-50 text-blue-700 font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{planFilter === "All" ? "Plan" : `Plan: ${planFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "plan" && (
              <div className="absolute top-full left-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                {["All", "Enterprise", "Pro", "Basic"].map((p) => (
                  <button key={p} onClick={() => { setPlanFilter(p); setOpenDropdown(null); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between font-medium">
                    <span>{p === "All" ? "All Plans" : p}</span>
                    {planFilter === p && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("status")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                statusFilter !== "All" ? "border-blue-500 bg-blue-50 text-blue-700 font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{statusFilter === "All" ? "Status" : `Status: ${statusFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "status" && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                {["All", "Active", "Expiring Soon", "Expired"].map((s) => (
                  <button key={s} onClick={() => { setStatusFilter(s); setOpenDropdown(null); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between font-medium">
                    <span>{s === "All" ? "All Statuses" : s}</span>
                    {statusFilter === s && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Expiry Date Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("expiry")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                expiryFilter !== "All" ? "border-blue-500 bg-blue-50 text-blue-700 font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{expiryFilter === "All" ? "Expiry Date" : `Expiry: ${expiryFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "expiry" && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                {["All", "This Month", "Next Month", "Expired"].map((e) => (
                  <button key={e} onClick={() => { setExpiryFilter(e); setOpenDropdown(null); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between font-medium">
                    <span>{e === "All" ? "All Dates" : e}</span>
                    {expiryFilter === e && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Payment Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("payment")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                paymentFilter !== "All" ? "border-blue-500 bg-blue-50 text-blue-700 font-bold" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span>{paymentFilter === "All" ? "Payment" : `Payment: ${paymentFilter}`}</span>
              <ChevronDown className="size-3 text-slate-400" />
            </button>
            {openDropdown === "payment" && (
              <div className="absolute top-full left-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-xl z-30 py-1.5 text-xs animate-in fade-in zoom-in-95">
                {["All", "Paid", "Pending", "Overdue"].map((p) => (
                  <button key={p} onClick={() => { setPaymentFilter(p); setOpenDropdown(null); }} className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between font-medium">
                    <span>{p === "All" ? "All Payments" : p}</span>
                    {paymentFilter === p && <Check className="size-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {hasActiveFilters && (
            <button onClick={handleClearFilters} className="ml-auto text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50">
              <RefreshCw className="size-3" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="py-4 px-5">Customer/Business</th>
                <th className="py-4 px-5">Plan Name</th>
                <th className="py-4 px-5">Usage</th>
                <th className="py-4 px-5">Expiry Date</th>
                <th className="py-4 px-5">Payment Status</th>
                <th className="py-4 px-5">Subscription Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPasses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <CreditCard className="size-10 mx-auto text-slate-300 mb-2" />
                    <div className="font-bold text-slate-700 text-sm">No plans match the selected criteria</div>
                    <button onClick={handleClearFilters} className="mt-3 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 cursor-pointer">
                      Reset Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredPasses.map((pass, index) => {
                  const limitNum = parseInt(pass.limit.replace(/,/g, '')) || 1000;
                  const usagePercent = Math.min(100, (pass.used / limitNum) * 100);
                  
                  return (
                    <tr 
                      key={index} 
                      onClick={() => setSelectedPass(pass)}
                      className={`hover:bg-blue-50/40 cursor-pointer transition-colors ${selectedPass?.customer === pass.customer ? "bg-blue-50/60" : ""}`}
                    >
                      <td className="py-3 px-5 font-bold text-[13px] text-slate-800">{pass.customer}</td>
                      <td className="py-3 px-5 text-[12px] font-semibold text-slate-600">{pass.plan}</td>
                      <td className="py-3 px-5 w-48">
                        <div className="flex flex-col gap-1 w-full">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>{pass.used.toLocaleString()} used</span>
                            <span>{pass.remaining} rem</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${usagePercent > 90 ? 'bg-rose-500' : usagePercent > 75 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${usagePercent}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-[12px] font-medium text-slate-500">{pass.expiry}</td>
                      <td className="py-3 px-5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${pass.paymentColor}`}>
                          {pass.payment}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${pass.statusColor}`}>
                          {pass.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedPass(pass)} className="text-[11px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded inline-flex items-center transition-colors cursor-pointer">
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer Overlay */}
      {(selectedPass || isCreating) && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity" onClick={() => { setSelectedPass(null); setIsCreating(false); }} />
      )}

      {/* Right Drawer */}
      <div className={`fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-slate-200 flex flex-col ${(selectedPass || isCreating) ? "translate-x-0" : "translate-x-full"}`}>
        {(selectedPass || isCreating) && (
          <>
            <div className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">{isCreating ? "Create New Plan" : "Plan Details"}</h2>
              <button onClick={() => { setSelectedPass(null); setIsCreating(false); }} className="p-2 rounded hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isCreating ? (
                <form id="createPlanForm" onSubmit={handleSavePlan} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Customer / Business Name *</label>
                    <input 
                      type="text" 
                      required
                      value={newCustomer}
                      onChange={(e) => setNewCustomer(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-medium" 
                      placeholder="e.g. Apex Corp" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Plan Tier</label>
                    <select 
                      value={newPlan}
                      onChange={(e) => setNewPlan(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white font-medium"
                    >
                      <option>Enterprise</option>
                      <option>Pro</option>
                      <option>Basic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Minutes Limit</label>
                    <input 
                      type="text" 
                      value={newLimit}
                      onChange={(e) => setNewLimit(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-medium" 
                      placeholder="e.g. 5,000" 
                    />
                  </div>
                </form>
              ) : selectedPass && (
                <>
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Subscription Overview</h3>
                    <div className="text-xl font-bold text-slate-900">{selectedPass.customer}</div>
                    <div className="text-sm font-semibold text-blue-600 mt-0.5">{selectedPass.plan} Plan</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                      <div className="text-[10px] font-semibold text-slate-500 mb-1">Payment & Status</div>
                      <div className="flex gap-2">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${selectedPass.paymentColor}`}>{selectedPass.payment}</span>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold border ${selectedPass.statusColor}`}>{selectedPass.status}</span>
                      </div>
                    </div>
                    <div className="border border-slate-100 bg-slate-50 rounded-lg p-3">
                      <div className="text-[10px] font-semibold text-slate-500 mb-1">Expiry Date</div>
                      <div className="text-sm font-bold text-slate-800">{selectedPass.expiry}</div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Usage Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <div className="text-2xl font-black text-slate-800">{selectedPass.used.toLocaleString()}</div>
                          <div className="text-xs font-bold text-slate-500">Minutes Used</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-slate-700">{selectedPass.remaining}</div>
                          <div className="text-xs font-bold text-slate-500">Minutes Remaining</div>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (selectedPass.used / (parseInt(selectedPass.limit.replace(/,/g, '')) || 1)) * 100)}%` }} />
                      </div>
                      <div className="text-xs font-semibold text-slate-500 text-center">
                        Total limit: {selectedPass.limit} minutes / month
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-5 border-t border-slate-200 bg-white flex gap-3">
              {isCreating ? (
                <>
                  <button type="button" onClick={() => setIsCreating(false)} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-bold shadow-xs hover:bg-slate-50 cursor-pointer">Cancel</button>
                  <button type="submit" form="createPlanForm" className="flex-1 bg-[#1d4ed8] text-white py-2.5 rounded-lg text-sm font-bold shadow-xs hover:bg-[#1e40af] cursor-pointer">Save Plan</button>
                </>
              ) : (
                <button onClick={() => setSelectedPass(null)} className="flex-1 border border-slate-200 bg-white text-slate-700 py-2.5 rounded-lg text-sm font-bold shadow-xs hover:bg-slate-50 cursor-pointer">
                  Close
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
