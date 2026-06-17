package com.lensdock.feature.gear;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class GearService {

    private final GearRepository gearRepository;

    public GearService(GearRepository gearRepository) {
        this.gearRepository = gearRepository;
    }

    public List<GearItem> getAllGear() {
        return gearRepository.findAll();
    }

    public List<GearItem> getAvailableGear() {
        return gearRepository.findByAvailableTrue();
    }

    public GearItem getById(Long id) {
        return gearRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gear item not found: " + id));
    }

    @Transactional
    public GearItem save(GearItem item) {
        return gearRepository.save(item);
    }

    @Transactional
    public GearItem update(Long id, GearItem updated) {
        GearItem existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPricePerDay(updated.getPricePerDay());
        existing.setCategory(updated.getCategory());
        existing.setImageUrl(updated.getImageUrl());
        existing.setAvailable(updated.isAvailable());
        return gearRepository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        gearRepository.deleteById(id);
    }
}
