# DRIPLENS WEB

```
  ____  ____  ___ ____  _     _____ _   _ ____
 |  _ \|  _ \|_ _|  _ \| |   | ____| \ | / ___|
 | | | | |_) || || |_) | |   |  _| |  \| \___ \
 | |_| |  _ < | ||  __/| |___| |___| |\  |___) |
 |____/|_| \_\___|_|   |_____|_____|_| \_|____/
```

**The professional meritocracy for videographers and content creators.**

Driplens is a full-stack web platform that connects videographers and content creators with brands through merit-based discovery. Creators build portfolios, brands browse talent, and both parties communicate through a structured hiring system — all in one place.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [Team](#team)

---

## Overview

Driplens removes the noise from creator-brand partnerships. Instead of cold DMs and inflated follower counts, brands discover creators through actual work — portfolios, category, and track record. Creators get hired on merit.

The platform is split into two independent apps:

- `client/` — React frontend built with Vite, Tailwind CSS, and Framer Motion
- `server/` — Express REST API backed by Supabase (PostgreSQL, Auth, and Storage)

---

## Tech Stack

### Frontend

| Technology          | Purpose                              |
|---------------------|--------------------------------------|
| React 19            | UI framework                         |
| Vite 8              | Build tool and dev server            |
| Tailwind CSS 4      | Utility-first styling                |
| Framer Motion       | Page and component animations        |
| GSAP                | Advanced scroll and timeline effects |
| React Router DOM 7  | Client-side routing                  |
| Supabase JS         | Client-side database and auth        |

### Backend

| Technology      | Purpose                               |
|-----------------|---------------------------------------|
| Node.js         | Runtime                               |
| Express 5       | HTTP server and routing               |
| Supabase (PG)   | Primary database (PostgreSQL)         |
| Supabase Auth   | User authentication and security      |
| Supabase Storage| Media storage (portfolio/avatars)     |
| Multer          | Multipart file handling               |

---

## Project Structure

```
DRIPLENS-WEB/
|
+-- client/                         # React frontend
|   +-- src/
|   |   +-- components/
|   |   |   +-- Navbar.jsx          # Top navigation bar
|   |   |   +-- Footer.jsx          # Site footer
|   |   |
|   |   +-- pages/
|   |   |   +-- AuthPage.jsx        # Login / Register (Supabase Auth)
|   |   |   +-- ExplorePage.jsx     # Fetching from Supabase
|   |   |   +-- UploadPage.jsx      # Upload to Supabase Storage
|   |   |
|   |   +-- lib/
|   |   |   +-- supabase.js         # Supabase Client (Anon)
|   |   |
|   |   +-- App.jsx                 # Root router and layout
|   |
|   +-- package.json
|
+-- server/                         # Express REST API
    +-- index.js                    # App bootstrap
    +-- middleware/
    |   +-- auth.js                 # Supabase session verification
    +-- routes/
    |   +-- auth.js                 # Auth endpoints (proxied to Supabase)
    |   +-- upload.js               # Portfolio upload to Supabase Storage
    +-- utils/
    |   +-- supabase.js             # Supabase Admin Client (Service Role)
    +-- package.json
```

---

## Features

### For Creators
- Register with a creator role; profile auto-created via database trigger
- Upload portfolio pieces (image and video) directly to Supabase Storage
- Get discovered by brands browsing the creator directory
- Receive and respond to hiring requests

### For Brands
- Register with a brand role and access the brand dashboard
- Browse and filter creators through PostgreSQL-backed search
- Send hiring requests with budget and project details
- Message creators directly within a secure request thread

### Platform-wide
- Supabase Auth security with JWT verification
- Row Level Security (RLS) protecting all data at the database level
- Fully responsive, minimal UI with smooth animations

---

## Getting Started

### Prerequisites

- Node.js v18+
- A Supabase Project ([supabase.com](https://supabase.com))

### 1. Set up the Database

Run the provided SQL script in your Supabase SQL Editor to create tables, triggers, and RLS policies.

### 2. Set up the Server

```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Set up the Client

```bash
cd ../client
npm install
```

Create a `.env` file in `client/`:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_public_key
```

---

## Database Schema

### Profiles
- Extended user data linked to `auth.users`
- Fields: `username`, `role`, `bio`, `avatar_url`, `banner_url`

### Portfolio Items
- Media uploads linked to creators
- Fields: `title`, `media_url`, `media_type`, `category`

### Hiring Requests
- Transactions between brands and creators
- Fields: `brand_id`, `creator_id`, `budget`, `status`

---

## Team

- **Aayu** (Frontend + Architecture)
- **Annanya Ukey** (Development)
- **Atharv Gadekar** (Development)
- **Aditi Janugade** (Development)
- **Anandi Khandelwal** (Development)

*Faculty Guide — Prof. N.D. Gaikwad, AISSMS College of Engineering*
et_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:

```bash
npm run dev        # development with nodemon
npm start          # production
```

### 3. Set up the client

```bash
cd ../client
npm install
npm run dev
```

The client runs on `http://localhost:5173` by default. The server runs on port `5000`.

---

## Environment Variables

| Variable                   | Location | Description                         |
|----------------------------|----------|-------------------------------------|
| `PORT`                     | server   | Express server port (default 5000)  |
| `MONGO_URI`                | server   | MongoDB connection string           |
| `JWT_SECRET`               | server   | Secret key for signing JWTs         |
| `CLOUDINARY_CLOUD_NAME`    | server   | Cloudinary cloud identifier         |
| `CLOUDINARY_API_KEY`       | server   | Cloudinary API key                  |
| `CLOUDINARY_API_SECRET`    | server   | Cloudinary API secret               |

---

## Database Models

### User
```
username      String     unique, required
email         String     unique, required
password      String     bcrypt hashed
role          String     "creator" or "brand"
isVerified    Boolean    default false
profile {
  bannerUrl   String
  avatarUrl   String
  bio         String
  location    String
  category    String
  portfolio   [ { title, mediaUrl, mediaType } ]
}
```

### HiringRequest
```
brandId             ObjectId  -> User
creatorId           ObjectId  -> User
projectTitle        String
projectDescription  String
budget              Number
status              "Pending" | "Accepted" | "Declined" | "Completed" | "Review"
```

### Message
```
hiringRequestId     ObjectId  -> HiringRequest
senderId            ObjectId  -> User
content             String
isRead              Boolean   default false
```

---

## Team

| Name               | Role                    |
|--------------------|-------------------------|
| Aayu               | Architecture            |
| Annanya Ukey       | Frontend + UI?UX        |
| Atharv Gadekar     | Main Idea Force         |
| Aditi Janugade     | Reaseacher              |
| Anandi Khandelwal  | AI/ML Lead              |

Faculty Guide — Prof. N.D. Gaikwad, AISSMS College of Engineering

---

## Deployment

The recommended free-tier deployment stack:

| Service         | Purpose              |
|-----------------|----------------------|
| Vercel          | Frontend hosting     |
| Render          | Backend hosting      |
| MongoDB Atlas   | Database (free tier) |
| Cloudinary      | Media storage        |

---

*DRIPLENS — Built at AISSMS College of Engineering, Pune.*
