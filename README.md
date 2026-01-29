# ionecenter (MVP)

A full‑stack B2B marketplace MVP inspired by modern commerce platforms.

## Tech Stack (MVP)
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** NestJS (Node.js), GraphQL (Apollo)
- **Database:** Neon (PostgreSQL)
- **Auth:** Auth.js / NextAuth (planned)
- **DevOps:** GitHub Actions, Docker (optional)

## Monorepo Structure
```
apps/
  web/        # Next.js frontend
  api/        # NestJS backend (GraphQL)
packages/
  shared/     # shared types/utils (planned)
```

## Getting Started
1. Install dependencies (recommended: pnpm):
   ```bash
   pnpm install
   ```
2. Create `.env` files (see `.env.example`).
3. Run dev servers:
   ```bash
   pnpm dev
   ```

## Environment Variables
See `.env.example` for required variables.

## Notes
- Payments are mocked for the MVP.
- Neon provides managed PostgreSQL (free tier).