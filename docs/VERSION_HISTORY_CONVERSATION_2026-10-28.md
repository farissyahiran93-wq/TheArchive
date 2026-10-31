# Unknown Number and Version History — 28 October 2026

Subsequent owner request: an in-place APK update was authorized and built after this implementation report. See `APK_UPDATE_2026-10-28.md` for the delivered APK, matching signer, increased version code and package verification. Statements below about no APK build describe the original implementation task.

The two owner prompts are pinned verbatim in `docs/sources/version-history-2026-10-28`. The narrative prompt supersedes the master prompt's quiz interpretation: C01–C07 are Messages conversations with three converging branches each; C08 is a voluntary Browser request; C09–C10 are optional Sophie exchanges; C11 is an optional group exchange. The pre-installation explanation is a separate bridge. No additional investigation quiz is introduced.

## Existing route and compatibility

The repository stores the public article, index and Version History in the final Chapter 1 pipeline. These storage identities remain intact. The revised workspace records the requested canonical identity `ch02_scene05_version_history`; it does not renumber old records or modify the separate historical Chapter 2 access/reunion arc.

New final-route games carry `articleAlignment: 2026-10-28`. That graph preserves the opening choices and changes only the requested closing/transition: Sophie's committed Scene 03 closes on Goodbye, a persisted ten-second deadline delivers the article lead, and the article is a timeline attachment. The optional sticky-note branch uses `/sophie-sticky-note.jpg` as a configurable asset with a readable unavailable-image fallback. It is a personal photograph, never an evidence unlock. The six article paragraphs, byline and publication metadata use the existing source object.

The revised article conversation closes on “Thanks for actually reading it.” Unknown Number's invitation becomes eligible afterward. Its package remains in the message history. Opening its security sheet and selecting INSTALL are separate actions; CANCEL installs nothing. The three simulated installation stages survive reload through the existing pending-event ledger. Archive appears only after installation and initially exposes one partial, unverified index. The player must inspect it and manually select REVIEW VERSION HISTORY.

An older installed-Archive save retains its installed state. It can enter the revised workspace without reinstalling or replaying the origin bridge. An already-started older Version History save keeps its original graph, choices, optional threads and conclusion. Regression fixtures explicitly pin those historical routes. No legacy localStorage key is read, overwritten or migrated.

## Runtime and recipient scope

All dialogue uses the existing `Scene01Node` graph registry, `enterScene01`/`deliverScene01`, the same queue, Zustand commit path, IndexedDB persistence and recipient message stores. `archiveOrigin.ts` holds pure state transitions and checkpoints; it does not implement a second message runner.

All new outgoing dialogue requires a persisted draft followed by Send. Opening a document does not send a statement. Source gates require actual article metadata inspection, index inspection, an explicit policy read and four reviewed verification gaps. Sources can be read in a different order. Every branch converges; there is no wrong-answer popup or forced retry. The save distinguishes selected observations, hypotheses, questions, strategy and the assessment shared with Unknown Number. Sophie and group knowledge change only after their own selected statements are sent to present recipients. Lucas does not return automatically. Unknown Number's availability remains unknown.

The publisher form requires question selection, a review preview and SEND REQUEST. Its stable `R-GB-VH-001` receipt remains compatible with the existing Scene 06 matching-reply implementation. The receipt alone supplies no answer or revision history. Scene 05 completion does not require a form submission or optional social conversation. Scene 06 still requires OPEN NEXT LEAD.

## Blocking repair

Block/unblock controls and message-delivery guards are removed. Obsolete action names are harmless compatibility no-ops. The schema remains version 1 with validated optional state, following the repository's existing convention. The pure normalization repair clears obsolete flags, restores an undelivered held queue entry when the active queue is empty, and preserves existing queues, read states, relationships, evidence and completed nodes. Historical suppressed index-hint delivery can be recovered under its original stable ID without replaying a committed message. Pending session-journal saves are normalized through the same repair before recovery comparisons.

## Navigation and media

The article, policy and corrections form share the in-game Browser. Article links and photographs are in the chat timeline and Sophie's profile. Browser Back restores the previous view; chat scroll and drafts are retained. Android Back and desktop Escape route through the current security sheet, Browser, media/profile view or inbox before returning to Home. Installation requests no real Android permission and downloads no executable.

## Validation

Results are recorded in `artifacts/version-history-*.log`; browser screenshots are under `artifacts/version-history-browser` and the complete regression output under `artifacts/version-history-full-browser`. The conversation unit suite exercises all 33 branches, source gates, explicit Send, recipient scope, reloads, voluntary installation, receipt idempotency, legacy normalization and manual Scene 06 entry. Focused Browser tests cover 320px/light and 430px/dark layouts.

