# Scenes 4–6 natural conversation and green guidance — 3 November 2026

The owner confirmed **Rewrite Scenes 4–6 + titik hijau**, then explicitly requested an APK when ready (“nnt da siap buat apknya”). The two supplied texts are retained verbatim in `docs/sources/natural-flow-2026-11-03/`. Their story beats supersede the conflicting Scene 4–6 instructions in the previous TRACE UI prompt. Existing source limitations, voluntary simulated installation, historical conversations and recipient scope remain in force.

## Before and after

Previously, the player could manually enter Version History, see three source actions together, and finish Scene 5 to activate the Corrections Desk immediately. Its public register and optional publisher request were insufficiently separated.

New aligned starts now follow:

1. Sophie actually delivers the article attachment. Only then does the Bulletin Home widget become active. The player marks the public article read and finishes Sophie's existing Scene 4 conversation.
2. Unknown introduces the incomplete reference and TRACE package. Installation remains a separate voluntary security interaction. The initial local trace ends at **VIEW FINDINGS**; animation alone stores no evidence and starts no conversation.
3. Viewing findings schedules Unknown's authored Scene 5 question. There is no mandatory manual Version History entry, repeated article-read requirement or second scan.
4. Unknown asks about one source at a time. Updated inspection plus **SAVE ANALYSIS TO TRACE**, explicit index findings and Browser **READ POLICY** have distinct receipts. All six source visit/discussion orders are supported. A source already inspected goes directly to its matching discussion; a selected draft remains on its own topic.
5. Article, index and policy discussions each require selection plus **Send**, followed by separate comparison, strategy and final assessment Sends. The active route has no visible source checklist or verification-gap worksheet. Historical source-hub saves retain their graph with one contextual action displayed at a time.
6. Scene 5 completion schedules a delayed Unknown instruction. The public register stays locked until the actual instruction is delivered **and** the player sends its acknowledgment.
7. In Browser, **SAVE FINDING** stores `NOTE-S06-DESK-LIMITS` once. No publisher request or outgoing chat message is created. The player returns to Unknown, selects a summary and sends it. Scene 6 closes after the authored incoming reply and closing line. The next canonical scene remains a manual action.
8. Unknown separately offers publisher contact. Only its actual incoming offer plus A's sent opt-in permits the form. Selecting a question, **REVIEW REQUEST** and **SEND REQUEST** remain distinct actions. B declines; C keeps a local draft. Neither blocks the completed core investigation. An existing valid request is shown as history and cannot be sent again.

## Durable state and permissions

| Interaction | Persisted proof | What it permits |
| --- | --- | --- |
| Sophie article delivery | Existing attachment message and `OPEN-S04-ARTICLE-ATTACHMENT` | Bulletin widget link |
| Article read | Existing `article-inspected` source flag | Continue Sophie; retain read status |
| Trace completion | Saved local trace checkpoint | Explicit findings inspection only |
| View findings | `TRACE_INDEX_FINDINGS_VIEWED`, existing index inspection and unverified analysis | Delayed authored Scene 5 opening |
| Updated analysis | Metadata inspection and `update_analysis_saved` | Article-source reply choices |
| Policy read | Browser `policy` flag | Policy-source reply choices |
| Source discussion | Each `OPEN-VH-NAT-C02/03/04-PLAYER-*` event and Unknown recipient receipt | Comparison after all three Sends |
| Comparison / strategy / assessment | Separate C05 / C06 / C07 Sends and receipts | Complete Scene 5; queue instruction |
| Register instruction | `OPEN-VH-NAT-REGISTER-INSTRUCTION-4` and player receipt | Acknowledgment choices; no register access yet |
| Acknowledgment Send | `OPEN-VH-NAT-REGISTER-ACK-PLAYER-*`, matching selection and Unknown receipt | `canOpenScene6Register(save)` |
| Register finding | Existing private note ID, saved observation and narrow conclusion | Summary chat; no remote knowledge |
| Summary and incoming close | `OPEN-VH-NAT-REGISTER-SUMMARY-PLAYER-*`, existing runner replies and close event | Complete Scene 6; manual next lead |
| Optional inquiry offer and A Send | `OPEN-VH-NAT-INQUIRY-OFFER-3`, player receipt, `OPEN-VH-NAT-INQUIRY-CHOICE-PLAYER-a` and Unknown receipt | `canOpenPublisherInquiry(save)`; no submission |
| Reviewed request + final Send | Existing `R-GB-CD-002` delivery receipt | Receipt/history only; no unsolicited answer |

`src/game/investigationAccess.ts` owns the shared selectors. Reducers reject unauthorized entry/activation, saved-panel actions, register finding, form selection, review and request submission. Browser navigation, TRACE shortcuts, notification projection and scene-library projection use those selectors too. Scene completion is not an authorization substitute.

## Guidance and presentation

The player guidance is a small green dot derived from current saved progress. It marks the next app, relevant control, reply heading or Send button. It does not select, open, inspect or send anything. **On** includes control dots, **Minimal** shows Home app/widget dots, **Off** hides them. The gentle 1.8-second pulse becomes static with reduced motion. The old Current Lead instruction panel no longer renders. Unknown chat preserves scrollback and provides **Jump to latest**.

TRACE retains its five-tab design, saved findings and locked Decryptor. The article, policy, public register and optional request remain in the light Browser shell. Screenshots are retained under `artifacts/natural-flow-2026-11-03/screenshots/`.

## Save compatibility

