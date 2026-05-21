<div align="center">

# ⚽ World Cup Fantasy 2026

### _Build Your Dream Team. Conquer the World._

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)](https://typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?logo=prisma)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://postgresql.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-010101?logo=socket.io)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-gold)](LICENSE)

**A Dream11-inspired private fantasy football platform for FIFA World Cup 2026.**  
Play with friends, build teams, track live scores, and compete on real-time leaderboards.

[🚀 Quick Start](#-quick-start) · [✨ Features](#-features) · [📐 Architecture](#-architecture) · [🗺 Roadmap](#-roadmap)

</div>

---

## 📸 App Preview

<div align="center">

| Dashboard | Team Builder |
|:-:|:-:|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Team Builder](docs/screenshots/team-builder.png) |

| Live Match Center | Leaderboard |
|:-:|:-:|
| ![Live Match](docs/screenshots/live-match.png) | ![Leaderboard](docs/screenshots/leaderboard.png) |

</div>

---

## ✨ Features

### 🏆 Core Gameplay
- **Dream11-Style Team Builder** — Select 11 players on a football pitch view with 100-credit budget
- **Captain & Vice-Captain** — 2× and 1.5× point multipliers for strategic picks
- **48 Group Stage Matches** — All FIFA World Cup 2026 matches pre-loaded
- **225+ Real Players** — Stars from all 48 qualified nations with accurate positions and pricing

### ⚡ Real-Time Experience
- **Live Score Updates** — Instant score changes via Socket.IO WebSockets
- **Fantasy Points Tracker** — Watch your points update as goals are scored
- **Real-Time Leaderboard** — Rankings shift live during matches
- **Push Notifications** — Goals, match events, and deadline alerts

### 🏟️ League System
- **Private Leagues** — Create leagues for up to 10 friends
- **Invite Codes** — 6-character codes to share with your group
- **Multiple Leagues** — Join as many leagues as you want
- **League Leaderboards** — Separate rankings per league

### 🔧 Admin Dashboard
- **Match Management** — Update scores, change match status
- **Event Triggers** — Add goals, assists, cards with player selection
- **Player Management** — Edit prices and player details
- **User & League Overview** — Complete platform analytics

### 📱 Cross-Platform
- **Progressive Web App (PWA)** — Install on any device
- **Responsive Design** — Optimized for mobile, tablet, and desktop
- **Works on** — Chrome, Safari, Firefox, Edge + Android + iOS

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js_15-black?logo=next.js) | App Router, SSR, Static Generation |
| **UI** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white) | Utility-first styling with custom design system |
| **Animation** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white) | Page transitions, micro-interactions |
| **State** | ![React Query](https://img.shields.io/badge/React_Query-FF4154?logo=react-query&logoColor=white) | Server state management + caching |
| **Forms** | ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=react-hook-form&logoColor=white) | Type-safe forms with Zod validation |
| **Backend** | ![Express](https://img.shields.io/badge/Express.js-000?logo=express) | REST API server |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white) | Relational data storage |
| **ORM** | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white) | Type-safe database queries |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-000?logo=json-web-tokens) | Token-based authentication |
| **Real-time** | ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io) | WebSocket events |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | End-to-end type safety |

</div>

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT (Browser / PWA)                     │
│                                                               │
│   Next.js 15  ·  React 19  ·  Tailwind CSS  ·  Framer Motion │
│   React Query  ·  Socket.IO Client  ·  Zod Validation        │
└───────────────────────┬───────────────────────────────────────┘
                        │ HTTPS (REST API) + WSS (Socket.IO)
┌───────────────────────▼───────────────────────────────────────┐
│                    SERVER (Node.js Runtime)                    │
│                                                               │
│   Express.js  ·  Passport JWT  ·  Google OAuth  ·  CORS      │
│   Rate Limiter  ·  express-validator  ·  Error Handler        │
│                                                               │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│   │  Controllers │  │   Services   │  │   Sockets    │       │
│   │  ─────────── │  │  ─────────── │  │  ─────────── │       │
│   │  Auth        │  │  Scoring     │  │  Score Push  │       │
│   │  League      │  │  Engine      │  │  Event Push  │       │
│   │  Match       │  │  ─────────── │  │  Leaderboard │       │
│   │  Player      │  │  Football    │  │  Push        │       │
│   │  Team        │  │  Data API    │  │  Notification│       │
│   │  Leaderboard │  │  Integration │  │  Push        │       │
│   │  Admin       │  │              │  │              │       │
│   └──────┬───────┘  └──────┬───────┘  └──────────────┘       │
│          │                 │                                  │
│   ┌──────▼─────────────────▼──────┐                          │
│   │     Prisma ORM (Singleton)    │                          │
│   └──────────────┬────────────────┘                          │
└──────────────────┼────────────────────────────────────────────┘
                   │
