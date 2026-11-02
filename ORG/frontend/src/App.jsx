import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Layers, 
  Clock, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  X,
  Check,
  User,
  Award,
  CheckSquare,
  ListTodo,
  Briefcase,
  Building2,
  FileCheck2,
  Calendar,
  Flag,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Lock,
  History
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  // 1. Available Enterprise Personas (Kannada icons & Yuvraj V)
  const personas = [
    { name: 'Yuvraj V', role: 'ROLE_TEAM_MEMBER', title: 'Senior Java Backend Engineer (Mentee)', team: 'Platform Core', mentor: 'Puneeth Rajkumar' },
    { name: 'Puneeth Rajkumar', role: 'ROLE_PROJECT_MANAGER', title: 'Project Lead & Lead Architect', team: 'Platform Architecture', mentor: 'Self / Lead' },
    { name: 'Yash', role: 'ROLE_TEAM_LEAD', title: 'DevOps & Cloud Lead', team: 'Cloud Infrastructure', mentor: 'Puneeth Rajkumar' },
    { name: 'Rishab Shetty', role: 'ROLE_SERVICE_AGENT', title: 'Security & Service Desk Specialist', team: 'Security & Auth', mentor: 'Puneeth Rajkumar' },
    { name: 'Admin', role: 'ROLE_ADMIN', title: 'Enterprise Administrator', team: 'Executive Administration', mentor: 'Board' }
  ];

  const [activeEmp, setActiveEmp] = useState(personas[0]);

  // 2. Projects state
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ code: '', name: '', lead: 'Puneeth Rajkumar', dueDate: '', description: '' });

  // 3. Milestones state (PDF Module 6.3)
  const [milestones, setMilestones] = useState([]);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    projectCode: 'PRJ-101',
    title: '',
    description: '',
    owner: 'Yuvraj V',
    targetDate: '',
    status: 'IN_PROGRESS',
    progress: 0
  });

  // 4. Task Board state (PDF Module 6.4)
  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ 
    code: '',
    title: '', 
    description: '',
    priority: 'MEDIUM', 
    points: 3, 
    assignee: 'Yuvraj V',
    team: 'Platform Core',
    mentor: 'Puneeth Rajkumar',
    status: 'TODO',
    projectCode: 'PRJ-101'
  });

  // 5. Service Desk & SLA state (PDF Module 6.5 & 6.7)
  const [tickets, setTickets] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    code: '',
    subject: '',
    description: '',
    severity: 'MEDIUM',
    reporter: 'Operations Desk',
    dept: 'Platform Core',
    targetHours: 8
  });

  // 6. Approvals state (PDF Module 6.6)
  const [approvals, setApprovals] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [newApproval, setNewApproval] = useState({
    code: '',
    title: '',
    category: 'DEPLOYMENT',
    projectCode: 'PRJ-101',
    requester: 'Yuvraj V',
    approver: 'Puneeth Rajkumar',
    priority: 'MEDIUM',
    notes: ''
  });

  // 7. Team Workload state (PDF Module 6.8)
  const [teamCapacity, setTeamCapacity] = useState([]);

  // 8. Audit Logs state (PDF Module 6.1 & 10)
  const [auditLogs, setAuditLogs] = useState([]);

  // Check backend health
  const checkHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch('/api/v1/health');
      if (res.ok) {
        const data = await res.json();
        setHealthStatus(data.data || data);
      } else {
        setHealthStatus({ status: 'OFFLINE', msg: 'Backend offline' });
      }
    } catch {
      setHealthStatus({ status: 'OFFLINE', msg: 'Spring Boot offline' });
    } finally {
      setLoadingHealth(false);
    }
  };

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/v1/projects');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setProjects(json.data);
      }
    } catch {}
  };

  // Fetch milestones from backend
  const fetchMilestones = async () => {
    try {
      const res = await fetch('/api/v1/milestones');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setMilestones(json.data);
      }
    } catch {}
  };

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/v1/tasks');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setTasks(json.data);
      }
    } catch {}
  };

  // Fetch tickets from backend
  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/v1/tickets');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setTickets(json.data);
      }
    } catch {}
  };

  // Fetch approvals from backend
  const fetchApprovals = async () => {
    try {
      const res = await fetch('/api/v1/approvals');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setApprovals(json.data);
      }
    } catch {}
  };

  // Fetch dynamic workload from backend
  const fetchWorkload = async () => {
    try {
      const res = await fetch('/api/v1/workload');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setTeamCapacity(json.data);
      }
    } catch {}
  };

  // Fetch audit logs from backend
  const fetchAuditLogs = async () => {
    try {
      const res = await fetch('/api/v1/audit');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) setAuditLogs(json.data);
      }
    } catch {}
  };

  const refreshAll = () => {
    checkHealth();
    fetchProjects();
    fetchMilestones();
    fetchTasks();
    fetchTickets();
    fetchApprovals();
    fetchWorkload();
    fetchAuditLogs();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // Create new project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.code || !newProject.name || !newProject.lead) return;

    try {
      const res = await fetch('/api/v1/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProject,
          health: 'ON_TRACK',
          progress: 0,
          status: 'ACTIVE'
        })
      });

      if (res.ok) {
        const json = await res.json();
        setProjects(prev => [...prev, json.data]);
      } else {
        setProjects(prev => [...prev, { id: Date.now(), ...newProject, health: 'ON_TRACK', progress: 0 }]);
      }
    } catch {
      setProjects(prev => [...prev, { id: Date.now(), ...newProject, health: 'ON_TRACK', progress: 0 }]);
    }

    setNewProject({ code: '', name: '', lead: 'Priya Sharma', dueDate: '', description: '' });
    setShowProjectModal(false);
  };

  // Create new milestone
  const handleCreateMilestone = async (e) => {
    e.preventDefault();
    if (!newMilestone.title || !newMilestone.projectCode || !newMilestone.owner) return;

    try {
      const res = await fetch('/api/v1/milestones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMilestone)
      });

      if (res.ok) {
        const json = await res.json();
        setMilestones(prev => [...prev, json.data]);
      } else {
        setMilestones(prev => [...prev, { id: Date.now(), ...newMilestone }]);
      }
    } catch {
      setMilestones(prev => [...prev, { id: Date.now(), ...newMilestone }]);
    }

    setNewMilestone({
      projectCode: 'PRJ-101',
      title: '',
      description: '',
      owner: activeEmp.name,
      targetDate: '',
      status: 'IN_PROGRESS',
      progress: 0
    });
    setShowMilestoneModal(false);
  };

  // Create new task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.assignee) return;

    const taskCode = newTask.code || `TSK-${Math.floor(100 + Math.random() * 900)}`;

    try {
      const res = await fetch('/api/v1/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTask, code: taskCode })
      });

      if (res.ok) {
        const json = await res.json();
        setTasks(prev => [...prev, json.data]);
        fetchWorkload();
      } else {
        setTasks(prev => [...prev, { id: Date.now(), ...newTask, code: taskCode }]);
      }
    } catch {
      setTasks(prev => [...prev, { id: Date.now(), ...newTask, code: taskCode }]);
    }

    setNewTask({ 
      code: '',
      title: '', 
      description: '',
      priority: 'MEDIUM', 
      points: 3, 
      assignee: activeEmp.name,
      team: activeEmp.team,
      mentor: 'Priya Sharma',
      status: 'TODO',
      projectCode: 'PRJ-101'
    });
    setShowTaskModal(false);
  };

  // Create new ticket
  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.reporter) return;

    const tCode = newTicket.code || `TKT-${Math.floor(100 + Math.random() * 900)}`;

    try {
      const res = await fetch('/api/v1/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTicket, code: tCode })
      });

      if (res.ok) {
        const json = await res.json();
        setTickets(prev => [...prev, json.data]);
      } else {
        setTickets(prev => [...prev, {
          id: Date.now(),
          ...newTicket,
          code: tCode,
          status: 'IN_PROGRESS',
          slaPercent: 10,
          warning: false,
          remainingMinutes: newTicket.targetHours * 60,
          createdAt: new Date().toISOString()
        }]);
      }
    } catch {
      setTickets(prev => [...prev, {
        id: Date.now(),
        ...newTicket,
        code: tCode,
        status: 'IN_PROGRESS',
        slaPercent: 10,
        warning: false,
        remainingMinutes: newTicket.targetHours * 60,
        createdAt: new Date().toISOString()
      }]);
    }

    setNewTicket({
      code: '',
      subject: '',
      description: '',
      severity: 'MEDIUM',
      reporter: 'Operations Desk',
      dept: 'Platform Core',
      targetHours: 8
    });
    setShowTicketModal(false);
  };

  // Create new approval
  const handleCreateApproval = async (e) => {
    e.preventDefault();
    if (!newApproval.title || !newApproval.requester) return;

    const aprCode = newApproval.code || `APR-${Math.floor(100 + Math.random() * 900)}`;

    try {
      const res = await fetch('/api/v1/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newApproval, code: aprCode })
      });

      if (res.ok) {
        const json = await res.json();
        setApprovals(prev => [...prev, json.data]);
      } else {
        setApprovals(prev => [...prev, {
          id: Date.now(),
          ...newApproval,
          code: aprCode,
          status: 'PENDING',
          createdAt: new Date().toISOString()
        }]);
      }
    } catch {
      setApprovals(prev => [...prev, {
        id: Date.now(),
        ...newApproval,
        code: aprCode,
        status: 'PENDING',
        createdAt: new Date().toISOString()
      }]);
    }

    setNewApproval({
      code: '',
      title: '',
      category: 'DEPLOYMENT',
      projectCode: 'PRJ-101',
      requester: activeEmp.name,
      approver: 'Priya Sharma',
      priority: 'MEDIUM',
      notes: ''
    });
    setShowApprovalModal(false);
  };

  // Approve request
  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/v1/approvals/${id}/approve`, { method: 'PUT' });
      if (res.ok) {
        const json = await res.json();
        setApprovals(prev => prev.map(a => a.id === id ? json.data : a));
      } else {
        setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'APPROVED' } : a));
      }
    } catch {
      setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'APPROVED' } : a));
    }
  };

  // Reject request
  const handleReject = async (id) => {
    try {
      const res = await fetch(`/api/v1/approvals/${id}/reject`, { method: 'PUT' });
      if (res.ok) {
        const json = await res.json();
        setApprovals(prev => prev.map(a => a.id === id ? json.data : a));
      } else {
        setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'REJECTED' } : a));
      }
    } catch {
      setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'REJECTED' } : a));
    }
  };

  // Move task status
  const moveTask = async (taskId, newStatus) => {
    try {
      const res = await fetch(`/api/v1/tasks/${taskId}/status?status=${newStatus}`, { method: 'PATCH' });
      if (res.ok) {
        const json = await res.json();
        setTasks(prev => prev.map(t => t.id === taskId ? json.data : t));
        fetchWorkload();
      } else {
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
      }
    } catch {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    }
  };

  // Resolve service ticket
  const resolveTicket = async (ticketId) => {
    try {
      const res = await fetch(`/api/v1/tickets/${ticketId}/resolve`, { method: 'PUT' });
      if (res.ok) {
        const json = await res.json();
        setTickets(prev => prev.map(t => t.id === ticketId ? json.data : t));
      } else {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED', warning: false } : t));
      }
    } catch {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED', warning: false } : t));
    }
  };

  const columns = [
    { id: 'BACKLOG', title: 'Backlog', tint: 'bg-[#EAEBED]/90 border-[#B6B6B6]/60 text-slate-700' },
    { id: 'TODO', title: 'To Do', tint: 'bg-[#E5EEF5]/90 border-[#A3B4C4]/70 text-[#1F2F33]' },
    { id: 'IN_PROGRESS', title: 'In Progress', tint: 'bg-[#FAF0E6]/90 border-[#D8C9AE]/70 text-[#5C4033]' },
    { id: 'REVIEW', title: 'Review', tint: 'bg-[#EEE6F7]/90 border-[#291A40]/30 text-[#291A40]' },
    { id: 'DONE', title: 'Done', tint: 'bg-[#E5F5ED]/90 border-[#A3D9C4]/70 text-[#164E3A]' }
  ];

  // Instant online check
  const isOnline = healthStatus?.status === 'UP' || healthStatus?.status === 'ONLINE' || healthStatus?.service != null || projects.length > 0;

  // KPI Calculations
  const onTrackCount = projects.filter(p => p.health === 'ON_TRACK').length;
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'DONE').length;
  const taskDonePercent = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const openTickets = tickets.filter(t => t.status !== 'RESOLVED');
  const slaWarningTickets = tickets.filter(t => t.warning);
  const pendingApprovals = approvals.filter(a => a.status === 'PENDING').length;
  const overloadedDevs = teamCapacity.filter(d => d.status === 'OVERLOAD').length;
  const avgUtilization = teamCapacity.length > 0 
    ? Math.round(teamCapacity.reduce((acc, d) => acc + d.percent, 0) / teamCapacity.length)
    : 0;

  // Active user's filtered tasks (supports Yuvraj Singh / active persona)
  const myTasks = tasks.filter(t => {
    if (!t.assignee) return false;
    const a = t.assignee.toLowerCase();
    const currentName = activeEmp.name.toLowerCase();
    const currentFirst = currentName.split(' ')[0];
    return a.includes(currentName) || a.includes(currentFirst);
  });
  const myActiveTasks = myTasks.filter(t => t.status !== 'DONE');
  const myCompletedTasks = myTasks.filter(t => t.status === 'DONE');
  const myActivePoints = myActiveTasks.reduce((sum, t) => sum + (t.points || 1), 0);
  const myCompletedPoints = myCompletedTasks.reduce((sum, t) => sum + (t.points || 1), 0);
  const myAllocatedHours = myActivePoints * 4;

  return (
    <div className="min-h-screen bg-[#EEF2F6] text-slate-900 flex flex-col font-sans selection:bg-[#1F2F33]/20 selection:text-[#1F2F33]">
      
      {/* Apple Frosted Navigation Bar - Slate Teal & Midnight Purple Accents */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-[#A3B4C4]/40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#1F2F33] to-[#291A40] flex items-center justify-center text-white shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-slate-900">
                  Enterprise Project &amp; Service Management
                </span>
                <span className="text-[10px] bg-[#E5EEF5] text-[#1F2F33] font-semibold px-2.5 py-0.5 rounded-full border border-[#A3B4C4]/60">
                  Slate Teal &bull; Midnight Purple &bull; 30% Scope
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Pure JPA ORM &bull; SLA Governance &bull; Mentorship</p>
            </div>
          </div>

          {/* Right Header: Active Persona Switcher & Live Status */}
          <div className="flex items-center gap-3">
            {/* Persona Switcher Pill (shadcn / iOS Style) */}
            <div className="flex items-center gap-2 bg-[#EAEBED]/90 hover:bg-[#DFE1E5] border border-[#B6B6B6]/60 rounded-full px-3 py-1 transition">
              <div className="w-5 h-5 rounded-full bg-[#1F2F33] text-white font-bold text-[10px] flex items-center justify-center">
                {activeEmp.name.split(' ').map(n => n[0]).join('')}
              </div>
              <select
                value={activeEmp.name}
                onChange={e => {
                  const selected = personas.find(p => p.name === e.target.value);
                  if (selected) setActiveEmp(selected);
                }}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
              >
                {personas.map(p => (
                  <option key={p.name} value={p.name}>
                    {p.name} ({p.team})
                  </option>
                ))}
              </select>
            </div>

            {/* Connection Status Pill */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                : 'bg-amber-50 text-amber-700 border border-amber-200/80'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              {isOnline ? 'Online (8080)' : 'Connecting...'}
            </span>

            <button 
              onClick={refreshAll}
              disabled={loadingHealth}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              title="Refresh All APIs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? 'animate-spin text-[#1F2F33]' : ''}`} />
            </button>
          </div>
        </div>

        {/* shadcn Tabs / iOS Segmented Tab Navigation - Tasks Menu Renamed */}
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between border-t border-slate-100">
          <div className="flex gap-1.5 bg-[#EAEBED]/80 p-1 rounded-full border border-[#B6B6B6]/50 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
              { id: 'kanban', label: `Tasks (${tasks.length})`, icon: CheckSquare },
              { id: 'tickets', label: `Service Desk (${tickets.length})`, icon: Clock },
              { id: 'approvals', label: `Approvals (${approvals.length})`, icon: FileCheck2 },
              { id: 'workload', label: 'Squad Capacity', icon: Users },
              { id: 'audit', label: 'Audit Trail', icon: History }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-1.5 rounded-full text-xs transition whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-[#1F2F33] shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 font-medium'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1F2F33]' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Logged in: <strong className="text-slate-800">{activeEmp.name}</strong> ({activeEmp.role})</span>
          </div>
        </div>
      </header>

      {/* Main Container with Soft Pastel Canvas */}
      <main className="max-w-7xl mx-auto px-6 py-6 w-full flex-1">

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">

            {/* iOS Pastel KPI Widget Cards */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500">
                  Executive KPI Overview
                </span>
                <span className="text-[11px] text-slate-500 font-medium">Real-time JPA Auditing</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* 1. Picture 4: Slate Teal & Frost Blue - Active Projects */}
                <div className="bg-gradient-to-br from-[#EBF2F7] via-[#F4F8FA] to-white p-5 rounded-3xl border border-[#A3B4C4]/60 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between text-[#1F2F33] mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
                    <div className="p-1.5 bg-[#A3B4C4]/25 rounded-xl">
                      <FolderKanban className="w-4 h-4 text-[#1F2F33]" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-slate-900">{projects.length}</div>
                  <div className="text-[11px] text-emerald-700 mt-2 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {onTrackCount} portfolios on track
                  </div>
                </div>

                {/* 2. Frost Teal / Mint - Task Delivery */}
                <div className="bg-gradient-to-br from-[#EBF5F1] via-[#F3FAF7] to-white p-5 rounded-3xl border border-[#A3D9C4]/60 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between text-emerald-800 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Task Delivery</span>
                    <div className="p-1.5 bg-emerald-100 rounded-xl">
                      <CheckSquare className="w-4 h-4 text-emerald-700" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-slate-900">{taskDonePercent}%</div>
                  <div className="w-full bg-emerald-200/50 rounded-full h-1.5 mt-2.5 overflow-hidden">
                    <div className="bg-emerald-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${taskDonePercent}%` }} />
                  </div>
                  <div className="text-[11px] text-slate-600 mt-2">{doneTasks} of {totalTasks} sprint items delivered</div>
                </div>

                {/* 3. Picture 3 Neutral Gray Tint - Service Desk & SLA */}
                <div className="bg-gradient-to-br from-[#F5F2F0] via-[#FAF8F6] to-white p-5 rounded-3xl border border-[#B6B6B6]/60 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between text-[#5C4033] mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Service Desk SLA</span>
                    <div className="p-1.5 bg-amber-100 rounded-xl">
                      <Clock className="w-4 h-4 text-amber-700" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-slate-900">{openTickets.length}</div>
                  <div className="text-[11px] mt-2 font-medium">
                    {slaWarningTickets.length > 0 ? (
                      <span className="text-amber-800">{slaWarningTickets.length} approaching 75% SLA breach</span>
                    ) : (
                      <span className="text-emerald-700">100% within response targets</span>
                    )}
                  </div>
                </div>

                {/* 4. Picture 3: Midnight Purple & Neutral Gray - Engineering Load */}
                <div className="bg-gradient-to-br from-[#F0ECF6] via-[#F7F4FB] to-white p-5 rounded-3xl border border-[#291A40]/30 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between text-[#291A40] mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider">Squad Utilization</span>
                    <div className="p-1.5 bg-[#291A40]/10 rounded-xl">
                      <Users className="w-4 h-4 text-[#291A40]" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold tracking-tight text-slate-900">{avgUtilization}%</div>
                  <div className="text-[11px] mt-2 font-medium">
                    {overloadedDevs > 0 ? (
                      <span className="text-rose-700">{overloadedDevs} squad member overloaded</span>
                    ) : (
                      <span className="text-[#291A40] font-semibold">Optimal balance across all squads</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Persona Personal Workspace (Slate Teal & Frost Blue Container - Yuvraj V) */}
            <div className="bg-gradient-to-br from-[#EAF1F4] via-[#F4F8FA] to-white rounded-3xl border border-[#1F2F33]/25 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-[#A3B4C4]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1F2F33] to-[#291A40] text-white flex items-center justify-center font-bold text-base shadow-xs">
                    {activeEmp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{activeEmp.name}</h3>
                      <span className="text-[11px] font-semibold bg-[#1F2F33]/10 text-[#1F2F33] px-3 py-0.5 rounded-full border border-[#1F2F33]/20">
                        {activeEmp.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Squad: <strong className="text-slate-800">{activeEmp.team}</strong> &bull; Mentor: <strong className="text-slate-800">{activeEmp.mentor}</strong>
                    </p>
                  </div>
                </div>

                {/* Credits & Workload Badges */}
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 bg-[#1F2F33]/10 border border-[#1F2F33]/20 rounded-2xl text-left">
                    <span className="text-[10px] font-bold text-[#1F2F33] uppercase tracking-wider block">Completed Credits</span>
                    <span className="text-sm font-extrabold text-[#1F2F33]">+{myCompletedPoints} pts earned</span>
                  </div>

                  <div className="px-4 py-2 bg-white/90 border border-[#A3B4C4]/50 rounded-2xl text-left">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Effort</span>
                    <span className="text-sm font-extrabold text-slate-800">{myActivePoints} pts ({myAllocatedHours}h)</span>
                  </div>

                  <button
                    onClick={() => {
                      setNewTask(prev => ({ ...prev, assignee: activeEmp.name, team: activeEmp.team, mentor: activeEmp.mentor }));
                      setShowTaskModal(true);
                    }}
                    className="px-4 py-2 bg-[#1F2F33] hover:bg-[#162226] text-white rounded-full text-xs font-semibold shadow-xs transition"
                  >
                    + New Task
                  </button>
                </div>
              </div>

              {/* Personal Task Table */}
              <div className="overflow-x-auto bg-[#EAF1F4]/30 backdrop-blur-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[#A3B4C4]/40 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-[#EAF1F4]/60">
                      <th className="py-3 px-6">Code</th>
                      <th className="py-3 px-4">Task Deliverable</th>
                      <th className="py-3 px-4">Priority</th>
                      <th className="py-3 px-4">Story Points</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-6 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100/60">
                    {myTasks.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-500 font-medium">
                          No tasks assigned to {activeEmp.name}. Click "+ New Task" to assign work.
                        </td>
                      </tr>
                    ) : (
                      myTasks.map(t => (
                        <tr key={t.id} className="hover:bg-emerald-50/30 transition">
                          <td className="py-3.5 px-6 font-mono text-xs font-bold text-indigo-700">{t.code}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-900 block">{t.title}</span>
                            <span className="text-[11px] text-slate-500">{t.description || 'Sprint task deliverable'}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              t.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                              t.priority === 'HIGH' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              'bg-sky-100 text-sky-800 border border-sky-200'
                            }`}>
                              {t.priority}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-700">
                            {t.points} pts <span className="text-slate-500 font-normal">({t.points * 4}h)</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              t.status === 'DONE' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              t.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                              t.status === 'REVIEW' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            {t.status !== 'DONE' ? (
                              <button
                                onClick={() => moveTask(t.id, 'DONE')}
                                className="px-3.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold rounded-full border border-emerald-300/80 transition inline-flex items-center gap-1 text-[11px]"
                              >
                                <Check className="w-3 h-3" />
                                Mark Done (+{t.points} pts)
                              </button>
                            ) : (
                              <span className="text-emerald-700 font-bold inline-flex items-center gap-1 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Completed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Department Squads & Mentorship Capacity Matrix (Pastel Indigo/Lilac Container) */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white rounded-3xl border border-indigo-200/70 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-indigo-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Squad Workload &amp; Mentorship Distribution</h3>
                  <p className="text-xs text-slate-600 mt-0.5">Indian engineering roster, story points, and weekly burnout monitoring</p>
                </div>
                <button
                  onClick={() => setActiveTab('workload')}
                  className="text-xs text-indigo-700 hover:text-indigo-900 font-bold flex items-center gap-1"
                >
                  Capacity Balancer <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {teamCapacity.map(dev => (
                  <div key={dev.name} className="p-4 rounded-2xl border border-indigo-100 bg-white/80 hover:bg-white transition shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 text-xs">{dev.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        dev.status === 'OVERLOAD' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        dev.status === 'HEALTHY' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        'bg-sky-100 text-sky-800 border border-sky-200'
                      }`}>
                        {dev.percent}% Load
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mb-2">Squad: {dev.team}</div>

                    <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden mb-2.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          dev.status === 'OVERLOAD' ? 'bg-rose-500' :
                          dev.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${Math.min(dev.percent, 100)}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600">
                      <span>Active: <strong>{dev.activePoints} pts</strong></span>
                      <span className="text-emerald-700 font-bold">Done: +{dev.completedPoints} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise Project Portfolio Summary (Pastel Sky/Blue Container) */}
            <div className="bg-gradient-to-br from-sky-50/70 via-blue-50/30 to-white rounded-3xl border border-sky-200/70 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-sky-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Enterprise Project Portfolio</h3>
                  <p className="text-xs text-slate-600 mt-0.5">High-level status, health metrics, and deliverables</p>
                </div>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-xs font-semibold shadow-xs transition"
                >
                  + New Project
                </button>
              </div>

              <div className="overflow-x-auto bg-sky-50/20 backdrop-blur-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-sky-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-sky-100/40">
                      <th className="py-3 px-6">Code</th>
                      <th className="py-3 px-4">Project Title</th>
                      <th className="py-3 px-4">Lead</th>
                      <th className="py-3 px-4">Health</th>
                      <th className="py-3 px-4">Progress</th>
                      <th className="py-3 px-6 text-right">Target Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100/60">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-sky-50/30 transition">
                        <td className="py-3.5 px-6 font-mono text-xs font-bold text-sky-700">{p.code}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{p.name}</td>
                        <td className="py-3.5 px-4 text-slate-600">{p.lead}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            p.health === 'ON_TRACK' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            p.health === 'AT_RISK' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}>
                            {p.health.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                              <div className="bg-sky-600 h-1.5 rounded-full" style={{ width: `${p.progress}%` }} />
                            </div>
                            <span className="text-slate-600 font-semibold">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-right text-slate-500">{p.dueDate || 'Sprint End'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS & MILESTONES (PDF Module 6.2 & 6.3) */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Projects &amp; Milestones Management</h2>
                <p className="text-xs text-slate-500 mt-0.5">PDF Module 6.3: Target dates, milestone percentage, and overdue status</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowMilestoneModal(true)}
                  className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-full text-xs font-semibold transition"
                >
                  + Add Milestone
                </button>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full text-xs font-semibold shadow-xs transition"
                >
                  + New Project
                </button>
              </div>
            </div>

            {/* Pastel Milestones Cards */}
            <div className="bg-gradient-to-br from-purple-50/70 via-indigo-50/30 to-white rounded-3xl border border-purple-200/70 shadow-xs p-6">
              <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
                <Flag className="w-4 h-4 text-purple-600" />
                Active Project Milestones (PDF Module 6.3)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {milestones.map(m => (
                  <div key={m.id} className="p-5 rounded-2xl border border-purple-100 bg-white/90 hover:bg-white transition shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full border border-purple-200">
                        {m.projectCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        m.status === 'OVERDUE' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        'bg-sky-100 text-sky-800 border border-sky-200'
                      }`}>
                        {m.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs leading-snug mb-1">{m.title}</h4>
                    <p className="text-[11px] text-slate-500 mb-3">{m.description || 'Milestone deliverable'}</p>

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">Progress</span>
                        <span className="font-bold text-slate-700">{m.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full ${m.status === 'OVERDUE' ? 'bg-rose-500' : 'bg-purple-600'}`} 
                          style={{ width: `${m.progress}%` }} 
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-purple-100">
                      <span>Owner: <strong className="text-slate-700 font-semibold">{m.owner}</strong></span>
                      <span>Target: {m.targetDate || 'TBD'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Projects Table */}
            <div className="bg-gradient-to-br from-sky-50/70 via-blue-50/30 to-white rounded-3xl border border-sky-200/70 shadow-xs overflow-hidden">
              <div className="p-6 border-b border-sky-100">
                <h3 className="font-bold text-slate-900 text-sm">Enterprise Project Directory</h3>
              </div>
              <div className="overflow-x-auto bg-sky-50/20 backdrop-blur-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-sky-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-sky-100/40">
                      <th className="py-3 px-6">Code</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Lead</th>
                      <th className="py-3 px-4">Health</th>
                      <th className="py-3 px-4">Progress</th>
                      <th className="py-3 px-6 text-right">Target Due</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100/60">
                    {projects.map(p => (
                      <tr key={p.id} className="hover:bg-sky-50/30 transition">
                        <td className="py-3.5 px-6 font-mono text-xs font-bold text-sky-700">{p.code}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-900">{p.name}</td>
                        <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{p.description}</td>
                        <td className="py-3.5 px-4 text-slate-700">{p.lead}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            p.health === 'ON_TRACK' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            p.health === 'AT_RISK' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}>
                            {p.health.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{p.progress}%</td>
                        <td className="py-3.5 px-6 text-right text-slate-500">{p.dueDate || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: KANBAN TASK BOARD (PDF Module 6.4) - Distinct Pastel Columns */}
        {activeTab === 'kanban' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Kanban Task Board</h2>
                <p className="text-xs text-slate-500 mt-0.5">iOS Pastel status columns with points and mentor assignment</p>
              </div>
              <button
                onClick={() => setShowTaskModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-semibold shadow-xs transition"
              >
                + Add Task
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {columns.map((col, idx) => {
                const colTasks = tasks.filter(t => t.status === col.id);
                return (
                  <div key={col.id} className={`${col.tint} p-4 rounded-3xl border flex flex-col min-h-[500px] shadow-2xs`}>
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="font-bold text-xs uppercase tracking-wider">{col.title}</span>
                      <span className="text-[10px] font-extrabold bg-white text-slate-700 px-2 py-0.5 rounded-full shadow-xs border border-black/[0.04]">
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto">
                      {colTasks.map(t => (
                        <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-500">{t.code}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              t.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                              t.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                              'bg-sky-100 text-sky-800'
                            }`}>
                              {t.priority}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-slate-900 leading-snug mb-1">{t.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">{t.description}</p>

                          <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-xl mb-2.5 border border-slate-100">
                            <div>Mentee: <strong className="text-slate-800">{t.assignee}</strong></div>
                            <div>Mentor: {t.mentor || 'Priya Sharma'}</div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                            <span className="text-[10px] font-extrabold text-slate-700">{t.points} pts</span>
                            <div className="flex items-center gap-1">
                              {idx > 0 && (
                                <button
                                  onClick={() => moveTask(t.id, columns[idx - 1].id)}
                                  className="p-1 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
                                  title={`Move to ${columns[idx - 1].title}`}
                                >
                                  <ArrowLeft className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {idx < columns.length - 1 && (
                                <button
                                  onClick={() => moveTask(t.id, columns[idx + 1].id)}
                                  className="p-1 text-slate-400 hover:text-indigo-600 rounded-full hover:bg-slate-100 transition"
                                  title={`Move to ${columns[idx + 1].title}`}
                                >
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SERVICE DESK & SLA (Pastel Peach/Amber Theme) */}
        {activeTab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Service Desk &amp; SLA Engine</h2>
                <p className="text-xs text-slate-500 mt-0.5">Automated countdown timer, 75% resolution threshold alerts, and instant sign-off</p>
              </div>
              <button
                onClick={() => setShowTicketModal(true)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs font-semibold shadow-xs transition"
              >
                + Raise Incident
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tickets.map(t => (
                <div key={t.id} className={`p-5 rounded-3xl border shadow-xs transition ${
                  t.warning 
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50/60 border-amber-300 ring-2 ring-amber-200' 
                    : 'bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-white border-amber-200/70 hover:shadow-md'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900">{t.code}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        t.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        t.severity === 'HIGH' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-sky-100 text-sky-800 border border-sky-200'
                      }`}>
                        {t.severity}
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      t.status === 'RESOLVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      t.warning ? 'bg-amber-200 text-amber-900 animate-pulse border border-amber-300' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 mb-1">{t.subject}</h4>
                  <p className="text-[11px] text-slate-600 mb-3">{t.description}</p>

                  {/* SLA Progress Gauge */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500">SLA Resolution Window ({t.targetHours || 8}h)</span>
                      <span className={`font-bold ${t.warning ? 'text-amber-800' : 'text-slate-700'}`}>
                        {t.slaPercent || 0}% elapsed
                      </span>
                    </div>
                    <div className="w-full bg-amber-200/50 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full ${t.warning ? 'bg-amber-600' : 'bg-sky-600'}`} 
                        style={{ width: `${Math.min(t.slaPercent || 0, 100)}%` }} 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-amber-100 text-[11px] text-slate-600">
                    <span>Dept: <strong className="text-slate-800 font-semibold">{t.dept || 'Platform Core'}</strong></span>
                    {t.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => resolveTicket(t.id)}
                        className="px-3.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full font-bold border border-emerald-300 transition"
                      >
                        Resolve Ticket
                      </button>
                    ) : (
                      <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: APPROVALS & GOVERNANCE (Pastel Lilac/Violet Theme) */}
        {activeTab === 'approvals' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Enterprise Governance &amp; Approvals</h2>
                <p className="text-xs text-slate-500 mt-0.5">Review, sign-off or reject critical architecture and deployment requests</p>
              </div>
              <button
                onClick={() => setShowApprovalModal(true)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-xs font-semibold shadow-xs transition"
              >
                + Request Approval
              </button>
            </div>

            <div className="bg-gradient-to-br from-violet-50/70 via-indigo-50/30 to-white rounded-3xl border border-indigo-200/70 shadow-xs overflow-hidden">
              <div className="overflow-x-auto bg-violet-50/20 backdrop-blur-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-indigo-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-indigo-100/40">
                      <th className="py-3 px-6">Request Code</th>
                      <th className="py-3 px-4">Title &amp; Justification</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Project</th>
                      <th className="py-3 px-4">Requester</th>
                      <th className="py-3 px-4">Approver</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-indigo-100/60">
                    {approvals.map(a => (
                      <tr key={a.id} className="hover:bg-indigo-50/30 transition">
                        <td className="py-3.5 px-6 font-mono text-xs font-bold text-indigo-700">{a.code}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-900 block">{a.title}</span>
                          <span className="text-[11px] text-slate-500">{a.notes}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
                            {a.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-blue-600 font-bold">{a.projectCode}</td>
                        <td className="py-3.5 px-4 text-slate-700">{a.requester}</td>
                        <td className="py-3.5 px-4 text-slate-700 font-semibold">{a.approver}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            a.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                            a.status === 'REJECTED' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                            'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-6 text-right">
                          {a.status === 'PENDING' ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleApprove(a.id)}
                                className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-full font-bold border border-emerald-300 transition inline-flex items-center gap-1 text-[11px]"
                              >
                                <Check className="w-3 h-3" /> Approve
                              </button>
                              <button
                                onClick={() => handleReject(a.id)}
                                className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full font-bold border border-rose-300 transition inline-flex items-center gap-1 text-[11px]"
                              >
                                <X className="w-3 h-3" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs italic">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SQUAD WORKLOAD & MENTORSHIP */}
        {activeTab === 'workload' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Engineering Capacity &amp; Workload Balancer</h2>
                <p className="text-xs text-slate-500 mt-0.5">Calculates story points, weekly utilization and triggers burnout alerts when capacity &gt; 100%</p>
              </div>
              <div className="text-xs bg-indigo-100 text-indigo-800 px-3.5 py-1.5 rounded-full border border-indigo-200 font-semibold">
                Standard: 1 Story Point = 4 Engineering Hours
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamCapacity.map(dev => (
                <div key={dev.name} className={`p-6 rounded-3xl border shadow-xs transition ${
                  dev.status === 'OVERLOAD' 
                    ? 'bg-gradient-to-br from-rose-50 to-orange-50/60 border-rose-300 ring-2 ring-rose-200' 
                    : 'bg-gradient-to-br from-indigo-50/50 via-purple-50/20 to-white border-indigo-200/70 hover:shadow-md'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-700 to-purple-700 text-white font-bold text-sm flex items-center justify-center">
                        {dev.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{dev.name}</h4>
                        <p className="text-xs text-slate-500">Squad: {dev.team} &bull; Mentor: {dev.mentor}</p>
                      </div>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      dev.status === 'OVERLOAD' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                      dev.status === 'HEALTHY' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-sky-100 text-sky-800 border border-sky-200'
                    }`}>
                      {dev.percent}% Capacity
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Weekly Utilization</span>
                      <span>{dev.allocatedHours}h of {dev.maxHours || 40}h capacity</span>
                    </div>
                    <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          dev.status === 'OVERLOAD' ? 'bg-rose-500' :
                          dev.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-indigo-600'
                        }`}
                        style={{ width: `${Math.min(dev.percent, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200/60 text-xs">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200/70">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Active Story Points</span>
                      <span className="text-sm font-extrabold text-slate-800">{dev.activePoints} pts</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-emerald-100/60 border border-emerald-200">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase block">Completed Credits</span>
                      <span className="text-sm font-extrabold text-emerald-900">+{dev.completedPoints} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SECURITY AUDIT TRAIL */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Security Audit Trail &amp; Governance Log</h2>
                <p className="text-xs text-slate-500 mt-0.5">PDF Module 10: Immutable activity history, role changes, and compliance events</p>
              </div>
              <button 
                onClick={fetchAuditLogs}
                className="px-4 py-2 bg-slate-200/80 hover:bg-slate-300/80 text-slate-800 rounded-full text-xs font-semibold transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh Trail
              </button>
            </div>

            <div className="bg-gradient-to-br from-slate-100 via-zinc-50 to-white rounded-3xl border border-slate-300/70 shadow-xs overflow-hidden">
              <div className="overflow-x-auto bg-slate-100/40 backdrop-blur-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-200/50">
                      <th className="py-3 px-6">Timestamp</th>
                      <th className="py-3 px-4">Acting User</th>
                      <th className="py-3 px-4">Action Event</th>
                      <th className="py-3 px-4">Resource Target</th>
                      <th className="py-3 px-6">Event Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50 transition">
                        <td className="py-3.5 px-6 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                          {log.createdAt ? log.createdAt.replace('T', ' ').substring(0, 19) : 'Just now'}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-800">{log.username}</td>
                        <td className="py-3.5 px-4">
                          <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700 font-bold">{log.target || 'N/A'}</td>
                        <td className="py-3.5 px-6 text-slate-600">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          APPLE / SHADCN INSPIRED MODAL DIALOGS
          ========================================================================= */}

      {/* 1. CREATE PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#FAFBFD] rounded-3xl shadow-2xl max-w-lg w-full border border-sky-100 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-xl">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Create New Project</h3>
                  <p className="text-[11px] text-slate-500">Initiate enterprise project container</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProjectModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Project Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PRJ-201"
                    value={newProject.code}
                    onChange={e => setNewProject({ ...newProject, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Project Lead *</label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={newProject.lead}
                    onChange={e => setNewProject({ ...newProject, lead: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Notification Service"
                  value={newProject.name}
                  onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Target Due Date</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={e => setNewProject({ ...newProject, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Description</label>
                <textarea
                  rows="3"
                  placeholder="Summarize project goals, architecture scope, and deliverables..."
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-bold shadow-xs transition"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. ADD MILESTONE MODAL */}
      {showMilestoneModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#FAFBFD] rounded-3xl shadow-2xl max-w-lg w-full border border-purple-100 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
                  <Flag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Add Project Milestone</h3>
                  <p className="text-[11px] text-slate-500">PDF Module 6.3 roadmap deliverable</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMilestoneModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateMilestone} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Project Code *</label>
                  <select
                    value={newMilestone.projectCode}
                    onChange={e => setNewMilestone({ ...newMilestone, projectCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-slate-900 text-xs"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.code}>{p.code} - {p.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Owner *</label>
                  <input
                    type="text"
                    required
                    placeholder="Milestone owner"
                    value={newMilestone.owner}
                    onChange={e => setNewMilestone({ ...newMilestone, owner: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zero-Downtime Data Migration Completed"
                  value={newMilestone.title}
                  onChange={e => setNewMilestone({ ...newMilestone, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Target Date</label>
                  <input
                    type="date"
                    value={newMilestone.targetDate}
                    onChange={e => setNewMilestone({ ...newMilestone, targetDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Initial Progress %</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newMilestone.progress}
                    onChange={e => setNewMilestone({ ...newMilestone, progress: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMilestoneModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-bold shadow-xs transition"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD TASK MODAL */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#FAFBFD] rounded-3xl shadow-2xl max-w-lg w-full border border-indigo-100 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Add Kanban Task</h3>
                  <p className="text-[11px] text-slate-500">Assign task, story points, and mentorship oversight</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTaskModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Implement HikariCP connection leak detection"
                  value={newTask.title}
                  onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              {/* Priority Segmented Control */}
              <div>
                <label className="font-bold text-slate-700 mb-1.5 block text-[11px]">Priority</label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
                  {['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setNewTask({ ...newTask, priority: p })}
                      className={`py-1.5 rounded-xl text-center font-bold text-[10px] transition ${
                        newTask.priority === p 
                          ? (p === 'CRITICAL' ? 'bg-rose-600 text-white shadow-xs' :
                             p === 'HIGH' ? 'bg-amber-500 text-white shadow-xs' :
                             p === 'LOW' ? 'bg-slate-700 text-white shadow-xs' :
                             'bg-indigo-600 text-white shadow-xs')
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fibonacci Points Selector */}
              <div>
                <label className="font-bold text-slate-700 mb-1.5 block text-[11px]">
                  Story Points (1 pt = 4h effort)
                </label>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
                  {[1, 2, 3, 5, 8, 13].map(pts => (
                    <button
                      type="button"
                      key={pts}
                      onClick={() => setNewTask({ ...newTask, points: pts })}
                      className={`flex-1 py-1.5 rounded-xl text-center font-bold text-xs transition ${
                        newTask.points === pts
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {pts}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Mentee / Assignee *</label>
                  <input
                    type="text"
                    required
                    placeholder="Yuvraj Singh"
                    value={newTask.assignee}
                    onChange={e => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Senior Mentor</label>
                  <input
                    type="text"
                    placeholder="Priya Sharma"
                    value={newTask.mentor}
                    onChange={e => setNewTask({ ...newTask, mentor: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xs transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. RAISE INCIDENT TICKET MODAL */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#FAFBFD] rounded-3xl shadow-2xl max-w-lg w-full border border-amber-100 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Raise Service Desk Incident</h3>
                  <p className="text-[11px] text-slate-500">Initiate automated SLA countdown &amp; 75% warning</p>
                </div>
              </div>
              <button 
                onClick={() => setShowTicketModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Incident Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Database connection pool timeout during peak load"
                  value={newTicket.subject}
                  onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              {/* Severity Segmented Control */}
              <div>
                <label className="font-bold text-slate-700 mb-1.5 block text-[11px]">Severity &amp; SLA Target</label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200/80">
                  {[
                    { s: 'LOW', h: 24 },
                    { s: 'MEDIUM', h: 8 },
                    { s: 'HIGH', h: 4 },
                    { s: 'CRITICAL', h: 2 }
                  ].map(item => (
                    <button
                      type="button"
                      key={item.s}
                      onClick={() => setNewTicket({ ...newTicket, severity: item.s, targetHours: item.h })}
                      className={`py-2 rounded-xl text-center font-bold text-[10px] transition ${
                        newTicket.severity === item.s
                          ? (item.s === 'CRITICAL' ? 'bg-rose-600 text-white shadow-xs' :
                             item.s === 'HIGH' ? 'bg-amber-500 text-white shadow-xs' :
                             item.s === 'LOW' ? 'bg-slate-700 text-white shadow-xs' :
                             'bg-indigo-600 text-white shadow-xs')
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <span className="block">{item.s}</span>
                      <span className="text-[9px] opacity-80 block">{item.h}h SLA</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Reporter *</label>
                  <input
                    type="text"
                    required
                    placeholder="Operations Desk"
                    value={newTicket.reporter}
                    onChange={e => setNewTicket({ ...newTicket, reporter: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Department</label>
                  <select
                    value={newTicket.dept}
                    onChange={e => setNewTicket({ ...newTicket, dept: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 text-xs"
                  >
                    <option value="Platform Core">Platform Core</option>
                    <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                    <option value="Security & Auth">Security &amp; Auth</option>
                    <option value="Operations Desk">Operations Desk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Incident Details</label>
                <textarea
                  rows="3"
                  placeholder="Stack trace, client impact, reproduction steps..."
                  value={newTicket.description}
                  onChange={e => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTicketModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold shadow-xs transition"
                >
                  Raise Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. REQUEST APPROVAL MODAL */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#FAFBFD] rounded-3xl shadow-2xl max-w-lg w-full border border-indigo-100 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">New Governance Approval Request</h3>
                  <p className="text-[11px] text-slate-500">PDF Module 6.6 change management sign-off</p>
                </div>
              </div>
              <button 
                onClick={() => setShowApprovalModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateApproval} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Request Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Deploy HikariCP pool resizing to Staging environment"
                  value={newApproval.title}
                  onChange={e => setNewApproval({ ...newApproval, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Category</label>
                  <select
                    value={newApproval.category}
                    onChange={e => setNewApproval({ ...newApproval, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                  >
                    <option value="DEPLOYMENT">DEPLOYMENT</option>
                    <option value="ARCHITECTURE">ARCHITECTURE</option>
                    <option value="BUDGET">BUDGET</option>
                    <option value="SECURITY">SECURITY</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Project Code</label>
                  <select
                    value={newApproval.projectCode}
                    onChange={e => setNewApproval({ ...newApproval, projectCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.code}>{p.code}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Requester *</label>
                  <input
                    type="text"
                    required
                    placeholder="Yuvraj Singh"
                    value={newApproval.requester}
                    onChange={e => setNewApproval({ ...newApproval, requester: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 mb-1 block text-[11px]">Approver *</label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={newApproval.approver}
                    onChange={e => setNewApproval({ ...newApproval, approver: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 mb-1 block text-[11px]">Justification &amp; Notes</label>
                <textarea
                  rows="3"
                  placeholder="State technical reasons, rollback strategy, and impact..."
                  value={newApproval.notes}
                  onChange={e => setNewApproval({ ...newApproval, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-xs transition"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-slate-500 border-t border-slate-200/60">
        Enterprise Project &amp; Service Management Platform &bull; Java 24 Pure ORM &bull; React 18 &bull; H2 / PostgreSQL
      </footer>
    </div>
  );
}

export default App;
