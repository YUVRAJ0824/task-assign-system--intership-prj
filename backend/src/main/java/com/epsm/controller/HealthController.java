package com.epsm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "UP");
        status.put("application", "Enterprise Project & Service Management Platform");
        status.put("version", "1.0.0-SNAPSHOT");
        status.put("timestamp", LocalDateTime.now());
        status.put("day1_scaffolding", "5% Milestone Initialized");
        return ResponseEntity.ok(status);
    }
}
