ENTERPRISE PROJECT AND SERVICE MANAGEMENT PLATFORM

A unified Java full-stack enterprise application designed to manage projects, tasks, IT service requests, team workloads, and service-level agreements (SLAs) through a centralised platform.

GITHUB REPOSITORY

Repository: https://github.com/YUVRAJ0824/task-assign-system--intership-prj

Clone the Repository

```powershell
git clone https://github.com/YUVRAJ0824/task-assign-system--intership-prj.git
cd task-assign-system--intership-prj
```

PROJECT OVERVIEW

The platform combines project management and IT service management capabilities into one application.

KEY FEATURES

1. Project Portfolio and Task Management
- Create and manage multiple projects.
- Assign tasks and track their progress.
- Kanban-style task boards for workflow management.
- Project and task governance inspired by Jira.

2. IT Service Desk and Ticket Management
- Create and manage IT service requests.
- Track tickets throughout their lifecycle.
- Organise and monitor support activities.
- Service management workflows inspired by ServiceNow.

3. SLA Monitoring and Breach Tracking
- Automated SLA countdown and monitoring.
- Warning alerts when 75% of the SLA time has elapsed.
- Track SLA breaches and service deadlines.

4. Team Capacity and Workload Management
- Monitor individual developer workloads.
- View team capacity through a workload matrix.
- Identify workload imbalances and potential burnout risks.

5. Role-Based Access Control
- Admin
- Project Manager
- Team Lead
- Team Member
- Service Agent

Access to application features is controlled according to assigned user roles.

TECHNOLOGY STACK

| Layer | Technologies |
|---|---|
| Backend | Java 17+, Spring Boot 3.3.x |
| Backend Build Tool | Apache Maven (pom.xml) |
| Security | Spring Security 6, JWT Authentication |
| Persistence | Spring Data JPA, Hibernate |
| Development Database | H2 (In-Memory) |
| Production Database | PostgreSQL |
| Frontend | React 18, Vite |
| Frontend Package Manager | npm (package.json) |
| Styling | Tailwind CSS |
| Icons | Lucide Icons |

BUILD AND CONFIGURATION FILES

1. Backend: pom.xml (Project Object Model)
- The central configuration file for Apache Maven in Java.
- Equivalent to package.json in JavaScript and Node.js.
- Declares external libraries and dependencies (Spring Boot, Spring Security, JPA, database drivers).
- Manages compilation, testing, and packaging into an executable JAR file.

2. Frontend: package.json
- The central configuration file for npm and Node.js in React.
- Declares frontend libraries and tools (React, Vite, Tailwind CSS, Lucide icons, Axios).
- Defines run and build commands (npm run dev, npm run build).

The backend uses Spring Data JPA and Hibernate for ORM-based database operations.

PROJECT STRUCTURE

```text
task-assign-system--intership-prj/
│
├── ORG/            # Enterprise platform application
│   ├── backend/    # Spring Boot 3 REST API & configuration
│   └── frontend/   # React 18 SPA (Vite & Tailwind CSS)
│
├── .gitignore      # Git exclusion rules
├── README.md       # Project documentation
└── SETUP.md        # Environment prerequisites & setup guide
```

GETTING STARTED

Prerequisites

Ensure the following tools are installed:

- Java 17 or later
- Maven
- Node.js and npm
- Git
- IntelliJ IDEA or VS Code


1. Start the Backend

Open PowerShell in the project directory:

```powershell
cd ORG/backend
mvn spring-boot:run
```

Alternatively, open `ORG/backend` in your IDE and run `Appmain.java`.

Backend server:

http://localhost:8080

Health Check Endpoint:

http://localhost:8080/api/v1/health

2. Start the Frontend

Open a separate PowerShell window:

```powershell
cd ORG/frontend
npm.cmd run dev
```

Alternatively, use:

```powershell
npm run dev
```

Frontend development server:

http://localhost:5173

3. Access the Application

Once both servers are running, open the frontend in your browser:

http://localhost:5173

APPLICATION ARCHITECTURE

The application follows a full-stack architecture:

- Frontend: React handles the user interface and client-side interactions.
- Backend: Spring Boot provides REST APIs and application logic.
- Security: Spring Security and JWT handle authentication and role-based access.
- Persistence: Spring Data JPA and Hibernate manage database interactions.
- Database: H2 supports development, while PostgreSQL is configured for production use.

PROJECT PURPOSE

This project demonstrates the development of an integrated enterprise management platform using Java and modern full-stack technologies. It brings project coordination, task governance, IT service management, SLA monitoring, and team workload tracking into a single system.