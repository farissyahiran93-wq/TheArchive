# GREYHAVEN APK update — 31 October 2026

- Deliverable: `artifacts/GREYHAVEN_2026-10-31_Scene06-07_Update.apk`
- Application ID: `com.thearchive.game`; version code 9; version name `0.9.0-playtest`.
- Android Debug certificate SHA-256: `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`, identical to the code 8 update.
- APK SHA-256: `66f420e6677cf18a9bb53ce4831ba3c8eb4c651d0f173ad2bd3b436e002646ae`; size 23,581,054 bytes.
- `npm run cap:sync` and `scripts/build-android-debug.ps1 -Offline` passed. APK signature v2 and ZIP integrity verified. All 47 production web files match the packaged copies. Capacitor application ID and WebView origin configuration are unchanged.
- Existing APKs are retained. Install as an update without uninstalling to retain the device's app data. A real Android installation and on-device save retention were not tested.
- The implementation checks and previously reported browser-suite limitations are in `SCENES_06_07_REVISION_2026-10-31.md` and the conversation. No commit or push.
