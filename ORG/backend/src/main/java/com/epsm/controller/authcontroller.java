package com.epsm.controller;

import com.epsm.config.jwtutil;
import com.epsm.dto.apires;
import com.epsm.dto.authdto;
import com.epsm.dto.userdto;
import com.epsm.model.role;
import com.epsm.model.user;
import com.epsm.repository.userrepo;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// 1. auth controller - endpoints for login, registration, and user retrieval
@RestController
@RequestMapping("/api/v1/auth")
public class authcontroller {

    private final userrepo userrepo;
    private final PasswordEncoder passwordEncoder;
    private final jwtutil jwtutil;

    public authcontroller(userrepo userrepo, PasswordEncoder passwordEncoder, jwtutil jwtutil) {
        this.userrepo = userrepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtutil = jwtutil;
    }

    // 2. user login endpoint
    @PostMapping("/login")
    public ResponseEntity<apires<authdto.AuthRes>> login(@Valid @RequestBody authdto.LoginReq req) {
        Optional<user> userOpt = userrepo.findByUsername(req.getUsername());

        // 3. check credentials
        if (userOpt.isEmpty() || !passwordEncoder.matches(req.getPassword(), userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(apires.err("Invalid username or password"));
        }

        user u = userOpt.get();
        if (!u.isActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(apires.err("User account is deactivated"));
        }

        // 4. generate jwt token
        String token = jwtutil.generateToken(u.getUsername(), u.getRole().name());

        authdto.AuthRes res = new authdto.AuthRes(
                token,
                u.getUsername(),
                u.getEmail(),
                u.getRole(),
                u.getDepartment()
        );

        return ResponseEntity.ok(apires.ok("Login successful", res));
    }

    // 5. user register endpoint
    @PostMapping("/register")
    public ResponseEntity<apires<authdto.AuthRes>> register(@Valid @RequestBody userdto.Req req) {
        if (userrepo.existsByUsername(req.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(apires.err("Username already taken"));
        }

        if (userrepo.existsByEmail(req.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(apires.err("Email already registered"));
        }

        // 6. hash password and save user
        user u = new user(
                req.getUsername(),
                req.getEmail(),
                passwordEncoder.encode(req.getPassword()),
                req.getRole() != null ? req.getRole() : role.ROLE_TEAM_MEMBER,
                req.getDepartment() != null ? req.getDepartment() : "General",
                true
        );

        user saved = userrepo.save(u);

        // 7. generate jwt token
        String token = jwtutil.generateToken(saved.getUsername(), saved.getRole().name());

        authdto.AuthRes res = new authdto.AuthRes(
                token,
                saved.getUsername(),
                saved.getEmail(),
                saved.getRole(),
                saved.getDepartment()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apires.ok("User registered successfully", res));
    }

    // 8. list all active users (for assignment & role switcher)
    @GetMapping("/users")
    public ResponseEntity<apires<List<userdto.Res>>> getAllUsers() {
        List<userdto.Res> list = userrepo.findAll()
                .stream()
                .map(userdto.Res::from)
                .toList();
        return ResponseEntity.ok(apires.ok("Users retrieved", list));
    }
}
