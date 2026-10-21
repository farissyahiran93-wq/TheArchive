# Phase 06G — Android device UAT worksheet

**Physical-device execution: NOT TESTED.** All verification items below start NOT TESTED. Browser automation, desktop screenshots, debug compilation and APK-signature verification do not change that status. Complete one worksheet per physical device/build and attach screenshots/video/logcat for each failure.

## Build and installation

APK: `D:/Web app/Detective games/android/app/build/outputs/apk/debug/app-debug.apk`.
Application ID: `com.thearchive.game`. This is a debug build; no production-release acceptance is implied.

Rebuild from the project root in Windows PowerShell after any source change:

```powershell
Set-Location -LiteralPath 'D:\Web app\Detective games'
npm run cap:sync
if ($LASTEXITCODE -ne 0) { throw 'Web build or Capacitor sync failed' }
.\scripts\build-android-debug.ps1 -Offline
Get-FileHash -LiteralPath '.\android\app\build\outputs\apk\debug\app-debug.apk' -Algorithm SHA256
```

Omit `-Offline` if the project-scoped Gradle dependency cache has not been populated. Preserve existing saves: do not uninstall the app, clear storage or delete either save store. Export a backup from the game's Settings before testing an upgrade. A fresh-install test belongs on a separate consenting test device/profile, not over the only saved game.

On the physical test phone, enable Developer options and USB debugging, connect USB, and approve this computer on the phone. In Windows PowerShell:

```powershell
$taskAdb = Join-Path $env:LOCALAPPDATA 'Android\Sdk\platform-tools\adb.exe'
& $taskAdb devices -l
# Replace DEVICE_SERIAL with the intended connected physical device's actual serial.
& $taskAdb -s DEVICE_SERIAL install -r 'D:\Web app\Detective games\android\app\build\outputs\apk\debug\app-debug.apk'
& $taskAdb -s DEVICE_SERIAL shell am start -n com.thearchive.game/.MainActivity
```

If SDK platform-tools are installed elsewhere, use that installation's adb.exe. If the device reports unauthorized, approve it on-device. If install reports an incompatible signature, stop and retain the installed app/save; do not uninstall to force success. Confirm the build/signing certificate and backup plan first. Disable USB debugging after testing if that is your normal device practice.

## Evidence header

| Field | Record |
| --- | --- |
| Tester and local date/time | NOT TESTED |
| Physical device/model/serial label | NOT TESTED |
| Android, Android System WebView and keyboard versions | NOT TESTED |
| APK SHA-256 / installation result | NOT TESTED |
| Fresh test profile or existing-save upgrade | NOT TESTED |
| Display/font size, orientation, navigation mode | NOT TESTED |
| Network state, sound mode, reduced motion, TalkBack | NOT TESTED |

Use PASS, FAIL, BLOCKED or NOT TESTED for every row. A FAIL entry needs reproduction steps, expected versus observed behavior, scene/save position and evidence filename. A BLOCKED entry needs the missing prerequisite. Do not use an unchecked row as a pass.

## Device verification

