package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.projectdto;
import com.epsm.model.project;
import com.epsm.repository.projectrepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 1. project controller - rest endpoints for projects
@RestController
@RequestMapping("/api/v1/projects")
public class projectcontroller {

    private final projectrepo repo;

    public projectcontroller(projectrepo repo) {
        this.repo = repo;
    }

    // 2. get all projects
    @GetMapping
    public ResponseEntity<apires<List<projectdto.Res>>> getAll() {
        List<projectdto.Res> list = repo.findAll()
                .stream()
                .map(projectdto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Projects fetched", list));
    }

    // 3. create new project
    @PostMapping
    public ResponseEntity<apires<projectdto.Res>> create(@Valid @RequestBody projectdto.Req req) {
        project p = new project(
                req.getCode().toUpperCase(),
                req.getName(),
                req.getDescription(),
                req.getLead(),
                req.getHealth() != null ? req.getHealth() : "ON_TRACK",
                req.getProgress() != null ? req.getProgress() : 0,
                req.getDueDate(),
                req.getStatus() != null ? req.getStatus() : "ACTIVE"
        );

        project saved = repo.save(p);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apires.ok("Project created successfully", projectdto.Res.from(saved)));
    }
}
