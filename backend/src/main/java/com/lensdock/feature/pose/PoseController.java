package com.lensdock.feature.pose;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/poses")
public class PoseController {

    private final PoseRepository poseRepository;

    public PoseController(PoseRepository poseRepository) {
        this.poseRepository = poseRepository;
    }

    @GetMapping
    public ResponseEntity<List<Pose>> getPosesByGenderAndType(
            @RequestParam String gender,
            @RequestParam String poseType
    ) {
        List<Pose> poses = poseRepository.findByGenderAndPoseType(gender, poseType);
        return ResponseEntity.ok(poses);
    }
}
