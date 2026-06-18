# LensDock — Spring Boot Backend Service

Production backend for **LensDock**, a camera rental and photo licensing platform.  
Built with Java Spring Boot, Spring Security (JWT), Spring Data JPA (Hibernate), and MySQL.

**Live at:** `http://13.235.138.219:8080/api`  
**Frontend:** [https://lens-dock.vercel.app](https://lens-dock.vercel.app)

---

## Core Features

1. **JWT Authentication** — Stateless token-based login. Endpoints under `/api/admin/**` are role-restricted to `ROLE_ADMIN`.
2. **Booking Flow** — Public rental submission via `/api/bookings` with Aadhaar upload (Base64), date range, and MySQL persistence.
3. **Email Notifications** — Gmail SMTP sends automated emails on booking approval, rejection, and return.
4. **Photo Licensing Shop** — Photo catalog at `/api/photos`; license purchase requests at `/api/licenses`.
5. **Site Settings** — Dynamic UPI ID, QR code, pricing, and contact info editable from the admin panel.
6. **Auto DB Seeder** — On first run, automatically seeds admin user, default gear, sample photos, and settings.
7. **CORS** — Configured to allow requests from `https://lens-dock.vercel.app` and `https://*.vercel.app`.

---

## API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/login` | Public |

### Bookings
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/bookings` | Public |
| GET | `/api/admin/bookings` | Admin |
| PATCH | `/api/admin/bookings/{id}/status` | Admin |
| DELETE | `/api/admin/bookings/{id}` | Admin |

### Gear
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/gear` | Public |
| GET/POST/PUT/DELETE | `/api/admin/gear/**` | Admin |

### Photos & Licenses
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/photos` | Public |
| POST | `/api/licenses` | Public |
| GET | `/api/admin/licenses` | Admin |

### Settings
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/settings/public` | Public |
| GET/PUT | `/api/settings/admin` | Admin |

---

## Prerequisites (Local)

- Java JDK 17+
- MySQL 8 running locally
- Maven 3.9+

---

## Database Configuration

Update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lensdock?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

Or create the database manually:
```sql
CREATE DATABASE IF NOT EXISTS lensdock;
```

---

## Running Locally

```sh
cd backend

# Build the JAR
mvn clean package -DskipTests

# Run the app
mvn spring-boot:run
```

Server starts at **http://localhost:8080**. All endpoints are prefixed with `/api`.

---

## Admin Credentials (Seeded on First Run)

| Field    | Value                      |
|----------|----------------------------|
| Username | `lensdock.team@gmail.com`  |
| Password | `Sudu@1308`                |

> ⚠️ Change these in production.

---

## Deploying to AWS Lightsail

```sh
# 1. Build JAR locally
mvn clean package -DskipTests

# 2. Upload to server
pscp -i lensdock.ppk target/lensdock-backend-1.0.0.jar ubuntu@13.235.138.219:/home/ubuntu/

# 3. SSH in, stop old process, start new one
ssh -i lensdock.ppk ubuntu@13.235.138.219
pkill -f lensdock-backend
nohup java -Xmx400m -jar /home/ubuntu/lensdock-backend-1.0.0.jar > /dev/null 2>&1 &
```

> **`-Xmx400m`** limits the Java heap to 400 MB. This is critical on a 1 GB RAM
> Lightsail instance shared with MySQL — without it the server will run out of memory and freeze.

---

## Folder Architecture

```
src/main/java/com/lensdock/
├── config/
│   ├── WebMvcConfig.java      # CORS configuration (allows Vercel origins)
│   ├── SecurityConfig.java    # Spring Security + JWT filter chain
│   ├── JwtAuthFilter.java     # JWT token extraction and validation per request
│   ├── JwtUtils.java          # Token generation and parsing
│   └── SeedDataConfig.java    # Auto DB seeder (runs on first startup)
│
└── feature/
    ├── auth/                  # Login controller and response DTO
    ├── user/                  # Admin user entity and repository
    ├── booking/               # Booking entity, controller, service, email
    ├── gear/                  # Camera catalog
    ├── settings/              # Site config (UPI, pricing, QR code)
    ├── photo/                 # Photo gallery catalog
    └── license/               # Photo license transactions
```

---

## CORS Notes

CORS is handled by a `CorsFilter` bean in `WebMvcConfig.java`:

- Allowed origins: `https://lens-dock.vercel.app`, `https://*.vercel.app`
- Allowed methods: `GET, POST, PUT, PATCH, DELETE, OPTIONS`
- Allowed headers: `*`
- Credentials: `false` (JWT is in `Authorization` header, not cookies)
- Registered on: `/api/**`

Spring Security uses `.cors(Customizer.withDefaults())` to pick up this bean.

---

© 2026 LensDock
