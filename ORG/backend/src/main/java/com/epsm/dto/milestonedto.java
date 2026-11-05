package com.epsm.dto;

import com.epsm.model.milestone;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;

// 1. milestone request and response data transfer objects
public class milestonedto {

    // 2. request payload for creating/updating a milestone
    public static class Req {
        @NotBlank(message = "Project code is required")
        private String projectCode;

        @NotBlank(message = "Milestone title is required")
        @Size(max = 120)
        private String title;

        private String description;

        @NotBlank(message = "Owner is required")
        private String owner;

        private LocalDate targetDate;
        private String status = "IN_PROGRESS";
        private Integer progress = 0;

        public Req() {}

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

    // 3. response payload returned by API
    public static class Res {
        private Long id;
        private String projectCode;
        private String title;
        private String description;
        private String owner;
        private LocalDate targetDate;
        private String status;
        private Integer progress;
        private LocalDateTime createdAt;

        public Res() {}

        public static Res from(milestone m) {
            Res r = new Res();
            r.setId(m.getId());
            r.setProjectCode(m.getProjectCode());
            r.setTitle(m.getTitle());
            r.setDescription(m.getDescription());
            r.setOwner(m.getOwner());
            r.setTargetDate(m.getTargetDate());
            r.setStatus(m.getStatus());
            r.setProgress(m.getProgress());
            r.setCreatedAt(m.getCreatedAt());
            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

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

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
