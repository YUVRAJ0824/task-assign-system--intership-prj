package com.epsm.controller;

import com.epsm.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("status", "UP");
        details.put("service", "Enterprise Project & Service Management Platform");
        details.put("environment", "Development");
        details.put("milestone", "Day 1 (5% Baseline)");
        details.put("security", "Spring Security 6 Active (Stateless)");
        details.put("database", "H2 In-Memory / PostgreSQL Ready");

        return ResponseEntity.ok(ApiResponse.success("System is healthy and operational", details));
    }
}
