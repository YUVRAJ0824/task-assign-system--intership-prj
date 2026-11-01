import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, Terminal, Cpu, RefreshCw } from 'lucide-react';

function App() {
  const [health, setHealth] = useState({ status: 'CHECKING', msg: 'Connecting to backend...' });
  const [loading, setLoading] = useState(false);

  // Ping backend health endpoint
  const checkHealth = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/health');
      if (res.ok) {
        const data = await res.json();
        setHealth({ status: 'ONLINE', msg: data.msg || 'Backend running' });
      } else {
        setHealth({ status: 'OFFLINE', msg: 'Backend returned error' });
      }
    } catch {
      setHealth({ status: 'OFFLINE', msg: 'Spring Boot offline (start port 8080)' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-6 sm:p-10 font-sans">
      {/* Header */}
      <header className="max-w-4xl mx-auto w-full pt-4">
        <div className="flex items-center justify-between pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/20">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Enterprise Project & Service Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">Environment and setup initialized</p>
            </div>
          </div>

          {/* Health badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                health.status === 'ONLINE'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  health.status === 'ONLINE' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
              {health.status}
            </span>
            <button
              onClick={checkHealth}
              disabled={loading}
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              title="Ping backend"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main setup status card */}
      <main className="max-w-4xl mx-auto w-full my-auto py-10">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6 sm:p-8 backdrop-blur shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-3">
            <CheckCircle2 className="w-4 h-4" />
            <span>Setup Verified</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            Frontend & Backend Setup Complete
          </h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Project scaffolding, Vite bundler, Tailwind CSS styling, and Spring Boot 3 dependencies are initialized and running.
            Core domain models and sprint modules will be added in upcoming updates.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-slate-200">Backend Core</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Spring Boot 3, Java 17, Spring Security 6, H2 in-memory dev profile
                </p>
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-start gap-3">
              <Terminal className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-slate-200">Frontend Core</h3>
                <p className="text-xs text-slate-400 mt-1">
                  React 18, Vite bundler, Tailwind CSS, Lucide icons, Axios client
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500 pb-4">
        Enterprise Platform Setup &bull; Ready for sprint development
      </footer>
    </div>
  );
}

export default App;
