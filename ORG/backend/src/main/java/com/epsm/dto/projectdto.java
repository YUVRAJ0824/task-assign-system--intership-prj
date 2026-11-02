package com.epsm.dto;

import com.epsm.model.project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalDateTime;

// 1. project data transfer objects
public class projectdto {

    // 2. create project request payload
    public static class Req {
        @NotBlank(message = "Project code is required")
        @Size(max = 20)
        private String code;

        @NotBlank(message = "Project name is required")
        @Size(max = 100)
        private String name;

        private String description;

        @NotBlank(message = "Project lead is required")
        @Size(max = 50)
        private String lead;

        private String health = "ON_TRACK";
        private Integer progress = 0;
        private LocalDate dueDate;
        private String status = "ACTIVE";

        public Req() {}

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

    // 3. project response payload
    public static class Res {
        private Long id;
        private String code;
        private String name;
        private String description;
        private String lead;
        private String health;
        private Integer progress;
        private LocalDate dueDate;
        private String status;
        private LocalDateTime createdAt;

        public Res() {}

        public static Res from(project p) {
            Res r = new Res();
            r.setId(p.getId());
            r.setCode(p.getCode());
            r.setName(p.getName());
            r.setDescription(p.getDescription());
            r.setLead(p.getLead());
            r.setHealth(p.getHealth());
            r.setProgress(p.getProgress());
            r.setDueDate(p.getDueDate());
            r.setStatus(p.getStatus());
            r.setCreatedAt(p.getCreatedAt());
            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

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

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