┌──────────────────▼────────────────────────────────────────────┐
│              PostgreSQL Database (Neon / Local)                │
│                                                               │
│   Users · Leagues · Matches · Players · FantasyTeams          │
│   MatchPlayers · MatchEvents · Notifications                  │
│   10 Tables · 3 Enums · Full Referential Integrity            │
└───────────────────────────────────────────────────────────────┘
```

### Database Schema

```
┌──────────┐     ┌───────────────┐     ┌──────────┐
│   User   │────▶│ LeagueMember  │◀────│  League  │
│──────────│     │───────────────│     │──────────│
│ id       │     │ leagueId      │     │ id       │
│ name     │     │ userId        │     │ name     │
│ email    │     └───────────────┘     │ inviteCode│
│ password │                           │ ownerId  │
│ isAdmin  │     ┌───────────────┐     │ maxMembers│
│ totalPts │────▶│ FantasyTeam   │     └──────────┘
└──────────┘     │───────────────│
                 │ userId        │     ┌──────────┐
                 │ matchId ──────│────▶│  Match   │
                 │ captainId     │     │──────────│
                 │ viceCaptainId │     │ homeTeam │
                 │ totalPoints   │     │ awayTeam │
                 │ budgetUsed    │     │ status   │
                 └───────┬───────┘     │ kickoff  │
                         │             │ homeScore│
                 ┌───────▼───────┐     │ awayScore│
                 │  TeamPlayer   │     └────┬─────┘
                 │───────────────│          │
                 │ fantasyTeamId │     ┌────▼──────┐
                 │ playerId ─────│──▶  │  Player   │
                 └───────────────┘     │───────────│
                                       │ name      │
                 ┌───────────────┐     │ country   │
                 │  MatchEvent   │     │ position  │
                 │───────────────│     │ price     │
                 │ matchId       │     └───────────┘
                 │ playerId      │
                 │ type          │     ┌───────────┐
                 │ minute        │     │MatchPlayer│
                 └───────────────┘     │───────────│
                                       │ goals     │
                                       │ assists   │
                                       │ cards     │
                                       │ points    │
                                       └───────────┘
```

---

## 🎮 How It Works

```
 ┌─────┐     ┌─────────┐     ┌───────────┐     ┌──────────┐
 │Sign │     │ Browse  │     │  Build    │     │  Watch   │
 │ Up  │────▶│ Matches │────▶│  Team     │────▶│  Live    │
 └─────┘     └─────────┘     └───────────┘     └──────────┘
                                                     │
 ┌─────────┐     ┌──────────┐     ┌───────────┐     │
 │ Compete │◀────│ Climb    │◀────│  Earn     │◀────┘
 │ Leagues │     │ Rankings │     │  Points   │
 └─────────┘     └──────────┘     └───────────┘
```

1. **Sign Up** → Create your account with email or Google OAuth
2. **Browse Matches** → See all 48 WC 2026 group stage fixtures with countdown timers
3. **Build Your Team** → Select 11 players on the pitch view (budget: 100 credits)
4. **Pick Captain (2×) & Vice-Captain (1.5×)** → Strategic multipliers
5. **Watch Live** → Real-time scores, events, and fantasy points via Socket.IO
6. **Earn Points** → Goal (+10), Assist (+5), Clean Sheet (+4), Cards (-2/-5)
7. **Climb Rankings** → Global leaderboard + per-league leaderboards
8. **Compete in Leagues** → Create private leagues, invite friends with 6-char codes

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org))
- **PostgreSQL** database (free option: [Neon.tech](https://neon.tech))

### 1. Clone the Repository

```bash
git clone https://github.com/PragatiDevaliya/world-cup-fantasy-2026.git
cd world-cup-fantasy-2026
```

### 2. Backend Setup

```bash
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env → Add your DATABASE_URL (see Database Setup below)
```

### 3. Database Setup

**Option A: Free Cloud Database (Recommended)**
1. Sign up at [neon.tech](https://neon.tech) (free, no credit card)
2. Create a new project → Copy the connection string
3. Paste into `backend/.env`:
```env
DATABASE_URL=postgresql://neondb_owner:xxxxx@ep-xxx.aws.neon.tech/neondb?sslmode=require
```

**Option B: Local PostgreSQL**
```sql
CREATE DATABASE wcf2026;
```
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/wcf2026
```

### 4. Run Migrations & Seed Data

