# Phase 06F.1 — Blocked QA recovery and acceptance

19 October 2026. Existing project; verification/configuration only. No Episode 02 implementation or story/content/media/save-schema change.

## Acceptance verdict

**PARTIAL ACCEPTANCE: unit/build/package checks pass; full browser acceptance remains BLOCKED.** The Android debug build blocker is resolved. Automatic approval review remains pending because the service is at capacity. Physical Android UAT, human narrative acceptance and signed production-release acceptance are NOT TESTED.

## Browser diagnosis

- Google Chrome exists at `C:/Program Files/Google/Chrome/Application/chrome.exe` (4,720,792 bytes). No browser reinstall was justified.
- `npm run test:e2e -- --list` succeeds and discovers **43 scenarios in 17 files**, including progressive recovery, all four passwords, independent persistence, legacy preservation and complete S30 routes.
- `npm run test:e2e` fails before running scenarios with **spawn EPERM**. A separate normal-sandbox probe using Node child_process.spawnSync fails identically for both the installed node.exe with `--version` and Windows cmd.exe with `/c ver`.
- This isolates a Node child-process execution restriction in the sandbox, independent of browser download/cache contents or gameplay assertions. There is no evidence of an absent browser, corrupted browser profile or assertion failure.
- An elevated local browser-suite retry invoked automatic approval review; it did not execute because the review service's selected model was at capacity. Status: **PENDING**, neither approved nor rejected on code/security merits.
- No test skip, assertion reduction, browser-sandbox disabling flag, global security setting, ACL change or alternate process-launch workaround was introduced. Browser tests are unchanged. A process-capable approved execution environment is still required.

## Gradle diagnosis and safe correction

`GRADLE_USER_HOME` was unset, selecting the user's `.gradle`. Its owner is TIGER/faris_7v6emz4, with user/SYSTEM/Administrators Full Control. The wrapper lock exists and has ordinary Archive attributes; its timestamp predates this task. No Java process was present when first inspected. The error was **Access denied**, not a Gradle lock timeout. These observations support sandbox write denial outside the workspace rather than wrong ownership or a demonstrated stale exclusive lock.

A write probe succeeded under project `.gradle-user-home`. Gradle 8.14.3 runs there with JDK 21.0.12.1. The existing distribution was copied read-only from the user cache into the project wrapper location to avoid an unnecessary download. No user-cache file, lock, ownership or ACL was deleted or changed. Dependencies were resolved into the project cache.

`GRADLE_USER_HOME=<project>/.gradle-user-home`, a process-scoped SDK path and `android/gradlew.bat -p android --no-daemon assembleDebug` produced **BUILD SUCCESSFUL: 93 tasks, 28 executed / 65 up-to-date, 1m 53s**. The newly synced Phase 06F production assets were packaged. Initial build emitted a nonfatal Android analytics-settings write warning in the user's `.android`, plus the existing flatDir warnings.

`scripts/build-android-debug.ps1` makes the project cache reusable, sets a local Android user directory, preserves the existing debug signer by copying only debug.keystore if necessary, finds the default installed SDK only when no SDK environment is configured, supports `-Offline` after dependency priming, checks Gradle's exit code and restores its environment variables in finally. It neither installs an SDK nor changes global permissions/security. The project cache and debug key are ignored by Git and Vite's watcher. The wrapper still uses its existing approved distribution URL/version.

Reproduction from the project root:

```powershell
npm run typecheck
npm run lint
npm test
npm run cap:sync
.\scripts\build-android-debug.ps1
# After dependencies are cached:
.\scripts\build-android-debug.ps1 -Offline
# Requires an environment permitting Playwright subprocesses:
npm run test:e2e
```

The helper builds the current synced Android assets; it does not silently run or claim web verification. Run cap:sync before building after future source changes. A clean project cache may need network access for the wrapper/dependencies. No elevation is required for the demonstrated Android build.

## Configuration corrections

`package.json`: dev/build now use Vite's native config loader; unit tests use the native config loader and the Vitest thread pool. Both settings were already proven in Phase 06F. This avoids the blocked config-bundling child-process path while retaining the same tests and jsdom environment. Plain `npm test` and `npm run build` now work without ad hoc arguments on the installed Node v26.4.0. No dependencies were upgraded.

`vite.config.ts`: ignore `.gradle-user-home` changes to avoid watching a large local build cache. `.gitignore`: ignore that cache. `scripts/build-android-debug.ps1`: scoped Android build helper. `docs/PHASE_06F_1_QA_RECOVERY_ACCEPTANCE.md`: this report. `docs/PHASE_06F_PROGRESSIVE_RECOVERY_REPORT.md`: historical-status cross-reference. `artifacts/phase06f1/debug-package-integrity.json`: packaged-asset proof. Generated dist/Capacitor/debug APK outputs were refreshed. No runtime narrative or test file was modified by this task.

## Actual results

