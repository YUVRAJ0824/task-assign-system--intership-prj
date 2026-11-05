package com.epsm.repository;

import com.epsm.model.ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// 1. ticket repository - pure orm interface
@Repository
public interface ticketrepo extends JpaRepository<ticket, Long> {

    // 2. find by unique ticket code (e.g. TKT-101)
    Optional<ticket> findByCode(String code);

    // 3. find tickets by status
    List<ticket> findByStatus(String status);

    // 4. find tickets by severity
    List<ticket> findBySeverity(String severity);
}
