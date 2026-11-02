package com.epsm.dto;

import com.epsm.model.role;
import jakarta.validation.constraints.NotBlank;

// 1. auth request and response data transfer objects
public class authdto {

    // 2. login request
    public static class LoginReq {
        @NotBlank(message = "Username is required")
        private String username;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginReq() {}

        public LoginReq(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // 3. auth success response containing jwt token
    public static class AuthRes {
        private String token;
        private String type = "Bearer";
        private String username;
        private String email;
        private role role;
        private String department;

        public AuthRes() {}

        public AuthRes(String token, String username, String email, role role, String department) {
            this.token = token;
            this.username = username;
            this.email = email;
            this.role = role;
            this.department = department;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }

        public role getRole() { return role; }
        public void setRole(role role) { this.role = role; }

        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
    }
}
