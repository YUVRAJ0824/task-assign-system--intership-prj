package com.epsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

// 1. audit log entity - tracks security events, project changes, and compliance
@Entity
@Table(name = "audit_logs")
public class auditlog extends baseentity {

    // 2. acting user
    @Column(nullable = false, length = 50)
    private String username;

    // 3. action type: LOGIN, PROJECT_CREATED, TASK_STATUS_CHANGE, APPROVAL_GRANTED, SLA_BREACH
    @Column(nullable = false, length = 50)
    private String action;

    // 4. resource target code (e.g. PRJ-101, TSK-04)
    @Column(length = 50)
    private String target;

    // 5. event description / details
    @Column(length = 255)
    private String details;

    // 6. ip address
    @Column(length = 50)
    private String ipAddress;

    public auditlog() {}

    public auditlog(String username, String action, String target, String details, String ipAddress) {
        this.username = username;
        this.action = action;
        this.target = target;
        this.details = details;
        this.ipAddress = ipAddress;
    }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTarget() { return target; }
    public void setTarget(String target) { this.target = target; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
}
