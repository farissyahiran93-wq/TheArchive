# TRACE 2.0 — 3 November 2026

The owner's implementation request is pinned verbatim in
`docs/sources/trace2-2026-11-03/IMPLEMENTATION_REQUEST.txt`. The supplied HTML is
a visual reference, not a source of story facts. GREYHAVEN remains the game
title; the existing `archive` app ID remains TRACE.

## Active runtime

`App` → `Chapter1Investigation` → `ArchiveOrigin` / `ConversationWorkspace`
now renders `TraceApp`. These are the installed origin and conversation-based
Version History paths. The earlier `VersionHistory.tsx`, structural previews,
recovered-phone subsystems and later authored scenes retain their routes.

TRACE has Workspace, Tracker, Decryptor, Vault and Activity navigation. It
contains recovered reference metadata and local analysis. The six public
article paragraphs and publisher policy remain in the Bulletin browser.
Workspace and Vault offer links back to that browser. Optional corrections
requests, recipient-scoped conversations and the manual next lead remain on
their existing reducers.

An article opened from the Home widget uses the app shell and its Home gesture
returns to the launcher. It does not retain Home's Exit-game gesture or wallpaper
status-bar treatment while the browser is open.

## Receipts and gates

| Action or state | Meaning |
| --- | --- |
| `OPEN-S04-ARTICLE-ATTACHMENT` in the event ledger **and** Sophie's matching delivered article attachment | Populates the Home Bulletin widget. Opening Sophie, generic notifications or an unrelated article-read flag do not activate it. |
| Installed TRACE + an existing available index guard | Allows local reference tracing. Installation still requires reviewing the package and a separate Install action. |
| `chapter1.trace.scan.status: complete` | Presentation complete only. No source inspection, evidence, relationship change, disclosure, notification or chapter completion. |
| Explicit **VIEW FINDINGS** | Inspects the existing index through its reducers, retains `EV-INDEX-GB-041`, and, after a completed local scan, saves `EV-TRACE-REF-001`. |
| `EV-TRACE-REF-001` | Private, unverified local analysis: the `GB-ARTICLE-001` ID matches; origin/capture time are unverified; original body unavailable; revision not verified. |
| Replay / repeated inspection | Never replaces a receipt or collection time, duplicates a followup deadline, sends a chat line or awards NPC knowledge. |
| Decryptor capability | Locked through the typed capability selector. There is no eligible authored payload or decoded content in this change. |

The initial five-stage scan lasts 5.6 seconds, with Skip after 0.8 seconds.
Reduced motion presents immediate results, still requiring explicit findings
inspection. A single elapsed-time presentation clock checkpoints on navigation,
visibility changes, page exit and native app suspension. Returning offers
Resume; hidden time does not advance a paused scan. Native and keyboard Back
use the existing phone-back stack. Tab selection and per-view scroll positions
are saved.

## Conversation and save compatibility

For an aligned save entering Version History for the first time, an existing
`article-inspected` receipt seeds its `public` read flag. The new
`traceUiRevision: 2026-11-03` entry states that the article was already seen,
offers the index attachment, and uses cooperative, skeptical and evidence-first
C01 choices. Each choice still requires persisted selection and Send. The main
choice IDs, branch IDs and source discussion/conclusion gates remain intact.
Metadata inspection, policy reading, comparison limitations and authored
conclusions are not granted by the scan.

The early return for an existing Version History state preserves already-started
graphs and checkpoints. Historical delivered text is never rewritten. Earlier
aligned saves can use their real read receipt at a new Version History entry;
the earlier introduction revision is not required. No tag is injected into an
already-started conversation.

The new TRACE presentation field is optional and validated in schema v1. Old
saves need no destructive migration. The existing IndexedDB database, pending
save protocol, legacy localStorage key, evidence IDs, Android application ID,
signing and origin remain intact. No APK packaging, commit or push is included.

## Changed files

