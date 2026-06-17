package com.lensdock.feature.photo;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    /** GET /api/photos — Public: view published photos in shop */
    @GetMapping("/photos")
    public ResponseEntity<List<Photo>> getPublished() {
        return ResponseEntity.ok(photoService.getPublishedPhotos());
    }

    /** GET /api/photos/{id} — Public: view single photo details */
    @GetMapping("/photos/{id}")
    public ResponseEntity<Photo> getById(@PathVariable Long id) {
        return ResponseEntity.ok(photoService.getById(id));
    }

    /** POST /api/admin/photos — Admin: upload a new photo frame */
    @PostMapping("/admin/photos")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Photo> create(@RequestBody Photo photo) {
        return ResponseEntity.ok(photoService.save(photo));
    }

    /** DELETE /api/admin/photos/{id} — Admin: remove a photo from catalog */
    @DeleteMapping("/admin/photos/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        photoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
