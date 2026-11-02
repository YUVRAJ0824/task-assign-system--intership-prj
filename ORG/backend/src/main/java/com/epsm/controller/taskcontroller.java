package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.taskdto;
import com.epsm.model.project;
import com.epsm.model.task;
import com.epsm.repository.projectrepo;
import com.epsm.repository.taskrepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

// 1. task controller - rest endpoints for tasks
@RestController
@RequestMapping("/api/v1/tasks")
public class taskcontroller {

    private final taskrepo repo;
    private final projectrepo projectrepo;

    public taskcontroller(taskrepo repo, projectrepo projectrepo) {
        this.repo = repo;
        this.projectrepo = projectrepo;
    }

    // 2. get all tasks
    @GetMapping
    public ResponseEntity<apires<List<taskdto.Res>>> getAll() {
        List<taskdto.Res> list = repo.findAll()
                .stream()
                .map(taskdto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Tasks fetched", list));
    }

    // 3. create new task
    @PostMapping
    public ResponseEntity<apires<taskdto.Res>> create(@Valid @RequestBody taskdto.Req req) {
        project p = null;
        if (req.getProjectCode() != null && !req.getProjectCode().isBlank()) {
            p = projectrepo.findByCode(req.getProjectCode()).orElse(null);
        }
        if (p == null && projectrepo.count() > 0) {
            p = projectrepo.findAll().get(0);
        }

        task t = new task(
                req.getCode().toUpperCase(),
                req.getTitle(),
                req.getDescription(),
                req.getPriority() != null ? req.getPriority().toUpperCase() : "MEDIUM",
                req.getPoints() != null ? req.getPoints() : 3,
                req.getStatus() != null ? req.getStatus().toUpperCase() : "TODO",
                req.getAssignee(),
                req.getTeam() != null ? req.getTeam() : "Platform Core",
                req.getMentor() != null ? req.getMentor() : "Puneeth Rajkumar",
                p
        );

        task saved = repo.save(t);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apires.ok("Task created successfully", taskdto.Res.from(saved)));
    }

    // 4. patch task status (supports both query param ?status=DONE and json body {"status":"DONE"})
    @RequestMapping(value = "/{id}/status", method = {RequestMethod.PATCH, RequestMethod.PUT})
    public ResponseEntity<apires<taskdto.Res>> updateStatus(
            @PathVariable Long id,
            @RequestParam(required = false) String status,
            @RequestBody(required = false) Map<String, String> body
    ) {
        Optional<task> opt = repo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(apires.err("Task not found with id: " + id));
        }

        task t = opt.get();
        String newStatus = status;
        if ((newStatus == null || newStatus.isBlank()) && body != null) {
            newStatus = body.get("status");
        }

        if (newStatus != null && !newStatus.isBlank()) {
            t.setStatus(newStatus.toUpperCase());
        }

        task saved = repo.save(t);
        return ResponseEntity.ok(apires.ok("Task status updated", taskdto.Res.from(saved)));
    }
}

