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

    // Check system health
    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> res = new LinkedHashMap<>();
        res.put("status", "UP");
        res.put("service", "EPSM Platform");
        res.put("env", "dev");
        res.put("milestone", "Day 2 (10%)");
        res.put("orm", "Hibernate / JPA Auditing Active");
        res.put("db", "H2 / PostgreSQL Ready");

        return ResponseEntity.ok(ApiResponse.success("System OK", res));
    }
}
