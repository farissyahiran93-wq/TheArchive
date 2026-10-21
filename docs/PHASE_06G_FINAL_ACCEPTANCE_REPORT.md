# Phase 06G — Final gameplay verification and Episode 01 acceptance

19 October 2026, existing project. **Automated Episode 01 gameplay acceptance: PASS.** Recommend proceeding to controlled human and physical Android playtesting. **Production release acceptance: BLOCKED** pending the author/device/human requirements below. No Episode 02, new scene or canonical answer was implemented.

## Actual verification

| Item | Status | Result / evidence |
| --- | --- | --- |
| TypeScript | PASS | npm run typecheck |
| Lint | PASS | npm run lint |
| Unit/component suite | PASS | **161/161 tests in 15 files**, 0 failed/pending; original 77 retained, 84 added |
| Browser suite, final settled source | PASS | **43/43 scenarios in 17 files**, 3.96 minutes, 0 skipped/unexpected/flaky; all existing assertions retained |
| Production build | PASS | 1,953 modules; JS 500.21 kB / gzip 150.65 kB |
| Capacitor Doctor / Android sync | PASS | Installed Android setup and current production copy; latest dependency lookup unknown; iOS not installed |
| Final Android debug rebuild | PASS | Offline project-cache helper; 22 seconds; 93 tasks, 27 executed / 66 up-to-date |
| APK signature and asset integrity | PASS | APK v2 debug signature; all 40 dist files byte-identical inside package; six Gallery PNGs retained |
| Scene and choice source inventory | PASS | 30 scenes E01-S01–S30, 56/56 authored choice IDs present; inventory alone is not branch execution proof |
| Progressive recovery / all four passwords / representative old saves / S30 | PASS | Executed unit and browser assertions, including separate unlocks, old schema-v1 fixtures and untouched legacy key |
| Screenshot source/presentation sample review | PASS | Inspected Sophie portrait/typing, small-screen mirror index, Gallery shelf/map viewer and S30 capture; limited visual sample |
| Normal restricted-sandbox browser launch | BLOCKED | Node child-process spawn EPERM persists in that context; approved execution successfully ran the full suite |
| Automatic execution approval retry | PASS | Required local test process execution was permitted; prior capacity blocker cleared for these runs |
| Independent external code/design sign-off | NOT TESTED | Tool-execution approval is not independent code or canon approval |
| Physical Android UAT | NOT TESTED | No physical-device playtest/install evidence supplied or performed |
| Full-length human pacing / emotional acceptance | NOT TESTED | No measured player playtime, comprehension study or human all-branches sign-off |
| Author source/chronology reconciliation | BLOCKED | Outstanding source decisions preserved below |
| Production signing / AAB / store / release acceptance | NOT TESTED | Debug compilation/signature does not establish production acceptance |

Machine-readable evidence: [browser results](../artifacts/phase06g/browser-results.json), [browser output](../artifacts/phase06g/browser-output.log), [unit results](../artifacts/phase06g/unit-results.json), [scene inventory](../artifacts/phase06g/scene-inventory.json), [choice inventory](../artifacts/phase06g/choice-inventory.json), [APK integrity](../artifacts/phase06g/debug-package-integrity.json), [signature output](../artifacts/phase06g/apk-signature.log), [Android build output](../artifacts/phase06g/android-build.log). Changed runtime/test source hashes were checked after the final run; none changed during it.

## Run history and defects resolved

| Finding | Current status | Resolution and actual evidence |
| --- | --- | --- |
| Maya reply timestamps could precede the triggering player turn | PASS | Corrected S/P/C choice-group scene anchors and use a pure monotonic Maya-conversation timestamp helper for new sends/replies, including late tips and follow-ups. Ignore unrelated development/Sophie wall-clock dates. Existing saved timestamps, dialogue, event IDs, sources and receipts are unchanged. Branch tests check exact answers, chronological ordering and replay safety. |
| S26 framing reply lacked Bulletin typing feedback | PASS | C03-FRAME events were absent from StageThread pending detection. Added the same status as other pending replies. A deterministic component regression first reproduced FAIL (stage 26 missing role=status, stage 14 passed); both now pass. Rendering still cannot send messages or grant facts. |
| Narrow-phone history test erased required restoration receipts | PASS | Test seeding replaced deliveredEvents wholesale while retaining recoveredSourceIds. The unchanged save validator correctly rejected the inconsistent fixture. The fixture now preserves story receipts while adding fixture events. No assertion or save-validation rule was removed, skipped or relaxed. |
| Exploratory browser failures | PASS | First authorized exploratory run: 39 PASS / 4 FAIL. One failure was the fixture above; three timeouts occurred around live source/HMR changes, including a transient mounted GCRO view with reset state. That run is not acceptance evidence. Its error contexts are retained under artifacts/phase06g/exploratory-failures. |
| Fresh stable and final acceptance runs | PASS | A fresh settled-source run passed 43/43. After the additional regression-proven typing fix, the full suite ran again and passed 43/43 on final source. Before-indicator JSON/log retained separately. No retries or timeouts were relaxed. |

