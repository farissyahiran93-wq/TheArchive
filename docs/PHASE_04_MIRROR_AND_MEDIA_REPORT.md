# Phase 04 - recovered iPhone realism, source UX and Episode 01 polish

Historical phase report. Gallery availability and portraits are superseded by [Phase 05](PHASE_05_MEDIA_AND_DEVICE_REPORT.md). The results below describe the earlier build.

19 October 2026. Existing project: `D:/Web app/Detective games`. No new project, ZIP, Episode 02, culprit identification or fate reveal was introduced. This supplied workspace has no Git metadata; modified paths are listed below instead of claiming a Git diff.

## Baseline verified before integration

The latest pre-Phase-04 code actually passed **57 unit tests in 10 files** and **33 browser tests** (3.4 minutes). These were executed again, not inferred from the earlier report. The existing six-Act coverage matrix and story definitions still contain exactly **30 canonical scenes, E01-S01 through E01-S30**. Fourteen Sophie outline beats are separate OPEN-B labels, not fourteen additional canonical scenes. The prior Android result is superseded by the final build result recorded below.

## Implemented recovered-device UX

- Consistent dark, read-only recovered device: four-column app home, local navigation, app search, source drawers, selectable records, 44px controls, safe-area padding, reduced-motion handling and source-specific details. No live device/contacts/GPS/account API is used.
- Messages: preserved existing threads, individual recovered bubbles, honest thread timestamp labels, unknown individual times, read-only composer and linked contact/history navigation. No outgoing Daniel impersonation.
- Mail: Inbox/Sent/Drafts filters, local search, subject/detail view, explicit missing header/attachment information, existing audit and public-preview records plus ordinary library correspondence. New ordinary material is authored fictional content with dates unavailable, not a verified post-disappearance contact.
- Photos: two public records and two independent hidden albums, selectable grid, honest image-availability states, full-screen viewer, metadata, text evidence inspection, Back/Escape and keyboard focus containment. Zoom is explicitly unavailable while image bytes are absent. Viewer is portalled at the device level so the simulated status bar cannot intercept Back.
- Notes: two readable notes, two independently protected notes, password submit forms, hints, and a recovered edit-history view that distinguishes the surviving 22:30 label from missing dates/earlier versions. No invented revision log.
- Maps: Saved/Searches/Routes filters and offline place/detail views. Missing route endpoints and timestamps stay missing; no GPS or last-known-location claim.
- Phone: All/Missed/Incoming/Outgoing filters, direction labels, unavailable audio/duration and no call action.
- Contacts: profiles with photo-unavailable states and links to the correct recovered Messages/Mail/Calls records. No invented contact photos, actual numbers or live contact permission.
- Files: Records/Personal/Protected navigation, retained paths/text, ordinary shopping record and an inaccessible encrypted-container reference. Opening the reference does not inspect or retain protected contents.
- Browser: History/Bookmarks navigation and archived local text; no network navigation or reconstructed current page.
- Archive Index: searchable report and source metadata. The existing ordinary-note + index inspection gate and explicit OPEN-INDEX deduction remain intact.
- Resume: interrupted active mirror progress retains its selected record. After the prologue, Archive opens to its home with an explicit Resume action for the last record; this preserves existing back/home behavior and player control.

## Evidence and cross-app work

`src/content/mirror.ts` supplies append-only MIR record IDs and six authored connections spanning Messages, Mail, Notes, Gallery, Maps, Browser and Index. Legacy title-based inspection keys remain unchanged.

Inspection, retention, connection and authentication are separate. Save recovered observation calls a pure transition only after an unlocked record was actually viewed. MIR evidence stays `verified: false`, with source and timestamp limitations. Locked bodies are excluded from search. Protected containers cannot be inspected or saved.

A private recovered-evidence workspace is accessible from Daniel's apps and from the existing Case Board. Players select two retained sources and explicitly connect them. Eligible associations are labelled Observation or Hypothesis. Unsupported associations, including a causal link between the 14/13 index and Bus 4, are rejected. Links are removable and persist independently.

No MIR retention/link awards K01, K02, R04, an episode transition, character knowledge or a disclosure receipt. The canonical E001/E002/E003/E012 Board and GCRO verification/citation gates are preserved. Sophie and Maya receive only their existing explicitly sent scopes.

## Media audit and exact blockers

Available local media were inspected by path and usage:

