# Enterprise Project and Service Management Platform

## GitHub Repository
URL: https://github.com/YUVRAJ0824/task-assign-system--intership-prj.git

Clone command:
```powershell
git clone https://github.com/YUVRAJ0824/task-assign-system--intership-prj.git
cd task-assign-system--intership-prj
```

## About the Project
A unified Java full-stack enterprise platform that combines:
- Project Portfolio and Kanban Task Governance (Jira-style task boards).
- IT Service Desk and Ticket Lifecycle (ServiceNow-style ticketing).
- Automated SLA Countdown Engine with 75% warning alerts and breach tracking.
- Team Capacity and Workload Matrix with developer burnout alerts.
- Role-Based Access Control for 5 roles (Admin, PM, Lead, Member, Agent).

## Tech Stack
- Backend: Java 17+, Spring Boot 3.3.x, Spring Security 6 (stateless JWT).
- Persistence: Pure ORM via Spring Data JPA and Hibernate (no raw SQL).
- Database: H2 (dev in-memory) and PostgreSQL (production ready).
- Frontend: React 18, Vite, Tailwind CSS, Lucide Icons.

## How to Run

### 1. Frontend (React + Vite)
Open PowerShell:
```powershell
cd frontend
npm.cmd run dev
```
(Or `npm run dev`)
Open browser at: http://localhost:5173

### 2. Backend (Spring Boot 3)
Open a second PowerShell window:
```powershell
cd backend
mvn spring-boot:run
```
Or open the project in your IDE (IntelliJ / Eclipse / VS Code) and run `Appmain.java`.
Server runs at: http://localhost:8080
Health check endpoint: http://localhost:8080/api/v1/health

## Project Structure
```text
TASK-APP-PRJ_INTERNSHIP-JAVA/
|-- backend/    # Spring Boot 3 REST API (Pure ORM, Controllers, Security)
|-- frontend/   # React 18 UI (Kanban board, SLA timers, Workload matrix)
|-- docs/       # Architecture design and specification PDF
|-- ignore/     # Local private files (ignored by Git)
|-- .gitignore  # Git exclusions
|-- GIT-CMD.md  # Git command list and cheat sheet
`-- README.md   # Project overview
```