| Item | Steps and expected behavior | Status |
| --- | --- | --- |
| Lock screen / notifications | Fresh profile begins with Sophie's message; unlock and return to lock/home without losing state. Snapshot, Bulletin and GCRO notifications reveal only available scoped information. Simulated notifications are not a claim of OS push support. | NOT TESTED |
| iMessage / real keyboard | Send several Sophie replies; selection alone sends nothing. Read note photo/transcript and return. With permitted Maya Messages, enter real text/passwords; IME does not hide Send or trap Back. No actual phone identity/contact access. | NOT TESTED |
| Typing / scroll | Confirm pending NPC replies show appropriate feedback. Scroll to old messages while new ones arrive; position remains until Jump to latest. Background/relaunch mid-queue; each bubble appears once. Test reduced motion. | NOT TESTED |
| Incoming calls / interruption | No new in-story incoming call is authored for this phase; Calls is an empty player utility plus recovered read-only logs. Using a consenting test call/device interruption, background the app and return: save/queue survives, no invented caller identity or narrative event. Do not contact unknown people. | NOT TESTED |
| Daniel phone navigation | Explore Messages, Email, Gallery, Maps, Notes, Calls, Contacts, Files, Browser, Protected and Index. Back/Home/Resume returns correctly, including an interrupted saved record. Mirror cannot send replies or place calls. | NOT TESTED |
| Gallery / zoom / albums | Public shelf/message images load. Locked album pixels and descriptions stay hidden until the corresponding password. Open all six full images; test Fit, 100–400% zoom, pan, Previous/Next, Android Back and image-error recovery. Original provenance/GPS remain unavailable. | NOT TESTED |
| Passwords / hints | ECHO-7/14, BUS4, 7-14 and NORTHQUAY unlock only their individual records; all three hints persist. Wrong attempts preserve progress. Real IME and keyboard dismissal fit small screens. Missing-key containers do not pretend to be password puzzles. | NOT TESTED |
| Progressive recovery | Coverage PARTIAL / integrity Unverified. Ordinary and incomplete surviving text remains readable. Unlocking is distinct from recovery/permission/source availability. No future content or extra data appears on S30 completion. | NOT TESTED |
| Sound / vibration | No authored audio/haptic implementation was found in current source; absence is not a device playback failure. Test silent/DND, device interruption and accessibility settings: no proof, progression or message comprehension may depend on an unheard sound/vibration. Record requested future audio separately. | NOT TESTED |
| Orientation / accessibility | Test narrow phone, landscape, cutout/gesture area, larger system font, TalkBack focus/read order, modal focus return and minimum usable touch targets. No clipped required clue or inaccessible Send. | NOT TESTED |
| Save / resume | Upgrade without clearing data, unlock items independently, save observations/private links and leave unsent drafts. Background, force-stop and cold-launch offline. Queue, choices, source receipts, saved record and unlocks survive without duplication. | NOT TESTED |
| Storage / backup | On a disposable test profile, check interrupted write/storage failure and explicit backup/reload recovery. Existing legacy localStorage data remains untouched; no auto-import/reset. Never run destructive storage tests on the only valued save. | NOT TESTED |
| Full skeptical / public route | Finish public comparison; keep personal sources private, decline optional permissions/locks, validate GCRO, save K02, inspect role-class limit and complete S30. No auto-share or culprit/fate reveal. | NOT TESTED |
| No-tip / late-tip route | Research through GCRO privately; S30 holds completion until explicit minimal tip and editor-channel check. Late tip excludes E012/private notes; R04 is not repeated. | NOT TESTED |
| Social route | Use handle, explicitly send chosen public row, independently accept Messages and Archive, read optional note/check-in/framing, then choose final disclosure. Check recipient-specific facts and no private export attachment. | NOT TESTED |
| GCRO negative routes | Verify broad scope refusal, pending/unavailable response, invalid-file quarantine and recorded correction review; no K02/R04 from a failed issue. Use recorded test fixtures only on disposable test profiles; do not alter a valued save. | NOT TESTED |
| S30 / completed-save revisit | Save source-limited question and explicitly End episode. Cold-launch: E01 complete, discoveries/puzzles/disclosures retained, Episode 02 unavailable. Both role-class and narrower unavailable-card endings remain honest. | NOT TESTED |
| Human narrative pacing | Record active playtime and confusion points across the entire episode. Do the two discrepancies remain distinct? Does the player understand the source for each fact? Automated run time is not a human pacing measurement. | NOT TESTED |

## Device acceptance

Overall physical UAT: **NOT TESTED**. Tester sign-off: NOT TESTED. Release-signing/AAB/store review: NOT TESTED. Author chronology/bible/source decisions remain separate from hardware behavior. Attach completed worksheets to the Phase 06G report before changing any physical acceptance status.
