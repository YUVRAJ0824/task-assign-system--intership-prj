import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';

export function AppShell({
  activeTab,
  onSelectTab,
  counts,
  isOnline,
  onRefresh,
  isRefreshing,
  title,
  children,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex font-sans antialiased">
      {/* Sidebar 240px or 64px icon rail */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        counts={counts}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={title}
          onOpenCommand={() => setIsCommandOpen(true)}
          isOnline={isOnline}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
        />

        {/* Offline Sample Data Banner if not connected to live Spring Boot */}
        {!isOnline && (
          <div className="bg-bg-subtle border-b border-border px-6 py-1.5 flex items-center justify-between text-xs text-text-muted">
            <span>Using sample data &bull; Spring Boot backend unreachable on :8080</span>
            <button
              onClick={onRefresh}
              className="text-text hover:underline text-[11px] font-semibold"
            >
              Retry connection
            </button>
          </div>
        )}

        {/* Content Area with max-width 1280px */}
        <main className="flex-1 p-6 md:p-8 max-w-[1280px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={onSelectTab}
      />
    </div>
  );
}

