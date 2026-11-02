package com.epsm.model;

import jakarta.persistence.*;

// 1. task entity - work assignment with team dept and mentor mentee tracking
@Entity
@Table(name = "tasks")
public class task extends baseentity {

    // 2. task code (e.g. PRJ-101-TSK-1)
    @Column(unique = true, nullable = false, length = 30)
    private String code;

    // 3. task title
    @Column(nullable = false, length = 150)
    private String title;

    // 4. task description
    @Column(length = 500)
    private String description;

    // 5. priority: LOW, MEDIUM, HIGH, CRITICAL
    @Column(nullable = false, length = 20)
    private String priority = "MEDIUM";

    // 6. story points estimate (1, 2, 3, 5, 8, 13)
    @Column(nullable = false)
    private Integer points = 3;

    // 7. workflow status: BACKLOG, TODO, IN_PROGRESS, REVIEW, DONE
    @Column(nullable = false, length = 20)
    private String status = "TODO";

    // 8. assigned mentee / engineer name
    @Column(nullable = false, length = 50)
    private String assignee;

    // 9. department / team name (e.g. Platform Core, Cloud DevOps, Security)
    @Column(length = 50)
    private String team = "Platform Core";

    // 10. supervising mentor name (e.g. Puneeth Rajkumar)
    @Column(length = 50)
    private String mentor = "Puneeth Rajkumar";

    // 11. parent project relationship
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project_id")
    private project project;

    public task() {}

    public task(String code, String title, String description, String priority, Integer points, String status, String assignee, project project) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.points = points;
        this.status = status;
        this.assignee = assignee;
        this.project = project;
    }

    public task(String code, String title, String description, String priority, Integer points, String status, String assignee, String team, String mentor, project project) {
        this.code = code;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.points = points;
        this.status = status;
        this.assignee = assignee;
        this.team = team;
        this.mentor = mentor;
        this.project = project;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAssignee() { return assignee; }
    public void setAssignee(String assignee) { this.assignee = assignee; }

    public String getMentee() { return assignee; }
    public void setMentee(String mentee) { this.assignee = mentee; }

    public String getTeam() { return team; }
    public void setTeam(String team) { this.team = team; }

    public String getMentor() { return mentor; }
    public void setMentor(String mentor) { this.mentor = mentor; }

    public project getProject() { return project; }
    public void setProject(project project) { this.project = project; }
}

