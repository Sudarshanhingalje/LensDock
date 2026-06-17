package com.lensdock.feature.photo;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class PhotoService {

    private final PhotoRepository photoRepository;

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public List<Photo> getAllPhotos() {
        return photoRepository.findAll();
    }

    public List<Photo> getPublishedPhotos() {
        return photoRepository.findByPublishedTrueOrderByCreatedAtDesc();
    }

    public Photo getById(Long id) {
        return photoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Photo not found with id: " + id));
    }

    @Transactional
    public Photo save(Photo photo) {
        return photoRepository.save(photo);
    }

    @Transactional
    public void delete(Long id) {
        photoRepository.deleteById(id);
    }
}
