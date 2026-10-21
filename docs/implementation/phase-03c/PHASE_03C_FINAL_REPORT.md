# Phase 03C — Recovery, Save Integrity & Gate B Hardening

**Date:** 17 October 2026  
**Workspace:** `D:\Web app\The Archive\reboot`  
**Verdict:** Episode 01 remains a **browser-playable candidate for Android QA and human playtest**. **Gate B: IN PROGRESS.** No APK, physical Android test, human playtest, or release was performed in this phase.

## 1. Baseline checked

The local [Phase 03B coverage matrix](../phase-03b/03_COVERAGE_MATRIX.json), implementation report, six screenplay Acts, investigation pack, source asset, runtime and tests were inspected. Before Phase 03C edits, this workspace passed `npm run typecheck`, `npm run lint`, `npm run build`, **25/25 unit tests** and **22/22 Playwright tests**. The Phase 03B matrix lists S01–S30 and I01–I07 as connected; automated coverage of selected routes is not proof that every possible combination was played. The earlier exact-ID inventory lists **56/56 authored player-choice IDs present**; this is an inventory, not branch acceptance.

The fictional GCRO asset `docs/narrative/phase-02/assets/GCRO-EXP-20261008-041.txt` was checked directly: **2,012 bytes**, SHA-256 `887c59c42ea8b375737b78a3e79ae0d8d57da7c8698e7e21adea955136d730de`. This is an authored in-world prop, not a real agency document or signature.

## 2. Implemented recovery

| Condition | Player-facing/runtime outcome | Knowledge guard |
| --- | --- | --- |
| GCRO review delayed, refused, or office unavailable | Specific status; one recorded review request; public Search, Maps and Bulletin remain accessible | No E012, R04 or K02 generated |
| Missing, truncated, altered, unredacted, or wrong-issuer/recipient export | Actual delivered payload and envelope checked; invalid file shown as unavailable/incomplete/mismatched; correction request returns to pending review | Prior answer flags cannot bypass final byte and permission checks |
| Interrupted four-part verification | Opened pages and successful checks persist and can be resumed | No R04 until all checks and actual file pass again |
| Office later unavailable after a valid issue | Locally issued, previously verified copy and its established knowledge remain intact | No retroactive revocation or new unsupported fact |
| S30 public role card unavailable | Narrow, unknown-role finale remains reachable after a valid K02 | No operator, account owner, new action or motive inferred |

`src/game/phase03b.ts` now evaluates the **delivered `s28Payload`**, four page markers, suppression statement, lineage, issuer, recipient, spent token, byte length and SHA-256. R04 is awarded only after the final assessment passes; K02 still requires the E012/E003/E002 cited finding. A request or correction receipt is not a certified export. The negative office outcomes are controlled by a QA fixture field; production play still uses the authored normal issue, and pending review is an explicit supported state rather than an invented successful ending.

## 3. Save integrity

- Existing schema v1 and unknown v1 fields are preserved. The legacy project save key was neither read nor migrated.
- Every new save has a monotonic revision. IndexedDB writes compare the stored revision inside one read/write transaction; a stale second tab stops instead of overwriting progress.
- A same-tab `sessionStorage` journal holds the latest optimistic state until its IndexedDB write completes. On reload it replays only against the exact base revision. Concurrent hydration of identical bytes is idempotent; same-revision content differences require explicit recovery.
- The recovery screen offers a local JSON backup and an explicit reload of the stored version. When an incompatible/corrupt record and a pending journal coexist, the backup contains both. Selected unsent replies, private Board links, sent messages and receipts were exercised across save/reload.

**Limits:** The journal is session scoped; it is not a guarantee after closing a tab or losing browser storage. Backup export is present, but no player-facing import, merge or older-schema migration was added. No rollback or migration was executed against real player data. Those operations require a separate, tested restore design before release acceptance.

## 4. Branch, consent and UI coverage

The full browser suite includes social and skeptical routes; handle and anonymous tips; no early tip followed by a minimal late tip; optional Maya contact declined; private K02 versus scoped public findings; Messages declined while read-only Archive is accepted; delayed/refused/invalid GCRO states; valid K02 with unknown role status; and two-tab save conflict. S25/S26 remain optional. Player messages still require **Send**; GCRO file contents stay in the request session. Public status does not name an individual operator, and the game does not infer Daniel's welfare from a device or location clue.

Recovery controls were checked at 320×568 with 200% browser zoom. The recovery screen now scrolls when enlarged, and its backup control remains reachable. Existing browser tests cover lock screen, restored story clock, narrow phone layout, Messages scroll/history, Maps, Search, Bulletin and Board behaviour. This is targeted automated accessibility evidence, not a comprehensive screen-reader or physical-keyboard certification.

Development-only, session-local telemetry records elapsed, visible, recent-input active proxy, dialogue, investigation, idle/background time, puzzle retries and route completion; it exports JSON from Settings and does not upload data. **No measured human playtime or 185-minute claim is made.**

## 5. Files changed and evidence

Runtime/content: `src/content/gcroExport.ts`, `src/game/types.ts`, `src/game/engine.ts`, `src/game/phase03b.ts`, `src/game/save.ts`, `src/game/store.ts`, `src/game/devTelemetry.ts`. UI: `src/App.tsx`, `src/App.css`, `src/ui/Phase03bRelease.tsx`, `src/ui/UtilityApps.tsx`. Tests: `src/game/save.test.ts`, `src/game/phase03bFull.test.ts`, `src/game/phase03cRecovery.test.ts`, `src/game/devTelemetry.test.ts`, `tests/e2e/phase03c-recovery.spec.ts`.

Screenshots under `qa/phase-03c/`: delayed, refused, invalid and correction-pending GCRO; unknown-role finale; two-tab save conflict. These are real Playwright browser captures.

## 6. Final verification run

| Command | Result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` (`oxlint`, the project's configured lint command) | PASS |
| `npm run test -- --reporter=dot` | **44/44 PASS**, 8 files |
| `npm run build` | PASS, Vite production bundle |
| `npm run test:e2e -- --reporter=line` | **29/29 PASS**, including seven Phase 03C browser tests |

## 7. Known limits and next acceptance work

| Severity | Item | Required evidence before Gate B closure |
| --- | --- | --- |
| P2 | Delayed/refused/corrected GCRO cases remain pending without a later issued response in normal play. | Decide and author a lawful later response only if the approved story permits it; test the resulting route. Pending may remain a supported outcome. |
| P2 | Session journal cannot promise recovery after tab closure or browser storage eviction; backup import/merge is absent. | Specify restore and rollback behaviour, then test with copies of supported saves. |
| P2 | Automated tests do not measure engagement, readable pace, or accessibility on actual Android hardware. | Physical device UAT and human playtests with exported local metrics. |

Phase 04 should test a freshly built Android debug package on physical devices: keyboard and scroll at small viewport/font scale, touch/focus/screen-reader labels, back/resume and offline transitions, notification order, save/load and duplicate tabs where applicable, performance, full S01–S30 routes, plus restore/rollback with non-production save copies. Human players should report actual active time, puzzle friction, story comprehension and whether the investigations feel meaningful. **Gate B remains IN PROGRESS** until those results and fixes are recorded; this report does not grant gameplay or release acceptance.
