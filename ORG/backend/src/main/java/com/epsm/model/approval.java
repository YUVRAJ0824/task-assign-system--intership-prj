package com.epsm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

// 1. approval entity - tracks change requests, sign-offs and governance
@Entity
@Table(name = "approvals")
public class approval extends baseentity {

    // 2. unique approval code (e.g. APR-101)
    @Column(unique = true, nullable = false, length = 20)
    private String code;

    // 3. title of request
    @Column(nullable = false, length = 150)
    private String title;

    // 4. request category: DEPLOYMENT, ARCHITECTURE, BUDGET, ACCESS
    @Column(nullable = false, length = 30)
    private String category;

    // 5. related project code
    @Column(nullable = false, length = 20)
    private String projectCode;

    // 6. user requesting approval
    @Column(nullable = false, length = 50)
    private String requester;

    // 7. assigned approver (lead or admin)
    @Column(nullable = false, length = 50)
    private String approver;

    // 8. approval status: PENDING, APPROVED, REJECTED
    @Column(nullable = false, length = 20)
    private String status = "PENDING";

    // 9. priority: HIGH, MEDIUM, LOW
    @Column(nullable = false, length = 20)
    private String priority = "MEDIUM";

    // 10. remarks or justifications
    @Column(length = 255)
    private String notes;

    public approval() {}

    public approval(String code, String title, String category, String projectCode, String requester, String approver, String status, String priority, String notes) {
        this.code = code;
        this.title = title;
        this.category = category;
        this.projectCode = projectCode;
        this.requester = requester;
        this.approver = approver;
        this.status = status;
        this.priority = priority;
        this.notes = notes;
    }

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
}
