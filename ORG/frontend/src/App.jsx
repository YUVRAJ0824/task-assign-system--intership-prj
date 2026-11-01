import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Layers, 
  Clock, 
  Users, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  // ping spring boot backend
  const checkHealth = async () => {
    setLoadingHealth(true);
    try {
      const response = await fetch('/api/v1/health');
      if (response.ok) {
        const data = await response.json();
        setHealthStatus(data);
      } else {
        setHealthStatus({ status: 'OFFLINE', msg: 'Backend offline' });
      }
    } catch {
      setHealthStatus({ status: 'OFFLINE', msg: 'Spring Boot not running on port 8080' });
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  // sample project data
  const projects = [
    { id: 1, code: 'PRJ-101', name: 'Core Banking API Upgrade', lead: 'Sarah Chen', health: 'ON_TRACK', progress: 85, tasks: 24, dueDate: '2026-11-15' },
    { id: 2, code: 'PRJ-102', name: 'Customer Service Portal Redesign', lead: 'Alex Kumar', health: 'AT_RISK', progress: 45, tasks: 18, dueDate: '2026-11-20' },
    { id: 3, code: 'PRJ-103', name: 'Cloud Infrastructure Migration', lead: 'David Miller', health: 'ON_TRACK', progress: 60, tasks: 32, dueDate: '2026-12-05' },
    { id: 4, code: 'PRJ-104', name: 'Stateless JWT Auth Gateway', lead: 'Elena Rostova', health: 'DELAYED', progress: 30, tasks: 12, dueDate: '2026-11-10' }
  ];

  // sample kanban tasks
  const kanbanColumns = [
    {
      id: 'backlog',
      title: 'Backlog',
      count: 3,
      tasks: [
        { id: 'TSK-12', title: 'Audit log export to CSV', priority: 'LOW', points: 3, assignee: 'David M.' },
        { id: 'TSK-14', title: 'Two-factor auth mockups', priority: 'MEDIUM', points: 5, assignee: 'Elena R.' }
      ]
    },
    {
      id: 'todo',
      title: 'To Do',
      count: 4,
      tasks: [
        { id: 'TSK-08', title: 'PostgreSQL connection pooling', priority: 'HIGH', points: 8, assignee: 'David M.' },
        { id: 'TSK-09', title: 'User role permission matrix', priority: 'MEDIUM', points: 5, assignee: 'Sarah C.' }
      ]
    },
    {
      id: 'in_progress',
      title: 'In Progress',
      count: 3,
      tasks: [
        { id: 'TSK-04', title: 'SLA countdown calculation service', priority: 'HIGH', points: 8, assignee: 'Alex K.' },
        { id: 'TSK-05', title: 'Stateless JWT filter integration', priority: 'CRITICAL', points: 13, assignee: 'Elena R.' }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      count: 2,
      tasks: [
        { id: 'TSK-02', title: 'BaseEntity auditing timestamps', priority: 'MEDIUM', points: 3, assignee: 'Sarah C.' }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      count: 5,
      tasks: [
        { id: 'TSK-01', title: 'Spring Boot 3 pure ORM setup', priority: 'HIGH', points: 5, assignee: 'Alex K.' }
      ]
    }
  ];

  // sample service desk tickets with SLA
  const tickets = [
    { id: 'TKT-2041', subject: 'Payment webhook timeout on production', severity: 'CRITICAL', status: 'IN_PROGRESS', reporter: 'Client Ops', timeElapsed: '1h 45m', targetTime: '2h 00m', percent: 87, warning: true },
    { id: 'TKT-2042', subject: 'VPN certificate expired for remote team', severity: 'HIGH', status: 'ASSIGNED', reporter: 'IT Helpdesk', timeElapsed: '3h 10m', targetTime: '6h 00m', percent: 52, warning: false },
    { id: 'TKT-2043', subject: 'Report exports fail on large date range', severity: 'MEDIUM', status: 'OPEN', reporter: 'Finance Lead', timeElapsed: '2h 00m', targetTime: '12h 00m', percent: 16, warning: false },
    { id: 'TKT-2044', subject: 'Add user account for new DevOps intern', severity: 'LOW', status: 'RESOLVED', reporter: 'HR Admin', timeElapsed: '4h 30m', targetTime: '24h 00m', percent: 18, warning: false }
  ];

  // sample developer workload matrix
  const developers = [
    { name: 'Elena Rostova', role: 'Security Engineer', hours: 44, capacity: 40, activeTasks: 4, overloaded: true },
    { name: 'Alex Kumar', role: 'Full Stack Lead', hours: 38, capacity: 40, activeTasks: 5, overloaded: false },
    { name: 'Sarah Chen', role: 'Backend Developer', hours: 32, capacity: 40, activeTasks: 3, overloaded: false },
    { name: 'David Miller', role: 'DevOps Specialist', hours: 30, capacity: 40, activeTasks: 3, overloaded: false }
  ];

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
              <p className="text-[11px] text-slate-500">Project Governance &amp; IT Service Desk</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: FolderKanban },
              { id: 'kanban', label: 'Kanban Board', icon: Layers },
              { id: 'servicedesk', label: 'Service Desk & SLA', icon: Clock },
              { id: 'workload', label: 'Team Workload', icon: Users }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-xs border border-slate-300'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Backend Health Badge */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium border ${
              healthStatus && healthStatus.data?.status === 'UP'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 text-slate-600 border-slate-300'
            }`}>
              <span className={`h-2 w-2 rounded-full ${
                healthStatus && healthStatus.data?.status === 'UP' ? 'bg-emerald-500' : 'bg-slate-400'
              }`}></span>
              Backend: {healthStatus && healthStatus.data?.status === 'UP' ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Active Projects</span>
                  <FolderKanban className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-bold text-slate-900">4 Initiatives</div>
                <div className="text-[11px] text-slate-600 flex items-center gap-2">
                  <span className="text-emerald-700 font-semibold">2 On Track</span>
                  <span>|</span>
                  <span className="text-amber-700 font-semibold">1 At Risk</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Kanban Tasks</span>
                  <Layers className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-bold text-slate-900">17 Tasks</div>
                <div className="text-[11px] text-slate-600">
                  3 In Progress | 2 In Review
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Service Desk &amp; SLA</span>
                  <Clock className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-bold text-slate-900">4 Open Tickets</div>
                <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> 1 Warning (&gt;75% SLA threshold)
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border border-slate-300 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Team Workload</span>
                  <Users className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl font-bold text-slate-900">91% Utilization</div>
                <div className="text-[11px] text-rose-700 font-semibold">
                  1 Developer Overloaded (&gt;40h)
                </div>
              </div>
            </div>

            {/* Project Portfolio Table */}
            <div className="bg-white rounded-lg border border-slate-300 shadow-xs p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Project Portfolio Governance</h3>
                  <p className="text-xs text-slate-500">Track project completion percentage and delivery health.</p>
                </div>
                <button
                  onClick={() => setActiveTab('kanban')}
                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium transition"
                >
                  View Kanban Board
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                      <th className="py-2.5">Code</th>
                      <th className="py-2.5">Project Name</th>
                      <th className="py-2.5">Lead</th>
                      <th className="py-2.5">Health</th>
                      <th className="py-2.5">Progress</th>
                      <th className="py-2.5">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 font-mono font-medium text-slate-900">{p.code}</td>
                        <td className="py-3 font-medium text-slate-900">{p.name}</td>
                        <td className="py-3">{p.lead}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.health === 'ON_TRACK'
                              ? 'bg-emerald-100 text-emerald-800'
                              : p.health === 'AT_RISK'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {p.health.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3 w-40">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded h-1.5 overflow-hidden">
                              <div className="bg-slate-800 h-1.5 rounded" style={{ width: `${p.progress}%` }}></div>
                            </div>
                            <span className="font-mono text-[11px] text-slate-600">{p.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 font-mono text-slate-500">{p.dueDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Backend Status */}
            <div className="bg-white rounded-lg border border-slate-300 shadow-xs p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-slate-700" />
                  <h4 className="font-semibold text-slate-900 text-sm">Spring Boot 3 REST Backend (Port 8080)</h4>
                </div>
                <p className="text-xs text-slate-500">
                  Pure ORM with Spring Data JPA and Hibernate. BaseEntity, User entity, and 5 RBAC roles initialized.
                </p>
              </div>
              <button
                onClick={checkHealth}
                disabled={loadingHealth}
                className="py-1.5 px-3 rounded border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-medium transition shrink-0"
              >
                {loadingHealth ? 'Checking...' : 'Ping /api/v1/health'}
              </button>
            </div>
          </div>
        )}

        {/* 2. KANBAN BOARD VIEW */}
        {activeTab === 'kanban' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Interactive Kanban Task Board</h3>
                <p className="text-xs text-slate-500">Drag-and-drop workflow from Backlog to Done with effort estimates.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Filter by project: All</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {kanbanColumns.map((col) => (
                <div key={col.id} className="bg-slate-200/70 rounded-lg p-3 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{col.title}</span>
                    <span className="bg-white px-1.5 py-0.5 rounded text-[10px] text-slate-600 font-mono">
                      {col.count}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {col.tasks.map((task) => (
                      <div key={task.id} className="bg-white p-3 rounded border border-slate-300 shadow-2xs space-y-2">
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono text-slate-500 font-semibold">{task.id}</span>
                          <span className={`px-1.5 py-0.2 rounded font-semibold ${
                            task.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                            task.priority === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-900 leading-snug">{task.title}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>{task.assignee}</span>
                          <span className="font-mono text-[10px] bg-slate-100 px-1 rounded">{task.points} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SERVICE DESK & SLA VIEW */}
        {activeTab === 'servicedesk' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Service Desk &amp; Real-Time SLA Countdown</h3>
                <p className="text-xs text-slate-500">
                  Automated SLA threshold warning triggers at 75% elapsed resolution time.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 shadow-xs divide-y divide-slate-200">
              {tickets.map((t) => (
                <div key={t.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-xs text-slate-900">{t.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                        t.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                        t.severity === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {t.severity}
                      </span>
                      <span className="text-xs text-slate-500">| Reporter: {t.reporter}</span>
                    </div>
                    <p className="text-xs font-medium text-slate-800">{t.subject}</p>
                  </div>

                  {/* SLA Countdown Bar */}
                  <div className="w-full md:w-64 space-y-1 shrink-0">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">SLA Progress</span>
                      <span className={`font-mono font-semibold ${t.warning ? 'text-rose-700' : 'text-slate-700'}`}>
                        {t.timeElapsed} / {t.targetTime}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded transition-all ${
                          t.warning ? 'bg-rose-600' : 'bg-slate-800'
                        }`} 
                        style={{ width: `${t.percent}%` }}
                      ></div>
                    </div>
                    {t.warning && (
                      <span className="text-[10px] text-rose-700 font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Warning: &gt;75% SLA threshold reached!
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. TEAM WORKLOAD MATRIX VIEW */}
        {activeTab === 'workload' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Developer Capacity &amp; Workload Matrix</h3>
                <p className="text-xs text-slate-500">
                  Standard 40h weekly capacity. Flags burnout risk if allocation exceeds 100%.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-300 shadow-xs divide-y divide-slate-200">
              {developers.map((dev, idx) => {
                const util = Math.round((dev.hours / dev.capacity) * 100);
                return (
                  <div key={idx} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-slate-900 text-xs">{dev.name}</h4>
                        <span className="text-[11px] text-slate-500">({dev.role})</span>
                      </div>
                      <p className="text-[11px] text-slate-500">Active Tasks: {dev.activeTasks} assigned deliverables</p>
                    </div>

                    <div className="w-full md:w-64 space-y-1 shrink-0">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Allocation</span>
                        <span className={`font-mono font-semibold ${dev.overloaded ? 'text-rose-700' : 'text-slate-700'}`}>
                          {dev.hours}h / {dev.capacity}h ({util}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded transition-all ${
                            dev.overloaded ? 'bg-rose-600' : 'bg-slate-800'
                          }`}
                          style={{ width: `${Math.min(util, 100)}%` }}
                        ></div>
                      </div>
                      {dev.overloaded && (
                        <span className="text-[10px] text-rose-700 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Burnout Risk: Overloaded by {dev.hours - dev.capacity}h!
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
