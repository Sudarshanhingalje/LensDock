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

    /** Public: Submit a new booking request */
    @Transactional
    public Booking createBooking(Booking booking) {
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
