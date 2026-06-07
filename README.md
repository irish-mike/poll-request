# Poll Request

Live version: https://poll-request.michaelgrinnell.com/

Poll Request is a poll and voting app for opinionated developers, which is to say: all developers.

Use it to settle the important debates once and for all: tabs or spaces, TypeScript or JavaScript, dark mode or wrong mode, and whether “just one quick refactor” has ever actually been quick.

Users can create polls with up to five options, share a request link, vote on other polls, view results as live progress bars, and delete polls they created.

---

## Quick Start

### Prerequisites

* Docker

### Run locally with Docker

```bash
git clone https://github.com/irish-mike/poll-request.git
cd poll-request
docker compose up --build
```

The app will be available at:

| Service | URL                     |
|---------|-------------------------|
| Client  | `http://localhost:5173` |
| API     | `http://localhost:3000` |

### Seed the database

```bash
docker compose exec server npm run db:seed
```

---

## Production

Production deployment is handled by GitHub Actions on pushes to `main`.

The workflow:

1. Validates the server with install, lint, test, and build.
2. Validates the client with install, lint, test, and build.
3. Builds the frontend as static files.
4. Deploys the static frontend.
5. Builds and restarts the backend API container using `docker-compose.prod.yml`.

In production, the frontend is built and served statically. Docker only runs the server API.

### Production environment variables

Create a `.env.production` file based on `.env.example`.

```env
APP_DOMAIN=example.com
APP_NAME=poll-request

SERVER_HOST=0.0.0.0
SERVER_CONTAINER_PORT=3000
SERVER_HOST_PORT=3000
SERVER_HEALTH_PATH=/api/health

NODE_ENV=production
```

---

## Useful Commands

### Root

```bash
npm run format
npm run format:check
```

### Client

```bash
cd client
npm run dev
npm run build
npm run lint
npm test
```

### Server

```bash
cd server
npm run dev
npm run build
npm run lint
npm test
npm run db:seed
```

---

## Stack

| Layer    | Technology                                                     |
|----------|----------------------------------------------------------------|
| Frontend | React, Vite, TypeScript, React Bootstrap, React Hook Form, Zod |
| Backend  | Node.js, Express, TypeScript, Better-SQLite3                   |
| Database | SQLite                                                         |
| Tooling  | Docker, ESLint, Prettier, Vitest                               |

---

## Project Structure

```text
poll-request/
├── client/                        # React + Vite frontend
│   └── src/
│       ├── components/            # Shared UI components
│       ├── pages/                 # Route-level page components
│       ├── features/
│       │   └── polls/
│       │       ├── api/           # Fetch wrappers and query keys
│       │       ├── components/    # Poll-specific UI
│       │       ├── hooks/         # Poll queries and mutations
│       │       ├── model/         # Types and schemas
│       │       ├── style/         # Feature CSS
│       │       └── utils/         # Poll helpers
│       └── utils/                 # Shared frontend utilities
│
├── server/                        # Express API
│   └── src/
│       ├── db/                    # Schema, seed, and db connection
│       ├── features/
│       │   └── polls/
│       │       ├── routes.ts      # HTTP handlers
│       │       ├── service.ts     # Validation, normalisation, orchestration
│       │       ├── repository.ts  # SQL queries
│       │       ├── validation.ts  # Request guards
│       │       └── types.ts       # Feature types
│       └── utils/                 # Shared backend utilities
│
├── docker-compose.yml             # Development
├── docker-compose.prod.yml        # Production server API
└── .env.example                   # Environment variable reference
```

---

## API

| Method   | Path                   | Description                                                       |
|----------|------------------------|-------------------------------------------------------------------|
| `GET`    | `/api/health`          | Health check                                                      |
| `GET`    | `/api/polls`           | List all polls                                                    |
| `POST`   | `/api/polls`           | Create a poll                                                     |
| `GET`    | `/api/polls/:id`       | Get a poll with options, vote counts, `has_voted`, and `is_owner` |
| `POST`   | `/api/polls/:id/votes` | Cast a vote                                                       |
| `DELETE` | `/api/polls/:id`       | Delete a poll created by the current user                         |

---

## Database Schema

Poll Request uses SQLite with soft-delete support through `deleted_at` columns and Unix epoch timestamps.

* **polls** — question, owner token, timestamps, soft-delete marker
* **options** — poll ID, option content, timestamps, soft-delete marker
* **votes** — poll ID, option ID, user token, timestamps, soft-delete marker

Votes are unique per poll and user token, preventing the same user from voting more than once on a poll.

User identity is handled with a UUID generated in the browser and stored in `localStorage`. There is no login system or authentication.
