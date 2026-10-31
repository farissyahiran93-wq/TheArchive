# Cinematic menu APK update — 28 October 2026

- File: `artifacts/THE_ARCHIVE_2026-10-28_Cinematic_Menu_Update.apk`
- Application ID: `com.thearchive.game`; version code 5; version name `0.5.0-playtest`.
- Size: 21,349,081 bytes. SHA-256: `0682a7a5a1075567fdcb2e1abaa3f0c831bfeb69335c2c83876f4b6c0a345e34`.
- Debug signer SHA-256: `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`, matching the previous delivered APK.
- `npm run cap:sync` and offline Android debug build passed. APK v2 signature verified. ZIP integrity passed; all 45 production web files match `dist`, including the supplied video. Capacitor configuration matches the prior APK byte for byte.
- Existing APKs were retained. No installation on a physical device was performed. Install as an update without uninstalling to retain local data.
- Prior menu checks: 1,351 unit tests and nine focused browser tests passed. A separate full browser regression was still running and produced timeouts; do not treat that suite as passed.
