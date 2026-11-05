package com.epsm.repository;

import com.epsm.model.auditlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// 1. audit log repository - pure orm interface
@Repository
public interface auditlogrepo extends JpaRepository<auditlog, Long> {

    // 2. find audit events by acting username
    List<auditlog> findByUsername(String username);

    // 3. find audit events by action type
    List<auditlog> findByAction(String action);
}
