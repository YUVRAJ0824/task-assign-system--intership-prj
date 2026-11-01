ENVIRONMENT SETUP AND PREREQUISITES

This document outlines the tools, prerequisites, and steps required to configure and run the project locally.

PREREQUISITES

Ensure the following runtimes and tools are installed on your system:

| Tool | Recommended Version | Details |
|---|---|---|
| Java JDK | 17 LTS or higher | Required for Spring Boot 3 backend |
| Apache Maven | 3.8+ | Required for building backend dependencies |
| Node.js and npm | Node.js 18+ (LTS), npm 9+ | Required for React frontend dependencies |
| Database | H2 / PostgreSQL 15+ | H2 is in-memory and runs automatically in dev |

BACKEND SETUP (SPRING BOOT 3)

1. Open PowerShell and navigate to the backend directory:

```powershell
cd ORG/backend
```

2. Build the project and download dependencies:

```powershell
mvn clean install -DskipTests
```

3. Start the backend server:

```powershell
mvn spring-boot:run
```

Alternatively, open `ORG/backend` in IntelliJ IDEA or VS Code and run `Appmain.java`.

4. Verify the backend health endpoint in your browser:

http://localhost:8080/api/v1/health

FRONTEND SETUP (REACT 18 AND VITE)

Open a separate PowerShell window while keeping the backend running.

1. Navigate to the frontend directory:

```powershell
cd ORG/frontend
```

2. Install frontend dependencies:

```powershell
npm install
```

3. Start the Vite development server:

```powershell
npm.cmd run dev
```

Alternatively, use:

```powershell
npm run dev
```

4. Open the application in your browser:

http://localhost:5173

RUNNING THE APPLICATION

Keep both PowerShell windows active:

- Backend: Spring Boot application running on port 8080.
- Frontend: Vite development server running on port 5173.

Once both services are running, open the application in your browser:

http://localhost:5173
