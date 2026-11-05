package com.epsm.repository;

import com.epsm.model.milestone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// 1. data access repo for milestones
@Repository
public interface milestonerepo extends JpaRepository<milestone, Long> {

    // 2. find milestones by parent project code
    List<milestone> findByProjectCode(String projectCode);

    // 3. find milestones by status
    List<milestone> findByStatus(String status);
}