| Check | Status | Evidence/limits |
| --- | --- | --- |
| npm run typecheck | PASS | Current configuration |
| npm run lint | PASS | Existing src/tests lint scope |
| npm test | PASS | **77/77 tests, 13 files**, unchanged assertions |
| npm run build | PASS | 1,953 modules; main JS 500.08 kB / gzip 150.57 kB |
| npm run test:e2e -- --list | PASS | Discovery only: 43 scenarios / 17 files |
| npm run test:e2e | BLOCKED | Node child-process spawn EPERM before scenario execution |
| Automatic approval review retry | BLOCKED / PENDING | Model capacity unavailable; action not executed |
| Capacitor Doctor | PASS | Android installed setup; latest dependency lookup unknown; iOS not installed |
| npx cap sync android | PASS | Copies current production assets |
| Android wrapper assembleDebug with local cache | PASS | 93 tasks; newly rebuilt debug APK |
| APK web-asset comparison | PASS | All 40 dist files byte-identical inside assets/public; six Gallery PNGs included |
| Canonical scene inventory | PASS | 30 screenplay headings E01-S01–E01-S30 |
| Gameplay assertion failures | None observed | Unit assertions pass; blocked browser suite supplies no pass/fail evidence |
| Browser visual inspection in this task | NOT TESTED | Browser execution unavailable |
| Physical Android UAT | NOT TESTED | No real-device playtest performed |
| Signed release/AAB/store acceptance | NOT TESTED | Debug signature/build is not production acceptance |

Build warnings: existing flatDir metadata warnings, and Vite's main JS chunk exceeds its 500 kB advisory threshold. Neither is hidden or converted into a pass claim about performance. The loader/thread correction does not weaken browser coverage or security.

Unit verification includes all five progressive-recovery boundary cases, every optional puzzle/independent IndexedDB unlock test, old completed-save access, unknown/duplicate recovery rejection, source/recipient privacy, legacy-key preservation, prologue event pacing/idempotence, GCRO refusal/correction/source checks and S30 completion variants. This establishes the pure-function and persistence behavior; it cannot substitute for the blocked end-to-end/UI tests. No old save is automatically migrated or reset.

## Human review / pending acceptance checklist

All boxes are **pending** unless separately signed off by a human. Review service capacity is not evidence for these decisions.

- [ ] Run all 43 Playwright scenarios in an approved environment with subprocess access; retain the output, resolve failures without skipping or weakening tests.
- [ ] Inspect snapshot home at 320/375/390/430px; partial coverage and unverified integrity must be readable without a fabricated percentage.
- [ ] Play Sophie first contact, explicit replies/Send, note/restore consent, ordinary Untitled note plus index comparison, and private/uncertain/counts disclosure branches.
- [ ] Confirm ECHO-7/14, BUS4, 7-14 and NORTHQUAY independently persist; wrong answers/hints/reload do not reset progress; missing-key containers do not present password puzzles.
- [ ] Confirm incomplete text stays readable; locked bodies/pixels and future titles/counts remain excluded from protected search/preview/thumbnail paths.
- [ ] Resume older and completed saves; retain optional evidence, choices, relationships, independent locks and untouched legacy localStorage data.
- [ ] Complete Bulletin/Bus 4/GCRO/S30 via skeptical/cooperative and unavailable-role variants; preserve 14/13 versus Bus 4 separation and require source authentication for K02/R04.
- [ ] Verify no mirror inspection/save/link or episode completion grants NPC facts, culprit/sender/fate answers, future recovery packages or Episode 02 scenes.
- [ ] Install/update the debug APK on a real Android device without clearing saves; test IME, Back, lifecycle, offline resume, rendering and TalkBack. Record device/OS and actual outcomes.
- [ ] Obtain author decisions already listed in Phase 06F (chronology, missing bible, eight-versus-ten roadmap, E02 continuity and asset-source confirmation).
- [ ] Complete independent code/design review after service recovery or human assignment; review source gates, save validator and source-receipt idempotence.
- [ ] Separately validate production signing/AAB/store requirements. Do not equate debug signing verification with signed-release acceptance.

The next required action is approved browser-suite execution. Android cache permissions no longer block the debug build. Full Episode 01 acceptance remains pending browser results, review and human/device acceptance.

## Final helper and APK verification

The checked-in helper was executed with `-Offline`: **BUILD SUCCESSFUL in 17s, all 93 tasks up-to-date**. The earlier online local-cache build performed the actual repackaging. Android's metrics warning still references the user `.android/analytics.settings` despite the local Android-user environment setting; it is nonfatal and remains disclosed. No global analytics/security setting was changed.

Final debug APK: `android/app/build/outputs/apk/debug/app-debug.apk`, **16,794,020 bytes**.

SHA-256: `c4dc8361eff6ad31fb3dc3d0feaca33318ed403561a6d19d993ffd1618be4336`.

`apksigner verify --verbose --print-certs` passed: APK Signature Scheme v2, one Android Debug signer. Public certificate SHA-256: `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`. This confirms debug package signing integrity only, not release-signing or installation acceptance. All 40 packaged dist files match the current build byte-for-byte; see `artifacts/phase06f1/debug-package-integrity.json` for per-file hashes.

## Phase 06G supersession

Current verified results: [Phase 06G final acceptance report](PHASE_06G_FINAL_ACCEPTANCE_REPORT.md). Approved execution now passes all 43 browser scenarios; the final unit/component suite passes 161 tests. Final debug APK was rebuilt and its signature/assets checked. The earlier browser/service-capacity blockers above describe Phase 06F.1, not the current approved-run results. Physical UAT, human pacing and production release acceptance remain unperformed or blocked as detailed in Phase 06G.
