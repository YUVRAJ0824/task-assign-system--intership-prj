package com.epsm.dto;

import com.epsm.model.role;
import com.epsm.model.user;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

// 1. user data transfer objects for authentication and role management
public class userdto {

    // 2. user registration request
    public static class Req {
        @NotBlank(message = "Username is required")
        @Size(min = 3, max = 50)
        private String username;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        @Size(min = 6)
        private String password;

        private role role = com.epsm.model.role.ROLE_TEAM_MEMBER;
        private String department;

        public Req() {}

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }

        public role getRole() { return role; }
        public void setRole(role role) { this.role = role; }

        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
    }

    // 3. user response (excluding password)
    public static class Res {
        private Long id;
        private String username;
        private String email;
        private role role;
        private String department;
        private boolean active;
        private LocalDateTime createdAt;

        public Res() {}

        public static Res from(user u) {
            Res r = new Res();
            r.setId(u.getId());
            r.setUsername(u.getUsername());
            r.setEmail(u.getEmail());
            r.setRole(u.getRole());
            r.setDepartment(u.getDepartment());
            r.setActive(u.isActive());
            r.setCreatedAt(u.getCreatedAt());
            return r;
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public role getRole() { return role; }
        public void setRole(role role) { this.role = role; }

        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }

        public boolean isActive() { return active; }
        public void setActive(boolean active) { this.active = active; }

        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
