# 📷 LensDock — Camera Rental & Photo Licensing Platform

A full-stack web application for camera rental and fine-art photo licensing, built for photographers in Kolhapur, Maharashtra.

---

## 🌐 Live Features

- **Camera Rental Booking** — Submit rental requests with ID verification (Aadhaar upload), date selection, and UPI payment instructions
- **Photo Licensing Shop** — Browse and license original photographs
- **Admin Dashboard** — Full booking management with approval, rejection, and return tracking
- **Email Notifications** — Automatic Gmail SMTP emails sent to customers on booking status changes (Approved / Rejected / Returned)
- **Dynamic Site Settings** — Admin-editable pricing, UPI ID, QR code, contact details
- **JWT Authentication** — Secure token-based admin login

---

## 🗂️ Project Structure

```
LensDock/
├── frontend/          # Vite + React frontend
│   ├── src/
│   │   ├── assets/    # Gallery & hero images
│   │   ├── components/# Reusable UI components (Navbar, Footer, Loaders)
│   │   ├── lib/       # Centralized API client
│   │   └── pages/     # Home, Rent, Shop, About, Admin
│   ├── public/        # logo.svg, QR payment image
│   └── vite.config.js
│
├── backend/           # Spring Boot REST API
│   ├── src/main/java/com/lensdock/
│   │   ├── config/    # JWT, Security, CORS, DB Seeder
│   │   └── feature/   # auth, booking, gear, photo, license, settings, user
│   └── src/main/resources/application.properties
│
└── .gitignore
```

---

## ⚙️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP, Lenis |
| Backend   | Spring Boot 3, Spring Security, Spring Data JPA (Hibernate) |
| Database  | MySQL 8                             |
| Auth      | JWT (HS256)                         |
| Email     | Gmail SMTP via Spring Mail          |

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- Java 17+
- Maven 3.9+
- MySQL 8 running locally

### 1. Backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts on **http://localhost:8080**.  
On first run it will:
- Auto-create the `lensdock` database schema
- Seed the admin user, camera gear, sample photos, and default settings

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on **http://localhost:5173**.

---

## 🔐 Admin Access

Navigate to `http://localhost:5173/admin`

| Field    | Value                      |
|----------|----------------------------|
| Username | `lensdock.team@gmail.com`  |
| Password | `Sudu@1308`                |

> ⚠️ Only this account has admin access. Do not share these credentials.

---

## 📧 Email Notifications

Emails are sent automatically via Gmail SMTP when a booking status is changed to:
- ✅ **APPROVED** — Payment instructions sent to customer
- ❌ **REJECTED** — Rejection notice with WhatsApp contact
- 📦 **RETURNED** — Thank-you message with deposit note

Daily limit: **300 emails/day** (in-memory counter, resets at midnight).

---

## 🗄️ Database Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lensdock
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| [`frontend/src/lib/api.js`](frontend/src/lib/api.js) | Central API client for all backend calls |
| [`frontend/src/pages/Admin.jsx`](frontend/src/pages/Admin.jsx) | Full admin dashboard |
| [`backend/src/main/java/com/lensdock/feature/booking/EmailService.java`](backend/src/main/java/com/lensdock/feature/booking/EmailService.java) | Gmail SMTP email service |
| [`backend/src/main/java/com/lensdock/config/SeedDataConfig.java`](backend/src/main/java/com/lensdock/config/SeedDataConfig.java) | DB initializer and admin seeder |
| [`backend/src/main/resources/application.properties`](backend/src/main/resources/application.properties) | All backend configuration |

---

## 📍 Location

**A/p Nej, Tal. Hatkangle, Dist. Kolhapur – 416110, Maharashtra, India**

📞 WhatsApp: [+91 8308165273](https://wa.me/918308165273)  
📧 Email: [lensdock.team@gmail.com](mailto:lensdock.team@gmail.com)

---

© 2026 LensDock · Crafted in the dark room.
