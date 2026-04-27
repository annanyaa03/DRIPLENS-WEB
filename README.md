# DRIPLENS

```text
 ██████╗ ██████╗ ██╗██████╗ ██╗     ███████╗███╗   ██╗███████╗
 ██╔══██╗██╔══██╗██║██╔══██╗██║     ██╔════╝████╗  ██║██╔════╝
 ██║  ██║██████╔╝██║██████╔╝██║     █████╗  ██╔██╗ ██║███████╗
 ██║  ██║██╔══██╗██║██╔═══╝ ██║     ██╔══╝  ██║╚██╗██║╚════██║
 ██████╔╝██║  ██║██║██║     ███████╗███████╗██║ ╚████║███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝     ╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝
```

The Professional Meritocracy for Videographers and Content Creators

Find. Build. Collaborate.

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

Overview

Driplens is a full‑stack web platform that connects videographers and content creators with brands looking for authentic partnerships. The platform emphasizes merit — portfolio quality, verified skills, and past performance — rather than follower counts or cold outreach. Core features include portfolio management, hiring workflows, real‑time messaging, and analytics.

This repository contains both the frontend (React + Vite) and the backend (Express) plus Supabase migrations and SQL (PL/pgSQL) for database policies and triggers.

Repository language composition (generated from repository data):

- JavaScript — 92.9% (frontend + backend application code)
- PLpgSQL — 4.5% (Supabase migrations, triggers, and RLS policies)
- CSS — 2.5% (styles, Tailwind + custom CSS)
- HTML — 0.1% (static assets)

---

Table of Contents

- Features
- Architecture
- Tech Stack
- Project Structure
- Database Schema
- API Reference
- Getting Started
- Environment Variables
- Development Scripts
- Security
- Contributing

---

Features

| Feature | Description |
| --- | --- |
| Portfolio Management | Creators upload images, videos, and media to showcase their work |
| Creator Discovery | Brands browse creators with advanced filtering by category, location, and ratings |
| Merit-Based Matching | Recommendations based on portfolio quality and past performance |
| Real-time Messaging | Socket.io-powered in-app messaging for direct brand-creator communication |
| Hiring Workflows | Structured hiring requests with budget, project details, and status tracking |
| Reviews & Ratings | Community-sourced feedback on creator performance and reliability |
| Dashboard Analytics | Creators and brands track applications, earnings, and engagement metrics |
| Verification System | Email verification and skill-based credentialing for creators |
| Responsive Design | Mobile-first UI with accessibility considerations |

---

Architecture

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
    │  SUPABASE   │           │ EXTERNAL APIS   │
    │ PostgreSQL  │           │                 │
    │    + Auth   │           │ Socket.io       │
    │    + RLS    │           │ Storage         │
    │  + Storage  │           │ Winston Logger  │
    └─────────────┘           └─────────────────┘
```

---

Tech Stack

Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| Node.js | >= 18 | Runtime |
| Express.js | 5.x | HTTP framework and routing |
| Supabase JS | ^2.x | Database client, Auth, and JWT verification |
| Zod | ^4.x | Request schema validation |
| Pino / Winston | ^latest | Structured logging |
| Helmet | ^8.x | HTTP security headers |
| express-rate-limit | ^8.x | Per-route rate limiting |
| Socket.io | 4.x | Real-time WebSocket communication |
| Multer | 2.x | Multipart file upload handling |

Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| React | 19.x | UI framework |
| Vite | 4.x / 8.x | Build tool and dev server |
| Tailwind CSS | 4.x | Utility-first styling |
| React Router | 7.x | Client-side routing |
| Framer Motion | 12.x | Page and component animations |
| Socket.io Client | 4.x | Real-time communication client |
| Supabase JS | ^2.x | Auth and database client |

External Services

| API | Purpose |
| --- | --- |
| Supabase | Database, Auth, Storage |
| Socket.io | Real-time messaging |
| Vercel / Render | Deployment targets |

---

Project Structure

```text
DRIPLENS-WEB/
├── .github/
│   └── workflows/
│       └── ci.yml
├── server/                            # Express API server
├── supabase/                          # SQL migrations and RLS policies
├── src/ (frontend)                    # React + Vite app
├── client/                            # (optional) legacy client folder
├── package.json
└── README.md
```

Note: The repository contains both server and client/front-end code. The majority of the codebase is JavaScript; database logic and triggers live under the `supabase/` directory as PL/pgSQL.

---

Database Schema

See `supabase/migrations/` for the full SQL definitions. The schema includes profiles, portfolios, hiring requests, and messages; RLS policies and triggers ensure per-user data access and profile auto-creation.

---

API Reference

Base URL: `http://localhost:5000/api/v1`

All write endpoints require an `Authorization: Bearer <token>` header. Responses follow the envelope: `{ success, data | error, timestamp }`.

See full API endpoint list in server routes or the API reference section in this README.

---

Getting Started

Prerequisites

- Node.js >= 18
- npm >= 9
- A Supabase project
- Git

1. Clone and install

```bash
git clone https://github.com/switchd2/DRIPLENS-WEB.git
cd DRIPLENS-WEB

# Frontend dependencies
npm install

# Server dependencies
cd server && npm install && cd ..
```

2. Configure environment

```bash
cp .env.example .env
cp server/.env.example server/.env
# Edit both files and populate all required values
```

3. Apply database schema

Run the files in `supabase/migrations/` in order or run `supabase/migrations.sql` in Supabase SQL editor.

4. Start development servers

```bash
# Frontend only (http://localhost:5173)
npm run dev

# Backend only (http://localhost:5000)
npm run dev:server

# Both together (recommended)
npm run dev:all
```

---

Environment Variables

Frontend (`/.env`) — compiled into browser bundle

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous (publishable) key |
| `VITE_API_URL` | Express API base URL (default: <http://localhost:5000>) |

Server (`/server/.env`) — server-side only, never exposed to client

| Variable | Description |
| --- | --- |
| `PORT` | Server port (default: `5000`) |
| `NODE_ENV` | `development` or `production` |
| `FRONTEND_URL` | Allowed CORS origin (e.g., <http://localhost:5173>) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SECRET_KEY` | Supabase service role key (keep private) |
| `SUPABASE_JWT_SECRET` | JWT secret for token verification |

> `VITE_` prefixed variables are bundled into the client and visible to all users. Never assign privileged credentials — service role keys or secrets — to `VITE_` variables.

---

Development Scripts

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

Security

The backend implements a layered security model using Helmet, CORS origin whitelisting, rate limiting, Zod validation, and Supabase Row Level Security policies. All write routes require a valid Supabase JWT.

---

Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Write tests for any new behavior.
4. Ensure all tests pass: `cd server && npm test`
5. Commit using Conventional Commits.
6. Open a pull request against `main` with a clear description of changes.

---

License

ISC License. See [LICENSE](LICENSE) for details.

---

Built with React, Express, Supabase, and Socket.io

Repository: https://github.com/switchd2/DRIPLENS-WEB

