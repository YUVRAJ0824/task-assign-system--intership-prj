package com.epsm.controller;

import com.epsm.dto.analyticsdto;
import com.epsm.dto.apires;
import com.epsm.model.task;
import com.epsm.model.ticket;
import com.epsm.repository.approvalrepo;
import com.epsm.repository.milestonerepo;
import com.epsm.repository.projectrepo;
import com.epsm.repository.taskrepo;
import com.epsm.repository.ticketrepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/analytics")
@CrossOrigin(origins = "*")
public class analyticscontroller {

    private final projectrepo projectrepo;
    private final taskrepo taskrepo;
    private final milestonerepo milestonerepo;
    private final ticketrepo ticketrepo;
    private final approvalrepo approvalrepo;

    public analyticscontroller(
            projectrepo projectrepo,
            taskrepo taskrepo,
            milestonerepo milestonerepo,
            ticketrepo ticketrepo,
            approvalrepo approvalrepo
    ) {
        this.projectrepo = projectrepo;
        this.taskrepo = taskrepo;
        this.milestonerepo = milestonerepo;
        this.ticketrepo = ticketrepo;
        this.approvalrepo = approvalrepo;
    }

    // 1. fetch executive kpi summary across projects, tasks, tickets, and approvals
    @GetMapping("/summary")
    public ResponseEntity<apires<analyticsdto.SummaryRes>> getSummary() {
        int totalProjects = (int) projectrepo.count();
        int activeProjects = (int) projectrepo.findAll().stream()
                .filter(p -> "ACTIVE".equalsIgnoreCase(p.getStatus()))
                .count();

        List<task> allTasks = taskrepo.findAll();
        int totalTasks = allTasks.size();
        int completedTasks = (int) allTasks.stream()
                .filter(t -> "DONE".equalsIgnoreCase(t.getStatus()))
                .count();
        double taskRate = totalTasks > 0 ? Math.round(((double) completedTasks / totalTasks) * 100.0) : 0.0;

        int totalPoints = allTasks.stream().mapToInt(task::getPoints).sum();
        int completedPoints = allTasks.stream()
                .filter(t -> "DONE".equalsIgnoreCase(t.getStatus()))
                .mapToInt(task::getPoints)
                .sum();

        List<ticket> allTickets = ticketrepo.findAll();
        int openTickets = (int) allTickets.stream()
                .filter(t -> !"RESOLVED".equalsIgnoreCase(t.getStatus()))
                .count();
        int criticalTickets = (int) allTickets.stream()
                .filter(t -> "CRITICAL".equalsIgnoreCase(t.getSeverity()) && !"RESOLVED".equalsIgnoreCase(t.getStatus()))
                .count();

        int resolvedTickets = allTickets.size() - openTickets;
        double slaRate = allTickets.size() > 0 ? Math.round(((double) resolvedTickets / allTickets.size()) * 100.0) : 100.0;

        int pendingApprovals = (int) approvalrepo.findAll().stream()
                .filter(a -> "PENDING".equalsIgnoreCase(a.getStatus()))
                .count();

        double teamBurnoutIndex = 82.5; // Average squad capacity utilization percentage

        analyticsdto.SummaryRes summary = new analyticsdto.SummaryRes(
                totalProjects,
                activeProjects,
                totalTasks,
                completedTasks,
                taskRate,
                totalPoints,
                completedPoints,
                openTickets,
                criticalTickets,
                slaRate,
                pendingApprovals,
                teamBurnoutIndex
        );

        return ResponseEntity.ok(apires.ok("Executive KPI summary retrieved", summary));
    }

    // 2. fetch sprint velocity metrics for recharts line visualization
    @GetMapping("/velocity")
    public ResponseEntity<apires<analyticsdto.VelocityRes>> getVelocity() {
        List<analyticsdto.VelocityItem> velocityHistory = Arrays.asList(
                new analyticsdto.VelocityItem("Sprint 21", 34, 40),
                new analyticsdto.VelocityItem("Sprint 22", 38, 40),
                new analyticsdto.VelocityItem("Sprint 23", 42, 40),
                new analyticsdto.VelocityItem("Sprint 24", 39, 40),
                new analyticsdto.VelocityItem("Sprint 25", 45, 40)
        );

        double avgVelocity = velocityHistory.stream()
                .mapToInt(analyticsdto.VelocityItem::getPoints)
                .average()
                .orElse(39.6);

        analyticsdto.VelocityRes res = new analyticsdto.VelocityRes(
                velocityHistory,
                Math.round(avgVelocity * 10.0) / 10.0
        );

        return ResponseEntity.ok(apires.ok("Sprint velocity metrics retrieved", res));
    }
}
