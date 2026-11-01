package com.epsm.controller;

import com.epsm.dto.Apires;
import com.epsm.dto.Projectdto;
import com.epsm.model.Project;
import com.epsm.repository.Projectrepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 1. project controller - rest endpoints for projects
@RestController
@RequestMapping("/api/v1/projects")
public class Projectcontroller {

    private final Projectrepo repo;

    public Projectcontroller(Projectrepo repo) {
        this.repo = repo;
    }

    // 2. get all projects
    @GetMapping
    public ResponseEntity<Apires<List<Projectdto.Res>>> getAll() {
        List<Projectdto.Res> list = repo.findAll()
                .stream()
                .map(Projectdto.Res::from)
                .toList();
        return ResponseEntity.ok(Apires.ok("Projects fetched", list));
    }

    // 3. create new project
    @PostMapping
    public ResponseEntity<Apires<Projectdto.Res>> create(@Valid @RequestBody Projectdto.Req req) {
        Project p = new Project(
                req.getCode().toUpperCase(),
                req.getName(),
                req.getDescription(),
                req.getLead(),
                req.getHealth() != null ? req.getHealth() : "ON_TRACK",
                req.getProgress() != null ? req.getProgress() : 0,
                req.getDueDate(),
                req.getStatus() != null ? req.getStatus() : "ACTIVE"
        );

        Project saved = repo.save(p);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Apires.ok("Project created successfully", Projectdto.Res.from(saved)));
    }
}
