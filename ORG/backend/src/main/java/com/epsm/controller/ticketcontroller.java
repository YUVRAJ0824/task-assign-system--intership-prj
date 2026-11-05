package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.ticketdto;
import com.epsm.model.ticket;
import com.epsm.repository.ticketrepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

// 1. ticket controller - rest endpoints for service desk and sla monitoring
@RestController
@RequestMapping("/api/v1/tickets")
public class ticketcontroller {

    private final ticketrepo repo;

    public ticketcontroller(ticketrepo repo) {
        this.repo = repo;
    }

    // 2. get all tickets with real-time sla metrics
    @GetMapping
    public ResponseEntity<apires<List<ticketdto.Res>>> getAll() {
        List<ticketdto.Res> list = repo.findAll()
                .stream()
                .map(ticketdto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Tickets fetched", list));
    }

    // 3. raise new incident ticket
    @PostMapping
    public ResponseEntity<apires<ticketdto.Res>> create(@Valid @RequestBody ticketdto.Req req) {
        ticket t = new ticket();
        t.setCode(req.getCode().toUpperCase());
        t.setSubject(req.getSubject());
        t.setDescription(req.getDescription());
        t.setSeverity(req.getSeverity() != null ? req.getSeverity().toUpperCase() : "MEDIUM");
        t.setStatus("IN_PROGRESS");
        t.setReporter(req.getReporter());
        t.setDept(req.getDept() != null ? req.getDept() : "Platform Core");
        t.setTargetHours(req.getTargetHours() != null ? req.getTargetHours() : 8);

        ticket saved = repo.save(t);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apires.ok("Incident ticket raised successfully", ticketdto.Res.from(saved)));
    }

    // 4. resolve ticket and freeze sla timer (supports both PUT and PATCH)
    @RequestMapping(value = "/{id}/resolve", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ResponseEntity<apires<ticketdto.Res>> resolve(@PathVariable Long id) {
        Optional<ticket> opt = repo.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(apires.err("Ticket not found with id: " + id));
        }

        ticket t = opt.get();
        t.setStatus("RESOLVED");
        t.setResolvedAt(LocalDateTime.now());
        ticket saved = repo.save(t);
        return ResponseEntity.ok(apires.ok("Ticket marked as resolved", ticketdto.Res.from(saved)));
    }
}
