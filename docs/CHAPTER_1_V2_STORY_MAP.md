# Chapter 1 v2 — ten-scene story map (Phase 01)

Status: **staged definition only**. `src/content/chapter1V2.ts` is not imported by the live chapter library, graph, UI, save normalizer or event scheduler. The current playable route remains the baseline described in `CHAPTER_1_REWRITE_AUDIT.md`. This map specifies narrative obligations; it supplies no replacement dialogue, phone call or evidence asset.

| # | Act | Main scene | Identity | Required narrative contract |
| --- | --- | --- | --- | --- |
| 01 | I | A Message from Sophie | `OPEN-S01` | Preserve Sophie's first contact, player boundary and explicit group invitation. |
| 02 | I | The Uninvited Guest | `ch01_sc02_uninvited_guest` | Preserve group conflict, Lucas departure and selected Send. |
| 03 | I | Just Between Us | `ch01_sc03_just_between_us` | Preserve private Sophie conversation and manual article handoff. |
| 04 | II | The Public Story | `ch01_sc04_the_public_story` | Read the actual public article and limited TRACE index; no inferred older text. |
| 05 | II | Version History | `ch01_sc05_an_older_copy` | Compare observed update label, index and policy; conclusion stays source-limited. The aligned `ch02_scene05_version_history` replay identity remains compatible. |
| 06 | II | The Corrections Desk | `ch01_sc06_the_missing_line` | Finish the main publisher inquiry at its proven limits. Optional Email, Desk correspondence and social Sends remain optional. |
| 07 | III | The Starred Number | `ch01v2_sc07_starred_number` | Return to the unnamed starred number in the labelled contact export. Who marked it and why remain unknown; require authored source and player response. |
| 08 | III | The Last Check-In | `ch01v2_sc08_last_check_in` | Investigate a last check-in only after its record, provenance and disclosure rules are authored. Do not invent a call, location, time or witness. |
| 09 | III | The Secondary Card | `ch01v2_sc09_secondary_card` | Investigate the secondary card only after its actual source and visibility gates are authored. Existing Scene 10's descriptor code alone supplies no card body. |
| 10 | IV | The Inventory Sheet | `ch01v2_sc10_inventory_sheet` | Deliver a source-supported investigation milestone, selected player stance and Sophie's authored phone call as the finale. Preserve the current inventory's limits until new source material exists. Completion and Chapter 2 unlock require separate explicit events and a manual next-chapter action. |

The four acts contain 3 + 3 + 3 + 1 main scenes. Optional chats, professional requests, calls, Browser pages, evidence views and old source investigations are activities inside scenes or separately accessible records; they do not enter the ten-scene array.
Every future v2 chapter registry must satisfy the same ten-main-scene invariant before activation. The separate historical Chapter 2 arc is not renumbered by this Chapter 1 staging work.

## Existing Scenes 11–18: disposition

These eight are editorial/structural previews and a historical route, not implemented final-route screenplays. Preserve their IDs and old-save behavior. None can silently become a v2 completion flag.

| Old # / planned title | Important clue or relationship | V2 disposition and prerequisite |
| --- | --- | --- |
| 11 Fourteen / Thirteen | 14 signed / 13 visible; no deletion proof | Defer as an optional later investigation. Require the actual note and index report; do not link it to Bus 4 or the starred number by implication. |
| 12 The Technician's Warning | Eli's technical limits | Defer to a later, authorized Eli contact. Recipient-specific introduction and delivered reply remain necessary. |
| 13 The Woman He Loved | Maya's personal account | Preserve as a future optional character exchange with consent; emotion does not establish document proof. |
| 14 The Friend Who Walked Away | Lucas's boundaries and Daniel friendship | Preserve as a later optional exchange; do not auto-return Lucas to the group. |
| 15 After Verification | Attributed post-verification timing claim | Defer until its recovered statement is actually inspected; signature and original remain unavailable. |
| 16 A Request for the Original | Scoped request for an original copy | Defer until a credible recipient route and specific missing source are established. Sending a request grants delivery receipt only. |
| 17 What We Can Prove | Four source classes and private summary | Reuse the classification method in a later investigation only when each input was genuinely inspected; do not import unearned findings into v2 Scene 10. |
| 18 The Role Still Active | Limited role trace and historical chapter ending | Preserve for the historical structural path. Do not use it to trigger the v2 finale or imply an active operator. |

The current final-route Byline, Missing Issuer, Transfer Register and Inventory Sheet investigations (old 07–10) remain accessible to existing saves. Their public documents, receipts and private notes may be secondary activities in v2 only after explicit source and access gates; they cannot auto-complete new 07–10 or award character knowledge. The old Scene 10 inventory observation may inform the new finale only when the player actually retained it. Its descriptor body, item match, original notice, publisher connection, culprit and Daniel's fate remain unknown.

## Implementation contracts for Phase 02+

1. Pin approved screenplays and sources for new 07–10, including the exact phone-call artifact and what Sophie may know. The current Calls app has no playable call implementation. A call cannot be used as an automatic evidence receipt.
2. Keep `chapter1V2.status` staged until every required entry, exit, choice, receipt, manual next-scene and save rule is implemented and tested. Then explicitly route **new games** to the v2 registry; existing active saves remain on their recorded graph.
3. Implement finale completion once, after real v2 Scene 10 objectives and the authored final call. Write distinct v2 chapter-complete and Chapter 2-unlock events. Show the title **THE PEOPLE HE LEFT BEHIND** and require an explicit Continue; no dialogue starts from the unlock alone.
4. Preserve source confidence: title matches, public correction-register absence, series transfer, box listing and descriptor reference are different observations. Every character receives only what the player sent to that recipient.
5. Test all ten numbered entries, no optional activity incrementing the count, each branch and actual Send, manual entry gates, duplicate completion, history preservation, legacy 11–18 saves, pending deadlines, replay snapshots and the Chapter 2 title-screen boundary.

## Phase 01 verification

`npm run typecheck`, `npm run lint` and `npm run build` passed. The full unit suite passed **1,417/1,417 tests in 54 files**, including three new staged-contract cases. `git diff --check` passed. The build retains its large-client-chunk advisory. No runtime route or UI was changed, so browser interaction tests were not rerun in this documentation/manifest phase.
