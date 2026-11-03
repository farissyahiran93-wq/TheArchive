# GREYHAVEN Chapter 1 v2 playtest APK — 2 November 2026

The owner's direct APK request authorizes this packaging step. The web runtime is the Phase 08 ten-scene Chapter 1 v2 release. No story code, save stores, Android package ID or WebView origin was changed during packaging. No commit or push was made.

- Deliverable: `artifacts/GREYHAVEN_2026-11-02_Chapter1_V2_Scenes01-10_Playtest.apk`
- Application ID: `com.thearchive.game` (unchanged).
- Android version code: **10** (previous delivered update: 9); version name: `1.0.0-playtest`.
- App label: GREYHAVEN. Debug-signed playtest build, not a store release.
- Size: **23,601,286 bytes**.
- APK SHA-256: `34ecdd00fd66adce9af956901045bd0a1e99a0769fe05e57887c273a0864c34d`.
- Signing certificate SHA-256: `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`, matching the 31 October update.

## Verification

1. Phase 08 runtime gates: TypeScript and lint passed; 1,439 unit tests and 176 browser tests passed; production build passed. See `CHAPTER_1_V2_FINAL_REPORT.md`.
2. `npm run cap:sync`: passed and copied the current production assets into Android.
3. `scripts/build-android-debug.ps1 -Offline`: BUILD SUCCESSFUL in 18 seconds; 123 tasks, 33 executed and 90 up to date.
4. Android SDK `apksigner verify --verbose --print-certs`: passed, APK signature scheme v2, one Android Debug signer with the same certificate as the previous APK.
5. Android SDK `aapt dump badging`: confirms package ID, code 10, version name, app label, min SDK 24 and target SDK 36.
6. APK ZIP CRC check passed. All **47** production web files in `dist` match the packaged `assets/public/` copies byte for byte. The packaged Capacitor configuration is byte-identical to the previous update, and its JS contains the v2 edition marker.
7. The previous delivered APK remains in `artifacts/` with its original SHA-256.

Install over the existing playtest using Android's Update action to retain local app data. Existing saves remain on their historical route; a new investigation starts v2 and archives the prior primary save for restoration. Do not uninstall the prior app when updating. Physical Android installation, device audio and retained-save behavior on a real device were not tested here.
