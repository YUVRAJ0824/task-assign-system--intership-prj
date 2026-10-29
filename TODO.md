# 📋 4-Week Daily TO-DO Master Checklist (5% / Day)

> **Sprint Rule:** Complete exactly **5% of the platform each working day** (20 days total).  
> **Progression:** Basic $\to$ Mid-Level $\to$ Production Grade.

---

## 📈 Overall Progress Tracker
- **Current Progress:** `[=====---------------------------------------] 5% (Day 1 / 20)`
- **Target Completion Date:** 20 working days (~4 weeks)

---

## 🗓️ Week 1: System Baseline, Identity & Project Domain (Days 1 – 5 | 5% – 25%)

### ✅ Day 1: Project Scaffolding & Git Governance (5% Completed)
- [x] **Git Initialization:** Setup repository with `main` branch.
- [x] **`.gitignore` Configuration:** Exclude `struct img`, `*.pdf`, `node_modules/`, `target/`, IDE files.
- [x] **Spring Boot 3 API Setup:** Configure `pom.xml`, Java 17+, H2 & Postgres drivers, JPA, Security.
- [x] **Standard API DTO:** Create `ApiResponse<T>` with timestamp and status indicators.
- [x] **Error Handling:** Setup `GlobalExceptionHandler` and `ResourceNotFoundException`.
- [x] **Security Baseline:** Stateless `SecurityFilterChain` permitting `/api/v1/health` & Swagger.
- [x] **Frontend Setup:** React 18 + Vite + Tailwind CSS + Lucide Icons initialized.
- [x] **Day 1 Verification:** `vite build` verified, health REST endpoint tested.

---

### ⏳ Day 2: Persistence Layer & Database Models (10% Target)
- [ ] **Dual Profile Config:** H2 in-memory for testing, PostgreSQL 15+ for persistence.
- [ ] **Base Auditing Entity:** Create `BaseEntity` (`createdAt`, `updatedAt`, `@CreatedDate`, `@LastModifiedDate`).
- [ ] **JPA Auditing:** Enable `@EnableJpaAuditing` configuration.
- [ ] **Schema Migration Baseline:** Create `schema.sql` / Liquibase baseline.
- [ ] **Database Connection Health:** Add DB connection check to `/api/v1/health`.

---

### ⏳ Day 3: User Entity & Role-Based Access Control (15% Target)
- [ ] **User Model:** Create `User` entity (`id`, `username`, `email`, `passwordHash`, `role`, `department`).
- [ ] **Role Enums:** Setup 5 personas (`ROLE_ADMIN`, `ROLE_PROJECT_MANAGER`, `ROLE_TEAM_LEAD`, `ROLE_TEAM_MEMBER`, `ROLE_SERVICE_AGENT`).
- [ ] **Password Security:** Implement `BCryptPasswordEncoder` hashing utility.
- [ ] **User Repository:** Spring Data JPA `UserRepository` (`findByEmail`, `findByUsername`).
- [ ] **User DTOs:** Create `UserResponseDto` and `RegisterRequestDto`.

---

### ⏳ Day 4: Stateless JWT Authentication Engine (20% Target)
- [ ] **JWT Utility:** Create `JwtTokenProvider` (generate token, extract claims, validate expiration).
- [ ] **JWT Auth Filter:** Implement `JwtAuthenticationFilter` reading `Authorization: Bearer <token>`.
- [ ] **Auth REST Controller:** Create `/api/v1/auth/login` and `/api/v1/auth/register`.
- [ ] **Auth Service:** User authentication against database and token issuance.
- [ ] **Protected Endpoint Test:** Verify authenticated vs unauthenticated access guards.

---

### ⏳ Day 5: Project Portfolio Domain (25% Target)
- [ ] **Project Entity:** `Project` (`id`, `name`, `code`, `description`, `healthScore`, `status`, `targetDate`).
- [ ] **Project Health Enum:** `ON_TRACK`, `AT_RISK`, `DELAYED`.
- [ ] **Project Repository & Service:** CRUD operations, health auto-calculation logic.
- [ ] **Project REST Controller:** `/api/v1/projects` (GET all, POST create, GET by ID, PUT update).
- [ ] **Seed Initial Projects:** Auto-populate 3 sample demo projects on startup.