| Existing asset | Valid use |
| --- | --- |
| `public/daniel-note.svg` | Authored photo-style note prop received by the player from Sophie; source-unverified. Not a Gallery asset in Daniel's earlier snapshot. |
| `public/e001-public-escort-row.svg` | Authored public Bulletin E001 row extract. Not an original recovered shelf photo or screenshot. |
| `public/greyhaven-phone-wallpaper.png` | Decorative wallpaper, no evidentiary metadata. |
| `public/greyhaven-wallpaper.svg` | Decorative wallpaper. |
| `public/archive-mark.svg` | App identity artwork. |

**No supplied image matches any of the four recovered Gallery entries.** Replacing those with wallpaper, generated photos, Sophie's later attachment or the Bulletin extract would misrepresent provenance. No such substitution was made. Generic painted thumbnails were replaced by explicit unavailable-media tiles and usable source-description viewers.

Six source images are needed to complete Gallery artwork:

| Record | Required source assets | Required source information |
| --- | --- | --- |
| MIR-GALLERY-1 / IMG_0410 | Original North Quay document-shelf photo, plus a thumbnail derived from that source | Author-approved surviving crop; original capture time if actually available; provenance. GPS stays absent unless legitimately authored/supported. |
| MIR-GALLERY-2 / message fragment | Cropped compare-the-originals screenshot, plus derived thumbnail | Surviving frame only. Sender/date outside the crop must remain unknown. |
| MIR-GALLERY-3 / Index fragments | Row-marker image crop AND partial timestamp crop | Actual image bytes, approved crop limits and source metadata. Neither authenticates the count by itself. |
| MIR-GALLERY-4 / Quay references | North Quay notice-board photo AND offline map screenshot | Approved bytes/crops; unreliable timestamp and absent GPS must not be filled in by inference. |

Missing contact portraits and call audio remain optional presentation assets, never substituted with real people or fabricated forensic evidence. Image zoom is supported only as a future capability once source bytes exist; the current disabled control explains the limitation. Photo production completeness remains blocked by the six Gallery assets, not by a password or story gate.

## Four password puzzles verified

| Item | Preserved answer | Accessible clue | Persistence and failure behavior |
| --- | --- | --- | --- |
| Revision Note | ECHO-7/14 | Sophie's saved note photo/transcript | Independent unlock; three hints; wrong answer retains progress |
| Public Comparison Note | BUS4 | Recovered Mail's North Quay / Bus 4 subject/body | Same; no mandatory dependency |
| Index Fragments Album | 7-14 | Ordinary Untitled Note's 7-14 range | Same; Gallery remains partially public |
| Quay References Album | NORTHQUAY | Offline North Quay saved place in Maps | Same; no visit/GPS inference |

All four correct/incorrect-answer paths, hint tiers and separate saved flags are exercised in unit tests with actual IndexedDB write/load. Browser tests exercise hidden-album hints/unlock/reload, Notes password interaction and reduced visual viewport entry. No hint is automatically displayed on opening a locked item; lock bodies, metadata descriptions and evidence-save actions are withheld until unlock. All remain optional to the existing S01-S30 route.

## Dialogue and continuity

- Sophie first-reply options no longer ask Who is this after she has introduced herself, and her Daniel answer avoids repeating the already delivered three-day line. Existing choice IDs and source scope stay stable.
- Existing Sophie queue deadlines, explicit Send, stable event IDs and resume behavior remain. No waits were increased.
- Maya stage threads retain reader position away from the bottom and provide Jump to latest. Replies, recipients, source permission gates and persisted event scheduling are unchanged.
- Saved Sophie's note viewer now supports Escape, focused Close and keyboard containment.

## Documentation conflicts reconciled

1. **Old Act 01 no-install entrance:** the screenplay now has a current precedence note explaining that only this entrance is superseded by the approved 2026 Sophie recovery prologue. Canonical ids and the original source text are retained.
2. **Bible S14 versus canonical S14:** all fourteen bible headings are now OPEN-B01-OPEN-B14. OPEN-B14 carries questions forward; actual completion remains canonical S30.
3. **Authenticated opening count overclaim:** the bible now says reported signed count, unverified. Later GCRO corroboration concerns the Bus 4 lineage and never retroactively authenticates Daniel's mirror count.
4. **Obsolete static Sophie/reissue descriptions:** current runtime branches and Phase 03c recovery are identified in the bible/matrix; historical QA remains historical.
5. **Architecture instructions:** AGENTS.md now names mirror.ts/board.ts and the separate metadata, inspection, retention, connection and authentication layers, append-only IDs and missing-media rules.

### Author decision still required