| Files | Purpose |
| --- | --- |
| `src/ui/TraceApp.tsx`, `src/ui/trace-app.css`, `src/ui/useTraceScan.ts` | Playable TRACE shell, tabs, findings graph, local terminal presentation and lifecycle handling. |
| `src/content/traceReference.ts`, `src/game/trace.ts` | Canonical reference presentation, conservative findings, pure presentation selector and guarded reducer. |
| `src/ui/HomeScreen.tsx`, `src/ui/bulletin-widget.css`, `src/App.tsx`, `src/ui/CaseNavigation.tsx` | Receipt-driven Bulletin widget and real browser/Tracker navigation. |
| `src/ui/VersionHistoryConversation.tsx` | Delegate the active workspaces to TRACE; index attachment opens Tracker without implicit inspection. |
| `src/content/actIRegistry.ts`, `src/game/archiveOrigin.ts` | Pinned already-read entry and distinct C01 replies; inherit the real read receipt. |
| `src/content/traceTools.ts` | Typed, locked Decryptor capability. |
| `src/game/chapter1.ts`, `src/game/types.ts`, `src/game/engine.ts`, `src/game/store.ts` | Optional presentation state, revision validation and existing store integration. |
| `src/game/trace.test.ts`, `tests/e2e/trace2.spec.ts` | New receipt, animation/inspection separation, replay, save/resume, source-boundary and responsive browser coverage. |
| `tests/helpers/versionHistoryConversation.ts` | Explicitly retain the historical graph in historical regression fixtures. |
| `tests/e2e/version-history-conversation.spec.ts`, `tests/e2e/guidance.spec.ts`, `src/game/episode01Presentation.test.tsx` | Existing tests follow the new explicit inspection UI and navigation context. |
| This report and `docs/sources/trace2-2026-11-03/IMPLEMENTATION_REQUEST.txt` | Implementation record and pinned owner request. |

## Verification

Browser emulation covers 320, 375 and 430 px,
light/dark phone preferences and reduced motion. Physical Android device testing
is not available in this environment. The production build retains its existing
large-client-chunk advisory.

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS; no warnings |
| `npm test -- --maxWorkers=2 --reporter=dot` | PASS: 1,449 tests in 58 files |
| `npm run build` | PASS; existing large-client-chunk advisory |
| `npm run test:e2e -- tests/e2e/trace2.spec.ts tests/e2e/version-history-conversation.spec.ts tests/e2e/guidance.spec.ts --workers=4 --reporter=line --output=artifacts/trace2-acceptance` | PASS: 12/12, including existing policy/inquiry/social/downstream handoff scenarios |
| `npm run test:e2e -- tests/e2e/trace2.spec.ts --workers=1 --reporter=line --output=artifacts/trace2-visual-qa` | PASS: 4/4; final screenshots captured with entrance animations completed |
| `npm run test:e2e -- --workers=4 --reporter=line --output=artifacts/trace2-final-regression` with `PLAYWRIGHT_PORT=4187` | PASS: 180/180 in 16.4 minutes |
| `npm run test:e2e -- tests/e2e/trace2.spec.ts tests/e2e/phone-polish.spec.ts tests/e2e/ui01.spec.ts --workers=4 --reporter=line --output=artifacts/trace2-post-shell-fix` with `PLAYWRIGHT_PORT=4194` | PASS: 12/12 in 3.0 minutes, after the final browser Home-shell correction |

After the full suite passed, an added widget-to-browser assertion caught the
Home-shell issue described above. The correction changes only the shell's
`isHome` and `surface` projections while the browser is open. The final 12-test
navigation run includes that assertion and existing phone/desktop navigation.
All 1,449 unit tests, typecheck, lint and production build passed again after
the correction. The full 180-scenario suite was not repeated after this final
two-projection correction.

The full regression used its own port so its server was independent of focused
test runs. An earlier overlapping run lost its shared
server when the focused run finished and was stopped; it is not counted as a
completed validation. The initial sandbox browser launch returned `spawn EPERM`;
the successful browser runs used the approved browser-launch execution context.

Screenshots at `artifacts/trace2/screenshots`:

- `home-empty-375.png`: inert brand-only widget before the real link.
- `home-link-375.png`: authored headline after Sophie delivers the link.
- `workspace-430.png`: installed TRACE workspace.
- `tracker-320.png`: reference scan in progress.
- `decryptor-320.png`: no encrypted payload; unavailable action.

Final screenshots are copied from the post-correction run. Two tracked
historical screenshots regenerated by the broad suite were restored to their
exact pre-task bytes; copies of the generated images remain under
`artifacts/trace2/retained-regression-screenshots`. Superseded partial-run output
folders were removed; their logs remain available.

Detailed logs are in `artifacts/trace2-unit-final.log`,
`artifacts/trace2-build-final.log`, `artifacts/trace2-acceptance.log`,
`artifacts/trace2-final-regression.log` and
`artifacts/trace2-post-shell-fix.log`.
