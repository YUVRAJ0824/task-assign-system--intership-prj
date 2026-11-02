package com.epsm.dto;

import com.epsm.model.task;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

// 1. task data transfer objects
public class taskdto {

    // 2. request dto - create/update task
    public static class Req {
        @NotBlank(message = "Task code is required")
        @Size(max = 30)
        private String code;

        @NotBlank(message = "Task title is required")
        @Size(max = 150)
        private String title;

        private String description;
        private String priority = "MEDIUM";
        private Integer points = 3;
        private String status = "TODO";

        @NotBlank(message = "Assignee mentee name is required")
        private String assignee;

        private String team = "Platform Core";
        private String mentor = "Puneeth Rajkumar";

        private String projectCode;

        public Req() {}

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

        public String getTeam() { return team; }
        public void setTeam(String team) { this.team = team; }

        public String getMentor() { return mentor; }
        public void setMentor(String mentor) { this.mentor = mentor; }

        public String getProjectCode() { return projectCode; }
        public void setProjectCode(String projectCode) { this.projectCode = projectCode; }
    }

    // 3. response dto - outgoing clean json
    public static class Res {
        private Long id;
        private String code;
        private String title;
        private String description;
        private String priority;
        private Integer points;
        private String status;
        private String assignee;
        private String team;
        private String mentor;
        private String projectCode;
        private LocalDateTime createdAt;

        public Res() {}

        // 4. map entity to response dto
        public static Res from(task t) {
            Res r = new Res();
            r.setId(t.getId());
            r.setCode(t.getCode());
            r.setTitle(t.getTitle());
            r.setDescription(t.getDescription());
            r.setPriority(t.getPriority());
            r.setPoints(t.getPoints());
            r.setStatus(t.getStatus());
            r.setAssignee(t.getAssignee());
            r.setTeam(t.getTeam());
            r.setMentor(t.getMentor());
            if (t.getProject() != null) {
                r.setProjectCode(t.getProject().getCode());
            }
            r.setCreatedAt(t.getCreatedAt());
            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

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

        public String getTeam() { return team; }
        public void setTeam(String team) { this.team = team; }

        public String getMentor() { return mentor; }
        public void setMentor(String mentor) { this.mentor = mentor; }

        public String getProjectCode() { return projectCode; }
        public void setProjectCode(String projectCode) { this.projectCode = projectCode; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}

