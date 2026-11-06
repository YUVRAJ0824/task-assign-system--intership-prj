# Enterprise Project & Service Management Platform (EPSM) - Design Specification

> **Project Profile:** MCA Java Full-Stack Internship Project (Graphic Design &bull; Java Backend transition).  
> **Philosophy:** Minimal, calm, editorial, precise (Linear, Vercel, Notion, Stripe Dashboard).  
> **Anti "AI Slop" Rules:** No gradients, no neon glow, no generic hero banners, 8px grid, Inter font (weights 400 & 600 only), `tabular-nums` on all metrics.

---

## 1. Project Overview & Architecture

### 1.1 Background
EPSM is an enterprise-grade service management and agile sprint execution platform designed for software engineering squads. It bridges agile delivery (Kanban, story points, milestones) with IT service operations (incident ticketing, SLA countdowns, 75% warning thresholds), multi-tier governance change requests, and immutable JPA security audit trails.

### 1.2 Technology Stack
- **Backend (`ORG/backend`):**
  - Java 17/21 + Pure Spring Boot 3.
  - Zero Lombok (clean, readable POJOs with explicit getters/setters/constructors).
  - 100% lowercase Java files and class names (`milestone.java`, `ticket.java`, `approval.java`, `auditlog.java`).
  - Pure JPA/Hibernate ORM mappings with H2 runtime / MySQL compatibility.
  - Zero emojis in code, comments, logs, and commit messages.
- **Frontend (`EXP/frontend`):**
  - React 18 + Vite + Tailwind CSS v3.
  - `lucide-react` for icons (stroke width 1.5, size 16 or 18).
  - `recharts` for sprint velocity (single navy line, light grid, no legend clutter).
  - CSS variables for theme switching (`class="dark"` on `<html>`).

### 1.3 Active Roster & Personas (Kannada Mentorship Theme)
1. **Yuvraj V** (`ROLE_TEAM_MEMBER`) - *Senior Java Backend Engineer (Mentee)*, Squad: Platform Core, Mentor: Puneeth Rajkumar.
2. **Puneeth Rajkumar** (`ROLE_PROJECT_MANAGER`) - *Project Lead & Lead Architect*, Squad: Platform Architecture, Mentor: Self / Board.
3. **Yash** (`ROLE_TEAM_LEAD`) - *DevOps & Cloud Lead*, Squad: Cloud Infrastructure, Mentor: Puneeth Rajkumar.
4. **Rishab Shetty** (`ROLE_SERVICE_AGENT`) - *Security & Service Desk Specialist*, Squad: Security & Auth, Mentor: Puneeth Rajkumar.
5. **Admin** (`ROLE_ADMIN`) - *Enterprise Administrator*, Squad: Executive Administration.

---

## 2. Color System & Design Tokens

### 2.1 CSS Variables
```css
/* Light theme (White) */
:root {
  --bg: #FFFFFF;
  --bg-subtle: #F7F8FA;
  --surface: #FFFFFF;
  --border: #E6E8EC;
  --border-strong: #D3D7DE;
  --text: #0F172A;
  --text-muted: #5B6475;
  --text-faint: #8A93A3;
  --accent: #1E2A44; /* Matte navy */
  --accent-fg: #FFFFFF;
}

/* Dark theme (Matte Navy - no pure black, no glossy) */
html.dark {
  --bg: #0E1422;
  --bg-subtle: #121A2B;
  --surface: #161F33;
  --border: #232D45;
  --border-strong: #2F3B58;
  --text: #E8ECF4;
  --text-muted: #9AA5BC;
  --text-faint: #6B7690;
  --accent: #E8ECF4; /* Inverted light button on navy */
  --accent-fg: #0E1422;
}
```

### 2.2 Semantic Status Colors (Muted, Non-Decorative)
- **Success / ON_TRACK / OPTIMAL:** `#2F7D5B` (Light bg `#E8F3EE`, Dark bg `#16322A`)
- **Warning / AT_RISK / SLA 75%:** `#B7791F` (Light bg `#FBF1DD`, Dark bg `#3A2D12`)
- **Danger / DELAYED / OVERLOAD / CRITICAL / SLA Breach:** `#B4443C` (Light bg `#F8E7E5`, Dark bg `#3B1D1B`)
- **Info / IN_PROGRESS:** `#3E5C8A` (Light bg `#E9EEF6`, Dark bg `#1B2740`)
- **Neutral / BACKLOG / LOW:** Grey from `--text-muted` scale.

---

## 3. Core Pages & Component Architecture

| Page | Layout & Key Elements | Role Visibility |
| :--- | :--- | :--- |
| **1. Login** | Split layout: Form on left, quiet brand panel on right. Persona quick-switch. | All |
| **2. Projects** | Card grid, 12px radius, health badge, thin 4px completion bar, "New project" modal. | All |
| **3. Tasks (Kanban)** | 5 columns (`BACKLOG`, `TODO`, `IN_PROGRESS`, `REVIEW`, `DONE`), story points (Fibonacci), priority dot, assignee avatar, move menu fallback. | All |
| **4. Milestones** | Dense table & timeline, target delivery dates, status, linked progress bar. | All |
| **5. Service Desk** | Ticket table (`TKT-xxx` in mono, severity, reporter, dept, status), live SLA countdown, 75% warning indicator, ticket detail in right-side drawer. | All |
| **6. Approvals** | Change requests (deployment, budget, security), Approve and Reject buttons (asks for audit reason). | `ROLE_PROJECT_MANAGER`, `ROLE_ADMIN` |
| **7. Squad Workload**| Capacity matrix: $\text{Hours} = \text{Points} \times 4$ against 40h weekly limit, `OPTIMAL` / `OVERLOAD` badges, thin 40h marker line. | All |
| **8. Audit Trail** | Dense read-only log table (timestamp, actor, action, target, IP), actor/action filters, CSV export. | `ROLE_ADMIN` |
| **9. Dashboard** | Calm bento grid, small date, 32px greeting (`Good evening, Yuvraj`), primary "New task" + secondary "New project", 4 recent projects, calendar strip + next meeting, checklist reminders, my tasks with priority dot, goals & milestones, Recharts sprint velocity line chart. | All |

---

## 4. Copy-Paste Ready Prompt for Claude

```markdown
You are a Principal Product Designer and Senior Frontend Engineer.
I am an MCA graduate with a graphic design background who transitioned to Java Full-Stack development.
I have built the Enterprise Project & Service Management Platform (EPSM) using Spring Boot 3 on the backend and React + Vite + Tailwind CSS on the frontend.

Design Direction: Minimal, calm, editorial, precise (Linear, Vercel, Notion, Stripe Dashboard).
Rules:
- NO gradients, NO rainbow glow, NO glassmorphism blobs.
- NO emojis as icons. Use lucide-react only (stroke width 1.5, size 16 or 18).
- NO heavy drop shadows. Use 1px borders for separation.
- Radius 8px for inputs/buttons, 12px for cards. Pills only for badges.
- Colors: Matte navy (--accent: #1E2A44), clean white (--bg: #FFFFFF), dark navy (--bg: #0E1422, --surface: #161F33).
- Status colors used ONLY for status (Success: #2F7D5B, Warning: #B7791F, Danger: #B4443C, Info: #3E5C8A).
- Inter font (400 and 600 only), tabular-nums on all metrics.
- Left-aligned, 8px grid spacing.

Please review this design and suggest fine-tuned visual enhancements, micro-interactions, or additional component patterns following this strict design system.
```

