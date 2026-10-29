# 📅 20-Day Implementation Roadmap (5% Progress Daily)

This roadmap divides the full **Enterprise Project & Service Management Platform** into **20 discrete daily milestones**, each delivering exactly **5% of the overall system**.

---

### ⏱️ Timeline Overview

- **Daily Rate:** 5% per day
- **Total Duration:** 20 Days
- **Completion Target:** 20 working days from kickoff (Started: Oct 29, 2026 $\to$ Target: Nov 17–18, 2026)

---

### 📊 Daily Milestone Breakdown

| Day | Cumulative % | Phase | Key Deliverables | Status |
|:---:|:---:|:---|:---|:---:|
| **Day 1** | **5%** | **Foundation** | Git setup, `.gitignore`, Scaffolding (Backend & Frontend), Architecture & Base Config | ✅ **Done** |
| **Day 2** | **10%** | **Persistence** | Database configuration (PostgreSQL & H2 fallback), JPA Auditing, Base Entities | ⏳ Pending |
| **Day 3** | **15%** | **Identity** | User entity, 5 RBAC roles (Admin, PM, Lead, Member, Agent), BCrypt hashing | ⏳ Pending |
| **Day 4** | **20%** | **Security** | Spring Security 6, JWT Token Provider, Login & Register API endpoints | ⏳ Pending |
| **Day 5** | **25%** | **Projects** | Project entity, Repository, Service & REST API (Health indicators, completion %) | ⏳ Pending |
| **Day 6** | **30%** | **Tasks** | Kanban Task entity, Status flow (`BACKLOG` $\to$ `DONE`), Task priority ranking | ⏳ Pending |
| **Day 7** | **35%** | **Tickets** | Service Desk Issue & Ticket entity, Severity categorization, Ticket lifecycle | ⏳ Pending |
| **Day 8** | **40%** | **SLA Engine** | SLA countdown calculations, 75% breach warning trigger, Escalation logging | ⏳ Pending |
| **Day 9** | **45%** | **Workload** | Resource Workload Matrix calculation, Team capacity & Overload alerts | ⏳ Pending |
| **Day 10** | **50%** | **Backend Milestone** | Backend Integration Tests, OpenAPI / Swagger UI live documentation | ⏳ Pending |
| **Day 11** | **55%** | **Frontend Core** | React 18 + Vite + Tailwind CSS initialization, Router setup, Axios client | ⏳ Pending |
| **Day 12** | **60%** | **Frontend Auth** | Login & Register pages, JWT Storage, Axios Interceptors, Protected Route wrapper | ⏳ Pending |
| **Day 13** | **65%** | **App Shell** | Responsive Sidebar, Top Navbar, User Profile badge, Notification system | ⏳ Pending |
| **Day 14** | **70%** | **Kanban UI** | Interactive Drag-and-Drop Kanban Board with status columns & card editing | ⏳ Pending |
| **Day 15** | **75%** | **Projects UI** | Project Portfolio view, Project creation modal, Health badges & Progress bars | ⏳ Pending |
| **Day 16** | **80%** | **Service Desk UI** | Ticket management view, Ticket detail modal, Real-time SLA Countdown badges | ⏳ Pending |
| **Day 17** | **85%** | **Workload UI** | Developer capacity matrix view, Weekly allocation table, Burnout warnings | ⏳ Pending |
| **Day 18** | **90%** | **Analytics** | Executive KPI Dashboard with Recharts (Health distribution, SLA trends, Export CSV) | ⏳ Pending |
| **Day 19** | **95%** | **Polish & Guard** | Role-based UI visibility, Input validations, Toast alerts, Error boundaries | ⏳ Pending |
| **Day 20** | **100%** | **Final Release** | Docker Compose setup, GitHub Actions CI pipeline, Seed demo data, Ready for demo! | ⏳ Pending |

---

### 🎯 Day 1 Summary (5% Delivered)
1. Initialized Git repository with `main` branch.
2. Created `.gitignore` ignoring `struct img`, binaries, node_modules, target, and IDE artifacts.
3. Created complete Project Architecture and standard Directory Tree.
4. Scaffolded Spring Boot 3 Maven backend structure (`pom.xml`, `application.yml`, Health REST Controller).
5. Scaffolded React + Vite frontend structure (`package.json`, `index.html`, Tailwind configs, base App).
