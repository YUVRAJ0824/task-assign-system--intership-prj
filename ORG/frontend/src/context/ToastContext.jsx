import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast viewport: bottom right, small, auto-dismiss */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-center justify-between gap-3 p-3 bg-surface border border-border-strong rounded-card shadow-floating dark:shadow-floating-dark text-xs text-text animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" strokeWidth={1.5} />
              )}
              {toast.type === 'warning' && (
                <AlertTriangle className="w-4 h-4 text-status-warning shrink-0" strokeWidth={1.5} />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-4 h-4 text-status-danger shrink-0" strokeWidth={1.5} />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}

