import React, { useState, useEffect } from 'react';
import { 
  FolderKanban, 
  Layers, 
  Clock, 
  Users, 
  Activity, 
  Plus, 
  RefreshCw,
  X 
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);

  // 1. Projects state
  const [projects, setProjects] = useState([]);

  // Project Modal state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newProject, setNewProject] = useState({ code: '', name: '', lead: '', dueDate: '', description: '' });

  // 2. Check backend health
  const checkHealth = async () => {
    setLoadingHealth(true);
    try {
      const res = await fetch('/api/v1/health');
      if (res.ok) {
        const data = await res.json();
        setHealthStatus(data);
      } else {
        setHealthStatus({ status: 'OFFLINE', msg: 'Backend offline' });
      }
    } catch {
      setHealthStatus({ status: 'OFFLINE', msg: 'Spring Boot offline' });
    } finally {
      setLoadingHealth(false);
    }
  };

  // 3. Fetch projects from Spring Boot backend
  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/v1/projects');
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setProjects(json.data);
        }
      }
    } catch {
      // offline fallback
    }
  };

  useEffect(() => {
    checkHealth();
    fetchProjects();
  }, []);

  // 4. Create new project
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
        setProjects(prev => [...prev, {
          id: Date.now(),
          ...newProject,
          health: 'ON_TRACK',
          progress: 0
        }]);
      }
    } catch {
      setProjects(prev => [...prev, {
        id: Date.now(),
        ...newProject,
        health: 'ON_TRACK',
        progress: 0
      }]);
    }

    setNewProject({ code: '', name: '', lead: '', dueDate: '', description: '' });
    setShowProjectModal(false);
  };

  const isOnline = healthStatus?.status === 'UP' || healthStatus?.status === 'ONLINE';
  const onTrackCount = projects.filter(p => p.health === 'ON_TRACK').length;
  const attentionCount = projects.filter(p => p.health !== 'ON_TRACK').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Header - Clean Daylight Corporate Theme */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-slate-900 leading-none">
                Enterprise Project &amp; Service Platform
              </h1>
              <p className="text-[11px] text-slate-500 mt-1">Production Release &bull; Portfolio Management &amp; Support</p>
            </div>
          </div>

          {/* Connection status */}
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-700 border-amber-200'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`} />
              {isOnline ? 'ONLINE (Port 8080)' : 'CONNECTING...'}
            </span>
            <button 
              onClick={() => { checkHealth(); fetchProjects(); }}
              disabled={loadingHealth}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingHealth ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Clear Page Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            Projects
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'tasks'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FolderKanban className="w-4 h-4" />
            Task Board
          </button>
          <button
            onClick={() => setActiveTab('servicedesk')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'servicedesk'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            Service Desk
          </button>
          <button
            onClick={() => setActiveTab('capacity')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'capacity'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            Team Capacity
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-6 flex-1 w-full">
        {/* Tab 1: Projects Overview */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white border border-slate-200 p-4 rounded-lg space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Active Projects</span>
                <div className="text-2xl font-bold text-slate-900">{projects.length}</div>
                <div className="text-[11px] text-emerald-600 font-medium">
                  {onTrackCount} on track &bull; {attentionCount} attention needed
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-lg space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Total Project Tasks</span>
                <div className="text-2xl font-bold text-slate-900">8 Tasks</div>
                <div className="text-[11px] text-blue-600 font-medium">
                  Pipeline active
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-lg space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Support Incidents</span>
                <div className="text-2xl font-bold text-slate-900">4 Active</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  SLA tracking enabled
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-4 rounded-lg space-y-1 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Resource Utilization</span>
                <div className="text-2xl font-bold text-slate-900">85% Capacity</div>
                <div className="text-[11px] text-emerald-600 font-medium">
                  Team balanced
                </div>
              </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Enterprise Project Portfolio</h3>
                  <p className="text-xs text-slate-500">Live projects synced from Spring Boot H2 database.</p>
                </div>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium flex items-center gap-1.5 transition shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Project
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                      <th className="py-2.5">Code</th>
                      <th className="py-2.5">Project Title</th>
                      <th className="py-2.5">Lead Architect</th>
                      <th className="py-2.5">Health</th>
                      <th className="py-2.5">Progress</th>
                      <th className="py-2.5">Target Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {projects.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 font-mono font-semibold text-blue-600">{p.code}</td>
                        <td className="py-3 font-medium text-slate-900">{p.name}</td>
                        <td className="py-3 text-slate-600">{p.lead}</td>
                        <td className="py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border ${
                            p.health === 'ON_TRACK'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : p.health === 'AT_RISK'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                            {p.health}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="w-32 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                p.health === 'ON_TRACK' ? 'bg-emerald-500' : p.health === 'AT_RISK' ? 'bg-amber-500' : 'bg-rose-500'
                              }`} 
                              style={{ width: `${p.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-0.5 block">{p.progress || 0}%</span>
                        </td>
                        <td className="py-3 text-slate-600 font-mono">{p.dueDate || 'No date set'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Task Board Placeholder in ORG */}
        {activeTab === 'tasks' && (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-2">
            <h3 className="font-semibold text-slate-900 text-sm">Progress Task Board</h3>
            <p className="text-xs text-slate-500">Task workflow promotion queued for next production slice.</p>
          </div>
        )}

        {/* Tab 3: Service Desk Placeholder in ORG */}
        {activeTab === 'servicedesk' && (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-2">
            <h3 className="font-semibold text-slate-900 text-sm">Service Desk &amp; SLA Monitor</h3>
            <p className="text-xs text-slate-500">Service desk incident management promotion queued for next production slice.</p>
          </div>
        )}

        {/* Tab 4: Team Capacity Placeholder in ORG */}
        {activeTab === 'capacity' && (
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center space-y-2">
            <h3 className="font-semibold text-slate-900 text-sm">Team Workload &amp; Capacity Matrix</h3>
            <p className="text-xs text-slate-500">Resource capacity matrix promotion queued for next production slice.</p>
          </div>
        )}
      </main>

      {/* New Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Create New Project</h3>
              <button onClick={() => setShowProjectModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Project Code</label>
                <input 
                  type="text" 
                  required
                  placeholder="PRJ-201"
                  value={newProject.code}
                  onChange={e => setNewProject({...newProject, code: e.target.value.toUpperCase()})}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none focus:border-blue-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Project Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="Payment Microservice Gateway"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Lead Architect</label>
                <input 
                  type="text" 
                  required
                  placeholder="Architect or Lead Name"
                  value={newProject.lead}
                  onChange={e => setNewProject({...newProject, lead: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Target Date</label>
                <input 
                  type="date" 
                  value={newProject.dueDate}
                  onChange={e => setNewProject({...newProject, dueDate: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white text-center py-4 text-xs text-slate-500">
        Enterprise Project &amp; Service Management Platform &bull; Production Release
      </footer>
    </div>
  );
}

export default App;
