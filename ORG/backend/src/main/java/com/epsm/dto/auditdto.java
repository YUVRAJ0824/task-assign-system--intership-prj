package com.epsm.dto;

import com.epsm.model.auditlog;

import java.time.LocalDateTime;

// 1. audit log response data transfer objects
public class auditdto {

    // 2. response dto - outgoing audit log event
    public static class Res {
        private Long id;
        private String username;
        private String action;
        private String target;
        private String details;
        private String ipAddress;
        private LocalDateTime createdAt;

        public Res() {}

        // 3. map entity to response dto
        public static Res from(auditlog log) {
            Res r = new Res();
            r.setId(log.getId());
            r.setUsername(log.getUsername());
            r.setAction(log.getAction());
            r.setTarget(log.getTarget());
            r.setDetails(log.getDetails());
            r.setIpAddress(log.getIpAddress());
            r.setCreatedAt(log.getCreatedAt());
            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

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

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
