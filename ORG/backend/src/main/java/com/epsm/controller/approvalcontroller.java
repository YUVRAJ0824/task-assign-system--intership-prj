package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.approvaldto;
import com.epsm.model.approval;
import com.epsm.repository.approvalrepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// 1. approval controller - endpoints for change management, sign-offs and governance
@RestController
@RequestMapping("/api/v1/approvals")
public class approvalcontroller {

    private final approvalrepo repo;

    public approvalcontroller(approvalrepo repo) {
        this.repo = repo;
    }

    // 2. get all approvals
    @GetMapping
    public ResponseEntity<apires<List<approvaldto.Res>>> getAll() {
        List<approvaldto.Res> list = repo.findAll()
                .stream()
                .map(approvaldto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Approvals fetched", list));
    }

    // 3. submit new approval request
    @PostMapping
    public ResponseEntity<apires<approvaldto.Res>> create(@Valid @RequestBody approvaldto.Req req) {
        approval a = new approval(
                req.getCode().toUpperCase(),
                req.getTitle(),
                req.getCategory() != null ? req.getCategory().toUpperCase() : "DEPLOYMENT",
                req.getProjectCode() != null ? req.getProjectCode() : "PRJ-101",
                req.getRequester(),
                req.getApprover() != null ? req.getApprover() : "Puneeth Rajkumar",
                "PENDING",
                req.getPriority() != null ? req.getPriority().toUpperCase() : "MEDIUM",
                req.getNotes()
        );
        approval saved = repo.save(a);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apires.ok("Approval request submitted", approvaldto.Res.from(saved)));
    }

    // 4. approve request
    @RequestMapping(value = "/{id}/approve", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<apires<approvaldto.Res>> approve(@PathVariable Long id) {
        Optional<approval> opt = repo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(apires.err("Approval not found with id: " + id));
        }

        approval a = opt.get();
        a.setStatus("APPROVED");
        approval saved = repo.save(a);
        return ResponseEntity.ok(apires.ok("Request approved successfully", approvaldto.Res.from(saved)));
    }

    // 5. reject request
    @RequestMapping(value = "/{id}/reject", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<apires<approvaldto.Res>> reject(@PathVariable Long id) {
        Optional<approval> opt = repo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(apires.err("Approval not found with id: " + id));
        }

        approval a = opt.get();
        a.setStatus("REJECTED");
        approval saved = repo.save(a);
        return ResponseEntity.ok(apires.ok("Request rejected", approvaldto.Res.from(saved)));
    }
}
