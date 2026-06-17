package com.lensdock.feature.gear;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GearController {

    private final GearService gearService;

    public GearController(GearService gearService) {
        this.gearService = gearService;
    }

    /** GET /api/gear — Public: list available gear for customers */
    @GetMapping("/gear")
    public ResponseEntity<List<GearItem>> getAvailable() {
        return ResponseEntity.ok(gearService.getAvailableGear());
    }

    /** GET /api/admin/gear — Admin: list ALL gear including unavailable */
    @GetMapping("/admin/gear")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<GearItem>> getAll() {
        return ResponseEntity.ok(gearService.getAllGear());
    }

    /** POST /api/admin/gear — Admin: add new gear item */
    @PostMapping("/admin/gear")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GearItem> create(@RequestBody GearItem item) {
        return ResponseEntity.ok(gearService.save(item));
    }

    /** PUT /api/admin/gear/{id} — Admin: update gear item */
    @PutMapping("/admin/gear/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GearItem> update(@PathVariable Long id, @RequestBody GearItem item) {
        return ResponseEntity.ok(gearService.update(id, item));
    }

    /** DELETE /api/admin/gear/{id} — Admin: delete gear item */
    @DeleteMapping("/admin/gear/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        gearService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
