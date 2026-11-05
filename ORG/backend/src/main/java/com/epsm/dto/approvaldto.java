package com.epsm.dto;

import com.epsm.model.approval;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

// 1. approval data transfer objects
public class approvaldto {

    // 2. request dto - submit new governance approval request
    public static class Req {
        @NotBlank(message = "Approval code is required")
        @Size(max = 20)
        private String code;

        @NotBlank(message = "Title is required")
        @Size(max = 150)
        private String title;

        private String category = "DEPLOYMENT";
        private String projectCode;

        @NotBlank(message = "Requester name is required")
        private String requester;

        private String approver = "Puneeth Rajkumar";
        private String priority = "MEDIUM";
        private String notes;

        public Req() {}

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getProjectCode() { return projectCode; }
        public void setProjectCode(String projectCode) { this.projectCode = projectCode; }

        public String getRequester() { return requester; }
        public void setRequester(String requester) { this.requester = requester; }

        public String getApprover() { return approver; }
        public void setApprover(String approver) { this.approver = approver; }

        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    // 3. response dto - outgoing approval json
    public static class Res {
        private Long id;
        private String code;
        private String title;
        private String category;
        private String projectCode;
        private String requester;
        private String approver;
        private String status;
        private String priority;
        private String notes;
        private LocalDateTime createdAt;

        public Res() {}

        // 4. map entity to response dto
        public static Res from(approval a) {
            Res r = new Res();
            r.setId(a.getId());
            r.setCode(a.getCode());
            r.setTitle(a.getTitle());
            r.setCategory(a.getCategory());
            r.setProjectCode(a.getProjectCode());
            r.setRequester(a.getRequester());
            r.setApprover(a.getApprover());
            r.setStatus(a.getStatus());
            r.setPriority(a.getPriority());
            r.setNotes(a.getNotes());
            r.setCreatedAt(a.getCreatedAt());
            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getProjectCode() { return projectCode; }
        public void setProjectCode(String projectCode) { this.projectCode = projectCode; }

        public String getRequester() { return requester; }
        public void setRequester(String requester) { this.requester = requester; }

        public String getApprover() { return approver; }
        public void setApprover(String approver) { this.approver = approver; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }

        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
