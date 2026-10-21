# QA acceptance matrix

## Phase 00 automated gates

| Area | Acceptance |
|---|---|
| Type safety | `npm run typecheck` succeeds with strict TypeScript settings |
| Static analysis | `npm run lint` succeeds without warnings |
| Unit rules | No spontaneous player messages; duplicate event ticks produce one message; NPC knowledge needs a matching disclosure; future episodes remain locked |
| Save/load | IndexedDB round trip preserves identity, events, and knowledge |
| Build | `npm run build` creates production `dist` |
| Browser | Mobile setup, Send action, scheduled NPC lines, refresh resume, Search and Maps work in Chrome |
| Mobile layout | Pixel 7 and narrow viewport have no page-wide horizontal overflow; primary controls remain usable |

## Manual checks still needed

- Android hardware safe areas, gestures, text scaling, offline storage behavior, app background/kill/restart, screen readers, and thermal/performance behavior.
- Extended message-history scrolling and New Messages indicator under human interaction.
- Narrative clarity, trust, suspense, accessibility, and episode duration with players.
- Cross-browser IndexedDB quota and eviction behavior.

Only mark a gate passed after executing it. Phase 00 does not establish release quality for the full game.
