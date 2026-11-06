import React, { useState, useEffect } from 'react';
import { Search, FolderKanban, CheckSquare, Flag, Clock, FileCheck2, Users, History, Activity, X } from 'lucide-react';

export function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  const commands = [
    { id: 'dashboard', label: 'Go to Dashboard', icon: Activity, category: 'Navigation' },
    { id: 'projects', label: 'Go to Projects', icon: FolderKanban, category: 'Navigation' },
    { id: 'kanban', label: 'Go to Tasks (Kanban)', icon: CheckSquare, category: 'Navigation' },
    { id: 'milestones', label: 'Go to Milestones', icon: Flag, category: 'Navigation' },
    { id: 'tickets', label: 'Go to Service Desk', icon: Clock, category: 'Navigation' },
    { id: 'approvals', label: 'Go to Approvals', icon: FileCheck2, category: 'Navigation' },
    { id: 'workload', label: 'Go to Squad Workload', icon: Users, category: 'Navigation' },
    { id: 'audit', label: 'Go to Audit Trail', icon: History, category: 'Navigation' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // toggle
      }
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-2xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-surface border border-border-strong rounded-card shadow-floating dark:shadow-floating-dark overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 px-4 border-b border-border">
          <Search className="w-4 h-4 text-text-muted shrink-0" strokeWidth={1.5} />
          <input
            type="text"
            placeholder="Type a command or search pages..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3.5 bg-transparent text-sm text-text placeholder:text-text-faint outline-hidden"
          />
          <kbd className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-border bg-bg-subtle text-text-muted">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-xs text-text-muted text-center">No commands matching &quot;{query}&quot;</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-input text-xs font-semibold text-text hover:bg-bg-subtle transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] text-text-faint">{item.category}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

