# APK update — 28 October 2026

The owner's direct request to update the existing APK authorizes this build, superseding the prior task's no-APK boundary for packaging only. No story code was changed during packaging.

- Deliverable: `artifacts/THE_ARCHIVE_2026-10-28_Update.apk`
- Application ID: `com.thearchive.game`, unchanged.
- Version: `0.4.0-playtest`, version code **4** (previous delivered playtest: code 3).
- Type: debug-signed playtest update.
- Size: **19,811,620 bytes**.
- APK SHA-256: `12cc76c989caf8e106866f53ca5a6efa940985b75d49525859b457cbc672b15e`.
- Signing certificate SHA-256: `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`, matching the 27 October APK and the retained Scene 06 APK's recorded signer.

The package is prepared for an in-place Android update. The application ID, signing identity and packaged Capacitor configuration are unchanged; the Android version code increases. No save store is cleared, renamed or reset, and the WebView-origin configuration remains identical. Existing saved narrative graphs remain compatible; the revised origin flow applies to new aligned games, as documented in `VERSION_HISTORY_CONVERSATION_2026-10-28.md`.

Install over the existing playtest using Android's Update action. Do not uninstall the old app to apply this update, since uninstalling would remove its local app data. Physical-device installation and retained-save behavior on a real Android device were not tested here.

## Verification

1. `npm run cap:sync`: passed; includes TypeScript/production web build and Android asset/plugin sync.
2. `./scripts/build-android-debug.ps1 -Offline`: **BUILD SUCCESSFUL in 19s**, 123 tasks, 33 executed / 90 up-to-date.
3. Android SDK 36 `apksigner verify --verbose --print-certs`: passed, APK signature scheme v2, one matching Android Debug signer.
4. Android SDK `aapt dump badging`: confirms application ID, code 4, name `0.4.0-playtest`, minimum SDK 24 and target SDK 36.
5. APK ZIP integrity: passed. All **43** current production web files are byte-identical to `dist` inside `assets/public/`.
6. Packaged JavaScript includes the revised Version History runtime and canonical scene identity. Capacitor configuration matches the previous APK exactly and contains no development-server URL.
7. Previous delivered APKs were retained byte-for-byte, including the 27 October playtest and Scene 06 deliverable.

Evidence: `artifacts/apk-update-2026-10-28/integrity.json`, `signature.txt`, `package.txt`, and the sync/Gradle logs in `artifacts/`.

The already verified web implementation results remain recorded in `VERSION_HISTORY_CONVERSATION_2026-10-28.md`; this packaging task reruns the production build rather than repeating the full story regression suite. The existing Vite large-chunk and Gradle flatDir advisories remain nonfatal. No device installation, commit or push was performed.
