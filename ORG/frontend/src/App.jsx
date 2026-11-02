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

  // 1. Available Enterprise Personas (Indian names per user requirement)
  const personas = [
    { name: 'Yuvraj Singh', role: 'ROLE_TEAM_MEMBER', title: 'Senior Java Backend Engineer (Mentee)', team: 'Platform Core', mentor: 'Priya Sharma' },
    { name: 'Priya Sharma', role: 'ROLE_PROJECT_MANAGER', title: 'Project Lead & Lead Architect', team: 'Platform Architecture', mentor: 'Self / Lead' },
    { name: 'Rohit Verma', role: 'ROLE_TEAM_LEAD', title: 'DevOps & Cloud Lead', team: 'Cloud Infrastructure', mentor: 'Priya Sharma' },
    { name: 'Neha Patel', role: 'ROLE_SERVICE_AGENT', title: 'Security & Service Desk Specialist', team: 'Security & Auth', mentor: 'Priya Sharma' },
    { name: 'Admin', role: 'ROLE_ADMIN', title: 'Enterprise Administrator', team: 'Executive Administration', mentor: 'Board' }
  ];

  const [activeEmp, setActiveEmp] = useState(personas[0]);

  // 2. Projects state
  const [projects, setProjects] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ code: '', name: '', lead: 'Priya Sharma', dueDate: '', description: '' });

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

  const refreshAll = () => {
    checkHealth();
    fetchProjects();
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

  // Instant online check
  const isOnline = healthStatus?.status === 'UP' || healthStatus?.status === 'ONLINE' || healthStatus?.service != null || projects.length > 0;
  const onTrackCount = projects.filter(p => p.health === 'ON_TRACK').length;

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-slate-800 flex flex-col font-sans selection:bg-blue-500/10 selection:text-blue-600">
      
      {/* Apple-style Frosted Glass Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/75 border-b border-black/[0.05] transition-all">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-slate-900">
                  Enterprise Project &amp; Service Platform
                </span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full border border-black/[0.04]">
                  Production ORG
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Pure JPA ORM &bull; Role-Based Architecture &bull; Multi-Squad</p>
            </div>
          </div>

          {/* Right Header: Active Persona Switcher & Live Status */}
          <div className="flex items-center gap-3">
            {/* Persona Switcher Dropdown (Apple style) */}
            <div className="flex items-center gap-2 bg-slate-100/80 hover:bg-slate-100 border border-black/[0.04] rounded-full px-3 py-1 transition">
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">
                {activeEmp.name.split(' ').map(n => n[0]).join('')}
              </div>
              <select
                value={activeEmp.name}
                onChange={e => {
                  const selected = personas.find(p => p.name === e.target.value);
                  if (selected) setActiveEmp(selected);
                }}
                className="bg-transparent text-xs font-medium text-slate-700 focus:outline-hidden cursor-pointer"
              >
                {personas.map(p => (
                  <option key={p.name} value={p.name}>
                    {p.name} ({p.team})
                  </option>
                ))}
              </select>
            </div>

            {/* Connection Status Pill */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium ${
              isOnline
                ? 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20'
                : 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              {isOnline ? 'Online (8080)' : 'Connecting...'}
            </span>

            <button 
              onClick={refreshAll}
              disabled={loadingHealth}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/50 transition"
              title="Refresh All APIs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Apple-style Segmented Navigation Bar */}
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between border-t border-black/[0.03]">
          <div className="flex gap-1.5 bg-slate-200/50 p-1 rounded-full border border-black/[0.03] overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition ${
                activeTab === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              Executive Dashboard
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition ${
                activeTab === 'projects'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
              }`}
            >
              <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
              Project Portfolio ({projects.length})
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
            <span>Active Persona: <strong className="text-slate-700 font-medium">{activeEmp.name}</strong></span>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="max-w-7xl mx-auto px-6 py-6 w-full flex-1">
        <div className="space-y-6">

          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Active Projects</span>
                <FolderKanban className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-3xl font-bold tracking-tight text-slate-900">{projects.length}</div>
              <div className="text-[11px] text-emerald-600 mt-2 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {onTrackCount} projects on track
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Logged In Persona</span>
                <User className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-xl font-bold tracking-tight text-slate-900">{activeEmp.name}</div>
              <div className="text-[11px] text-slate-400 mt-2">{activeEmp.title}</div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Security Architecture</span>
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-xl font-bold tracking-tight text-slate-900">5 RBAC Roles</div>
              <div className="text-[11px] text-emerald-600 mt-2 font-medium">Stateless JWT + BCrypt Active</div>
            </div>
          </div>

          {/* Project Portfolio Table */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-black/[0.04] shadow-xs overflow-hidden">
            <div className="p-6 border-b border-black/[0.04] flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Enterprise Project Portfolio</h3>
                <p className="text-xs text-slate-400 mt-0.5">High-level status, health metrics, and deliverables</p>
              </div>
              <button
                onClick={() => setShowProjectModal(true)}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold shadow-xs transition"
              >
                + New Project
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-black/[0.04] text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50">
                    <th className="py-3 px-6">Code</th>
                    <th className="py-3 px-4">Project Title</th>
                    <th className="py-3 px-4">Lead</th>
                    <th className="py-3 px-4">Health</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-6 text-right">Target Due Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.03]">
                  {projects.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition">
                      <td className="py-3.5 px-6 font-mono text-xs font-semibold text-blue-600">{p.code}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{p.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{p.lead}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                          p.health === 'ON_TRACK' ? 'bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20' :
                          p.health === 'AT_RISK' ? 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20' :
                          'bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20'
                        }`}>
                          {p.health.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${p.progress}%` }} />
                          </div>
                          <span className="text-slate-600 font-semibold">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-6 text-right text-slate-400">{p.dueDate || 'Sprint End'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>

      {/* CREATE PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-lg w-full border border-black/[0.06] overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Create New Project</h3>
                  <p className="text-[11px] text-slate-400">Initiate enterprise project container</p>
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
                  <label className="font-semibold text-slate-700 mb-1 block text-[11px]">Project Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PRJ-201"
                    value={newProject.code}
                    onChange={e => setNewProject({ ...newProject, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-100/60 border border-black/[0.04] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block text-[11px]">Project Lead *</label>
                  <input
                    type="text"
                    required
                    placeholder="Priya Sharma"
                    value={newProject.lead}
                    onChange={e => setNewProject({ ...newProject, lead: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-100/60 border border-black/[0.04] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block text-[11px]">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Notification Service"
                  value={newProject.name}
                  onChange={e => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-100/60 border border-black/[0.04] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block text-[11px]">Target Due Date</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={e => setNewProject({ ...newProject, dueDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-100/60 border border-black/[0.04] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block text-[11px]">Description</label>
                <textarea
                  rows="3"
                  placeholder="Summarize project goals, architecture scope, and deliverables..."
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-100/60 border border-black/[0.04] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-black/[0.04] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-full font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-xs transition"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apple-style Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-slate-400 border-t border-black/[0.03]">
        Enterprise Project &amp; Service Management Platform &bull; Java 24 Pure ORM &bull; React 18 &bull; H2 / PostgreSQL
      </footer>
    </div>
  );
}

export default App;
