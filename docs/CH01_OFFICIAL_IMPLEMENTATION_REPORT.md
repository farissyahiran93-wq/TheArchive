# Official Chapter 1 — structural implementation report

Historical structural baseline. The owner subsequently authorized the full Act I rewrite and authored Scene 04; see `ACT_I_FINAL_IMPLEMENTATION.md` and `SCENE_04_PUBLIC_STORY_IMPLEMENTATION.md` for the current final-route dialogue, safe C09 intrusion and article/index gates. Historical saves retain the implementation described here.

Authority: `sources/CH01_OFFICIAL_18_SCENE_IMPLEMENTATION.txt`, supplied 23 October 2026. This supersedes the earlier outline-only boundary. Scene 08 is now Nora's retained page; the post-verification note appears at Scene 15. Unknown Sender first intrudes in Scene 02, while Scene 09 concerns artifact provenance. Chapter 2 remains separate.

## Audit before changes

| System | Existing implementation inspected | Integration |
|---|---|---|
| Scenes 01–03 | `content/scene01Script.ts`, `scene01.ts`, `scene02.ts`, `scene02ContinuationScript.ts`, `scene03Script.ts`, `scene03.ts` | Existing dialogue/choice IDs remain unchanged in this task. Scene 02's full conversation still awaits a separate owner review. |
| Dialogue runner | `game/scene01.ts`; `ui/Scene01Chat.tsx` | No replacement runner. Intrusion uses a separate thread at the stable first group choice pause. Optional Sophie disclosure is an explicit selected Send, followed by a queued bridge reply. |
| Relationships | `GameSave.relationships`; existing scene event effects | Preserve all first-three-scene scores. Provisional later choices retain stance/draft state; no arbitrary romance or new numeric relationship rewards are assigned. |
| Evidence / knowledge | `GameSave.evidence`, `knowledge.player`, `knowledge.characters`; existing Mirror/Board controllers | Save new source objects under CH1-prefixed IDs only on explicit retention; reading remains separate. Provenance/classification lives in the authored source catalog. Interpretations stay in Chapter 1 state, not NPC knowledge. |
| Scheduling | `pendingEvents`, `deliveredEvents`, `store.tick`, `App.nextDue` | Reuse existing queue and stable CH1 event IDs; no new clock store. NPC bridge messages have separate actor-specific 1.7–2.6-second delivery queues and actor typing. |
| Archive / phone | `App.tsx`, `HomeScreen`, `AccessArchive`, `DanielLifePhone`, Mirror viewers | Same Archive icon; dormant empty investigation until 04. No second installation. Curated Chapter 1 snapshot does not unlock PHONE MIRROR/SPY. Historical C2 renderer remains unchanged for existing access saves. |
| Persistence | `save.ts`, IndexedDB `the-archive-reboot`, pending journal, `engine.normalizeSave` | Schema v1 remains. Optional validated Chapter 1 extension; no automatic destructive migration or database/key replacement. |
| Chapter 2 | `chapter2Access.ts`, `chapter2Reunion.ts`, continuation controllers | Existing state/history resumes. New route requires CH1 completion plus a separate manual Continue before initializing historical access content. |

## Single registry and state contract

`content/chapter1Plan.ts` remains the only ordered editorial scene registry. First-three runtime node namespaces and all E01-S01–E01-S30 legacy IDs are retained. Later scenes are marked structural preview, with provisional dialogue approval status. Editorial numbers are not aliases that complete old scenes.

`game/chapter1.ts` derives Scenes 01–03 completion from their existing controller. It stores only sequential completion of 04–18, explicit source inspections, interaction flags, selected-but-unsent drafts, private interpretations, resume panel/record, warning state and final completion. Current scene, unlocked scenes and act derive from the registry/prefix, rather than being double-written counters. Available sources derive from current stage plus consent/source delivery; inspecting an app alone awards nothing.

Archive lifecycle: installed dormant → first record available after public inspection and activation → investigation active after the first reference is inspected. The icon reuses onboarding; no installation is replayed. Source browsing is offline within Archive's public-source entry, with a credible Bulletin reporting-inbox route.

## Scene-by-scene completion checklist

All entries below are implemented structural gameplay; 04–18 are not final full screenplay.

