# Episode 01 full integration and gameplay polish

Historical phase report. Gallery availability and portraits are superseded by [Phase 05](PHASE_05_MEDIA_AND_DEVICE_REPORT.md). The results below describe the earlier build.

19 October 2026. Audit and implementation in the existing workspace. No Git metadata is present in this supplied directory, so a Git diff/commit cannot be produced here.

## Scene count and source precedence

There are exactly **30 canonical scenes: E01-S01 through E01-S30**, across the six Phase 02 screenplay Acts. This update adds no canonical scene and no Episode 02 implementation. S01 remains identity setup (`EV-E01-S01-IDENTITY`). The Sophie recovery sequence sits between identity and the existing S02 home/Bulletin route. Existing scene ids, receipts, optional permissions and late-tip recovery remain intact.

The 14 Sophie-first bible entries are outline beats, not 14 additional canonical scenes. The OPEN-B labels below are crosswalk labels only; executable event ids remain the existing `OPEN-*` ids plus stable dialogue-specific ids, all separate from `E01-S*`.

| Bible beat | Crosswalk label | Runtime destination and boundary |
| --- | --- | --- |
| S01 lock/first contact | OPEN-B01 | Lock notification, canonical S01 setup, paced `OPEN-SOPHIE-*` bubbles |
| S02 Sophie identity/stakes | OPEN-B02 | Explicit first reply, selected reaction, three-day absence testimony |
| S03 note photo | OPEN-B03 | Authored SVG prop plus transcript; deliberate `OPEN-NOTE-READ` |
| S04 quiet exchange | OPEN-B04 | Second reply, personal/originals questions, quiet and offer dialogue beats |
| S05 unverified offer | OPEN-B05 | Inspect notice, defer to transcript, explicit Restore |
| S06 restoration | OPEN-B06 | `OPEN-MIRROR-RESTORED`; home control exposes Archive icon; read-only snapshot |
| S07 mirror home | OPEN-B07 | Eleven recovered apps; original encrypted container remains inaccessible |
| S08 messages | OPEN-B08 | Ordinary Sophie history, Maya/Lucas records, unknown-header fragment |
| S09 mail/notes | OPEN-B09 | Ordinary Untitled note and personal list; two independently locked notes |
| S10 gallery/maps | OPEN-B10 | Two public gallery items, two independent hidden albums, offline place clues |
| S11 index deduction | OPEN-B11 | Inspect ordinary note AND index; explicitly save unverified OPEN-INDEX |
| S12 Sophie follow-up | OPEN-B12 | Paced transcript; counts, uncertainty or withholding; recipient-specific receipt |
| S13 Maya/Bulletin bridge | OPEN-B13 | Sophie identifies Maya as Daniel's fiancee; player asks about public lead/contact privacy; canonical S02 onward |
| S14 episode hook | OPEN-B14 | Prologue keeps the three questions unresolved; actual episode ending remains canonical S30 after K02/R01/editor checks |

## Audit: runnable versus documentation

All six screenplay Acts, the Phase 03b scene/coverage matrices, reboot brief, Sophie bible/draft, UI, Zustand store, IndexedDB/journal save code and existing tests were inspected. S01 setup and S02-S30 all have runtime transitions and React surfaces. S25/S26 are optional. Source verification, no-tip/late-tip, GCRO correction/recovery and narrower S30 fallback have runtime code, not just documentation. The earlier matrix's deferred GCRO recovery description predates the existing Phase 03c implementation.

Before this patch the Sophie transcript was batched, only two reply sets ran, the recovery immediately followed the second reply, and the follow-up was an unsent static text card. The extended quiet/recovery/disclosure/bridge dialogue now runs in the game. Some draft alternatives are condensed into equivalent choice groups rather than reproduced as a separate screenplay scene for each line. No claim is made that all screenplay prose is displayed verbatim.

