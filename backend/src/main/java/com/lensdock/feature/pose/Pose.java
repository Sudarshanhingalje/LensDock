package com.lensdock.feature.pose;

import jakarta.persistence.*;

@Entity
@Table(name = "poses")
public class Pose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gender", nullable = false, length = 20)
    private String gender; // 'male' or 'female'

    @Column(name = "pose_type", nullable = false, length = 20)
    private String poseType; // 'normal', 'event', 'group'

    @Column(name = "pose_title", nullable = false, length = 255)
    private String poseTitle;

    @Column(name = "pose_description", nullable = false, columnDefinition = "TEXT")
    private String poseDescription;

    @Column(name = "pose_sub", nullable = false, length = 255)
    private String poseSub;

    // Default Constructor
    public Pose() {}

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPoseType() {
        return poseType;
    }

    public void setPoseType(String poseType) {
        this.poseType = poseType;
    }

    public String getPoseTitle() {
        return poseTitle;
    }

    public void setPoseTitle(String poseTitle) {
        this.poseTitle = poseTitle;
    }

    public String getPoseDescription() {
        return poseDescription;
    }

    public void setPoseDescription(String poseDescription) {
        this.poseDescription = poseDescription;
    }

    public String getPoseSub() {
        return poseSub;
    }

    public void setPoseSub(String poseSub) {
        this.poseSub = poseSub;
    }
}
