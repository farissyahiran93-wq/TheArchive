# Unknown Number and TRACE bridge V3

The 4 November manuscript controls the English dialogue from Unknown’s first message through the handoff to the Updated label. The 21 branch choices and 72 NPC bubbles match the supplied text, with the optional package reoffer also implemented. Unknown’s claim about building the viewer is dialogue testimony. The scan compares displayed metadata from ARC-IDX-GB-041 and GB-ARTICLE-001. [Pinned sources](sources/trace-bridge-2026-11-04)

## Playthrough

1. Open Sophie’s Bulletin link, mark the article read and finish her conversation. Wait for **Unknown Number · New message**, then open the thread.
2. Choose and send a reply at each of the six pre-install decisions. The choices cover the sender, provenance, reference contents, viewer, trust and consent. The final refusal keeps an authored **Send TRACE again** reply available in the same thread.
3. Tap **Inspect Package** and read the fictional security screen. **Not Now** leaves the package available. **Install** starts four local stages. A partial installation can be cancelled and retried, or resumed from its saved stage. **Done** closes the installer.
4. Open TRACE from Home, tap **Inspect Reference**, then **Scan Reference**. The scan runs for 5.6 seconds with checkpoints on navigation and backgrounding. Reduced motion completes the presentation after the explicit scan action.
5. Tap **View Findings**, choose **PUBLIC_ARTICLE**, then **Compare with Public Copy**. The two displayed IDs match and the comparison retains **SOURCE NOT AUTHENTICATED**. Selecting **TITLE** offers the authored hint. Comparing is an optional inspection, and viewing findings is required before the report.
6. Tap **Return to Messages**, select a report and press **Send**. Unknown’s selected response and the authored closing bubbles lead into **Open Bulletin Article**. Scene 5 opens at **Updated → Save Analysis to TRACE**, using the previously saved article read.

## Graph and receipts

| Transition | Stable ID or state |
| --- | --- |
| Delayed first contact after the saved Sophie completion and article read | `CH1-ARCHIVE-FIRST`. Its authored bubble is `OPEN-ORIGIN-TRACE-INTRO-V3-B01-INTRO-1` |
| Six pre-install decisions | `OPEN-ORIGIN-TRACE-INTRO-V3-C01` through `OPEN-ORIGIN-TRACE-INTRO-V3-C06`. Outgoing IDs append `-PLAYER-a`, `-PLAYER-b` or `-PLAYER-c` |
| Package delivery | `OPEN-ORIGIN-TRACE-INTRO-V3-B06-a-2`, `OPEN-ORIGIN-TRACE-INTRO-V3-B06-b-3` or `OPEN-ORIGIN-TRACE-INTRO-V3-REOFFER-1` |
| Deferred reply | `OPEN-ORIGIN-TRACE-INTRO-V3-REQUEST-AGAIN-PLAYER-again` |
| Installation checkpoint and completion | `OPEN-ORIGIN-TRACE-INTRO-V3-WAIT-INSTALL`, saved stage and `CH1-TRACE-V3-INSTALL` |
| Inspector and scan | `TRACE_V3_REFERENCE_INSPECTED` and the existing persisted `trace.scan` checkpoint |
| Private findings | `OPEN-ORIGIN-TRACE-INTRO-V3-WAIT-FINDINGS`, `TRACE_INDEX_FINDINGS_VIEWED` and `EV-TRACE-REF-001` |
| Optional ID comparison | `TRACE_V3_PUBLIC_ID_COMPARED` |
| Required report | `OPEN-ORIGIN-TRACE-INTRO-V3-C08-PLAYER-a`, `-PLAYER-b` or `-PLAYER-c` with an actual Unknown receipt |
| Handoff | `OPEN-ORIGIN-TRACE-INTRO-V3-B08-TAIL-5` attaches the article. `OPEN-ORIGIN-TRACE-INTRO-V3-HANDOFF` opens `OPEN-VH-NAT-ARTICLE-WAIT` |
| Updated label | Existing `article_metadata_inspected` and `update_analysis_saved` flags |

The handoff records the actual report receipt as Scene 5’s opening exchange. The later Updated, index, policy and assessment decisions continue through the natural conversation runner. The Corrections Desk still requires the later register instruction and acknowledgment Send. The publisher request has its own opt-in, Review and Send Request.

## Save compatibility

New final-route games persist `traceBridgeRevision: '2026-11-04'` in the existing scene record. A save without that field selects its prior graph and existing checkpoints. This includes earlier saves already awaiting installation, scanning or playing Scenes 5 and 6. The loader validates the optional tag and resolves V3 node IDs using the existing checkpoint registry. Earlier installed saves use their saved reference and existing follow-up. The report receipt uses the existing recipient-specific receipt model. Index provenance, capture time and earlier article wording remain unresolved.

## Files changed

- **Authored graph and registration**. `src/content/traceBridgeV3.ts`, `actIRegistry.ts`, `scene01.ts` and `traceReference.ts`.
- **Story, save and presentation state**. `src/game/traceBridge.ts`, `archiveOrigin.ts`, `naturalConversation.ts`, `trace.ts`, `scene01.ts`, `engine.ts`, `types.ts`, `phonePresentation.ts` and `guidance.ts`.
- **Phone UI**. `src/ui/VersionHistoryConversation.tsx`, `NaturalConversationActions.tsx`, `TraceApp.tsx`, `TraceBridgeFindings.tsx` and `trace-app.css`.
- **Tests**. `src/game/traceBridge.test.ts` adds six cases covering timing, all seven dialogue decisions, refusal, persisted install retry, private findings, handoff and the later gate. `tests/e2e/trace-bridge-v3.spec.ts` drives the 320 px flow. `tests/helpers/naturalConversation.ts` and `tests/helpers/versionHistoryConversation.ts` pin their historical fixtures.

