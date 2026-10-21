# Chapter 1 phone-first opening — implementation and verification

20 October 2026. This report records the playable opening added for **new reboot saves**. It does not certify the whole Episode 01 narrative or a signed Android release.

## Implemented sequence

1. The player unlocks a usable phone. Messages, Contacts, Photos, Maps, Notes, Settings and other public apps can be opened before the case begins. After approximately 20 seconds of saved game time, an unknown number sends Sophie's first message. The thread and notification do not reveal her name until she identifies herself. Opening an app does not forcibly change screens when the message arrives.
2. The player chooses a first reply and presses **Send**. Sophie asks for the player's name and preferred form of address; each answer requires a separate visible Send action. No default player identity is silently accepted.
3. Sophie sends a small first-page image. It contains only the initial contact instruction, with no recovery token or 14/13 index clue. The photo can be viewed in the conversation and later in Photos. Sophie goes offline. A pending recovery alert follows about five seconds later. Accepting, rejecting and retrying are separate persisted actions; none opens Daniel's mirror early.
4. Sophie creates FIND DANIEL after the offline beat. The group has a creation timestamp, system membership events and separate Sophie, Maya and Lucas turns. The player sends a reply, then a conflict reply. Lucas and Sophie leave in recorded order, and departed members cannot contribute later lines. The group history remains readable.
5. Sophie contacts the player privately again. Only after this conversation does she deliver the full handwritten note and offer the recovered-device installation. The existing read-only mirror, optional item locks, 14/13 discovery and S02–S30 investigation follow. The full note is not exposed through Photos or the chat before this beat.

The timed events, Send actions, address preference, pending recovery decision, group membership and notification IDs persist in the reboot IndexedDB save. Delivery is idempotent after reload. The new opening uses dialogue version 4; stored v2/v3 openings continue their original route. The legacy `the-archive:game-save:v1` localStorage key is untouched. No scene IDs, password answers or existing recovered media were removed.

## Verification

| Item | Status | Evidence |
| --- | --- | --- |
| Typecheck | PASS | `npm run typecheck` |
| Lint | PASS | `npm run lint` |
| Unit tests | PASS | `npm test -- --run`: 184/184, including four new v4 state tests |
| Production web build | PASS | `npm run build`; Vite retains a non-fatal >500 kB chunk advisory |
| Browser tests | PASS | `npm run test:e2e -- --reporter=line`: 49/49 in 4.8 minutes. Three new tests cover phone-first delivery, partial page/pending recovery/group/full mirror path, and old-save continuation. The 46 pre-existing tests exercise the deliberately preserved legacy development route. |
| Capacitor sync | PASS | `npm run cap:sync` copied this production build into Android |
| Android debug APK | PASS | `./scripts/build-android-debug.ps1 -Offline`: `BUILD SUCCESSFUL in 16s`; APK at `android/app/build/outputs/apk/debug/app-debug.apk`, 16,807,838 bytes, SHA-256 `CD0ABD3BEECE831DF620D6E398B2D74421B2777436895887D86C6A7CEB15F047` |
| Physical Android UAT | NOT TESTED | No device installation or interaction evidence. Use `adb install -r android/app/build/outputs/apk/debug/app-debug.apk` from the project root, then record results using `docs/PHASE_06G_ANDROID_UAT_CHECKLIST.md`. |
| Signed release | NOT TESTED | Only a debug APK was built. |

The Android SDK prints `Unable to initialize metrics` for the user `.android/analytics.settings` path, but packaging completes. The build uses the project-scoped Gradle user home; no unrelated cache was deleted and no elevated permissions were needed.

## Remaining narrative and UX acceptance

| Item | Status | Reason |
| --- | --- | --- |
| Phone-first opening through recovered-device activation | PASS | Tested in a browser through actual Send, wait, notification, group, second contact and mirror interactions. |
| Existing S02–S30 routes and four optional locks | PASS | Existing unit and browser regression suite passes; the tests use the preserved legacy opening setup, so this does not prove every v4-to-S30 branch combination. |
| Fully unified character delivery system across all later scenes | FAIL | The v4 opening and later Maya messages share deterministic actor pacing, but later canonical scene batches are not all delivered through one global message queue. |
| Post-recovery Lucas/Eli/Nora private arcs and organic FIND DANIEL reactivation | FAIL | These remain unimplemented. New dialogue and reasons for contact need approved canon; the supplied Story Bible v2 is absent. |
| Story Bible v2 chronology and voice approval | BLOCKED | The newer prompt introduces Maya in the early group, while the existing scene bible introduces her after mirror investigation. That conflict requires an author-approved crosswalk. |
| Independent human story/UX approval | NOT TESTED | No author or device reviewer has accepted the revised opening and later handoff. |

Recommendation: **accept the v4 phone-first opening as a tested implementation slice**, but keep complete Episode 01 and release acceptance open until the remaining character arcs, canon crosswalk, physical-device UAT and human narrative review are completed.
