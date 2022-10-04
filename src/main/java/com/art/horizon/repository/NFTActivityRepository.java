package com.art.horizon.repository;

import com.art.horizon.domain.NFTActivities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface NFTActivityRepository extends JpaRepository<NFTActivities, String>, JpaSpecificationExecutor<NFTActivities> {
}
