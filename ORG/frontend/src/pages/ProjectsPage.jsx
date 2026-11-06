import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function ProjectsPage({ projects, onCreateProject }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    code: '',
    name: '',
    lead: 'Puneeth Rajkumar',
    dueDate: '2026-12-15',
    description: '',
  });
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.code || !form.name) return;
    onCreateProject({
      ...form,
      health: 'ON_TRACK',
      progress: 0,
      tasksCount: 0,
      teammates: 3,
    });
    addToast(`Project ${form.code} created successfully`, 'success');
    setIsModalOpen(false);
    setForm({ code: '', name: '', lead: 'Puneeth Rajkumar', dueDate: '2026-12-15', description: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Projects</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Portfolio workspaces, leadership, and sprint health
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>New project</span>
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const healthVariant =
            p.health === 'ON_TRACK' ? 'success' : p.health === 'AT_RISK' ? 'warning' : 'danger';
          return (
            <Card key={p.id || p.code} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-text-muted">{p.code}</span>
                <Badge variant={healthVariant} dot>
                  {p.health === 'ON_TRACK' ? 'On track' : p.health === 'AT_RISK' ? 'At risk' : 'Delayed'}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-semibold text-text tracking-tight truncate">{p.name}</h3>
                <p className="text-xs text-text-muted mt-1">
                  Lead: <strong className="text-text font-semibold">{p.lead}</strong>
                </p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-border">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Sprint completion</span>
                  <span className="font-semibold text-text tabular-nums">{p.progress || 0}%</span>
                </div>
                <ProgressBar value={p.progress || 0} variant={healthVariant} />
              </div>

              <div className="flex items-center justify-between text-xs text-text-faint pt-1">
                <span>Due {p.dueDate || '2026-12-01'}</span>
                <span>{p.tasksCount || 6} tasks &bull; {p.teammates || 4} members</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* New Project Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Project Code
            </label>
            <input
              type="text"
              required
              placeholder="PRJ-105"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Project Name
            </label>
            <input
              type="text"
              required
              placeholder="Cloud Data Ingestion Engine"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Project Lead
            </label>
            <input
              type="text"
              required
              value={form.lead}
              onChange={(e) => setForm({ ...form, lead: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Target Due Date
            </label>
            <input
              type="date"
              required
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create project</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

