# Phone continuity and Sophie dinner revision — 26 October 2026

## Implemented

- New final-route starts keep the Home app order stable. Maps and Contacts remain present when Sophie writes. Archive is absent on the initial Home and appears at the end of the app list when the Scene 04 public investigation begins. Historical saves keep their prior Archive access.
- Starred player replies can be selected and sent through the same explicit Send action as other replies. Sophie's first unknown-contact message offers Block Number or Cancel; blocking pauses the pending conversation until unblocked.
- Removed the Unknown Number chat's “BACK TO FIND DANIEL” guide and Sophie's persistent “Open FIND DANIEL” button. The group remains available from the Messages inbox and its invitation flow. Group changes of speaker receive a NEW MESSAGE marker.
- The shell uses the player's local time and date. At Home, browser back gesture or Android back opens an exit confirmation; elsewhere back returns Home. The native handler uses `@capacitor/app` and Android project settings were synced.
- The final Scene 02 runtime graph includes the supplied real chicken mushroom pasta photograph (`public/sophie-dinner.png`) after “Fine. One photo.”, with an image message, a short delivery pause, automatic scrolling, and full-screen viewing. The dinner exchange now gives Sophie, Maya and Lucas a lighter moment before the original Lucas response. The repeated blame and timeline exchange were condensed while preserving the existing player choices, effects and downstream scene transitions. Historical delivered text is unchanged.
- Opening a message notification now selects its actual chat even if Messenger last displayed another thread.

## Verification

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: 1,294 tests passed in 46 files.
- `npm run build`: passed.
- `npm run test:e2e -- --workers=3 --timeout=180000 --output=artifacts/phone-continuity-final/results`: all 147 tests passed in 42 files; `results/.last-run.json` reports `passed` with no failed tests.
- `npx cap sync android`: passed. No APK was built.
- Source snapshot across 284 code, test, configuration and pinned-source files was identical before and after the full browser run (`artifacts/phone-continuity-final/source-integrity.json`). The Sophie image, Android settings and delivered Scene 06 APK hashes were also unchanged during that run. Delivered APK SHA-256: `403185961ab8fb5ecbff1cf3d9f048e3d8f9b4f8413b9bb27ab58564475f334c`.

## Remaining boundaries

- Strictly installing Archive only through the later Unknown Sender link conflicts with playable Scene 04–10 public Archive scenes. The new-game Home starts without Archive, but it becomes available at Scene 04 so those authored scenes remain reachable. A story-sequence change is needed to make the installation happen only at the later link.
- The Android back/exit behavior was synced and browser-tested, but has not been checked on a physical device or in a new APK. System navigation gestures outside the WebView remain device-dependent.
- The phone clock/date are local device values; historical narrative timestamps remain authored story times.

No APK rebuild, commit or push was performed as part of this task.
