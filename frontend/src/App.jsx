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
  ListTodo
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
        setHealthStatus({ status: 'OFFLINE', error: 'Backend offline' });
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
      title: "Week 1: Scaffolding, Security and Projects",
      percent: "5% - 25%",
      days: [
        { day: 1, percent: "5%", title: "Project Scaffolding and Git Governance", done: true, desc: "Git repo initialized, .gitignore (struct img and TODO ignored), Spring Boot 3 API baseline, React 18 UI, ApiResponse standard DTO, and Global Exception Handler." },
        { day: 2, percent: "10%", title: "Persistence Layer and Base Entities", done: false, desc: "PostgreSQL and H2 dual profile, JPA Auditing, BaseEntity with createdAt/updatedAt." },
        { day: 3, percent: "15%", title: "User Entity and Role RBAC", done: false, desc: "5 Personas: Admin, PM, Team Lead, Member, Service Agent. BCrypt password hashing." },
        { day: 4, percent: "20%", title: "Stateless JWT Auth Engine", done: false, desc: "JwtTokenProvider, JwtAuthFilter, /api/v1/auth/login and register endpoints." },
        { day: 5, percent: "25%", title: "Project Portfolio Domain", done: false, desc: "Project Entity, CRUD REST API, auto health score indicators (ON_TRACK, AT_RISK, DELAYED)." }
      ]
    },
    {
      week: 2,
      title: "Week 2: Core Business Logic and Engines",
      percent: "30% - 50%",
      days: [
        { day: 6, percent: "30%", title: "Kanban Task Engine Backend", done: false, desc: "Task model, Backlog to Done status transitions, effort points, PATCH /status API." },
        { day: 7, percent: "35%", title: "Service Desk Ticketing Subsystem", done: false, desc: "ServiceTicket entity, Severity categorization (Low to Critical), ticket lifecycle." },
        { day: 8, percent: "40%", title: "Real-Time SLA Countdown Engine", done: false, desc: "SLA calculation service, response/resolution timers, 75% warning threshold trigger." },
        { day: 9, percent: "45%", title: "Workload and Capacity Balancing Engine", done: false, desc: "Weekly developer capacity calculation, burnout alert flag (>100% utilization)." },
        { day: 10, percent: "50%", title: "Swagger Documentation and Integration Tests", done: false, desc: "OpenAPI Swagger live UI, MockMvc tests for Auth and Projects, Postman collection." }
      ]
    },
    {
      week: 3,
      title: "Week 3: React SPA and Interactive Kanban",
      percent: "55% - 75%",
      days: [
        { day: 11, percent: "55%", title: "Frontend Layout Shell and Routing", done: false, desc: "React Router, responsive sidebar, top navbar, Axios client with JWT interceptor." },
        { day: 12, percent: "60%", title: "Authentication UI and Protected Routes", done: false, desc: "Login and Signup pages, AuthContext, role guard wrappers for restricted views." },
        { day: 13, percent: "65%", title: "Executive Dashboard Overview", done: false, desc: "KPI stat cards (Projects, Tasks, Tickets, Utilization), quick action modals." },
        { day: 14, percent: "70%", title: "Interactive Drag-and-Drop Kanban Board", done: false, desc: "Status columns, draggable task cards, inline task creator, detail inspection drawer." },
        { day: 15, percent: "75%", title: "Project Portfolio View", done: false, desc: "Project card grid, health status pills, milestone completion progress bars." }
      ]
    },
    {
      week: 4,
      title: "Week 4: SLA Gauges, Analytics and Release",
      percent: "80% - 100%",
      days: [
        { day: 16, percent: "80%", title: "Service Desk Portal and SLA Gauges", done: false, desc: "Ticket queue table, animated real-time SLA countdown bar, breach alerts." },
        { day: 17, percent: "85%", title: "Developer Workload Matrix UI", done: false, desc: "Weekly hours allocation matrix, color-coded capacity meter, burnout warning pills." },
        { day: 18, percent: "90%", title: "Executive Analytics and Recharts", done: false, desc: "Interactive charts for project health distribution, SLA compliance trends, CSV audit export." },
        { day: 19, percent: "95%", title: "Full-Stack Wiring and UI Polish", done: false, desc: "Toast notifications, loading skeletons, error boundaries, complete role validation." },
        { day: 20, percent: "100%", title: "Dockerization and Final Submission", done: false, desc: "Multi-container Docker Compose, seed demo data, GitHub Actions CI pipeline, ready for demo." }
      ]
    }
  ];

  const currentWeek = weeklyPlan.find(w => w.week === activeWeek) || weeklyPlan[0];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Top Navbar */}
      <header className="border-b border-slate-300 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-white font-bold text-sm">
              EP
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 text-sm leading-tight">Enterprise Platform</h1>
              <p className="text-[11px] text-slate-500">Project Governance and Service Desk</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-300">
              Day 1 Complete (5%)
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Summary Box */}
        <div className="bg-slate-900 text-white rounded-lg p-6 shadow-sm space-y-4">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              4-Week Implementation Plan (5% Daily)
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Enterprise Project and Service Management Platform
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Unified task governance and IT ticketing with real-time SLA countdown engines and developer workload balancing.
            </p>

            {/* Overall Progress Bar */}
            <div className="pt-3 space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-300">
                <span>Overall Completion</span>
                <span>5% / 100%</span>
              </div>
              <div className="w-full bg-slate-800 rounded h-2.5 overflow-hidden border border-slate-700">
                <div 
                  className="bg-slate-300 h-2.5 rounded transition-all duration-500" 
                  style={{ width: '5%' }}
                ></div>
              </div>
              <p className="text-[11px] text-slate-400">
                Day 1 (5%) Completed: Git configured, .gitignore set, Spring Boot 3 baseline, React 18 UI.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Week TO-DO List */}
        <div className="bg-white rounded-lg border border-slate-300 shadow-sm p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-slate-700" />
                <h3 className="font-semibold text-slate-900 text-base">4-Week Daily TO-DO Plan</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Each day covers 5% functionality from basic setup to mid-level architecture.
              </p>
            </div>

            {/* Week Selector Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded border border-slate-200">
              {weeklyPlan.map((w) => (
                <button
                  key={w.week}
                  onClick={() => setActiveWeek(w.week)}
                  className={`px-3 py-1 rounded text-xs font-medium transition ${
                    activeWeek === w.week
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Week {w.week}
                </button>
              ))}
            </div>
          </div>

          {/* Active Week Details */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <h4 className="font-semibold text-slate-900">{currentWeek.title}</h4>
              <span className="font-mono text-slate-500">
                {currentWeek.percent}
              </span>
            </div>

            <div className="space-y-2">
              {currentWeek.days.map((d) => (
                <div 
                  key={d.day}
                  className={`p-3.5 rounded border transition flex items-start gap-3 ${
                    d.done 
                      ? 'bg-slate-50 border-slate-300' 
                      : d.day === 2 
                        ? 'bg-white border-slate-400 ring-1 ring-slate-400' 
                        : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    {d.done ? (
                      <CheckCircle2 className="w-4 h-4 text-slate-800" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900">Day {d.day} ({d.percent})</span>
                        <span className="text-xs font-medium text-slate-800">{d.title}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                        d.done 
                          ? 'bg-slate-200 text-slate-800' 
                          : d.day === 2 
                            ? 'bg-slate-800 text-white' 
                            : 'bg-slate-100 text-slate-500'
                      }`}>
                        {d.done ? 'Done' : d.day === 2 ? 'Next (Day 2)' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {d.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deliverables and Health Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-sm space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Day 1 Deliverables</span>
            <h3 className="font-semibold text-slate-900 text-sm">Completed Today (5%)</h3>
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Git configured with .gitignore (struct img, TODO.md ignored)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>Spring Boot 3: ApiResponse, GlobalExceptionHandler, SecurityConfig</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>React 18 + Vite: Clean UI with 4-Week plan</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                <span>README updated with GitHub clone and push instructions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Backend API</span>
              <span className="text-xs text-slate-500">Port 8080</span>
            </div>
            <h3 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-700" /> System Health Status
            </h3>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
              {loading ? (
                <span>Checking API health...</span>
              ) : healthStatus ? (
                <div>
                  <div className="font-semibold text-slate-900">Status: {healthStatus.data?.status || 'UP'}</div>
                  <div className="text-[11px] text-slate-500">{healthStatus.message || 'System operational'}</div>
                </div>
              ) : (
                <span className="text-slate-400">Backend not running on port 8080</span>
              )}
            </div>
            <button
              onClick={checkHealth}
              className="w-full py-1.5 px-3 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 text-slate-800 transition"
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
