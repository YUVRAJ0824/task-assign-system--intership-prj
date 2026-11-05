package com.epsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDate;

// 1. milestone entity - tracks target dates and progress under projects
@Entity
@Table(name = "milestones")
public class milestone extends baseentity {

    // 2. parent project code
    @Column(nullable = false, length = 20)
    private String projectCode;

    // 3. milestone title
    @Column(nullable = false, length = 120)
    private String title;

    // 4. milestone description
    @Column(length = 255)
    private String description;

    // 5. owner / deliverable lead
    @Column(nullable = false, length = 50)
    private String owner;

    // 6. target completion date
    private LocalDate targetDate;

    // 7. status: PENDING, IN_PROGRESS, COMPLETED, OVERDUE
    @Column(nullable = false, length = 20)
    private String status = "IN_PROGRESS";

    // 8. progress percentage (0 - 100)
    @Column(nullable = false)
    private Integer progress = 0;

    public milestone() {}

    public milestone(String projectCode, String title, String description, String owner, LocalDate targetDate, String status, Integer progress) {
        this.projectCode = projectCode;
        this.title = title;
        this.description = description;
        this.owner = owner;
        this.targetDate = targetDate;
        this.status = status;
        this.progress = progress;
    }

    public String getProjectCode() { return projectCode; }
    public void setProjectCode(String projectCode) { this.projectCode = projectCode; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }

    public LocalDate getTargetDate() { return targetDate; }
    public void setTargetDate(LocalDate targetDate) { this.targetDate = targetDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
}
