package com.epsm.dto;

import com.epsm.model.Role;
import com.epsm.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// user dtos
public class Userdto {

    // 1. register request
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Req {
        @NotBlank(message = "Username required")
        @Size(min = 3, max = 50)
        private String username;

        @NotBlank(message = "Email required")
        @Email(message = "Valid email required")
        private String email;

        @NotBlank(message = "Password required")
        @Size(min = 6, message = "Min 6 chars")
        private String password;

        @NotNull(message = "Role required")
        private Role role;

        private String department;
    }

    // 2. safe user info (no password)
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Res {
        private Long id;
        private String username;
        private String email;
        private Role role;
        private String department;
        private boolean active;

        // convert user entity to dto
        public static Res from(User u) {
            return Res.builder()
                    .id(u.getId())
                    .username(u.getUsername())
                    .email(u.getEmail())
                    .role(u.getRole())
                    .department(u.getDepartment())
                    .active(u.isActive())
                    .build();
        }
    }
}
