# Phase 05 - Gallery media, character identity and human-device candidate

19 October 2026, existing workspace. No Git metadata is present, so this is a modified-file inventory rather than a Git diff. No Episode 02 or new culprit/fate/anonymous-sender identification was introduced.

## Asset choice and user-requested crops

The supplied original collage was split deterministically into six lossless PNGs under `artifacts/phase05/daniel-collage-crops/` and packaged as `artifacts/phase05/daniel-collage-6-crops.zip`. White panel gutters are excluded; embedded panel captions and all original text are retained. The decoded output pixels were compared with each exact source rectangle and match. Originals in Downloads were not modified. SHA-256, half-open crop rectangles, sizes and source names are recorded in `artifacts/phase05/asset-manifest.json`.

The same supplied directory also contains `TheArchive_Daniel_Gallery_6_Evidence_Assets`, a separate six-PNG set matching the existing record descriptions. This compatible set is used in the game as an explicitly communicated working assumption, pending any requested different source choice. It is not the six original collage crops. Runtime PNGs are byte-identical to these supplied separate sources; derived WebP thumbnails are presentation aids. No new image was generated or forensic metadata invented.

The distinction protects canon: the raw collage's Index crop 02 shows June Ellis and 2021 revisions; another panel says a student dies, and the message panel supplies a sender/date beyond the surviving-fragment description. Canonical Bus 4 sources concern 2019, and required findings must still be discovered through their authored scene/source gates. Those raw collage claims are excluded from runtime, thumbnails, search and evidence view. They are not promoted to verified facts. The compatible Index crop 02 contains only a partial 22:30 label, with source/date unavailable; it does not disclose June Ellis. A future switch to the raw collage needs author reconciliation and a pure scene/knowledge gate for sensitive images independently of album unlock, covering both thumbnail and full image. No such switch is claimed here.

## Integrated Gallery

| Image | Existing evidence record | Access | Runtime PNG | Pixels |
| --- | --- | --- | --- | --- |
| Shelf photo | `MIR-GALLERY-1` | Ordinary Gallery | `01-shelf-photo.png` | 1425 x 1230 |
| Message crop | `MIR-GALLERY-2` | Ordinary Gallery | `02-message-crop.png` | 1080 x 1420 |
| Index crop 01 | `MIR-GALLERY-3` | Index fragments / 7-14 | `03-index-crop-1.png` | 1120 x 1450 |
| Index crop 02 | `MIR-GALLERY-3` | Index fragments / 7-14 | `04-index-crop-2.png` | 1120 x 1450 |
| Notice-board photo | `MIR-GALLERY-4` | Quay references / NORTHQUAY | `05-notice-board-photo.png` | 1425 x 1178 |
| Map screenshot | `MIR-GALLERY-4` | Quay references / NORTHQUAY | `06-map-screenshot.png` | 1080 x 1550 |

Two public items and two independent hidden albums preserve every existing record title, inspection key, MIR ID, optional password and hint tier. Index 7-14 and Quay NORTHQUAY remain separate; Notes ECHO-7/14 and BUS4 also remain unchanged. Locked image elements/requests are absent until their respective unlock. Search still excludes locked bodies. Viewing an image does not bypass the mandatory comparison path.

Gallery has thumbnails, selected-image open actions, full PNGs loaded on demand, within-album Previous/Next, 100-400% zoom, pan/scroll and Fit, loading feedback, unavailable caption/retry, Back/Escape and keyboard focus containment. The device-level portal stays above simulated status/navigation chrome. The retained-evidence workspace opens those images directly under the same access guard. Full artwork is shown with contain sizing rather than a cropped evidence frame. Source captions and absent timestamp/GPS remain explicit. Map art is offline saved-place context, never proof of a visit.

Inspection, retention, private Observation/Hypothesis associations and verified findings remain separate. Existing pure transitions and guards are unchanged: Save recovered observation is explicit and idempotent; every MIR record stays `verified:false`. Opening/zooming/saving/linking cannot grant K01, K02, R04, recipient knowledge or a canonical scene. The 14/13 count mismatch remains separate from Bus 4.

