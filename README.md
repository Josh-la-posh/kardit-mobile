# Kardit Importer Mobile

React Native TypeScript boilerplate for the future Kardit Importer-facing mobile app. This app is intentionally separate from the Affiliate web application and currently contains scaffolded screens, typed navigation, service modules, environment config, state/query setup, and reusable UI primitives.

This is a foundation only. Final PRD decisions, UI design, backend contracts, onboarding rules, card issuance rules, funding behavior, and sensitive card data handling still need confirmation before production logic is added.

## Setup

```bash
cd apps/importer-mobile
npm install
npm run start
```

If this repository is cloned directly as `kardit-mobile`, run the commands from the repository root instead. `npm run start` runs `expo start`. Use the Expo CLI output to launch Android, iOS, or web depending on your local setup.

Copy `.env.example` to `.env` and set:

```bash
EXPO_PUBLIC_API_BASE_URL=https://your-api-host
EXPO_PUBLIC_ENVIRONMENT=development
```

## Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
npm run typecheck
npm run lint
npm run format
```

From the repository root, the verification commands are:

```bash
npm.cmd --prefix apps\importer-mobile run typecheck
npm.cmd --prefix apps\importer-mobile run lint
npm.cmd --prefix apps\importer-mobile run format
```

## Architecture

- `src/app`: App composition and providers.
- `src/navigation`: Typed root, auth, onboarding, and app navigators.
- `src/features`: Placeholder screens grouped by importer domain.
- `src/services/api`: Central API client and typed placeholder modules.
- `src/services/storage`: Auth token storage abstraction.
- `src/components`: Shared UI, form, and layout primitives.
- `src/theme`: Color, spacing, and typography tokens.

## Current Scope

No final business logic or unknown backend endpoints are implemented yet. Service functions call placeholder paths and must be reconciled with final API contracts. TODO comments mark importer-specific rules and PRD decisions that need confirmation.

Current guarded-routing behavior is intentionally minimal:

- users without a stored placeholder token see the welcome/auth flow
- users with a stored placeholder token see the main app
- onboarding gating remains a TODO until the PRD confirms status and resume rules
