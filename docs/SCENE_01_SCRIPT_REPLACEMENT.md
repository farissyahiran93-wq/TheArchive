# Scene 01 screenplay replacement — 21 October 2026

The owner's supplied **THE ARCHIVE — Chapter 1 — The Missing Entry — Scene 01: A Message from Sophie** replaces the active opening conversation. The source is the pasted attachment `74c05d91-a6a7-4e7e-9279-cf8fe2aef096/Pasted text.txt`.

Authored dialogue lives in `src/content/scene01Script.ts`; `src/content/scene01.ts` compiles its stable conversation graph. Pure transitions in `src/game/scene01.ts` deliver NPC lines and accept explicit player actions. `Scene01Chat.tsx` renders these records. All 14 main choices and all subsequent player lines require a visible Send action. Natural authored pauses and typing are retained; the proposed 15–20 minute reading duration is an estimate, not a forced timer or measured result.

Daniel's incomplete contact list leads Sophie to the player's number. The screenplay verbally mentions an unreadable note in one branch. There is no photograph of Daniel's message, first-page attachment, recovery token or automatic mirror route in this scene. Old retained note data cannot appear in Photos during the new scene.

The stored player name is not Sophie knowledge. Only choice 08 A/D discloses the selected codename, after Send. Each actual NPC claim receives a specific receipt when delivered. The unreadable-note claim is received only on the branch that says it; the screenplay's general flag description is broader than its actual dialogue, so it is not silently awarded elsewhere.

Five choices offer one premium response each. Premium branches preserve explicit Send for their extra player lines and grant only the supplied relationship values. They do not gate mandatory evidence or create romance. Premium responses are playable in the developer preview; production has no payment integration and retains the free paths.

Declining or dismissing an invitation persists across reload. Accepting later plays the delayed warning before choice 14. Final group entry requires JOIN GROUP. Scene 01 ends after Sophie sends: “Hey, everyone.”, “Before anyone says anything...” and “I added someone.” Existing group biographies and conflict dialogue are not appended; the next authored scene is pending.

Reboot IndexedDB retains older fields while adding optional Scene 01 state. Normal loading activates the replacement transcript for earlier reboot saves; it does not erase the old records or touch the legacy localStorage key. The explicit development-only `legacyopening` entrance retains previous regression coverage. Existing Bulletin, mirror and later scene content remains dormant in normal Scene 01 play.

Validation covers all 56 main response branches, nested player Send gates, codename privacy, recipient receipts, event idempotence, production premium guards, preserved older data, reload and invitation timing. See the final execution results in the task response; generated browser results are under `artifacts/scene01`.

Executed validation: typecheck and lint passed; 23 unit-test files / 273 tests passed; production build passed with the existing bundle-size warning (approximately 635 kB JavaScript before gzip). The nine focused Scene 01 browser scenarios passed. The full 58-scenario browser run passed 56, with one Windows screenshot write failure and one transient stale-save interruption during the legacy portrait reload. After moving media screenshots to per-test output paths, all three media scenarios passed in a serial rerun, including both previously failing cases. The initial full run was not a clean 58/58 run; the portrait reload remains a concurrency-related test limitation observed in that run.
