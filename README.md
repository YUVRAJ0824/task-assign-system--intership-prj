# Enterprise Project and Service Management Platform

A Java full-stack web application combining Project Portfolio & Kanban Task Management (Jira-style) with IT Service Desk, Real-Time SLA Monitoring & Workload Balancing (ServiceNow-style).

---

## Tools and Technologies Used

- Java JDK 17+: Powers the backend Spring Boot REST API.
- Spring Boot 3.3.x: Core application framework, dependency injection, and REST controllers.
- Spring Security 6: Stateless authentication, BCrypt password hashing, and endpoint security.
- Spring Data JPA and Hibernate: Relational database mapping and repository queries.
- H2 / PostgreSQL: In-memory database for local development and PostgreSQL for production.
- Node.js and npm: Runtime and package manager for frontend dependencies.
- React 18: Single Page Application component library.
- Vite: Build tool and local development server for fast hot module reloading.
- Tailwind CSS: Utility-first styling system.
- Lucide React: Icons for UI navigation and status indicators.
- Git: Version control and daily milestone tracking.

---

## How to Run the Application

You will need two terminal windows open: one for the frontend and one for the backend.

### Terminal 1: Run Frontend (React + Vite)

1. Open a terminal in the root project folder:
   ```bash
   cd frontend
   ```

2. If running for the first time, install packages (already installed in workspace):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit:
   ```text
   http://localhost:5173
   ```
   You will see the interactive dashboard, 4-week daily TO-DO checklist, and health checker.

---

### Terminal 2: Run Backend (Spring Boot 3 REST API)

#### Option A: Running from IDE (Recommended)
1. Open the project in IntelliJ IDEA, Eclipse, or VS Code.
2. Locate the file:
   `backend/src/main/java/com/epsm/EnterprisePlatformApplication.java`
3. Right-click and choose "Run EnterprisePlatformApplication".
4. The server starts on port 8080.

#### Option B: Running from Terminal (Maven)
1. Open a terminal in the root project folder:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

5. Verify the backend is active by opening in browser or making a GET request:
   ```text
   http://localhost:8080/api/v1/health
   ```
   You will receive the JSON response confirming the system status is UP.

---

## GitHub Repository and Setup

Repository URL: https://github.com/yraj3342/TASK-APP-PRJ_INTERNSHIP-JAVA

### Initial Setup (Run Once on Your Machine)
When you create your repository on GitHub, run:
```bash
git remote add origin https://github.com/yraj3342/TASK-APP-PRJ_INTERNSHIP-JAVA.git
git branch -M main
git push -u origin main
```

### Daily 5% Push Flow (Whenever You Are Ready to Push)
```bash
git status                            # check changed files
git add .                             # stage today's changes
git commit -m "feat: day X milestone" # save with message
git push                              # send to your GitHub
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
|-- README.md                       # Main documentation and how-to-run guide
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
