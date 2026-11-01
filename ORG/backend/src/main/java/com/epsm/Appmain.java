package com.epsm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// 1. main entry point
@SpringBootApplication
@EnableJpaAuditing // auto fills created/updated dates
public class Appmain {

    public static void main(String[] args) {
        // start server on port 8080
        SpringApplication.run(Appmain.class, args);
    }
}

