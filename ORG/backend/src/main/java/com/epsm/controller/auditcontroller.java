package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.auditdto;
import com.epsm.model.auditlog;
import com.epsm.repository.auditlogrepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// 1. audit log controller - compliance and activity history
@RestController
@RequestMapping("/api/v1/audit")
public class auditcontroller {

    private final auditlogrepo repo;

    public auditcontroller(auditlogrepo repo) {
        this.repo = repo;
    }

    // 2. get all audit logs
    @GetMapping
    public ResponseEntity<apires<List<auditdto.Res>>> getAll() {
        List<auditdto.Res> list = repo.findAll()
                .stream()
                .map(auditdto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Audit trail retrieved", list));
    }
}
