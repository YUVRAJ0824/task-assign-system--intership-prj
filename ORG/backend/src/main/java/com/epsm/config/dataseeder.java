package com.epsm.config;

import com.epsm.model.project;
import com.epsm.model.role;
import com.epsm.model.task;
import com.epsm.model.user;
import com.epsm.repository.projectrepo;
import com.epsm.repository.taskrepo;
import com.epsm.repository.userrepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

// 1. auto data seeder for enterprise prototype
@Configuration
public class dataseeder {

    // 2. seed initial users, projects, and tasks
    @Bean
    public CommandLineRunner seedData(
            projectrepo projectrepo,
            userrepo userrepo,
            taskrepo taskrepo,
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
            }
        };
    }
}
