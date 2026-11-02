package com.epsm.repository;

import com.epsm.model.project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 1. project repository - pure orm interface
@Repository
public interface projectrepo extends JpaRepository<project, Long> {

    // 2. find project by unique code
    Optional<project> findByCode(String code);

    // 3. check if project code exists
    boolean existsByCode(String code);
}
