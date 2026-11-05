package com.epsm.controller;

import com.epsm.dto.apires;
import com.epsm.dto.workloaddto;
import com.epsm.model.task;
import com.epsm.repository.taskrepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

// 1. workload controller - calculates dynamic team capacity and points credit
@RestController
@RequestMapping("/api/v1/workload")
public class workloadcontroller {

    private final taskrepo taskrepo;

    // 2. static developer roster definition (Kannada cinema icons & Yuvraj V per user requirement)
    private record DeveloperProfile(String name, String role, String team, String mentor) {}

    private static final List<DeveloperProfile> ROSTER = List.of(
            new DeveloperProfile("Puneeth Rajkumar", "Project Lead & Architect", "Platform Architecture", "Self / Lead"),
            new DeveloperProfile("Yuvraj V", "Senior Java Backend Engineer", "Platform Core", "Puneeth Rajkumar"),
            new DeveloperProfile("Yash", "DevOps & Cloud Engineer", "Cloud Infrastructure", "Puneeth Rajkumar"),
            new DeveloperProfile("Rishab Shetty", "Security & Full-Stack Engineer", "Security & Auth", "Puneeth Rajkumar")
    );

    public workloadcontroller(taskrepo taskrepo) {
        this.taskrepo = taskrepo;
    }

    // 3. calculate dynamic workload and story point credits (1 story point = 4 working hours)
    @GetMapping
    public ResponseEntity<apires<List<workloaddto.Res>>> getWorkload() {
        List<task> allTasks = taskrepo.findAll();
        List<workloaddto.Res> results = new ArrayList<>();

        for (DeveloperProfile dev : ROSTER) {
            String firstName = dev.name().split(" ")[0].toLowerCase();

            // 4. filter all tasks assigned to developer
            List<task> devTasks = allTasks.stream()
                    .filter(t -> t.getAssignee() != null)
                    .filter(t -> {
                        String a = t.getAssignee().toLowerCase();
                        return a.contains(dev.name().toLowerCase()) || a.startsWith(firstName);
                    })
                    .toList();

            // 5. active tasks (not DONE) vs completed tasks (DONE)
            List<task> activeDevTasks = devTasks.stream()
                    .filter(t -> !"DONE".equalsIgnoreCase(t.getStatus()))
                    .toList();

            int activePoints = activeDevTasks.stream()
                    .mapToInt(t -> t.getPoints() != null ? t.getPoints() : 1)
                    .sum();

            int completedPoints = devTasks.stream()
                    .filter(t -> "DONE".equalsIgnoreCase(t.getStatus()))
                    .mapToInt(t -> t.getPoints() != null ? t.getPoints() : 1)
                    .sum();

            int allocatedHours = activePoints * 4;
            int maxHours = 40; // 40h standard weekly engineering capacity
            int percent = (int) Math.round(((double) allocatedHours / maxHours) * 100);

            // 6. determine status
            String status = percent > 100 ? "OVERLOAD" : percent >= 60 ? "HEALTHY" : "AVAILABLE";

            List<workloaddto.TaskSummary> taskSummaries = devTasks.stream()
                    .map(t -> new workloaddto.TaskSummary(t.getCode(), t.getTitle(), t.getPoints(), t.getStatus()))
                    .toList();

            results.add(new workloaddto.Res(
                    dev.name(),
                    dev.role(),
                    dev.team(),
                    dev.mentor(),
                    activePoints,
                    completedPoints,
                    allocatedHours,
                    maxHours,
                    percent,
                    status,
                    taskSummaries
            ));
        }

        return ResponseEntity.ok(apires.ok("Dynamic squad capacity calculated", results));
    }
}
