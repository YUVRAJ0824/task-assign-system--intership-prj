package com.epsm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

// 1. security and cors configuration
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class secconfig {

    private final jwtauthfilter jwtauthfilter;

    public secconfig(jwtauthfilter jwtauthfilter) {
        this.jwtauthfilter = jwtauthfilter;
    }

    // 2. password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 3. security rules - allow public endpoints, protect others
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(c -> c.configurationSource(corsSource()))
                .headers(h -> h.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable))
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/v1/health",
                                "/api/v1/projects/**",
                                "/api/v1/users/**",
                                "/api/v1/auth/**",
                                "/api/v1/tasks/**",
                                "/api/v1/milestones/**",
                                "/api/v1/tickets/**",
                                "/api/v1/approvals/**",
                                "/api/v1/workload/**",
                                "/api/v1/audit/**",
                                "/api/v1/analytics/**",
                                "/h2-console/**",
                                "/swagger-ui/**",
                                "/v3/api-docs/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtauthfilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 4. cors configuration for react frontend on port 5173
    @Bean
    public CorsConfigurationSource corsSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
