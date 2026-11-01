package com.epsm.repository;

import com.epsm.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// 1. project repository - pure orm interface
@Repository
public interface Projectrepo extends JpaRepository<Project, Long> {

    // 2. find project by unique code (e.g. PRJ-101)
    Optional<Project> findByCode(String code);
}
