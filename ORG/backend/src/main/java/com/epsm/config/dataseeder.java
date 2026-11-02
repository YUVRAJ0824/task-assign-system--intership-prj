package com.epsm.config;

import com.epsm.model.project;
import com.epsm.model.role;
import com.epsm.model.user;
import com.epsm.repository.projectrepo;
import com.epsm.repository.userrepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

// 1. auto data seeder for enterprise prototype
@Configuration
public class dataseeder {

    // 2. seed realistic enterprise projects and users on startup
    @Bean
    public CommandLineRunner seedData(projectrepo projectrepo, userrepo userrepo, PasswordEncoder passwordEncoder) {
        return args -> {
            // 3. seed users with 5 enterprise roles (Indian names)
            if (userrepo.count() == 0) {
                userrepo.save(new user("admin", "admin@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_ADMIN, "Executive Administration", true));
                userrepo.save(new user("priya.sharma", "priya@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_PROJECT_MANAGER, "Platform Architecture", true));
                userrepo.save(new user("yuvraj.singh", "yuvraj@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_TEAM_MEMBER, "Platform Core", true));
                userrepo.save(new user("rohit.verma", "rohit@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_TEAM_LEAD, "Cloud Infrastructure", true));
                userrepo.save(new user("neha.patel", "neha@epsm.internal", passwordEncoder.encode("password123"), role.ROLE_SERVICE_AGENT, "Security & Auth", true));
            }

            // 4. seed realistic enterprise projects
            if (projectrepo.count() == 0) {
                projectrepo.save(new project(
                        "PRJ-101",
                        "Enterprise SSO & Authentication Gateway",
                        "Centralized authentication gateway with stateless JWT validation and role-based permissions",
                        "Priya Sharma",
                        "ON_TRACK",
                        85,
                        LocalDate.now().plusDays(14),
                        "ACTIVE"
                ));

                projectrepo.save(new project(
                        "PRJ-102",
                        "Cloud Database Migration to PostgreSQL",
                        "Zero-downtime database migration from on-prem to cloud RDS with HikariCP pooling",
                        "Rohit Verma",
                        "ON_TRACK",
                        60,
                        LocalDate.now().plusDays(30),
                        "ACTIVE"
                ));

                projectrepo.save(new project(
                        "PRJ-103",
                        "Customer Service SLA Portal",
                        "Automated incident management desk with real-time SLA countdown and threshold alerts",
                        "Yuvraj Singh",
                        "AT_RISK",
                        45,
                        LocalDate.now().plusDays(21),
                        "ACTIVE"
                ));

                projectrepo.save(new project(
                        "PRJ-104",
                        "Real-Time Incident Notification Service",
                        "Automated event notification system for critical production system alerts",
                        "Neha Patel",
                        "DELAYED",
                        30,
                        LocalDate.now().plusDays(7),
                        "ACTIVE"
                ));
            }
        };
    }
}
