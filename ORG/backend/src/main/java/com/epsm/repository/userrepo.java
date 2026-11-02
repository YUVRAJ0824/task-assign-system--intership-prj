package com.epsm.repository;

import com.epsm.model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 1. user repository - pure orm interface
@Repository
public interface userrepo extends JpaRepository<user, Long> {

    // 2. find user by username
    Optional<user> findByUsername(String username);

    // 3. find user by email
    Optional<user> findByEmail(String email);

    // 4. check if username exists
    boolean existsByUsername(String username);

    // 5. check if email exists
    boolean existsByEmail(String email);
}

