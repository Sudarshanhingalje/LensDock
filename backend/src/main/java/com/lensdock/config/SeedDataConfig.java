package com.lensdock.config;

import com.lensdock.feature.user.User;
import com.lensdock.feature.user.UserRepository;
import com.lensdock.feature.gear.GearItem;
import com.lensdock.feature.gear.GearRepository;
import com.lensdock.feature.photo.Photo;
import com.lensdock.feature.photo.PhotoRepository;
import com.lensdock.feature.settings.Settings;
import com.lensdock.feature.settings.SettingsRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GearRepository gearRepository;
    private final PhotoRepository photoRepository;
    private final SettingsRepository settingsRepository;
    private final PasswordEncoder passwordEncoder;

    public SeedDataConfig(UserRepository userRepository,
                          GearRepository gearRepository,
                          PhotoRepository photoRepository,
                          SettingsRepository settingsRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.gearRepository = gearRepository;
        this.photoRepository = photoRepository;
        this.settingsRepository = settingsRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Admin User
        String oldAdmin = "sudarshanhingalje1@gmail.com";
        userRepository.findByUsername(oldAdmin).ifPresent(user -> {
            userRepository.delete(user);
            System.out.println("🗑️ Removed old admin user: " + oldAdmin);
        });

        String defaultAdmin = "lensdock.team@gmail.com";
        User admin = userRepository.findByUsername(defaultAdmin).orElse(new User());
        admin.setUsername(defaultAdmin);
        admin.setPassword(passwordEncoder.encode("Sudu@1308"));
        admin.setRole("ROLE_ADMIN");
        userRepository.save(admin);
        System.out.println("✅ Default admin user synced: " + defaultAdmin);

        // 2. Seed / Force-update Settings (always sync latest values)
        Settings settings = settingsRepository.findAll().stream()
            .findFirst().orElse(new Settings());
        settings.setPricePerDay(600.0);
        settings.setDepositAmount(1000.0);
        settings.setUpiId("sudarshanhingalje1@okaxis");
        settings.setContactPhone("+91 8308165273");
        settings.setContactEmail("lensdock.team@gmail.com");
        settings.setAddress("A/p nej tal hatkanagle dist kolhapur 416110");
        settings.setQrCodeImage("/QRpayment.jpeg");
        settingsRepository.save(settings);
        System.out.println("✅ Settings synced: phone=" + settings.getContactPhone()
            + ", address=" + settings.getAddress()
            + ", qr=" + settings.getQrCodeImage());

        // 3. Seed Gear Catalog
        if (gearRepository.count() == 0) {
            GearItem gear = new GearItem();
            gear.setName("Canon EOS 80D");
            gear.setDescription("Professional DSLR featuring a 24.2MP CMOS sensor, 45-point AF, 2x batteries, charger, carry case, and 18-55mm lens.");
            gear.setPricePerDay(600.0);
            gear.setCategory("DSLR");
            gear.setImageUrl("/src/assets/hero-camera.jpg");
            gear.setAvailable(true);
            gearRepository.save(gear);
            System.out.println("✅ Default gear item seeded: Canon EOS 80D");
        }

        // 4. Seed Photo Gallery
        if (photoRepository.count() == 0) {
            String[] titles = { "Ridge / Golden hour", "Neon district", "Lumen study", "Concrete light", "Canopy fog" };
            String[] categories = { "Landscape", "Street", "Portrait", "Architecture", "Aerial" };
            String[] urls = {
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
                "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
            };
            double[] blogPrices = { 499.0, 399.0, 599.0, 499.0, 699.0 };
            double[] socialPrices = { 999.0, 799.0, 1199.0, 999.0, 1399.0 };
            double[] commercialPrices = { 2499.0, 1999.0, 2999.0, 2499.0, 3499.0 };

            for (int i = 0; i < titles.length; i++) {
                Photo p = new Photo();
                p.setTitle(titles[i]);
                p.setCategory(categories[i]);
                p.setPreviewUrl(urls[i]);
                p.setBlogPrice(blogPrices[i]);
                p.setSocialPrice(socialPrices[i]);
                p.setCommercialPrice(commercialPrices[i]);
                p.setPublished(true);
                photoRepository.save(p);
            }
            System.out.println("✅ Default photos catalog seeded.");
        }
    }
}
