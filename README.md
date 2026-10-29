# Enterprise Project and Service Management Platform

Full-stack web application combining Jira-style Kanban task management with ServiceNow-style service desk, SLA countdowns, and workload balancing.

## GitHub Repository
- URL: https://github.com/YUVRAJ0824/task-assign-system--intership-prj.git
- Clone:
  ```bash
  git clone https://github.com/YUVRAJ0824/task-assign-system--intership-prj.git
  ```

## Tech Stack
- Backend: Java 17+, Spring Boot 3.3.x, Spring Security 6 (stateless JWT).
- Persistence: Pure ORM via Spring Data JPA and Hibernate (no raw SQL).
- Database: H2 (in-memory dev) and PostgreSQL (production).
- Frontend: React 18, Vite, Tailwind CSS, Axios.

## How to Run

### Terminal 1: Frontend
```bash
cd frontend
npm run dev
```
Runs at: http://localhost:5173

### Terminal 2: Backend
```bash
cd backend
mvn spring-boot:run
```
Runs at: http://localhost:8080 (Health: http://localhost:8080/api/v1/health)
Or run `EnterprisePlatformApplication.java` in your IDE.

## 4-Week Delivery Roadmap (5% Daily)
Tracked in `docs/ROADMAP_20_DAYS.md` and local `TODO.md`.

| Week | Milestone Focus | Daily Pace | Progress | Status |
|:---:|:---|:---:|:---:|:---:|
| Week 1 | Scaffolding, Pure ORM, RBAC Identity, Projects | 5% / day | 25% | Day 1 Done (5%) |
| Week 2 | Kanban Engine, Tickets, SLA Timer, Workload | 5% / day | 50% | Scheduled |
| Week 3 | React SPA, Auth Guards, Dashboard, Kanban UI | 5% / day | 75% | Scheduled |
| Week 4 | SLA Gauges, Resource Heatmap, Recharts, Docker | 5% / day | 100% | Scheduled |

## Project Structure
```text
TASK-APP-PRJ_INTERNSHIP-JAVA/
|-- backend/    # Spring Boot 3 REST API (Pure ORM, Controllers, Security)
|-- frontend/   # React 18 SPA (Vite, Tailwind CSS, Dashboard UI)
|-- docs/       # Technical specs, architecture, and 20-day roadmap
|-- .gitignore  # Excludes build outputs, struct img, and TODO.md
`-- README.md   # Project overview
```

## Daily Git Push Flow
```bash
git status
git add .
git commit -m "feat: day X milestone"
git push
```
