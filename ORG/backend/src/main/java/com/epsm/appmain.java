package com.epsm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// 1. main spring boot entry point - pure jpa orm architecture
// 2. enterprise project, task, and service management system
@SpringBootApplication
@EnableJpaAuditing
public class appmain {

    // 3. application bootstrap entry
    public static void main(String[] args) {
        SpringApplication.run(appmain.class, args);
    }
}
