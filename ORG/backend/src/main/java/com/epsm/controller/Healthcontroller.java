package com.epsm.controller;

import com.epsm.dto.Apires;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

// api health check controller
@RestController
@RequestMapping("/api/v1/health")
public class Healthcontroller {

    // 1. get system health
    @GetMapping
    public ResponseEntity<Apires<Map<String, Object>>> check() {
        Map<String, Object> res = new LinkedHashMap<>();
        res.put("status", "UP");
        res.put("service", "Enterprise Project & Service Platform");
        res.put("env", "dev");
        res.put("database", "H2 / PostgreSQL Ready");
        res.put("orm", "Hibernate & JPA Auditing Active");

        return ResponseEntity.ok(Apires.ok("System OK", res));
    }
}
