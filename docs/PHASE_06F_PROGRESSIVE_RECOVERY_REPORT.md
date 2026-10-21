# Phase 06F — Progressive recovery and narrative retention

19 October 2026. Implementation in the existing project. This is an implementation candidate with browser and Android regression verification blocked by the current execution environment; it is not a fully accepted phase or signed release.

## Scope and audit

Episode 01 remains **THE MISSING ENTRY**, with 30 canonical screenplay scenes E01-S01–E01-S30. Sophie-first recovery remains between S01 identity and S02 Bulletin entry. All six screenplay Acts, the scene/investigation matrix, Sophie bible, Phase 04/05 and current integration reports, recovered catalog, puzzles, media registry, store, save validator/journal, pure story transitions, existing unit/browser tests and Capacitor/Android configuration were reviewed. No Phase 06 report existed before this work. Historical tests are evidence of earlier builds, not results for this patch.

The source still implements the complete existing Bulletin/Bus 4/GCRO/S30 investigation. No screenplay scene, event ID, receipt, canonical engine branch, relationship choice, asset file, or Episode 02 authoring document was replaced. Existing tests exercise prologue pacing, all four optional puzzles, source authentication, disclosure privacy, GCRO negative/recovery branches and S30 completion. Browser execution for this version is still outstanding.

## Recovery architecture: before and after

Before: mirror access combined restoration, optional password flags, area names and presentation stamps containing ENCRYPTED. Partial surviving records, missing original bytes and passwords had no shared typed policy.

After: every existing MIR record has a RecoveryPolicy in the existing recovered-record catalog. It names the stable source, Daniel as owner, app via the existing area, episode boundary, required story-event receipts, discriminated availability, unverified snapshot provenance and explicit-recipient disclosure restriction. The existing lockId points to the four unchanged puzzle prerequisites. No parallel inventory, knowledge ledger or new database was introduced.

Availability separates:

- **available**: surviving record readable.
- **locked**: password prerequisite or missing decryption key. Only the four authored password puzzles have a player solution.
- **incomplete**: surviving text remains readable; missing context is not a password puzzle.
- **recovery-pending**: bytes require an authored source receipt.
- **source-unavailable**: another source is unavailable; a local recovery action cannot fabricate it.
- **access-restricted**: an explicit authorization/story-event receipt is required.

Only available, locked and incomplete occur on current item policies. Other states are engine support, not invented future records or a promise of upcoming packages. Before restoration, local content is recovery pending. Existing encrypted containers remain locked because their keys are absent; no password input is offered for them. No invented recovery percentage or pending job appears.

Pure mirror functions resolve availability and visibility for inspection, retention, navigation, lists, search, previews and thumbnails. The media viewer is mounted only by callers that pass the same inspection guard. Related-record links and retained-source lists use visibility rules too. Future episode records require explicit story prerequisites; changing episode number or completing S30 is insufficient. Unmet visibility rules hide titles/counts as well as content. Runtime bundled assets are not cryptographically protected; this is narrative access control.

The authored recoverySources registry currently contains only DANIEL-SNAPSHOT-01 and requires the existing OPEN-MIRROR-RESTORED receipt. restoreDanielMirror retains that source explicitly. recoverMirrorSource rejects unknown sources, empty prerequisite rules, missing receipts and duplicates, and has no evidence, relationship, message or knowledge side effects. A future approved recovery must add a legitimate source/prerequisite rule and an appropriate action through the existing store; there is deliberately no future recovery button or automatic episode package today.

## Episode 01 available content

All existing records retain their MIR IDs, order and title-based inspection keys:

- Messages: ordinary Sophie exchange, selected Maya/Lucas fragments, unidentified surviving header description.
- Email: unsent revision audit, limited public-preview context, ordinary library enquiry/reply.
- Gallery: the same two public records and two independent optional hidden albums; the same six compatible supplied PNGs and thumbnails.
- Notes: public Untitled note and ordinary reminder list, plus the two optional private notes.
- Maps: saved place, search history and incomplete route-cache description. No reconstructed route, visit or GPS.
- Calls: partial call-log descriptions, no audio or caller identification.
- Contacts: existing Sophie/Maya context only.
- Files/browser: existing ordinary shopping file, limited reference/index descriptions, local history/bookmark; encrypted container reference remains inaccessible.
- Archive Index: **14 signed / 13 visible / 0 deletion logs**, an unverified observation with cause undetermined.

