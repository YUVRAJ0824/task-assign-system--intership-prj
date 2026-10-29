# System Technical Architecture & Design Document

## 1. System Overview
The **Enterprise Project & Service Management Platform** bridges high-level project management (initiatives, milestones, Kanban boards) with operational service desk requirements (ticketing, SLAs, real-time workload balancing).

---

## 2. Layered Architecture

```text
+-------------------------------------------------------------+
|                      React.js 18 SPA                        |
|  (Tailwind CSS, Vite, Lucide Icons, Recharts Data Viz)      |
+-------------------------------------------------------------+
                              |
                     REST APIs / HTTPS
                              |
+-------------------------------------------------------------+
|             Spring Security 6 Gateway Layer                 |
|         (Stateless JWT, CorsFilter, RBAC Guards)            |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                 Spring Boot 3.3.x REST APIs                 |
|   - ProjectGovernanceController    - KanbanTaskController   |
|   - ServiceTicketController        - SlaEngineController    |
|   - WorkloadMatrixController       - AuthController         |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|                     Domain Services                         |
|   - SlaCalculationEngine           - CapacityBalancingEngine|
|   - HealthScoreCalculator          - AuditLoggingService    |
+-------------------------------------------------------------+
                              |
+-------------------------------------------------------------+
|              Persistence (Spring Data JPA)                  |
|          PostgreSQL (Prod) / H2 In-Memory (Dev)             |
+-------------------------------------------------------------+
```

---

## 3. RBAC Roles & Hierarchy

1. **ROLE_ADMIN:** System-wide configuration, audit access, user role assignments.
2. **ROLE_PROJECT_MANAGER:** Full project lifecycle, budget/milestone configuration, task assignments.
3. **ROLE_TEAM_LEAD:** Sprint management, task board reviews, developer capacity planning.
4. **ROLE_TEAM_MEMBER:** Task execution, time logging, drag-and-drop Kanban updates.
5. **ROLE_SERVICE_AGENT:** Service desk ticket triaging, SLA resolution timer stops.

---

## 4. Key Calculation Formulas

### Task Completion %:
$$\text{Project Progress} = \left(\frac{\text{Completed Deliverables}}{\text{Total Deliverables}}\right) \times 100\%$$

### SLA Warning Threshold:
$$\text{Elapsed Time} \ge 0.75 \times \text{Target Resolution Time} \implies \text{Trigger SLA Warning Alert}$$

### Workload Utilization:
$$\text{Utilization \%} = \left(\frac{\sum \text{Allocated Hours per Week}}{40\text{ Hours}}\right) \times 100\%$$
- If $\text{Utilization} > 100\% \implies \textbf{Burnout / Overload Alert}$.
