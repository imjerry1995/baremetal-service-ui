# Baremetal Service UI

A Next.js web UI for managing and querying baremetal hosts.

## Prerequisites

- Node.js >= 18
- npm

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd baremetal-service-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` as needed:

| Variable | Description | Default |
|---|---|---|
| `BAREMETAL_SERVICE_API_URL` | Base URL of the baremetal API | `http://localhost:8000` |
| `NEXT_PUBLIC_USE_MOCK` | Use mock data instead of real API | `true` |

> Set `NEXT_PUBLIC_USE_MOCK=true` during local development to use generated mock data without needing the API server running.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment Files

| File | Purpose |
|---|---|
| `.env.local` | Local development overrides (not committed) |
| `.env.production` | Production environment values (not committed) |
| `.env.example` | Template showing all required variables (committed) |
