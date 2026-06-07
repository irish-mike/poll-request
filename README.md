# Poll Request

Poll Request is a full-stack polling application. Create a poll with up to five options, share the link with your team, and watch the votes come in. Each user can vote once, and results are displayed as live progress bars.

---

## Quick Start

### Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose

### Run with Docker

```bash
git clone https://github.com/irish-mike/poll-request.git
cd poll-request
docker-compose up
```

The client is available at `http://localhost:5173` and the API at `http://localhost:3000`.

### Initialise and seed the database

Once the containers are running, open a second terminal and run:

```bash
# Initialise the schema
docker-compose exec server npm run db:init

# Seed with sample polls and votes
docker-compose exec server npm run db:seed
```

The seed creates two sample polls with randomised votes so there is something to look at straight away.

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, React Bootstrap, React Hook Form, Zod |
| Backend | Node.js, Express 5, TypeScript, Better-SQLite3 |
| Database | SQLite |
| Tooling | Docker, ESLint, Prettier, Vitest |

---

## Project Structure

```
poll-request/
├── client/                        # React + Vite frontend
│   └── src/
│       ├── components/            # Shared UI components (PageHeader, BackLink)
│       ├── pages/                 # Route-level page components
│       ├── features/
│       │   └── polls/
│       │       ├── api/           # Fetch wrappers
│       │       ├── components/    # Poll-specific UI (PollCard, PollVote, PollResults)
│       │       ├── hooks/         # usePoll, usePolls
│       │       ├── model/         # TypeScript types and Zod schemas
│       │       ├── style/         # Feature CSS
│       │       └── utils/         # formatPollRef, pollUrl, etc.
│       └── utils/                 # Shared utilities (browser, math)
│
├── server/                        # Express API
│   └── src/
│       ├── db/                    # Schema init, seeding, db connection
│       ├── features/
│       │   └── polls/
│       │       ├── routes.ts      # HTTP handlers (thin)
│       │       ├── service.ts     # Validation, normalisation, orchestration
│       │       ├── repository.ts  # SQL queries
│       │       ├── validation.ts  # Request guards
│       │       └── types.ts       # Shared interfaces
│       └── utils/                 # Shared validation helpers
│
├── docker-compose.yml             # Development
├── docker-compose.prod.yml        # Production (server only)
└── .env.example                   # Environment variable reference
```

## API

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/polls` | List all polls |
| `POST` | `/api/polls` | Create a poll |
| `GET` | `/api/polls/:id` | Get a poll with options and vote counts. Pass `?user_token=` to include `has_voted`. |
| `POST` | `/api/polls/:id/votes` | Cast a vote |

## Database Schema

Three tables with soft-delete (`deleted_at`) and Unix epoch timestamps.

- **polls** — question, timestamps
- **options** — poll_id, content
- **votes** — poll_id, option_id, user_token — unique on `(poll_id, user_token)` to prevent duplicate votes

User identity is a UUID generated in the browser on first vote and stored in `localStorage`. No authentication is required.