---

## 🗓️ Week 2: Core Engines – Tasks, Tickets, SLA & Workload (Days 6 – 10 | 30% – 50%)

### ⏳ Day 6: Kanban Task Engine (30% Target)
- [ ] **Task Entity:** `Task` (`id`, `title`, `description`, `status`, `priority`, `storyPoints`, `assigneeId`, `projectId`).
- [ ] **Task Status Flow:** `BACKLOG` $\to$ `TO_DO` $\to$ `IN_PROGRESS` $\to$ `IN_REVIEW` $\to$ `DONE`.
- [ ] **Task Drag-and-Drop Patch API:** `PATCH /api/v1/tasks/{id}/status` for status column transitions.
- [ ] **Project Linkage:** Cascade delete & query tasks by `projectId`.
- [ ] **Effort Estimation:** Track estimated vs actual story points.

---

### ⏳ Day 7: Service Desk & Ticketing Subsystem (35% Target)
- [ ] **Issue Entity:** `ServiceTicket` (`id`, `ticketNumber`, `subject`, `category`, `severity`, `status`, `reporter`).
- [ ] **Severity Scale:** `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
- [ ] **Ticket Lifecycle:** `OPEN` $\to$ `ASSIGNED` $\to$ `IN_PROGRESS` $\to$ `RESOLVED` $\to$ `CLOSED`.
- [ ] **Ticket REST Controller:** `POST /api/v1/tickets` (log issue, assign ticket number).
- [ ] **Resolution Notes:** Add resolution history and timestamp audit.

---

### ⏳ Day 8: Real-Time SLA Countdown Engine (40% Target)
- [ ] **SLA Policy Matrix:** Target response & resolution times per severity (Critical = 2h, High = 8h, etc.).
- [ ] **SLA Calculation Service:** Calculate time elapsed, target resolution timestamp, remaining time.
- [ ] **Threshold Warning Trigger:** Trigger automated warning when elapsed time reaches 75% of SLA threshold.
- [ ] **Breach Escalation Logger:** Log SLA violations and mark ticket `BREACHED`.
- [ ] **SLA REST API:** `/api/v1/sla/metrics` summary endpoint for tickets at risk.

---

### ⏳ Day 9: Developer Workload & Capacity Balancing Engine (45% Target)
- [ ] **Workload Calculation Service:** Aggregate active task story points and weekly assigned hours per user.
- [ ] **Capacity Utilization Formula:** `(Assigned Hours / 40h standard) * 100%`.
- [ ] **Burnout Alert Mechanism:** Flag users where utilization exceeds 100%.
- [ ] **Workload Controller:** `/api/v1/workload/team` returning team allocation matrix.
- [ ] **Workload Balancing Hint:** Recommend least-allocated developer for new assignments.

---

### ⏳ Day 10: Backend Testing & API Documentation (50% Target – Halfway Mark)
- [ ] **Swagger / OpenAPI Documentation:** Document all REST controllers with schemas & examples.
- [ ] **Unit Tests:** JUnit 5 test cases for `SlaCalculationService` and `WorkloadEngine`.
- [ ] **Integration Tests:** MockMvc tests for `/api/v1/auth/login` and `/api/v1/projects`.
- [ ] **H2 Console Verification:** Validate in-memory tables and relationships.
- [ ] **Postman Collection:** Export API collection for end-to-end testing.

---

## 🗓️ Week 3: Client Single Page Application (Days 11 – 15 | 55% – 75%)

### ⏳ Day 11: Frontend Navigation Shell & Routing (55% Target)
- [ ] **Router Configuration:** Setup `react-router-dom` with routes for Dashboard, Projects, Kanban, Tickets, Workload.
- [ ] **Sidebar Layout:** Collapsible sidebar with active navigation indicators.
- [ ] **Header Bar:** Breadcrumbs, user profile dropdown, notification bell.
- [ ] **Axios Client Configuration:** Centralized Axios instance with base URL and response interceptor.

---

### ⏳ Day 12: Authentication UI & Route Guards (60% Target)
- [ ] **Login Screen:** Clean login card with email/password validation.
- [ ] **Registration Screen:** User signup with role and department selector.
- [ ] **AuthContext:** React Context for session management (`user`, `token`, `login()`, `logout()`).
- [ ] **ProtectedRoute Component:** Redirect unauthenticated users to `/login`.
- [ ] **RoleGuard:** Restrict admin-only pages (e.g. Workload config).

---

### ⏳ Day 13: Executive Dashboard Overview (65% Target)
- [ ] **KPI Stat Cards:** Total Active Projects, Open Kanban Tasks, Pending Tickets, Team Utilization.
- [ ] **Health Score Meter:** Visual percentage ring of on-track vs at-risk initiatives.
- [ ] **Quick Action Bar:** Buttons to create project, task, or ticket.
- [ ] **Recent Activity Feed:** Feed of latest status changes and ticket updates.

---

### ⏳ Day 14: Interactive Kanban Board UI (70% Target)
- [ ] **Column Architecture:** Columns for `Backlog`, `To Do`, `In Progress`, `Review`, `Done`.
- [ ] **Task Card Component:** Display priority badge, assignee avatar, story points, tag labels.
- [ ] **Drag-and-Drop Interaction:** Smooth card re-ordering and status transition syncing via API.
- [ ] **Quick Task Creator:** Inline task addition directly inside any column.
- [ ] **Task Detail Drawer:** Modal to inspect full description, update comments and story points.

---

### ⏳ Day 15: Project Governance & Portfolio View (75% Target)
- [ ] **Project Portfolio Grid:** Cards displaying project code, lead name, completion percentage bar.
- [ ] **Health Badge Indicator:** Dynamic colors (Green = On Track, Amber = At Risk, Red = Delayed).
- [ ] **Project Creation Modal:** Form with title, code, target deadline, and initial budget.
- [ ] **Project Filter Bar:** Filter by status, owner, or search by project keyword.

---

## 🗓️ Week 4: Service Desk, SLA Gauges, Analytics & Deployment (Days 16 – 20 | 80% – 100%)

### ⏳ Day 16: Service Desk Portal & SLA Countdown Gauges (80% Target)
- [ ] **Ticket Management Table:** Searchable list of open IT tickets with severity tags.
- [ ] **Live SLA Countdown Gauge:** Animated progress bar showing time remaining until SLA target.
- [ ] **Threshold Danger Alert:** Badge shifts to flashing red when SLA exceeds 75% warning mark.
- [ ] **Ticket Action Modal:** Assign agent, change status, and submit resolution notes.

---

### ⏳ Day 17: Resource Workload Matrix UI (85% Target)
- [ ] **Developer Allocation Table:** Visual matrix showing team member vs assigned story points.
- [ ] **Capacity Progress Bar:** Color-coded bar (Green $<80\%$, Blue $80-100\%$, Red $>100\%$).
- [ ] **Burnout Warning Pill:** High-visibility badge on over-allocated team members.
- [ ] **Re-allocation Action:** Quick transfer tasks from overloaded to available developers.

---

### ⏳ Day 18: Executive Analytics & Recharts (90% Target)
- [ ] **Project Health Chart:** Pie/Donut chart of portfolio health distribution.
- [ ] **SLA Compliance Trend:** Area/Line chart of resolution compliance percentage over time.
- [ ] **Workload Bar Chart:** Comparative bar chart of developer capacity across departments.
- [ ] **Data Export:** Button to export audit logs to CSV format.

---

### ⏳ Day 19: Full-Stack Integration & UI Polish (95% Target)
- [ ] **End-to-End API Wiring:** Connect all React views to live Spring Boot endpoints.
- [ ] **Toast Notifications:** Alert pops for successful task move, ticket creation, SLA alerts.
- [ ] **Empty States & Skeletons:** Clean loading placeholders when fetching API data.
- [ ] **Error Boundary:** Graceful fallback UI for unexpected network or rendering errors.

---

### ⏳ Day 20: Containerization, CI/CD & Final Delivery (100% Target)
- [ ] **Docker Compose:** Multi-container `docker-compose.yml` for PostgreSQL, Spring Boot, and React.
- [ ] **Database Seeder:** Auto-load realistic demo portfolio, tickets, and workload data.
- [ ] **GitHub Actions Workflow:** Automated build and test pipeline on push to `main`.
- [ ] **Project Presentation Deck / Demo Guide:** Step-by-step walkthrough for final showcase!