Current records already provided believable ordinary family, shopping, library and work history. No extra people, significant events or filler collection was added. The mirror remains read-only. Portrait hooks for Daniel, Sophie, Maya, Lucas, Eli and Nora and dormant artwork remain unchanged.

## Optional locks and spoiler audit

Revision Note ECHO-7/14; Public Comparison Note BUS4; Index Fragments Album 7-14; Quay References Album NORTHQUAY. Answers, hints, independent flags and optional status are preserved. Existing players keep their access.

The BUS4 optional note previously supplied June Ellis and the blank Escort answer before the required public-source investigation. Its wording now asks the player to open and compare the older preview and current public record. The note is still accessible under the same ID, title, password and receipts. Its warning against merging the Bus 4 and 14/13 observations remains. Older saved evidence descriptions/receipts are not erased or rewritten. Players who previously read it cannot be made to unlearn it; no such claim is made.

No mirror record now names June Ellis. That finding remains in its established Bulletin/GCRO sources. No record identifies Daniel's fate, the anonymous package sender or a culprit. All mirror evidence remains unverified, including after unlock, inspection, saving or private linking. S30 remains role-class capability only. No automatic sharing with Sophie/Maya was added.

## Persistence and completion

Schema remains v1; the only optional addition is prologue.recoveredSourceIds. Save validation checks recognized source IDs, unique entries, restored snapshot and required delivered receipts. Old reboot saves omit the field and retain access through their existing restored and unlock flags; no backfill or migration is needed. Existing independent unlock/hint/navigation/evidence fields are preserved.

The legacy localStorage key the-archive:game-save:v1 is never read, overwritten, deleted or imported by this implementation. IndexedDB the-archive-reboot and its revision/conflict/journal protections remain primary.

S30 still sets the existing e01Complete marker, preserves observations and disclosure/relationship state, and offers the existing unavailable-continuation behavior. episodeRequirements remains empty. No Episode 02 scene or additional recovery is started or unlocked.

## Canon decisions and unresolved author questions

Resolved within this scope: remove the premature optional-note answer without removing its clue or access; replace stamp-based access with typed source policy; keep qualitative integrity because no current canonical 94% measurement exists. Snapshot coverage is PARTIAL; integrity is Unverified. Integrity is not equated to coverage.

Still requires author decision:

1. Sophie three-day absence testimony versus Oct 4 last contact, Oct 5 report, Oct 7 brief, Oct 8 play. Preserved as separate source statements.
2. Story Bible v2 remains unsupplied. No protected truth is inferred.
3. Existing ten-episode season proposal versus the requested provisional eight-episode framework. The new roadmap is a planning overlay, not a renumbering or silent rewrite of those documents.
4. Existing Episode 02 material originally introduces Sophie later; Sophie is already introduced by the approved reboot. Future E02 dialogue needs an authored continuity reconciliation while preserving knowledge boundaries. E02 prose is unchanged.
5. Raw collage dates/death headline/June row remain excluded as documented in Phase 05; the compatible six-PNG source choice remains subject to author confirmation.

## Actual validation

| Check | Result for this implementation |
| --- | --- |
| npm run typecheck | PASS |
| npm run lint | PASS |
| npm test | Default invocation blocked by Vite config subprocess spawn EPERM |
| npm test -- --configLoader native --pool threads | PASS, 77 tests in 13 files; all original 72 retained plus 5 new cases |
| npm run build | Default config-loader subprocess blocked by spawn EPERM |
| npm run build -- --configLoader native | PASS, production bundle generated |
| npm run test:e2e -- --workers=4 | BLOCKED at process launch, spawn EPERM; no browser scenario result claimed |
| npx cap doctor | PASS for installed Android; latest-version lookup returned unknown; iOS not installed |
| npx cap sync android | PASS after successful new production build |
| android/gradlew.bat assembleDebug | BLOCKED: access denied to Gradle wrapper lock under user .gradle |
| Physical Android UAT | NOT TESTED |

