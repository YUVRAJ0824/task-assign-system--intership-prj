# Enterprise Project and Service Management Platform

A Java full-stack web application combining project planning and Kanban task tracking with service desk workflows, SLA monitoring, and team workload capacity balancing.

## Overview

The platform addresses internal organization workflow needs across two core functions:
1. Project and Task Delivery: Project milestones, task assignments, dependencies, and drag-and-drop Kanban boards.
2. Service Management and Operations: Incident and ticket tracking, SLA countdown monitoring, breach logging, approval workflows, and workload utilization.

## Core Modules

- Authentication and RBAC: Stateless JWT authentication with role-based access for Admin, Project Manager, Team Lead, Team Member, and Service Agent.
- Project and Milestone Management: Project health metrics (On Track, At Risk, Delayed), milestone progress tracking, and team member assignments.
- Task Management: Kanban boards, task states (Backlog, To Do, In Progress, Review, Completed), priority levels, effort estimates, and comment history.
- Service Desk and Incident Management: Ticket categorization, severity ratings, assignment, and resolution history.
- SLA Monitoring: Configurable response and resolution targets, dynamic countdown timers, 75% threshold warnings, and breach records.
- Approval Workflow: Configurable approval requests for scope changes, milestones, and budget updates with full audit comments.
- Workload Balancing: Team capacity calculation, assigned hours vs weekly capacity, and overload alerts.
- Dashboard and Reports: Project health overviews, SLA compliance rates, issue turnaround trends, and CSV data export.

## Architecture

The system follows a standard layered enterprise architecture:
- Controller Layer: Spring Boot REST controllers exposing JSON APIs.
- Service Layer: Business logic, SLA calculation engines, and workload analyzers.
- Persistence Layer: Spring Data JPA and Hibernate with relational database mapping.
- Database: PostgreSQL or MySQL with Flyway schema versioning.
- Frontend Layer: React.js single-page application with Axios interceptors and Tailwind CSS.

## Tech Stack

- Backend: Java 17, Spring Boot 3, Spring Security, Spring Data JPA, Hibernate, Maven
- Frontend: React 18, React Router 6, Tailwind CSS, Axios, Recharts
- Database: PostgreSQL or MySQL
- DevOps and Testing: Docker, Docker Compose, JUnit 5, Mockito

## Project Structure

- backend/ - Spring Boot REST API application
- frontend/ - React single-page frontend application
- docs/ - Architecture specifications, schema design, and tasks checklist

## Core REST Endpoints

- POST /api/v1/auth/login - User authentication and JWT generation
- GET  /api/v1/projects - Project list with health and progress metrics
- POST /api/v1/projects - Create a new project
- GET  /api/v1/projects/{id}/tasks - Retrieve project tasks for Kanban view
- PATCH /api/v1/tasks/{id}/status - Update task status
- POST /api/v1/issues - Create support ticket and initiate SLA timer
- GET  /api/v1/sla/dashboard - Retrieve SLA compliance and breach statistics
- GET  /api/v1/workload/team - Team capacity utilization matrix

## Setup and Running

Backend:
1. cd backend
2. Configure database credentials in application.yml
3. ./mvnw spring-boot:run

Frontend:
1. cd frontend
2. npm install
3. npm run dev