## Verification

- TypeScript, lint and production build passed. Vite reports its existing bundle size advisory.
- Unit tests passed with **1,471 tests in 60 files**.
- The focused V3 browser flow passed, including live notification, reload during install, Escape during install and scan, reduced motion, comparison and Scene 5 entry.
- Full browser regression passed with **187 tests** in 17.1 minutes. [Browser log](../artifacts/trace-bridge-2026-11-04/browser.log)

Physical Android UAT remains open. On a device, exercise the system Back button in the package warning and during installation, background and reopen TRACE during the scan, and check the comparison and report composer with the device’s font scale and reduced-motion settings.

## Existing save correction

Build 13 also upgrades the November 3 natural-flow save before the player's first sent reply in the old TRACE introduction. After Sophie finishes and the article is read, reopening Unknown starts the complete V3 dialogue. Any draft from the superseded choices is cleared. The old preview bubbles stay in storage and are filtered from the thread, inbox preview and notification projection. Earlier Unknown messages remain visible. A previously sent reply, delivered package, installation or Scene 5 checkpoint keeps its original route.

The correction passed typecheck, lint, the production build, 1,473 unit tests and 188 browser tests. The Android package is `1.2.1-playtest` with version code 13. Signature, application ID, Capacitor configuration and all 47 packaged web files were verified. [Browser log](../artifacts/trace-bridge-2026-11-04/upgrade-browser.log)

## Scene 4 trust-flow correction, build 14

The owner reported that Unknown still introduced TRACE and offered installation without the supplied identity and trust dialogue. Build 13 deliberately excluded any save with an already-sent old reply or package offer, which left precisely those active Scene 4 checkpoints on the obsolete graph.

Build 14 replaces the superseded natural-flow Scene 4 introduction even after the player has replied, received the package or installed the viewer. Reopening Unknown starts the complete authored six-decision conversation. Old transcript and recipient receipts remain stored; the superseded introduction is omitted from presentation. Sophie, article-read state, installed viewer, scans and private findings are retained. An unfinished old installation is cancelled and its package must be offered again after the real new consent exchange. A finished installation stays installed; the new dialogue does not invent another installation or consent receipt. Obsolete installation/follow-up/start timers are removed. Normalization is idempotent. Actual Scene 5/6 saves and the separate Chapter 2 route retain their progression.

Regression cases exercise both already-offered and already-installed saves, verify all six decisions before any visible package, retain the raw original messages, and preserve a real Scene 5 save. Browser coverage drives the identity and trust branches on both affected checkpoints and the full new-game installation/scan/handoff route.

Build 14 verification: typecheck, lint and production build passed; 1,475 unit tests passed. The full browser run passed 187 of 189 cases; the two obsolete Scene 4 expectations were updated to send all six new decisions and the authored findings report, then complete Scene 5/6. All three cases in that file passed on recheck. No runtime code changed after the full run. Logs: `artifacts/trace-bridge-2026-11-04/trust-browser.log` and `trust-flow-recheck.log`.

APK: `artifacts/GREYHAVEN_2026-11-04_Scene04_Trust_Flow.apk`, version `1.2.2-playtest` / code 14, SHA-256 `8b9af41d5b88bd694fab013d47e9fb36f7ed502f225aa92cdb5d5a2288279081`. Android build passed. APK v2 signature verified against the retained certificate (`444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`), app ID remains `com.thearchive.game`, and all 47 packaged web files match `dist` exactly. Capacitor configuration matches build 13. Prior APKs retained. Physical Android installation was not tested.

## Play from this scene correction, build 15

The owner confirmed Android version 1.2.2 and identified **Play from this scene** as the failing entrance. The replay checkpoint can predate `naturalFlowRevision`. Loader normalization therefore leaves it on its historical graph. Once Sophie finishes, the existing first-contact scheduler can add the natural-flow flag but not the V3 flag, selecting the obsolete immediate TRACE introduction. Previous tests seeded saves at or after Unknown contact and did not cover this menu entrance.

`prepareReplay` now receives the explicitly requested scene number from `startSceneReplay`. For a recorded final-route Scene 4 entry before Unknown contact or Scene 5, the replayed copy selects the current natural-flow and V3 bridge revisions. Original recorded context, Sophie dialogue, knowledge, relationship state and relative deadline rebasing remain intact. Other scene replays and Continue are unchanged. Replay still follows the existing confirmation and primary-save rewind semantics.

A regression through the actual store restart failed before the fix because the bridge revision remained undefined; it now passes, including a complete Sophie playthrough to the first V3 choice without reload and immutable saved entry context. A browser test clicks Chapters & Scenes → Scene 4 → Play from this scene → Start scene on an old checkpoint, sends Sophie's final reply, opens Unknown and sends the identity and trust challenges. It checks the new argument and absence of the old TRACE introduction/card.

Build 15 verification: typecheck, lint and production build passed; **1,476 unit tests** and the full **190 browser tests** passed. The focused actual-menu replay test also passed. Logs: `artifacts/trace-bridge-2026-11-04/replay-unit.log`, `replay-focused.log`, `replay-browser.log`. APK `artifacts/GREYHAVEN_2026-11-04_Scene04_Replay_Fix.apk` is `1.2.3-playtest`, version code 15, SHA-256 `e6e8c62c31357fd489f240569b46e4bc2489d10680fe8b24b86430f4377821b7`. The Android build and APK v2 signature verification passed with the existing signer and `com.thearchive.game`. All 47 embedded web files match the production build; Capacitor configuration matches build 14. Previous APKs retained. Physical device installation remains untested. No commit or push.