Production gallery art, actual audio/voicemail, human pacing measurements, full assistive-technology review and physical Android acceptance remain outside verified runtime coverage. The note has an authored vector photo-style prop and accessible transcript; other gallery thumbnails remain illustrative placeholders.

## Changes and continuity

- Saved per-message queue: stable ids, absolute deadlines, due-event delivery, idempotent catch-up, typing state and reduced-motion fast reveal. Player choices always require Send. Save/reload never reauthors an already delivered bubble.
- Expanded worried-but-cautious Sophie dialogue includes the three-day absence, unknown reason for Daniel sharing the number, personal questions, note provenance and a separate unrequested-recovery exchange before consent.
- Full note viewer with transcript, evidence save, close control, keyboard Escape/tab containment, and reopening from saved Sophie history.
- Optional recovery postponement returns to the transcript. No consent is inferred from inspection or from returning later.
- Mirror restoration permits the player's Home control and Archive icon before the deduction is complete. Bulletin entry resumes the required opening investigation until that handoff is earned.
- Sophie receives only the explicitly selected disclosure. A counts disclosure grants OPEN-INDEX-DISCREPANCY to Sophie; uncertainty grants only OPEN-UNVERIFIED-FINDING; withholding grants neither. Each sent branch has a message addressed to Sophie with its exact fact list. Maya receives no mirror facts.
- Maya's introduction establishes her relationship without automatic introduction/contact permission. The Bulletin preview remains public and player-driven. The 14/13 count and Bus 4 Escort difference remain distinct.
- Removed an unsupported mirror integrity percentage and changed the report label from Verified count to Signed count. All OPEN evidence remains unverified.
- More ordinary recovered family/personal material; the four optional locks, answers and separate hint/unlock persistence remain intact.
- Sophie and Maya live views follow new bubbles only near the bottom; jump controls preserve reading position. Fixed the existing test-channel jump stopping short after layout changes.
- The restored Archive icon now replaces Alerts on home page one; Alerts remains on page two. This avoids an extra icon row hiding the Bulletin lead on 320x568 screens.
- Vite ignores generated Android and npm-cache trees while watching source files.

## Explicit source conflicts

1. Act 01 S02 says the morning begins without a mysterious install and no workspace exists. The current 2026 Sophie-first direction supersedes that entrance only; S02-S30 source/receipt logic is retained.
2. The Sophie bible labels an ending S14, whereas canonical E01-S14 is a granular share conversation. The bible label is an outline beat; it does not rename or replace E01-S14. The verified ending stays S30.
3. Sophie says three days; the Bulletin fixes last confirmed contact to 4 October, missing report to 5 October, posting to 7 October and play date to 8 October. Retain both as source-scoped testimony/public chronology. Do not silently claim Sophie last saw him at the public last-contact timestamp; the draft's exact last-seen calendar date is unresolved pending Story Bible v2, which is absent.
4. Optional mirror range/album clues are literal local puzzles. They do not authenticate or causally decode the later canonical N01/GCRO chain.
5. Prior patch QA documents describe missing dependencies and unimplemented branching. They are historical reports; the executed results below supersede those limitations only where explicitly tested.

## Files changed

Source: `src/content/opening.ts`; `src/game/opening.ts`, `types.ts`, `engine.ts`, `store.ts`; `src/App.tsx`; `src/ui/OpeningPrologue.tsx`, `SophieConversation.tsx`, `Messenger.tsx`, `LockScreen.tsx`, `HomeScreen.tsx`, `DanielMirror.tsx`, `opening.css`; `public/daniel-note.svg`.

Tests/configuration: `src/game/opening.test.ts`, `src/game/opening.integration.test.ts`; `tests/e2e/opening-helper.ts`, `sophie-opening.spec.ts`, `sophie-optional-locks.spec.ts`, `sophie-resume.spec.ts`, `ui02.spec.ts`; `playwright.config.ts`, `vite.config.ts`.