Sophie says three days and the last-seen branch says Three days ago; the Bulletin's verified/public chronology is last confirmed contact 4 October, report 5 October, brief 7 October, play 8 October. The runtime keeps those existing source-scoped statements. Deciding whether Sophie last saw him on 4 or 5 October requires Story Bible v2/author approval; no private contact was silently promoted into verified public chronology. Why the player was chosen, who sent recovery, the missing entry's cause, Daniel's fate and the culprit remain protected mysteries.

## Actual files changed

- `src/content/opening.ts`, `src/content/mirror.ts` (new).
- `src/game/opening.ts`, `src/game/mirror.ts` (new), `src/game/types.ts`, `src/game/store.ts`, `src/game/engine.ts`, `src/game/mirror.test.ts` (new).
- `src/App.tsx`; `src/ui/DanielMirror.tsx`, `src/ui/MirrorRecordView.tsx` (new), `src/ui/MirrorMediaViewer.tsx` (new), `src/ui/MirrorEvidenceBoard.tsx` (new), `src/ui/CaseBoardApp.tsx`, `src/ui/Phase03bScenes.tsx`, `src/ui/SophieConversation.tsx`, `src/ui/mirror.css` (new).
- `tests/e2e/phase04-mirror.spec.ts` (new). Existing tests are retained; no existing assertion, route or test was weakened, removed or skipped.
- `AGENTS.md`, `README.md`, `ARCHITECTURE.md`; `docs/EP01_SOPHIE_FIRST_SCENE_BIBLE.md`; `docs/narrative/phase-02/01_EPISODE_01_SCREENPLAY_ACT_01.md`; `docs/implementation/phase-03b/01_SCENE_AND_INVESTIGATION_MATRIX.md`; this report.
- Capacitor sync regenerates the existing Android project's web assets/plugin configuration. Browser runs update QA screenshots in `qa/phase-04` and existing QA folders. No new claimed source photograph was created.

## QA and Android results

Baseline: 57/57 unit tests, 33/33 browser tests. New unit suite: 69/69 tests in 11 files passed during implementation. Final settled-source command results are recorded below. Intermediate focused tests identified the media-overlay/status-bar pointer conflict and a JSX separator rendering error; both were repaired before final regression. Existing tests remain intact.

## Human playtest and physical-device UAT

The intended handoff is a human-playtest candidate, with missing Gallery image bytes clearly disclosed. It is not a production-release claim. Device UAT still needs Android safe areas and OS navigation; real keyboard show/hide, focus and password entry; touch scrolling and Back inside modals; process kill/relaunch and local storage durability; screen reader/focus order; reduced motion; and human pacing/continuity review through S30. Browser viewport resizing is not a physical keyboard test. Release signing, signed AAB/APK installation and store acceptance remain separate unchecked release work.

## Final executed acceptance checks

| Command/check | Actual result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS, no warnings in final run |
| `npm test` | PASS: 69 tests in 11 files |
| `npm run build` (also run by final `npm run cap:sync`) | PASS: 1,949 modules, 491.60 kB main JS / 148.05 kB gzip |
| `npm run test:e2e -- --workers=4` | PASS: 39/39 tests in 4.6 minutes; no skipped tests |
| `npm run cap:sync` | PASS: final production assets synced to existing Android project |
| `npx cap doctor` | PASS: Android; iOS not installed |
| `android/gradlew.bat assembleDebug` | PASS: final synced build; 93 tasks, 27 executed / 66 up-to-date |
| `adb devices` | No connected devices; no physical UAT performed |
| Canonical scene / outline inventory | 30 screenplay ids match all 30 matrix ids in order; 14 OPEN-B headings |

All 57 baseline unit tests and 33 baseline browser tests remain, with 12 new unit cases and 6 new browser cases. Every recovered app was exercised at 320, 375, 390 and 430px. The run generated 45 Phase 04 screenshots. Representative 320/375px app layouts, full-screen media and reduced-viewport password output were visually inspected. Browser width/viewport tests and focus containment do not establish real Android keyboard, assistive technology or device lifecycle acceptance.

Final debug APK: `android/app/build/outputs/apk/debug/app-debug.apk` (6,731,279 bytes). SHA-256: `28be6c60eb52d436081b4f3975e20704793aad2e9227b3ac3ddaadbc1257bc1e`

**Human playtesting: YES, as an Episode 01 browser/debug candidate with the six missing Gallery images explicitly disclosed.** Continuous Sophie-first through S30 social, quiet and late-tip paths remain playable on the tested routes. No known failing automated check remains.

**Production release: NOT accepted.** Gallery image completion is blocked on the six source assets listed above; chronology remains an author decision requiring Story Bible v2/approval; physical-device UAT, signed-release/AAB installation and store acceptance were not performed. No claim is made that every possible dialogue combination has been manually played.
