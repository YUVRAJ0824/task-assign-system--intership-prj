package com.epsm.model;

import jakarta.persistence.*;

// 1. user entity - maps to users table in db
@Entity
@Table(name = "users")
public class user extends baseentity {

    // 2. login details
    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    // 3. role stored as string
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private role role;

    // 4. department info
    @Column(length = 50)
    private String department;

    // 5. active status
    @Column(nullable = false)
    private boolean active = true;

    public user() {}

    public user(String username, String email, String password, role role, String department, boolean active) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.department = department;
        this.active = active;
    }

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

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}

