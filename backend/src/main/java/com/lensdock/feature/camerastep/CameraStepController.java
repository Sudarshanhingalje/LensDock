package com.lensdock.feature.camerastep;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/camerasteps")
public class CameraStepController {

    private final CameraStepRepository cameraStepRepository;

    public CameraStepController(CameraStepRepository cameraStepRepository) {
        this.cameraStepRepository = cameraStepRepository;
    }

    @GetMapping
    public ResponseEntity<List<CameraStep>> getAllCameraSteps() {
        List<CameraStep> steps = cameraStepRepository.findAll();
        return ResponseEntity.ok(steps);
    }
}
