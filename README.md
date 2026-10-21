# THE ARCHIVE — Reboot Episode 01 playable candidate

This is the isolated reboot workspace for the mobile detective thriller. This supplied workspace uses its own IndexedDB database and does not touch legacy saves. Git metadata is not included in this directory.

## Run

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

Playwright uses the installed Chrome channel. To test with Playwright's bundled Chromium, install it and remove the `channel: 'chrome'` setting in `playwright.config.ts`.

## New-player opening: Sophie Mercer → Daniel mirror

New players now receive a first-contact chat from Sophie, recover Daniel's handwritten token, consent to a simulated Archive restoration, inspect his recovered phone and identify the missing index entry **without assuming a deletion**. The earlier Greyhaven Bulletin/Maya route remains available after the prologue. See [OPENING_REBOOT_CHAPTER1.md](./OPENING_REBOOT_CHAPTER1.md) for the scene and state contract. The APK in `artifacts/` is an older preview. Use the newly rebuilt `android/app/build/outputs/apk/debug/app-debug.apk` for the current candidate; see the Phase 05 report for actual build results.

## Phase 04 mirror and evidence UX

Daniel's recovered apps have local search, app-specific record views, mailbox/folder filters, offline metadata, independent Notes/album locks and an explicit recovered-evidence workspace. Inspection, saving observations, private associations and authenticated findings stay separate. No mirror association grants K02/R04 or discloses anything to Maya.

Six supplied Gallery PNGs now have thumbnails, full-image viewing, zoom, independent hidden-album locks and explicit unverified retention. Six main-character portrait hooks include initial fallbacks. The original collage was also split into six lossless PNG crops; its incompatible 2021/June/death claims are excluded from runtime. See the [Phase 05 report](./docs/PHASE_05_MEDIA_AND_DEVICE_REPORT.md) for the asset mapping and actual verification, and the [human playtest checklist](./docs/PHASE_05_HUMAN_PLAYTEST_CHECKLIST.md) for pending device acceptance. See [ARCHITECTURE.md](./ARCHITECTURE.md) for the current save/transition layers.

## Current scope

Phase 03B connects the authored Episode 01 core route from S01 through S30 and all seven investigation contracts in the fictional phone. The player compares public records, explicitly sends any tip or message, works through date and source checks, requests and verifies a redacted GCRO export, and reaches an evidence-limited cliffhanger. Search, Maps, Files, Archive, Messages and a private Case Board have scoped case interactions; optional sharing and personal conversations can be declined. Phase 03C added GCRO failure states, same-tab interrupted-write recovery, two-tab conflict protection and development-only playtime instrumentation. See the [Phase 03C final report](./docs/implementation/phase-03c/PHASE_03C_FINAL_REPORT.md) for verified routes, tests and remaining risks. Gate B remains **IN PROGRESS** pending physical Android QA, human playtests and restore/rollback acceptance. The [Phase 03B coverage matrix](./docs/implementation/phase-03b/00_INDEX.md) and [Phase 03A handoff](./docs/implementation/phase-03a/04_PHASE_03A_HANDOFF.md) record the earlier scope.

## Android preview

An earlier **debug preview** of the Phase 00 UI shell is available at [artifacts/THE_ARCHIVE_UI_Prototype_2026-10-12-debug.apk](./artifacts/THE_ARCHIVE_UI_Prototype_2026-10-12-debug.apk). It predates the current Episode 01 integration. A current Phase 04 debug build is generated at `android/app/build/outputs/apk/debug/app-debug.apk`. It includes the Sophie-first opening and current mirror UI. No physical-device or signed-release acceptance is claimed.

To rebuild with the installed Android SDK and JDK:

```powershell
npm ci
npm run build
npx cap sync android
cd android
.\gradlew.bat assembleDebug
```

The rebuilt APK is `android/app/build/outputs/apk/debug/app-debug.apk`. Do not move narrative authoring documents into `public` or Android assets; they contain production spoilers.
