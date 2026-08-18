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

## Current Implementation Status

- Boilerplate complete: Expo, TypeScript, navigation, state/query setup, shared UI primitives, and placeholder feature screens are in place.
- Phase 1 typed foundation added: wallet, suppliers, payments, documents, cases, account/profile, transaction statuses, and card capability types now exist with typed API service boundaries.
- Phase 2 auth/provisioning/app-gating foundation added: placeholder session state, account readiness state, centralized app gate calculation, and status routing for onboarding, compliance review, provisioning, and wallet assignment are in place.
- Phase 3 dashboard/wallet/transfer foundation added: dashboard sections, wallet overview, transfer direction, card-to-wallet, wallet-to-card, transfer summary, and transfer result placeholders are navigable with typed mock data.
- Phase 4 card issuance/card management foundation added: UnionPay card list/details, card request shell, placeholder actions, card transactions, and CMS-sensitive-data notices are in place.
- Phase 5 supplier/payment-flow foundation added: supplier beneficiary management, QR/bank-account payment entry, payment details, funding source, summary, authentication, and result placeholders are navigable with typed mock data.
- Phase 6 document/transaction tracking foundation added: compliance document list/details/upload/link/status placeholders and richer transaction list/details/timeline/document sections are in place.
- Phase 7 case/account foundation added: support case list/details/category/evidence/additional-info placeholders and account profile/security/logout placeholders are in place.
- Real API integration is pending confirmed Kardit Core backend contracts, endpoint paths, request/response shapes, payment authentication, document upload transport, and idempotency rules.
- Real authentication and onboarding status APIs are pending backend contracts; current sign-in and registration remain demo placeholders.
- Real wallet APIs, transfer validation, transfer limits, fees, exchange rates, submission, idempotency, and balance updates are pending backend contracts.
- Real card APIs, issuance/add-card rules, CMS sensitive-data retrieval, card funding, PIN reset, freeze/unfreeze, termination, and card transaction contracts are pending backend confirmation.
- Real QR scanning, payment authentication, supplier validation, bank-account payment APIs, document requirements, provider integrations, and payment submission are pending backend contracts.
- Real document upload, file preview, transaction polling, compliance decisioning, payment retry, and document requirement rules are pending backend contracts.
- Real support workflows, case evidence upload, account APIs, credential reset, logout revocation, and session management are pending backend contracts.
- PRD UI implementation is pending design confirmation; current wallet, supplier, payment, case, account, and transaction detail screens are PRD-ready placeholders only.
