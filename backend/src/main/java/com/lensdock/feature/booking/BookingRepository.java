package com.lensdock.feature.booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByOrderByCreatedAtDesc();

    List<Booking> findByStatus(String status);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'PENDING'")
    long countPending();

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'APPROVED'")
    long countApproved();

    @Query("SELECT SUM(b.totalAmount) FROM Booking b WHERE b.status = 'APPROVED'")
    Double totalRevenue();
}