No APK rebuild, commit or push is part of this change. Native Android hardware is not exercised; Android Back uses the existing Capacitor listener and is additionally checked through the shared Back handling in browser tests.

## Changed implementation files

- `src/content/versionHistoryConversationData.ts`: pinned narrative lines and all eleven three-branch groups; generated by `scripts/import-version-history-conversation.py`.
- `src/content/versionHistoryConversation.ts`, `actIRegistry.ts`, `scene01.ts`: graph nodes, the revised Scene 04 boundary, typed Unknown channel and canonical record fields. Historical graph identities remain available.
- `src/game/archiveOrigin.ts`, `scene01.ts`, `scene04.ts`, `scene05.ts`, `chapter1.ts`, `store.ts`, `types.ts`: pure installation/inspection/conversation actions, source gates, recipient receipts, shared-runner integration and persisted checkpoints.
- `src/game/engine.ts`, `save.ts`: obsolete-blocking normalization and consistent pending-journal normalization.
- `src/ui/VersionHistoryConversation.tsx`, `PublicationReference.tsx`, `PublicStory.tsx`: Archive workspace, existing Messages integration, package security view and Browser documents/form/receipt.
- `src/App.tsx`, `ui/CaseNavigation.tsx`, `ui/usePhoneBack.ts`: navigation and installation visibility.
- `src/ui/Scene01Chat.tsx`, `ChatProfile.tsx`, `ChatPhotoViewer.tsx`, `Messenger.tsx`, `Chapter1Investigation.tsx`, `version-history.css`, `public-story.css`, and `src/game/phonePresentation.ts`: timeline attachments, profile media, unavailable-photo handling, source workspace dispatch, unread indicators and presence.
- `src/content/chatScenes.ts`: scene metadata for the new namespaces, extending the pre-existing uncommitted marker work.
- `src/game/versionHistoryConversation.test.ts`, `tests/helpers/versionHistoryConversation.ts`, `tests/e2e/version-history-conversation.spec.ts`: new branch, persistence and browser coverage. Existing regression helpers pin their original dialogue revision, and obsolete blocking/navigation expectations are updated.

The other modified Scene marker components and the existing APK were present before this task and are retained.

## Decision coverage

Each row has three reachable alternatives. C01–C07 require Send to Unknown Number; C08 requires reviewed SEND REQUEST; C09–C10 require Send to Sophie; C11 requires Send to present group recipients. Unit tests exercise every branch, including unverified interpretations and optional skipping.

| Stable choice ID | A | B | C |
| --- | --- | --- | --- |
| `s05_c01_investigation_order` | I'll start with the article everyone can see. | I want to understand the index first. | The update label caught my attention. |
| `s05_c02_update_label` | It says the article was updated. It doesn't say what changed. | So someone rewrote the article? | Could it just be a normal update? |
| `s05_c03_index_meaning` | There's a matching reference, but the article itself isn't there. | Could it be an older version? | Are you saying someone changed the article? |
| `s05_c04_policy_meaning` | It explains the labels, but not what happened to Daniel's article. | Doesn't that mean they have a record of the changes? | Why not show readers exactly what changed? |
| `s05_c05_comparison` | Not the wording. We don't have an earlier copy. | The matching title makes me think the text was different. | What if someone deliberately removed the older version? |
| `s05_c06_next_strategy` | I'll ask the Bulletin about its update records. | I'd rather find another copy of the article. | I'll keep what we have without making an accusation. |
| `s05_c07_private_conclusion` | I think there's a reference, but not enough to prove a revision. | I think the update deserves another look. I just don't know what changed. | The public report and the Archive index need to stay separate. |
| `s05_c08_corrections_question` | Does Greyhaven Bulletin maintain publicly accessible article revision records? | Can you clarify what the Updated label means for this article? | Is a previous published copy of this article available for comparison? |
| `s05_c09_sophie_update` | The label doesn't tell us what actually changed. | Did something about the article feel wrong to you? | You don't have to decide what it means yet. |
| `s05_c10_sophie_boundary` | We can keep looking without jumping to conclusions. | Sometimes the honest answer is that we don't know. | We should separate what the article says from what we feel about Daniel. |
| `s05_c11_group_disclosure` | I checked. We don't have a confirmed before-and-after copy. | There is an index reference, but it doesn't contain the original text. | I don't think we should speculate until we have more. |