Five new unit cases cover initial content/ordinary access/no premature June answer, idempotent and unsupported recovery, incomplete versus missing-key/unavailable/restricted states, future visibility independent of password/S30 completion, and old completed-save access/receipt validation. Existing tests still cover all passwords, independent IndexedDB unlock persistence, prologue queues, source/evidence privacy, GCRO and S30. One additional browser scenario was authored for landing status, incomplete route readability, missing-key behavior and optional-note wording. There are 43 browser scenarios expected (42 existing plus one new); none is claimed passed for this patch.

Automatic approval review failed on elevated test attempts because its selected model was at capacity. The elevated actions were not executed; this was a review infrastructure failure, not an unsafe-action finding. Native config loading/thread workers allowed unit/build verification under the normal sandbox. Playwright still needs subprocess execution. Gradle still needs access to its existing user cache. Neither historical 42/42 browser results nor a pre-existing debug APK verifies the new build.

## Files modified

Hand-authored implementation and QA:

- src/content/mirror.ts — typed source/availability policies and authored source registry.
- src/content/opening.ts — optional public-comparison note wording.
- src/game/mirror.ts — pure availability/visibility/recovery guards and navigation protection.
- src/game/opening.ts — restoration source receipt and shared detail-inspection guard.
- src/game/types.ts — optional source receipts within existing OpeningState.
- src/game/engine.ts — validation of optional source receipts.
- src/ui/DanielMirror.tsx — shared access guard, truthful landing status, filtered lists/search/thumbnails/resume.
- src/ui/MirrorRecordView.tsx — visibility-filtered related links.
- src/ui/MirrorEvidenceBoard.tsx — visibility-filtered retained-source list.
- src/ui/mirror.css — compact snapshot-status layout.
- src/game/progressiveRecovery.test.ts — five regression cases.
- tests/e2e/progressive-recovery.spec.ts — one browser regression scenario.
- docs/PHASE_06F_PROGRESSIVE_RECOVERY_REPORT.md — this report.
- docs/EPISODE_01_08_RECOVERY_NARRATIVE_ROADMAP.md — provisional planning overlay.

Generated: dist/index.html and hashed JS/CSS production outputs; Capacitor copies of dist and generated plugin/config files under android/app/src/main/assets and existing Capacitor Android config locations. No Git metadata is supplied for a reliable repository diff. No source media was regenerated. No current debug-build pass or APK refresh is claimed.

## Remaining acceptance blockers

Run all 43 browser scenarios in an environment permitting Playwright child processes; resolve any failures and visually inspect the landing layout on small phones. Rebuild Android from the synced new assets with permitted Gradle cache access. Perform physical Android and human pacing/accessibility/save-resume playtesting. Obtain author decisions above before production acceptance. Signed APK/AAB/store validation remains separate. No 10/10 quality or Phase 06F completion claim is made while these checks remain outstanding.

Final settled-source rerun: typecheck/lint PASS; 77/77 unit tests PASS with native loader/thread pool; production build PASS (1,953 modules; main JS 500.08 kB, gzip 150.57 kB). Vite emits a non-blocking 500 kB chunk-size warning; bundle splitting remains an optimization opportunity. Capacitor sync copies this build. Browser/Gradle/physical-device limitations above remain unchanged.

## Phase 06F.1 verification follow-up
See [QA recovery and acceptance](PHASE_06F_1_QA_RECOVERY_ACCEPTANCE.md) for current results. The project-scoped Gradle-cache build now passes; standard npm test/build commands now use the proven native-loader/thread settings. Browser execution and approval-service capacity remain pending. This supplements rather than rewrites the historical Phase 06F results.
