package com.epsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

// 1. ticket entity - it service desk incident with automated sla
@Entity
@Table(name = "tickets")
public class ticket extends baseentity {

    // 2. ticket unique identifier (e.g. TKT-101)
    @Column(unique = true, nullable = false, length = 30)
    private String code;

    // 3. incident subject
    @Column(nullable = false, length = 150)
    private String subject;

    // 4. incident description
    @Column(length = 500)
    private String description;

    // 5. severity level: CRITICAL, HIGH, MEDIUM, LOW
    @Column(nullable = false, length = 20)
    private String severity = "MEDIUM";

    // 6. ticket status: OPEN, IN_PROGRESS, RESOLVED, CLOSED
    @Column(nullable = false, length = 20)
    private String status = "IN_PROGRESS";

    // 7. reporter name or client department
    @Column(nullable = false, length = 100)
    private String reporter;

    // 8. department / team assigned
    @Column(length = 50)
    private String dept = "Infrastructure Operations";

    // 9. target resolution deadline in hours
    @Column(nullable = false)
    private Integer targetHours = 8;

    // 10. incident start / reported timestamp (defaults to createdAt if null)
    private LocalDateTime reportedAt;

    // 11. resolution timestamp
    private LocalDateTime resolvedAt;

    public ticket() {}

    public ticket(String code, String subject, String description, String severity, String status, String reporter, Integer targetHours, LocalDateTime reportedAt) {
        this.code = code;
        this.subject = subject;
        this.description = description;
        this.severity = severity;
        this.status = status;
        this.reporter = reporter;
        this.targetHours = targetHours;
        this.reportedAt = reportedAt;
    }

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
}
