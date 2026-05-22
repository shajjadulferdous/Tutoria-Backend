# Tutoria Backend 🚀

This is the backend server for the **Tutoria** platform — a tutor booking system where students can find tutors, book sessions, and also become tutors themselves.

Built with **Express.js**, **MongoDB**, and **Better Auth JWT Verification**.

---

# 🌟 Features

- 🔐 JWT Authentication Verification
- 👨‍🏫 Tutor Management APIs
- 📅 Session Booking System
- ➕ Add New Tutors
- ✏️ Update Tutor Information
- ❌ Delete Tutors
- 🔎 Search Tutors
- 📦 MongoDB Database Integration
- 🌐 REST API Architecture

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## Authentication
- Better Auth
- JOSE-CJS JWT Verification

## Utilities
- dotenv
- cors
- nodemon

---

# 📦 Dependencies

```json
{
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jose-cjs": "^6.2.3",
  "jsonwebtoken": "^9.0.3",
  "mongodb": "^7.2.0",
  "nodemon": "^3.1.14"
}
```

---

# 📂 Project Structure

```bash
backend/
│
├── index.js
├── package.json
├── .env
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/shajjadulferdous/tutoria-backend.git
```

## Move to project directory

```bash
cd tutoria-backend
```

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:3000
```

---

# 🔐 Authentication System

This backend uses **Better Auth JWT Verification** with JOSE.

Protected routes use middleware:

```js
JwtVerify
```

Authorization header format:

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# 📡 API Endpoints

## Tutors

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tutors` | Get all tutors |
| GET | `/tutors/:id` | Get single tutor |
| POST | `/my-tutors` | Add new tutor |
| GET | `/my-tutors/:id` | Get tutors added by user |
| PATCH | `/my-tutors/:id` | Update tutor |
| DELETE | `/my-tutors/:id` | Delete tutor |

---

## Sessions

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/my-session` | Book session |
| GET | `/my-session/:id` | Get user sessions |
| PATCH | `/my-session/:id` | Update session |

---

## Search API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tutoria?search=value` | Search tutors |
| GET | `/tutoria?startDate=value` | Filter by start date |

---

# 📚 Main Functionalities

## 👨‍🎓 Student Features
- Browse tutors
- Search tutors
- Book sessions
- Manage bookings

## 👨‍🏫 Tutor Features
- Add tutor profile
- Edit tutor information
- Delete tutor profile

---

# 🔥 Future Improvements

- Payment Gateway Integration
- Role Based Access Control
- Admin Dashboard
- Tutor Rating System
- Real-time Notifications
- Video Calling Support

---

# 🧑‍💻 Author

Developed by **Md Shajjadul Ferdous**

---
