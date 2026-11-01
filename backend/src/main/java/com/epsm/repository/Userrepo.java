package com.epsm.repository;

import com.epsm.model.Role;
import com.epsm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// user db operations via Spring Data JPA ORM
@Repository
public interface Userrepo extends JpaRepository<User, Long> {

    // 1. find user by name or email
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    // 2. check duplicate
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);

    // 3. get all by role
    List<User> findByRole(Role role);
}
