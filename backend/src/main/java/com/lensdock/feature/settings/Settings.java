package com.lensdock.feature.settings;

import jakarta.persistence.*;

/**
 * Stores a single row of site-wide settings.
 * Only one row with id=1 is ever used.
 */
@Entity
@Table(name = "settings")
public class Settings {

    @Id
    private Long id = 1L;

    @Column(nullable = false)
    private double pricePerDay = 500.0;

    @Column(nullable = false)
    private double depositAmount = 2000.0;

    @Column(columnDefinition = "TEXT")
    private String qrCodeImage; // Base64-encoded QR code PNG

    @Column(length = 100)
    private String upiId;

    @Column(length = 100)
    private String contactPhone;

    @Column(length = 100)
    private String contactEmail;

    @Column(length = 255)
    private String address;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(double pricePerDay) { this.pricePerDay = pricePerDay; }

    public double getDepositAmount() { return depositAmount; }
    public void setDepositAmount(double depositAmount) { this.depositAmount = depositAmount; }

    public String getQrCodeImage() { return qrCodeImage; }
    public void setQrCodeImage(String qrCodeImage) { this.qrCodeImage = qrCodeImage; }

    public String getUpiId() { return upiId; }
    public void setUpiId(String upiId) { this.upiId = upiId; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getContactEmail() { return contactEmail; }
    public void setContactEmail(String contactEmail) { this.contactEmail = contactEmail; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
