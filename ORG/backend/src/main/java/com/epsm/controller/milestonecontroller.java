package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.milestonedto;
import com.epsm.model.milestone;
import com.epsm.repository.milestonerepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// 1. milestone controller - endpoints for tracking project milestones
@RestController
@RequestMapping("/api/v1/milestones")
public class milestonecontroller {

    private final milestonerepo repo;

    public milestonecontroller(milestonerepo repo) {
        this.repo = repo;
    }

    // 2. get all milestones
    @GetMapping
    public ResponseEntity<apires<List<milestonedto.Res>>> getAll() {
        List<milestonedto.Res> list = repo.findAll()
                .stream()
                .map(milestonedto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Milestones fetched", list));
    }

    // 3. get milestones by project code
    @GetMapping("/project/{code}")
    public ResponseEntity<apires<List<milestonedto.Res>>> getByProject(@PathVariable String code) {
        List<milestonedto.Res> list = repo.findByProjectCode(code)
                .stream()
                .map(milestonedto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Project milestones fetched", list));
    }

    // 4. create new milestone
    @PostMapping
    public ResponseEntity<apires<milestonedto.Res>> create(@Valid @RequestBody milestonedto.Req req) {
        milestone m = new milestone(
                req.getProjectCode(),
                req.getTitle(),
                req.getDescription(),
                req.getOwner(),
                req.getTargetDate(),
                req.getStatus() != null ? req.getStatus() : "IN_PROGRESS",
                req.getProgress() != null ? req.getProgress() : 0
        );
        milestone saved = repo.save(m);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apires.ok("Milestone created successfully", milestonedto.Res.from(saved)));
    }
}