This report, the additive Sophie integration section in `docs/implementation/phase-03b/03_COVERAGE_MATRIX.json`, and updates to the reboot brief/bible/draft document the runtime crosswalk. Capacitor sync regenerates Android assets and plugin configuration in the existing Android project. Browser QA also regenerates existing screenshot evidence directories. Legacy `the-archive:game-save:v1` is never read, erased, imported or migrated by the game.

## Executed QA

Final results below are from the settled-source regression run. The initial default-cache npm install hit a Windows cache permission error; `npm ci --cache .npm-cache` succeeded (202 installed packages, zero audit vulnerabilities). Unit/build process spawning required the execution permission supplied by the tool reviewer.

Initial unit run: 10 files / 57 tests passed. Typecheck, lint and production build passed. Initial browser run exposed the test-channel scroll and restored-icon home-fit bugs; subsequent source edits also interrupted some browser cases through Vite HMR. Those results are not treated as final acceptance.

Android SDK and JDK 21 are installed. Capacitor sync passed; `cap doctor` passed after sync; Gradle `assembleDebug` passed (93 executed tasks). `adb devices` returned no connected device. A debug build is not signed-release or physical-device acceptance. The final web build was synced and the debug APK rebuilt successfully (93 tasks: 27 executed, 66 up-to-date). Final APK: `android/app/build/outputs/apk/debug/app-debug.apk`; SHA-256 `034e8ec0f9c31af3193f0ce21ce72eb3632697e815725db0d2586eb9104d342a`.

### Final command results

| Check | Actual result |
| --- | --- |
| `npm ci --cache .npm-cache` | PASS: 202 installed packages; zero audit vulnerabilities |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS: 57 tests in 10 files |
| `npm run build` (also executed by final `npm run cap:sync`) | PASS: 1,943 modules transformed |
| `npm run test:e2e -- --workers=4` | PASS: 33/33 tests, 3.5 minutes |
| `npm run cap:sync` | PASS: final web assets copied and Android plugins updated |
| `npx cap doctor` | PASS: Android checks; iOS not installed |
| Android `gradlew.bat assembleDebug` | PASS: final synced assets packaged; 93 tasks, 27 executed / 66 up-to-date |
| `adb devices` | No connected devices; no physical acceptance claim |

The final browser run includes fresh first contact through S30; explicit Send; paused/reloaded incoming dialogue; note inspection; postponed and explicit recovery consent; recovered-device Home/Archive navigation; optional Notes/Gallery locks, incorrect answers and persistent unlocks; 320px layout and reduced motion; social/quiet/no-tip/late-tip paths; GCRO negative recovery and verification; K02/S30; two-tab conflict detection; interrupted same-tab journal recovery; and legacy-key sentinels. Unit tests cover all three Sophie disclosure scopes and independent passwords/hint tiers for all four locked items. Final screenshots of the note and 320px home were visually inspected.

Intermediate browser runs were not all green: they exposed the existing scroll and home-fit bugs, the opening Home navigation guard, and ambiguous test selectors for password hints, album tiles and the multi-contact inbox. These were repaired and the full suite rerun successfully. No known failing automated check remains. Passing selected automated routes does not establish every dialogue combination, physical keyboard behavior, screen-reader behavior or human pacing acceptance.

### Playability and release verdict

**Episode 01 is browser-playable continuously from Sophie's first contact through canonical S30 on the tested routes.** All 30 canonical scenes have runtime implementation; none of those 30 is documentation-only. The 14-beat Sophie outline maps into the separate opening sequence and the existing S30 hook as shown above. No additional episode or culprit/fate reveal was introduced.

**Android release acceptance is still blocked.** The final debug APK builds and is ready for device QA, but no device was connected, no physical playthrough was performed, and no signed release/AAB or store acceptance was tested. Human pacing/accessibility review and production gallery media remain limitations. The absent Story Bible v2 and the explicit chronology/source conflicts above remain editorial review items rather than invented resolutions.