| Scene | Entry, actions and completion | Files / status |
|---|---|---|
| 01 — A Message from Sophie | Existing 14 choices, starred export lead, explicit JOIN | Existing scene01 content/controller preserved |
| 02 — The Uninvited Guest | Existing 13 decisions and Lucas departure; a once-only warning queued at G01 leaves that pending choice untouched | Existing scene02 preserved; `chapter1.ts`, notifications, Chapter1ContactChat add separate unverified warning |
| 03 — Just Between Us | Existing 19 decisions/86 branches, manual private opening, Goodbye/offline; warning response only after optional player disclosure | Existing scene03 preserved; optional composer/queued Sophie acknowledgement |
| 04 — The Public Story | Manually open public report; activate limited reference; manually inspect it | `chapter1Investigation.ts`, `chapter1.ts`, Chapter1Investigation |
| 05 — An Older Copy | Inspect recovered older layer, open readable comparison and save observation | Same catalog/controller/UI; source remains a copy |
| 06 — The Missing Line | Examine the Escort row, choose accidental/deliberate/insufficient hypothesis | Private interpretation only; all three converge |
| 07 — The Woman Behind the Byline | Explicit question + Send through Nora's reporting inbox; receive her source caution | Provisional concise Nora bridge; no private file transfer |
| 08 — The Page She Kept | Ask Nora + Send, receive her description, open retained text fallback and compare three source layers | Nora-attributed page; original status unestablished; no invented pixels |
| 09 — Unknown Source | Inspect unknown source/custody fields, explicitly acknowledge limitations | No sender identity inference |
| 10 — A Life in Fragments | Consent to limited read-only snapshot; inspect existing mundane core fragment | Deferral preserves state; PHONE MIRROR/SPY remain separate |
| 11 — Fourteen / Thirteen | Inspect existing Index and ordinary context record; record displayed 14/13 counts | Wrong answers retry; no deliberate-deletion conclusion |
| 12 — The Technician's Warning | Ask Sophie for an introduction, then choose a general Eli question or no-sharing guidance | Eli she/her preserved; no private record exposure; fallback advances |
| 13 — The Woman He Loved | Choose a scoped approach to Maya + Send and receive her personal boundary | Concise provisional testimony; no automatic Archive disclosure |
| 14 — The Friend Who Walked Away | Choose a Lucas DM approach + Send; hear his refusal/perspective | His group departure stays intact; no automatic rejoin |
| 15 — After Verification | Open recovered statement; examine phrase against Index; classify unverified claim | Signature/date/confidence unavailable; no proof award |
| 16 — A Request for the Original | Select an established contact and Send scoped earliest-copy request | Request sent permits progress; pending/negative responses do not soft-lock; no verified original |
| 17 — What We Can Prove | Classify observations/reports/gaps/interpretations and manually save limited summary | Evidence board; no identity/guilt answer |
| 18 — The Role Still Active | Open role trace; choose reaction; End Chapter | Unverified operator and last use; explicit separate Continue unlocks C2 without autoplay |

## Changed-file map

- `src/content/chapter1Investigation.ts`: distinct public/recovered/retained sources, concise provisional bridge lines and reply options.
- `src/content/chapter1Plan.ts`: official names, order, latest source responsibilities and structural implementation statuses.
- `src/game/chapter1.ts`: pure gates, source availability, explicit interactions, private drafts, queue delivery, source retention and save validation.
- `src/game/types.ts`, `engine.ts`: optional Chapter 1 state and additive validation.
- `src/game/store.ts`, `App.tsx`: action routing, queue scheduling, dormant Archive entry and preserved C2 renderer.
- `src/game/chapter2Access.ts`: guarded explicit continuation factory; legacy access saves remain compatible.
- `src/game/phonePresentation.ts`, `ui/Messenger.tsx`, `ui/Scene01Chat.tsx`: delivered-only notifications, separate Unknown/contacts and explicit optional disclosure.
- `src/ui/Chapter1Investigation.tsx`, `chapter1.css`: source browser, readable diffs, metadata, contact bridge chats, persisted selections, board and manual chapter ending.
- `src/ui/Chapter2Access.tsx`: retain early warning history alongside later C2 Unknown messages.
- `tests/helpers/chapter1.ts`, `src/game/chapter1.test.ts`, `tests/e2e/chapter1-official.spec.ts`, `chapter1Plan.test.ts`: complete-route, refusal, deduplication, boundary, reload and compatibility tests.

## Provisional text and source limitations

The first three screenplays are not replaced. Added warning (“Be careful who you trust in that group.”), optional Sophie acknowledgement and all CH1-prefixed later contact replies are short provisional bridge text pending narrative authoring. The choices are functional; they are not presented as final polished full conversations. UI marks the structural/narrative preview.

The revised Nora byline is authorized by this prompt; the old article explicitly naming Maya as editor remains unchanged. The public preview uses the existing missing-person chronology and linked Bus 4 record extracts. The comparison is specifically the **report's linked record section**, rather than a fabricated authenticated older complete article. Nora's retained layer is a text-only description of that excerpt, with no claim of independent authentication. A final full article/draft and approved clipping image remain author dependencies.