Final passing results supersede the exploratory failures; the earlier results are disclosed rather than silently discarded. Runtime changes are confined to dialogue presentation/timestamps. No defect required inventing a story fact, changing an evidence rule or rewriting canon.

## Walkthrough verification

PASS in this table means executed automation plus source review, not a physical/human playthrough.

| Required flow | Status | Evidence and boundary |
| --- | --- | --- |
| 1. Sophie First Contact | PASS | Fresh setup, initial paced queue, reload/reduced-motion scenarios; no auto player response |
| 2. Natural iMessage conversation | PASS | Every Sophie choice tested for exact answer/receipt and save/resume; human naturalness separately NOT TESTED |
| 3. Daniel handwritten note | PASS | Visible attachment/transcript, deliberate read/save, note/source unverified |
| 4. Recovery authorization | PASS | Inspect offer and explicit Restore; no restoration from merely viewing an offer |
| 5. Archive installation simulation | PASS | Fictional read-only restoration only; no actual APK installation or device-account access implied |
| 6. Daniel iPhone mirror | PASS | Eleven areas, Home/Resume, interrupted record navigation, read-only behavior |
| 7. Messages/Mail/Photos/Maps/Notes | PASS | Ordinary records, folders/search, incomplete text and metadata limits; Maps does not prove a visit |
| 8. Optional locked Notes/Gallery | PASS | ECHO-7/14, BUS4, 7-14, NORTHQUAY, wrong answers, hints, independent persistence, no locked pixels/body leakage |
| 9. 14/13 index observation | PASS | Ordinary note and Index detail inspection required before explicit discrepancy action; 0 deletion logs does not prove deletion |
| 10. Sophie follow-up / Maya introduction | PASS | Counts/uncertainty/withhold disclosure branches and all bridge choices preserve recipient scope; Maya gets no mirror facts |
| 11. Greyhaven Bulletin | PASS | Full brief and source-limited preview, responsive source fidelity, public route and editor-channel verification |
| 12. Bus 4 comparison | PASS | Compare Escort field and save LEAD explicitly; remains separate from mirror index observation |
| 13. GCRO investigation | PASS | Source map, narrow request, issuer/session/pages/redactions/actual bytes; delayed/refused/corrupted branches withhold R04/K02 |
| 14. Evidence verification / S30 | PASS | Cite E012/E003/E002, save K02, role-class or narrower unknown-status card, explicit End episode, reload completion; no culprit or fate answer |

Significant route families: cooperative handle, anonymous skeptical, quiet/no-share, image/text/defer/no-send, Messages/Archive independent permissions, optional note/check-in/framing, source-negative/quarantine, no-tip private research, late-tip final hold/recovery, private/shared final findings and available/unavailable role card all have executable coverage. The no-tip route deliberately holds the ending until minimal explicit contact and channel verification; it does not auto-send or repeat GCRO.

The new 82 branch tests cover 25 Sophie options, 44 later Maya options, all three private lead interpretations, nine eligible S11 primary/follow-up combinations and late-tip chronology. Two additional component tests verify share/framing pending feedback without state promotion. Existing tests cover the other source, permission, refusal, puzzle, integrity and completion guards. This is not a claim that every Cartesian combination has been human-played.

## All 30 canonical scenes

Each row passed the source/transition review and is covered by the automated route families above. Optional scenes are reached in the social route and deliberately omitted in the quiet/public routes. S01 is the existing identity event; the persisted investigation slice begins at S02. Sophie OPEN-B01–B14 is an outline crosswalk, not a replacement scene count.

| Scene | Authored title | Source review | Automated flow |
| --- | --- | --- | --- |
| E01-S01 | A name on the screen | PASS | PASS |
| E01-S02 | A quiet morning | PASS | PASS |
| E01-S03 | Daniel's empty chair | PASS | PASS |
| E01-S04 | The older preview | PASS | PASS |
| E01-S05 | The current copy | PASS | PASS |
| E01-S06 | One line apart | PASS | PASS |
| E01-S07 | A sentence you can defend | PASS | PASS |
| E01-S08 | The shape of a tip | PASS | PASS |
| E01-S09 | Press Send | PASS | PASS |
| E01-S10 | The return route | PASS | PASS |
| E01-S11 | Someone answers | PASS | PASS |
| E01-S12 | A name is not a channel | PASS | PASS |
| E01-S13 | The exact row | PASS | PASS |
| E01-S14 | What to share | PASS | PASS |
| E01-S15 | The thing Maya chose to post | PASS | PASS |
| E01-S16 | Two invitations | PASS | PASS |
| E01-S17 | The permission sheet | PASS | PASS |
| E01-S18 | What a workspace holds | PASS | PASS |
| E01-S19 | The date printed on an image | PASS | PASS |
| E01-S20 | A notice about change | PASS | PASS |
| E01-S21 | Put the cards in order | PASS | PASS |
| E01-S22 | The boring explanation | PASS | PASS |
| E01-S23 | Search without a secret door | PASS | PASS |
| E01-S24 | A note with a closed door | PASS | PASS |
| E01-S25 | A question that isn't about the file | PASS | PASS |
| E01-S26 | What to say aloud | PASS | PASS |
| E01-S27 | Ask the office that holds the past | PASS | PASS |
| E01-S28 | Four pages, one claim | PASS | PASS |
| E01-S29 | After verification | PASS | PASS |
| E01-S30 | The part that is still open | PASS | PASS |

