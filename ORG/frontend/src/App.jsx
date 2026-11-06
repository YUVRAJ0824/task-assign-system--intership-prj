import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { AppShell } from './components/layout/AppShell';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { KanbanPage } from './pages/KanbanPage';
import { MilestonesPage } from './pages/MilestonesPage';
import { ServiceDeskPage } from './pages/ServiceDeskPage';
import { ApprovalsPage } from './pages/ApprovalsPage';
import { SquadWorkloadPage } from './pages/SquadWorkloadPage';
import { AuditTrailPage } from './pages/AuditTrailPage';

import api from './api/client';

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Core Data States with realistic fallbacks
  const [projects, setProjects] = useState([
    { id: 1, code: 'PRJ-101', name: 'Enterprise Platform Core', lead: 'Puneeth Rajkumar', dueDate: '2026-11-20', health: 'ON_TRACK', progress: 65, tasksCount: 12, teammates: 5 },
    { id: 2, code: 'PRJ-102', name: 'Payment & Billing Gateway', lead: 'Yuvraj V', dueDate: '2026-11-28', health: 'ON_TRACK', progress: 45, tasksCount: 8, teammates: 4 },
    { id: 3, code: 'PRJ-103', name: 'Cloud Infrastructure Migration', lead: 'Yash', dueDate: '2026-12-05', health: 'AT_RISK', progress: 30, tasksCount: 14, teammates: 6 },
    { id: 4, code: 'PRJ-104', name: 'Security & Identity Modernization', lead: 'Rishab Shetty', dueDate: '2026-12-15', health: 'ON_TRACK', progress: 80, tasksCount: 7, teammates: 3 },
  ]);

  const [milestones, setMilestones] = useState([
    { id: 1, projectCode: 'PRJ-101', title: 'Achieve monthly sales target of 15% growth', owner: 'Puneeth Rajkumar', targetDate: '2026-11-15', status: 'IN_PROGRESS', progress: 27 },
    { id: 2, projectCode: 'PRJ-101', title: 'Complete a data visualization course', owner: 'Yuvraj V', targetDate: '2026-11-20', status: 'IN_PROGRESS', progress: 11 },
    { id: 3, projectCode: 'PRJ-102', title: 'Implement a new project management tool', owner: 'Yuvraj V', targetDate: '2026-11-25', status: 'IN_PROGRESS', progress: 94 },
    { id: 4, projectCode: 'PRJ-103', title: 'Launch the new feature', owner: 'Yash', targetDate: '2026-12-01', status: 'IN_PROGRESS', progress: 36 },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, code: 'TSK-101', title: 'Analyze user metrics and query bottlenecks', priority: 'HIGH', points: 5, assignee: 'Yuvraj V', team: 'Platform Core', status: 'IN_PROGRESS', date: '4 Nov · 09:20 AM' },
    { id: 2, code: 'TSK-102', title: "Finalize app's onboarding and JWT auth flows", priority: 'LOW', points: 3, assignee: 'Yuvraj V', team: 'Platform Core', status: 'DONE', date: '3 Nov · 11:00 AM' },
    { id: 3, code: 'TSK-103', title: 'Conduct a content and API audit', priority: 'MEDIUM', points: 5, assignee: 'Rishab Shetty', team: 'Security & Auth', status: 'TODO', date: '3 Nov · 09:00 AM' },
    { id: 4, code: 'TSK-104', title: 'Update brand style guide & pastel palette', priority: 'LOW', points: 2, assignee: 'Yuvraj V', team: 'Platform Core', status: 'TODO', date: '2 Nov · 10:30 AM' },
    { id: 5, code: 'TSK-105', title: 'Configure pure JPA Flyway database schemas', priority: 'HIGH', points: 8, assignee: 'Yash', team: 'Cloud Infrastructure', status: 'REVIEW', date: '1 Nov · 04:15 PM' },
  ]);

  const [tickets, setTickets] = useState([
    { id: 1, code: 'TKT-101', subject: 'Memory Leak on Background Task Runner', severity: 'CRITICAL', status: 'IN_PROGRESS', targetHours: 8, reporter: 'Ops Center', dept: 'Platform Core', createdAt: '2026-11-05T13:00:00' },
    { id: 2, code: 'TKT-102', subject: 'JWT Bearer Expiration Handshake Failure', severity: 'HIGH', status: 'IN_PROGRESS', targetHours: 8, reporter: 'QA Lead', dept: 'Security & Auth', createdAt: '2026-11-05T15:30:00' },
    { id: 3, code: 'TKT-103', subject: 'CORS header mismatch on Swagger UI', severity: 'LOW', status: 'RESOLVED', targetHours: 12, reporter: 'Dev Portal', dept: 'Cloud Infrastructure', createdAt: '2026-11-04T14:00:00' },
  ]);

  const [approvals, setApprovals] = useState([
    { id: 1, code: 'APR-101', title: 'Production Database Schema Migration', category: 'DEPLOYMENT', projectCode: 'PRJ-102', requester: 'Yash', approver: 'Puneeth Rajkumar', status: 'APPROVED', notes: 'Executes Flyway V2 script adding foreign keys to transaction logs' },
    { id: 2, code: 'APR-102', title: 'Allocate 15 Story Points for OAuth2 Refactor', category: 'BUDGET', projectCode: 'PRJ-101', requester: 'Yuvraj V', approver: 'Puneeth Rajkumar', status: 'APPROVED', notes: 'Scope extension for enterprise Azure AD single sign-on federation' },
    { id: 3, code: 'APR-103', title: 'Cloud Server Scale-up for Traffic Peak', category: 'DEPLOYMENT', projectCode: 'PRJ-103', requester: 'Rishab Shetty', approver: 'Yash', status: 'PENDING', notes: 'Request to spin up 4 additional c6g.xlarge worker instances' },
    { id: 4, code: 'APR-104', title: 'External Security Penetration Test Access', category: 'SECURITY', projectCode: 'PRJ-104', requester: 'Rishab Shetty', approver: 'Puneeth Rajkumar', status: 'APPROVED', notes: 'Grant read-only staging VPC access to third-party auditor' },
  ]);

  const [workload, setWorkload] = useState([
    { name: 'Yuvraj V', squad: 'Platform Core', points: 10 },
    { name: 'Puneeth Rajkumar', squad: 'Platform Architecture', points: 6 },
    { name: 'Yash', squad: 'Cloud Infrastructure', points: 12 },
    { name: 'Rishab Shetty', squad: 'Security & Auth', points: 5 },
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, actor: 'system.bootstrap', action: 'SYSTEM_INIT', target: 'PLATFORM', message: 'Enterprise platform booted with Pure JPA ORM profile', ip: '127.0.0.1', timestamp: '2026-11-05 09:00:00' },
    { id: 2, actor: 'admin', action: 'USER_ROLE_ASSIGNED', target: 'yuvraj.v', message: 'Assigned ROLE_TEAM_MEMBER on Platform Core squad', ip: '192.168.1.10', timestamp: '2026-11-05 09:15:22' },
    { id: 3, actor: 'puneeth.rajkumar', action: 'APPROVAL_GRANTED', target: 'APR-101', message: 'Approved Production Database Schema Migration', ip: '192.168.1.12', timestamp: '2026-11-05 14:30:10' },
    { id: 4, actor: 'yuvraj.v', action: 'TASK_STATUS_UPDATE', target: 'TSK-102', message: 'Moved JWT onboarding to DONE (+3 story points)', ip: '192.168.1.15', timestamp: '2026-11-05 17:15:00' },
  ]);

  const [reminders, setReminders] = useState([
    { id: 1, text: 'Prepare the weekly project status report.', done: false },
    { id: 2, text: 'Review action items from yesterday’s team meeting with Puneeth.', done: false },
    { id: 3, text: 'Draft a presentation on Q3 performance goals & SLA targets.', done: true },
    { id: 4, text: 'Verify Spring Boot 3 pure ORM mappings for task assignment.', done: false },
  ]);

  // Fetch all endpoints
  const refreshAll = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const healthRes = await api.get('/health').catch(() => null);
      if (healthRes && healthRes.data) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }

      const [pRes, mRes, tRes, tkRes, aRes, wRes, auRes] = await Promise.allSettled([
        api.get('/projects'),
        api.get('/milestones'),
        api.get('/tasks'),
        api.get('/tickets'),
        api.get('/approvals'),
        api.get('/workload'),
        api.get('/audit'),
      ]);

      if (pRes.status === 'fulfilled' && pRes.value?.data?.data) setProjects(pRes.value.data.data);
      if (mRes.status === 'fulfilled' && mRes.value?.data?.data) setMilestones(mRes.value.data.data);
      if (tRes.status === 'fulfilled' && tRes.value?.data?.data) setTasks(tRes.value.data.data);
      if (tkRes.status === 'fulfilled' && tkRes.value?.data?.data) setTickets(tkRes.value.data.data);
      if (aRes.status === 'fulfilled' && aRes.value?.data?.data) setApprovals(aRes.value.data.data);
      if (wRes.status === 'fulfilled' && wRes.value?.data?.data) setWorkload(wRes.value.data.data);
      if (auRes.status === 'fulfilled' && auRes.value?.data?.data) setAuditLogs(auRes.value.data.data);
    } catch {
      setIsOnline(false);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Action handlers
  const handleCreateProject = async (newProj) => {
    try {
      const res = await api.post('/projects', newProj);
      if (res.data?.data) setProjects((prev) => [...prev, res.data.data]);
      else setProjects((prev) => [...prev, newProj]);
    } catch {
      setProjects((prev) => [...prev, newProj]);
    }
  };

  const handleCreateMilestone = async (newM) => {
    try {
      const res = await api.post('/milestones', newM);
      if (res.data?.data) setMilestones((prev) => [...prev, res.data.data]);
      else setMilestones((prev) => [...prev, newM]);
    } catch {
      setMilestones((prev) => [...prev, newM]);
    }
  };

  const handleCreateTask = async (newT) => {
    try {
      const res = await api.post('/tasks', newT);
      if (res.data?.data) setTasks((prev) => [...prev, res.data.data]);
      else setTasks((prev) => [...prev, newT]);
    } catch {
      setTasks((prev) => [...prev, newT]);
    }
  };

  const handleMoveTask = async (taskId, newStatus) => {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
    try {
      await api.patch(`/tasks/${taskId}/status?status=${newStatus}`);
    } catch {}
  };

  const handleCreateTicket = async (newTk) => {
    try {
      const res = await api.post('/tickets', newTk);
      if (res.data?.data) setTickets((prev) => [...prev, res.data.data]);
      else setTickets((prev) => [...prev, newTk]);
    } catch {
      setTickets((prev) => [...prev, newTk]);
    }
  };

  const handleResolveTicket = async (ticketId) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status: 'RESOLVED' } : t)));
    try {
      await api.put(`/tickets/${ticketId}/resolve`);
    } catch {}
  };

  const handleApprove = async (id) => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'APPROVED' } : a)));
    try {
      await api.put(`/approvals/${id}/approve`);
    } catch {}
  };

  const handleReject = async (id, reason) => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'REJECTED', notes: reason } : a)));
    try {
      await api.put(`/approvals/${id}/reject`, { reason });
    } catch {}
  };

  const handleToggleReminder = (id) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r)));
  };

  const handleDeleteReminder = (id) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  // Titles mapping
  const titles = {
    dashboard: 'Dashboard',
    projects: 'Projects',
    kanban: 'Tasks',
    milestones: 'Milestones',
    tickets: 'Service Desk',
    approvals: 'Approvals',
    workload: 'Squad Workload',
    audit: 'Audit Trail',
  };

  const counts = {
    projects: projects.length,
    tasks: tasks.length,
    milestones: milestones.length,
    tickets: tickets.filter((t) => t.status !== 'RESOLVED').length,
    approvals: approvals.filter((a) => a.status === 'PENDING').length,
  };

  return (
    <AppShell
      activeTab={activeTab}
      onSelectTab={setActiveTab}
      counts={counts}
      isOnline={isOnline}
      onRefresh={refreshAll}
      isRefreshing={isRefreshing}
      title={titles[activeTab] || 'Dashboard'}
    >
      {activeTab === 'dashboard' && (
        <DashboardPage
          projects={projects}
          tasks={tasks}
          milestones={milestones}
          reminders={reminders}
          onToggleReminder={handleToggleReminder}
          onDeleteReminder={handleDeleteReminder}
          onOpenNewTask={() => setActiveTab('kanban')}
          onOpenNewProject={() => setActiveTab('projects')}
          onNavigate={setActiveTab}
        />
      )}

      {activeTab === 'projects' && (
        <ProjectsPage projects={projects} onCreateProject={handleCreateProject} />
      )}

      {activeTab === 'kanban' && (
        <KanbanPage tasks={tasks} onMoveTask={handleMoveTask} onCreateTask={handleCreateTask} />
      )}

      {activeTab === 'milestones' && (
        <MilestonesPage milestones={milestones} onCreateMilestone={handleCreateMilestone} />
      )}

      {activeTab === 'tickets' && (
        <ServiceDeskPage
          tickets={tickets}
          onResolveTicket={handleResolveTicket}
          onCreateTicket={handleCreateTicket}
        />
      )}

      {activeTab === 'approvals' && (
        <ApprovalsPage approvals={approvals} onApprove={handleApprove} onReject={handleReject} />
      )}

      {activeTab === 'workload' && <SquadWorkloadPage workload={workload} />}

      {activeTab === 'audit' && <AuditTrailPage auditLogs={auditLogs} />}
    </AppShell>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