The Scene 15 sentence is the newly authorized wording of the existing attributed timing claim. No signature pixels or numerical confidence were supplied: both remain unavailable/unknown. Scene 18 is a narrow reconstructed status trace, not an authenticated current session. No note appears in Scenes 01–03; no post-verification note appears before 15. The ordinary count-context note at 11 is a separate pre-existing unlocked record. No K01/K02/R04, culprit, fate, sender identity, Participant B, Session 02 or operator ownership is revealed.

## Save compatibility / migrations

Historical saves without `chapter1` remain readable. A tagged master-route save initializes the extension lazily on an explicit action/tick; already delivered first-three-scene transcripts and scores are not rewritten. A save that already completed Scene 03 does not receive a retroactive Scene 02 warning. Its first new interaction can open Scene 04. Historical C2 state always takes precedence, so existing C2 history, jobs and deadlines resume. Untagged legacy and legacy test routes are not forcibly converted or mapped into the new sequence.

Chapter 1 progress is sequential and idempotent. Reload preserves drafts, comparisons, selected record/panel, inspected sources, request status, warning disclosure and queue due times. Repeated Send/advance/view actions do not duplicate receipts, messages or evidence. Schema v1 and the pending-save journal remain unchanged. No legacy localStorage key is touched. Imported malformed future-source inspection state is rejected rather than displayed.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test -- --maxWorkers=4`: **683/683 passed, 36 files**. An earlier simultaneous browser/default-worker run hit three 5-second unit timeouts (680 passed); the bounded-worker rerun passed without changing test assertions or timeouts.
- `npm run build`: passed. Vite retains the large-chunk advisory: main JavaScript approximately 974.93 kB / 279.35 kB gzip. This is not a build failure.
- Full `npm run test:e2e`: **93/94 passed** on the final broad run. The remaining Mirror test encountered an `UNKNOWN` filesystem error writing the shared `qa/iphone-redesign/messages-320.png` screenshot, not a product assertion failure. Its output paths now use Playwright's per-test output directory; the complete Mirror scenario reran **1/1 passed** (`--output=artifacts/ch01-official/mirror-recheck`). Thus all 94 scenarios have successful coverage across these runs; no single clean 94/94 full run is claimed.
- Final focused `npm run test:e2e -- tests/e2e/chapter1-official.spec.ts --workers=2 --output=artifacts/ch01-official/continuity-final`: **4/4 passed**, including the last contact-history preservation change after explicit Chapter 2 continuation. Covers the manual 04–18 route at 320px, reload checkpoints, non-preempting warning, explicit optional Sophie disclosure and no-sharing Eli guidance.
- An earlier broad run failed the old Scene 03 Archive assertion because it expected the superseded inactive-access screen. The assertion now checks the actual Scene 04 public-source gate, locked activation and absence of future records; the full Scene 03 scenario passed subsequently.

Chapter 1 contact transcripts remain accessible after manual Chapter 2 continuation until the corresponding existing Chapter 2 session takes over. Pending Chapter 1 contact replies can finish without resetting the new chapter.

Physical Android/device play, a newly packaged APK and final narrative approval of provisional dialogue were not performed in this structural implementation. The previously packaged APK does not contain these changes.

## Queued owner screenplay revision

Status, 24 October 2026: this subsequent revision and the full authored Scene 04 are now implemented for new final-route games. See `ACT_I_FINAL_IMPLEMENTATION.md` and `SCENE_04_PUBLIC_STORY_IMPLEMENTATION.md`; the paragraph below records the queue at the end of the earlier structural task.

After this structural task, the owner supplied `THE_ARCHIVE_ACT_I_SCENES_01_02_03_FULL_REWRITE.txt` plus standalone `THE_ARCHIVE_SCENE_02_FULL_CONVERSATION_FINAL.txt` and `THE_ARCHIVE_SCENE_03_FULL_CONVERSATION_FINAL.txt`. They are a subsequent Act I revision, not dialogue implemented by this report. The combined manuscript supplies Scene 01; the standalone FINAL manuscripts should govern Scenes 02 and 03 where they supersede the combined versions. Important follow-on requirements include moving the sender arrival to the authored post-C09 boundary, replacing the provisional warning/disclosure with full authored branches, the revised private handoff text, conditional sender follow-ups and the later explicit Scene 04 article delivery/open gate. Until integrated and verified, the current executable retains the earlier first-three-scene screenplays and provisional intrusion described above.
