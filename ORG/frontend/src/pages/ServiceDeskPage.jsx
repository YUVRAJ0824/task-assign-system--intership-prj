import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Plus, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { calculateSla } from '../utils/sla';
import { useCountdown } from '../hooks/useCountdown';
import { useToast } from '../context/ToastContext';

export function ServiceDeskPage({ tickets, onResolveTicket, onCreateTicket }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToast();
  useCountdown(15000); // Trigger re-calculation every 15s

  const [form, setForm] = useState({
    subject: '',
    severity: 'MEDIUM',
    targetHours: 8,
    reporter: 'Operations Desk',
    dept: 'Platform Core',
    description: '',
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.subject.trim()) return;
    const code = `TKT-${Math.floor(100 + Math.random() * 900)}`;
    onCreateTicket({
      ...form,
      id: Date.now(),
      code,
      status: 'IN_PROGRESS',
      createdAt: new Date().toISOString(),
    });
    addToast(`Incident ${code} reported`, 'warning');
    setIsModalOpen(false);
    setForm({ subject: '', severity: 'MEDIUM', targetHours: 8, reporter: 'Operations Desk', dept: 'Platform Core', description: '' });
  };

  const getSeverityBadge = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return <Badge variant="danger" dot>Critical</Badge>;
      case 'HIGH':
        return <Badge variant="warning" dot>High</Badge>;
      case 'MEDIUM':
        return <Badge variant="info">Medium</Badge>;
      case 'LOW':
      default:
        return <Badge variant="neutral">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Service Desk</h1>
          <p className="text-xs text-text-muted mt-0.5">
            IT incident tracking &bull; Real-time SLA countdowns &bull; 75% breach warnings
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>Report incident</span>
        </Button>
      </div>

      {/* Tickets Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-subtle text-text-faint uppercase tracking-[0.06em] text-[11px] h-11">
                <th className="px-5 font-semibold">Ticket Code</th>
                <th className="px-4 font-semibold">Incident Subject</th>
                <th className="px-4 font-semibold">Severity</th>
                <th className="px-4 font-semibold">Reporter / Dept</th>
                <th className="px-4 font-semibold">Status</th>
                <th className="px-5 font-semibold w-56">SLA Countdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tickets.map((t) => {
                const sla = calculateSla(t.createdAt || '2026-11-05T08:00:00', t.targetHours || 8, t.status);
                const isBreached = sla.isBreached;
                const isWarning = sla.isWarning;

                return (
                  <tr
                    key={t.id || t.code}
                    onClick={() => setSelectedTicket(t)}
                    className="h-14 hover:bg-bg-subtle/50 cursor-pointer transition"
                  >
                    <td className="px-5 font-mono text-xs font-semibold text-text">{t.code}</td>
                    <td className="px-4">
                      <div className="font-semibold text-text text-sm truncate max-w-xs">{t.subject}</div>
                    </td>
                    <td className="px-4">{getSeverityBadge(t.severity)}</td>
                    <td className="px-4 text-text-muted">
                      <div>{t.reporter}</div>
                      <div className="text-[11px] text-text-faint">{t.dept}</div>
                    </td>
                    <td className="px-4">
                      {t.status === 'RESOLVED' ? (
                        <span className="inline-flex items-center gap-1 text-xs text-status-success font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-status-info font-semibold">
                          <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-5">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`font-semibold tabular-nums ${
                              isBreached
                                ? 'text-status-danger'
                                : isWarning
                                ? 'text-status-warning'
                                : 'text-text-muted'
                            }`}
                          >
                            {sla.badgeText}
                          </span>
                          <span className="text-text-faint tabular-nums text-[11px]">{sla.percent}%</span>
                        </div>
                        <ProgressBar
                          value={sla.percent}
                          variant={isBreached ? 'danger' : isWarning ? 'warning' : 'accent'}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Ticket Detail Drawer */}
      <Drawer
        isOpen={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
        title={selectedTicket?.code || 'Ticket Details'}
        subtitle={`Reported by ${selectedTicket?.reporter || 'Operations'}`}
      >
        {selectedTicket && (
          <div className="space-y-5">
            <div>
              <span className="text-xs uppercase tracking-[0.06em] text-text-faint font-semibold block mb-1">
                Subject
              </span>
              <h3 className="text-base font-semibold text-text">{selectedTicket.subject}</h3>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-border">
              <div>
                <span className="text-xs text-text-faint block">Severity</span>
                <div className="mt-1">{getSeverityBadge(selectedTicket.severity)}</div>
              </div>
              <div>
                <span className="text-xs text-text-faint block">Department</span>
                <span className="text-xs font-semibold text-text mt-1 block">{selectedTicket.dept}</span>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.06em] text-text-faint font-semibold block mb-2">
                SLA Compliance Engine
              </span>
              <div className="p-3 bg-bg-subtle border border-border rounded-input space-y-2">
                {(() => {
                  const sla = calculateSla(selectedTicket.createdAt, selectedTicket.targetHours || 8, selectedTicket.status);
                  return (
                    <>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">Target Resolution Time</span>
                        <span className="font-semibold text-text tabular-nums">{selectedTicket.targetHours || 8} hours</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-text-muted">Current Status</span>
                        <span className={`font-semibold tabular-nums ${sla.isBreached ? 'text-status-danger' : sla.isWarning ? 'text-status-warning' : 'text-text'}`}>
                          {sla.badgeText} ({sla.percent}%)
                        </span>
                      </div>
                      <ProgressBar value={sla.percent} variant={sla.isBreached ? 'danger' : sla.isWarning ? 'warning' : 'accent'} />
                      {sla.isWarning && (
                        <div className="flex items-center gap-1.5 text-xs text-status-warning pt-1">
                          <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Breaching soon: Exceeded 75% target threshold</span>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {selectedTicket.status !== 'RESOLVED' && (
              <div className="pt-4 border-t border-border">
                <Button
                  onClick={() => {
                    onResolveTicket(selectedTicket.id);
                    addToast(`Ticket ${selectedTicket.code} marked as resolved`, 'success');
                    setSelectedTicket(null);
                  }}
                  className="w-full"
                >
                  Mark as Resolved
                </Button>
              </div>
            )}
          </div>
        )}
      </Drawer>

      {/* Report Incident Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Report Service Desk Incident">
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Incident Subject
            </label>
            <input
              type="text"
              required
              placeholder="PostgreSQL connection pool exhausted under spike load"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Severity
              </label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              >
                <option value="LOW">Low (24h SLA)</option>
                <option value="MEDIUM">Medium (8h SLA)</option>
                <option value="HIGH">High (4h SLA)</option>
                <option value="CRITICAL">Critical (2h SLA)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Target SLA (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="72"
                value={form.targetHours}
                onChange={(e) => setForm({ ...form, targetHours: parseInt(e.target.value, 10) || 8 })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Reporter
              </label>
              <input
                type="text"
                required
                value={form.reporter}
                onChange={(e) => setForm({ ...form, reporter: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={form.dept}
                onChange={(e) => setForm({ ...form, dept: e.target.value })}
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit incident</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