## Narrative quality and author decisions

[Narrative review](PHASE_06G_NARRATIVE_REVIEW.md) records all requested review dimensions. Question/answer continuity, agency, source discovery, recipient boundaries, spoiler limits and branch transitions pass source/automated review. Human naturalness, slow-burn pacing and comprehension remain NOT TESTED. A four-minute automated suite is not four minutes of story play, and does not establish the screenplay's estimated duration or a quality score.

Author reconciliation remains BLOCKED on:

1. Sophie's three-day testimony versus Oct 4 last contact, Oct 5 report, Oct 7 brief and Oct 8 play. New message-order corrections do not silently resolve this testimony conflict.
2. Unsupplied Story Bible v2; protected fate/sender/culprit answers cannot be inferred.
3. Provisional eight-episode roadmap versus earlier ten-episode plan, and already-introduced Sophie versus older Episode 02 entrance. Existing E02 authoring remains untouched.
4. Previously disclosed confirmation of the canon-compatible six-PNG source choice. Original collage's incompatible dates/death/June facts remain outside runtime.

No original media, portrait mapping, puzzle answer, source/knowledge guard, choice ID, canonical scene or S30 outcome was replaced. Schema v1, independent optional unlocks, existing evidence/relationship/disclosure fields and legacy localStorage behavior remain unchanged. Old saves keep their stored messages; only newly delivered turns use corrected display ordering. Real-phone upgrade acceptance remains NOT TESTED even though representative old-save fixtures pass.

## Android handoff

Device worksheet and installation commands: [Android UAT checklist](PHASE_06G_ANDROID_UAT_CHECKLIST.md). Exact local terminal commands and output collection: [Windows QA commands](PHASE_06G_WINDOWS_QA_COMMANDS.md). Checklist preparation: PASS. Physical execution: NOT TESTED.

APK: `D:/Web app/Detective games/android/app/build/outputs/apk/debug/app-debug.apk`. Size: **16,794,161 bytes**. SHA-256: `c2e706d89b0fd11640c628a8bf20f5761eb6d299c634e8193b8b139ad4edd01e`. Debug signer certificate SHA-256 remains `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`. Use install -r for a tested upgrade; do not uninstall or clear the only saved game.

Incoming in-story calls, sound and haptics are not newly implemented by this verification task. The worksheet covers actual OS call interruptions, silent/DND behavior and persistence without inventing an Episode 01 call scene or claiming untested audio support.

## Modified files and practical limits

Runtime: src/game/slice.ts, src/game/phase03b.ts, src/ui/Phase03bScenes.tsx.
QA: src/game/episode01Branches.test.ts, src/game/episode01Presentation.test.tsx, tests/e2e/foundation.spec.ts (fixture only; assertions retained).
Docs: this report, PHASE_06G_NARRATIVE_REVIEW.md, PHASE_06G_ANDROID_UAT_CHECKLIST.md, PHASE_06G_WINDOWS_QA_COMMANDS.md and a supersession link in PHASE_06F_1_QA_RECOVERY_ACCEPTANCE.md.
Generated evidence: artifacts/phase06g, refreshed existing qa/test-results captures, dist and Capacitor/Android debug outputs. No content, screenplay, media, password or save-schema source was edited. No Git metadata is supplied for a repository diff.

Nonblocking build warnings remain: main JS just exceeds Vite's 500 kB advisory threshold, existing Gradle flatDir warnings and denied Android metrics-settings write in the user home. They do not invalidate the successful build/package checks, and are not evidence about real-device performance. No security setting, browser sandbox flag or user-cache ACL was relaxed.

## Final recommendation

| Acceptance item | Status | Recommendation |
| --- | --- | --- |
| Episode 01 automated gameplay milestone | PASS | Accept this browser/debug candidate for controlled human playtesting |
| Browser QA execution blocker | PASS | Resolved for the approved full-suite runs; normal restricted sandbox still cannot spawn Node children |
| Remaining known reproducible automated gameplay failures | PASS | None remain in the final executed suites; not a guarantee of defect-free software |
| Author/canon final reconciliation | BLOCKED | Obtain the decisions listed above without inventing replacements |
| Physical Android / full human playthrough | NOT TESTED | Execute and retain the device worksheet and player pacing/comprehension evidence |
| Independent human/code/editorial sign-off | NOT TESTED | Required separately; process approval is not code approval |
| Production release acceptance | BLOCKED | Await physical/human/author sign-off and separate production signing/store validation |

Episode 01's automated route verification is complete for this build. Release readiness is not claimed. Episode 02 remains unavailable and unimplemented.
