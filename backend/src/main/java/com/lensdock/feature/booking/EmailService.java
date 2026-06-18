package com.lensdock.feature.booking;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Sends branded HTML emails to customers on booking status changes.
 * Enforces a 300-email-per-day limit (in-memory, resets at JVM restart/midnight).
 */
@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.daily-limit:300}")
    private int dailyLimit;

    @Value("${spring.mail.username}")
    private String fromEmail;

    // In-memory daily counter — resets when the date changes
    private final AtomicInteger emailCount = new AtomicInteger(0);
    private LocalDate countDate = LocalDate.now();

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /** Reset counter if it's a new calendar day */
    private synchronized void checkDayReset() {
        if (!LocalDate.now().equals(countDate)) {
            countDate = LocalDate.now();
            emailCount.set(0);
        }
    }

    /** Returns true if email was sent successfully, false if skipped/failed */
    public boolean sendStatusEmail(Booking booking) {
        // Only send for relevant statuses
        String status = booking.getStatus();
        if (!"APPROVED".equals(status) && !"REJECTED".equals(status) && !"RETURNED".equals(status)) {
            return false;
        }

        // No email address → skip
        if (booking.getEmail() == null || booking.getEmail().isBlank()) {
            System.out.println("⚠️  No email for booking #" + booking.getId() + " — skipping email.");
            return false;
        }

        // Check daily limit
        checkDayReset();
        if (emailCount.get() >= dailyLimit) {
            System.out.println("⚠️  Daily email limit reached (" + dailyLimit + "). Skipping booking #" + booking.getId());
            return false;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("LensDock Camera Rental <" + fromEmail + ">");
            helper.setReplyTo(fromEmail);
            helper.setTo(booking.getEmail());
            helper.setSubject(getSubject(status, booking));
            helper.setText(buildHtml(booking), true);

            // Anti-spam headers
            message.addHeader("X-Mailer", "LensDock-Notification-System");
            message.addHeader("X-Auto-Response-Suppress", "All");
            message.addHeader("X-Priority", "3");

            mailSender.send(message);
            emailCount.incrementAndGet();
            System.out.println("✅ Email sent to " + booking.getEmail() + " [Status: " + status + "] [Today's count: " + emailCount.get() + "/" + dailyLimit + "]");
            return true;

        } catch (Exception e) {
            System.err.println("❌ Failed to send email for booking #" + booking.getId() + ": " + e.getMessage());
            return false;
        }
    }

    private String getSubject(String status, Booking booking) {
        String name = booking.getFullName().split(" ")[0];
        return switch (status) {
            case "APPROVED" -> "✅ Booking Confirmed — LensDock Camera Rental";
            case "REJECTED" -> "❌ Booking Update — LensDock Camera Rental";
            case "RETURNED" -> "📦 Rental Completed — Thank you, " + name + "!";
            default -> "Booking Update — LensDock";
        };
    }

    private String buildHtml(Booking booking) {
        DateTimeFormatter df = DateTimeFormatter.ofPattern("dd MMM yyyy");
        String startFmt = booking.getStartDate() != null ? booking.getStartDate().format(df) : "—";
        String endFmt   = booking.getEndDate()   != null ? booking.getEndDate().format(df)   : "—";
        String status   = booking.getStatus();
        String name     = booking.getFullName();
        String firstName = name.split(" ")[0];

        String accentColor   = "APPROVED".equals(status) ? "#4ade80" : "REJECTED".equals(status) ? "#f87171" : "#60a5fa";
        String statusLabel   = "APPROVED".equals(status) ? "✅ Confirmed" : "REJECTED".equals(status) ? "❌ Not Confirmed" : "📦 Completed";
        String headerMsg     = switch (status) {
            case "APPROVED" -> "Great news! Your booking has been <strong>confirmed</strong>.";
            case "REJECTED" -> "We're sorry — your booking could not be confirmed at this time.";
            case "RETURNED" -> "Thank you for returning the camera. We hope you had a great shoot!";
            default -> "Your booking status has been updated.";
        };
        String bodyMsg = switch (status) {
            case "APPROVED" -> """
                    Please complete your payment of <strong style="color:#4ade80;">₹%s</strong> via UPI to confirm your slot.<br><br>
                    <strong>UPI ID:</strong> sudarshanhingalje1@okaxis<br>
                    <strong>Pick-up Address:</strong> A/p Nej, Tal. Hatkangle, Dist. Kolhapur – 416110<br><br>
                    Please carry a valid photo ID at the time of pick-up. Contact us on WhatsApp if you need help.
                    """.formatted(String.format("%.0f", booking.getTotalAmount()));
            case "REJECTED" -> """
                    Unfortunately your rental request could not be processed for the selected dates.<br><br>
                    If you believe this is a mistake, or would like to book for different dates, please contact us on WhatsApp.<br><br>
                    We apologise for any inconvenience.
                    """;
            case "RETURNED" -> """
                    We have recorded the return of the camera. Your refundable deposit will be processed shortly.<br><br>
                    We hope you got some amazing shots! Feel free to book again anytime.
                    """;
            default -> "";
        };

        return """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LensDock Booking Update</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%%;background:#111118;border-radius:16px;border:1px solid #1e1e2e;overflow:hidden;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1a1a2e,#16213e);padding:32px 40px;text-align:center;border-bottom:1px solid #1e1e2e;">
          <div style="display:inline-flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;background:%s;border-radius:50%%;display:inline-block;line-height:36px;text-align:center;font-size:18px;">📷</div>
            <span style="font-size:22px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">LensDock</span>
          </div>
          <p style="color:#8892b0;font-size:12px;margin:8px 0 0;letter-spacing:2px;text-transform:uppercase;">Camera Rental · Kolhapur</p>
        </td></tr>

        <!-- Status Banner -->
        <tr><td style="background:%s20;padding:20px 40px;text-align:center;border-bottom:1px solid %s30;">
          <span style="font-size:28px;">%s</span>
          <p style="color:%s;font-size:18px;font-weight:700;margin:8px 0 4px;">%s</p>
          <p style="color:#cdd6f4;font-size:14px;margin:0;">%s</p>
        </td></tr>

        <!-- Customer Greeting -->
        <tr><td style="padding:32px 40px 0;">
          <p style="color:#cdd6f4;font-size:16px;margin:0 0 8px;">Hi <strong style="color:#ffffff;">%s</strong>,</p>
          <p style="color:#8892b0;font-size:14px;line-height:1.7;margin:0;">%s</p>
        </td></tr>

        <!-- Booking Details Card -->
        <tr><td style="padding:24px 40px;">
          <table width="100%%" cellpadding="0" cellspacing="0" style="background:#1a1a2e;border-radius:12px;border:1px solid #1e1e2e;overflow:hidden;">
            <tr><td colspan="2" style="padding:16px 20px 12px;border-bottom:1px solid #1e1e2e;">
              <p style="color:#8892b0;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0;">📋 Booking Details</p>
            </td></tr>
            <tr>
              <td style="padding:12px 20px;color:#8892b0;font-size:13px;width:40%%;border-bottom:1px solid #1e1e2e0a;">Booking ID</td>
              <td style="padding:12px 20px;color:#cdd6f4;font-size:13px;font-weight:600;border-bottom:1px solid #1e1e2e0a;">#%s</td>
            </tr>
            <tr>
              <td style="padding:12px 20px;color:#8892b0;font-size:13px;border-bottom:1px solid #1e1e2e0a;">Customer</td>
              <td style="padding:12px 20px;color:#cdd6f4;font-size:13px;font-weight:600;border-bottom:1px solid #1e1e2e0a;">%s</td>
            </tr>
            <tr>
              <td style="padding:12px 20px;color:#8892b0;font-size:13px;border-bottom:1px solid #1e1e2e0a;">Rental Dates</td>
              <td style="padding:12px 20px;color:#cdd6f4;font-size:13px;font-weight:600;border-bottom:1px solid #1e1e2e0a;">%s → %s (%d day%s)</td>
            </tr>
            <tr>
              <td style="padding:12px 20px;color:#8892b0;font-size:13px;border-bottom:1px solid #1e1e2e0a;">Camera</td>
              <td style="padding:12px 20px;color:#cdd6f4;font-size:13px;font-weight:600;border-bottom:1px solid #1e1e2e0a;">Canon EOS 80D + 18-55mm Kit</td>
            </tr>
            <tr>
              <td style="padding:12px 20px;color:#8892b0;font-size:13px;">Amount</td>
              <td style="padding:12px 20px;font-size:16px;font-weight:700;color:%s;">₹%s</td>
            </tr>
          </table>
        </td></tr>

        <!-- Body Message -->
        <tr><td style="padding:0 40px 24px;">
          <p style="color:#8892b0;font-size:14px;line-height:1.8;margin:0;">%s</p>
        </td></tr>

        <!-- Contact CTA -->
        <tr><td style="padding:0 40px 32px;">
          <table cellpadding="0" cellspacing="0" style="background:#1a1a2e;border-radius:10px;border:1px solid #1e1e2e;width:100%%;">
            <tr><td style="padding:16px 20px;">
              <p style="color:#8892b0;font-size:12px;margin:0 0 4px;letter-spacing:1px;text-transform:uppercase;">Need Help?</p>
              <p style="color:#cdd6f4;font-size:14px;margin:0;">📞 WhatsApp: <a href="https://wa.me/918308165273" style="color:#a78bfa;text-decoration:none;font-weight:600;">+91 8308165273</a></p>
              <p style="color:#cdd6f4;font-size:14px;margin:4px 0 0;">📧 Email: <a href="mailto:lensdock.team@gmail.com" style="color:#a78bfa;text-decoration:none;">lensdock.team@gmail.com</a></p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d0d16;padding:20px 40px;text-align:center;border-top:1px solid #1e1e2e;">
          <p style="color:#4a4a6a;font-size:12px;margin:0;">© 2026 LensDock Camera Rental, Kolhapur, Maharashtra</p>
          <p style="color:#4a4a6a;font-size:11px;margin:6px 0 0;">A/p Nej, Tal. Hatkangle, Dist. Kolhapur – 416110</p>
          <p style="color:#4a4a6a;font-size:11px;margin:4px 0 0;">This is an automated transactional email. Please do not reply directly.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
""".formatted(
    accentColor,                          // logo bg
    accentColor, accentColor,             // status banner bg + border
    getStatusEmoji(status),               // big emoji
    accentColor, statusLabel,             // status color + label
    headerMsg,                            // header message
    firstName,                            // greeting name
    bodyMsg,                              // body paragraph
    booking.getId(),                      // booking ID
    name,                                 // customer name
    startFmt, endFmt,                     // dates
    booking.getDays(),                    // days count
    booking.getDays() != 1 ? "s" : "",   // plural
    accentColor,                          // amount color
    String.format("%.0f", booking.getTotalAmount()), // amount
    bodyMsg                               // repeated for flow (same body)
        );
    }

    private String getStatusEmoji(String status) {
        return switch (status) {
            case "APPROVED" -> "🎉";
            case "REJECTED" -> "😔";
            case "RETURNED" -> "📦";
            default -> "📋";
        };
    }
}
