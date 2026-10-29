# System Technical Architecture

Enterprise platform combining Jira-style Kanban governance and ServiceNow-style service desk with SLA automation.

## 1. System Layers
```text
[React 18 SPA + Tailwind CSS]
              | (REST / JSON)
[Spring Security 6 (Stateless JWT + RBAC)]
              |
[Spring Boot 3 REST Controllers]
              |
[Business Services (SLA Calculator + Workload Engine)]
              |
[Persistence: Pure ORM (Spring Data JPA / Hibernate)]
              |
[Database: PostgreSQL / H2 In-Memory]
```

## 2. RBAC Roles
1. ROLE_ADMIN: System configuration and user access.
2. ROLE_PROJECT_MANAGER: Project portfolio and milestone governance.
3. ROLE_TEAM_LEAD: Sprint oversight and developer capacity planning.
4. ROLE_TEAM_MEMBER: Kanban task execution and status updates.
5. ROLE_SERVICE_AGENT: Ticket resolution and SLA timer actions.

## 3. Core Formulas
- Project Progress: (Completed Tasks / Total Tasks) * 100%
- SLA Warning: Elapsed Time >= 0.75 * Target Resolution Time
- Workload Utilization: (Assigned Hours / 40h standard) * 100% (Flag alert if > 100%)
