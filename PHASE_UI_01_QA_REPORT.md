# Phase UI-01 QA and acceptance report

**Scope:** browser implementation of a fictional Greyhaven phone shell over Phase 00's non-canonical fixture. No Episode 01 content, story gate, save schema, legacy save or native Android project was changed. Six user-supplied PNG references were accessible and visually reviewed; the referenced videos were not supplied and were **not inspected**.

## Baseline and execution record

At preflight, `D:\Web app\The Archive\reboot` existed with React/Vite/Zustand/IndexedDB and 2 Phase 00 browser tests. The root Git tree already had many tracked legacy deletions and `reboot/` was untracked; this task did not restore or alter those legacy paths. Initial typecheck and lint passed. Initial sandboxed unit execution stopped before tests with Windows `spawn EPERM` from Vite's resolver; rerunning the same command with permitted unsandboxed execution passed. The first new E2E run had one **test-navigation** failure because Settings is on home page two; the test was corrected and the entire suite rerun.

| Final command | Actual result |
|---|---|
| `npm run typecheck` | **PASS** — TypeScript project build, exit 0. |
| `npm run lint` | **PASS** — oxlint, exit 0, no reported warnings. |
| `npm test` | **PASS** — 2 files, 7 unit tests, exit 0 (unsandboxed retry after preflight EPERM). |
| `npm run build` | **PASS** — Vite 8.3.4, 1,917 modules; final JS 273.82 kB before gzip / 86.19 kB gzip; CSS 19.23 kB before gzip / 5.18 kB gzip. |
| `npm run test:e2e` | **PASS** — 7 Chrome/Playwright tests, 17.4 seconds, exit 0. Final rerun after scroll assertions. |

## Browser acceptance matrix

| Viewport / environment | Exercised | Result |
|---|---|---|
| 320×720, mobile Chrome emulation | Home → inbox → thread, no page-wide horizontal overflow; rendered chat screenshot. | PASS |
| 375×812, mobile Chrome emulation | Same navigation/overflow; rendered chat screenshot. | PASS |
| 390×844, mobile Chrome emulation | Home, inbox, light chat, selected-choice Send, completed thread, Settings dark selection, dark chat, reload persistence, legacy-key sentinel. | PASS |
| 430×932, mobile Chrome emulation | Home → inbox → thread, no page-wide horizontal overflow; rendered chat screenshot. | PASS |
| 1280×900 desktop Chrome | Home → fictional Search → Home; screenshot. | PASS |
| 390×560 resized focused composer | Reply filter focused, selected choice and Send visible in shortened viewport; screenshot. | PASS for simulated viewport resize; **not** a physical software keyboard test. |
| Real Android/Capacitor device | Safe areas, native status/nav bars, physical keyboard, hardware back, TalkBack, background/kill/restart. | **NOT TESTED** — no device run or APK. |

The foundation E2E verifies the player name in the fixture, no player bubble until **Send**, subsequent NPC order, history after reload, Search/Maps fixtures, an incoming message preserving older-history scroll position until the user uses New Messages, and no horizontal overflow. UI-01 E2E additionally checks that the final incoming bubble is in the viewport with the thread pinned near its bottom, theme persistence, no duplicate fixture messages after reload, read indicator clearing on the inbox, hidden Archive/Mail apps before story access, and that the legacy `the-archive:game-save:v1` localStorage sentinel survives. Static contrast calculation: light outgoing white 5.56:1; dark outgoing white 4.70:1; light incoming 12.36:1; dark incoming 10.27:1. Automated semantics and real screen-reader behavior remain separate tasks.

## Actual rendered screenshot evidence

All images below were captured by Playwright from the running Vite app in the final passing suite. Browser mobile emulation uses device pixel scaling, so PNG dimensions can exceed their named CSS viewport. The focused-composer image shows a resized **browser viewport**, not an Android keyboard.

| View | Evidence |
|---|---|
| Home 390×844 | [home-390x844.png](qa/ui-01/home-390x844.png) |
| Messages inbox 390×844 | [inbox-390x844.png](qa/ui-01/inbox-390x844.png) |
| Light conversation 390×844 | [light-chat-390x844.png](qa/ui-01/light-chat-390x844.png) |
| Dark conversation 390×844 | [dark-chat-390x844.png](qa/ui-01/dark-chat-390x844.png) |
| Settings dark 390×844 | [settings-dark-390x844.png](qa/ui-01/settings-dark-390x844.png) |
| Focused composer in 390×560 resized viewport | [focused-composer-resized-390x560.png](qa/ui-01/focused-composer-resized-390x560.png) |
| Narrow chat 320×720 / 375×812 / 430×932 | [320](qa/ui-01/chat-320x720.png), [375](qa/ui-01/chat-375x812.png), [430](qa/ui-01/chat-430x932.png) |
| Desktop home 1280×900 | [home-desktop-1280x900.png](qa/ui-01/home-desktop-1280x900.png) |

## Quality assessment: 82/100 for the browser fixture UI

| Criterion | Max | Score | Evidence / deduction |
|---|---:|---:|---|
| Original visual hierarchy | 30 | 26 | Original vector wallpaper, widgets, dock, coherent light/dark screens and viewed screenshots; final illustration can improve. |
| Messenger behavior | 25 | 22 | State-driven delivery/typing, explicit Send, date/read states, scrolling tests; only one fixture thread and no real authored media. |
| Navigation and app cohesion | 20 | 18 | Two home pages, working available apps, settings/notes/calendar, story gate hidden; hardware back untested. |
| Accessibility and responsive fit | 15 | 10 | Focus, semantic controls, contrast and browser widths checked; TalkBack/physical IME unavailable. |
| Verification/platform confidence | 10 | 6 | Automated browser/build suite passes; Android WebView/device lifecycle not run. |
| **Total** | **100** | **82** | Good browser fixture UI; **not** a full-game or Android release rating. |

## Remaining issues and next step

The one-thread inbox is intentionally sparse because no canonical conversations are authored. Phase 02 must provide thread/recipient schemas and explicit permissions rather than filling the screen with invented case dialogue. Test the native WebView on an Android device, including physical keyboard overlap, system bars, hardware back, screen reader, text scaling and abrupt app restart. That device pass and the separate narrative Phase 02 gate are both required before production acceptance. No deployment or APK packaging occurred.