New starts use the optional `naturalFlowRevision: 2026-11-03` tag. Existing active Scene 5 conversations retain their previous graph, choices, draft, pending typing and delivered text. The new follow-up node IDs are available alongside each pinned final graph; resuming them does not retag a historical transcript.

For aligned saves with completed Scene 5 and unfinished Scene 6, the load adapter hides premature desk visibility, retires only the obsolete premature Scene 6 lead and queues the real Unknown instruction once. It preserves the old desk's evidence, source progress, drafts, receipts and history, and creates no acknowledgment. Upon actual acknowledgment, the private desk resumes with the current register presentation. Legitimately completed Scene 6 saves remain completed and usable. Prior publisher receipts remain readable; no duplicate request is allowed. Previously requested matching desk replies remain scoped to their existing receipt.

An earlier unsent Version History question also resumes with its original text, selection and review state after the new actual opt-in. Its existing reducer and receipt ID are retained. Choosing draft-only does not replace it with a new default question. Submitting it through this revised route creates a delivery receipt without scheduling a new publisher answer.

IndexedDB stays `the-archive-reboot`, schema version 1. The legacy `the-archive:game-save:v1` key is untouched. No missing article body, earlier version, editor identity, source authentication, suspect, culprit or fate is established.

## Main changed files

- Authored nodes and graph routing: `src/content/naturalConversation.ts`, `actIRegistry.ts`, `scene01.ts`.
- State and permissions: `src/game/naturalConversation.ts`, `investigationAccess.ts`, `archiveOrigin.ts`, `scene01.ts`, `scene05.ts`, `scene06.ts`, `trace.ts`, `guidance.ts`, `phonePresentation.ts`, `sceneLibrary.ts`, `types.ts`, `chapter1.ts`, `engine.ts`, `store.ts`.
- UI: `src/ui/NaturalConversationActions.tsx`, `NaturalDesk.tsx`, `NaturalInquiryForm.tsx`, `GuidanceDot.tsx`, `guidance-dot.css`, `VersionHistoryConversation.tsx`, `PublicationReference.tsx`, `PublicStory.tsx`, `TraceApp.tsx`, `TraceTools.tsx`, `HomeScreen.tsx`, `Messenger.tsx`, `Scene01Chat.tsx`, `PhoneShell.tsx`, `CaseNavigation.tsx`, and `src/App.tsx`.
- Regression coverage: `src/game/naturalConversation.test.ts`, revised historical conversation/guidance/graph tests, `tests/helpers/naturalConversation.ts`, `versionHistoryConversation.ts`, `tests/e2e/natural-flow.spec.ts`, `natural-origin.spec.ts`, `natural-inquiry-resume.spec.ts`, `guidance.spec.ts`, `version-history-conversation.spec.ts`, `scene0607-email.spec.ts`, `trace2.spec.ts`.
- APK metadata: `android/app/build.gradle`; version code increases from 10 to 11, version name `1.1.0-playtest`.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test -- --maxWorkers=2 --reporter=dot`: **1,465 passed, 59 files** (79.08 seconds on the final code).
- `npm run build` through `npm run cap:sync`: passed. The existing large-chunk advisory remains nonfatal.
- Full browser run: **175 passed / 9 failed** across 184 cases (23.2 minutes). This run overlapped live source edits; observed failures included UI resets and a separate empty store returned by a development import after hot reload.
- The **same nine cases all passed** on a fresh server with unchanged final code (1.7 minutes). No cases remain failing. Logs retain both the initial result and the rerun; the initial full run is not reported as a clean pass.
- Two additional cases cover the new voluntary origin/first-scan bridge and restoration of an earlier inquiry draft. Both passed. Across the full run and the targeted follow-ups, all **186 distinct browser scenarios** have a passing result. The bridge/regression follow-up was **10/10** (52.9 seconds); the draft-resume / prior source follow-up was **3/3** (1.6 minutes).
- Final offline Android build: **BUILD SUCCESSFUL in 19s**, 123 tasks, 27 executed / 96 up-to-date.

## APK update

Deliverable: `artifacts/GREYHAVEN_2026-11-03_Scenes04-06_TRACE_Update.apk`.

| Package check | Result |
| --- | --- |
| Application ID | `com.thearchive.game`, unchanged |
| Display title | GREYHAVEN |
| Version | `1.1.0-playtest`, code **11**, increased from the previous APK's code 10 |
| Size | **23,623,886 bytes** |
| APK SHA-256 | `bb155881cddf2e74d181eca5eadeb7d8e528cdd47456c9a6f291b045ebb15ff5` |
| Signature | Verified v2; existing Android Debug signer |
| Certificate SHA-256 | `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`, matches the 2 November APK |
| Packaged production files | All **47** files byte-identical to `dist` |
| WebView origin / Capacitor config | Byte-identical to the previous APK; no development-server URL |
| Earlier APKs | All **14** retained with unchanged hashes |
| ZIP integrity | Passed |

Evidence: `artifacts/natural-flow-2026-11-03/{integrity.json,signature.txt,previous-signature.txt,package.txt,prior-apks.json}`, plus the cap-sync and Gradle logs under `artifacts/`.

Browser logs: `artifacts/natural-flow-browser-{full,stable-rerun,bridge,resume}.log`. Final verification totals are also retained in `artifacts/natural-flow-2026-11-03/verification.json`.

Install using Android's **Update** action over the existing app. Retaining the existing installation retains its app-data stores; uninstalling would remove them. No physical-device installation or retained-save device test was performed.

No commit or push. Browser captures emulate phone sizes; a physical Android installation and retained-save device test are separate from APK signature/package verification.
