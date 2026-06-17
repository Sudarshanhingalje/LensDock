package com.lensdock.feature.gear;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GearRepository extends JpaRepository<GearItem, Long> {
    List<GearItem> findByAvailableTrue();
    List<GearItem> findByCategory(String category);
}
