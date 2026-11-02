package com.epsm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// 1. main spring boot entry point
@SpringBootApplication
@EnableJpaAuditing
public class appmain {

    public static void main(String[] args) {
        SpringApplication.run(appmain.class, args);
    }
}