```bash
cd backend
npm run db:migrate    # Creates all 10 tables
npm run db:seed       # Seeds 48 matches + 225 players + demo accounts
```

### 5. Frontend Setup

```bash
cd ../frontend
npm install
```

### 6. Launch the App

```bash
# Terminal 1 — Backend API
cd backend && npm run dev     # → http://localhost:4000

# Terminal 2 — Frontend App
cd frontend && npm run dev    # → http://localhost:3000
```

### 7. Login & Play! 🎉

Open **http://localhost:3000** and use these seeded accounts:

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@worldcupfantasy.com` | `Admin@2026!` |
| **Demo User** | `demo@worldcupfantasy.com` | `Demo@2026!` |

---

## 📁 Project Structure

```
world-cup-fantasy-2026/
│
├── 📦 backend/                    Node.js + Express API
│   ├── prisma/
│   │   ├── schema.prisma          10 models, 3 enums
│   │   └── seed.ts                48 matches + 225 players
│   ├── src/
│   │   ├── server.ts              Express + CORS + Socket.IO + Cron
│   │   ├── lib/prisma.ts          PrismaClient singleton
│   │   ├── auth/jwt.ts            JWT + Google OAuth strategies
│   │   ├── controllers/           7 REST controllers
│   │   │   ├── auth.controller
│   │   │   ├── league.controller
│   │   │   ├── match.controller
│   │   │   ├── player.controller
│   │   │   ├── team.controller
│   │   │   ├── leaderboard.controller
│   │   │   └── admin.controller
│   │   ├── services/
│   │   │   ├── scoringEngine      Fantasy points calculator
│   │   │   └── footballApi        Football-Data.org integration
│   │   ├── middleware/
│   │   │   ├── auth               JWT guard, admin check
│   │   │   ├── validators         express-validator chains
│   │   │   ├── rateLimit          Request throttling
│   │   │   └── errorHandler       Global error handler
│   │   ├── sockets/               Socket.IO event emitters
│   │   └── routes/                7 route definitions
│   ├── package.json
│   └── tsconfig.json
│
├── 🎨 frontend/                   Next.js 15 + React 19
│   ├── public/
│   │   ├── manifest.json          PWA configuration
│   │   ├── favicon.svg            App favicon
│   │   └── icons/icon.svg         PWA install icon
│   ├── src/
│   │   ├── app/                   13 pages (App Router)
│   │   │   ├── page.tsx           Splash screen
│   │   │   ├── login/             Email + Google OAuth
│   │   │   ├── signup/            Registration
│   │   │   ├── dashboard/         Home with live matches
│   │   │   ├── matches/           Match listing + detail
│   │   │   ├── team-builder/      Pitch view team builder
│   │   │   ├── leagues/           Create, join, manage
│   │   │   ├── leaderboard/       Global rankings
│   │   │   ├── profile/           User settings
│   │   │   └── admin/             Admin dashboard
│   │   ├── components/            Reusable UI components
│   │   ├── context/               Auth + Socket providers
│   │   ├── hooks/                 Custom React hooks
│   │   ├── lib/                   API client, utils, socket
│   │   └── types/                 TypeScript interfaces
│   ├── tailwind.config.ts         Custom design system
│   └── package.json
│
├── 📖 docs/screenshots/           App screenshots
└── 📋 README.md                   You are here!
```

---

## ⚽ Scoring System

| Event | Points | Applies To |
|:---|:---:|:---|
| ⚽ Goal Scored | **+10** | All players |
| 🅰️ Assist | **+5** | All players |
| 🧤 Clean Sheet | **+4** | GK & DEF only |
| 🟨 Yellow Card | **-2** | All players |
| 🟥 Red Card | **-5** | All players |
| ❌ Penalty Miss | **-4** | All players |
| 👑 Captain Bonus | **×2.0** | Captain pick |
| ⭐ Vice-Captain Bonus | **×1.5** | Vice-Captain pick |

---

## 🔌 API Reference

<details>
<summary><strong>Authentication</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ❌ | Create account |
| `POST` | `/api/auth/login` | ❌ | Login with email/password |
| `GET` | `/api/auth/me` | ✅ | Get current user |
| `PUT` | `/api/auth/profile` | ✅ | Update profile |
| `GET` | `/api/auth/google` | ❌ | Google OAuth redirect |
| `GET` | `/api/auth/google/callback` | ❌ | Google OAuth callback |

</details>

<details>
<summary><strong>Matches</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/matches` | 🔓 | All matches (filterable) |
| `GET` | `/api/matches/live` | 🔓 | Live matches only |
| `GET` | `/api/matches/upcoming` | 🔓 | Upcoming matches |
| `GET` | `/api/matches/:id` | 🔓 | Match detail with events |

