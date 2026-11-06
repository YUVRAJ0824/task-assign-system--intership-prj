import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus, Flag } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export function MilestonesPage({ milestones, onCreateMilestone }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    projectCode: 'PRJ-101',
    owner: 'Yuvraj V',
    targetDate: '2026-12-01',
    progress: 25,
  });
  const { addToast } = useToast();

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onCreateMilestone({
      ...form,
      id: Date.now(),
      status: 'IN_PROGRESS',
    });
    addToast('Milestone created', 'success');
    setIsModalOpen(false);
    setForm({ title: '', projectCode: 'PRJ-101', owner: 'Yuvraj V', targetDate: '2026-12-01', progress: 25 });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Milestones</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Strategic delivery checkpoints &bull; Target dates &bull; Completion velocity
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>New milestone</span>
        </Button>
      </div>

      {/* Milestones Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-subtle text-text-faint uppercase tracking-[0.06em] text-[11px] h-11">
                <th className="px-5 font-semibold">Milestone Target</th>
                <th className="px-4 font-semibold">Project</th>
                <th className="px-4 font-semibold">Owner</th>
                <th className="px-4 font-semibold">Target Date</th>
                <th className="px-4 font-semibold">Status</th>
                <th className="px-5 font-semibold w-48 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {milestones.map((m) => (
                <tr key={m.id} className="h-14 hover:bg-bg-subtle/50 transition">
                  <td className="px-5">
                    <div className="flex items-center gap-2.5">
                      <Flag className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} />
                      <span className="font-semibold text-text text-sm">{m.title}</span>
                    </div>
                  </td>
                  <td className="px-4 font-mono text-xs text-text-muted">{m.projectCode}</td>
                  <td className="px-4 text-text">{m.owner}</td>
                  <td className="px-4 text-text-muted tabular-nums">{m.targetDate}</td>
                  <td className="px-4">
                    <Badge variant={m.progress >= 90 ? 'success' : 'info'} dot>
                      {m.status || 'IN_PROGRESS'}
                    </Badge>
                  </td>
                  <td className="px-5 text-right">
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-text tabular-nums">{m.progress}%</div>
                      <ProgressBar value={m.progress} variant={m.progress >= 90 ? 'success' : 'accent'} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Milestone Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Strategic Milestone">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Milestone Title
            </label>
            <input
              type="text"
              required
              placeholder="Achieve production cutover for Service Desk SLA engine"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Project Code
              </label>
              <input
                type="text"
                required
                value={form.projectCode}
                onChange={(e) => setForm({ ...form, projectCode: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Owner
              </label>
              <input
                type="text"
                required
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Target Date
              </label>
              <input
                type="date"
                required
                value={form.targetDate}
                onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Progress (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.progress}
                onChange={(e) => setForm({ ...form, progress: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create milestone</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

