package com.epsm.model;

// 5 user roles for access control
public enum Role {
    ROLE_ADMIN,           // full access
    ROLE_PROJECT_MANAGER, // manage projects
    ROLE_TEAM_LEAD,       // lead sprint and team
    ROLE_TEAM_MEMBER,     // work on tasks
    ROLE_SERVICE_AGENT    // solve tickets
}
