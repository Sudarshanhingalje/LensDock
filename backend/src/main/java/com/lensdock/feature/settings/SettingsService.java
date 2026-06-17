package com.lensdock.feature.settings;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SettingsService {

    private final SettingsRepository settingsRepository;

    public SettingsService(SettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public Settings getSettings() {
        return settingsRepository.findById(1L).orElseGet(() -> {
            Settings defaults = new Settings();
            return settingsRepository.save(defaults);
        });
    }

    @Transactional
    public Settings updateSettings(Settings updated) {
        Settings existing = getSettings();
        existing.setPricePerDay(updated.getPricePerDay());
        existing.setDepositAmount(updated.getDepositAmount());
        existing.setQrCodeImage(updated.getQrCodeImage());
        existing.setUpiId(updated.getUpiId());
        existing.setContactPhone(updated.getContactPhone());
        existing.setContactEmail(updated.getContactEmail());
        existing.setAddress(updated.getAddress());
        return settingsRepository.save(existing);
    }
}
