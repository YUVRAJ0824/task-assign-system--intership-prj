import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  FolderKanban, 
  Clock, 
  Users, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Calendar,
  Sparkles
} from 'lucide-react';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/health');
      if (response.ok) {
        const data = await response.json();
        setHealthStatus(data);
      } else {
        setHealthStatus({ status: 'OFFLINE', error: 'Backend not started' });
      }
    } catch {
      setHealthStatus({ status: 'OFFLINE', note: 'Start Spring Boot at port 8080' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const modules = [
    {
      title: "Project & Milestones",
      desc: "Governance, project health indicators (ON_TRACK, AT_RISK), completion tracking.",
      icon: FolderKanban,
      color: "text-blue-600 bg-blue-50 border-blue-200",
      day: "Days 5, 15",
    },
    {
      title: "Interactive Kanban",
      desc: "Drag-and-drop task workflow from Backlog to Done with effort estimates.",
      icon: Layers,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
      day: "Days 6, 14",
    },
    {
      title: "SLA Countdown Engine",
      desc: "Real-time ticket response & resolution timers with automated 75% alerts.",
      icon: Clock,
      color: "text-amber-600 bg-amber-50 border-amber-200",
      day: "Days 8, 16",
    },
    {
      title: "Resource & Workload",
      desc: "Weekly developer capacity matrix, utilization rate, and burnout warnings.",
      icon: Users,
      color: "text-purple-600 bg-purple-50 border-purple-200",
      day: "Days 9, 17",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              EP
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 leading-tight">Enterprise Platform</h1>
              <p className="text-xs text-slate-500">Project Governance &amp; IT Service Desk</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Day 1 Progress: 5% Completed
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold bg-white/10 backdrop-blur border border-white/20 text-blue-200">
              <Sparkles className="w-4 h-4" /> 20-Day Daily Roadmap (5% / Day)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Project &amp; Service Management Platform
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Unified Jira-style task governance and ServiceNow-style IT ticketing with real-time SLA countdown engines and developer workload balancing.
            </p>

            {/* Progress Bar */}
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-blue-200">
                <span>Overall Completion</span>
                <span>5% / 100%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-3 rounded-full transition-all duration-700" 
                  style={{ width: '5%' }}
                ></div>
              </div>
              <p className="text-xs text-blue-300">
                🚀 Day 1: Architecture, Git ready (.gitignore), Backend &amp; Frontend Foundation Initialized!
              </p>
            </div>
          </div>
        </div>

        {/* Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Day 1 Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Milestone</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                Day 1 (5%)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg">System Scaffolding</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Git repo configured &amp; struct img ignored</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Spring Boot 3 REST API scaffolding</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>React 18 + Vite + Tailwind CSS UI</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>20-Day 5% progression tracking plan</span>
              </li>
            </ul>
          </div>

          {/* Backend Status Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Backend API</span>
              <span className="text-xs text-slate-500">Port 8080</span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" /> API Gateway
            </h3>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
              {loading ? (
                <span>Checking API health...</span>
              ) : healthStatus ? (
                <div>
                  <div className="font-semibold text-emerald-600">● {healthStatus.status || 'Active'}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{healthStatus.application || 'Spring Boot API'}</div>
                </div>
              ) : (
                <span className="text-slate-400">Run backend to ping</span>
              )}
            </div>
            <button
              onClick={checkHealth}
              className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition"
            >
              Re-check Health Endpoint
            </button>
          </div>

          {/* Next Up Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Next Milestone</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Day 2 (10%)
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Persistence &amp; Schemas</h3>
            <p className="text-xs text-slate-600">
              Next 5% deliverable: PostgreSQL + H2 schema configurations, JPA Auditing, entity relationship models, and database migration scripts.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                Estimated 20-day delivery <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* Core Architecture Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Core Platform Modules</h3>
            <span className="text-xs text-slate-500">Scheduled across Days 3–20</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{m.title}</h4>
                    <span className="text-[11px] font-medium text-slate-400">{m.day}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security & RBAC preview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Role-Based Access Control (5 Personas)</h4>
              <p className="text-xs text-slate-500">
                Admin, Project Manager, Team Lead, Team Member, Service Agent with Spring Security 6 &amp; stateless JWT.
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold shrink-0">
            Scheduled for Days 3 &amp; 4
          </span>
        </div>
      </main>
    </div>
  );
}

export default App;
