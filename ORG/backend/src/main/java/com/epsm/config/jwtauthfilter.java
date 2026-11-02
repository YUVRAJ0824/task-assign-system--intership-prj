package com.epsm.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

// 1. jwt auth filter - intercepts incoming requests and authenticates bearer token
@Component
public class jwtauthfilter extends OncePerRequestFilter {

    private final jwtutil jwtutil;

    public jwtauthfilter(jwtutil jwtutil) {
        this.jwtutil = jwtutil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        // 2. read authorization header
        String authHeader = req.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            // 3. validate token
            if (jwtutil.validateToken(token)) {
                String username = jwtutil.getUsernameFromToken(token);
                String role = jwtutil.getRoleFromToken(token);

                // 4. set spring security authentication context
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role != null ? role : "ROLE_TEAM_MEMBER");
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(authority)
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // 5. proceed with filter chain
        chain.doFilter(req, res);
    }
}