</details>

<details>
<summary><strong>Teams</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/teams` | ✅ | Save fantasy team |
| `GET` | `/api/teams/:matchId` | ✅ | Get my team for match |

</details>

<details>
<summary><strong>Leagues</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/leagues` | ✅ | My leagues |
| `POST` | `/api/leagues` | ✅ | Create league |
| `POST` | `/api/leagues/join` | ✅ | Join via invite code |
| `GET` | `/api/leagues/:id` | ✅ | League detail |
| `DELETE` | `/api/leagues/:id` | ✅ | Delete league (owner) |

</details>

<details>
<summary><strong>Leaderboard</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/leaderboard/global` | 🔓 | Global rankings |
| `GET` | `/api/leaderboard/match/:id` | 🔓 | Match rankings |
| `GET` | `/api/leaderboard/league/:id` | 🔓 | League rankings |

</details>

<details>
<summary><strong>Admin</strong></summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/stats` | 🔒 | Platform statistics |
| `PATCH` | `/api/admin/matches/:id/score` | 🔒 | Update match score |
| `POST` | `/api/admin/matches/:id/events` | 🔒 | Add match event |
| `PATCH` | `/api/admin/players/:id` | 🔒 | Update player |
| `POST` | `/api/admin/matches/:id/recalculate` | 🔒 | Recalculate points |

</details>

> 🔓 = Optional auth (public) · ✅ = Requires login · 🔒 = Admin only

---

## 🔒 Security

| Feature | Implementation |
|---|---|
| **Authentication** | JWT tokens with 7-day expiry |
| **Password Hashing** | bcryptjs (12 salt rounds) |
| **Rate Limiting** | 300 req/15min global, 20 req/15min auth |
| **Input Validation** | express-validator on all mutating endpoints |
| **CORS** | Restricted to client origin |
| **SQL Injection** | Prevented via Prisma ORM parameterized queries |
| **XSS** | React auto-escaping + Next.js security headers |
| **Secrets** | Environment variables, never committed to git |

---

## 🗺 Roadmap

### ✅ Phase 1 — Foundation (Complete)
- [x] User authentication (JWT + Google OAuth)
- [x] Database schema with 10 models
- [x] 48 WC 2026 group stage matches seeded
- [x] 225+ players across all 48 nations
- [x] REST API with 30+ endpoints
- [x] PrismaClient singleton for production stability

### ✅ Phase 2 — Core Gameplay (Complete)
- [x] Dream11-style team builder with pitch view
- [x] 100-credit budget system
- [x] Captain (2×) & Vice-Captain (1.5×) multipliers
- [x] Fantasy scoring engine (goals, assists, cards, clean sheets)
- [x] Private leagues with invite codes (max 10 members)
- [x] Global + per-league + per-match leaderboards

### ✅ Phase 3 — Real-Time & Admin (Complete)
- [x] Socket.IO live score updates
- [x] Real-time fantasy point tracking
- [x] Admin dashboard for match/event/player management
- [x] Football-Data.org API integration for auto-sync
- [x] Input validation with express-validator
- [x] PWA configuration with manifest and icons

### 🔮 Phase 4 — Future Enhancements
- [ ] Knockout stage matches (Round of 32 → Final)
- [ ] Web Push Notifications (VAPID)
- [ ] Player performance analytics & charts
- [ ] Head-to-head matchups between friends
- [ ] Transfer market between matches
- [ ] Season history and achievements
- [ ] Dark/Light theme toggle
- [ ] Deployment to Vercel + Railway

---

## 🧪 Development

### Backend Commands
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Compile TypeScript
npm run start        # Start production server
npm run db:migrate   # Run Prisma migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio (DB GUI)
```

### Frontend Commands
```bash
npm run dev          # Start Next.js dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
```

### Environment Variables

<details>
<summary><strong>Backend (.env)</strong></summary>

```env
DATABASE_URL=postgresql://user:pass@host/db
JWT_SECRET=your_64_char_secret
JWT_EXPIRES_IN=7d
PORT=4000
CLIENT_URL=http://localhost:3000
API_URL=http://localhost:4000
ADMIN_EMAIL=admin@worldcupfantasy.com
NODE_ENV=development

# Optional
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FOOTBALL_API_KEY=
```

</details>

<details>
<summary><strong>Frontend (.env.local)</strong></summary>

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
```

</details>

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for FIFA World Cup 2026**

⚽ _May the best fantasy manager win!_ 🏆

[⬆ Back to Top](#-world-cup-fantasy-2026)

</div>
