import React from 'react';
import { Search, Bell, RefreshCw } from 'lucide-react';

export function Topbar({
  title,
  onOpenCommand,
  isOnline,
  onRefresh,
  isRefreshing,
}) {
  return (
    <header className="h-14 border-b border-border bg-surface px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Breadcrumb / Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-[0.06em] text-text-faint font-semibold">
          EPSM
        </span>
        <span className="text-xs text-text-faint">/</span>
        <h1 className="text-sm font-semibold text-text tracking-tight">{title}</h1>
      </div>

      {/* Middle: Global Search Trigger */}
      <div className="hidden md:block max-w-sm w-full mx-4">
        <button
          onClick={onOpenCommand}
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-input border border-border bg-bg-subtle text-xs text-text-muted hover:border-border-strong hover:text-text transition text-left"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-text-faint" strokeWidth={1.5} />
            <span>Search or jump to...</span>
          </div>
          <kbd className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-border bg-surface text-text-faint">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Health dot + Refresh + Notifications */}
      <div className="flex items-center gap-3">
        {/* Backend Health Dot */}
        <div
          className="flex items-center gap-2 text-xs text-text-muted"
          title={isOnline ? 'Spring Boot 3 backend connected on :8080' : 'Backend offline - Using sample data'}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isOnline ? 'bg-status-success' : 'bg-status-warning'
            }`}
          />
          <span className="hidden sm:inline text-xs text-text-faint">
            {isOnline ? ':8080 live' : 'offline demo'}
          </span>
        </div>

        {/* Refresh API */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-1.5 rounded-input text-text-muted hover:text-text hover:bg-bg-subtle"
          title="Refresh data"
          aria-label="Refresh data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} strokeWidth={1.5} />
        </button>

        {/* Notification Bell */}
        <button
          className="p-1.5 rounded-input text-text-muted hover:text-text hover:bg-bg-subtle"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}

