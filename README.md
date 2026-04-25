# DRIPLENS

```text
 ██████╗ ██████╗ ██╗██████╗ ██╗     ███████╗███╗   ██╗███████╗
 ██╔══██╗██╔══██╗██║██╔══██╗██║     ██╔════╝████╗  ██║██╔════╝
 ██║  ██║██████╔╝██║██████╔╝██║     █████╗  ██╔██╗ ██║███████╗
 ██║  ██║██╔══██╗██║██╔═══╝ ██║     ██╔══╝  ██║╚██╗██║╚════██║
 ██████╔╝██║  ██║██║██║     ███████╗███████╗██║ ╚████║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
```

## The Professional Meritocracy for Videographers and Content Creators

*Find. Build. Collaborate.*

---

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4.8-010101?style=flat-square&logo=socket.io&logoColor=white)](https://socket.io/)
[![License](https://img.shields.io/badge/License-ISC-yellow?style=flat-square)](https://opensource.org/licenses/ISC)

---

## Overview

Driplens is a full-stack web platform that revolutionizes creator-brand partnerships by removing cold outreach and inflated metrics. Instead of relying on follower counts and DMs, brands discover creators through **actual work** — comprehensive portfolios, verified track records, and merit-based matching. Creators get hired on talent, not vanity metrics.

The platform connects **videographers and content creators** with brands seeking authentic partnerships. Features include real-time messaging, portfolio management, hiring request workflows, and an intelligent discovery system. The backend is built with production-grade Express.js: modular MVC structure, Zod schema validation, Pino structured logging, per-route rate limiting, Helmet security headers, Supabase JWT authentication, and Row-Level Security (RLS).

---

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development Scripts](#development-scripts)
- [Security](#security)
- [Contributing](#contributing)

---

## Features

| Feature | Description |
| --- | --- |
| **Portfolio Management** | Creators upload images, videos, and media to showcase their work |
| **Creator Discovery** | Brands browse creators with advanced filtering by category, location, and ratings |
| **Merit-Based Matching** | AI-powered recommendations based on portfolio quality and past performance |
| **Real-time Messaging** | Socket.io-powered in-app messaging for direct brand-creator communication |
| **Hiring Workflows** | Structured hiring requests with budget, project details, and status tracking |
| **Reviews & Ratings** | Community-sourced feedback on creator performance and reliability |
| **Dashboard Analytics** | Creators and brands track applications, earnings, and engagement metrics |
| **Verification System** | Email verification and skill-based credentialing for creators |
| **Responsive Design** | Mobile-first UI with smooth animations and accessibility |

---

## Architecture

```text
                       CLIENT (React + Vite)
                                |
                       HTTP / REST (JSON)
                                |
           ┌────────────────────▼────────────────────┐
           │         EXPRESS API SERVER              │
           │                                        │
           │  requestLogger → helmet → cors         │
           │     → bodyParser → rateLimit           │
           │      → requireAuth                     │
           │                                        │
           │  /api/v1/creators    → creatorsRoute   │
           │  /api/v1/brands      → brandsRoute     │
           │  /api/v1/portfolios  → portfoliosRoute │
           │  /api/v1/hiring      → hiringRoute     │
           │  /api/v1/messages    → messagesRoute   │
           │                                        │
           │     notFoundHandler → errorHandler     │
           └────────────┬────────────────────────────┘
                        |
           ┌────────────┴──────────────┐
           |                           |
    ┌──────▼──────┐           ┌────────▼────────┐
    │  SUPABASE   │           │ EXTERNAL APIs   │
    │ PostgreSQL  │           │                 │
    │    + Auth   │           │ Socket.io       │
    │    + RLS    │           │ Storage         │
    │  + Storage  │           │ Winston Logger  │
    └─────────────┘           └─────────────────┘
```

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| Node.js | >= 18 | Runtime |
| Express.js | 5.2 | HTTP framework and routing |
| Supabase JS | 2.101 | Database client, Auth, and JWT verification |
| Zod | 4.3 | Request schema validation |
| Pino | Latest | Structured JSON logging |
| Helmet | 8.1 | HTTP security headers |
| express-rate-limit | 8.3 | Per-route rate limiting |
| Winston | 3.19 | Production-grade logging |
| Socket.io | 4.8 | Real-time WebSocket communication |
| Multer | 2.1 | Multipart file upload handling |

### Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 19.2.4 | UI framework |
| Vite | 8.0 | Build tool and dev server |
| Tailwind CSS | 4.2 | Utility-first styling |
| React Router | 7.13 | Client-side routing |
| Framer Motion | 12.37 | Page and component animations |
| Socket.io Client | 4.8 | Real-time communication client |
| Supabase JS | 2.101 | Auth and database client |
| Lucide React | 0.577 | Icon library |
| GSAP | 3.14 | Advanced scroll and timeline effects |

### External APIs

| API | Purpose | Cost |
| --- | --- | --- |
| Supabase | Database, Auth, Storage | Free tier available |
| Socket.io | Real-time messaging | Included in Node.js |
| Vercel | Frontend deployment | Free tier available |
| Render | Backend deployment | Free tier available |

---

## Project Structure

```text
DRIPLENS-WEB/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI pipeline
│
├── server/                            # Express API server
│   ├── controllers/
│   │   ├── creatorsController.js
│   │   ├── brandsController.js
│   │   ├── portfolioController.js
│   │   ├── hiringController.js
│   │   └── messagesController.js
│   ├── lib/
│   │   ├── logger.js                  # Pino logger instance
│   │   ├── response.js                # Standardised response helpers
│   │   └── supabase.js                # Supabase client (service role)
│   ├── middleware/
│   │   ├── asyncHandler.js            # Async error wrapper
│   │   ├── auth.js                    # Supabase JWT verification
│   │   ├── errorHandler.js            # Global error and 404 handler
│   │   ├── logger.js                  # Pino-http request logger
│   │   ├── rateLimit.js               # Per-route rate limiters
│   │   ├── security.js                # Helmet and CORS configuration
│   │   └── validate.js                # Zod schema validator middleware
│   ├── routes/
│   │   ├── creators.js
│   │   ├── brands.js
│   │   ├── portfolios.js
│   │   ├── hiring.js
│   │   └── messages.js
│   ├── schemas/
│   │   ├── auth.schema.js
│   │   ├── creator.schema.js
│   │   ├── portfolio.schema.js
│   │   ├── hiring.schema.js
│   │   └── message.schema.js
│   ├── services/
│   │   ├── creator.service.js
│   │   ├── brand.service.js
│   │   ├── portfolio.service.js
│   │   ├── hiring.service.js
│   │   ├── message.service.js
│   │   └── supabase.js
│   ├── tests/                         # Vitest test suite
│   ├── index.js                       # Application entry point
│   ├── vitest.config.js
│   └── package.json
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_init_schema.sql       # Initial tables & RLS
│   │   ├── 002_auth_triggers.sql     # Profile auto-creation
│   │   └── 003_indexes.sql           # Database indexes
│   └── migrations.sql                # Consolidated migrations
│
├── src/                              # React frontend
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── Aurora/
│   ├── context/
│   │   ├── AuthContext.jsx           # Auth state management
│   │   └── SocketContext.jsx         # WebSocket state
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useSocket.js
│   ├── lib/
│   │   ├── supabase.js               # Supabase client (anon key)
│   │   └── api.js                    # API utilities
│   ├── pages/
│   │   ├── AuthPage.jsx
│   │   ├── ExplorePage.jsx
│   │   ├── CreatorDashboard.jsx
│   │   ├── BrandDashboard.jsx
│   │   ├── PortfolioUpload.jsx
│   │   ├── CreatorProfile.jsx
│   │   └── BrandProfile.jsx
│   ├── services/
│   │   └── externalMediaService.js
│   ├── store/                        # Zustand global state
│   ├── utils/
│   └── App.jsx
│
├── .env.example
├── SECURITY.md
├── package.json
├── vite.config.js
└── README.md
```

---

## Database Schema

```text
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│  profiles    │     │  portfolios  │     │  hiring_requests │
├──────────────┤     ├──────────────┤     ├──────────────────┤
│ id (PK)      │     │ id (PK)      │     │ id (PK)          │
│ user_id (FK) │<────│ user_id (FK) │     │ brand_id (FK)    │
│ username     │     │ title        │     │ creator_id (FK)  │
│ role         │     │ media_url    │     │ project_title    │
│ bio          │     │ media_type   │     │ budget           │
│ avatar_url   │     │ category     │     │ status           │
│ banner_url   │     │ created_at   │     │ created_at       │
│ location     │     └──────────────┘     │ updated_at       │
│ category     │                          └──────────────────┘
│ created_at   │                                    │
└──────────────┘                                    │
       │                                            │
       │              ┌──────────────┐             │
       │              │   messages   │<────────────┘
       │              ├──────────────┤
       │              │ id (PK)      │
       │              │ request_id   │
       └─────────────>│ sender_id    │
                      │ content      │
                      │ created_at   │
                      └──────────────┘
```

---

## API Reference

**Base URL:** `http://localhost:5000/api/v1`

All write endpoints require an `Authorization: Bearer <token>` header.  
All responses follow the envelope: `{ success, data | error, timestamp }`.

---

### Authentication

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | Public | Create a new account (creator or brand) |
| POST | `/auth/login` | Public | Login with email and password |
| GET | `/auth/me` | Required | Get current user profile |
| POST | `/auth/logout` | Required | Logout and invalidate session |

---

### Creators

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/creators` | Public | List all creators (paginated, filterable) |
| GET | `/creators/:id` | Public | Get creator profile by ID |
| PUT | `/creators/:id` | Required | Update creator profile |
| GET | `/creators/:id/portfolio` | Public | Get creator's portfolio items |

---

### Brands

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/brands` | Public | List all brands |
| GET | `/brands/:id` | Public | Get brand profile by ID |
| PUT | `/brands/:id` | Required | Update brand profile |

---

### Portfolios

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/portfolios` | Required | Upload portfolio item (image or video) |
| GET | `/portfolios/:id` | Public | Get portfolio item details |
| DELETE | `/portfolios/:id` | Required | Delete portfolio item |

---

### Hiring Requests

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/hiring-requests` | Required | Create hiring request (brands only) |
| GET | `/hiring-requests` | Required | List user's hiring requests |
| GET | `/hiring-requests/:id` | Required | Get request details |
| PATCH | `/hiring-requests/:id` | Required | Update request status |
| DELETE | `/hiring-requests/:id` | Required | Cancel request |

---

### Messages

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| GET | `/messages/:requestId` | Required | Get conversation messages |
| POST | `/messages/:requestId` | Required | Send message in request thread |

---

### Response Format

```json
// Success
{
  "success": true,
  "data": { ... },
  "timestamp": "2025-01-01T00:00:00.000Z"
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [{ "field": "email", "message": "Invalid email format" }]
  },
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

### Error Codes

| Code | HTTP Status | Cause |
| --- | --- | --- |
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `UNAUTHORIZED` | 401 | Missing or invalid JWT token |
| `FORBIDDEN` | 403 | Authenticated but not permitted |
| `NOT_FOUND` | 404 | Resource does not exist |
| `CONFLICT` | 409 | Duplicate resource (DB constraint) |
| `RATE_LIMIT` | 429 | Too many requests |
| `SERVER_ERROR` | 500 | Unhandled internal error |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- A [Supabase](https://supabase.com) project
- Git

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/DRIPLENS-WEB.git
cd DRIPLENS-WEB

# Frontend dependencies
npm install

# Server dependencies
cd server && npm install && cd ..
```

### 2. Configure Environment

```bash
cp .env.example .env
cp server/.env.example server/.env
# Edit both files and populate all required values
```

### 3. Apply Database Schema

In your Supabase SQL editor, run the files in this order:

```sql
supabase/migrations/001_init_schema.sql
supabase/migrations/002_auth_triggers.sql
supabase/migrations/003_indexes.sql
```

Or run the consolidated file:

```sql
supabase/migrations.sql
```

### 4. Start Development Servers

```bash
# Frontend only (http://localhost:5173)
npm run dev

# Backend only (http://localhost:5000)
npm run dev:server

# Both together (recommended)
npm run dev:all
```

---

## Environment Variables

### Frontend (`/.env`) — compiled into browser bundle

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous (publishable) key |
| `VITE_API_URL` | Express API base URL (default: <http://localhost:5000>) |

### Server (`/server/.env`) — server-side only, never exposed to client

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default: `5000`) |
| `NODE_ENV` | `development` or `production` |
| `FRONTEND_URL` | Allowed CORS origin (e.g., <http://localhost:5173>) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SECRET_KEY` | Supabase service role key (keep private) |
| `SUPABASE_JWT_SECRET` | JWT secret for token verification |

> `VITE_` prefixed variables are bundled into the client and visible to all users.  
> Never assign privileged credentials — service role keys or secrets — to `VITE_` variables.

---

## Development Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite frontend dev server |
| `npm run dev:server` | Start Express API with nodemon |
| `npm run dev:all` | Start frontend and backend concurrently |
| `npm run build` | Production build of the frontend |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint across all JS and JSX files |
| `cd server && npm test` | Run Vitest test suite |

---

## Security

The backend implements a **layered security model** across every request.

**HTTP Headers** — Helmet enforces Content Security Policy, HSTS with one-year max-age, X-Frame-Options deny, X-Content-Type-Options nosniff, and Referrer-Policy strict-origin.

**CORS** — Strict origin whitelist. Requests from unlisted origins are rejected at the middleware level.

**Authentication** — All write routes require a valid Supabase JWT as `Authorization: Bearer <token>`. Tokens are verified server-side, and the authenticated user is attached to `req.user` for all downstream handlers.

**Rate Limiting** — Multiple rate limiters protect distinct surfaces:

| Limiter | Window | Limit | Purpose |
| --- | --- | --- | --- |
| General API | 15 minutes | 100 requests | Overall API protection |
| Authentication | 15 minutes | 10 requests | Brute force protection |
| Portfolio Upload | 1 hour | 30 requests | Prevent spam uploads |
| Hiring Requests | 1 hour | 20 requests | Prevent request flooding |

**Validation** — All incoming request bodies are validated against Zod schemas before reaching controllers. Invalid payloads return structured 400 responses with per-field error details.

**Database** — Row Level Security (RLS) policies enforce that users can only access their own data, regardless of API-level checks.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Write tests for any new behavior.
4. Ensure all tests pass: `cd server && npm test`
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/).
6. Open a pull request against `main` with a clear description of changes.

---

## License

ISC License. See [LICENSE](LICENSE) for details.

---

Built with **React**, **Express**, **Supabase**, and **Socket.io**

**[GitHub](https://github.com/yourusername/DRIPLENS-WEB)** • **[Report Issues](https://github.com/yourusername/DRIPLENS-WEB/issues)** • **[Discussions](https://github.com/yourusername/DRIPLENS-WEB/discussions)**