## Final verification results

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | PASS, exit 0 on final sources |
| `npm run lint` | PASS, exit 0, no warnings after the Back-hook cleanup |
| `npm test -- --reporter=dot` | PASS: 48 files, 1,344 tests |
| `npm run build` | PASS, exit 0 on final sources; Vite retains its large-chunk warning |
| Full `npm run test:e2e -- --workers=4` | Initial run: 147 passed, 5 failed (152 total). Failures were two obsolete-control expectations, one notification-clock assertion, article return-to-chat restoration, and the optional group's test entrance. |
| Affected Browser rerun (five test files) | PASS: 18/18 after corrections, including every initial failure and both mobile themes with a contrast assertion |
| Added attachment/profile/Back Browser test | PASS: 1/1 after the final Back-hook cleanup |
| Native Android device / packaged APK | NOT TESTED; no APK rebuilt |

The entire 152-test suite was not repeated after the five corrections; the affected 18 tests were rerun successfully. The additional attachment test brings unique Browser coverage to 153 tests. Logs retain the initial failures and successful reruns separately; they are not reported as a single clean full-suite run.

The pending-journal migration additionally has a unit regression ensuring that equivalent blocked saves normalize identically at different wall times. Repaired held-message deadlines use the saved chronology, so restoration cannot invent a same-revision conflict from different normalization times.

## Acceptance checklist

PASS below means the described browser/unit coverage passed for the revised flow, rather than an unbounded guarantee for every conceivable imported save.

| # | Acceptance criterion | Result and evidence |
| --- | --- | --- |
| 1 | Natural Scene 04 chat and media | PASS: canonical transition unit tests, historical article Browser route, attachment/profile Browser test |
| 2 | No Continue Conversation or Not Now handoff controls | PASS in Scene 04 / revised Scene 05; earlier invitation mechanics remain outside this scoped repair |
| 3 | No forced cross-chat navigation | PASS: notification/package/manual-entry Browser checks |
| 4 | Canonical Unknown package conversation | PASS: actual bridge Sends exercised in Browser |
| 5 | Voluntary simulated installation | PASS: cancel, explicit Install, reload and icon visibility in Browser |
| 6 | Limited index after installation | PASS: source fields inspected in Browser |
| 7 | Manual REVIEW VERSION HISTORY | PASS: Browser entry and unit prerequisite guards |
| 8 | Reopen both canonical sources | PASS: both mobile source-investigation tests |
| 9 | Explicit Bulletin policy inspection | PASS: Browser read action, source gate and contrast checks |
| 10 | Persistent four verification gaps | PASS: unit completion gates and Browser review |
| 11 | Eleven groups / thirty-three branches | PASS: every authored branch exercised in unit tests |
| 12 | Explicit Send for player messages | PASS: selection does not send, reload retains draft, Send delivers once |
| 13 | Optional Sophie and group | PASS: all optional branches in units; zero-social completion in Browser |
| 14 | Corrections request without a fabricated answer | PASS: review, exact submitted text, stable receipt and Scene 06 continuity |
| 15 | Distinct source/observation/evidence status | PASS: source records and unverified evidence assertions |
| 16 | Protected mysteries remain unresolved | PASS: scoped dialogue/source data and recipient/evidence unit assertions; no new authenticated original or identity/fate record |
| 17 | Reviewed only after mandatory investigation | PASS: all source gates and seven required exchanges tested |
| 18 | Manual Scene 06 handoff | PASS: no Scene 06 state before OPEN NEXT LEAD; Browser handoff succeeds |
| 19 | Global blocking removal | PASS: visible controls absent, obsolete actions no-op, normalization repairs old states |
| 20 | Legacy histories, notifications and relationships | PASS: historical full-suite routes, final migration units and affected Browser reruns |
| 21 | Leave and resume | PASS: queue/draft checkpoints, browser return, reload and retained recipient scope |
| 22 | Idempotent messages, evidence and progression | PASS for exercised routes: branch, repeated-send, install, receipt and normalization tests |
| 23 | Light/dark/mobile/Back | PASS in Browser at 320/375/430px, with contrast and Escape/shared-Back checks; native Android hardware NOT TESTED |
| 24 | Production and regression commands | PASS for final static/unit/build checks and affected Browser reruns; initial full-suite and rerun results disclosed above |

## Remaining limitations

- `/sophie-sticky-note.jpg` has not been supplied. The shipped fallback keeps the exact reminder readable and opens through the normal photo viewer. No replacement photographic pixels are invented.
- Native Android hardware and a rebuilt APK were not tested or produced.
- The build still warns about the existing monolithic client chunk exceeding 500 kB. It succeeds; unrelated code splitting is outside this story change.
- Final Browser validation is the 147 initial passes plus successful affected reruns and the added media test, not a second full-suite run.
