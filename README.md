# Enterprise Project and Service Management Platform

A Java full-stack web application combining Project Portfolio & Kanban Task Management (Jira-style) with IT Service Desk, Real-Time SLA Monitoring & Workload Balancing (ServiceNow-style).

---

## GitHub Repository and Setup

Repository URL: https://github.com/yraj3342/TASK-APP-PRJ_INTERNSHIP-JAVA

Clone repository:
```bash
git clone https://github.com/yraj3342/TASK-APP-PRJ_INTERNSHIP-JAVA.git
cd TASK-APP-PRJ_INTERNSHIP-JAVA
```

Initial setup (run once):
```bash
git remote add origin https://github.com/yraj3342/TASK-APP-PRJ_INTERNSHIP-JAVA.git
git branch -M main
git push -u origin main
```

Daily push flow:
```bash
git status
git add .
git commit -m "feat: day X milestone"
git push
```

---

## 4-Week Delivery Plan (5% Daily)

Progress is tracked in docs/ROADMAP_20_DAYS.md and local TODO.md.

| Week | Focus Area | Daily Pace | Progress | Status |
|:---:|:---|:---:|:---:|:---:|
| Week 1 | Scaffolding, Persistence, RBAC Identity and Project Domain | 5% / day | 25% | In Progress (Day 1 Done) |
| Week 2 | Kanban Engine, Service Desk, SLA Countdown and Workload Matrix | 5% / day | 50% | Scheduled |
| Week 3 | React SPA, Auth Guards, Executive Dashboard and Kanban UI | 5% / day | 75% | Scheduled |
| Week 4 | SLA Gauges, Resource Heatmaps, Recharts and Docker Release | 5% / day | 100% | Scheduled |

---

## Key Capabilities

- Project and Milestone Governance: Track project health (ON_TRACK, AT_RISK, DELAYED) with completion percentages calculated from linked deliverables.
- Interactive Kanban Board: Task workflow (BACKLOG to TO DO to IN PROGRESS to REVIEW to DONE), task priority ranking, effort estimation, and dependencies.
- Service Desk and Ticketing: Full ticketing lifecycle for internal requests and issues with severity categorization and resolution histories.
- Automated SLA Countdown Engine: Real-time response and resolution timers with automatic warning alerts at 75% threshold and breach escalation logging.
- Resource and Workload Matrix: Real-time visibility into developer utilization percentages, weekly capacity allocations, and overload alerts.
- Enterprise Security and RBAC: Stateless JWT authentication, BCrypt password encryption, and Role-Based Access Control across 5 personas: Admin, Project Manager, Team Lead, Team Member, and Service Agent.
- Executive KPI Dashboard: Interactive charts for project health, issue distribution, SLA compliance trends, and CSV audit exports.

---

## System Architecture

```text
[Frontend: React.js + Tailwind CSS]
              |
         (REST / JSON)
              |
[Security: Spring Security 6 + JWT + RBAC]
              |
[Backend: Spring Boot 3 REST Controllers]
              |
[Services: SLA Engine + Workload Engine + Project Services]
              |
[Persistence: Spring Data JPA / Hibernate]
              |
[Database: PostgreSQL / H2 In-Memory]
```

---

## Project Structure

```text
TASK-APP-PRJ_INTERNSHIP-JAVA/
|-- .gitignore                      # Excludes struct img, TODO.md, target, node_modules, PDFs
|-- README.md                       # Main documentation
|
|-- backend/                        # Java Spring Boot 3 REST API
|   |-- src/main/java/com/epsm/
|   |   |-- config/                 # SecurityConfig, WebMvcConfig (CORS)
|   |   |-- controller/             # HealthController, REST Controllers
|   |   |-- dto/                    # ApiResponse standardized responses
|   |   |-- exception/              # GlobalExceptionHandler, ResourceNotFoundException
|   |   `-- EnterprisePlatformApplication.java
|   |-- src/main/resources/         # application.yml (H2 / Postgres profiles)
|   `-- pom.xml                     # Maven dependencies
|
|-- frontend/                       # React.js Single Page Application
|   |-- src/
|   |   |-- components/             # Kanban board, SLA timers, Workload matrix
|   |   |-- pages/                  # Projects, Tasks, Tickets, Dashboard
|   |   |-- services/               # Axios API client (api.js)
|   |   |-- App.jsx                 # Dashboard and 4-week roadmap view
|   |   `-- main.jsx
|   |-- vite.config.js              # Vite server and API proxy
|   `-- package.json
|
`-- docs/                           # Documentation
    |-- ROADMAP_20_DAYS.md          # 20-Day 5% daily progress blueprint
    |-- TASKS.md                    # Sprint checklist
    `-- ARCHITECTURE.md             # System technical specifications
```

---

## Getting Started

### Prerequisites
- Java Development Kit (JDK 17+)
- Maven 3.8+ (or IDE built-in Maven)
- Node.js (v18+) and npm

### Running Locally

1. Backend (Spring Boot 3):
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend runs at http://localhost:8080 (Health check: http://localhost:8080/api/v1/health)

2. Frontend (React + Vite):
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs at http://localhost:5173