## Character identity

Six existing character IDs have static portrait hooks in `src/content/characters.ts`: Daniel Mercer, Sophie Mercer, Maya Chen, Lucas Grey, Eli Ward and Nora Vance. Runtime avatars are 160 x 160 WebP, with full identity artwork fitted within 720 x 720 preserving aspect ratio. Exact filenames are `<id>-avatar.webp` and `<id>.webp` under `public/media/portraits/`; dimensions and hashes are in the manifest. The user supplied the name-to-art mapping; appearance does not establish narrative identity.

`CharacterAvatar.tsx` provides async/lazy loading and initial fallback on error. Existing Sophie/Maya inbox and live-thread surfaces, recovered named Messages/Contacts/Calls, and Daniel's owner/evidence references use it where content already names them. Unknown number, Blocked caller, library and development fixture keep anonymous/initial fallbacks. Portraits are identity illustrations, never authenticated recovered contact photographs or proof that an unknown caller is someone. Eli/Nora are prepared without inventing new conversations. Ana Pierce, Rowan Bell, Vivian Hale and June Ellis are prepared as dormant artwork only; no new contact/story introduction was made.

## Save and story compatibility

No save schema, migration, state-transition implementation, persistence engine, legacy key behavior, canonical content, scene IDs, event IDs or recipient receipts changed. Media paths are static content, not copied into save data. Optional unlocks, navigation and evidence retention use existing schema-v1 fields. Old saves and actual IndexedDB write/load remain exercised by existing tests.

All 30 screenplay headings remain E01-S01 through E01-S30. Sophie-first and S30 route tests are retained. The opening discrepancy is not authenticated by the artwork. No audio or recovered full mail attachment was invented.

## Chronology and source conflicts

The author decision from Phase 04 remains: Sophie says three days since Daniel was seen/missing, while public last contact is Oct 4, missing report Oct 5, brief Oct 7 and current play Oct 8 2026. Story Bible v2 has not been supplied. These can mean different reference points; runtime testimony is preserved rather than silently changing canon. The raw collage's 2021 event dates and death headline are additional visual-source conflicts and are excluded, as described above. An ordinary shelf folder label Operations 2022 in the compatible pack is not the Bus 4 event date, capture date or proven record connection.

## Modified and added files

- `scripts/prepare-phase05-assets.py`; `artifacts/phase05/asset-manifest.json`; six crop PNGs and crop ZIP; prepared media library; `public/media/gallery/` (six unchanged PNGs, six WebP thumbnails), `public/media/portraits/` (ten artwork/avatar pairs, six active hooks).
- `src/content/galleryMedia.ts`, `src/content/characters.ts`, `src/content/mirror.ts` (availability/association wording only).
- `src/ui/CharacterAvatar.tsx`, `RecoveredThumbnail.tsx`, `DanielMirror.tsx`, `MirrorRecordView.tsx`, `MirrorMediaViewer.tsx`, `MirrorEvidenceBoard.tsx`, `Messenger.tsx`, `OpeningPrologue.tsx`, `SophieConversation.tsx`, `BulletinSlice.tsx`, `Phase03bScenes.tsx`, `mirror.css`.
- `src/game/media.test.ts`, `src/game/mirror.test.ts`; `tests/e2e/phase05-media.spec.ts`, `tests/e2e/phase04-mirror.spec.ts`.
- `AGENTS.md`, `README.md`, `ARCHITECTURE.md`, historical-report supersession notes, this report and `docs/PHASE_05_HUMAN_PLAYTEST_CHECKLIST.md`.
- Capacitor sync regenerates existing Android web assets/plugin config; browser suites refresh existing QA output and `qa/phase-05`.

## QA status

Baseline was executed again: 69 unit tests in 11 files and 39 browser tests passed before runtime changes. Final results and APK integrity are appended below after settled-source checks. Updated Phase 04 assertions now require real loaded images and functioning zoom instead of the superseded missing-source placeholder; all existing navigation, width, unlock/hint/reload and other app checks remain. New tests add six actual PNG integrity/hash/dimension checks, lock mapping, known/unknown identity hooks, locked-image request privacy, all six full-image loads, within-album navigation, unverified retention/reload, evidence viewer, image failure/retry and portrait failure fallback.

