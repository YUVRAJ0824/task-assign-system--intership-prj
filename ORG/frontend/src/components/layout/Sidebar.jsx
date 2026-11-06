import React from 'react';
import { 
  Activity, 
  FolderKanban, 
  CheckSquare, 
  Flag, 
  Clock, 
  FileCheck2, 
  Users, 
  History, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export function Sidebar({
  activeTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  counts = {},
}) {
  const { user, switchPersona, personas } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'projects', label: 'Projects', icon: FolderKanban, badge: counts.projects },
    { id: 'kanban', label: 'Tasks', icon: CheckSquare, badge: counts.tasks },
    { id: 'milestones', label: 'Milestones', icon: Flag, badge: counts.milestones },
    { id: 'tickets', label: 'Service Desk', icon: Clock, badge: counts.tickets },
    { id: 'approvals', label: 'Approvals', icon: FileCheck2, badge: counts.approvals },
    { id: 'workload', label: 'Squad Workload', icon: Users },
    { id: 'audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-60'
      } shrink-0 bg-surface border-r border-border h-screen sticky top-0 flex flex-col justify-between transition-all duration-200 z-30`}
    >
      {/* Top: Logo + User Row + Navigation */}
      <div className="flex flex-col min-h-0">
        
        {/* Logo Header */}
        <div className="h-14 flex items-center px-4 border-b border-border justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {/* Small square navy mark, plain letter "E", no gradient */}
            <div className="w-6 h-6 rounded bg-accent text-accent-fg font-semibold text-xs flex items-center justify-center shrink-0">
              E
            </div>
            {!isCollapsed && (
              <span className="text-sm font-semibold tracking-tight text-text truncate">
                EPSM
              </span>
            )}
          </div>
        </div>

        {/* User Row (Initials avatar, name, role) */}
        {!isCollapsed ? (
          <div className="p-3 border-b border-border">
            <div className="relative group">
              <div className="flex items-center justify-between p-2 rounded-input bg-bg-subtle border border-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded bg-border text-text font-semibold text-xs flex items-center justify-center shrink-0">
                    {user?.initials || 'YV'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-text truncate">{user?.name}</div>
                    <div className="text-[11px] text-text-faint truncate">{user?.role}</div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-text-muted shrink-0 pointer-events-none" strokeWidth={1.5} />
              </div>

              {/* Native Persona Switcher overlay */}
              <select
                value={user?.name || ''}
                onChange={(e) => switchPersona(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                title="Switch persona"
                aria-label="Switch persona"
              >
                {personas.map((p) => (
                  <option key={p.name} value={p.name} className="text-slate-900 bg-white">
                    {p.name} ({p.role})
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="p-3 border-b border-border flex justify-center">
            <div
              className="w-8 h-8 rounded bg-border text-text font-semibold text-xs flex items-center justify-center cursor-pointer"
              title={`${user?.name} (${user?.role})`}
            >
              {user?.initials || 'YV'}
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-input text-xs font-semibold transition text-left ${
                  isActive
                    ? 'bg-bg-subtle text-text border-l-2 border-accent rounded-l-none'
                    : 'text-text-muted hover:text-text hover:bg-bg-subtle'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-text' : 'text-text-muted'}`}
                    strokeWidth={1.5}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isCollapsed && item.badge != null && (
                  <span className="text-[10px] font-semibold tabular-nums px-1.5 py-0.2 rounded-full bg-border text-text-muted">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer: Theme toggle + Collapse button */}
      <div className="p-2 border-t border-border flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-input text-text-muted hover:text-text hover:bg-bg-subtle"
          title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>

        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-input text-text-muted hover:text-text hover:bg-bg-subtle"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </aside>
  );
}

