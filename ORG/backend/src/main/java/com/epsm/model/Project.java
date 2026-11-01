package com.epsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

// 1. project entity - parent container for tasks and sprints
@Entity
@Table(name = "projects")
public class Project extends Baseentity {

    // 2. unique project code (e.g. PRJ-101)
    @Column(unique = true, nullable = false, length = 20)
    private String code;

    // 3. project display name
    @Column(nullable = false, length = 100)
    private String name;

    // 4. short project summary
    @Column(length = 255)
    private String description;

    // 5. project lead or manager name
    @Column(nullable = false, length = 50)
    private String lead;

    // 6. health status: ON_TRACK, AT_RISK, DELAYED
    @Column(nullable = false, length = 20)
    private String health = "ON_TRACK";

    // 7. completion percentage (0 - 100)
    @Column(nullable = false)
    private Integer progress = 0;

    // 8. target completion date
    private LocalDate dueDate;

    // 9. status: ACTIVE, PLANNING, COMPLETED, ON_HOLD
    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    public Project() {}

    public Project(String code, String name, String description, String lead, String health, Integer progress, LocalDate dueDate, String status) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.lead = lead;
        this.health = health;
        this.progress = progress;
        this.dueDate = dueDate;
        this.status = status;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLead() { return lead; }
    public void setLead(String lead) { this.lead = lead; }

    public String getHealth() { return health; }
    public void setHealth(String health) { this.health = health; }

    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
