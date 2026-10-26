# Android playtest APK — Scene 06 baseline

Built at the owner's explicit APK-first request, before staging Scene 08. This request supersedes the earlier Scene 06 task's no-APK boundary for this build only.

- Download: `artifacts/THE_ARCHIVE_2026-10-24_Scene06_Playtest.apk`
- Package: `com.thearchive.game`; existing version `0.3.0-playtest`, version code 3.
- Type: debug-signed playtest, not a production release.
- Size: **17,191,564 bytes**.
- SHA-256: `403185961ab8fb5ecbff1cf3d9f048e3d8f9b4f8413b9bb27ab58564475f334c`.
- Debug signer certificate SHA-256: `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`, matching the recorded existing playtest signer. No signing key was replaced.

Commands and actual results:

1. `npm run cap:sync`: passed, including the current production web build and Capacitor asset/plugin sync.
2. `./scripts/build-android-debug.ps1 -Offline`: **BUILD SUCCESSFUL in 21s**, 93 tasks, 27 executed / 66 up-to-date.
3. SDK 36 `apksigner.bat verify --verbose --print-certs`: passed; APK Signature Scheme v2, one Android Debug signer.
4. ZIP integrity check: **all 41 dist files byte-identical** inside `assets/public/`; no development-server URL in packaged Capacitor config.

Proof files: `artifacts/apk-scene06-2026-10-24/signature.txt` and `package-integrity.json`. The existing large web-chunk and Gradle flatDir advisories were nonfatal.

The package contains the implemented route through Scene 06. Scene 07 remains unavailable; Scene 08 staging is not an unlocked scene in this APK. Existing application identity, debug signer and save schema are retained. No device installation, physical-device playthrough, OS gestures, Android keyboard or production release acceptance was performed. No commit or push was created.
