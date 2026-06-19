package com.lensdock.config;

import com.lensdock.feature.user.User;
import com.lensdock.feature.user.UserRepository;
import com.lensdock.feature.gear.GearItem;
import com.lensdock.feature.gear.GearRepository;
import com.lensdock.feature.photo.Photo;
import com.lensdock.feature.photo.PhotoRepository;
import com.lensdock.feature.settings.Settings;
import com.lensdock.feature.settings.SettingsRepository;
import com.lensdock.feature.camerastep.CameraStep;
import com.lensdock.feature.camerastep.CameraStepRepository;
import com.lensdock.feature.pose.Pose;
import com.lensdock.feature.pose.PoseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class SeedDataConfig implements CommandLineRunner {

    private final UserRepository userRepository;
    private final GearRepository gearRepository;
    private final PhotoRepository photoRepository;
    private final SettingsRepository settingsRepository;
    private final CameraStepRepository cameraStepRepository;
    private final PoseRepository poseRepository;
    private final PasswordEncoder passwordEncoder;

    public SeedDataConfig(UserRepository userRepository,
                          GearRepository gearRepository,
                          PhotoRepository photoRepository,
                          SettingsRepository settingsRepository,
                          CameraStepRepository cameraStepRepository,
                          PoseRepository poseRepository,
                          PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.gearRepository = gearRepository;
        this.photoRepository = photoRepository;
        this.settingsRepository = settingsRepository;
        this.cameraStepRepository = cameraStepRepository;
        this.poseRepository = poseRepository;
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

        // 5. Seed Camera Steps
        if (cameraStepRepository.count() == 0) {
            String[] subs = {
                "Step 1 · Camera Mode",
                "Step 2 · Aperture Settings",
                "Step 3 · Focus Mode",
                "Step 4 · Focus Point",
                "Step 5 · ISO Configuration",
                "Step 6 · White Balance"
            };
            String[] titles = {
                "Start in Aperture Priority (Av)",
                "Set a Wide Aperture (f/1.8 - f/2.8)",
                "Switch to One-Shot AF",
                "Choose Single-Point AF",
                "Keep ISO Low (ISO 100 - 400)",
                "Select White Balance Preset"
            };
            String[] bodies = {
                "Turn the mode dial to Av. Camera will handle shutter speed automatically. For portraits and single-person photos, this is the easiest way to get blurred background.",
                "Rotate the main dial to set the lowest possible f-number. A lower f-number means a wider aperture, which lets in more light and creates a shallow depth of field.",
                "Press the AF selection button and set it to One-Shot AF. This is ideal for stationary subjects since it locks the focus when you press the shutter button halfway down.",
                "Manually select a single active focus point. Use the multicontroller to place this point directly over the eye of your subject for razor-sharp portraits.",
                "Keep your ISO low in daylight or bright conditions to ensure the cleanest possible image. Raise it only when you need to maintain a fast shutter speed in low light.",
                "Instead of Auto White Balance (AWB), set it manually (e.g. Daylight, Shade, Cloudy) to match your environment. This keeps skin tones and colors consistent."
            };
            String[] images = {
                "/image-1.png",
                "/image-2.png",
                "/image-3.png",
                "/image-4.png",
                "/image-5.png",
                "/image-6.png"
            };

            for (int i = 0; i < 6; i++) {
                CameraStep step = new CameraStep();
                step.setStepNumber(i + 1);
                step.setStepSub(subs[i]);
                step.setStepTitle(titles[i]);
                step.setStepBody(bodies[i]);
                step.setImagePath(images[i]);
                cameraStepRepository.save(step);
            }
            System.out.println("✅ Default camera steps seeded.");
        }

        // 6. Seed Poses
        if (poseRepository.count() == 0) {
            String[] genders = {"male", "female"};
            String[] poseTypes = {"normal", "event", "group"};

            for (String gender : genders) {
                for (String type : poseTypes) {
                    for (int i = 1; i <= 30; i++) {
                        Pose pose = new Pose();
                        pose.setGender(gender);
                        pose.setPoseType(type);
                        String capGender = gender.substring(0, 1).toUpperCase() + gender.substring(1);
                        String capType = type.substring(0, 1).toUpperCase() + type.substring(1);
                        pose.setPoseTitle(capGender + " " + capType + " Pose " + i);
                        pose.setPoseDescription("Placeholder: Body 45° turned, one leg forward. Suitable for " + type + " shoot.");
                        pose.setPoseSub(capType + " · Portrait");
                        poseRepository.save(pose);
                    }
                }
            }
            System.out.println("✅ Default 180 poses seeded.");
        }
    }
}
