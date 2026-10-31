# Scene-based NEW MESSAGE indicators — 27 October 2026

The FIND DANIEL renderer previously inserted a NEW MESSAGE label when the sender changed. It now inserts one above the first delivered NPC message of each narrative scene in that conversation. Consecutive lines, other actors, system events, player Sends, waits and typing do not create another label. Completed scenes retain their original labels in history.

`src/content/chatScenes.ts` associates the existing stable event namespaces with the canonical Chapter 1 planning IDs. It also classifies Chapter 2 story nodes by traversing their authored scene entrances and retains separate metadata for pinned historical opening routes. Scene 10 retains `ch01_sc10_a_life_in_fragments`. The classification never uses sender changes, timestamps, dialogue text, unread counts or the currently active scene. Unknown event IDs do not invent a scene.

`sceneStartMarkers` projects delivered history into the first NPC message for each scene. It skips player and system lines and tracks every scene already encountered, including an earlier optional thread resumed after a later scene. `SceneStartMarker` renders the projection. The marker is not a saved message or an unread flag. Reopening, rerendering and restoring IndexedDB saves reproduce the same placement without a schema migration, transcript replay or additional state writes. The legacy localStorage save key is untouched.

No story runner, authored dialogue, choices, relationship values, knowledge receipts or scene gates changed. Existing grouping, avatar, notification, typing and scrolling logic remains in place.

Changed source files:

- `src/content/chatScenes.ts` — scene metadata for existing event IDs and story entrances.
- `src/ui/sceneMarkers.ts`, `SceneStartMarker.tsx`, `scene-markers.css` — shared projection and rendering.
- `src/ui/Scene01Chat.tsx` — final and historical Chapter 1 Sophie/FIND DANIEL histories.
- `src/ui/Chapter1Investigation.tsx`, `Chapter2Access.tsx`, `Chapter2Reunion.tsx` — contact, access, reunion and intercepted histories.
- `src/ui/SourceInvestigation.tsx`, `TransferRegister.tsx`, `InventorySheet.tsx`, `CorrectionsDesk.tsx` — professional/civic role inboxes.
- `src/ui/OpeningV4Chat.tsx`, `CharacterFollowupChat.tsx`, `OpeningPrologue.tsx`, `SophieConversation.tsx`, `Messenger.tsx` — preserved earlier chat interfaces.
- `src/ui/opening-v4.css` — replaced the renderer-specific marker rule with shared styling.
- `src/ui/sceneMarkers.test.ts`, `tests/e2e/scene-message-markers.spec.ts` — regression coverage.

Verification:

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: 1,302 tests passed in 47 files, including eight new marker regressions and scene metadata coverage for both Chapter 1 graphs and Chapter 2 NPC nodes.
- `npm run build`: passed. Vite retains its large-chunk advisory.
- Focused browser run: four tests passed, covering the real final-route FIND DANIEL transcript, actor changes, draft/Send, typing delay, reopen, save/reload, actual Scene 01/03 boundaries, and 320/390 px avatar/group layouts.
- Complete browser suite: 149 scenarios executed; 147 passed and two hit the 90-second timeout during an observed approximately 1.7-hour execution pause. Both stopped while entering the phone, before any marker assertion. An initial concurrent retry on a second local server failed to load the initial screen. After the full suite exited, both affected files were run serially: **11/11 passed**, including both interrupted scenarios. All 149 distinct scenarios therefore have passing results; the original interrupted run was not a clean pass. Original failure evidence is retained in `full-results/` and `timeout-recheck/`; the successful serial results are in `isolated-recheck/`.
- Final visual marker run: **2/2 passed**, including an in-viewport assertion and inspected screenshot of one `NEW MESSAGE · Sophie` above “Okay.” with no extra label on Maya's following message. Results are in `visual-results/`.

New Android deliverable: `artifacts/THE_ARCHIVE_2026-10-27_Scene_Message_Fix.apk`. This packages the current authorized source through Scene 10; Scene 11 remains unavailable. It is a debug playtest build, not a release build. No physical-device installation or Android WebView playthrough was performed.

- `npx cap sync android`: passed.
- `./scripts/build-android-debug.ps1 -Offline`: BUILD SUCCESSFUL, 123 tasks, 27 executed / 96 up-to-date. The Android metrics write warning and existing flatDir advisories were nonfatal.
- APK size: 20,593,058 bytes.
- SHA-256: `10cb48416f604f4858a23e7a4d7ae36cf5318f77d6767cf3b116efa0a8521a35`.
- APK signature v2 verified; debug certificate SHA-256 remains `444fdc887230aba76bb7a296b3a3817bb35c041ee91d34d0eeb7dc529195f758`.
- ZIP integrity passed; all 43 production files are byte-identical under `assets/public/`; packaged Capacitor config has no development server URL.
- The delivered Scene 06 APK remains unchanged at SHA-256 `403185961ab8fb5ecbff1cf3d9f048e3d8f9b4f8413b9bb27ab58564475f334c`.

Evidence: `artifacts/scene-message-markers/find-daniel.png`, `apk-signature.txt`, `apk-integrity.json`, and focused/full browser result folders. No commit or push was created.
