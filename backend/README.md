# LensDock — Spring Boot Backend Service

This is the production backend service for LensDock, built using **Java Spring Boot**, **Spring Security**, **Spring Data JPA (Hibernate)**, and **MySQL**.

## Core Features Implemented

1. **Stateful JWT Authentication**: Stateless request filtering via a custom token parser and validator. Endpoints under `/api/admin/**` are role-restricted.
2. **Booking Flow**: Public bookings submission via `/api/bookings` with auto-saving to MySQL. Aadhaar cards are uploaded as Base64 strings and stored securely in the database.
3. **Photo Licensing Shop**: Catalog of photos exposed at `/api/photos` and license purchase requests at `/api/licenses`.
4. **Site Settings & Pricing Catalog**: Dynamic configuration of UPI ID, support contact details, pricing per day, and QR codes stored in MySQL and editable via the Admin settings panel.
5. **Auto DB Seeder**: Database tables are automatically initialized, and the default admin user, settings, gear item (Canon EOS 80D), and photo shop frames are seeded automatically on first run.

## Prerequisites

- **Java**: JDK 17 or later installed.
- **Database**: MySQL Server running.
- **Maven**: Installed and configured on your system path.

## Database Configuration

Before starting, ensure that MySQL is running. The backend is configured to use the following settings in `src/main/resources/application.properties`:

- **Database Name**: `lensdock`
- **Username**: `root`
- **Password**: `Sudu@1308`

You can create the database manually using:
```sql
CREATE DATABASE IF NOT EXISTS lensdock;
```
*(If it does not exist, Spring Boot will automatically try to create it via the datasource URL configuration `createDatabaseIfNotExist=true`).*

## Running the Backend

Navigate to the `backend` directory and build/run the application:

```sh
# Compile and package the application
mvn clean package -DskipTests

# Start the Spring Boot backend
mvn spring-boot:run
```

The backend server will launch on port `8080`. The endpoints will be prefixed with `/api`.

## Seeded Admin Credentials

You can log in to the admin panel at `http://localhost:5173/admin` using:

- **Username**: `lensdock.team@gmail.com`
- **Password**: `Sudu@1308`

## Folder Architecture

The backend code is organized feature-wise under `src/main/java/com/lensdock/`:
- `config/`: JWT Utils, JWT Authentication Filter, CORS, Spring Security configuration, and the Database Seeder.
- `feature/auth/`: Login request and response processing.
- `feature/user/`: Admin user entities and JPA repositories.
- `feature/booking/`: Rental reservation entity, controller, service, and data access layer.
- `feature/gear/`: Camera catalog storage and status.
- `feature/settings/`: App configuration (UPI IDs, pricing, phone contacts, address details).
- `feature/photo/`: Photographer's gallery licensing catalog.
- `feature/license/`: Customer license transaction logs.
