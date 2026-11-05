package com.epsm.repository;

import com.epsm.model.approval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// 1. approval repository - pure orm interface
@Repository
public interface approvalrepo extends JpaRepository<approval, Long> {

    // 2. find by unique code
    Optional<approval> findByCode(String code);

    // 3. find by status (e.g. PENDING)
    List<approval> findByStatus(String status);

    // 4. find by requester
    List<approval> findByRequester(String requester);
}
