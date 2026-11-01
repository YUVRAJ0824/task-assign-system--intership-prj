# GIT COMMANDS & PROJECT STRUCTURE

---

## 1. DAILY GIT FLOW (5% Daily)
git status                             // see what changed
git add .                              // stage files
git commit -m "day X: short message"   // commit with short message
git push                               // send to GitHub

---

## 2. HOW TO RUN FRONTEND
cd frontend
npm run dev                            // if script blocked: npm.cmd run dev
// opens at http://localhost:5173

---

## 3. HOW TO RUN BACKEND
cd backend
mvn spring-boot:run
// or run Appmain.java in IDE
// health check at http://localhost:8080/api/v1/health

---

## 4. PROJECT FILE STRUCTURE (CLEAN & SHORT)
```text
TASK-APP-PRJ_INTERNSHIP-JAVA/
|-- backend/
|   |-- src/main/java/com/epsm/
|   |   |-- config/
|   |   |   `-- Secconfig.java             // security & cors rules
|   |   |-- controller/
|   |   |   `-- Healthcontroller.java      // /api/v1/health check
|   |   |-- dto/
|   |   |   |-- Apires.java                // ok / err response wrapper
|   |   |   `-- Userdto.java               // Req & Res for user data
|   |   |-- exception/
|   |   |   `-- globexceptionhandler.java  // 404, 400, 500 error handler
|   |   |-- model/
|   |   |   |-- Baseentity.java            // id, created_at, updated_at
|   |   |   |-- Role.java                  // 5 roles enum
|   |   |   `-- User.java                  // user entity
|   |   |-- repository/
|   |   |   `-- Userrepo.java              // user db queries
|   |   `-- Appmain.java                   // spring boot main runner
|   |-- src/main/resources/
|   |   `-- application.yml                // H2 dev & postgres prod
|   `-- pom.xml                            // maven dependencies
|
|-- frontend/                              // react 18 + vite UI
|   |-- src/
|   |   |-- App.jsx                        // dashboard & progress tracker
|   |   |-- main.jsx
|   |   `-- index.css
|   `-- package.json
|
|-- docs/
|   |-- ARCHITECTURE.md                    // system layers & formulas
|   |-- Enterprise_Project_Service_...pdf  // specification pdf
|   `-- ROADMAP_20_DAYS.md                 // 20-day plan (5% / day)
|
|-- ignore/                                // ignored files (not in git)
|   |-- struct img
|   `-- TODO.md
|
|-- .gitignore                             // ignores build, cache, ignore/
|-- GIT-CMD.md                             // git commands & structure
`-- README.md                              // project overview
```

