import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, Filter, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function AuditTrailPage({ auditLogs }) {
  const { user, switchPersona } = useAuth();
  const { addToast } = useToast();
  const [filterActor, setFilterActor] = useState('');
  const [filterAction, setFilterAction] = useState('');

  const isAdmin = user?.role === 'ROLE_ADMIN';

  const filteredLogs = auditLogs.filter((log) => {
    const matchActor = filterActor ? log.actor.toLowerCase().includes(filterActor.toLowerCase()) : true;
    const matchAction = filterAction ? log.action.toLowerCase().includes(filterAction.toLowerCase()) : true;
    return matchActor && matchAction;
  });

  const exportCsv = () => {
    const headers = ['Timestamp', 'Actor', 'Action', 'Target', 'Message', 'IP'];
    const rows = filteredLogs.map((l) => [
      `"${l.timestamp}"`,
      `"${l.actor}"`,
      `"${l.action}"`,
      `"${l.target || ''}"`,
      `"${l.message || ''}"`,
      `"${l.ip || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `epsm_audit_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Audit trail exported as CSV', 'info');
  };

  if (!isAdmin) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-10 h-10 rounded-full bg-status-warning-bg text-status-warning flex items-center justify-center mx-auto">
          <ShieldAlert className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold text-text">Restricted Access</h2>
        <p className="text-xs text-text-muted leading-relaxed">
          The security audit trail is restricted to Enterprise Administrators. You are currently logged in as <strong className="text-text">{user?.name}</strong> ({user?.role}).
        </p>
        <div className="pt-2">
          <Button
            size="sm"
            onClick={() => switchPersona('Admin')}
          >
            Switch to Admin (Administrator)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Audit Trail</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Immutable JPA audit log &bull; User actions &bull; Security IP verification
          </p>
        </div>
        <Button onClick={exportCsv} size="sm" variant="secondary">
          <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-surface border border-border rounded-card">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Filter className="w-3.5 h-3.5 text-text-faint" strokeWidth={1.5} />
          <span>Filters:</span>
        </div>
        <input
          type="text"
          placeholder="Filter by actor..."
          value={filterActor}
          onChange={(e) => setFilterActor(e.target.value)}
          className="px-2.5 py-1.5 bg-bg-subtle border border-border rounded-input text-xs text-text focus:border-accent outline-hidden"
        />
        <input
          type="text"
          placeholder="Filter by action..."
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="px-2.5 py-1.5 bg-bg-subtle border border-border rounded-input text-xs text-text focus:border-accent outline-hidden"
        />
        {(filterActor || filterAction) && (
          <button
            onClick={() => {
              setFilterActor('');
              setFilterAction('');
            }}
            className="text-xs text-text-muted hover:text-text underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Dense Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-subtle text-text-faint uppercase tracking-[0.06em] text-[11px] h-10">
                <th className="px-4 font-semibold">Timestamp</th>
                <th className="px-4 font-semibold">Actor</th>
                <th className="px-4 font-semibold">Action</th>
                <th className="px-4 font-semibold">Target / Description</th>
                <th className="px-4 font-semibold font-mono">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="h-11 hover:bg-bg-subtle/50 transition">
                  <td className="px-4 font-mono text-[11px] text-text-muted tabular-nums whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-4 font-semibold text-text">{log.actor}</td>
                  <td className="px-4">
                    <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded bg-bg-subtle text-text border border-border">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 text-text-muted max-w-md truncate">
                    {log.message || log.target}
                  </td>
                  <td className="px-4 font-mono text-[11px] text-text-faint">{log.ip || '127.0.0.1'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

