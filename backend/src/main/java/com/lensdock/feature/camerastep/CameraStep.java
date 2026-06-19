package com.lensdock.feature.camerastep;

import jakarta.persistence.*;

@Entity
@Table(name = "camera_steps")
public class CameraStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "step_number", nullable = false)
    private int stepNumber;

    @Column(name = "step_sub", nullable = false, length = 255)
    private String stepSub;

    @Column(name = "step_title", nullable = false, length = 255)
    private String stepTitle;

    @Column(name = "step_body", nullable = false, columnDefinition = "TEXT")
    private String stepBody;

    @Column(name = "image_path", nullable = false, length = 255)
    private String imagePath;

    // Default Constructor
    public CameraStep() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(int stepNumber) {
        this.stepNumber = stepNumber;
    }

    public String getStepSub() {
        return stepSub;
    }

    public void setStepSub(String stepSub) {
        this.stepSub = stepSub;
    }

    public String getStepTitle() {
        return stepTitle;
    }

    public void setStepTitle(String stepTitle) {
        this.stepTitle = stepTitle;
    }

    public String getStepBody() {
        return stepBody;
    }

    public void setStepBody(String stepBody) {
        this.stepBody = stepBody;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
}
