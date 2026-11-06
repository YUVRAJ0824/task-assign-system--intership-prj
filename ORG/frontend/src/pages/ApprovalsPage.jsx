import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Check, X, ShieldAlert, FileCheck2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export function ApprovalsPage({ approvals, onApprove, onReject }) {
  const { user, switchPersona } = useAuth();
  const { addToast } = useToast();
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const isAuthorized = user?.role === 'ROLE_PROJECT_MANAGER' || user?.role === 'ROLE_ADMIN';

  const handleConfirmReject = () => {
    if (!rejectingItem) return;
    onReject(rejectingItem.id, rejectReason);
    addToast(`Rejected request ${rejectingItem.code}`, 'warning');
    setRejectingItem(null);
    setRejectReason('');
  };

  if (!isAuthorized) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <div className="w-10 h-10 rounded-full bg-status-warning-bg text-status-warning flex items-center justify-center mx-auto">
          <ShieldAlert className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <h2 className="text-base font-semibold text-text">Restricted Access</h2>
        <p className="text-xs text-text-muted leading-relaxed">
          The governance approvals module is restricted to Project Managers and Administrators. You are currently logged in as <strong className="text-text">{user?.name}</strong> ({user?.role}).
        </p>
        <div className="pt-2">
          <Button
            size="sm"
            onClick={() => switchPersona('Puneeth Rajkumar')}
          >
            Switch to Puneeth Rajkumar (Project Manager)
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-text">Governance Approvals</h1>
          <p className="text-xs text-text-muted mt-0.5">
            Deployment change requests &bull; Budget authorization &bull; Security reviews
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-bg-subtle text-text-faint uppercase tracking-[0.06em] text-[11px] h-11">
                <th className="px-5 font-semibold">Request Code</th>
                <th className="px-4 font-semibold">Title &amp; Justification</th>
                <th className="px-4 font-semibold">Type</th>
                <th className="px-4 font-semibold">Requester</th>
                <th className="px-4 font-semibold">Status</th>
                <th className="px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {approvals.map((a) => (
                <tr key={a.id || a.code} className="h-16 hover:bg-bg-subtle/50 transition">
                  <td className="px-5 font-mono text-xs font-semibold text-text">{a.code}</td>
                  <td className="px-4 max-w-sm">
                    <div className="font-semibold text-text text-sm truncate">{a.title}</div>
                    {a.notes && <div className="text-[11px] text-text-faint truncate mt-0.5">{a.notes}</div>}
                  </td>
                  <td className="px-4">
                    <Badge variant="neutral">{a.category || 'DEPLOYMENT'}</Badge>
                  </td>
                  <td className="px-4">
                    <span className="font-semibold text-text">{a.requester}</span>
                    <span className="text-[11px] text-text-faint block">{a.projectCode}</span>
                  </td>
                  <td className="px-4">
                    <Badge
                      variant={
                        a.status === 'APPROVED' ? 'success' : a.status === 'REJECTED' ? 'danger' : 'warning'
                      }
                      dot
                    >
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-5 text-right">
                    {a.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            onApprove(a.id);
                            addToast(`Approved ${a.code}`, 'success');
                          }}
                        >
                          <Check className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Approve</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setRejectingItem(a)}
                          className="text-status-danger hover:bg-status-danger-bg"
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>Reject</span>
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-text-faint font-medium">Decided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Reject Confirmation & Reason Modal */}
      <Modal
        isOpen={Boolean(rejectingItem)}
        onClose={() => setRejectingItem(null)}
        title={`Reject Change Request ${rejectingItem?.code}`}
      >
        <div className="space-y-4">
          <p className="text-xs text-text-muted">
            Are you sure you want to reject <strong>{rejectingItem?.title}</strong>? Please provide an audit reason for this rejection.
          </p>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-[0.06em] text-text mb-1">
              Rejection Reason
            </label>
            <textarea
              rows={3}
              required
              placeholder="Requires additional load testing on staging VPC before production cutover."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border rounded-input text-xs text-text focus:border-accent outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="secondary" onClick={() => setRejectingItem(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={!rejectReason.trim()}
              onClick={handleConfirmReject}
            >
              Confirm rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

