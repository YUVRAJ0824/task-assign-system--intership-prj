import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle,
  Layers, 
  FolderKanban, 
  Clock, 
  Users, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Calendar,
  Sparkles,
  ListTodo,
  ChevronRight
} from 'lucide-react';

function App() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeWeek, setActiveWeek] = useState(1);

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
      setHealthStatus({ status: 'OFFLINE', note: 'Start Spring Boot on port 8080' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const weeklyPlan = [
    {
      week: 1,
      title: "Week 1: Scaffolding, Security & Projects",
      percent: "5% -> 25%",
      days: [
        { day: 1, percent: "5%", title: "Project Scaffolding & Git Governance", done: true, desc: "Git repo initialized, .gitignore (struct img ignored), Spring Boot 3 API baseline, React 18 UI, ApiResponse standard DTO, and Global Exception Handler." },
        { day: 2, percent: "10%", title: "Persistence Layer & Base Entities", done: false, desc: "PostgreSQL & H2 dual profile, JPA Auditing, BaseEntity with createdAt/updatedAt." },
        { day: 3, percent: "15%", title: "User Entity & Role RBAC", done: false, desc: "5 Personas: Admin, PM, Team Lead, Member, Service Agent. BCrypt password hashing." },
        { day: 4, percent: "20%", title: "Stateless JWT Auth Engine", done: false, desc: "JwtTokenProvider, JwtAuthFilter, /api/v1/auth/login and register endpoints." },
        { day: 5, percent: "25%", title: "Project Portfolio Domain", done: false, desc: "Project Entity, CRUD REST API, auto health score indicators (ON_TRACK, AT_RISK, DELAYED)." }
      ]
    },
    {
      week: 2,
      title: "Week 2: Core Business Logic & Engines",
      percent: "30% -> 50%",
      days: [
        { day: 6, percent: "30%", title: "Kanban Task Engine Backend", done: false, desc: "Task model, Backlog to Done status transitions, effort points, PATCH /status API." },
        { day: 7, percent: "35%", title: "Service Desk Ticketing Subsystem", done: false, desc: "ServiceTicket entity, Severity categorization (Low to Critical), ticket lifecycle." },
        { day: 8, percent: "40%", title: "Real-Time SLA Countdown Engine", done: false, desc: "SLA calculation service, response/resolution timers, 75% warning threshold trigger." },
        { day: 9, percent: "45%", title: "Workload & Capacity Balancing Engine", done: false, desc: "Weekly developer capacity calculation, burnout alert flag (>100% utilization)." },
        { day: 10, percent: "50%", title: "Swagger Documentation & Integration Tests", done: false, desc: "OpenAPI Swagger live UI, MockMvc tests for Auth and Projects, Postman collection." }
      ]
    },
    {
      week: 3,
      title: "Week 3: React SPA & Interactive Kanban",
      percent: "55% -> 75%",
      days: [
        { day: 11, percent: "55%", title: "Frontend Layout Shell & Routing", done: false, desc: "React Router, responsive sidebar, top navbar, Axios client with JWT interceptor." },
        { day: 12, percent: "60%", title: "Authentication UI & Protected Routes", done: false, desc: "Login & Signup pages, AuthContext, role guard wrappers for restricted views." },
        { day: 13, percent: "65%", title: "Executive Dashboard Overview", done: false, desc: "KPI stat cards (Projects, Tasks, Tickets, Utilization), quick action modals." },
        { day: 14, percent: "70%", title: "Interactive Drag-and-Drop Kanban Board", done: false, desc: "Status columns, draggable task cards, inline task creator, detail inspection drawer." },
        { day: 15, percent: "75%", title: "Project Portfolio View", done: false, desc: "Project card grid, health status pills, milestone completion progress bars." }
      ]
    },
    {
      week: 4,
      title: "Week 4: SLA Gauges, Analytics & Release",
      percent: "80% -> 100%",
      days: [
        { day: 16, percent: "80%", title: "Service Desk Portal & SLA Gauges", done: false, desc: "Ticket queue table, animated real-time SLA countdown bar, breach alerts." },
        { day: 17, percent: "85%", title: "Developer Workload Matrix UI", done: false, desc: "Weekly hours allocation matrix, color-coded capacity meter, burnout warning pills." },
        { day: 18, percent: "90%", title: "Executive Analytics & Recharts", done: false, desc: "Interactive charts for project health distribution, SLA compliance trends, CSV audit export." },
        { day: 19, percent: "95%", title: "Full-Stack Wiring & UI Polish", done: false, desc: "Toast notifications, loading skeletons, error boundaries, complete role validation." },
        { day: 20, percent: "100%", title: "Dockerization & Final Submission", done: false, desc: "Multi-container Docker Compose, seed demo data, GitHub Actions CI pipeline, ready for demo!" }
      ]
    }
  ];

  const currentWeek = weeklyPlan.find(w => w.week === activeWeek) || weeklyPlan[0];

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
              Day 1 Complete (5%)
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
              <Sparkles className="w-4 h-4" /> 4-Week Implementation Roadmap (5% Progress / Day)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Enterprise Project &amp; Service Management Platform
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Unified Jira-style task governance and ServiceNow-style IT ticketing with real-time SLA countdown engines and developer workload balancing.
            </p>

            {/* Overall Progress Bar */}
            <div className="pt-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-blue-200">
                <span>Overall Project Completion (Target: 20 Days)</span>
                <span>5% / 100%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3.5 overflow-hidden">
                <div 
                  className="bg-emerald-400 h-3.5 rounded-full transition-all duration-700" 
                  style={{ width: '5%' }}
                ></div>
              </div>
              <p className="text-xs text-blue-300">
                🚀 Day 1 (5%) Completed: Clean Git setup with .gitignore (struct img ignored), Spring Boot 3 foundation, React 18 UI &amp; 4-Week Plan.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Week Interactive TO-DO List */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-xl">4-Week Daily TO-DO Master Plan</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Each day delivers exactly 5% of functionality (Basic to Mid-Level to Production).
              </p>
            </div>

            {/* Week Selector Tabs */}
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              {weeklyPlan.map((w) => (
                <button
                  key={w.week}
                  onClick={() => setActiveWeek(w.week)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeWeek === w.week
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Week {w.week}
                </button>
              ))}
            </div>
          </div>

          {/* Active Week Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <h4 className="font-semibold text-slate-900">{currentWeek.title}</h4>
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-600">
                {currentWeek.percent}
              </span>
            </div>

            <div className="space-y-3">
              {currentWeek.days.map((d) => (
                <div 
                  key={d.day}
                  className={`p-4 rounded-xl border transition flex items-start gap-4 ${
                    d.done 
                      ? 'bg-emerald-50/50 border-emerald-200' 
                      : d.day === 2 
                        ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300' 
                        : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    {d.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">Day {d.day} ({d.percent})</span>
                        <h5 className="text-sm font-semibold text-slate-900">{d.title}</h5>
                      </div>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        d.done 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : d.day === 2 
                            ? 'bg-amber-100 text-amber-800 font-bold' 
                            : 'bg-slate-100 text-slate-500'
                      }`}>
                        {d.done ? 'Completed' : d.day === 2 ? 'Next Up (Tomorrow)' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status & Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Day 1 Deliverables Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Delivered Today</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Day 1 (5%) Complete
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Today's Milestone Artifacts</h3>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>.gitignore:</strong> Configured to skip `struct img`, PDFs, target &amp; node_modules</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Spring Boot 3:</strong> ApiResponse DTO, GlobalExceptionHandler, SecurityConfig</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>React 18 + Vite:</strong> Clean UI with interactive 4-Week Roadmap</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>TODO.md:</strong> Complete 4-week 20-day checklist in root</span>
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
              <Activity className="w-5 h-5 text-blue-600" /> Live Health Endpoint
            </h3>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
              {loading ? (
                <span>Checking API health...</span>
              ) : healthStatus ? (
                <div>
                  <div className="font-semibold text-emerald-600">● {healthStatus.data?.status || 'UP'}</div>
                  <div className="text-[11px] text-slate-500 mt-1">{healthStatus.message || 'System operational'}</div>
                </div>
              ) : (
                <span className="text-slate-400">Run backend to ping</span>
              )}
            </div>
            <button
              onClick={checkHealth}
              className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition"
            >
              Ping /api/v1/health
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
