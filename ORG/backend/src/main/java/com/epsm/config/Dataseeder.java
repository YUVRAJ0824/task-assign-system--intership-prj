package com.epsm.config;

import com.epsm.model.Project;
import com.epsm.repository.Projectrepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

// 1. auto data seeder for enterprise prototype
@Configuration
public class Dataseeder {

    // 2. seed realistic enterprise projects on startup
    @Bean
    public CommandLineRunner seedData(Projectrepo projectrepo) {
        return args -> {
            if (projectrepo.count() == 0) {
                projectrepo.save(new Project(
                        "PRJ-101",
                        "Enterprise SSO & Authentication Gateway",
                        "Centralized authentication gateway with stateless JWT validation and role-based permissions",
                        "Sarah Chen",
                        "ON_TRACK",
                        85,
                        LocalDate.now().plusDays(14),
                        "ACTIVE"
                ));

                projectrepo.save(new Project(
                        "PRJ-102",
                        "Cloud Database Migration to PostgreSQL",
                        "Zero-downtime database migration from on-prem to cloud RDS with HikariCP pooling",
                        "David Miller",
                        "ON_TRACK",
                        60,
                        LocalDate.now().plusDays(30),
                        "ACTIVE"
                ));

                projectrepo.save(new Project(
                        "PRJ-103",
                        "Customer Service SLA Portal",
                        "Automated incident management desk with real-time SLA countdown and threshold alerts",
                        "Alex Kumar",
                        "AT_RISK",
                        45,
                        LocalDate.now().plusDays(21),
                        "ACTIVE"
                ));

                projectrepo.save(new Project(
                        "PRJ-104",
                        "Real-Time Incident Notification Service",
                        "Automated event notification system for critical production system alerts",
                        "Elena Rostova",
                        "DELAYED",
                        30,
                        LocalDate.now().plusDays(7),
                        "ACTIVE"
                ));
            }
        };
    }
}
