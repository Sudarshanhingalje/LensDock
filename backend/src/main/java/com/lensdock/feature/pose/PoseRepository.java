package com.lensdock.feature.pose;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoseRepository extends JpaRepository<Pose, Long> {
    List<Pose> findByGenderAndPoseType(String gender, String poseType);
}
