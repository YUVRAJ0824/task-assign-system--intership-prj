package com.epsm.controller;

import com.epsm.dto.apires;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

// 1. health controller - ping endpoint for system status check
@RestController
@RequestMapping("/api/v1/health")
public class healthcontroller {

    // 2. health check returns system state
    @GetMapping
    public ResponseEntity<apires<Map<String, String>>> check() {
        Map<String, String> status = Map.of(
                "status", "UP",
                "service", "Enterprise Project & Service Platform",
                "env", "dev",
                "database", "H2 / PostgreSQL Ready",
                "orm", "Hibernate & JPA Auditing Active"
        );
        return ResponseEntity.ok(apires.ok("System OK", status));
    }
}
