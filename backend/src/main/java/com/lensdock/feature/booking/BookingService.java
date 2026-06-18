package com.lensdock.feature.booking;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final EmailService emailService;

    public BookingService(BookingRepository bookingRepository, EmailService emailService) {
        this.bookingRepository = bookingRepository;
        this.emailService      = emailService;
    }

    private void validateAadhaarImage(String base64Image) {
        if (base64Image == null || base64Image.isBlank()) {
            throw new IllegalArgumentException("Aadhaar / ID Card image is required.");
        }

        // 1. Check format (prefix)
        boolean validFormat = base64Image.startsWith("data:image/jpeg;base64,") ||
                              base64Image.startsWith("data:image/jpg;base64,") ||
                              base64Image.startsWith("data:image/png;base64,");

        if (!validFormat) {
            throw new IllegalArgumentException("Invalid file format. Only JPG, JPEG, and PNG are allowed.");
        }

        // 2. Check size (1 MB limit)
        // Base64 size formula: length of string after comma * 0.75
        int commaIndex = base64Image.indexOf(",");
        if (commaIndex != -1) {
            String base64Data = base64Image.substring(commaIndex + 1);
            int sizeInBytes = (int) (base64Data.length() * 0.75);
            if (sizeInBytes > 1024 * 1024) { // 1 MB = 1048576 bytes
                throw new IllegalArgumentException("File size exceeds 1 MB limit.");
            }
        }
    }

    /** Public: Submit a new booking request */
    @Transactional
    public Booking createBooking(Booking booking) {
        validateAadhaarImage(booking.getAadhaarImage());
        return bookingRepository.save(booking);
    }

    /** Admin: Get all bookings newest first */
    public List<Booking> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc();
    }

    /** Admin: Get bookings by status */
    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status.toUpperCase());
    }

    /** Admin: Update booking status and send notification email */
    @Transactional
    public Booking updateStatus(Long id, String newStatus) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));

        booking.setStatus(newStatus.toUpperCase());

        // Securely wipe Aadhaar / ID proof immediately upon rental completion or rejection
        if ("RETURNED".equalsIgnoreCase(newStatus) || "REJECTED".equalsIgnoreCase(newStatus)) {
            booking.setAadhaarImage("[SECURELY_DELETED]");
        }

        // Send status email and track result
        boolean sent = emailService.sendStatusEmail(booking);
        if (sent) {
            booking.setEmailSent(true);
            booking.setEmailSentAt(LocalDateTime.now());
        }

        return bookingRepository.save(booking);
    }

    /** Admin: Dashboard stats */
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalBookings",    bookingRepository.count());
        stats.put("pendingBookings",  bookingRepository.countPending());
        stats.put("approvedBookings", bookingRepository.countApproved());
        Double revenue = bookingRepository.totalRevenue();
        stats.put("totalRevenue", revenue != null ? revenue : 0.0);
        return stats;
    }

    /** Admin: Delete a booking */
    @Transactional
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
