import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus, MoreHorizontal } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const COLUMNS = [
  { id: 'BACKLOG', label: 'Backlog' },
  { id: 'TODO', label: 'To Do' },
  { id: 'IN_PROGRESS', label: 'In Progress' },
  { id: 'REVIEW', label: 'Review' },
  { id: 'DONE', label: 'Done' },
];

export function KanbanPage({ tasks, onMoveTask, onCreateTask }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const { user } = useAuth();
  const { addToast } = useToast();

  const [form, setForm] = useState({
    title: '',
    points: 3,
    priority: 'MEDIUM',
    assignee: user?.name || 'Yuvraj V',
    status: 'TODO',
    projectCode: 'PRJ-101',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const code = `TSK-${Math.floor(100 + Math.random() * 900)}`;
    onCreateTask({
      ...form,
      code,
      id: Date.now(),
      date: 'Today · Just now',
    });
    addToast(`Task ${code} created`, 'success');
    setIsModalOpen(false);
    setForm({ title: '', points: 3, priority: 'MEDIUM', assignee: user?.name || 'Yuvraj V', status: 'TODO', projectCode: 'PRJ-101' });
  };

  const getPriorityDot = (prio) => {
    switch (prio) {
      case 'CRITICAL':
      case 'HIGH':
        return 'bg-status-danger';
      case 'MEDIUM':
        return 'bg-status-warning';
      case 'LOW':
      default:
        return 'bg-text-faint';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Tasks</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Agile Kanban board &bull; Fibonacci story points &bull; Sprint execution
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>New task</span>
        </Button>
      </div>

      {/* 5 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-start">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.id);
          const colPoints = colTasks.reduce((acc, t) => acc + (t.points || 0), 0);

          return (
            <div key={col.id} className="bg-bg-subtle border border-border rounded-card p-3 flex flex-col min-h-[560px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-[0.06em] text-text">
                  {col.label}
                </span>
                <span className="text-xs text-text-muted tabular-nums font-semibold">
                  {colTasks.length} &bull; {colPoints} pts
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-2 flex-1 overflow-y-auto">
                {colTasks.length === 0 ? (
                  <div className="py-8 text-center text-xs text-text-faint">No tasks</div>
                ) : (
                  colTasks.map((t) => (
                    <div
                      key={t.id || t.code}
                      className="bg-surface border border-border hover:border-border-strong rounded-input p-3 space-y-2.5 transition relative"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${getPriorityDot(t.priority)}`} />
                          <span className="font-mono text-[11px] text-text-faint font-semibold">{t.code}</span>
                        </div>
                        <span className="text-xs font-semibold text-text tabular-nums">{t.points} pts</span>
                      </div>

                      <h4 className="text-xs font-semibold text-text leading-snug">{t.title}</h4>

                      <div className="flex items-center justify-between pt-2 border-t border-border text-[11px] text-text-muted">
                        <span className="truncate max-w-[100px]">{t.assignee}</span>

                        {/* Move Fallback Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === t.id ? null : t.id)}
                            className="p-1 rounded text-text-faint hover:text-text hover:bg-bg-subtle"
                            title="Move task"
                          >
                            <MoreHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />
                          </button>

                          {activeMenuId === t.id && (
                            <div className="absolute right-0 bottom-6 z-20 w-32 bg-surface border border-border-strong rounded-input p-1 shadow-floating dark:shadow-floating-dark space-y-0.5">
                              {COLUMNS.filter((c) => c.id !== col.id).map((dest) => (
                                <button
                                  key={dest.id}
                                  onClick={() => {
                                    onMoveTask(t.id, dest.id);
                                    setActiveMenuId(null);
                                    addToast(`Moved ${t.code} to ${dest.label}`, 'info');
                                  }}
                                  className="w-full text-left text-[11px] p-1.5 rounded text-text hover:bg-bg-subtle transition truncate"
                                >
                                  → {dest.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Sprint Task">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="Configure SLA threshold countdown calculations"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Story Points (Fibonacci)
              </label>
              <select
                value={form.points}
                onChange={(e) => setForm({ ...form, points: parseInt(e.target.value, 10) })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              >
                {[1, 2, 3, 5, 8, 13].map((pt) => (
                  <option key={pt} value={pt}>
                    {pt} points ({pt * 4}h)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Priority
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Assignee
              </label>
              <input
                type="text"
                required
                value={form.assignee}
                onChange={(e) => setForm({ ...form, assignee: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Initial Column
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create task</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

