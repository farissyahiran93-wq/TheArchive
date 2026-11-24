# GREYHAVEN

TheArchive is the repository for GREYHAVEN. Chapter 1 — The First Trace is the current playable campaign. TRACE is the in-game recovery application.

[Official Chapter 1 flow](docs/CHAPTER_1_CANONICAL_FLOW.md) describes the ten scenes, transitions and save rules. The campaign registry defines five chapters and ten scenes each. Chapters 2–5 remain unavailable for play.

## Run

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Playwright's compatibility fixtures cover older saved formats and run in the explicit `compatibility-qa` mode. Use the normal development server or production build to review the canonical campaign. Older implementation materials under `docs/` are historical references.
