package com.lensdock.feature.license;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LicenseController {

    private final LicenseService licenseService;

    public LicenseController(LicenseService licenseService) {
        this.licenseService = licenseService;
    }

    /** POST /api/licenses — Public: purchase a photo license */
    @PostMapping("/licenses")
    public ResponseEntity<License> createLicense(@RequestBody License license) {
        return ResponseEntity.ok(licenseService.createLicense(license));
    }

    /** GET /api/admin/licenses — Admin: list all purchased licenses */
    @GetMapping("/admin/licenses")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<License>> getAllLicenses() {
        return ResponseEntity.ok(licenseService.getAllLicenses());
    }
}
