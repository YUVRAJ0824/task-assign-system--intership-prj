package com.epsm.config;

import com.epsm.model.approval;
import com.epsm.model.auditlog;
import com.epsm.model.milestone;
import com.epsm.model.project;
import com.epsm.model.role;
import com.epsm.model.task;
import com.epsm.model.ticket;
import com.epsm.model.user;
import com.epsm.repository.approvalrepo;
import com.epsm.repository.auditlogrepo;
import com.epsm.repository.milestonerepo;
import com.epsm.repository.projectrepo;
import com.epsm.repository.taskrepo;
import com.epsm.repository.ticketrepo;
import com.epsm.repository.userrepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;

// 1. auto data seeder for enterprise prototype
@Configuration
public class dataseeder {

    // 2. seed initial users, projects, tasks, milestones, tickets, approvals, and audit logs
    @Bean
    public CommandLineRunner seedData(
            projectrepo projectrepo,
            userrepo userrepo,
            taskrepo taskrepo,
            milestonerepo milestonerepo,
            ticketrepo ticketrepo,
            approvalrepo approvalrepo,
            auditlogrepo auditlogrepo,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            // 3. seed users for 5 roles if not present (Kannada cinema icons & Yuvraj V)
            if (userrepo.count() == 0) {
                userrepo.save(new user("admin", "admin@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_ADMIN, "Executive Administration", true));
                userrepo.save(new user("puneeth.rajkumar", "puneeth@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_PROJECT_MANAGER, "Platform Architecture", true));
                userrepo.save(new user("yuvraj.v", "yuvraj@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_TEAM_MEMBER, "Platform Core", true));
                userrepo.save(new user("yash", "yash@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_TEAM_LEAD, "Cloud Infrastructure", true));
                userrepo.save(new user("rishab.shetty", "rishab@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_SERVICE_AGENT, "Security & Auth", true));
            }

            // 4. seed initial projects
            if (projectrepo.count() == 0) {
                project p1 = projectrepo.save(new project(
                        "PRJ-101",
                        "Enterprise SSO & Authentication Gateway",
                        "Centralized authentication gateway with stateless JWT validation and role-based permissions",
                        "Puneeth Rajkumar",
                        "ON_TRACK",
                        85,
                        LocalDate.now().plusDays(14),
                        "ACTIVE"
                ));

                project p2 = projectrepo.save(new project(
                        "PRJ-102",
                        "Cloud Database Migration to PostgreSQL",
                        "Zero-downtime database migration from on-prem to cloud RDS with HikariCP pooling",
                        "Yash",
                        "ON_TRACK",
                        60,
                        LocalDate.now().plusDays(30),
                        "ACTIVE"
                ));

                project p3 = projectrepo.save(new project(
                        "PRJ-103",
                        "Customer Service SLA Portal",
                        "Automated incident management desk with real-time SLA countdown and threshold alerts",
                        "Yuvraj V",
                        "AT_RISK",
                        45,
                        LocalDate.now().plusDays(21),
                        "ACTIVE"
                ));

                project p4 = projectrepo.save(new project(
                        "PRJ-104",
                        "Real-Time Incident Notification Service",
                        "Automated event notification system for critical production system alerts",
                        "Rishab Shetty",
                        "DELAYED",
                        30,
                        LocalDate.now().plusDays(7),
                        "ACTIVE"
                ));

                // 5. seed tasks with Kannada names and mentorship links
                if (taskrepo.count() == 0) {
                    taskrepo.save(new task("TSK-01", "Spring Boot 3 pure ORM setup", "Configure JPA and H2 profile with Hibernate", "HIGH", 5, "DONE", "Yuvraj V", "Platform Core", "Puneeth Rajkumar", p1));
                    taskrepo.save(new task("TSK-02", "Baseentity auditing timestamps", "Auto-generated @CreatedDate and @LastModifiedDate", "MEDIUM", 3, "REVIEW", "Puneeth Rajkumar", "Platform Architecture", "Self / Lead", p1));
                    taskrepo.save(new task("TSK-04", "SLA countdown calculation service", "Engine to trigger warning at 75% elapsed resolution time", "HIGH", 8, "IN_PROGRESS", "Yuvraj V", "Platform Core", "Puneeth Rajkumar", p3));
                    taskrepo.save(new task("TSK-05", "Stateless JWT filter integration", "Validate Bearer token on all secured endpoints", "CRITICAL", 13, "IN_PROGRESS", "Rishab Shetty", "Security & Auth", "Puneeth Rajkumar", p1));
                    taskrepo.save(new task("TSK-08", "PostgreSQL connection pooling", "HikariCP pool sizing and leak detection threshold", "HIGH", 8, "TODO", "Yash", "Cloud Infrastructure", "Puneeth Rajkumar", p2));
                    taskrepo.save(new task("TSK-09", "User role permission matrix", "Map 5 enterprise roles to authorized endpoints", "MEDIUM", 5, "TODO", "Puneeth Rajkumar", "Platform Architecture", "Self / Lead", p1));
                    taskrepo.save(new task("TSK-12", "Audit log export to CSV", "Export project audit trails for compliance reporting", "LOW", 3, "BACKLOG", "Yash", "Cloud Infrastructure", "Puneeth Rajkumar", p2));
                    taskrepo.save(new task("TSK-14", "Two-factor auth mockups", "UX wireframes for SMS and TOTP authenticator setup", "MEDIUM", 5, "BACKLOG", "Rishab Shetty", "Security & Auth", "Puneeth Rajkumar", p4));
                }

                // 6. seed milestones (PDF Module 6.3)
                if (milestonerepo.count() == 0) {
                    milestonerepo.save(new milestone("PRJ-101", "Core Auth & JWT Token Provider", "Complete HMAC-SHA256 token issue and refresh lifecycle", "Puneeth Rajkumar", LocalDate.now().plusDays(4), "COMPLETED", 100));
                    milestonerepo.save(new milestone("PRJ-101", "RBAC Permission Guard Middleware", "Enforce 5 roles across all REST controllers", "Yuvraj V", LocalDate.now().plusDays(10), "IN_PROGRESS", 70));
                    milestonerepo.save(new milestone("PRJ-102", "PostgreSQL HikariCP Staging Validation", "Run pool stress tests with 100 concurrent workers", "Yash", LocalDate.now().plusDays(14), "IN_PROGRESS", 50));
                    milestonerepo.save(new milestone("PRJ-103", "Real-Time 75% SLA Breach Alerts", "Engine triggers high-priority warning when resolution reaches 75%", "Yuvraj V", LocalDate.now().plusDays(7), "IN_PROGRESS", 40));
                    milestonerepo.save(new milestone("PRJ-104", "SMS & Webhook Dispatch Integration", "Multi-channel broadcast microservice for incident alerts", "Rishab Shetty", LocalDate.now().minusDays(2), "OVERDUE", 25));
                }

                // 7. seed service desk incident tickets (PDF Module 6.5)
                if (ticketrepo.count() == 0) {
                    ticketrepo.save(new ticket(
                            "TKT-101",
                            "Payment webhook timeout during checkout",
                            "High timeout rate on payment callback processing under peak traffic",
                            "CRITICAL",
                            "IN_PROGRESS",
                            "Payment Operations Desk",
                            2,
                            LocalDateTime.now().minusHours(1).minusMinutes(45)
                    ));

                    ticketrepo.save(new ticket(
                            "TKT-102",
                            "Slow database query on financial reporting export",
                            "CSV audit export query exceeds connection threshold causing pool starvation",
                            "HIGH",
                            "IN_PROGRESS",
                            "Finance Operations Desk",
                            4,
                            LocalDateTime.now().minusHours(3).minusMinutes(10)
                    ));

                    ticketrepo.save(new ticket(
                            "TKT-103",
                            "User unable to authenticate via single sign-on",
                            "SAML assertion failure on corporate gateway redirect",
                            "MEDIUM",
                            "IN_PROGRESS",
                            "Operations Desk",
                            8,
                            LocalDateTime.now().minusHours(1).minusMinutes(30)
                    ));

                    ticketrepo.save(new ticket(
                            "TKT-104",
                            "Kubernetes ingress certificate expiration warning",
                            "TLS cert renewal failed on production cluster ingress controller",
                            "MEDIUM",
                            "RESOLVED",
                            "DevOps Operations",
                            8,
                            LocalDateTime.now().minusHours(12)
                    ));
                }

                // 8. seed approval workflow requests (PDF Module 6.6)
                if (approvalrepo.count() == 0) {
                    approvalrepo.save(new approval("APR-101", "Production Database Schema Migration", "DEPLOYMENT", "PRJ-102", "Yash", "Puneeth Rajkumar", "APPROVED", "HIGH", "Executes Flyway V2 script adding foreign keys to transaction logs"));
                    approvalrepo.save(new approval("APR-102", "Allocate 15 Story Points for OAuth2 Refactor", "BUDGET", "PRJ-101", "Yuvraj V", "Puneeth Rajkumar", "APPROVED", "MEDIUM", "Scope extension for enterprise Azure AD single sign-on federation"));
                    approvalrepo.save(new approval("APR-103", "Cloud Server Scale-up for Traffic Peak", "DEPLOYMENT", "PRJ-103", "Rishab Shetty", "Yash", "PENDING", "HIGH", "Request to spin up 4 additional c6g.xlarge worker instances"));
                    approvalrepo.save(new approval("APR-104", "External Security Penetration Test Access", "SECURITY", "PRJ-104", "Rishab Shetty", "Puneeth Rajkumar", "APPROVED", "CRITICAL", "Grant read-only staging VPC access to third-party auditor"));
                }

                // 9. seed security audit logs (PDF Module 10)
                if (auditlogrepo.count() == 0) {
                    auditlogrepo.save(new auditlog("system.bootstrap", "SYSTEM_INIT", "PLATFORM", "Enterprise platform booted with Pure JPA ORM profile", "127.0.0.1"));
                    auditlogrepo.save(new auditlog("admin", "USER_ROLE_ASSIGNED", "yuvraj.v", "Assigned ROLE_TEAM_MEMBER on Platform Core squad", "192.168.1.10"));
                    auditlogrepo.save(new auditlog("puneeth.rajkumar", "APPROVAL_GRANTED", "APR-101", "Approved Production Database Schema Migration", "192.168.1.12"));
                    auditlogrepo.save(new auditlog("yuvraj.v", "TASK_STATUS_UPDATE", "TSK-01", "Spring Boot 3 pure ORM setup moved to DONE (+5 story points)", "192.168.1.15"));
                }
            }
        };
    }
}
