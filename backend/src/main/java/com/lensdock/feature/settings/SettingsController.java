package com.lensdock.feature.settings;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/settings")
public class SettingsController {

    private final SettingsService settingsService;

    public SettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    /**
     * GET /api/settings/public
     * Public: returns pricing and QR code for the rent form.
     */
    @GetMapping("/public")
    public ResponseEntity<Settings> getPublic() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    /**
     * GET /api/settings/admin
     * Admin: full settings including private fields.
     * (Access controlled by SecurityConfig: requires ROLE_ADMIN)
     */
    @GetMapping("/admin")
    public ResponseEntity<Settings> getAdmin() {
        return ResponseEntity.ok(settingsService.getSettings());
    }

    /**
     * PUT /api/settings/admin
     * Admin: update all settings including QR code (base64).
     * (Access controlled by SecurityConfig: requires ROLE_ADMIN)
     */
    @PutMapping("/admin")
    public ResponseEntity<Settings> update(@RequestBody Settings settings) {
        return ResponseEntity.ok(settingsService.updateSettings(settings));
    }
}
