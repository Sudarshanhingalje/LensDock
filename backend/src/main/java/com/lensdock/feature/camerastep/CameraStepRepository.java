package com.lensdock.feature.camerastep;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CameraStepRepository extends JpaRepository<CameraStep, Long> {}
