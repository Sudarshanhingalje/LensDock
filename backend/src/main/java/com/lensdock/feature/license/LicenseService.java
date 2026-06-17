package com.lensdock.feature.license;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class LicenseService {

    private final LicenseRepository licenseRepository;

    public LicenseService(LicenseRepository licenseRepository) {
        this.licenseRepository = licenseRepository;
    }

    public List<License> getAllLicenses() {
        return licenseRepository.findAll();
    }

    @Transactional
    public License createLicense(License license) {
        return licenseRepository.save(license);
    }
}
