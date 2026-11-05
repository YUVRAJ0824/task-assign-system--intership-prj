package com.epsm.dto;

import com.epsm.model.ticket;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Duration;
import java.time.LocalDateTime;

// 1. ticket data transfer objects with automated sla calculation
public class ticketdto {

    // 2. request dto - raise new incident ticket
    public static class Req {
        @NotBlank(message = "Ticket code is required")
        @Size(max = 30)
        private String code;

        @NotBlank(message = "Incident subject is required")
        @Size(max = 150)
        private String subject;

        private String description;

        private String severity = "MEDIUM";
        private String status = "IN_PROGRESS";

        @NotBlank(message = "Reporter name is required")
        private String reporter;

        private String dept = "Infrastructure Operations";
        private Integer targetHours = 8;

        public Req() {}

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getReporter() { return reporter; }
        public void setReporter(String reporter) { this.reporter = reporter; }

        public String getDept() { return dept; }
        public void setDept(String dept) { this.dept = dept; }

        public Integer getTargetHours() { return targetHours; }
        public void setTargetHours(Integer targetHours) { this.targetHours = targetHours; }
    }

    // 3. response dto - includes automated sla countdown calculations
    public static class Res {
        private Long id;
        private String code;
        private String subject;
        private String description;
        private String severity;
        private String status;
        private String reporter;
        private String dept;
        private Integer targetHours;
        private LocalDateTime reportedAt;
        private LocalDateTime resolvedAt;
        private LocalDateTime createdAt;

        // SLA dynamic computed fields
        private Long elapsedMinutes;
        private Long remainingMinutes;
        private Integer slaPercent;
        private Boolean warning;

        public Res() {}

        // 4. map entity and compute live sla metrics
        public static Res from(ticket t) {
            Res r = new Res();
            r.setId(t.getId());
            r.setCode(t.getCode());
            r.setSubject(t.getSubject());
            r.setDescription(t.getDescription());
            r.setSeverity(t.getSeverity());
            r.setStatus(t.getStatus());
            r.setReporter(t.getReporter());
            r.setDept(t.getDept());
            r.setTargetHours(t.getTargetHours());
            r.setReportedAt(t.getReportedAt());
            r.setResolvedAt(t.getResolvedAt());
            r.setCreatedAt(t.getCreatedAt());

            // 5. automated SLA computation
            LocalDateTime start = t.getReportedAt() != null ? t.getReportedAt() : t.getCreatedAt();
            if (start == null) {
                start = LocalDateTime.now();
            }

            LocalDateTime end = "RESOLVED".equalsIgnoreCase(t.getStatus()) && t.getResolvedAt() != null
                    ? t.getResolvedAt()
                    : LocalDateTime.now();

            long totalTargetMinutes = (long) (t.getTargetHours() != null ? t.getTargetHours() : 8) * 60;
            long elapsed = Math.max(0, Duration.between(start, end).toMinutes());
            long remaining = Math.max(0, totalTargetMinutes - elapsed);

            int percent = totalTargetMinutes > 0
                    ? (int) Math.min(100, Math.round(((double) elapsed / totalTargetMinutes) * 100))
                    : 100;

            boolean isWarning = !"RESOLVED".equalsIgnoreCase(t.getStatus()) && percent >= 75;

            r.setElapsedMinutes(elapsed);
            r.setRemainingMinutes(remaining);
            r.setSlaPercent(percent);
            r.setWarning(isWarning);

            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }

        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public String getReporter() { return reporter; }
        public void setReporter(String reporter) { this.reporter = reporter; }

        public String getDept() { return dept; }
        public void setDept(String dept) { this.dept = dept; }

        public Integer getTargetHours() { return targetHours; }
        public void setTargetHours(Integer targetHours) { this.targetHours = targetHours; }

        public LocalDateTime getReportedAt() { return reportedAt; }
        public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }

        public LocalDateTime getResolvedAt() { return resolvedAt; }
        public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

        public Long getElapsedMinutes() { return elapsedMinutes; }
        public void setElapsedMinutes(Long elapsedMinutes) { this.elapsedMinutes = elapsedMinutes; }

        public Long getRemainingMinutes() { return remainingMinutes; }
        public void setRemainingMinutes(Long remainingMinutes) { this.remainingMinutes = remainingMinutes; }

        public Integer getSlaPercent() { return slaPercent; }
        public void setSlaPercent(Integer slaPercent) { this.slaPercent = slaPercent; }

        public Boolean getWarning() { return warning; }
        public void setWarning(Boolean warning) { this.warning = warning; }
    }
}
