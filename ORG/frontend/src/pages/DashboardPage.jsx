import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { 
  FolderKanban, 
  Calendar, 
  CheckSquare, 
  Flag, 
  Check, 
  Trash2, 
  Bell, 
  ChevronLeft, 
  ChevronRight, 
  Video 
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useAuth } from '../context/AuthContext';

export function DashboardPage({
  projects,
  tasks,
  milestones,
  reminders,
  onToggleReminder,
  onDeleteReminder,
  onOpenNewTask,
  onOpenNewProject,
  onNavigate,
}) {
  const { user } = useAuth();
  const [selectedDay, setSelectedDay] = useState('05');

  // Dynamic greeting based on current hour
  const currentHour = new Date().getHours();
  const greetingTime = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name ? user.name.split(' ')[0] : 'Engineer';

  const calendarDays = [
    { day: 'Wed', date: '04' },
    { day: 'Thu', date: '05' },
    { day: 'Fri', date: '06' },
    { day: 'Sat', date: '07' },
    { day: 'Sun', date: '08' },
    { day: 'Mon', date: '09' },
    { day: 'Tue', date: '10' },
  ];

  // Sprint velocity data for recharts (navy line only, light grid, no clutter)
  const velocityData = [
    { sprint: 'Sprint 21', points: 34, target: 40 },
    { sprint: 'Sprint 22', points: 38, target: 40 },
    { sprint: 'Sprint 23', points: 42, target: 40 },
    { sprint: 'Sprint 24', points: 39, target: 40 },
    { sprint: 'Sprint 25', points: 45, target: 40 },
  ];

  // Active user's tasks
  const myTasks = tasks.filter((t) => {
    if (!t.assignee) return false;
    return t.assignee.toLowerCase().includes(firstName.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header: small date, "Good evening, Yuvraj" at 32px, one primary "New task", one secondary "New project" */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.06em] text-text-faint font-semibold">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
          <h1 className="text-[32px] font-semibold text-text tracking-tight leading-tight">
            {greetingTime}, {firstName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onOpenNewProject}>
            New project
          </Button>
          <Button variant="primary" size="sm" onClick={onOpenNewTask}>
            New task
          </Button>
        </div>
      </div>

      {/* Bento Grid: Calm, precise, left-aligned */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* LEFT COLUMN (7 COLS): Projects, Calendar strip, Reminders */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* 1. Projects Card (recent 4) */}
          <Card className="space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <h2 className="text-base font-semibold text-text tracking-tight">Projects</h2>
              </div>
              <button
                onClick={() => onNavigate('projects')}
                className="text-xs text-text-muted hover:text-text"
              >
                View all &rarr;
              </button>
            </div>

            <div className="space-y-2">
              {projects.slice(0, 4).map((p) => (
                <div
                  key={p.id || p.code}
                  className="p-3 rounded-input bg-bg-subtle border border-border flex items-center justify-between"
                >
                  <div className="min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-text-muted">{p.code}</span>
                      <span className="text-xs font-semibold text-text truncate">{p.name}</span>
                    </div>
                    <div className="text-[11px] text-text-faint mt-0.5">
                      Lead: {p.lead} &bull; {p.tasksCount || 6} tasks &bull; {p.teammates || 4} members
                    </div>
                  </div>

                  <Badge
                    variant={p.health === 'ON_TRACK' ? 'success' : p.health === 'AT_RISK' ? 'warning' : 'danger'}
                    dot
                  >
                    {p.health === 'ON_TRACK' ? 'On track' : p.health === 'AT_RISK' ? 'At risk' : 'Delayed'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* 2. Calendar Strip & Next Meeting */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <h2 className="text-base font-semibold text-text tracking-tight">Calendar</h2>
              </div>
              <span className="text-xs text-text-faint">November 2026</span>
            </div>

            {/* Horizontal Day Selector Strip */}
            <div className="flex items-center justify-between gap-1.5">
              <button className="p-1 rounded text-text-faint hover:text-text hover:bg-bg-subtle" aria-label="Previous day">
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <div className="grid grid-cols-7 gap-1.5 flex-1">
                {calendarDays.map((d) => {
                  const isSelected = selectedDay === d.date;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => setSelectedDay(d.date)}
                      className={`flex flex-col items-center py-2 px-1 rounded-input border transition ${
                        isSelected
                          ? 'bg-accent text-accent-fg border-accent font-semibold'
                          : 'bg-surface border-border text-text-muted hover:border-border-strong'
                      }`}
                    >
                      <span className="text-[10px] uppercase">{d.day}</span>
                      <span className="text-xs font-semibold tabular-nums mt-0.5">{d.date}</span>
                    </button>
                  );
                })}
              </div>

              <button className="p-1 rounded text-text-faint hover:text-text hover:bg-bg-subtle" aria-label="Next day">
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Next Scheduled Meeting Card */}
            <div className="p-3.5 rounded-input bg-bg-subtle border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-text">
                  Architecture Review with Lead (Puneeth Rajkumar)
                </div>
                <div className="text-[11px] text-text-muted">
                  Today &bull; 11:00 - 11:30 AM &bull; Platform Architecture Sync
                </div>
                <div className="inline-flex items-center gap-1.5 text-[11px] text-text font-semibold px-2 py-0.5 rounded border border-border bg-surface mt-1">
                  <Video className="w-3 h-3 text-status-danger" strokeWidth={1.5} />
                  <span>Google Meet</span>
                </div>
              </div>

              {/* Attendee Avatar Stack */}
              <div className="flex items-center -space-x-1.5 self-start sm:self-auto">
                <div className="w-6 h-6 rounded bg-border text-text text-[10px] font-semibold flex items-center justify-center border border-surface">
                  PR
                </div>
                <div className="w-6 h-6 rounded bg-border text-text text-[10px] font-semibold flex items-center justify-center border border-surface">
                  YV
                </div>
                <div className="w-6 h-6 rounded bg-border text-text text-[10px] font-semibold flex items-center justify-center border border-surface">
                  YS
                </div>
              </div>
            </div>
          </Card>

          {/* 3. Reminders Checklist */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h2 className="text-base font-semibold text-text tracking-tight">Reminders</h2>
              <span className="text-xs text-text-faint tabular-nums">{reminders.length} items</span>
            </div>

            <div className="space-y-1.5">
              {reminders.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-2 rounded-input hover:bg-bg-subtle transition text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <button
                      type="button"
                      onClick={() => onToggleReminder(r.id)}
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
                        r.done
                          ? 'bg-status-success border-status-success text-white'
                          : 'border-border-strong hover:border-text'
                      }`}
                      aria-label="Toggle reminder"
                    >
                      {r.done && <Check className="w-3 h-3" strokeWidth={1.5} />}
                    </button>
                    <span className={`truncate ${r.done ? 'line-through text-text-faint' : 'text-text'}`}>
                      {r.text}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-text-faint shrink-0">
                    <button
                      type="button"
                      onClick={() => onDeleteReminder(r.id)}
                      className="hover:text-status-danger p-0.5"
                      aria-label="Delete reminder"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN (5 COLS): My Tasks, Goals & Milestones, Sprint Velocity Chart */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* 4. My Tasks Card (priority dot + due time) */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <h2 className="text-base font-semibold text-text tracking-tight">My Tasks</h2>
              </div>
              <button onClick={() => onNavigate('kanban')} className="text-xs text-text-muted hover:text-text">
                Board &rarr;
              </button>
            </div>

            <div className="space-y-2">
              {(myTasks.length > 0 ? myTasks.slice(0, 4) : tasks.slice(0, 4)).map((t) => {
                const dotColor =
                  t.priority === 'CRITICAL' || t.priority === 'HIGH'
                    ? 'bg-status-danger'
                    : t.priority === 'MEDIUM'
                    ? 'bg-status-warning'
                    : 'bg-text-faint';

                return (
                  <div
                    key={t.id || t.code}
                    className="p-3 rounded-input bg-bg-subtle border border-border space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                        <span className="font-semibold text-text truncate max-w-[200px]">{t.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-text-faint">{t.points} pts</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-text-muted pt-1 border-t border-border">
                      <span className="tabular-nums">{t.date || 'Today · 10:00 AM'}</span>
                      <span className="font-semibold text-text">{t.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 5. Goals and Milestones (thin progress bars in navy, percentage on right) */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-text-muted" strokeWidth={1.5} />
                <h2 className="text-base font-semibold text-text tracking-tight">Goals &amp; Milestones</h2>
              </div>
              <button onClick={() => onNavigate('milestones')} className="text-xs text-text-muted hover:text-text">
                Roadmap &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {milestones.slice(0, 4).map((m) => (
                <div key={m.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text truncate pr-2">{m.title}</span>
                    <span className="font-semibold text-text tabular-nums">{m.progress}%</span>
                  </div>
                  {/* Thin 4px progress bar in navy / accent */}
                  <ProgressBar value={m.progress} variant="accent" />
                  <div className="text-[10px] text-text-faint tabular-nums">Due {m.targetDate}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* 6. Sprint Velocity Chart (navy line only, light grid, no legend clutter) */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h2 className="text-base font-semibold text-text tracking-tight">Sprint Velocity</h2>
              <span className="text-xs text-text-muted tabular-nums">Avg 39.6 pts</span>
            </div>

            <div className="h-44 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={velocityData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="sprint"
                    tick={{ fill: 'var(--text-faint)', fontSize: 10 }}
                    axisLine={{ stroke: 'var(--border)' }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: 'var(--text-faint)', fontSize: 10 }}
                    axisLine={{ stroke: 'var(--border)' }}
                    tickLine={false}
                    domain={[0, 50]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border-strong)',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: 'var(--text)',
                    }}
                  />
                  {/* Navy line only, stroke width 1.5 */}
                  <Line
                    type="monotone"
                    dataKey="points"
                    stroke="var(--accent)"
                    strokeWidth={1.5}
                    dot={{ r: 3, fill: 'var(--accent)' }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}

