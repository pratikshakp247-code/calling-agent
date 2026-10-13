import { useState, useMemo } from "react";
import {
  Shield,
  User,
  Users,
  Lock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowRight,
  Clock,
  KeyRound,
  Trash2,
  Edit,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Mail,
  UserCheck
} from "lucide-react";

interface UserItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarColor: string;
  role: "Admin" | "Supervisor" | "Agent" | "Viewer";
  status: "Active" | "Inactive";
  lastLogin: string;
}

interface RoleItem {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const INITIAL_USERS: UserItem[] = [
  {
    id: "usr-1",
    name: "Pratiksha Patil",
    email: "pratiksha@gmail.com",
    avatar: "PP",
    avatarColor: "bg-blue-500",
    role: "Admin",
    status: "Active",
    lastLogin: "Apr 22, 2025 11:24 AM"
  },
  {
    id: "usr-2",
    name: "Neha Sharma",
    email: "neha@voiceai.com",
    avatar: "NS",
    avatarColor: "bg-rose-500",
    role: "Agent",
    status: "Active",
    lastLogin: "Apr 21, 2025 09:18 AM"
  },
  {
    id: "usr-3",
    name: "Rahul Singh",
    email: "rahul@voiceai.com",
    avatar: "RS",
    avatarColor: "bg-amber-500",
    role: "Supervisor",
    status: "Active",
    lastLogin: "Apr 20, 2025 04:32 PM"
  },
  {
    id: "usr-4",
    name: "Amit Deshmukh",
    email: "amit@voiceai.com",
    avatar: "AD",
    avatarColor: "bg-blue-600",
    role: "Agent",
    status: "Active",
    lastLogin: "Apr 19, 2025 02:15 PM"
  },
  {
    id: "usr-5",
    name: "Pooja Salunkhe",
    email: "pooja@voiceai.com",
    avatar: "PS",
    avatarColor: "bg-pink-500",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "Apr 18, 2025 11:03 AM"
  },
  {
    id: "usr-6",
    name: "Sanjay Kumawat",
    email: "sanjay@voiceai.com",
    avatar: "SK",
    avatarColor: "bg-teal-500",
    role: "Agent",
    status: "Active",
    lastLogin: "Apr 17, 2025 03:27 PM"
  },
  {
    id: "usr-7",
    name: "Anjali Kapse",
    email: "anjali@voiceai.com",
    avatar: "AK",
    avatarColor: "bg-purple-500",
    role: "Supervisor",
    status: "Active",
    lastLogin: "Apr 16, 2025 01:12 PM"
  },
  {
    id: "usr-8",
    name: "Vikram Kale",
    email: "vikram@voiceai.com",
    avatar: "VK",
    avatarColor: "bg-blue-500",
    role: "Agent",
    status: "Active",
    lastLogin: "Apr 15, 2025 10:45 AM"
  },
  {
    id: "usr-9",
    name: "Snehal Joshi",
    email: "snehal@voiceai.com",
    avatar: "SJ",
    avatarColor: "bg-indigo-500",
    role: "Admin",
    status: "Active",
    lastLogin: "Apr 14, 2025 08:30 AM"
  },
  {
    id: "usr-10",
    name: "Karan Mehta",
    email: "karan@voiceai.com",
    avatar: "KM",
    avatarColor: "bg-emerald-500",
    role: "Agent",
    status: "Active",
    lastLogin: "Apr 13, 2025 05:20 PM"
  },
  {
    id: "usr-11",
    name: "Tanvi Rao",
    email: "tanvi@voiceai.com",
    avatar: "TR",
    avatarColor: "bg-orange-500",
    role: "Agent",
    status: "Active",
    lastLogin: "Apr 12, 2025 02:40 PM"
  },
  {
    id: "usr-12",
    name: "Deepak Verma",
    email: "deepak@voiceai.com",
    avatar: "DV",
    avatarColor: "bg-slate-500",
    role: "Viewer",
    status: "Inactive",
    lastLogin: "Apr 10, 2025 11:15 AM"
  }
];

const INITIAL_ROLES: RoleItem[] = [
  {
    id: "role-admin",
    name: "Admin",
    badge: "Full Access",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    description: "Has full access to all features and settings.",
    userCount: 2,
    permissions: ["Manage Users", "Billing & Passes", "Voice AI Agents", "Analytics Export", "System Config"]
  },
  {
    id: "role-supervisor",
    name: "Supervisor",
    badge: "Manage",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "Can monitor calls, manage agents and campaigns.",
    userCount: 2,
    permissions: ["Monitor Live Calls", "Manage AI Agents", "Review Transcripts", "Run Campaigns"]
  },
  {
    id: "role-agent",
    name: "Agent",
    badge: "Standard",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    description: "Can handle calls, view transcripts and update call status.",
    userCount: 6,
    permissions: ["Answer Live Calls", "View Assigned Transcripts", "Update Call Tickets"]
  },
  {
    id: "role-viewer",
    name: "Viewer",
    badge: "Read Only",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    description: "Can only view data and reports.",
    userCount: 2,
    permissions: ["View Analytics Reports", "View Completed Calls Log"]
  }
];

const INITIAL_ACTIVITY_LOG = [
  { id: "act-1", user: "Pratiksha Patil", action: "Updated role permissions for Supervisor", time: "10 mins ago" },
  { id: "act-2", user: "Rahul Singh", action: "Logged in via Multi-Factor Authentication", time: "2 hours ago" },
  { id: "act-3", user: "Pratiksha Patil", action: "Invited new agent Vikram Kale", time: "1 day ago" },
  { id: "act-4", user: "Snehal Joshi", action: "Changed password security policy", time: "2 days ago" }
];

export default function UsersRolesContent() {
  // State
  const [usersList, setUsersList] = useState<UserItem[]>(INITIAL_USERS);
  const [rolesList, setRolesList] = useState<RoleItem[]>(INITIAL_ROLES);
  const [activityLogs, setActivityLogs] = useState(INITIAL_ACTIVITY_LOG);

  // Filters & Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Selected Checkboxes
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [activeMenuUserId, setActiveMenuUserId] = useState<string | null>(null);
  const [activeMenuRoleId, setActiveMenuRoleId] = useState<string | null>(null);

  // Modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  // Form states
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<"Admin" | "Supervisor" | "Agent" | "Viewer">("Agent");
  const [newUserStatus, setNewUserStatus] = useState<"Active" | "Inactive">("Active");

  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");
  const [selectedUserForReset, setSelectedUserForReset] = useState<string>("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPI Calculations
  const totalUsersCount = usersList.length;
  const activeUsersCount = usersList.filter((u) => u.status === "Active").length;
  const rolesCount = rolesList.length;
  const adminsCount = usersList.filter((u) => u.role === "Admin").length;

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const matchSearch =
        searchQuery.trim() === "" ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = roleFilter === "All" || u.role === roleFilter;
      const matchStatus = statusFilter === "All" || u.status === statusFilter;

      return matchSearch && matchRole && matchStatus;
    });
  }, [usersList, searchQuery, roleFilter, statusFilter]);

  // Paginated Users
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  // Select all checkbox handler
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUserIds((prev) => [...prev, id]);
    } else {
      setSelectedUserIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Add User Submission
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      showToast("Please fill in both name and email!");
      return;
    }

    const initials = newUserName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    const colors = ["bg-blue-600", "bg-purple-600", "bg-emerald-600", "bg-amber-600", "bg-rose-600"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newUser: UserItem = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      avatar: initials || "US",
      avatarColor: randomColor,
      role: newUserRole,
      status: newUserStatus,
      lastLogin: "Just now"
    };

    setUsersList((prev) => [newUser, ...prev]);
    setShowAddUserModal(false);
    setNewUserName("");
    setNewUserEmail("");
    showToast(`User ${newUser.name} added successfully!`);
  };

  // Add Role Submission
  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName.trim()) {
      showToast("Please enter a role name!");
      return;
    }

    const newRole: RoleItem = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      badge: "Custom",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      description: newRoleDesc.trim() || "Custom organizational role with granular permissions.",
      userCount: 0,
      permissions: ["View Analytics", "Manage Calls"]
    };

    setRolesList((prev) => [...prev, newRole]);
    setShowAddRoleModal(false);
    setNewRoleName("");
    setNewRoleDesc("");
    showToast(`Role ${newRole.name} created successfully!`);
  };

  // Delete User
  const handleDeleteUser = (id: string, name: string) => {
    setUsersList((prev) => prev.filter((u) => u.id !== id));
    setActiveMenuUserId(null);
    showToast(`Removed user ${name}`);
  };

  // Toggle User Status
  const handleToggleStatus = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const updated = u.status === "Active" ? "Inactive" : "Active";
          showToast(`${u.name} marked as ${updated}`);
          return { ...u, status: updated };
        }
        return u;
      })
    );
    setActiveMenuUserId(null);
  };

  // Reset Password Action
  const handleResetPassword = () => {
    if (!selectedUserForReset) {
      showToast("Please select a user to reset password");
      return;
    }
    const user = usersList.find((u) => u.id === selectedUserForReset);
    setShowResetPasswordModal(false);
    showToast(`Password reset link sent to ${user?.email || "user"}`);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto min-h-screen text-slate-800 relative font-sans">
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

      {/* Backdrop for closing popups */}
      {(filterMenuOpen || activeMenuUserId !== null || activeMenuRoleId !== null) && (
        <div
          className="fixed inset-0 z-30 bg-transparent"
          onClick={() => {
            setFilterMenuOpen(false);
            setActiveMenuUserId(null);
            setActiveMenuRoleId(null);
          }}
        />
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
            <Shield className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              Users & Roles
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage users, assign roles and control access to the platform
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Top Row — 4 KPI Summary Cards (Matching Image 1 Format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Total Users */}
        <div className="relative overflow-hidden rounded-xl border border-blue-200 bg-blue-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-blue-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Total Users</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {totalUsersCount}
              </h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ 2 new this month</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600 shadow-inner">
              <User className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 2: Active Users */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Active Users</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {activeUsersCount}
              </h3>
              <p className="mt-2 text-xs font-bold text-emerald-600 flex items-center gap-1">
                <span>↑ 1 new this week</span>
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 shadow-inner">
              <Users className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 3: Roles */}
        <div className="relative overflow-hidden rounded-xl border border-purple-200 bg-purple-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-purple-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Roles</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {rolesCount}
              </h3>
              <p className="mt-2 text-xs font-bold text-slate-400">
                Custom roles available
              </p>
            </div>
            <div className="p-3 rounded-xl bg-purple-100 text-purple-600 shadow-inner">
              <Shield className="size-5" />
            </div>
          </div>
        </div>

        {/* Card 4: Admins */}
        <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs transition-all hover:shadow-md">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-amber-200/50 blur-xl pointer-events-none" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-xs font-bold text-slate-500">Admins</p>
              <h3 className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
                {adminsCount}
              </h3>
              <p className="mt-2 text-xs font-bold text-slate-400">
                With full access
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-600 shadow-inner">
              <Lock className="size-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Users Table (Span 7 / 8) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col justify-between overflow-hidden">
          <div>
            {/* Table Header & Controls Bar */}
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Users</h3>
                <span className="text-xs font-semibold text-slate-400">
                  ({filteredUsers.length})
                </span>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex items-center gap-2 relative">
                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search users by name, email or role..."
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50/70 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-500 rounded-xl text-xs text-slate-800 placeholder-slate-400 transition-all outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>

                {/* Filter Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      roleFilter !== "All" || statusFilter !== "All"
                        ? "bg-blue-50 border-blue-300 text-blue-700"
                        : "bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <Filter className="size-3 text-slate-500" />
                    <span>Filter</span>
                  </button>

                  {filterMenuOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-2.5 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
                      <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1.5">
                        Role Filter
                      </div>
                      <div className="space-y-1 mb-3">
                        {["All", "Admin", "Supervisor", "Agent", "Viewer"].map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              setRoleFilter(r);
                              setCurrentPage(1);
                            }}
                            className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left transition-colors ${
                              roleFilter === r ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>{r}</span>
                            {roleFilter === r && <Check className="size-3 text-blue-600" />}
                          </button>
                        ))}
                      </div>

                      <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1.5">
                        Status Filter
                      </div>
                      <div className="space-y-1">
                        {["All", "Active", "Inactive"].map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setStatusFilter(s);
                              setCurrentPage(1);
                            }}
                            className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-left transition-colors ${
                              statusFilter === s ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700 hover:bg-slate-50"
                            }`}
                          >
                            <span>{s}</span>
                            {statusFilter === s && <Check className="size-3 text-blue-600" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4 w-10 text-center">
                      <input
                        type="checkbox"
                        checked={
                          paginatedUsers.length > 0 &&
                          paginatedUsers.every((u) => selectedUserIds.includes(u.id))
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                    </th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Login</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedUsers.map((user) => {
                    const isChecked = selectedUserIds.includes(user.id);
                    return (
                      <tr
                        key={user.id}
                        className={`transition-colors hover:bg-slate-50/70 ${
                          isChecked ? "bg-blue-50/30" : ""
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => handleSelectOne(user.id, e.target.checked)}
                            className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>

                        {/* Name & Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`size-7 rounded-full ${user.avatarColor} text-white font-bold text-[11px] flex items-center justify-center shrink-0 shadow-2xs`}
                            >
                              {user.avatar}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{user.name}</div>
                              <div className="text-[10px] text-slate-400 md:hidden">{user.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-4 text-slate-500 font-normal">
                          {user.email}
                        </td>

                        {/* Role */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {user.role === "Admin" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              Admin
                            </span>
                          )}
                          {user.role === "Supervisor" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="size-1.5 rounded-full bg-emerald-500" />
                              Supervisor
                            </span>
                          )}
                          {user.role === "Agent" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                              Agent
                            </span>
                          )}
                          {user.role === "Viewer" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              Viewer
                            </span>
                          )}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {user.status === "Active" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="size-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                              <span className="size-1.5 rounded-full bg-rose-500" />
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Last Login */}
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                          {user.lastLogin}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right relative whitespace-nowrap">
                          <button
                            onClick={() =>
                              setActiveMenuUserId(activeMenuUserId === user.id ? null : user.id)
                            }
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <MoreHorizontal className="size-4" />
                          </button>

                          {activeMenuUserId === user.id && (
                            <div className="absolute right-2 top-full mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-40 text-xs animate-in fade-in zoom-in-95 duration-100 text-left">
                              <button
                                onClick={() => handleToggleStatus(user.id)}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <UserCheck className="size-3.5 text-emerald-600" />
                                <span>{user.status === "Active" ? "Set Inactive" : "Set Active"}</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUserForReset(user.id);
                                  setShowResetPasswordModal(true);
                                  setActiveMenuUserId(null);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                              >
                                <KeyRound className="size-3.5 text-amber-600" />
                                <span>Reset Password</span>
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id, user.name)}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="size-3.5" />
                                <span>Delete User</span>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {paginatedUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No users found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Pagination Footer */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div>
              Showing {Math.min((currentPage - 1) * pageSize + 1, filteredUsers.length)}–
              {Math.min(currentPage * pageSize, filteredUsers.length)} of {filteredUsers.length} users
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="size-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="size-3.5" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`size-7 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-xs"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="size-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Roles & Permissions + Quick Actions (Span 5 / 4) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          {/* Roles & Permissions Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Shield className="size-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Roles & Permissions</h3>
              </div>
              <button
                onClick={() => setShowAddRoleModal(true)}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="size-3" />
                <span>Add Role</span>
              </button>
            </div>

            {/* Roles Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-2.5">Role Name</th>
                    <th className="pb-2.5">Description</th>
                    <th className="pb-2.5 text-center">Users</th>
                    <th className="pb-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rolesList.map((role) => (
                    <tr key={role.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Role Name */}
                      <td className="py-3 align-top">
                        <div className="font-bold text-slate-900">{role.name}</div>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold border ${role.badgeColor}`}
                        >
                          {role.badge}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="py-3 text-slate-500 leading-relaxed pr-2 align-top">
                        {role.description}
                      </td>

                      {/* Users Count */}
                      <td className="py-3 text-center font-bold text-slate-800 align-top">
                        {role.name === "Admin"
                          ? adminsCount
                          : role.name === "Supervisor"
                          ? usersList.filter((u) => u.role === "Supervisor").length
                          : role.name === "Agent"
                          ? usersList.filter((u) => u.role === "Agent").length
                          : usersList.filter((u) => u.role === "Viewer").length}
                      </td>

                      {/* Actions */}
                      <td className="py-3 text-right align-top relative">
                        <button
                          onClick={() =>
                            setActiveMenuRoleId(activeMenuRoleId === role.id ? null : role.id)
                          }
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          <MoreHorizontal className="size-3.5" />
                        </button>

                        {activeMenuRoleId === role.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-xl p-1 z-40 text-xs animate-in fade-in zoom-in-95 duration-100 text-left">
                            <button
                              onClick={() => {
                                showToast(`Editing role: ${role.name}`);
                                setActiveMenuRoleId(null);
                              }}
                              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-slate-50"
                            >
                              <Edit className="size-3.5 text-slate-400" />
                              <span>Edit Permissions</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="size-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Action 1: Add New User */}
              <div
                onClick={() => setShowAddUserModal(true)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                    <User className="size-4" />
                  </div>
                  <ArrowRight className="size-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-bold text-slate-900 text-xs mb-0.5">Add New User</div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Create a new user and assign role
                </p>
              </div>

              {/* Action 2: Manage Roles */}
              <div
                onClick={() => setShowAddRoleModal(true)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100">
                    <Shield className="size-4" />
                  </div>
                  <ArrowRight className="size-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-bold text-slate-900 text-xs mb-0.5">Manage Roles</div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Edit permissions and role settings
                </p>
              </div>

              {/* Action 3: User Activity Log */}
              <div
                onClick={() => setShowActivityModal(true)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <Clock className="size-4" />
                  </div>
                  <ArrowRight className="size-3.5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-bold text-slate-900 text-xs mb-0.5">User Activity Log</div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  View recent user activity and login history
                </p>
              </div>

              {/* Action 4: Reset Password */}
              <div
                onClick={() => setShowResetPasswordModal(true)}
                className="p-3.5 rounded-xl border border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                    <Lock className="size-4" />
                  </div>
                  <ArrowRight className="size-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="font-bold text-slate-900 text-xs mb-0.5">Reset Password</div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Reset user passwords securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 1: Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <User className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Add New User</h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Rohini Sharma"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. rohini@voiceai.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e: any) => setNewUserRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Agent">Agent</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={newUserStatus}
                    onChange={(e: any) => setNewUserStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Role */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Shield className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Add New Role</h3>
              </div>
              <button
                onClick={() => setShowAddRoleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Name</label>
                <input
                  type="text"
                  required
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="e.g. Compliance Auditor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Description</label>
                <textarea
                  rows={3}
                  value={newRoleDesc}
                  onChange={(e) => setNewRoleDesc(e.target.value)}
                  placeholder="Can audit call transcripts, view sentiment analytics..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddRoleModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: User Activity Log */}
      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Clock className="size-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">User Activity Log</h3>
              </div>
              <button
                onClick={() => setShowActivityModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
              {activityLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="font-bold text-slate-800">{log.user}</span>
                    <p className="text-slate-600 mt-0.5">{log.action}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">{log.time}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowActivityModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Reset Password */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="size-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Reset User Password</h3>
              </div>
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select User</label>
                <select
                  value={selectedUserForReset}
                  onChange={(e) => setSelectedUserForReset(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl outline-none"
                >
                  <option value="">-- Choose User --</option>
                  {usersList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-slate-500 leading-relaxed text-[11px]">
                A secure password reset link will be dispatched to the user's registered email address with a 24-hour expiration token.
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetPasswordModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleResetPassword}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
