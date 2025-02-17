<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">🚀 URL Shortener API - NestJS</h1>
<p align="center">A fully-featured URL shortening API built with <a href="http://nestjs.com" target="_blank">NestJS</a>, PostgreSQL, and JWT authentication.</p>

![GitHub repo size](https://img.shields.io/github/repo-size/hassangomaa/url-shortener)
![GitHub stars](https://img.shields.io/github/stars/hassangomaa/url-shortener?style=social)
![GitHub license](https://img.shields.io/github/license/hassangomaa/url-shortener)

## 📌 Project Overview

The **URL Shortener API** is a **full-fledged backend system** designed to shorten URLs, track visits, and retrieve analytics. The system ensures **scalability, security, and performance** while strictly following **DRY**, **SOLID**, and **clean architecture** principles.

This project is fully **Dockerized** and uses **PostgreSQL** as the database, with **raw SQL queries** for optimized performance.

### ✅ Developed by **HASSAN GOMAA** from scratch.

---

## 🚀 Features

- **Full RESTful APIs** with **raw SQL queries** for maximum efficiency.
- **JWT Authentication** (Signup & Signin).
- **Shorten URLs** with user authentication.
- **Redirect via Short URL**.
- **Track Visits** (IP, User-Agent, Timestamp).
- **Retrieve Statistics** (Visit count for each shortened URL).
- **Database Migrations & Seeding**.
- **Optimized DB indexes & queries**.
- **Swagger API Documentation** for testing.
- **Docker & Docker Compose** for easy deployment.

---

## 🛠️ Tech Stack

| Tech                        | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| **NestJS**                  | TypeScript-based backend framework                         |
| **PostgreSQL**              | Database for storing URLs and tracking visits              |
| **TypeScript**              | Static typing for maintainability                          |
| **JWT (JSON Web Tokens)**   | Secure authentication                                      |
| **Docker & Docker Compose** | Containerized development & deployment                     |
| **DB RAW QUERY**            | Database migrations (raw SQL queries used for performance) |
| **Bcrypt**                  | Secure password hashing                                    |
| **Swagger**                 | API Documentation                                          |
| **Postman**                 | API testing & debugging                                    |

---

## 📁 Project Structure
```

src/
│── auth/ # Authentication module
│ ├── controllers/ # Auth Controllers
│ ├── services/ # Auth Services
│ ├── dto/ # Data Transfer Objects (Request/Response)
│── urls/ # URL Shortening module
│ ├── controllers/ # URL Controllers
│ ├── services/ # URL Services
│ ├── dto/ # Data Transfer Objects (Request/Response)
│── database/ # Database Service & Migrations
│── common/ # Shared utilities & helpers
│── config/ # App configuration
│── main.ts # App entry point
│── app.module.ts # Main module

````

---

## 🔧 Setup & Installation

### Prerequisites
- **Node.js** (>=16.x)
- **Docker & Docker Compose**
- **PostgreSQL** (if not using Docker)

### 🚀 Quick Start (Docker)
```sh
git clone https://github.com/hassangomaa/url-shortener.git
cd url-shortener

# Start services
docker-compose up --build -d

# Run database migrations
docker exec -it url_shortener_app npx ts-node ./src/database/migrate.ts
````

### 🛠️ Local Setup (Without Docker)

```sh
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start the app
npm run start:dev
```

---

## 🔑 Authentication (JWT)

- **Signup** (`POST /auth/sign-up`)
- **Signin** (`POST /auth/sign-in`)
- **JWT-based authentication** is required for protected routes.

---

## 🌐 API Endpoints

### **Authentication**

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| `POST` | `/auth/sign-up` | Register new user                    |
| `POST` | `/auth/sign-in` | Authenticate user and receive tokens |

### **URL Shortening**

| Method | Endpoint           | Description                                              |
| ------ | ------------------ | -------------------------------------------------------- |
| `POST` | `/shorten`         | Shortens a long URL (Auth required)                      |
| `GET`  | `/:shortUrl`       | Redirects to original URL                                |
| `GET`  | `/stats/:shortUrl` | Fetches visit statistics for a short URL (Auth required) |

---

## 📈 How Visit Tracking Works?

1. A user **shortens a URL** using `POST /shorten`.
2. A **unique short code** is generated and stored in the database.
3. When a user visits the short URL (`GET /:shortUrl`):
   - The original URL is **retrieved** from the database.
   - A **visit record** is logged (including IP, timestamp, and user-agent).
4. The owner can fetch **visit statistics** using `GET /stats/:shortUrl`.

---

## 🏗️ Database Migrations & Seeding

- **Run Migrations**

  ```sh
  npx ts-node ./src/database/migrate.ts
  ```

- **Database Tables**:
  - `users`: Stores registered users.
  - `urls`: Stores original & shortened URLs.
  - `visits`: Logs visits for analytics.

---

## 🐳 Docker Configuration

The project is fully **Dockerized** with the following services:

- **App Container** (Runs NestJS)
- **PostgreSQL Database** (Stores URLs & visits)

### Start the Application

```sh
docker-compose up --build -d
```

### **docker-compose.yml**

---

## 📈 Real-Life Example Usage

### 1️⃣ **User Signs Up**

#### Request:

```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Response:

```json
{
  "accessToken": "jwt_token",
  "refreshToken": "jwt_refresh_token",
  "user": { "id": 1, "email": "user@example.com" }
}
```

### 2️⃣ **User Shortens a URL**

#### Request:

```json
{
  "originalUrl": "https://www.example.com/long-url-path"
}
```

#### Response:

```json
{
  "shortUrl": "abc123",
  "originalUrl": "https://www.example.com/long-url-path",
  "createdAt": "2025-02-12T10:00:00Z"
}
```

### 3️⃣ **User Visits the Short URL**

- **GET `/abc123`** → Redirects to `https://www.example.com/long-url-path`
- A visit record is logged.

### 4️⃣ **User Checks URL Stats**

#### Request:

```json
{
  "shortUrl": "abc123"
}
```

#### Response:

```json
{
  "shortUrl": "abc123",
  "visitCount": 10
}
```

---

## 📄 Conclusion

This project demonstrates a **scalable, maintainable, and efficient** URL Shortener using **NestJS, PostgreSQL, Docker, and JWT Authentication**. The **clean architecture**, **raw SQL queries**, and **best security practices** ensure performance and reliability.

🔥 Developed by **HASSAN GOMAA**. 🚀

