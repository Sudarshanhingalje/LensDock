# 📷 LensDock — Camera Rental & Photo Licensing Platform

A full-stack production web application for camera rental and fine-art photo licensing, built for photographers in Kolhapur, Maharashtra.

---

## 🌐 Live URLs

| Service   | URL |
|-----------|-----|
| 🌍 Frontend (Vercel) | [https://lens-dock.vercel.app](https://lens-dock.vercel.app) |
| ⚙️ Backend (AWS Lightsail) | `http://13.235.138.219:8080/api` |
| 🔐 Admin Panel | [https://lens-dock.vercel.app/admin](https://lens-dock.vercel.app/admin) |

---

## ✅ Live Features

- **Camera Rental Booking** — Submit rental requests with Aadhaar upload, date selection, and UPI payment instructions
- **Photo Licensing Shop** — Browse and license original photographs
- **Admin Dashboard** — Full booking management: approve, reject, and return tracking
- **Email Notifications** — Automatic Gmail SMTP emails on booking status changes (Approved / Rejected / Returned)
- **Dynamic Site Settings** — Admin-editable pricing, UPI ID, QR code, contact details
- **JWT Authentication** — Secure token-based admin login

---

## 🗂️ Project Structure

```
LensDock/
├── frontend/              # Vite + React frontend (deployed on Vercel)
│   ├── src/
│   │   ├── assets/        # Gallery & hero images
│   │   ├── components/    # Reusable UI components (Navbar, Footer, Loaders)
│   │   ├── lib/           # Centralized API client (api.js)
│   │   └── pages/         # Home, Rent, Shop, About, Admin
│   ├── public/            # logo.svg, QR payment image
│   ├── vercel.json        # Vercel rewrite rules (proxy /backend → AWS backend)
│   └── vite.config.js     # Dev proxy + build config
│
├── backend/               # Spring Boot REST API (deployed on AWS Lightsail)
│   ├── src/main/java/com/lensdock/
│   │   ├── config/        # JWT, Security, CORS, DB Seeder
│   │   └── feature/       # auth, booking, gear, photo, license, settings, user
│   └── src/main/resources/application.properties
│
└── .gitignore
```

---

## ⚙️ Tech Stack

| Layer     | Technology                                                  |
|-----------|-------------------------------------------------------------|
| Frontend  | React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP, Lenis |
| Backend   | Spring Boot 3, Spring Security, Spring Data JPA (Hibernate) |
| Database  | MySQL 8                                                     |
| Auth      | JWT (HS256)                                                 |
| Email     | Gmail SMTP via Spring Mail                                  |
| Hosting   | Vercel (frontend) + AWS Lightsail (backend + MySQL)         |

---

## 🏗️ Production Architecture

```
Browser
  │
  ▼
Vercel (https://lens-dock.vercel.app)
  │  React SPA + vercel.json rewrites:
  │  /backend/:path* → http://13.235.138.219:8080/api/:path*
  │
  ▼
AWS Lightsail (http://13.235.138.219:8080)
  │  Spring Boot REST API
  │  java -jar lensdock-backend-1.0.0.jar
  │
  ▼
MySQL 8 (on same Lightsail instance)
```

> **Why `/backend` prefix?** Vercel reserves `/api/*` for its own serverless functions.
> Using `/backend` as the proxy prefix avoids a 405 Method Not Allowed conflict.

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
The Vite dev proxy forwards `/backend/*` → `http://localhost:8080/api/*` automatically.

---

## 🔐 Admin Access

| Environment | URL |
|-------------|-----|
| Local | `http://localhost:5173/admin` |
| Production | `https://lens-dock.vercel.app/admin` |

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

## 🌐 CORS Configuration

CORS is configured in `backend/src/main/java/com/lensdock/config/WebMvcConfig.java`.

Allowed origins:
- `https://lens-dock.vercel.app` (production)
- `https://*.vercel.app` (Vercel preview deployments)

JWT is passed in the `Authorization: Bearer <token>` header (not cookies), so `allowCredentials` is `false`.

---

## 🚢 Deploying to Production

### Backend (AWS Lightsail)

```bash
# 1. Build the JAR locally
cd backend
mvn clean package -DskipTests

# 2. Upload to server (using pscp / scp)
pscp -i lensdock.ppk target/lensdock-backend-1.0.0.jar ubuntu@13.235.138.219:/home/ubuntu/

# 3. SSH into server and restart the app
ssh -i lensdock.ppk ubuntu@13.235.138.219
pkill -f lensdock-backend
nohup java -Xmx400m -jar /home/ubuntu/lensdock-backend-1.0.0.jar > /dev/null 2>&1 &
```

> **`-Xmx400m`** limits Java heap to 400 MB, preventing the server from freezing on a 1 GB RAM Lightsail instance.

### Frontend (Vercel)

Push to the `main` branch on GitHub — Vercel auto-deploys.

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| [`frontend/src/lib/api.js`](frontend/src/lib/api.js) | Central API client for all backend calls |
| [`frontend/vercel.json`](frontend/vercel.json) | Vercel rewrite rules (proxy to backend) |
| [`frontend/vite.config.js`](frontend/vite.config.js) | Dev proxy config |
| [`frontend/src/pages/Admin.jsx`](frontend/src/pages/Admin.jsx) | Full admin dashboard |
| [`backend/src/main/java/com/lensdock/config/WebMvcConfig.java`](backend/src/main/java/com/lensdock/config/WebMvcConfig.java) | CORS configuration |
| [`backend/src/main/java/com/lensdock/config/SecurityConfig.java`](backend/src/main/java/com/lensdock/config/SecurityConfig.java) | Spring Security + JWT setup |
| [`backend/src/main/java/com/lensdock/config/SeedDataConfig.java`](backend/src/main/java/com/lensdock/config/SeedDataConfig.java) | DB initializer and admin seeder |
| [`backend/src/main/resources/application.properties`](backend/src/main/resources/application.properties) | All backend configuration |

---

## 📍 Contact

**A/p Nej, Tal. Hatkangle, Dist. Kolhapur – 416110, Maharashtra, India**

📞 WhatsApp: [+91 8308165273](https://wa.me/918308165273)  
📧 Email: [lensdock.team@gmail.com](mailto:lensdock.team@gmail.com)

---

© 2026 LensDock · Crafted in the dark room.