## Human readiness and remaining limits

Intended status is an Episode 01 human-playtest candidate. No Gallery or six-main-character identity artwork is missing. Recovered audio, original mail attachments, original forensic chain, EXIF capture times/GPS and unsupplied Story Bible v2 remain unavailable; none is fabricated. Physical-device acceptance, actual IME/OS Back/lifecycle/TalkBack checks and human pacing remain unperformed unless a later result below explicitly says otherwise. Follow `PHASE_05_HUMAN_PLAYTEST_CHECKLIST.md`.

Signed production release remains unaccepted: physical UAT, author chronology approval, signed APK/AAB installation and store validation are separate outstanding requirements. A passing debug build does not satisfy them.

## Build and packaged asset verification

Final production build (via `npm run cap:sync`) passed: 1,953 modules; main JS 497.50 kB / 149.80 kB gzip; CSS 99.69 kB / 21.32 kB gzip. Capacitor Android sync and Doctor passed. iOS is not installed. The existing Gradle debug build passed after final sync: 93 tasks, 27 executed / 66 up-to-date. Existing flatDir metadata warnings remain non-blocking.

Debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`, 16,793,109 bytes. SHA-256: `906e9debb83ee8572b4b6a614d611f650f4862a14051d6c2e32d76490bad9950`. All six PNGs were extracted/read from the APK and their hashes match the supplied compatible source bytes. Gallery PNG payload is 9,027,047 bytes; all six lightweight thumbnails total 51,964 bytes. Integrity results: `artifacts/phase05/build-integrity.json`.

`adb devices` returned no connected devices. Physical Android UAT was not performed. The PNG ZIP contains exactly six original-collage crop files, each checked against the asset manifest hash.

## Final settled-source acceptance results

| Check | Actual result |
| --- | --- |
| `npm run typecheck` | PASS |
| `npm run lint` | PASS |
| `npm test` | PASS, 72 tests in 12 files |
| `npm run build` (executed by final cap:sync) | PASS |
| `npm run test:e2e -- --workers=4` | PASS, 42/42 tests in 4.0 minutes, no skips |
| `npm run cap:sync` | PASS, final production assets copied |
| `npx cap doctor` | PASS, Android |
| `android/gradlew.bat assembleDebug` | PASS after final sync |
| Packaged Gallery asset hashes | PASS, six PNGs match source files |
| Original-collage crop ZIP hashes | PASS, six exact crop outputs |
| Canonical scene inventory | 30 headings, E01-S01 through E01-S30 |
| `adb devices` / physical UAT | No connected devices; NOT performed |

All 69 baseline unit tests and 39 baseline browser scenarios remain, with 3 added unit cases and 3 added browser cases. The one replaced media-availability unit assertion now verifies the supplied six-PNG mapping; superseded unavailable-image browser assertions now demand loaded source pixels and real zoom while retaining the previous scenario coverage. Intermediate focused checks passed 9/9, then a full run caught two pixels of Fit container clipping on portrait media; the container sizing was corrected, the full-image containment assertion retained, focused 3/3 passed and the final 42/42 run passed. No test was removed, skipped or weakened to conceal a failure.

Gallery and all other recovered apps are exercised at 320/375/390/430px; existing small-phone/desktop and reduced keyboard-viewport checks remain. Representative media and portrait screenshots in `qa/phase-04` and `qa/phase-05` were visually inspected. Available thumbnails total only about 52 kB; full PNGs load only on demand, and locked images are never requested by the tested UI before unlock. This does not claim cryptographic access control over bundled assets.

**Episode 01 is ready for full human playtesting as a browser/debug candidate**, with the compatible-set choice and chronology question disclosed. Save schema v1, all four optional puzzles, explicit Send, recipient privacy, source authentication gates and S30 are preserved. **Signed production release remains blocked** on physical-device acceptance, author chronology/source decisions and signed-release validation. No physical UAT, human completion-time measurement or signed store acceptance is claimed.
